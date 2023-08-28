# Background

Michael Kennedy is a Software Developer with experience in both full-stack development and web automation. The data for the reviews were pulled from the following websites: Google Maps, Yelp, and Reddit. Sites like Zillow and Apartments.com were attempted, however they have some rate limiting technology in place which made it challenging.  

# Methods

## Gathering Data
The summaries of property management companies and apartment complexes are all publically viewable, which means I can exploit some mechanism to access them programatically.

### Google Maps
While both Yelp and Reddit have REST APIs available to the public both formally and otherwise, Google on the other hand does not. Maps was the more challenging to use because it can be a little unpredictable when it comes to loading information. By the time the automated scripts reached a given element on the screen, the data might not have fully loaded. This required some fine-tuning with the scraping scripts to wait for data to load before continuing scraping. 

The next challenge, which was admittedly an afterthought, was determining whether a property management company operated in Bellingham, WA. There isn't an easy way to determine that as in some cases a company might not have a physical office. One would need to find a way to get a list of all rental properties in the area, then search for the property management company and get its address.

Gathering the necessary data for companies from Google maps requires two steps: first, getting the company name and determining whether it's based in Washington. Second, gathering the reviews for the company.

#### Step 1

1. Go to Google Maps, search for Property Management Companies in Bellingham, WA
2. While are companies listed in the sidebar, scroll to the bottom of the list. 
3. After reaching the bottom, iterate through each company, check to see if that company is based in Washington.
    1. If the company is based in Washington, store all necessary data. 
    2. If the company is based outside of Washington, skip over it. 


### Step 2

For each company acquired in the previous step, do the following:
1. Go to its page on Google Maps.
2. Select the "Reviews" tab, and wait for reviews to load. 
3. Scroll to the bottom of the review list, which will allow all reviews to load
4. Scrape the review, author name, and rating. 

The same scripts were used to scrape reviews of apartment complexes.

### Yelp

Yelp does have an official API which is nice, however upon further investiation the queries using the official API only returned 3 reviews per business. After doing some poking around, it turned out Yelp has an unofficial REST API endpoint that could be used to get the needed data without needing an API token. As a result, gathering data from Yelp was significantly easier than Google. All that needed to be done was get the business' unique ID, and use the REST API endpoint to get the comments.


### Reddit

Reddit has an official API, and getting the comments on a given post was trivial. See the [Python Reddit API Wrapper](https://praw.readthedocs.io/en/stable/) for more details. To gather the comments, [/r/Bellingham](https://www.reddit.com/r/Bellingham/) and [/r/WWU](https://www.reddit.com/r/WWU/) were manually searched for relevant posts using key phrases such as "property management company", "rental", "apartment", to gather a list of URLs. Those URLs were used to get the post ID, and that post ID was used to get the comments on a given post. The files generated from these posts aren't organized by specific property management companies.


## Processing The Data

In some cases, the data gathered required some post-processing. In the Yelp data for example a number of companies somehow made its way into the mix that weren't property management companies, but were involved in that business in some capacity -- whether that was through real estate photography, or plumbing/electric for a specific company. Each company had a unique set of "categories", so all that was required was to delete any companies with specific "categories" in them, such as photography.

# Creating the Summaries

All summaries for this data were created using ChatGPT, using the parsed data as input. The raw comments can be [viewed here](). The prompt was as follows: "Using the inputted JSON data, create an article about each property management company that follows the following format: \<insert format here\>." Depending on ChatGPT's output, the query was modified to get more descriptive results.