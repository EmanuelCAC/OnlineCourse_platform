import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Header, Text, Heading, Img, RatingBar, Button, Footer, BreadCrumbs } from "components";
import { useNavigate } from "react-router-dom";
import BookCard1 from "components/BookCard1";
import CourseCard2 from "components/CourseCard2";


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
                <CourseCard2 course={course} key={course._id} />
              ))}
            </div>
            <Text size="lg" as="a" className="!text-red-300_01 ml-auto cursor-pointer"
              onClick={() => {
                navigate('/courses')
                history.pushState({ category: "" }, "")
              }}>
              See More
            </Text>
          </div>
          <div className="flex flex-col items-center justify-start w-full gap-[23px] md:px-5 max-w-7xl">
            <Heading size="xl" as="h2">
              Popular Books
            </Heading>
            <div className="flex flex-row w-full gap-[25px]">
              {books && books.map((book) => (
                <BookCard1 book={book} />
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