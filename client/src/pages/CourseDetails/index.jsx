import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Heading, Button, RatingBar, Text, Img, Header, Footer, BreadCrumbs } from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CourseDetails() {
  const { id } = useParams()
  const [course, setCourse] = useState()
  const [instructor, setInstructor] = useState("")
  const navigate = useNavigate()

  const getCourse = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/v1/course/${id}`)
      if (data) setCourse(data)
    } catch (error) {
      console.log(error.response)
    }
  }

  const getInstructor = async () => {
    if (course?.instructorId) {
      try {
        const { data } = await axios.get(`http://localhost:3001/api/v1/mentor/${course.instructorId}`)
        if (data) setInstructor(data.name)
      } catch (error) {
        console.log(error.response)
      }
    }
  }

  useEffect(() => {
    getCourse()
  }, [])

  useEffect(() => {
    getInstructor()
  }, [course])

  return (
    <>
      <Helmet>
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[99px] bg-gray-100">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" />
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
                    <Img
                      src="images/img_pexels_vanessa_garcia_6325959.png"
                      alt="pexelsvanessa"
                      className="justify-center h-[455px] w-full sm:w-full left-0 bottom-0 right-0 top-0 m-auto object-cover absolute rounded-[20px]"
                    />
                    <Button
                      size="4xl"
                      shape="circle"
                      className="w-[60px] left-0 bottom-0 right-0 top-0 m-auto absolute"
                    >
                      <Img src="images/img_call_button.svg" />
                    </Button>
                  </div>
                </div>
                <Heading size="lg" as="h1" className="!text-black-900_02">
                  {course?.name} | Episode 2
                </Heading>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-[32%] md:w-full mr-[5px] gap-3">
              <Heading size="lg" as="h2" className="!text-black-900_02">
                Course Playlists
              </Heading>
              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-row justify-start items-center  gap-2.5 p-2.5 bg-white-A700 cursor-pointer rounded-[10px] hover:shadow-sm">
                  <Img
                    src="images/img_image.png"
                    alt="image"
                    className="w-[23%] md:h-auto sm:w-full object-cover rounded-[5px]"
                  />
                  <div className="flex flex-col items-start justify-start w-[70%] gap-[3px]">
                    <Heading as="p" className="!text-black-900_02 w-full truncate">
                      Introduction - {course?.name}
                    </Heading>
                    <Text size="s" as="p">
                      1:57
                    </Text>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center w-full gap-2.5 p-2.5 bg-white-A700 shadow-sm cursor-pointer rounded-[10px] hover:shadow-sm">
                  <Img
                    src="images/img_image.png"
                    alt="image_one"
                    className="w-[23%] md:h-auto sm:w-full object-cover rounded-[5px]"
                  />
                  <div className="flex flex-col items-start justify-start w-[64%] gap-[3px]">
                    <Heading as="h4" className="!text-black-900_02  w-full truncate">
                      episode 2 - {course?.name}
                    </Heading>
                    <Text size="s" as="p">
                      5:43
                    </Text>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center w-full gap-2.5 p-2.5 bg-white-A700 cursor-pointer rounded-[10px] hover:shadow-sm">
                  <div className="flex flex-row justify-start w-[23%]">
                    <div className="h-[50px] w-full sm:w-full relative">
                      <Img
                        src="images/img_image_50x80.png"
                        alt="image_one"
                        className="justify-center h-[50px] w-full sm:w-full left-0 bottom-0 right-0 top-0 m-auto opacity-0.5 object-cover absolute rounded-[5px]"
                      />
                      <div className="flex flex-col items-center justify-center h-max w-max left-0 bottom-0 right-0 top-0 p-1 m-auto bg-white-A700 absolute rounded-[50%]">
                        <Img src="images/img_lock_pad_lock_s.svg" alt="lockpadlocks" className="h-[10px] w-[10px]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start w-[64%] gap-[3px]">
                    <Heading as="h5" className="!text-black-900_87 opacity-0.5 w-full truncate">
                      Maths - for Standard 3 St..
                    </Heading>
                    <Text size="s" as="p" className="!text-deep_orange-400_87 opacity-0.5">
                      8:11
                    </Text>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center w-full gap-2.5 p-2.5 opacity-0.5 bg-white-A700_87 cursor-pointer rounded-[10px] hover:shadow-sm">
                  <div className="flex flex-row justify-start w-[23%]">
                    <div className="h-[50px] w-full sm:w-full relative">
                      <Img
                        src="images/img_image_50x80.png"
                        alt="image_one"
                        className="justify-center h-[50px] w-full sm:w-full left-0 bottom-0 right-0 top-0 m-auto opacity-0.5 object-cover absolute rounded-[5px]"
                      />
                      <div className="flex flex-col items-center justify-center h-max w-max left-0 bottom-0 right-0 top-0 p-1 m-auto bg-white-A700 absolute rounded-[50%]">
                        <Img src="images/img_lock_pad_lock_s.svg" alt="lockpadlocks" className="h-[10px] w-[10px]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start w-[64%] gap-[3px]">
                    <Heading as="h6" className="!text-black-900_87 opacity-0.5">
                      Maths - for Standard 3 St..
                    </Heading>
                    <Text size="s" as="p" className="!text-deep_orange-400_87 opacity-0.5">
                      6:10
                    </Text>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center w-full gap-2.5 p-2.5 opacity-0.5 bg-white-A700_87 cursor-pointer rounded-[10px] hover:shadow-sm">
                  <div className="flex flex-row justify-start w-[23%]">
                    <div className="h-[50px] w-full sm:w-full relative">
                      <Img
                        src="images/img_image_50x80.png"
                        alt="image_one"
                        className="justify-center h-[50px] w-full sm:w-full left-0 bottom-0 right-0 top-0 m-auto opacity-0.5 object-cover absolute rounded-[5px]"
                      />
                      <div className="flex flex-col items-center justify-center h-max w-max left-0 bottom-0 right-0 top-0 p-1 m-auto bg-white-A700 absolute rounded-[50%]">
                        <Img src="images/img_lock_pad_lock_s.svg" alt="lockpadlocks" className="h-[10px] w-[10px]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start w-[64%] gap-[3px]">
                    <Heading as="h6" className="!text-black-900_87 opacity-0.5">
                      Maths - for Standard 3 St..
                    </Heading>
                    <Text size="s" as="p" className="!text-deep_orange-400_87 opacity-0.5">
                      10:00
                    </Text>
                  </div>
                </div>
                <div className="flex flex-row justify-start items-center w-full gap-2.5 p-2.5 opacity-0.5 bg-white-A700_87 cursor-pointer rounded-[10px] hover:shadow-sm">
                  <div className="flex flex-row justify-start w-[23%]">
                    <div className="h-[50px] w-full sm:w-full relative">
                      <Img
                        src="images/img_image_50x80.png"
                        alt="image_one"
                        className="justify-center h-[50px] w-full sm:w-full left-0 bottom-0 right-0 top-0 m-auto opacity-0.5 object-cover absolute rounded-[5px]"
                      />
                      <div className="flex flex-col items-center justify-center h-max w-max left-0 bottom-0 right-0 top-0 p-1 m-auto bg-white-A700 absolute rounded-[50%]">
                        <Img src="images/img_lock_pad_lock_s.svg" alt="lockpadlocks" className="h-[10px] w-[10px]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start w-[64%] gap-[3px]">
                    <Heading as="h6" className="!text-black-900_87 opacity-0.5">
                      Maths - for Standard 3 St..
                    </Heading>
                    <Text size="s" as="p" className="!text-deep_orange-400_87 opacity-0.5">
                      7:53
                    </Text>
                  </div>
                </div>
              </div>
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
                <div className="flex flex-row sm:flex-col justify-start items-center w-full mt-1.5 gap-2.5 py-[3px] sm:gap-2.5">
                  <div className="h-[10px] w-[10px] bg-deep_orange-400 rounded-[50%]" />
                  <Text as="p" className="mt-[3px] sm:mt-0 !text-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </Text>
                </div>
                <div className="flex flex-row sm:flex-col justify-start items-center w-full mt-2.5 gap-2.5 py-[3px] sm:gap-2.5">
                  <div className="h-[10px] w-[10px] bg-deep_orange-400 rounded-[50%]" />
                  <Text as="p" className="mt-[3px] sm:mt-0 !text-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </Text>
                </div>
                <div className="flex flex-row sm:flex-col justify-start items-center w-full mt-2.5 gap-2.5 py-[3px] sm:gap-2.5">
                  <div className="h-[10px] w-[10px] bg-deep_orange-400 rounded-[50%]" />
                  <Text as="p" className="mt-[3px] sm:mt-0 !text-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </Text>
                </div>
                <div className="flex flex-row sm:flex-col justify-start items-center w-full mt-2.5 gap-2.5 py-[3px] sm:gap-2.5">
                  <div className="h-[10px] w-[10px] bg-deep_orange-400 rounded-[50%]" />
                  <Text as="p" className="mt-[3px] sm:mt-0 !text-gray-900">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  </Text>
                </div>
                <div className="flex flex-row sm:flex-col justify-start items-center w-full mt-2.5 gap-2.5 py-[3px] sm:gap-2.5">
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
              <Button size="2xl" shape="round" className="w-full sm:px-5 font-medium" hover={true}>
                Purchase Course
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full">
          <div className="flex flex-col items-start justify-start w-full gap-12 md:px-5 max-w-7xl">
            <Heading size="3xl" as="h2" className="!font-metropolis">
              Similar Courses
            </Heading>
            <div className="w-full gap-10 grid-cols-2 md:grid-cols-1 md:gap-5 grid">

            </div>
          </div>
        </div>
        <Footer className="flex flex-col items-center justify-center w-full" />
      </div>
    </>
  );
}
