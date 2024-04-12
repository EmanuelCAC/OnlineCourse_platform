import React, { useEffect } from "react";
import { Text, CheckBox, Button, Input, Img, Heading, Slider, RatingBar } from "../../components";
import { default as ModalProvider } from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { logout as authLogut } from "store/authSlice";

export default function Menu({ isOpen, close, ...props }) {
  const authData = useSelector((state) => state.auth.userData)
  const dispatch = useDispatch()

  useEffect(() => {
    if (document) {
      document.body.style.overflow = isOpen ? 'hidden' : 'auto'
    }
  }, [isOpen])

  return (

    <ModalProvider
      {...props}
      preventScroll={true}
      appElement={document.getElementById("root")}
      isOpen={isOpen}
      className="w-[25%] h-[100vh] ml-auto translate-x-[100%] rounded-l-[15px]"
      id="menu"
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.25)'
        },
      }}
    >
      <div className="flex flex-row justify-center w-full h-full">
        <div className="flex flex-row justify-center w-full px-6 py-8 bg-white-A700 rounded-l-[15px] outline-none">
          <div className="flex flex-row justify-center w-full">
            <div className="flex flex-col w-full gap-4">
              <div className="flex flex-col w-full items-center">
                <Img src={authData?.img || "images/img_profile_24_outline.svg"} className="h-40 w-40" />
                <Text className="text-gray-500">{authData?.name}</Text>
              </div>
              <div className="flex flex-col w-full h-full gap-1">
                <hr />
                <Text as="button" className="text-gray-600 border border-transparent hover:bg-gray-200 w-full p-1.5 rounded-md text-left">Your books</Text>
                <Text as="button" className="text-gray-600 border border-transparent hover:bg-gray-200 w-full p-1.5 rounded-md text-left">Your courses</Text>
                <Text as="button" className="text-gray-600 border border-transparent hover:bg-gray-200 w-full p-1.5 rounded-md text-left">Your certificates</Text>
                <hr />
                <Text as="button" className="text-gray-600 mt-auto border border-transparent hover:bg-gray-200 w-full p-1.5 rounded-md text-left">Settings</Text>
                <Text
                  as="button"
                  className="text-gray-600 border border-transparent hover:bg-gray-200 w-full p-1.5 rounded-md text-left"
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
      </div>
    </ModalProvider>
  );
}
