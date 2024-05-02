import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Header, Text, Heading, Img, RatingBar, Button, Footer, BreadCrumbs, Input } from "components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Cart() {
  const authData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate();
  const [cart, setCart] = useState([])
  const [updateCart, setUpdateCart] = useState(false)
  const [total, setTotal] = useState(0)

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
              id: item._id,
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
            id: item._id,
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

  const calcTotal = async () => {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum += cart[i].price * cart[i].amount
    }
    setTotal(sum.toFixed(2))
  }

  const purchase = () => {
    const data = cart
    navigate('/payment', {state: {data: data}})
    history.pushState({data: data}, "")
  }

  useEffect(() => {
    getCart()
  }, [authData])

  useEffect(() => {
    calcTotal()
  }, [authData, cart])

  return (
    <>
      <Helmet>
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" updateCart={updateCart} />
          <div className="flex flex-col items-start justify-start w-full gap-[5px] p-5 md:px-5 max-w-7xl ">
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
            {!cart[0] &&
              <div className="flex flex-col w-full align-middle pb-20 pt-16">
                <Text className="mx-auto text-6xl font-black py-10">No items in cart yet!</Text>
                <Button className="max-w-fit mx-auto" hover={true} onClick={() => navigate('/shop')}>Go Shopping!</Button>
              </div>
            }
            {cart[0] &&
              <div className="flex flex-row w-full gap-5">
                <div className="flex flex-col w-2/3 bg-white-A700 rounded-[20px] p-5 md:px-5 mt-3">
                  <Text className="!text-black-900_02 !text-3xl !font-medium">Items</Text>
                  {cart.map((item) => (
                    <div key={item._id}>
                      <div className="flex flex-row pb-5 pt-3" >
                        <Img src={item.image} className={'w-28 mr-3 border-2 cursor-pointer'} onClick={() => (navigate('/shop/' + item.productId))} />
                        <div className="flex flex-col justify-between w-full">
                          <div>
                          <Text className=" !text-black-900_02 !text-lg cursor-pointer" onClick={() => (navigate('/shop/' + item.productId))}>{item.productName}</Text>
                          <Text size="sm" className="!text-gray-400">{item.type}</Text>
                          </div>
                          <div className="flex flex-row justify-between ">
                            <Text size="lg" className=" font-extrabold">R$ {item.price.toFixed(2)}</Text>
                            {item.type == "book" && <div className="flex border-2 border-gray-200 h-[32px] my-auto">
                              <Button className="h-[30px] px-0 bg-gray-200 aspect-square" onClick={() => { editAmount(item, -1) }}>
                                <Text size="lg" className="!text-black-900_02">-</Text>
                              </Button>
                              <Input
                                className="h-[30px] !text-black-900_02 !px-5"
                                type="number"
                                value={item.amount}
                                inputClass="text-center w-8 font-semibold"
                              />
                              <Button className="h-[30px] px-0 bg-gray-200 aspect-square" onClick={() => { editAmount(item, 1) }}>
                                <Text size="lg" className="!text-black-900_02" >+</Text>
                              </Button>
                            </div>}
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col w-1/3">
                  <div className="bg-white-A700 rounded-[20px] p-5 md:px-5 mt-3">
                    <Text className="!text-black-900_02 !text-3xl !font-medium mb-3">Resume</Text>
                    {cart.map((item) => (
                      <div className="flex flex-row w-full justify-between py-2 gap-2" key={item._id}>
                        <Text size="sm" className="text-gray-600">{item.productName} ({item.amount})</Text>
                        <Text size="sm" className="!font-semibold min-w-fit">R$ {(item.price * item.amount).toFixed(2)}</Text>
                      </div>
                    ))}
                    <div className="flex flex-row mt-3 justify-between">
                      <Text className="!text-black-900_02 !font-semibold !text-xl ">Total</Text>
                      <Text className="!font-semibold !text-xl min-w-fit">R$ {total}</Text>
                    </div>
                    <Button shape="round" className="mt-4 w-full" hover onClick={purchase}>Complete the purchase</Button>
                  </div>
                </div>
              </div>
            }
          </div>
          <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
        </div>
      </div >
    </>
  )
}