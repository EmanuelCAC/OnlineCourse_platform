import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Header, Text, Heading, Img, RatingBar, Button, Footer, BreadCrumbs, Input } from "components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Review() {
  const authData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate();
  const [updateCart, setUpdateCart] = useState(false)
  const [books, setBooks] = useState()
  const [courses, setCourses] = useState()
  const [booksToReview, setBooksToReview] = useState()
  const [coursesToReview, setCoursesToReview] = useState()
  const [bookInfo, setBookInfo] = useState()
  const [courseInfo, setCourseInfo] = useState()

  const getBooks = async () => {
    try {
      const {data} = await axios.post("http://localhost:3001/api/v1/ownedBook/all", {userId: authData.userId})
      setBooks(data)
    } catch (error) {
      console.log(error.response);
    }
  }

  const getCourses = async () => {
    try {
      const {data} = await axios.post("http://localhost:3001/api/v1/ownedCourse/all", {userId: authData.userId})
      setCourses(data)
    } catch (error) {
      console.log(error.response);
    }
  }

  const getBooksToReview = async () => {
    const toReview = books.map( async (book) => {
      try {
        const {data} = await axios.post("http://localhost:3001/api/v1/book/review/all", {bookId: book.bookId})
        const has = data.find((review) => {
          return review.createdBy == authData.userId
        })

        if (!has) {
          return book
        }

        return null
      } catch (error) {
        console.log(error.response);
      }
    })

    Promise.all(toReview).then((res) => res.filter((i) => {return i != null})).then((res) => setBooksToReview(res))
  }

  const getCoursesToReview = async () => {
    const toReview = courses.map( async (course) => {
      try {
        const {data} = await axios.post("http://localhost:3001/api/v1/course/review/all", {courseId: course.courseId})
        const has = data.find((review) => {
          return review.createdBy == authData.userId
        })

        if (!has) {
          return course
        }

        return null
      } catch (error) {
        console.log(error.response);
      }
    })

    Promise.all(toReview).then((res) => res.filter((i) => {return i != null})).then((res) => setCoursesToReview(res))
  }

  const getBookInfo = async () => {
    const books = booksToReview.map( async (book) => {
      try {
        const {data} = await axios.get(`http://localhost:3001/api/v1/book/${book.bookId}`)
        return data
      } catch (error) {
        console.log(error.response);
      }
    })

   Promise.all(books).then((res) => setBookInfo(res))
  }

  const getCourseInfo = async () => {
    const courses = coursesToReview.map( async (course) => {
      try {
        const {data} = await axios.get(`http://localhost:3001/api/v1/course/${course.courseId}`)
        return data
      } catch (error) {
        console.log(error.response);
      }
    })

   Promise.all(courses).then((res) => setCourseInfo(res))
  }

  useEffect(() => {
    getBooks()
    getCourses()
  }, [])

  useEffect(() => {
    if (books)
      getBooksToReview()
    if (courses)
      getCoursesToReview()
  }, [books, courses])

  useEffect(() => {
    if (booksToReview)
      getBookInfo()
    if (coursesToReview)
      getCourseInfo()
  }, [booksToReview, coursesToReview])

  return (
    <>
      <Helmet>
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" updateCart={updateCart} />
          <div className="flex flex-col items-start justify-start w-[70%] gap-[5px] p-5 md:px-5 max-w-7xl ">
            <BreadCrumbs routes={[
              {
                name: "Home",
                path: "/"
              },
              {
                name: "Review",
                path: "#"
              },
            ]} />
            {!(bookInfo || courseInfo) &&
              <div className="flex flex-col w-full align-middle pb-20 pt-16">
                <Text className="mx-auto text-6xl font-black py-10">No items to review yet!</Text>
                <Button className="max-w-fit mx-auto" hover={true} onClick={() => navigate('/shop')}>Go Shopping!</Button>
              </div>
            }
            {(bookInfo || courseInfo) &&
              <div className="flex flex-row w-full gap-5">
                <div className="flex flex-col w-full bg-white-A700 rounded-[20px] p-5 md:px-5 mt-3">
                  <Text className="!text-black-900_02 !text-3xl !font-medium">Items</Text>
                  {courseInfo && courseInfo.map((item) => (
                    <div key={item._id}>
                      <div className="flex flex-row pb-5 pt-3" >
                        <Img src={item.image} className={'w-28 mr-3 border-2 cursor-pointer'} onClick={() => (navigate('/courses/' + item._id))} />
                        <div className="flex flex-col justify-between w-full">
                          <div>
                            <Text className=" !text-black-900_02 !text-lg cursor-pointer" onClick={() => (navigate('/courses/' + item._id))}>{item.name}</Text>
                          </div>
                          <div className="flex flex-row justify-between ">
                            <Text size="lg" className=" font-extrabold">R$ {item.price.toFixed(2)}</Text>
                            <Button variant="outline" className="rounded-[15px] !h-fit !py-0 !px-3 hover:bg-red-300_01 hover:text-white-A700">Review</Button>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                  {bookInfo && bookInfo.map((item) => (
                    <div key={item._id}>
                      <div className="flex flex-row pb-5 pt-3" >
                        <Img src={item.image} className={'w-28 mr-3 border-2 cursor-pointer'} onClick={() => (navigate('/shop/' + item._id))} />
                        <div className="flex flex-col justify-between w-full">
                          <div>
                           <Text className=" !text-black-900_02 !text-lg cursor-pointer" onClick={() => (navigate('/shop/' + item._id))}>{item.name}</Text>
                          </div>
                          <div className="flex flex-row justify-between ">
                            <Text size="lg" className=" font-extrabold">R$ {item.price.toFixed(2)}</Text>
                            <Button variant="outline" className="rounded-[15px] !h-fit !py-0 !px-3 hover:bg-red-300_01 hover:text-white-A700">Review</Button>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
              </div>
            }
          </div>
          <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
        </div>
      </div >
    </>
  )
}