import React, { useEffect, useState } from "react";
import { Text, CheckBox, Button, Input, Img, Heading, Slider, RatingBar } from "../../components";
import { default as ModalProvider } from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { logout as authLogut } from "store/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProfilePic from "modals/ProfilePic";

export default function Menu({ isOpen, close, ...props }) {
  const [profilePic, setProfilePic] = useState(false)
  const authData = useSelector((state) => state.auth.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (document) {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    }
  }, [isOpen])

  const submitHandler = async (e) => {
    e.preventDefault()
    const image = document.querySelector('#photo')
    
    const formdata = new FormData()
    formdata.append('photo', image.files[0])
    try {
      const {data} = await axios.post(`http://localhost:3001/api/v1/image/${authData.userId}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <ModalProvider
      {...props}
      preventScroll={true}
      appElement={document.getElementById("root")}
      isOpen={isOpen}
      className="w-[20%] h-[100vh] ml-auto translate-x-[100%] rounded-l-[15px]"
      id="menu"
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.25)'
        },
      }}
    >
      <div className="flex flex-row justify-center w-full h-full ">
        <div className="flex flex-row justify-center w-full px-6 py-8 bg-white-A700 rounded-l-[15px] outline-none relative">
          <Button
            shape="round"
            onClick={() => close()}
            className="!h-[37px] !w-[37px] !p-0 text-2xl bg-transparent text-gray-300 hover:bg-gray-100 hover:text-gray-600 absolute right-4 top-4"
          >&#10799;</Button>
          <div className="flex flex-row justify-center w-full">
            <div className="flex flex-col w-full gap-4">
              <div className="flex flex-col w-full items-center">
                <Img src={authData?.img || "/images/img_profile_24_outline.svg"} className="h-40 w-40 rounded-full mb-2 cursor-pointer" onClick={() => setProfilePic(true)} />
                <Text className="text-gray-500">{authData?.name}</Text>
              </div>
              <div className="flex flex-col w-full h-full gap-1">
                <hr />
                <Text as="button" className="text-gray-600 border border-transparent hover:bg-gray-100 w-full p-1.5 rounded-md text-left">Your profile</Text>
                <Text as="button" className="text-gray-600 border border-transparent hover:bg-gray-100 w-full p-1.5 rounded-md text-left">Add account</Text>
                <hr />
                <Text as="button" className="text-gray-600 border border-transparent hover:bg-gray-100 w-full p-1.5 rounded-md text-left" onClick={() => navigate('/review')}>Add review</Text>
                <hr />
                <Text as="button" className="text-gray-600 border border-transparent hover:bg-gray-100 w-full p-1.5 rounded-md text-left">Your books</Text>
                <Text as="button" className="text-gray-600 border border-transparent hover:bg-gray-100 w-full p-1.5 rounded-md text-left">Your courses</Text>
                <Text as="button" className="text-gray-600 border border-transparent hover:bg-gray-100 w-full p-1.5 rounded-md text-left">Your certificates</Text>
                <hr />
                <Text as="button" className="text-gray-600 border border-transparent hover:bg-gray-100 w-full p-1.5 rounded-md text-left">Settings</Text>
                <Text as="button" className="text-gray-600 mt-auto border border-transparent hover:bg-gray-100 w-full p-1.5 rounded-md text-left">Support</Text>
                <Text
                  as="button"
                  className="text-gray-600 border border-transparent hover:bg-gray-100 w-full p-1.5 rounded-md text-left"
                  onClick={() => {
                    dispatch(authLogut())
                    localStorage.removeItem('token')
                    close()
                  }}
                >Sign out</Text>
              </div>
            </div>
          </div>
        </div>
        <ProfilePic isOpen={profilePic} close={() => setProfilePic(false)}/>
      </div>
    </ModalProvider>
  );
}
