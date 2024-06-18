import React, {useState} from "react";
import { Img, Text, Heading, Button } from "./..";
import LogIn from "modals/LogIn";
import SignUp from "modals/SignUp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PricingCard({title, price, items}) {
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)
  const authData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()

  const purchase = async () => {
    const data = [{
      type: "plan",
      price: price,
      productName: title,
      amount: 1
    }]
    navigate('/payment', {state: {data: data}})
    history.pushState({data: data}, "")
  }

  return (
    <div className="flex flex-col items-start justify-start mx-auto w-full max-w-[400px] min-w-[340px] sm:min-w-0 gap-6 p-[30px] sm:p-5 bg-white-A700 cursor-pointer rounded-[20px] hover:shadow-sm">
      <div className="flex flex-col items-center justify-start w-full pb-3.5">
        <div className="flex flex-col items-start justify-start w-full gap-3.5">
          <Img src="/images/img_group_red_300_01.svg" alt="basic_pack_one" className="h-[50px] w-[50px]" />
          <Heading size="xl" as="h2">
            {title}
          </Heading>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start w-full gap-5">
        {items.map((item) => (
          <div className="flex flex-row justify-start items-center w-full gap-2.5">
            {item.has ? <Img src="/images/img_approve_24_outline.svg" alt="image" className="h-[24px] w-[24px]" /> : <Img src="/images/img_close_24_outline.svg" alt="image_four" className="h-[24px] w-[24px]" />}
            <Text as="p" className="!font-medium">
              {item.description}
            </Text>
          </div>
        ))}
      </div>
      <Heading size="s" as="h3">
        ${price}
      </Heading>
      {authData?.plan != title ?
      <Button size="2xl" variant="outline" shape="round" className="w-full sm:px-5 font-medium hover:bg-red-300_01 hover:text-white-A700"
      onClick={() => {
        if (!authData) 
          setLogin(true)
        else
          purchase()
      }}
      >
        Purchase
      </Button>
      :
      <Button size="2xl" variant="outline" shape="round" className="w-full sm:px-5 font-medium border-gray-300 text-gray-300">
        Purchase
      </Button>
      }
      <LogIn
        isOpen={login}
        isSignupOpen={() => {
          setLogin(false)
          setSignup(true)
        }}
        close={() => setLogin(false)}
        onRequestClose={() => setLogin(false)}
      />
      <SignUp
        isOpen={signup}
        isLoginOpen={() => {
          setSignup(false)
          setLogin(true)
        }}
        close={() => setSignup(false)}
        onRequestClose={() => setSignup(false)}
      />
    </div> 
  )
}