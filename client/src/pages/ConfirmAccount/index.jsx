import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Text, Input, Heading, Img } from "components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ConfirmAccount() {
  const navigate = useNavigate();

  const email = history.state.category || 'teste@gmail.com'
  const sensorEmail = email.replace(email.slice(1, email.indexOf('@')-1), '*'.repeat(email.indexOf('@')-2))

  const [time, setTime] = useState(60)

  const countDown = () => {
    if (time>0) {
      setTime(time-1)
      console.log(time);
    } else {
      setTime(0)
    }
  }

  useEffect(() => {
    setInterval(countDown, 1000);
  }, [])

  


  return (
    <>
      <Helmet>
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-center w-full h-[100vh] gap-[100px] bg-gray-100">
        <div className="flex flex-col items-center justify-start bg-white-A700 rounded-[15px] py-16 gap-8">
          <Heading size="3xl" className="!text-black-900_02">Confirm your Acount</Heading>
          <Text className="!text-gray-500 w-[65%] text-center">A code was sent to {sensorEmail}. Please insert the code to confirm your account</Text>
          <div className="flex flex-row gap-6">
            <Input
              className="border-2 border-gray-200 text-black-900_02 !rounded-[10px] !p-0 !bg-gray-50 flex flex-col" 
              inputClass="w-10 h-14 text-center !text-3xl font-medium"
              type="number"
            />
            <Input
              className="border-2 border-gray-200 text-black-900_02 !rounded-[10px] !p-0 !bg-gray-50 flex flex-col" 
              inputClass="w-10 h-14 text-center !text-3xl font-medium"
              type="number"
            />
            <Input
              className="border-2 border-gray-200 text-black-900_02 !rounded-[10px] !p-0 !bg-gray-50 flex flex-col" 
              inputClass="w-10 h-14 text-center !text-3xl font-medium"
              type="number"
            />
            <Input
              className="border-2 border-gray-200 text-black-900_02 !rounded-[10px] !p-0 !bg-gray-50 flex flex-col" 
              inputClass="w-10 h-14 text-center !text-3xl font-medium"
              type="number"
            />
          </div>
          <Text size="xs" className="!text-gray-500">{time}</Text>
        </div>
      </div>
    </>
  )
}