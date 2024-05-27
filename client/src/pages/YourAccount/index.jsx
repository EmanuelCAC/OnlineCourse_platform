import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Button, Img, Text, SelectBox, Input, Heading, RatingBar, BreadCrumbs } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "store/authSlice";
import ProfilePic from "modals/ProfilePic";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function YourAccount() {
  const authData = useSelector((state) => state.auth.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [profilePic, setProfilePic] = useState(false)
  const [active, setActive] = useState(history.state.active || "Books")
  const [books, setBooks] = useState()
  const [bookInfo, setBookInfo] = useState()
  const [courses, setCourses] = useState()
  const [courseInfo, setCourseInfo] = useState()
  const [certificate, setCertificates] = useState()
  const [editName, setEditName] = useState(false)
  const [newName, setNewName] = useState()

  const getBooks = async (req, res) => {
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

  const getBookInfo = async () => {
    const data = books.map( async (book) => {
      try {
        const {data} = await axios.get(`http://localhost:3001/api/v1/book/${book.bookId}`)
        return data
      } catch (error) {
        console.log(error.response);
      }
    })

   Promise.all(data).then((res) => setBookInfo(res))
  }

  const getCourseInfo = async () => {
    const data = courses.map( async (course) => {
      try {
        const {data} = await axios.get(`http://localhost:3001/api/v1/course/${course.courseId}`)
        return data
      } catch (error) {
        console.log(error.response);
      }
    })

   Promise.all(data).then((res) => setCourseInfo(res))
  }

  const changeName = async () => {
    try {
      const {data} = await axios.patch(`http://localhost:3001/api/v1/user/${authData.userId}`, {name: newName})
      if (data) {
        localStorage.setItem('token', data.token)
        dispatch(authLogin(data.token))
      }
    } catch (error) {
      console.log(error.response);
    }
    setEditName(false)
    setNewName("")
  }

  useEffect(() => {
    getBooks()
    getCourses()
  }, [])

  useEffect(() => {
    if (books)
      getBookInfo()
    if (courses)
      getCourseInfo()
  }, [books, courses])

  useEffect(() => {
    setActive(history.state.active)
  }, [history.state.active])

  return (
    <>
      <Helmet>
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" />
        </div>
        <div className="flex flex-row md:flex-col justify-start items-start w-[85%] gap-10 md:gap-5 md:px-5 mx-auto">
          <div className="flex flex-col items-center rounded-[15px] bg-white-A700 p-5">
            <Img src={authData?.img || "/images/img_profile_24_outline.svg"} className="h-60 min-w-[240px] rounded-full mb-4 cursor-pointer" onClick={() => setProfilePic(true)} />
            {editName ?
            <div className="flex flex-col gap-3 cursor-pointer">
              <Input
                type="text"
                color="white_A700"
                size="xs"
                placeholder="Username"
                value={newName}
                onChange={(e) => setNewName(e)}
                className="w-full sm:w-full gap-[15px] rounded-tr-[10px] rounded-br-[10px] border-gray-300 border border-solid"
              />
              <div className="flex flex-row gap-2 w-full">
                <Button
                  className="rounded-full"
                  size="xs"
                  children={'Save'}
                  onClick={() => changeName()}
                />
                <Button
                  className="rounded-full border-2 border-gray-300 !text-gray-400"
                  size="xs"
                  color="white_A700"
                  children={'Cancel'}
                  onClick={() => {
                    setEditName(false)
                    setNewName("")
                  }}
                />
              </div>
            </div>
            :  
            <div className="flex flex-row gap-1 cursor-pointer" onClick={() => {setEditName(true)}}>
              <Text className="text-gray-500 !text-4xl">{authData?.name}</Text>
              <Img className="h-10 w-10" src="https://img.icons8.com/windows/40/6b7280/edit--v1.png" alt="edit--v1"/>
            </div>
            }
            {authData?.plan != "none" && <Text className="text-gray-500 !text-lg">Plan: {authData?.plan}</Text>}
          </div>
          <div className="flex flex-col w-full rounded-[15px] gap-4">
            <div className="flex flex-row gap-10">
              <Button onClick={() => setActive("Books")} color={active == "Books" ? "orange_200_01" : "white_A700"} className="font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
                Books
              </Button>
              <Button onClick={() => setActive("Courses")} color={active == "Courses" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
                Courses
              </Button>
              <Button onClick={() => setActive("Certificates")} color={active == "Certificates" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[142px] rounded-[10px] hover:border-2 hover:border-orange-200_01">
                Certificates
              </Button>
            </div>
            <div className="flex flex-row flex-wrap bg-white-A700 px-5 py-2 rounded-[15px]">
              {active == "Books" && !bookInfo &&
              <div className="flex flex-col w-full align-middle pb-20 pt-16">
                <Text className="mx-auto text-6xl font-black py-10">No book yet!</Text>
              </div>}
              {active == "Books" && bookInfo && bookInfo.map((book) => (
                <div key={book._id} className="w-1/2 min-w-[350px] cursor-pointer" onClick={() => (navigate('/shop/' + book._id))} >
                  <div className="flex flex-row pb-5 pt-3" >
                    <Img src={book.image} className={'w-28 mr-3 border-2'} />
                    <div className="flex flex-col w-full justify-center">
                      <RatingBar
                        value={book.rating}
                        isEditable={false}
                        size={16}
                        className="flex justify-between"
                      />
                      <Text className="!text-black-900_02 !text-lg">{book.name}</Text>
                      <Text className="!text-gray-500 !text-sm">by {book.author}</Text>
                    </div>
                  </div>
                </div>
              ))}
              {active == "Courses" && courseInfo && courseInfo.map((course) => (
                <div key={course._id} className="w-1/2 min-w-[350px] cursor-pointer" onClick={() => (navigate('/courses/' + course._id))}>
                  <div className="flex flex-row pb-5 pt-3 h-32" >
                    <Img src={course.image} className={'mr-3 rounded-xl'} />
                    <div className="flex flex-col w-full justify-center">
                      <RatingBar
                        value={course.rating}
                        isEditable={false}
                        size={16}
                        className="flex justify-between"
                      />
                      <Text className="!text-black-900_02 !text-lg">{course.name}</Text>
                    </div>
                  </div>
                </div>
              ))}
              {active == "Courses" && !courseInfo &&
              <div className="flex flex-col w-full align-middle pb-20 pt-16">
                <Text className="mx-auto text-6xl font-black py-10">No course yet!</Text>
              </div>}
              {active == "Certificates" && !certificate &&
              <div className="flex flex-col w-full align-middle pb-20 pt-16">
                <Text className="mx-auto text-6xl font-black py-10">No certificate yet!</Text>
              </div>}
            </div>
          </div>
        </div>
        <ProfilePic isOpen={profilePic} close={() => setProfilePic(false)}/>
        <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
      </div>
    </>
  );
}