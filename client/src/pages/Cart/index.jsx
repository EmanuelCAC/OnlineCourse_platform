import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Header, Text, Heading, Img, RatingBar, Button, Footer, BreadCrumbs, Input } from "components";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Cart() {
  const authData = useSelector((state) => state.auth.userData)
  const [cart, setCart] = useState([])
  const [updateCart, setUpdateCart] = useState(false)

  const getCart = async () => {
    try {
      const { data } = await axios.post('http://localhost:3001/api/v1/cart',
        {
          userId: authData.userId
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if (data) setCart(data.cart)
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  const editAmount = async (item, n) => {
    if (item.amount + n <= 0) {
      try {
        const { data } = await axios.delete('http://localhost:3001/api/v1/cart',
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            },
            data: {
              _id: item._id,
            }
          },
        )
        getCart()
        setUpdateCart(!updateCart)
      } catch (error) {
        console.log(error.response.data.msg)
      }
    } else {
      try {
        const { data } = await axios.patch('http://localhost:3001/api/v1/cart',
          {
            _id: item._id,
            amount: item.amount + n
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        getCart()
      } catch (error) {
        console.log(error.response.data.msg)
      }
    }
  }

  useEffect(() => {
    getCart()
  }, [authData])

  return (
    <>
      <Helmet>
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" updateCart={updateCart} />
          <div className="flex flex-col items-start justify-start w-full gap-[5px] p-5 md:px-5 bg-white-A700 max-w-7xl rounded-[20px]">
            <BreadCrumbs routes={[
              {
                name: "Home",
                path: "/"
              },
              {
                name: "Cart",
                path: "#"
              },
            ]} />
            <div className="flex flex-row w-full">
              <div className="flex flex-col w-2/3">
                {cart.map((item) => (
                  <>
                    <div className="flex flex-row py-5">
                      <Img src={item.image} className={'w-24 mx-3 border-2'} />
                      <div className="flex flex-col justify-between w-full">
                        <Text className=" text-black-900_02 !text-lg">{item.productName}</Text>
                        <div className="flex flex-row justify-between ">
                          <Text size="lg" className=" font-extrabold">R$ {item.price}</Text>
                          <div className="flex border-2 border-gray-200 h-[32px] my-auto">
                            <Button className="h-[30px] px-0 bg-gray-200 aspect-square" onClick={() => { editAmount(item, -1) }}>
                              <Text size="lg" className="text-black-900_02" >-</Text>
                            </Button>
                            <Input
                              className="h-[30px] text-black-900_02 !px-5"
                              type="number"
                              value={item.amount}
                              inputClass="text-center w-8 font-semibold"
                            />
                            <Button className="h-[30px] px-0 bg-gray-200 aspect-square" onClick={() => { editAmount(item, 1) }}>
                              <Text size="lg" className="text-black-900_02" >+</Text>
                            </Button>
                          </div>
                        </div>

                      </div>
                    </div>
                    <hr />
                  </>
                ))}
              </div>
            </div>
          </div>
          <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
        </div>
      </div >
    </>
  )
}