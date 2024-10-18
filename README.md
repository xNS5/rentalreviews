[![Netlify Status](https://api.netlify.com/api/v1/badges/6c71a4d8-be3c-4e14-83a8-297f3ad68cb5/deploy-status)](https://app.netlify.com/sites/sunny-medovik-46ba23/deploys)

# Bellingham Rental Reviews



It's no secret that property management companies and landlords have a bad reputation. These entities are in a position of power, where they control the flow of housing. It is because of this power
that many leverage their positions to take advantage of their tenants -- by raising prices, failing to ensure that the dwelling is habitable, or sometimes even violating state law. However, not all 
property management companies or landlords sink that low. Some are very attentive, and treat their tenants fairly. It would be virtually impossible to gather enough data to provide a holistic review
of private landlords, however there is plenty of data out there about property management companies and apartment complexes to give a potential renter a good idea of what they would be getting 
themselves into.

In order to give a holistic overview of a given property management company or apartment complex, a decent amount of data is needed. After the data is gathered, there needs to be a way to process it
and make it digestible to the average person. Fortunately, the recent spike in AI popularity offered a convenient solution. AI can sometimes be hit-or-miss depending on what one asks of it, however
it's very good at ingesting data and giving insights based on that data. 

The general steps for gathering and processing this data is as follows:

1. Reviews for companies needed to be gathered. 
2. The gathered data is cleaned, and presented in a uniform format. 
3. The processed data from both websites needs to be combined to eliminate duplication. 
4. Create rules for how AI should evaluate the data, and the format the output should take.

This application simply displays the resulting data from this process. 

# Contributing

New features are welcome, however will require approval before merging. Please submit an issue detailing the request. 

## Running Locally

### Front End

* Run `npm install` to install dependencies.
* Run `npm run dev` to run locally.
* ???
* Profit

Note:

* When running `npm build` there might be a chance that Next throws a tantrum and claims that it can't access a property of undefined (e.g. `{title} from undefined` or something along those lines). Odds are it's a database issue as Next pre-renders static pages (which is a smidge annoying, but is overall useful).

### Back End

Production data is presently stored in Firestore, however local development is supported using Mongodb. Please clone the [data repository](https://github.com/xns5/rentalreviewsdata) and follow the setup instructions.