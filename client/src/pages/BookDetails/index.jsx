import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Header, Text, Heading, Img, RatingBar, Button, Footer, BreadCrumbs, Input, ReviewComment } from "components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import ReviewModal from "modals/Review";
import LogIn from "modals/LogIn";
import SignUp from "modals/SignUp";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BookDetails() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [display, setDisplay] = useState(null)
  const [amount, setAmount] = useState(1)
  const [reviews, setReviews] = useState([])
  const [review, setReview] = useState()
  const [totalReviews, setTotalReviews] = useState(0)
  const [editReview, setEditReview] = useState(false)
  const [updateCart, setUpdateCart] = useState(false)
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)
  const authData = useSelector((state) => state.auth.userData)
  const added = () => toast.info(`Book "${book.name}" added to the cart!`);

  const getBook = async () => {
    const data = await fetch(`${import.meta.env.VITE_APILINK}/book/${id}`)
    const result = await data.json()
    if (result) setBook(result)
    if (book) setDisplay(book.image)
  }

  const getReviews = async () => {
    const { data } = await axios.post(`${import.meta.env.VITE_APILINK}/book/review/all`, { bookId: id })
    const reviewsList = data.map(async (review) => {
      const data = await fetch(`${import.meta.env.VITE_APILINK}/user/${review.createdBy}`)
      const user = await data.json()
      if (user) {
        review.userName = user.name
        review.image = user?.image || "/images/img_profile_24_outline.svg"
        review.likeAmount = review.like.length
      } 
      
      return review
    })

    if (reviewsList) Promise.all(reviewsList).then((result) => setReviews(result))
  }

  const updateBook = async () => {
    const { data } = await axios.patch(`${import.meta.env.VITE_APILINK}/book/${id}`)
    setBook(data)
  }

  useEffect(() => {
    getBook()
    updateBook()
    if (reviews.length > 0) {
      setTotalReviews(reviews.length)
    }
  }, [reviews])

  useEffect(() => {
    getReviews()
  }, [editReview, setEditReview, close])

  const addToCart = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_APILINK}/cart/new`,
        {
          userId: authData.userId,
          productId: id,
          productName: book.name,
          image: book.image,
          price: book.price,
          amount,
          type: "book"
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      setUpdateCart(!updateCart)
      added()
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  return (
    <>
      <Helmet>
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100 px-5">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" updateCart={updateCart} />
          <div className="flex flex-col items-start justify-start w-full gap-[5px] p-5 md:px-5 bg-white-A700 max-w-7xl rounded-[20px]">
            <BreadCrumbs routes={[
              {
                name: "Home",
                path: "/"
              },
              {
                name: "Shop",
                path: "/shop"
              },
              {
                name: book?.name,
                path: "#"
              },
            ]} />
            <div className="flex flex-row md:flex-col w-full mt-3">
              <div className="w-[50%] md:w-[90%] flex flex-row gap-3 mr-3">
                <div className="flex flex-col" onClick={() => (setDisplay(book.image))}>
                  <Img src={book?.image} className={'w-24 hover:border-black-900_02 hover:border-2'} />
                </div>
                <div>
                  <Img src={display || book?.image} />
                </div>
              </div>
              <div className="flex flex-col m-3 w-[50%] md:w-fit">
                <Heading children={book?.name} size="xl" />
                <div className="flex flex-rol w-full justify-between">
                  <Text>
                    By {book?.author}
                  </Text>
                  <div className="flex flex-rol gap-2">
                    <Text className="h-5 my-auto">{book?.rating}</Text>
                    <RatingBar value={book?.rating} size={20} />
                    <Text className="h-5 my-auto">({totalReviews})</Text>
                  </div>
                </div>
                <div className="mt-8">
                  <Heading children='Category' size="s" />
                  <div className="flex flex-row gap-3 mt-1">
                    <Text as="span" className="border-2 py-1 px-2 rounded-full bg-gray-100 !text-black-900_02">{book?.category}</Text>
                  </div>
                </div>
                <div className="mt-8">
                  <Heading children='Description' size="s" />
                  <Text as="p" className="!text-black-900_02 my-1 mx-3">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta praesentium vero suscipit veniam ipsum facere facilis qui deleniti repudiandae totam veritatis doloremque repellat ipsam eaque mollitia, consequatur quam dolorum necessitatibus!
                  </Text>
                </div>
                <div className="flex flew-row sm:flex-col justify-end mt-auto gap-3">
                  <div className="flex flew-row gap-3 w-full">
                    <Text as="p" className="!text-black-900_02 my-auto h-8" size="lg">
                      Amount:
                    </Text>
                    <div className="flex border-2 border-gray-200 h-[32px] my-auto">
                      <Button className="h-[30px] px-0 bg-gray-200 aspect-square" onClick={() => { if (amount > 1) setAmount(amount - 1) }}>
                        <Text size="lg" className="!text-black-900_02" >-</Text>
                      </Button>
                      <Input
                        className="h-[30px] !text-black-900_02 !px-5"
                        type="number"
                        value={amount}
                        onChange={(e) => {
                          if (e && e > 1)
                            setAmount(e)
                          else
                            setAmount(1)
                        }}
                        inputClass="text-center w-8 font-semibold"
                      />
                      <Button className="h-[30px] px-0 bg-gray-200 aspect-square" onClick={() => setAmount(amount + 1)}>
                        <Text size="lg" className="!text-black-900_02" >+</Text>
                      </Button>
                    </div>
                    <Text className="ml-auto my-auto !text-2xl !font-semibold h-8">${book?.price.toFixed(2)}</Text>
                  </div>
                  <Button className="min-w-[130px] !px-0" hover onClick={() => {
                    if (authData)
                      addToCart()
                    else
                      setLogin(true)
                  }} >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-10 px-3 w-full">
              <Heading size="lg" className="py-8 font-normal">Reviews</Heading>
              <div className="flex flex-row h-[60px] gap-3">
                <Text as="span" className="text-5xl font-extrabold h-[36px] my-auto">{book?.rating}</Text>
                <div className="flex flex-col my-auto">
                  <RatingBar value={book?.rating} size={20} />
                  <Text size="md">{totalReviews} reviews</Text>
                </div>
              </div>
              <div className="flex flex-col w-[70%] pl-3 pr-6 gap-2 my-5">
                {reviews && reviews.map((review) => (
                  <ReviewComment key={review._id} review={review} getReviews={() => getReviews()} setEditReview={() => setEditReview(!editReview)} setReview={() => setReview(review)} target={"book"} />
                ))}
              </div>
              <ReviewModal isOpen={editReview} close={() => setEditReview(false)} onRequestClose={() => setEditReview(false)} review={review} target={"book"} id={id} />
            </div>
          </div>
        </div>
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
        <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
      </div>
    </>
  )
}