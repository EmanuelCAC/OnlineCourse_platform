import React, { useEffect, useState } from "react";
import { Text, CheckBox, Button, Input, Img, Heading, Slider, RatingBar } from "../../components";
import { default as ModalProvider } from "react-modal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "store/authSlice";

export default function ProfilePic({ isOpen, close, ...props }) {
  const authData = useSelector((state) => state.auth.userData)
  const dispatch = useDispatch()

  const submitHandler = async (e) => {
    e.preventDefault()
    const image = document.querySelector('#photo')
    
    const formdata = new FormData()
    formdata.append('photo', image.files[0])
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_APILINK}/image/${authData.userId}`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (data) {
        console.log(data);
        localStorage.setItem('token', data.token)
        dispatch(authLogin(data.token))
        close()
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ModalProvider
      {...props}
      appElement={document.getElementById("root")}
      isOpen={isOpen}
      className="w-fit"
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.25)'
        },
      }}
    >
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-row justify-center w-full px-14 py-[71px] md:p-5 bg-white-A700 rounded-[15px] outline-none relative">
        <Button
            shape="round"
            onClick={() => close()}
            className="!h-[37px] !w-[37px] !p-0 text-2xl bg-transparent text-gray-300 hover:bg-gray-100 hover:text-gray-600 absolute right-4 top-4"
          >&#10799;</Button>
          <div className="flex flex-row justify-center w-[97%]">
            <div className="flex flex-row justify-center w-full p-2">
              <div className="flex flex-row justify-center w-full">
                <div className="flex flex-row md:flex-col justify-between items-center w-full md:gap-10">
                  <div className="flex flex-col justify-start w-full">
                    <Heading
                      size='lg'
                      className="mb-4"
                    >
                      Profile Image
                    </Heading>
                    <form onSubmit={(e) => submitHandler(e)} className="flex flex-col gap-3 w-full justify-center">
                      <input
                      type="file"
                      name="photo" 
                      id="photo"
                      className="p-4 -m-4 relative outline-none file:px-16 file:py-0 file:rounded file:h-10 file:pointer file:bg-white-A700 file:mr-[16px] file:w-32 file:text-transparent file:border-[1px] file:hover:bg-gray-100 file:active:bg-gray-200 before:absolute before:pointer-events-none before:top-7 before:left-6 before:h-4 before:w-4 before:content-[''] before:bg-[url('/images/fazer-upload.png')] after:absolute after:pointer-events-none after:top-[26px] after:left-11 after:text-blue-600 after:content-['upload_File']"
                      />  
                      <Button
                          className="rounded-full"
                          size="xs"
                          children={'Save'}
                          type="submit"
                        />
                        <Button
                          className="rounded-full border-2 border-gray-300 !text-gray-400"
                          size="xs"
                          color="white_A700"
                          children={'Cancel'}
                          onClick={(e) => {
                            e.preventDefault()
                            close()
                          }}
                        />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
}
