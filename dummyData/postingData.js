import Posting from "../models/posting";


const POSTINGS = [
    new Posting('p1', 'u1', 150, '1 NMT/Trip', '', new Date()),
    new Posting('p2', 'u2', 459, '10%', 'http://google.com', new Date()),
    new Posting('p3', 'u1', 583, 'Tips/Donations', '', new Date(),'https://cdn.animalcrossingworld.com/wp-content/uploads/2020/03/animal-crossing-new-horizons-guide-turnip-stalk-market-timmy-tommy-sell-price-high.jpg'),
    new Posting('p4', 'u3', 122, 'Tips/Donations', 'http://twitter.com', new Date())
]

export default POSTINGS