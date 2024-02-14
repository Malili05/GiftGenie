const questionsData = [
    {
        "id": 1,
        "question": "What is the occasion?",
        "answers": [
            { "displayText": "Birthday", "keyword": "birthday" },
            { "displayText": "Valentines", "keyword": "valentine" },
            { "displayText": "Easter", "keyword": "easter" },
            { "displayText": "Mothers Day", "keyword": "mother" },
            { "displayText": "Fathers Day", "keyword": "father" },
            { "displayText": "Christmas", "keyword": "christmas" },
            { "displayText": "Halloween", "keyword": "halloween" },
            { "displayText": "Anniversary", "keyword": "anniversary" },
            { "displayText": "Graduation", "keyword": "graduation" },
            { "displayText": "Housewarming", "keyword": "housewarming" },
            
        ]
    },
    {
        "id": 2,
        "question": "What is it for?",
        "answers": [
            { "displayText": "Wearing", "keyword": "apparel" },
            { "displayText": "Eating", "keyword": "snacks" },
            { "displayText": "Playing With", "keyword": "toy" },
            { "displayText": "Watching", "keyword": "tv" },
            { "displayText": "Reading", "keyword": "reading" },
            { "displayText": "Cooking", "keyword": "kitchen" },
            { "displayText": "General Use", "keyword": "gadget" },
            
        ]
    },
    {
        "id": 3,
        "question": "Is this for a romantic partner?",
        "answers": [
            { "displayText": "Yes", "keyword": "romantic" },
            { "displayText": "No", "keyword": "general" }
        ]
    },
    {
        "id": 4,
        "question": "Is this for a child?",
        "answers": [
            { "displayText": "Yes", "keyword": "child" },
            { "displayText": "No", "keyword": "adult" }
        ]
    },
    {
        "id": 5,
        "question": "What is the recipient's favorite color?",
        "answers": [
            { "displayText": "Blue", "keyword": "blue" },
            { "displayText": "Green", "keyword": "green" },
            { "displayText": "Purple", "keyword": "purple" },
            { "displayText": "Red", "keyword": "red" },
            { "displayText": "Orange", "keyword": "orange" },
            { "displayText": "Black", "keyword": "black" },
            { "displayText": "White", "keyword": "white" },
            { "displayText": "Brown", "keyword": "brown" },
            
        ]
    },
    {
        "id": 6,
        "question": "What’s your price range for this gift?",
        "answers": [
            { "displayText": "High", "keyword": "expensive" },
            { "displayText": "Mid-range", "keyword": "affordable" },
            { "displayText": "Low", "keyword": "cheap" }
        ]
    },
    {
        "id": 7,
        "question": "What room is this gift for?",
        "answers": [
            { "displayText": "Kitchen", "keyword": "kitchen" },
            { "displayText": "Bathroom", "keyword": "bathroom" },
            { "displayText": "Living/Family Room", "keyword": "living-room" },
            { "displayText": "Bedroom", "keyword": "bedroom" },
            { "displayText": "Garage", "keyword": "garage" },
            { "displayText": "Laundry Room", "keyword": "laundry" },
            
        ]
    },
    {
        "id": 8,
        "question": "What is their favorite genre?",
        "answers": [
            { "displayText": "Fantasy", "keyword": "fantasy" },
            { "displayText": "Sci Fi", "keyword": "scifi" },
            { "displayText": "True Crime", "keyword": "crime" },
            { "displayText": "Mystery", "keyword": "mystery" },
            { "displayText": "Romance", "keyword": "romance" },
            { "displayText": "History", "keyword": "history" },
            { "displayText": "Horror", "keyword": "horror" },
            { "displayText": "Children's Books", "keyword": "childrens" },
            { "displayText": "Adventure", "keyword": "adventure" },
            { "displayText": "Biography", "keyword": "biography" }
        ]
    },
    {
        "id": 9,
        "question": "Which of these things do they enjoy most?",
        "answers": [
            { "displayText": "Gardening", "keyword": "gardening" },
            { "displayText": "Technology", "keyword": "tech" },
            { "displayText": "Cooking", "keyword": "cooking" },
            { "displayText": "Sports", "keyword": "sports" }
        ]
    },
    {
        "id": 10,
        "question": "What type of entertainment does the gift recipient enjoy the most?",
        "answers": [
            { "displayText": "Music", "keyword": "music" },
            { "displayText": "Books", "keyword": "reading" },
            { "displayText": "Movies", "keyword": "movies" },
            { "displayText": "TV Shows", "keyword": "tv-shows" },
            { "displayText": "Video Games", "keyword": "gaming" }
        ]
    },
    {
        "id": 11,
        "question": "Who is the gift for?",
        "answers": [
            { "displayText": "Woman", "keyword": "womens" },
            { "displayText": "Man", "keyword": "mens" },
            { "displayText": "Child", "keyword": "child" },
            { "displayText": "Prefer Not to Say / Not Applicable", "keyword": "general" }
        ]
    },
    {
        "id": 12,
        "question": "Is the recipient interested in wellness or self-care products?",
        "answers": [
            { "displayText": "Yes", "keyword": "wellness" },
            { "displayText": "No", "keyword": "general" } 
        ]
    },
    {
        "id": 13,
        "question": "Would the recipient rather have an appliance or some jewelry?",
        "answers": [
            { "displayText": "Appliance", "keyword": "appliance" },
            { "displayText": "Jewelry", "keyword": "jewelry" } 
        ]
    },
    {
        "id": 14,
        "question": "Lets use fire to ...",
        "answers": [
            { "displayText": "Smell Nice Things!", "keyword": "candle" },
            { "displayText": "Cook Something! ", "keyword": "barbecue" } 
        ]
    },
];

export default questionsData;

/* Keyword Master List
'adult', 'adventure', 'affordable', 'anniversary', 'apparel', 'bathroom', 'bedroom', 'biography', 'birthday', 'blue', 'cheap', 'child', 
'childrens', 'christmas', 'cooking', 'crime', 'easter', 'expensive', 'fantasy', 'father', 'gadget', 'gaming', 'garage', 'gardening', 'general', 
'graduation', 'green', 'halloween', 'history', 'horror', 'housewarming', 'kitchen', 'laundry', 'living-room', 'mens', 'mother', 'movies', 'music', 
'mystery', 'orange', 'purple', 'reading', 'red', 'romance', 'romantic', 'scifi', 'snacks', 'sports', 'tech', 'toy', 'tv', 'tv-shows', 'user-defined', 
'valentine', 'wellness', 'womens'
*/