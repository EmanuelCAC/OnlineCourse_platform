const mentors = [
  {
    "name": "Kritsin Watson",
    "image": "images/mentors/img_bg_170x170.png",
    "role": ["Founder", "Mentor"],
    "experience": 8,
    "graduated": true,
    "language": ["English", "French"]
  },
  {
    "name": "Brooklyn Simmons",
    "image": "images/mentors/img_bg_1.png",
    "role": ["Founder", "Mentor"],
    "experience": 10,
    "graduated": true,
    "language": ["English"]
  },
  {
    "name": "Wade Warren",
    "image": "images/mentors/img_bg_3.png",
    "role": ["Founder", "Mentor"],
    "experience": 13,
    "graduated": true,
    "language": ["English", "German"]
  },
  {
    "name": "Robert Fox",
    "image": "images/mentors/img_bg_2.png",
    "role": ["Founder", "Mentor"],
    "experience": 18,
    "graduated": true,
    "language": ["English"]
  },
]

mentors.map(async (mentor) => {
  const response = await fetch('http://localhost:3001/api/v1/mentor', {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(mentor), // body data type must match "Content-Type" header
  })
})