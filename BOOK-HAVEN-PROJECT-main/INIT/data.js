const { ObjectId } = require('mongodb'); 

const sampleListings = [
  {
    _id: new ObjectId(),
    title: "Atomic Habits",
    author: "James Clear",
    description: "A proven framework to build good habits and break bad ones.",
    image: "/images/0 (3).jpg",
    price: 18.99,
    category: "Self-Help",
    publisher: "Avery",
    publication_year: 2018,
    stock: 100,
    language: "English"
  },
  {
    _id: new ObjectId(),
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    description: "Powerful lessons in personal change.",
    image: "/images/2 (3).jpg",
    price: 17.50,
    category: "Self-Help",
    publisher: "Free Press",
    publication_year: 1989,
    stock: 85,
    language: "English"
  },
  {
    _id: new ObjectId(),
    title: "The Power of Habit",
    author: "Charles Duhigg",
    description: "Why we do what we do in life and business.",
    image: "/images/2 (4).jpg",
    price: 16.00,
    category: "Self-Help",
    publisher: "Random House",
    publication_year: 2012,
    stock: 90,
    language: "English"
  },
  {
    _id: new ObjectId(),
    title: "Deep Work",
    author: "Cal Newport",
    description: "Rules for focused success in a distracted world.",
    image: "/images/1 (3).jpg",
    price: 15.99,
    category: "Productivity",
    publisher: "Grand Central Publishing",
    publication_year: 2016,
    stock: 60,
    language: "English"
  },
  {
    _id: new ObjectId(),
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    description: "A counterintuitive approach to living a good life.",
    image: "/images/3 (4).jpg",
    price: 19.99,
    category: "Self-Help",
    publisher: "HarperOne",
    publication_year: 2016,
    stock: 75,
    language: "English"
  },
  {
    _id: new ObjectId(),
    title: "Can’t Hurt Me",
    author: "David Goggins",
    description: "Master your mind and defy the odds.",
    image: "/images/0 (4).jpg",
    price: 21.99,
    category: "Motivation",
    publisher: "Lioncrest Publishing",
    publication_year: 2018,
    stock: 50,
    language: "English"
  },
  {
    _id: new ObjectId(),
    title: "The Psychology of Money",
    author: "Morgan Housel",
    description: "Timeless lessons on wealth, greed, and happiness.",
    image: "/images/1 (4).jpg",
    price: 22.99,
    category: "Finance",
    publisher: "Harriman House",
    publication_year: 2020,
    stock: 65,
    language: "English"
  },
  {
    _id: new ObjectId(),
    title: "Mindset: The New Psychology of Success",
    author: "Carol S. Dweck",
    description: "How we can learn to fulfill our potential.",
    image: "/images/3 (3).jpg",
    price: 14.99,
    category: "Self-Help",
    publisher: "Ballantine Books",
    publication_year: 2006,
    stock: 55,
    language: "English"
  },
  {
    _id: new ObjectId(),
    title: "The 5 AM Club",
    author: "Robin Sharma",
    description: "Own your morning, elevate your life.",
    image: "/images/6 (1).jpg",
    price: 16.50,
    category: "Productivity",
    publisher: "HarperCollins",
    publication_year: 2018,
    stock: 70,
    language: "English"
  },
  {
    _id: new ObjectId(),
    title: "Make Your Bed",
    author: "Admiral William H. McRaven",
    description: "Little things that can change your life.",
    image: "/images/5.jpg",
    price: 12.99,
    category: "Motivation",
    publisher: "Grand Central Publishing",
    publication_year: 2017,
    stock: 80,
    language: "English"
  },
  {
    _id: new ObjectId(),
    title: "Essentialism",
    author: "Greg McKeown",
    description: "The disciplined pursuit of less.",
    image: "/images/6.jpg",
    price: 18.99,
    category: "Productivity",
    publisher: "Crown Business",
    publication_year: 2014,
    stock: 40,
    language: "English"
  },
  {
    _id: new ObjectId(),
    title: "Grit",
    author: "Angela Duckworth",
    description: "The power of passion and perseverance.",
    image: "/images/4 (1).jpg",
    price: 20.50,
    category: "Self-Help",
    publisher: "Scribner",
    publication_year: 2016,
    stock: 90,
    language: "English"
  },
  {
    _id: new ObjectId(),
    title: "Dare to Lead",
    author: "Brené Brown",
    description: "Brave work, tough conversations, whole hearts.",
    image: "/images/5 (1).jpg",
    price: 19.75,
    category: "Leadership",
    publisher: "Random House",
    publication_year: 2018,
    stock: 100,
    language: "English"
  },
  {
    _id: new ObjectId(),
    title: "Ego is the Enemy",
    author: "Ryan Holiday",
    description: "The fight against arrogance and self-destruction.",
    image: "/images/4.jpg",
    price: 17.99,
    category: "Self-Help",
    publisher: "Portfolio",
    publication_year: 2016,
    stock: 75,
    language: "English"
  }
];

module.exports = { data: sampleListings };