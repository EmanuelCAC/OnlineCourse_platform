const books = [
  {
    "name": "The Adventures of Tom Sawyer",
    "author": "Mark Twain",
    "price": 15.99,
    "image": "images/books/img_image_1.png",
    "category": "Kindergarten",
    "createdAt": "2024-03-25T08:00:00Z",
    "updatedAt": "2024-03-25T08:15:00Z"
  },
  {
    "name": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "price": 12.50,
    "image": "images/books/img_image_2.png",
    "category": "High School",
    "createdAt": "2024-03-25T08:15:00Z",
    "updatedAt": "2024-03-25T08:30:00Z"
  },
  {
    "name": "1984",
    "author": "George Orwell",
    "price": 9.99,
    "image": "images/books/img_image_3.png",
    "category": "College",
    "createdAt": "2024-03-25T08:30:00Z",
    "updatedAt": "2024-03-25T08:45:00Z"
  },
  {
    "name": "Harry Potter and the Sorcerer's Stone",
    "author": "J.K. Rowling",
    "price": 19.99,
    "image": "images/books/img_image_4.png",
    "category": "Kindergarten",
    "createdAt": "2024-03-25T08:45:00Z",
    "updatedAt": "2024-03-25T09:00:00Z"
  },
  {
    "name": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "price": 11.25,
    "image": "images/books/img_image_5.png",
    "category": "High School",
    "createdAt": "2024-03-25T09:00:00Z",
    "updatedAt": "2024-03-25T09:15:00Z"
  },
  {
    "name": "Pride and Prejudice",
    "author": "Jane Austen",
    "price": 14.75,
    "image": "images/books/img_image_6.png",
    "category": "College",
    "createdAt": "2024-03-25T09:15:00Z",
    "updatedAt": "2024-03-25T09:30:00Z"
  },
  {
    "name": "Where the Wild Things Are",
    "author": "Maurice Sendak",
    "price": 8.99,
    "image": "images/books/img_image_1.png",
    "category": "Kindergarten",
    "createdAt": "2024-03-25T09:30:00Z",
    "updatedAt": "2024-03-25T09:45:00Z"
  },
  {
    "name": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "price": 10.50,
    "image": "images/books/img_image_2.png",
    "category": "High School",
    "createdAt": "2024-03-25T09:45:00Z",
    "updatedAt": "2024-03-25T10:00:00Z"
  },
  {
    "name": "The Hobbit",
    "author": "J.R.R. Tolkien",
    "price": 16.50,
    "image": "images/books/img_image_3.png",
    "category": "College",
    "createdAt": "2024-03-25T10:00:00Z",
    "updatedAt": "2024-03-25T10:15:00Z"
  },
  {
    "name": "Charlotte's Web",
    "author": "E.B. White",
    "price": 7.99,
    "image": "images/books/img_image_4.png",
    "category": "Kindergarten",
    "createdAt": "2024-03-25T10:15:00Z",
    "updatedAt": "2024-03-25T10:30:00Z"
  },
  {
    "name": "Lord of the Flies",
    "author": "William Golding",
    "price": 13.25,
    "image": "images/books/img_image_5.png",
    "category": "High School",
    "createdAt": "2024-03-25T10:30:00Z",
    "updatedAt": "2024-03-25T10:45:00Z"
  },
  {
    "name": "The Picture of Dorian Gray",
    "author": "Oscar Wilde",
    "price": 12.99,
    "image": "images/books/img_image_6.png",
    "category": "College",
    "createdAt": "2024-03-25T10:45:00Z",
    "updatedAt": "2024-03-25T11:00:00Z"
  },
  {
    "name": "Green Eggs and Ham",
    "author": "Dr. Seuss",
    "price": 6.99,
    "image": "images/books/img_image_1.png",
    "category": "Kindergarten",
    "createdAt": "2024-03-25T11:00:00Z",
    "updatedAt": "2024-03-25T11:15:00Z"
  },
  {
    "name": "The Outsiders",
    "author": "S.E. Hinton",
    "price": 9.75,
    "image": "images/books/img_image_2.png",
    "category": "High School",
    "createdAt": "2024-03-25T11:15:00Z",
    "updatedAt": "2024-03-25T11:30:00Z"
  },
  {
    "name": "Brave New World",
    "author": "Aldous Huxley",
    "price": 11.99,
    "image": "images/books/img_image_3.png",
    "category": "College",
    "createdAt": "2024-03-25T11:30:00Z",
    "updatedAt": "2024-03-25T11:45:00Z"
  },
  {
    "name": "Goodnight Moon",
    "author": "Margaret Wise Brown",
    "price": 7.50,
    "image": "images/books/img_image_4.png",
    "category": "Kindergarten",
    "createdAt": "2024-03-25T11:45:00Z",
    "updatedAt": "2024-03-25T12:00:00Z"
  },
  {
    "name": "The Alchemist",
    "author": "Paulo Coelho",
    "price": 14.50,
    "image": "images/books/img_image_5.png",
    "category": "High School",
    "createdAt": "2024-03-25T12:00:00Z",
    "updatedAt": "2024-03-25T12:15:00Z"
  },
  {
    "name": "The Odyssey",
    "author": "Homer",
    "price": 15.99,
    "image": "images/books/img_image_6.png",
    "category": "College",
    "createdAt": "2024-03-25T12:15:00Z",
    "updatedAt": "2024-03-25T12:30:00Z"
  },
  {
    "name": "Brown Bear, Brown Bear, What Do You See?",
    "author": "Bill Martin Jr.",
    "price": 5.99,
    "image": "images/books/img_image_1.png",
    "category": "Kindergarten",
    "createdAt": "2024-03-25T12:30:00Z",
    "updatedAt": "2024-03-25T12:45:00Z"
  },
  {
    "name": "The Bell Jar",
    "author": "Sylvia Plath",
    "price": 12.75,
    "image": "images/books/img_image_2.png",
    "category": "High School",
    "createdAt": "2024-03-25T12:45:00Z",
    "updatedAt": "2024-03-25T13:00:00Z"
  },
  {
    "name": "Frankenstein",
    "author": "Mary Shelley",
    "price": 13.99,
    "image": "images/books/img_image_3.png",
    "category": "College",
    "createdAt": "2024-03-25T13:00:00Z",
    "updatedAt": "2024-03-25T13:15:00Z"
  },
  {
    "name": "If You Give a Mouse a Cookie",
    "author": "Laura Numeroff",
    "price": 6.50,
    "image": "images/books/img_image_4.png",
    "category": "Kindergarten",
    "createdAt": "2024-03-25T13:15:00Z",
    "updatedAt": "2024-03-25T13:30:00Z"
  },
  {
    "name": "The Sun Also Rises",
    "author": "Ernest Hemingway",
    "price": 11.25,
    "image": "images/books/img_image_5.png",
    "category": "High School",
    "createdAt": "2024-03-25T13:30:00Z",
    "updatedAt": "2024-03-25T13:45:00Z"
  },
  {
    "name": "Slaughterhouse-Five",
    "author": "Kurt Vonnegut",
    "price": 10.99,
    "image": "images/books/img_image_6.png",
    "category": "College",
    "createdAt": "2024-03-25T13:45:00Z",
    "updatedAt": "2024-03-25T14:00:00Z"
  },
  {
    "name": "The Giving Tree",
    "author": "Shel Silverstein",
    "price": 8.50,
    "image": "images/books/img_image_1.png",
    "category": "Kindergarten",
    "createdAt": "2024-03-25T14:00:00Z",
    "updatedAt": "2024-03-25T14:15:00Z"
  }
]

books.map(async (book) => {
  await fetch('http://localhost:3001/api/v1/book', {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(book), // body data type must match "Content-Type" header
  })
})