import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Text, Heading, Img, Button, Header, Footer, BreadCrumbs, RatingBar } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";


export default function SinglementordetailsPage() {
  const { id } = useParams()
  const [mentor, setMentor] = useState()
  const [roles, setRoles] = useState("")
  const [language, setLanguage] = useState("")
  const [courses, setCourses] = useState([])
  const [reviews, setReviews] = useState([])
  const [active, setActive] = useState("About")
  const authData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()

  const getMentor = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/v1/mentor/${id}`)
      if (data) {
        setMentor(data)
        setRoles(data.role.join(' & '))
        setLanguage(data.language.join(", "))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getCourses = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/v1/course?instructorId=${id}`)
      if (data) setCourses(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getReviews = async () => {
    if (mentor?.id) {
      try {
        const { data } = await axios.post(`http://localhost:3001/api/v1/mentor/review/all`, { instructorId: mentor._id })
        if (data) setReviews(data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getMentor()
    getCourses()
    getReviews()
  }, [])



  return (
    <>
      <Helmet>
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100">
        <div className="flex flex-col items-center justify-start w-full gap-[60px]">
          <div className="flex flex-col items-center justify-start w-full gap-12">
            <Header className="flex flex-row justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" />
            <div className="flex flex-row justify-center w-full">
              <div className="flex flex-row justify-center w-full md:px-5 max-w-7xl">
                <div className="flex flex-col items-start justify-start w-full">
                  <div className="flex flex-row justify-start w-full">
                    <div className="flex flex-row justify-start w-full p-[29px] sm:p-5 bg-red-50 rounded-[20px]">
                      <div className="mb-[92px]">
                        <BreadCrumbs routes={[
                          {
                            name: "Home",
                            path: "/"
                          },
                          {
                            name: "Mentor",
                            path: "/mentor"
                          },
                          {
                            name: mentor?.name,
                            path: "#"
                          }
                        ]} />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-start w-[32%] md:w-full mt-[-81px] ml-[30px] md:ml-0 sm:ml-5">
                    <div className="flex flex-row sm:flex-col justify-start items-center w-full gap-5 sm:gap-5">
                      <Img
                        src={mentor?.image}
                        alt="bg_one"
                        className="w-[170px] md:h-auto mb-px object-cover rounded-[10px]"
                      />
                      <div className="flex flex-col items-start justify-start w-[53%] sm:w-full gap-0.5">
                        <Text size="lg" as="p" className="!text-gray-900">
                          {mentor?.name}
                        </Text>
                        <Text size="md" as="p" className="!text-gray-500">
                          {mentor && roles}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center w-full">
            <div className="flex flex-row md:flex-col justify-start items-start w-full gap-10 md:gap-5 md:px-5 max-w-7xl">
              <div className="flex flex-col items-center justify-start w-[66%] md:w-full gap-[29px]">
                <div className="flex flex-row md:flex-col justify-start w-full gap-6 md:gap-5">
                  <div className="flex flex-row md:flex-col justify-start w-[79%] md:w-full gap-[19px] md:gap-5">
                    <Button onClick={() => setActive("About")} color={active == "About" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[205px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
                      About
                    </Button>
                    <Button onClick={() => setActive("Courses")} color={active == "Courses" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[205px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
                      Courses
                    </Button>
                    <Button onClick={() => setActive("Reviews")} color={active == "Reviews" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[205px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
                      Reviews
                    </Button>
                  </div>
                  <Button className="sm:px-5 font-medium min-w-[160px] rounded-[10px]">Contact Now</Button>
                </div>
                {active == "About" &&
                  (
                    <div className="flex flex-col items-center justify-start w-full gap-[29px]">
                      <div className="flex flex-col items-start justify-start w-full gap-2">
                        <Heading size="xl" as="h1">
                          About {mentor?.name}
                        </Heading>
                        <Text as="p" className="!leading-[30px] !text-gray-900">
                          <>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                            maecenas accumsan lacus vel facilisis consectetur adipiscing elit.
                            <br />
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                            maecenas accumsan lacus vel facilisis consectetur adipiscing elit.
                          </>
                        </Text>
                      </div>
                      {mentor?.graduated && (
                        <div className="flex flex-col items-start justify-start w-full gap-2 ">
                          <Heading size="xl" as="h2">
                            Certification
                          </Heading>
                          <Text as="p" className="!leading-[30px] !text-gray-900">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                            maecenas accumsan lacus vel facilisis consectetur adipiscing elit.
                          </Text>
                        </div>
                      )}
                    </div>
                  )}
                {active == "Courses" &&
                  (
                    <div className="flex flex-col items-center justify-start w-full gap-[29px]">
                      <div className="flex flex-col items-start justify-start w-full gap-2">
                        <Heading size="xl" as="h1">
                          Courses
                        </Heading>
                        {courses[0] ?
                          courses.map((course) => (
                            <div
                              className="flex flex-row justify-start w-full gap-6 p-[15px] bg-white-A700 cursor-pointer rounded-[10px] hover:shadow-xs"
                              key={course._id}
                              onMouseLeave={() => {
                                const button = document.getElementById(course._id)
                                button.className = button.className.replace('bg-red-300_01', 'bg-red-100')
                                const child = button.querySelector('#child')
                                child.src = "/images/img_shopping_bag_24.svg"
                              }}
                              onMouseOver={() => {
                                const button = document.getElementById(course._id)
                                button.className = button.className.replace('bg-red-100', 'bg-red-300_01')
                                const child = button.querySelector('#child')
                                child.src = "/images/img_shopping_bag_24_white_a700.svg"
                              }}
                              onClick={() => { navigate('/courses/' + course._id) }}
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
                                    <Text as="p" size="s" className="!text-gray-700_01">{mentor.name}</Text>
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
                          ))
                          :
                          (
                            <Text className="mx-auto text-6xl font-black pt-14">No course yet</Text>
                          )}
                      </div>
                    </div>
                  )}
                {active == "Reviews" && (<div className="flex flex-col items-center justify-start w-full gap-[29px]">
                  <div className="flex flex-col items-start justify-start w-full gap-2">
                    <Heading size="xl" as="h1">
                      Reviews
                    </Heading>
                    {reviews[0] ?
                      (
                        reviews.map((review) => (
                          <div key={review._id} onMouseLeave={() => {
                            const item = document.getElementsByName(review._id)
                            if (!item[0].className.includes('hidden')) item[0].className += ' hidden'
                          }}>
                            <div className="flex flex-col w-full gap-2 my-3">
                              <div className="flex flex-row w-full gap-2">
                                <Img src="images/img_profile_24_outline.svg" className="h-[30px] w-[30px]" />
                                <Text className="!text-gray-600 !font-medium h-5 my-auto">{review.userName}</Text>
                                <Text className="!text-gray-500 !font-medium h-4 my-auto ml-auto" size="xs">{review.updatedAt.substr(0, 10)}</Text>
                              </div>
                              <RatingBar value={review.rating} />
                              <Text className="!text-gray-800 !font-medium">
                                {review.comment}
                              </Text>
                              <div className="flex flex-row w-full gap-2 h-[38px]">
                                <div className="relative">
                                  <Button
                                    className={`absolute w-[76px] rounded-full border-2 ${authData && review.like.includes(authData.userId) ? 'border-[#FF6652]' : 'border-[#6B7280]'} hover:mt-[-1px] hover:border-[#FF6652] hover:shadow-[#FF6652] shadow active:shadow-none active:mt-0 gap-1 font-medium`}
                                    color="white_A700"
                                    size="xs"
                                    rightIcon={<img width="24" height="24" src={`https://img.icons8.com/material-outlined/24/${authData && review.like.includes(authData.userId) ? 'FF6652' : '6B7280'}/facebook-like--v1.png`} alt="facebook-like--v1" />}
                                    children={<Text className={`text-inherit !font-medium ${authData && review.like.includes(authData.userId) ? '!text-[#FF6652]' : '!text-[#6B7280]'} pt-[2px]`}>Útil</Text>}
                                    onClick={() => { if (authData) toogleLike(review) }}
                                  />
                                </div>
                                <Text className="text-inherit !font-medium !text-gray-400 h-5 my-auto ml-20">{review.likeAmount} Likes</Text>
                                <div className="flex flex-col ml-auto relative">
                                  <Button
                                    shape="circle"
                                    color="white_A700"
                                    size="xs"
                                    className="w-[36px] h-[36px] px-0 right-0 top-0 absolute shadow-none active:shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.1)] active:mt-[4px] hover:shadow-[0_2px_4px_0_rgb(0,0,0,0.2)] hover:mt-[-2px]"
                                    children={<img width="24" height="24" src="https://img.icons8.com/material-rounded/24/737373/menu-2.png" alt="menu-2" />}
                                    onClick={() => {
                                      const item = document.getElementsByName(review._id)
                                      if (item[0].className.includes('hidden')) item[0].className = item[0].className.replace('hidden', '')
                                      else item[0].className += ' hidden'
                                    }}
                                  />
                                  {authData && review.createdBy == authData.userId ? (
                                    <Button
                                      name={review._id}
                                      shape="round"
                                      color="white_A700"
                                      size="xs"
                                      rightIcon={<img className="mr-2" width="20" height="20" src="https://img.icons8.com/material/20/9ca38f/pencil--v2.png" alt="pencil--v2" />}
                                      className="border-2 border-gray-300 absolute top-9 right-2 hidden"
                                      children={<Text className="text-inherit !font-medium !text-gray-400 pr-1 pl-2">Edit</Text>}
                                      onClick={() => {
                                        const item = document.getElementsByName(review._id)
                                        item[0].className += ' hidden'
                                        setReview(review)
                                        setEditReview(true)
                                      }}
                                    />
                                  ) : (
                                    <Button
                                      name={review._id}
                                      shape="round"
                                      color="white_A700"
                                      size="xs"
                                      className="border-2 border-gray-300 absolute top-9 right-2 hidden"
                                      onMouse
                                      children={<Text className="text-inherit !font-medium !text-gray-400 pt-[2px]">Report</Text>}
                                      onClick={() => {
                                        const item = document.getElementsByName(review._id)
                                        item[0].className += ' hidden'
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                            <hr />
                          </div>
                        ))
                      )
                      :
                      (
                        <Text className="mx-auto text-6xl font-black pt-14">No review yet</Text>
                      )}
                  </div>
                </div>)}
              </div>
              <div className="flex flex-col items-center justify-center w-[32%] md:w-full gap-[19px] p-5 bg-white-A700 rounded-[10px]">
                <div className="flex flex-row justify-between items-center w-full mt-[9px]">
                  <Heading size="s" as="h3" className="!text-gray-700_01">
                    Total Course
                  </Heading>
                  <Heading size="lg" as="h4" className="!text-deep_orange-400 text-right">
                    {mentor?.totalCourse}
                  </Heading>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <div className="flex flex-row justify-start items-start gap-2">
                    <Heading size="s" as="h5" className="!text-gray-700_01">
                      Ratings
                    </Heading>
                  </div>
                  <Heading size="s" as="h6" className="text-right">
                    {mentor?.rating}
                  </Heading>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <Heading size="s" as="h5" className="mt-px !text-gray-700_01">
                    Experiences
                  </Heading>
                  <Heading size="s" as="h5" className="text-right">
                    {mentor?.experience} Years
                  </Heading>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <Heading size="s" as="h5" className="mb-px !text-gray-700_01">
                    Graduated
                  </Heading>
                  <Heading size="s" as="h5" className="text-right">
                    {mentor?.graduated ? "Yes" : "No"}
                  </Heading>
                </div>
                <div className="flex flex-row justify-between w-full">
                  <Heading size="s" as="h5" className="!text-gray-700_01">
                    Language
                  </Heading>
                  <Heading size="s" as="h5" className="text-right">
                    {language}
                  </Heading>
                </div>
                <div className="flex flex-row justify-between items-center w-full mb-2.5">
                  <Heading size="s" as="h5" className="!text-gray-700_01">
                    Social
                  </Heading>
                  <div className="flex flex-row justify-between items-center w-auto gap-[15px]">
                    <Img
                      src="images/img_facebook_logo_1_gray_900.svg"
                      alt="facebooklogoone"
                      className="h-[22px] w-[22px]"
                    />
                    <Button color="deep_orange_400" size="xs" shape="circle" className="w-[36px]">
                      <Img src="images/img_instagram_icon.svg" />
                    </Button>
                    <Img src="images/img_twitter_logo_gray_900.svg" alt="twitterlogo_one" className="h-[17px]" />
                    <Img src="images/img_linkedin_icon_gray_900.svg" alt="linkedinicon" className="h-[18px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
      </div>
    </>
  );
}
