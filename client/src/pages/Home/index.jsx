import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Header, Text, Heading, Img, RatingBar, Button, Footer, BreadCrumbs } from "components";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [books, setBooks] = useState(null)
  const [popularCourses, setPopularCourses] = useState([])

  const navigate = useNavigate()

  const popularBooks = async () => {
    const data = await fetch('http://localhost:3001/api/v1/book?limit=3&sort=-rating')
    const result = await data.json()
    setBooks(result.books)
  }

  const getPopularCourses = async () => {
    const data = await fetch(`http://localhost:3001/api/v1/course?limit=4&sort=-rating`)
    const result = await data.json()
    setPopularCourses(result)
  }

  useEffect(() => {
    popularBooks()
    getPopularCourses()
  }, [])

  return (
    <>
      <Helmet>
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" />
          <div className="flex flex-col items-start justify-start w-full gap-[5px] p-5 md:px-5 bg-red-50 max-w-7xl rounded-[20px]">
            <BreadCrumbs routes={[
              {
                name: "Home",
                path: "#"
              }
            ]} />
            <div className="flex flex-row md:flex-col justify-between items-center w-[99%] md:w-full ml-2.5 gap-[492px] md:gap-10 md:ml-0">
              <Heading size="3xl" as="h1" className="w-[30%] !font-semibold">
                <>
                  Educatsy Online
                  <br />
                  Welcome!
                </>
              </Heading>
              <Img
                src="images/img_image_210x374.png"
                alt="kisspngbookcas"
                className="w-[31%] md:w-full md:h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full gap-[47px]">
          <div className="flex flex-col items-center justify-start w-full gap-[23px] md:px-5 max-w-7xl">
            <Heading size="xl" as="h2">
              Popular Courses
            </Heading>
            <div className="justify-center w-full gap-10 grid-cols-2 md:grid-cols-1 md:gap-5 grid">
              {popularCourses[0] && popularCourses.map((course) => (
                <div
                  className="flex flex-row justify-start w-full gap-6 p-[15px] bg-white-A700 cursor-pointer rounded-[10px] hover:shadow-xs"
                  key={course._id}
                  onMouseLeave={() => {
                    const button = document.getElementById(course._id)
                    button.className = button.className.replace('bg-red-300_01', 'bg-red-100')
                    const child = button.querySelector('#child')
                    child.src = "images/img_shopping_bag_24.svg"
                  }}
                  onMouseOver={() => {
                    const button = document.getElementById(course._id)
                    button.className = button.className.replace('bg-red-100', 'bg-red-300_01')
                    const child = button.querySelector('#child')
                    child.src = "images/img_shopping_bag_24_white_a700.svg"
                  }}
                >
                  <div className="flex flex-row sm:flex-col justify-start items-center w-[89%] md:w-full gap-[15px] sm:gap-5">
                    <div className="flex flex-row justify-start w-[35%] sm:w-full">
                      <Img
                        src={course.image}
                        alt="image"
                        className="w-full md:h-auto sm:w-full object-cover rounded-[10px]"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start w-[67%] sm:w-full gap-2">
                      <div>
                        <Heading size="md" as="h1">
                          {course.name}
                        </Heading>
                        <Text as="p" size="s" className="!text-gray-700_01">{course.instructor}</Text>
                      </div>
                      <RatingBar
                        value={course.rating}
                        isEditable={false}
                        size={18}
                        className="flex justify-between"
                      />
                      <Heading size="md" as="h2" className="!text-deep_orange-400">
                        ${course.price.toFixed(2)}
                      </Heading>
                      <div className="flex flex-row gap-3">
                        {course.category.map((courseCat) => (
                          <span key={courseCat} className="py-1 px-2 rounded-full bg-gray-200 text-black-900_02 text-xs">{courseCat}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button size="lg" shape="round" className="w-[44px] !rounded-md bg-red-100" id={course._id}>
                    <Img src="images/img_shopping_bag_24.svg" id="child" />
                  </Button>
                </div>
              ))}
            </div>
            <Text size="lg" as="a" className="!text-red-300_01 ml-auto cursor-pointer" onClick={() => { navigate('/courses') }}>
              See More
            </Text>
          </div>
          <div className="flex flex-col items-center justify-start w-full gap-[23px] md:px-5 max-w-7xl">
            <Heading size="xl" as="h2">
              Popular Books
            </Heading>
            <div className="flex flex-row w-full gap-[25px]">
              {books && books.map((book) => (
                <div
                  key={book._id}
                  onClick={() => navigate(`shop/${book._id}`)}
                  className="flex flex-col justify-start items-center w-full gap-[15px] p-[21px] sm:p-5 bg-white-A700 rounded-[10px] cursor-pointer hover:shadow-xs">
                  <Img
                    src={book.image}
                    alt="popular_books"
                    className="w-[60%] md:h-auto sm:w-full ml-[3px] object-cover rounded-[5px]"
                  />
                  <div className="flex flex-col items-start justify-start w-[73%] mr-[3px] gap-2.5">
                    <RatingBar
                      value={book.rating}
                      isEditable={false}
                      size={16}
                      className="flex justify-between"
                    />
                    <Heading as="h3" className="!text-black-900_02">
                      <>
                        {book.name}, by
                        <br />
                        {book.author}
                      </>
                    </Heading>
                    <Heading as="h4" className="!text-red-300_01">
                      ${book.price}
                    </Heading>
                  </div>
                </div>
              ))}
            </div>
            <Text size="lg" as="a" className="!text-red-300_01 ml-auto cursor-pointer" onClick={() => { navigate('/shop') }}>
              See More
            </Text>
          </div>
        </div>
        <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
      </div>
    </>
  )
}