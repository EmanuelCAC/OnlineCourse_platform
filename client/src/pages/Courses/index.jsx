import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Button, Img, SelectBox, Input, Heading, Header, Footer, Banner } from "../../components";
import CourseCard1 from "components/CourseCard1";
import CourseCard2 from "components/CourseCard2";
import PagesButton from "components/PagesButton";


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
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100 px-5">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex flex-row justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" />
          <div className="flex flex-row justify-center w-full">
            <Banner
              bgColor="bg-yellow-100"
              l1="Educatsy Courses"
              l2="For All Standards"
              image="/images/img_image_210x374.png"
              routes={[
                {
                  name: "Home",
                  path: "/"
                },
                {
                  name: "Courses",
                  path: "#"
                }
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full gap-[47px]">
          <div className="flex flex-row flex-wrap justify-center gap-3.5 w-full md:px-5 max-w-7xl">
            <Button onClick={() => categoryHandler("Kindergarten")} color={active == "Kindergarten" ? "orange_200_01" : "white_A700"} className="font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              Kindergarten
            </Button>
            <Button onClick={() => categoryHandler("High School")} color={active == "High School" ? "orange_200_01" : "white_A700"} className="px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              High School
            </Button>
            <Button onClick={() => categoryHandler("College")} color={active == "College" ? "orange_200_01" : "white_A700"} className="px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              College
            </Button>
            <Button onClick={() => categoryHandler("Technology")} color={active == "Technology" ? "orange_200_01" : "white_A700"} className="px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              Technology
            </Button>
            <Button onClick={() => categoryHandler("Science")} color={active == "Science" ? "orange_200_01" : "white_A700"} className="px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              Science
            </Button>
            <Button onClick={() => categoryHandler("Language")} color={active == "Language" ? "orange_200_01" : "white_A700"} className="px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              Language
            </Button>
            <Button onClick={() => categoryHandler("Mathematics")} color={active == "Mathematics" ? "orange_200_01" : "white_A700"} className="px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              Mathematics
            </Button>
            <Button onClick={() => categoryHandler("Social Studies")} color={active == "Social Studies" ? "orange_200_01" : "white_A700"} className="px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
              Social Studies
            </Button>
          </div>
          <div className="flex flex-row justify-between gap-3 w-full max-w-7xl">
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
                  <Img src="/images/img_search.svg" alt="search" className="cursor-pointer opacity-0 fill-black-900_02" fill="#0000000" />
                )
              }
              className="w-[84%] gap-[35px] !text-gray-700_99 rounded-tr-[10px] rounded-br-[10px] font-medium"
            />
            <SelectBox
              size="xs"
              shape="round"
              indicator={<Img src="/images/img_arrowdown_red_300_01.svg" alt="arrow_down" />}
              name="sortby"
              placeholder="Sort by: Latest"
              options={dropDownOptions}
              className="w-fit gap-px font-medium"
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
                    <CourseCard1 course={course} key={course._id} />
                  ))}
                </div>
              </div>
              <div className="flex w-full justify-center">
              <PagesButton items={courses} page={page} pageHandler={pageHandler} totalPages={totalPages} />
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
                  <CourseCard2 course={course} key={course._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
      </div>
    </>
  );
}
