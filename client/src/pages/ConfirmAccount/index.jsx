import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Text, Input, Heading, Img } from "components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login as authLogin } from "store/authSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ConfirmAccount() {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [num1, setNum1] = useState("")
  const [num2, setNum2] = useState("")
  const [num3, setNum3] = useState("")
  const [num4, setNum4] = useState("")
  const [code, setCode] = useState(history.state.account.code)
  const email = history.state.account.email
  const sensorEmail = email.replace(email.slice(1, email.indexOf('@')-1), '*'.repeat(email.indexOf('@')-2))

  const signed = (name) => toast.success(`Logged as ${name}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const initialSeconds = 60
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
      }, 1000)
      return ()=> {
        clearInterval(myInterval);
      }
    })

    const resend = async () => {
      const newCode = Math.floor(1000 + Math.random() * 9000);

      try {
        const {data} = await axios.patch(`http://localhost:3001/api/v1/tempUser/${history.state.account.id}`, {code: newCode})
        if (data) {
          setCode(data.code)
          setSeconds(60)
        }
      } catch (error) {
        console.log(error.response);
      }
    }

    const checkCode = async () => {
      const userCode = num1 + num2 + num3 + num4
      console.log(history.state.account.password);
      if (userCode == code) {
        try {
          const { data } = await axios.post("http://localhost:3001/api/v1/auth/signup", { name: history.state.account.name, email: history.state.account.email, password: history.state.account.password})
          if (data) {
            localStorage.setItem('token', data.token)
            dispatch(authLogin(data.token))
            signed(data.user.name)
            navigate('/')
          }
        } catch (error) {
          console.log(error.response);
        }
      }
    }

    useEffect(() => {
      checkCode()
    }, [num1, num2, num3, num4])

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
              type="text"
              value={num1}
              maxLength="1"
              onChange={(e) => setNum1(e)}
            />
            <Input
              className="border-2 border-gray-200 text-black-900_02 !rounded-[10px] !p-0 !bg-gray-50 flex flex-col" 
              inputClass="w-10 h-14 text-center !text-3xl font-medium"
              type="text"
              value={num2}
              maxLength="1"
              onChange={(e) => setNum2(e)}
            />
            <Input
              className="border-2 border-gray-200 text-black-900_02 !rounded-[10px] !p-0 !bg-gray-50 flex flex-col" 
              inputClass="w-10 h-14 text-center !text-3xl font-medium"
              type="text"
              value={num3}
              maxLength="1"
              onChange={(e) => setNum3(e)}
            />
            <Input
              className="border-2 border-gray-200 text-black-900_02 !rounded-[10px] !p-0 !bg-gray-50 flex flex-col" 
              inputClass="w-10 h-14 text-center !text-3xl font-medium"
              type="text"
              value={num4}
              maxLength="1"
              onChange={(e) => setNum4(e)}
            />
          </div>
          <Text onClick={() => {
            if(seconds == 0) {
              resend()
            }
          }} size="s" className={(seconds > 0 ? '!text-gray-300 cursor-default' : "cursor-pointer ")} >{seconds > 0 ? `resend(${seconds}s)` : "resend"}</Text>
        </div>
      </div>
    </>
  )
}