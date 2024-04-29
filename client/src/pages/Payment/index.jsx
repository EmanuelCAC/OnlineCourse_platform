import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Header, Text, Heading, Img, RatingBar, Button, Footer, BreadCrumbs, Input } from "components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Payment() {
  const authData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate();
  const items = history.state.data
  const [total, setTotal] = useState(0)
  const [selectedValue, setSelectedValue] = useState("")

  const getTotal = () => {
    let sum = 0;
    history.state.data.map((item) => {
      sum += item.price
    })

    setTotal(sum.toFixed(2))
  }

  useEffect(() => {
    getTotal()
  }, [])

  return (
    <>
      <Helmet>
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <div className="flex flex-col items-start justify-start w-full gap-[5px] p-5 md:px-5 max-w-7xl">
            <Text className="!text-black-900_02 !text-3xl !font-medium">Form of Payment</Text>
            <div className="flex flex-row w-full gap-5">
              <div className="flex flex-col w-2/3 rounded-[20px] md:px-5 mt-3 gap-5">
                <div className="w-full bg-white-A700 p-4 rounded-2xl">
                  <div className="flex flex-row gap-2 cursor-pointer" onClick={() => {setSelectedValue("Card")}}>
                    <input type="radio" checked={selectedValue == "Card"} className="my-auto" />
                    <Text className="!text-black-900_02 !text-2xl !font-medium">Card</Text>
                  </div>
                  {selectedValue == "Card" && (
                    <div className="flex flex-row pt-4">
                      <div className="flex flex-col w-1/2 gap-3">
                        <div>
                          <label className="pl-2 pb-1">Card number</label>
                          <Input
                          color="white_A700"
                          size="xs"
                          type="text"
                          name="card number"
                          className="w-full sm:w-full rounded-[10px] border-gray-300 border border-solid"
                          required
                          />
                        </div>
                        <div>
                          <label className="pl-2 pb-1">Full name</label>
                          <Input
                          color="white_A700"
                          size="xs"
                          type="text"
                          name="full name"
                          className="w-full sm:w-full rounded-[10px] border-gray-300 border border-solid  "
                          />
                        </div>
                        <div className="flex flex-row w-full gap-5">
                          <div>
                            <label className="pl-2 pb-1">Expiration data</label>
                            <Input
                            color="white_A700"
                            size="xs"
                            type="text"
                            name="expiration data"
                            className="w-full sm:w-full rounded-[10px] border-gray-300 border border-solid  "
                            />
                          </div>
                          <div>
                            <label className="pl-2 pb-1">Security code</label>
                            <Input
                            color="white_A700"
                            size="xs"
                            type="text"
                            name="security code"
                            className="w-full sm:w-full rounded-[10px] border-gray-300 border border-solid  "
                            />
                          </div>
                        </div>
                        <div>
                          <label className="pl-2 pb-1">Cardholder's CPF</label>
                          <Input
                          color="white_A700"
                          size="xs"
                          type="text"
                          name="cardholder's cpf"
                          className="w-full sm:w-full rounded-[10px] border-gray-300 border border-solid  "
                          />
                        </div>
                      </div>
                      <div></div>
                    </div>
                  )}
                </div>
                <div className="w-full bg-white-A700 flex flex-row gap-2 p-4 rounded-2xl cursor-pointer" onClick={() => {setSelectedValue("Pix")}}>
                  <input type="radio" checked={selectedValue == "Pix"} className="my-auto" />
                  <Text className="!text-black-900_02 !text-2xl !font-medium">Pix</Text>
                </div>
                <div className="w-full bg-white-A700 flex flex-row gap-2 p-4 rounded-2xl cursor-pointer" onClick={() => {setSelectedValue("Payment slip")}}>
                  <input type="radio" checked={selectedValue == "Payment slip"} className="my-auto" />
                  <Text className="!text-black-900_02 !text-2xl !font-medium">Payment slip</Text>
                </div>
              </div>
              <div className="flex flex-col w-1/3">
                <div className="bg-white-A700 rounded-[20px] p-5 md:px-5 mt-3">
                  <Text className="!text-black-900_02 !text-3xl !font-medium mb-3">Resume</Text>
                  {items.map((item, i) => (
                    <div className="flex flex-row w-full justify-between py-2 gap-2" key={i}>
                      <Text size="sm" className="text-gray-600">{item.name}</Text>
                      <Text size="sm" className="!font-semibold min-w-fit">R$ {item.price}</Text>
                    </div>
                  ))}
                  <div className="flex flex-row mt-3 justify-between">
                    <Text className="!text-black-900_02 !font-semibold !text-xl ">Total</Text>
                    <Text className="!font-semibold !text-xl min-w-fit">R$ {total}</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
        </div>
      </div >
    </>
  )
}