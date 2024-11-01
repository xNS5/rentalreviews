# Disclaimer
This document will be updated on a semi-infrequent basis. This document is designed to give you an overview of how each part of the application works, the more nitty-gritty will require specific documentation that I don't have prepared yet. 

Additionally, the terms "Adjusted Average" and "Adjusted Review Count" will be thrown around in this project. These values represent the average rating/review count from users who submitted **both** a review and a rating. This project makes this distinction because while those reviews do adjust the overall average rating, they aren't a benefit to the user. Sure, a person may submit a one-star review, but if they don't elaborate as to *why* the review isn't super helpful. 
# Tech Stack

## Prerequisites
The following needs to be installed and/or running prior to running the front-end:
* Nodejs 20 + NPM
* MongoDB instance accessible to the development machine
* [NVDA](https://www.nvaccess.org/download/) (or equivalent screen reading software)
* (Optional) Docker + Docker Compose for MongoDB and Mongo Express
* (Optional) Postman/Bruno
## Frontend
* Next.js 14.2.10
* Tailwindcss 3.3.0
## DB
* MongoDB.
	* A docker compose file has been provided in the data repository for quick setup. 

# Web Application Development Setup

## Database
1. Fork the [data repository](https://github.com/xns5/rentalreviewsdata) and clone it to your machine
2. Copy the `.env.template` file into `.env`
3. Populate the `MONGODB_ADMIN_*` fields with the credentials to your local mongodb instance.
4. Set the `MONGODB_URL` value (should be `127.0.0.1:27017` if running on your local machine)
5. Run the following:
```
python -m venv venv
pip install -r requirements.txt
. venv/bin/activate
python seed.py -db mongodb -a seed
```

The same steps should work for Windows machines, assuming Python is installed correctly. 
**Note**: Firebase won't work unless I either provide you with a certificate or you spin up your own instance. There really isn't a benefit to running a Firestore instance for development unless you're transitioning between multiple machines. 

## Frontend
1. Copy `.env.template` to `.env.local`
2. Populate the `NEXT_PUBLIC_MONGODB_*` values
3. Install the dependencies and run (`npm install` and `npm run dev`). 

# Data Development
The data for this project is gathered two ways: for Google the data is scraped using Selenium, the second is utilizing an unofficial API route from Yelp. After a few iterations, I designed these scripts to be about as hands-off as possible. 

## TL;DR
1. Run `google_reviews.py` for properties, companies, or both.
2. Run `yelp_reviews.py` for properties, companies, or both.
3. Run `merge_reviews` to combine the JSON files and re-calculate the review average, review count, adjusted review average, and adjusted review count.
4. Run `openai_driver.py` to generate the reviews
5. Run `seed.py` to populate the database. 

## Yelp (`yelp_reviews.py`)
There are technically two parts to this script: first, finding the businesses and second getting the reviews for those businesses. The first part will require one to get a [Yelp Fusion API key](https://fusion.yelp.com/). The account + key is free, however there is a request limit of 500/day which shouldn't be a problem unless these scripts are being used for an alternate purpose. Once the API key is acquired, place it in `.env` with the key "YELP_FUSION_KEY".  The end result will look something like "Authorization: `[bearer] [yelp_fusion_api_key]`". 
paramters
The second part of the script requires a valid request header. Perform a search on Yelp and navigate to the business page. In the developer tools networking tab, search for a `batch` request that has `operationName: "GetBusinessReviewFeed"`, copy the request header, and paste it in `get_request_obj` in the `extensions` -> `documentId` object. Switch every boolean to "False" as "false" isn't valid in Python, and either remove the "encBizId" and "reviewsPerPage" or set the values to "None". 

Running `yelp_reviews.py` will give you a couple of options to run through including "Properties" and "Companies". For each option the search query will be different (e.g. "Property management companies" versus "Apartment Complex").

The script *should* first get a list of companies that meet the search criteria, then use their GraphQL API to grab all of the reviews.

## Misc. Notes
* In some instances a non-property management company might make it through the cracks, in which case edit `utilities/config.json` -> `company_blacklist`. Some real estate agents act as a property manager, but in some cases they don't. In that instance, manual verification is required. 

## Google (`google_reviews.py`)
Simply run `google_reviews.py` from within `src/`. The `config.json` file has all of the input parameters and XPATH/CSS selectors to get the corresponding elements on the UI. 

The "General Search" parameters share all selectors **except** for the `company_elements` CSS selector. The selectors are as follows:

* `company_elements`: when doing a "general search", a list of results are returned and each element will correspond to the `company_elements`. 
* `company_title`: this one should be pretty self explanatory, it's the name of the business. 
* `company_type`: the type of company, whether it's a property management company, real eastate agent, apartment building/complex, etc.
* `location`: the address of the company. Note: if the location *isn't* in Washington it'll skip the listing.
* `review_count`: the total number of reviews.
* `avg_rating`: the listed average review rating. 
* `reviews_button`: the button that one clicks to view the text reviews for a given company.
* `reviews_scrollable`: the part of the UI with the scroll bar, which will allow the script to load all of the review elements. 
### Note
* If the XPATH/CSS selectors need to be updated, open up Google Chrome, grab the correct XPATH selector, and paste it in the "selector" key in `config.json`. If making updates to the general searches, ensure that the selector is updated in both config objects. 
* The `custom` option is strictly for companies/searches that were missed in the initial scrape. If the input isn't a URL, it'll error out.

### Common Issues
1. The XPATH/CSS selectors need to be updated in `config.json`. Simply go into Google Chrome, copy the correct ones, and update them in the config object(s).
2. The correct `chromedriver` and/or Google Chrome isn't installed. To install `chromedriver`, see [this guide](https://skolo.online/documents/webscrapping/#pre-requisites) for Linux/MacOS specific instructions. 

# Article JSON Format
```json
{
	name: string,
	slug: string,
	company_type: string,
	address: string,
	review_count: int,
	average_rating: float,
	adjusted_review_count: int,
	adjusted_average_rating: float,
	summary: {
	  text: string,
	  disclaimer: string
	}
	reviews: {
	 google_reviews: [{...}],
	 yelp_reviews: [{...}]
	}
}
```

and the **Review** objects will have the following format:
```json
{
	author: string,
	rating: int,
	review: string,
	ownerResponse: {
		text: string
	} | null
}
```

# Combining the Reviews (`combine_reviews.py`)
This script iterates through both of the `yelp` and `google` data directories that are created and merges them if there are either duplicates. In some instances the duplicates exist but the computer doesn't know that -- for example a company might be named "Property Management" on Yelp, but is named "Property Management LLC" on Google. We as humans recognize that they're the same, but the computer can't. Luckily there aren't that many companies with this dependency, however in the event one is discovered simply add it to the `company_map` object in `utilities/config.json` (yes, for both Google and Yelp).

Combining reviews is relatively simple: if two files exist for one company on Google and Yelp, the script simply combines the `reviews` objects using the python spread operator (i.e. `foo**`). After that it simply recalculates the rating/review count values and adjusted rating/review count values and adds it to the output file. 

# OpenAI (`openai_driver.py`)
**Note**: to use this functionality one must have an API key from OpenAI, and have credits loaded. Based on my usage the review generation takes at most $30 or so to run, but might be less depending on the model used.

This script iterates through the list of merged articles, then sends them off to OpenAI with the following prompt: 
```
Create an article for the {company type} {name} with the following requirements: 
1. This article sub-sections should be: good, great, bad, and ugly. The content of sub-section should reflect the sentiment of the heading.
2. Each section shall have 2 paragraphs comprised of 3-5 sentences for each paragraph.
3. If there are not enough detailed reviews to generate enough data, each section shall have only 1 paragraph comprised of 3-5 sentences.
4. There shall be no identifiable information in the article, such as the name of the reviewer.
5. Be as detailed as possible, citing specific examples of the property management company either neglecting their duties or exceeding expectations, and any common themes such as not addressing maintenance concerns, not returning security deposits, poor communication, as well as how many times the company has replied to user reviews.
6. If there are specific examples that describe a previous tenant's experience, paraphrase their experience and include it in the corresponding section.
7. When referring to the user-supplied reviews, call them "user reviews". When referring to the generated output from this request, call it "article", such as "in this article...", "this article's intent is to...", etc.
8. The data shall be a single line string, without markdown-style backticks.
9. The data shall not have any control characters, such as newlines or carriage returns. 
10. The article structure shall have the following template: 

"<section><h2>Good</h2><p>#section_content#</p></section>
<section><h2>Great</h2><p>#section_content#</p></section>
<section><h2>Bad</h2><p>#section_content#</p></section>
<section><h2>Ugly</h2><p>#section_content#</p></section>" 

where "#section_content#" should be replaced with the article section text. 

The data is as follows in JSON format, with the reviews contained in the "reviews" key: 
### 
{JSON file content} 
###
```

This script runs async on the merged files, running them in batches of 10 by default. To adjust this value, in `async_driver()` adjust `semaphore = Semaphore(n)` where **n** is the number of articles you want to generate concurrently.
# Testing

## Data
The data portion of this project is largely tested by eyeballing it. I'm open to  ideas on how to validate the data better outside of simple "is this the type it's supposed to be" testing.

## Front End
While the front end is tested manually, in addition to checking for whether the feature works as expected I also test to make sure it's accessible to [WCAG 2.2](https://www.w3.org/TR/WCAG22/) standards (or as best as I can). I use the following tools to test accessibility:
* [NVDA screen reader](https://www.nvaccess.org/download/)
* [aXe Browser Extension](https://www.deque.com/axe/browser-extensions/)
* The built-in browser accessibility utility
* [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)https://webaim.org/resources/contrastchecker/
According to a study conducted by the National Federation of the Blind in 2016, there are over [7 million people](https://nfb.org/resources/blindness-statistics) in the US who have some kind of visual disability. Software developers generally aren't taught how to design with accessibility in mind -- and I think that's a problem. 

I'm not an accessibility expert, and if I don't know something I'll do the research with you to figure it out. With that said, here are a few questions to ask yourself while designing and testing features as well as a couple tips:

* Use semantic HTML. Don't try and turn a `<div/>` into a button, just use a button.
* If you're designing something with color, does it meet contrast standards?
* If you're adding an image to a page, is it relevant to the content or is it purely for decoration? 
	* If it's purely for decoration, add `aria-hidden="true"`
	* If it's relevant to the page, add `alt` and a description of what the thing does.
* If you use a screen reader, does the content you're examining make sense to your ears the same way that it does your eyes?
# Frontend Project Structure
```bash
.
└── frontend/
    ├── .github
    ├── public
    ├── src/
    │   ├── app/
    │   │   ├── api/
    │   │   │   └── route.ts
    │   │   ├── faq/
    │   │   │   ├── faq-type.ts
    │   │   │   └── page.tsx
    │   │   ├── privacy-policy/
    │   │   │   ├── page.tsx
    │   │   │   └── privacy_policy.css
    │   │   ├── reviews/
    │   │   │   ├── columns.ts
    │   │   │   ├── page.tsx
    │   │   │   ├── data.table.tsx
    │   │   │   └── [slug]/
    │   │   │       ├── data/
    │   │   │       │   ├── json-wrapper.tsx
    │   │   │       │   └── page.tsx
    │   │   │       ├── page.tsx
    │   │   │       ├── review.css
    │   │   │       └── review.tsx
    │   │   ├── global.css
    │   │   ├── layout.tsx
    │   │   ├── loading.tsx
    │   │   ├── page.tsx
    │   │   └── providers.tsx
    │   ├── components
    │   ├── db
    │   └── lib
    ├── .env.template
    ├── package.json
    └── package-lock.json
```

# Data Repo Structure
```bash
.
├── combine_reviews.py
├── config
│   ├── alt.json
│   ├── faq.json
│   ├── footer.json
│   ├── home.json
│   ├── metadata.json
│   ├── navbar.json
│   ├── privacy_policy.json
│   ├── resources.json
│   └── reviews.json
├── disclaimer.json
├── docker-compose.yml
├── firebase_certificate.json
├── firebase_staging_certificate.json
├── google_reviews.py
├── LICENSE
├── openai_driver.py
├── pbcopy
├── README.md
├── requirements.txt
├── seed.py
├── utilities
│   ├── config.json
│   ├── __init__.py
│   ├── keymod.py
│   ├── __pycache__
│   │   ├── __init__.cpython-310.pyc
│   │   ├── review.cpython-310.pyc
│   │   └── utilities.cpython-310.pyc
│   ├── review.py
│   ├── tests.py
│   └── utilities.py
└── yelp_reviews.py

```
