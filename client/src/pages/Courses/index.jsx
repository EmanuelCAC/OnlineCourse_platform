import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Button, Img, Text, SelectBox, Input, Heading, Header, BreadCrumbs, RatingBar, Footer } from "../../components";
import { useNavigate } from "react-router-dom";


const dropDownOptions = [
  { label: "Latest", value: "-createdAt" },
  { label: "Earliest", value: "createdAt" },
  { label: "A - Z", value: "name" },
  { label: "Z - A", value: "-name" },
  { label: "$ - $$$", value: "price" },
  { label: "$$$ - $", value: "-price" },
];

export default function EduviCoursesPage() {
  const [searchBarValue, setSearchBarValue] = useState("");
  const [active, setActive] = useState("")
  const [courses, setCourses] = useState([])
  const [popularCourses, setPopularCourses] = useState([])
  const [sortBy, setSortBy] = useState("-createdAt")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const navigate = useNavigate()

  const pageHandler = (action) => {
    if (action === "next") {
      (page + 1) >= totalPages ? setPage(totalPages) : setPage(page + 1)
    } else if (action === "prev") {
      (page - 1) <= 1 ? setPage(1) : setPage(page - 1)
    }
  }

  const getTotalPages = async () => {
    const data = await fetch(`http://localhost:3001/api/v1/course?search=${searchBarValue}&sort=${sortBy}&category=${active}`)
    const result = await data.json()
    setTotalPages(Math.ceil(result.length / 8))
  }

  const categoryHandler = (category) => {
    if (active == category) {
      setActive("")
    } else setActive(category)
  }

  const getCourses = async () => {
    const data = await fetch(`http://localhost:3001/api/v1/course?search=${searchBarValue}&sort=${sortBy}&limit=8&page=${page}&category=${active}`)
    const result = await data.json()
    setCourses(result)
  }

  const getPopularCourses = async () => {
    const data = await fetch(`http://localhost:3001/api/v1/course?limit=4&sort=-rating`)
    const result = await data.json()
    setPopularCourses(result)
  }

  useEffect(() => {
    setPage(1)
  }, [active])

  useEffect(() => {
    if (history.state.category) setActive(history.state.category)
  }, [history.state.category])

  useEffect(() => {
    getCourses()
    getTotalPages()
  }, [active, searchBarValue, sortBy, page])

  useEffect(() => {
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
          <Header className="flex flex-row justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" />
          <div className="flex flex-col items-start justify-start w-full gap-[5px] p-5 md:px-5 bg-yellow-100 max-w-7xl rounded-[20px]">
            <BreadCrumbs routes={[
              {
                name: "Home",
                path: "/"
              },
              {
                name: "Courses",
                path: "#"
              }
            ]} />
            <div className="flex flex-row md:flex-col justify-between items-center w-[99%] md:w-full ml-2.5 gap-[436px] md:gap-10 md:ml-0">
              <Heading size="3xl" as="h1" className="w-[33%] !font-semibold">
                <>
                  Educatsy Courses
                  <br />
                  For All Standards
                </>
              </Heading>
              <div className="h-[210px] w-[32%] md:w-full relative">
                <div className="h-[14px] w-full bottom-[1%] right-0 left-0 m-auto bg-black-900_cc backdrop-opacity-[0.5] blur-[81.00px] absolute rounded-[50%]" />
                <Img
                  src="images/img_image_210x374.png"
                  alt="image_one"
                  className="justify-center h-[210px] w-[97%] sm:w-full left-0 bottom-0 right-0 top-0 m-auto object-cover absolute"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full gap-[47px]">
          <div className="flex flex-row md:flex-col justify-start w-full gap-5 md:px-5 max-w-7xl">
            <Button onClick={() => categoryHandler("Kindergarten")} color={active == "Kindergarten" ? "orange_200_01" : "white_A700"} className="font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              Kindergarten
            </Button>
            <Button onClick={() => categoryHandler("High School")} color={active == "High School" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              High School
            </Button>
            <Button onClick={() => categoryHandler("College")} color={active == "College" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              College
            </Button>
            <Button onClick={() => categoryHandler("Technology")} color={active == "Technology" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              Technology
            </Button>
            <Button onClick={() => categoryHandler("Science")} color={active == "Science" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              Science
            </Button>
            <Button onClick={() => categoryHandler("Language")} color={active == "Language" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              Language
            </Button>
            <Button onClick={() => categoryHandler("Mathematics")} color={active == "Mathematics" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              Mathematics
            </Button>
            <Button onClick={() => categoryHandler("Social Studies")} color={active == "Social Studies" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              Social Studies
            </Button>
          </div>
          <div className="flex flex-row md:flex-col justify-start w-full gap-[42px] md:gap-5 max-w-7xl">
            <Input
              color="white_A700"
              name="search"
              placeholder="Search Class or Course Name"
              value={searchBarValue}
              onChange={(e) => setSearchBarValue(e)}
              suffix={
                searchBarValue?.length > 0 ? (
                  <CloseSVG onClick={() => setSearchBarValue("")} height={24} width={24} fillColor="#0000000" />
                ) : (
                  <Img src="images/img_search.svg" alt="search" className="cursor-pointer opacity-0 fill-black-900_02" fill="#0000000" />
                )
              }
              className="w-[84%] md:w-full gap-[35px] !text-gray-700_99 rounded-tr-[10px] rounded-br-[10px] font-medium"
            />
            <SelectBox
              size="xs"
              shape="round"
              indicator={<Img src="images/img_arrowdown_red_300_01.svg" alt="arrow_down" />}
              name="sortby"
              placeholder="Sort by: Latest"
              options={dropDownOptions}
              className="w-[16%] md:w-full gap-px font-medium"
              onChange={(value) => { setSortBy(value.value) }}
            />
          </div>
          <div className="flex flex-row justify-center w-full">
            <div className="flex flex-col items-start justify-start w-full gap-[23px] md:px-5 max-w-7xl">
              <Heading size="xl" as="h2">
                {active ? active + " Courses" : "All Courses"}
              </Heading>
              <div className="flex flex-row justify-start w-full">
                <div className="w-full gap-10 md:gap-5 flex-row flex flex-wrap justify-center">
                  {courses[0] && courses.map((course) => (
                    <div className="flex flex-col items-center justify-start w-full max-w-fit" key={course._id}>
                      <div className="flex flex-col items-center justify-between w-full h-full p-[15px] bg-white-A700 rounded-[15px]">
                        <div className="flex flex-col items-center justify-start w-full gap-3 md:px-5 max-w-[260px]">
                          <Img src={course.image} alt="image" />
                          <div className="flex flex-col items-center justify-start w-full gap-1">
                            <Heading as="h1" className="text-center !font-bold">
                              {course.name}
                            </Heading>
                            <Text as="p" className="!text-gray-700_01 text-center !leading-[20px] !text-sm">
                              {course.description}
                            </Text>
                          </div>
                        </div>
                        <Button
                          size="md"
                          variant="outline"
                          shape="round"
                          className="my-3 sm:px-5 font-medium min-w-[159px] sm:min-w-full hover:text-white-A700 hover:bg-red-300_01"
                          onClick={() => { navigate(course._id) }}
                        >
                          Course Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex w-full justify-center">
                <div className="flex flex-row justify-between items-center w-[35%] md:w-full">
                  <Button size="lg" shape="round" className="w-[15%] !rounded-md !bg-white-A700 hover:!bg-red-300_01"
                    onClick={() => pageHandler('prev')}
                    onMouseOver={() => {
                      const img = document.getElementById('prev')
                      img.src = "images/img_arrow_right.svg"
                      img.className = img.className.replace("rotate-0", "rotate-180")
                    }}
                    onMouseLeave={() => {
                      const img = document.getElementById('prev')
                      img.src = "images/img_arrow_left.svg"
                      img.className = img.className.replace("rotate-180", "rotate-0")
                    }}
                  >
                    <Img src="images/img_arrow_left.svg" id="prev" className="rotate-0" />
                  </Button>
                  <Text as="p" className="!text-gray-900 !font-medium">
                    Page
                  </Text>
                  <Button color="white_A700" size="sm" className="!text-gray-700_01 font-medium min-w-[42px] rounded-lg cursor-default">
                    {page}
                  </Button>
                  <Text as="p" className="!text-gray-900 !font-medium">
                    of {courses ? totalPages : 1}
                  </Text>
                  <Button size="lg" shape="round" className="w-[15%] !rounded-md !bg-white-A700 hover:!bg-red-300_01"
                    onClick={() => pageHandler('next')}
                    onMouseOver={() => {
                      const img = document.getElementById('next')
                      img.src = "images/img_arrow_right.svg"
                      img.className = img.className.replace("rotate-180", "rotate-0")
                    }}
                    onMouseLeave={() => {
                      const img = document.getElementById('next')
                      img.src = "images/img_arrow_left.svg"
                      img.className = img.className.replace("rotate-0", "rotate-180")
                    }}
                  >
                    <Img src="images/img_arrow_left.svg" className="rotate-180" id="next" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full">
          <div className="flex flex-col items-center justify-start w-full gap-[50px] md:px-5 max-w-7xl">
            <div className="flex flex-col items-center justify-start w-full gap-10">
              <div className="flex flex-col items-start justify-start w-full pt-0.5 gap-2.5">
                <Heading size="xl" as="h2">
                  Popular Courses
                </Heading>
              </div>
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
                    onClick={() => { navigate(course._id) }}
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
            </div>
          </div>
        </div>
        <Footer className="flex flex-col items-center justify-center w-full" />
      </div>
    </>
  );
}
