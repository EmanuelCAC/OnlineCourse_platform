import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Header, Text, Heading, Footer, Banner} from "components";
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
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100 px-5">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" />
          <div className="flex flex-row justify-center w-full">
            <Banner
              bgColor="bg-red-50"
              l1="Educatsy Online"
              l2="Welcome!"
              image="/images/img_image_210x374.png"
              routes={[
                {
                  name: "Home",
                  path: "#"
                }
              ]}
            />
          </div>  
        </div>
        <div className="flex flex-col items-center justify-start w-full gap-[47px]">
          <div className="flex flex-col items-center justify-start w-full gap-[23px] md:px-5 max-w-7xl">
            <Heading size="xl" as="h2">
              Popular Courses
            </Heading>
            <div className="justify-center w-full md:w-[90%] gap-10 md:gap-5 grid-cols-2 md:grid-cols-1 grid">
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
            <div className="flex flex-row md:flex-col md:items-center w-full gap-[25px]">
              {books && books.map((book) => (
                <BookCard1 book={book} key={book._id} />
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