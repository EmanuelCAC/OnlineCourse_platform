import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Heading, Button, RatingBar, Text, Img, Header, Footer, BreadCrumbs, ReviewComment } from "../../components";
import ReviewModal from "modals/Review";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CourseCard2 from "components/CourseCard2";
import { useSelector } from "react-redux";
import LogIn from "modals/LogIn";
import SignUp from "modals/SignUp";
import { Scrollbar } from 'react-scrollbars-custom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CourseDetails() {
  let { id } = useParams()
  const [course, setCourse] = useState()
  const [coursePlaylist, setCoursePlaylist] = useState([])
  const [index, setIndex] = useState(0)
  const [updateCart, setUpdateCart] = useState(false)
  const [similarCourses, setSimilarCourses] = useState([])
  const [instructor, setInstructor] = useState("")
  const [reviews, setReviews] = useState([])
  const [review, setReview] = useState()
  const [editReview, setEditReview] = useState(false)
  const [totalReviews, setTotalReviews] = useState(0)
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)
  const [owned, setOwned] = useState(false)
  const navigate = useNavigate()
  const authData = useSelector((state) => state.auth.userData)
  const added = () => toast.info(`Course "${course.name}" added to the cart!`)
  

  const getCourse = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APILINK}/course/${id}`)
      if (data) setCourse(data)
    } catch (error) {
      console.log(error.response)
    }
  }

  const getCoursePlaylist = async (req, res) => {
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_APILINK}/coursePlaylist/all`, {courseId: id})
      setCoursePlaylist(data)
    } catch (error) {
      console.log(error.response);
    }
  }

  const getReviews = async () => {
    const { data } = await axios.post(`${import.meta.env.VITE_APILINK}/course/review/all`, { courseId: id })
    const reviewsList = data.map(async (review) => {
      const data = await fetch(`${import.meta.env.VITE_APILINK}/user/${review.createdBy}`)
      const user = await data.json()
      if (user) {
        review.userName = user.name
        review.image = user?.image || "/images/img_profile_24_outline.svg"
        review.likeAmount = review.like.length
      }
      return review
    })

    if (reviewsList) Promise.all(reviewsList).then((result) => setReviews(result))
  }

  const getSimilarCourses = async () => {
    if (course?.category) {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_APILINK}/course?category=${course.category[1]}`)
        if (data) setSimilarCourses(data)
      } catch (error) {
        console.log(error.response)
      }
    }
  }

  const getInstructor = async () => {
    if (course?.instructorId) {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_APILINK}/mentor/${course.instructorId}`)
        if (data) setInstructor(data.name)
      } catch (error) {
        console.log(error.response)
      }
    }
  }

  const purchase = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_APILINK}/cart/new`,
        {
          userId: authData.userId,
          productId: id,
          productName: course.name,
          image: course.image,
          price: course.price,
          type: "course"
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      setUpdateCart(!updateCart)
      added()
    } catch (error) {
      console.log(error.response)
    }
  }

  const updateCourse = async () => {
    const { data } = await axios.patch(`${import.meta.env.VITE_APILINK}/course/${id}`)
    setCourse(data)
  }

  const ownership = async () => {
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_APILINK}/ownedCourse/all`, {userId: authData.userId})
      data.map((course) => {
        if(course.courseId == id) {
          setOwned(true)
        }
      })
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    getCourse()
    getCoursePlaylist()
  }, [id])

  useEffect(() => {
    getInstructor()
    getSimilarCourses()
    getReviews()
  }, [course])

  useEffect(() => {
    getCourse()
    updateCourse()
    if (reviews.length > 0) {
      setTotalReviews(reviews.length)
    } else if (reviews.lenght == 0) {
      setTotalReviews(0)
    }
  }, [reviews])

  useEffect(() => {
    ownership()
  }, [])

  return (
    <>
      <Helmet>
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[70px] bg-gray-100 px-5">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" updateCart={updateCart} />
          <div className="flex flex-row md:flex-col justify-between items-start w-full p-6 md:gap-10 md:px-5 sm:p-5 bg-gray-200_01 max-w-7xl rounded-[20px]">
            <div className="flex flex-col items-start justify-start w-[63%] md:w-full ml-[5px] gap-[29px]">
              <BreadCrumbs routes={[
                {
                  name: "Home",
                  path: "/"
                },
                {
                  name: "Courses",
                  path: "/courses"
                },
                {
                  name: course?.name,
                  path: "#"
                }
              ]} />
              <div className="flex flex-col items-start justify-start w-full gap-[29px]">
                <div className="flex flex-row justify-start w-full">
                  <div className="h-[455px] w-full relative">
                    {coursePlaylist[index] && <video id="myVideo" key={index} className="justify-center h-[455px] w-full sm:w-full left-0 bottom-0 right-0 top-0 m-auto object-cover absolute rounded-[20px]" controls controlsList="nodownload" poster="/images/img_pexels_vanessa_garcia_6325959.png">
                      <source src={coursePlaylist[index]?.video} type="video/mp4"/>
                    </video>}
                  </div>
                </div>  
                <Heading size="lg" as="h1" className="!text-black-900_02">
                  {coursePlaylist[index]?.name} | {course?.name}
                </Heading>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-[32%] md:w-full mr-[5px] gap-3">
              <Heading size="lg" as="h2" className="!text-black-900_02 mb-3">
                Course Playlists
              </Heading>
              <Scrollbar style={{ height: 510}} wrapperProps={{ style: "" }}>
              <div className="flex flex-col w-full gap-4">
              {coursePlaylist[index] && coursePlaylist.map((video, i) => (
                  <div className="flex flex-row justify-start items-center gap-2.5 p-2.5 bg-white-A700 cursor-pointer rounded-[10px] hover:shadow-sm mr-4"
                  key={i}
                  id={video.order}
                  onClick={() => {
                    if (owned || i < 2) 
                      setIndex(i)
                  }}>
                  <div className="flex flex-row justify-start w-full max-w-[90px]">
                    <div className="h-[50px] w-full sm:w-full relative">
                      <Img
                        src={video?.poster}
                        alt="image_one"
                        className="justify-center h-[50px] sm:w-full left-0 bottom-0 right-0 top-0 m-auto opacity-0.5 object-cover absolute rounded-[5px]"
                      />
                      {!owned && i >= 2 &&
                      <>
                        <div className="w-full h-full bg-white-A700/40 rounded-[5px] left-0 bottom-0 right-0 top-0 absolute"></div>
                        <div className="flex flex-col items-center justify-center h-max w-max left-0 bottom-0 right-0 top-0 p-1 m-auto bg-white-A700 absolute rounded-[50%]">
                          <Img src="/images/img_lock_pad_lock_s.svg" alt="lockpadlocks" className="h-[10px] w-[10px]" />
                        </div>
                      </>}
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start w-[70%] gap-[3px]">
                    <Heading as="p" className={`${!owned && i >= 2 ? "!text-black-900_87" : "!text-black-900_02"} w-full truncate`}>
                      {video.name} - {course?.name}
                    </Heading>
                    <Text size="s" as="p" className={`${!owned && i >= 2 && "!text-deep_orange-400_87"}`}>
                      {video.duration}
                    </Text>
                  </div>
                </div>
                ))}
                </div>
              </Scrollbar>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full">
          <div className="flex flex-row md:flex-col justify-start items-start w-full gap-10 md:gap-5 md:px-5 max-w-7xl">
            <div className="flex flex-col items-center justify-start w-[66%] md:w-full gap-6">
              <div className="flex flex-col items-start justify-start w-full gap-2">
                <Heading size="xl" as="h2">
                  Course Details
                </Heading>
                <Text as="p" className="!text-gray-700_01 !leading-[30px]">
                  <>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
                    accumsan lacus vel facilisis consectetur adipiscing elit.
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
                    accumsan lacus vel facilisis consectetur adipiscing elit.
                  </>
                </Text>
              </div>
              {course?.certificated && <div className="flex flex-col items-start justify-start w-full gap-2">
                <Heading size="xl" as="h3">
                  Certification
                </Heading>
                <Text as="p" className="!text-gray-700_01 !leading-[30px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
                  lacus vel facilisis consectetur adipiscing elit.
                </Text>
              </div>}
              <div className="flex flex-col items-start justify-start w-full gap-2">
                <Heading size="xl" as="h4">
                  Who this course is for
                </Heading>
                <Text as="p" className="!text-gray-700_01 !leading-[30px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
                  lacus vel facilisis consectetur adipiscing elit.
                </Text>
              </div>
              <div className="flex flex-col items-start justify-start w-full pt-0.5">
                <Heading size="xl" as="h5">
                  What you&#39;ll learn in this course:
                </Heading>
                <div className="flex flex-row justify-start items-center w-full mt-1.5 gap-2.5 py-[3px] sm:gap-2.5">
                  <div className="h-[10px] w-[10px] bg-deep_orange-400 rounded-[50%]" />
                  <Text as="p" className="mt-[3px] sm:mt-0 !text-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </Text>
                </div>
                <div className="flex flex-row justify-start items-center w-full mt-2.5 gap-2.5 py-[3px] sm:gap-2.5">
                  <div className="h-[10px] w-[10px] bg-deep_orange-400 rounded-[50%]" />
                  <Text as="p" className="mt-[3px] sm:mt-0 !text-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </Text>
                </div>
                <div className="flex flex-row justify-start items-center w-full mt-2.5 gap-2.5 py-[3px] sm:gap-2.5">
                  <div className="h-[10px] w-[10px] bg-deep_orange-400 rounded-[50%]" />
                  <Text as="p" className="mt-[3px] sm:mt-0 !text-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </Text>
                </div>
                <div className="flex flex-row justify-start items-center w-full mt-2.5 gap-2.5 py-[3px] sm:gap-2.5">
                  <div className="h-[10px] w-[10px] bg-deep_orange-400 rounded-[50%]" />
                  <Text as="p" className="mt-[3px] sm:mt-0 !text-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </Text>
                </div>
                <div className="flex flex-row justify-start items-center w-full mt-2.5 gap-2.5 py-[3px] sm:gap-2.5">
                  <div className="h-[10px] w-[10px] bg-deep_orange-400 rounded-[50%]" />
                  <Text as="p" className="mt-[3px] sm:mt-0 !text-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start w-[32%] md:w-full gap-[23px]">
              <div className="flex flex-col items-center justify-center w-full gap-[19px] p-[19px] bg-white-A700 rounded-[10px]">
                <div className="flex flex-row justify-between items-center w-full mt-[5px]">
                  <Heading size="s" as="h6" className="!text-gray-700_01">
                    Price
                  </Heading>
                  <Heading size="lg" as="h4" className="!text-deep_orange-400 text-right !font-bold">
                    ${course?.price?.toFixed(2)}
                  </Heading>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <Heading size="s" as="h5" className="mb-0.5 !text-gray-700_01">
                    Instructor
                  </Heading>
                  <Heading size="s" as="a" className="text-right underline cursor-pointer" onClick={() => { navigate(`/mentor/${course?.instructorId}`) }}>
                    {instructor}
                  </Heading>
                </div>
                <div className="flex flex-row justify-between items-start w-full">
                  <Heading size="s" as="h5" className="!text-gray-700_01">
                    Ratings
                  </Heading>
                  <RatingBar
                    value={course?.rating}
                    isEditable={false}
                    size={18}
                    className="flex justify-between"
                  />
                </div>
                <div className="flex flex-row justify-between w-full">
                  <Heading size="s" as="h5" className="mb-0.5 !text-gray-700_01">
                    Durations
                  </Heading>
                  <Heading size="s" as="h5" className="text-right">
                    {course?.duration} Days
                  </Heading>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <Heading size="s" as="h5" className="mt-px !text-gray-700_01">
                    Lessons
                  </Heading>
                  <Heading size="s" as="h5" className="text-right">
                    {course?.lessons}
                  </Heading>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <Heading size="s" as="h5" className="mt-px !text-gray-700_01">
                    Quizzes
                  </Heading>
                  <Heading size="s" as="h5" className="text-right">
                    {course?.quizzes}
                  </Heading>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <Heading size="s" as="h5" className="mb-px !text-gray-700_01">
                    Certificate
                  </Heading>
                  <Heading size="s" as="h5" className="text-right">
                    {course?.certificated ? "Yes" : "No"}
                  </Heading>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <Heading size="s" as="h5" className="!text-gray-700_01">
                    Language
                  </Heading>
                  <Heading size="s" as="h5" className="text-right">
                    {course?.language}
                  </Heading>
                </div>
                <div className="flex flex-row justify-between w-full mb-[5px]">
                  <Heading size="s" as="h5" className="mt-px !text-gray-700_01">
                    Access
                  </Heading>
                  <Heading size="s" as="h5" className="text-right">
                    {course?.access}
                  </Heading>
                </div>
              </div>
              {!owned && <Button size="2xl" shape="round" className="w-full sm:px-5 font-medium" hover onClick={() => {
                if (authData)
                  purchase()
                else
                  setLogin(true)
              }}>
                Purchase Course
              </Button>}
            </div>
          </div>
        </div>
        <div className="flex flex-col px-8 w-[70%] md:w-[95%] bg-white-A700 rounded-[15px]">
          <Heading size="xl" className="py-8 font-normal">Reviews</Heading>
          <div className="flex flex-row h-[60px] gap-3">
            <Text as="span" className="text-5xl font-extrabold h-[36px] my-auto">{course?.rating || 0}</Text>
            <div className="flex flex-col my-auto">
              <RatingBar value={course?.rating || 0} size={20} />
              <Text size="md">{totalReviews} reviews</Text>
            </div>
          </div>
          <div className="flex flex-col w-full pl-3 pr-6 gap-2 my-5">
            {reviews && reviews.map((review) => (
              <ReviewComment key={review._id} review={review} getReviews={() => getReviews()} setEditReview={() => setEditReview(!editReview)} setReview={() => setReview(review)} target={"course"} />
            ))}
          </div>
          <ReviewModal isOpen={editReview} close={() => setEditReview(false)} onRequestClose={() => setEditReview(false)} review={review} target={"course"} id={id} />
        </div>
        <div className="flex flex-row justify-center w-full">
          {similarCourses[1] && <div className="flex flex-col items-start justify-start w-full gap-12 md:px-5 max-w-7xl">
            <Heading size="3xl" as="h2" className="!font-metropolis">
              Similar Courses
            </Heading>
            <div className="w-full gap-10 grid-cols-2 md:grid-cols-1 md:gap-5 grid">
              {similarCourses.map((similarCourse) => (
                similarCourse._id != course._id && (<CourseCard2 course={similarCourse} key={similarCourse._id} />)
              ))}
            </div>
          </div>}
        </div>
        <LogIn
          isOpen={login}
          isSignupOpen={() => {
            setLogin(false)
            setSignup(true)
          }}
          close={() => setLogin(false)}
          onRequestClose={() => setLogin(false)}
        />
        <SignUp
          isOpen={signup}
          isLoginOpen={() => {
            setSignup(false)
            setLogin(true)
          }}
          close={() => setSignup(false)}
          onRequestClose={() => setSignup(false)}
        />
        <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
      </div>
    </>
  );
}
