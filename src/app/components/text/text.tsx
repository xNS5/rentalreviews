
import React from 'react';
import parse from 'html-react-parser/lib/index';
import { Text as TextType } from '@/app/configtype';

const Text = ({text}: TextType) => {
    return (
        <div>{parse("<p className=\"text-base sm:text-sm md:text-base lg:text-lg xl:text-xl\">Welcome to the Bellingham Rental Reviews Project. It's no secret that property management companies and landlords have a bad reputation, especially in the Bellingham area. These entities are in a position of power, where they control the flow of housing. It is because of this power that many leverage their positions to take advantage of their tenants -- by raising prices, failing to ensure that the dwelling is habitable, or sometimes even violating state law. However, not all property management companies or landlords sink that low. Some are very attentive, and treat their tenants fairly. It would be virtually impossible to gather enough data to provide a holistic review of private landlords, however there is plenty of data out there about property management companies and apartment complexes to give a potential renter a good idea of what they would be getting themselves into.\
        This project seeks to aid first-time renters in the Bellingham area, allowing them to make informed decisions when looking for rental properties with the power of AI. It's no secret that renting in the Bellingham area is challenging -- rising rental prices, property upkeep, travel time to locations, parking availability, and landlord quality are all important factors when considering signing a lease. Parsing through reviews across multiple websites takes time, and this website was developed with that tool in mind. For a more in-depth explanation on how the data was gathered, please see the <a href=\"https://github.com/xns5/rentalreviewsdata\"><b>data repository</b>.</a></p>")}</div>
    )
}

export default Text;