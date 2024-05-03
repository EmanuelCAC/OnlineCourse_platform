import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Header, Text, Heading, Img, RatingBar, Button, Footer, BreadCrumbs, Input } from "components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import ReviewModal from "modals/Review";

export default function BookDetails() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [display, setDisplay] = useState(null)
  const [amount, setAmount] = useState(1)
  const [isForm, setIsForm] = useState(false)
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [reviews, setReviews] = useState([])
  const [totalReviews, setTotalReviews] = useState(0)
  const [editReview, setEditReview] = useState(false)
  const [review, setReview] = useState(null)
  const [updateCart, setUpdateCart] = useState(false)
  const authData = useSelector((state) => state.auth.userData)

  const getBook = async () => {
    const data = await fetch(`http://localhost:3001/api/v1/book/${id}`)
    const result = await data.json()
    if (result) setBook(result)
    if (book) setDisplay(book.image)
  }

  const getReviews = async () => {
    const { data } = await axios.post(`http://localhost:3001/api/v1/book/review/all`, { bookId: id })
    const reviewsList = data.map(async (review) => {
      const data = await fetch(`http://localhost:3001/api/v1/user/${review.createdBy}`)
      const user = await data.json()
      if (user) review.userName = user.name
      review.likeAmount = review.like.length
      return review
    })

    if (reviewsList) Promise.all(reviewsList).then((result) => setReviews(result))
  }

  const toogleLike = async (review) => {
    if (review.like.includes(authData.userId)) {
      try {
        const { data } = await axios.patch(`http://localhost:3001/api/v1/book/review/${review._id}`,
          {
            like: review.like.filter((id) => {
              return id != authData.userId
            })
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
      } catch (error) {
        console.log(error.response)
      }
    } else {
      review.like.push(authData.userId)
      try {
        const { data } = await axios.patch(`http://localhost:3001/api/v1/book/review/${review._id}`,
          {
            like: review.like
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
      } catch (error) {
        console.log(error.response.data.msg)
      }
    }
    getReviews()
  }

  const updateBook = async () => {
    const { data } = await axios.patch(`http://localhost:3001/api/v1/book/${id}`)
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
  }, [isForm, setIsForm, editReview, setEditReview, close])

  const addToCart = async () => {
    try {
      const { data } = await axios.post(`http://localhost:3001/api/v1/cart/new`,
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
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post(`http://localhost:3001/api/v1/book/review/`,
        {
          createdBy: authData.userId,
          bookId: book._id,
          comment,
          rating
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      setComment("")
      setRating(0)
      setIsForm(false)
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
                name: "Shop",
                path: "/shop"
              },
              {
                name: book ? book.name : "",
                path: "#"
              },
            ]} />
            <div className="flex flex-row w-full mt-3">
              <div className="w-[50%] flex flex-row gap-5 mr-3">
                <div className="flex flex-col" onClick={() => (setDisplay(book.image))}>
                  <Img src={book ? book.image : null} className={'w-16 hover:border-black-900_02 hover:border-2 mb-1 mx-3'} />
                </div>
                <div>
                  <Img src={display || book ? book.image : null} />
                </div>
              </div>
              <div className="flex flex-col m-5 w-[50%]">
                <Heading children={book ? book.name : ""} size="xl" />
                <div className="flex flex-rol w-full justify-between">
                  <Text>
                    By {book ? book.author : ""}
                  </Text>
                  <div className="flex flex-rol gap-2">
                    <Text className="h-5 my-auto">{book ? book.rating : 0}</Text>
                    <RatingBar value={book ? book.rating : 0} size={20} />
                    <Text className="h-5 my-auto">({totalReviews})</Text>
                  </div>
                </div>
                <div className="mt-8">
                  <Heading children='Category' size="s" />
                  <div className="flex flex-row gap-3 mt-1">
                    <Text as="span" className="border-2 py-1 px-2 rounded-full bg-gray-100 !text-black-900_02">{book ? book.category : ""}</Text>
                  </div>
                </div>
                <div className="mt-8">
                  <Heading children='Description' size="s" />
                  <Text as="p" className="!text-black-900_02 my-1 mx-3">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta praesentium vero suscipit veniam ipsum facere facilis qui deleniti repudiandae totam veritatis doloremque repellat ipsam eaque mollitia, consequatur quam dolorum necessitatibus!
                  </Text>
                </div>
                <div className="flex flew-row mt-auto">
                  <Text as="p" className="!text-black-900_02 my-auto mx-3 h-8" size="lg">
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
                  <Button className="ml-auto" onClick={() => { addToCart() }} hover={true}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-10 px-3 w-full">
              <Heading size="lg" className="py-8 font-normal">Reviews</Heading>
              <div className="flex flex-row h-[60px] gap-3">
                <Text as="span" className="text-5xl font-extrabold h-[36px] my-auto">{book ? book.rating : 0}</Text>
                <div className="flex flex-col my-auto">
                  <RatingBar value={book ? book.rating : 0} size={20} />
                  <Text size="md" className="pb-4">{totalReviews} reviews</Text>
                </div>
              </div>
              {authData && (
                <div>
                  <Button children={'Add review'} className="rounded-full" size="xs" onClick={() => setIsForm(true)} />
                </div>
              )}
              <div className="flex flex-col w-[70%] pl-3 pr-6 gap-2 my-5">
                {isForm ? (
                  <>
                    <form className="flex flex-col gap-3 my-3" onSubmit={(e) => submitHandler(e)} method="post">
                      <div className="flex flex-row gap-1">
                        <RatingBar
                          isEditable={true}
                          onChange={(e) => setRating(e)}
                          size={25}
                        />
                        <Text size="lg" >({rating})</Text>
                      </div>
                      <Input
                        color="white_A700"
                        size="xs"
                        type="text"
                        name="comment"
                        placeholder="Put your comment here..."
                        maxLength={200}
                        onChange={(e) => setComment(e)}
                        value={comment}
                        className="w-full sm:w-full rounded-tr-[10px] rounded-br-[10px] border-gray-300 border border-solid"
                      />
                      <Text as="p" size="xs" className="text-right px-1">{comment.length}/200</Text>
                      <div className="flex flex-row gap-3 mt-[-25px]">
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
                          onClick={() => {
                            setIsForm(false)
                            setComment("")
                            setRating(0)
                          }}
                        />
                      </div>
                    </form>
                    <hr />
                  </>
                ) : null}
                {reviews ? (
                  reviews.map((review) => (
                    <div key={review._id} onMouseLeave={() => {
                      const item = document.getElementsByName(review._id)
                      if (!item[0].className.includes('hidden')) item[0].className += ' hidden'
                    }}>
                      <div className="flex flex-col w-full gap-2 my-3">
                        <div className="flex flex-row w-full gap-2">
                          <Img src="images/img_profile_24_outline.svg" className="h-[30px] w-[30px]" />
                          <Text className="!text-gray-600 !font-medium h-5 my-auto">{review.userName}</Text>
                          <Text className="!text-gray-500 !font-medium h-4 my-auto ml-auto" size="xs">{review.createdAt.substr(0, 10)}</Text>
                        </div>
                        <RatingBar value={review.rating} />
                        <Text className="!text-gray-800 !font-medium">
                          {review.comment}
                        </Text>
                        <div className="flex flex-row w-full gap-2 h-[38px]">
                          <div className="relative">
                            <Button
                              className={`absolute w-[76px] rounded-full border-2 ${authData && review.like.includes(authData.userId) ? 'border-[#FF6652]' : 'border-[#6B7280]'} hover:mt-[-1px] hover:border-[#FF6652] hover:shadow-[#FF6652] shadow active:shadow-none active:mt-0 gap-1 font-medium`}
                              color="white_A700"
                              size="xs"
                              rightIcon={<img width="24" height="24" src={`https://img.icons8.com/material-outlined/24/${authData && review.like.includes(authData.userId) ? 'FF6652' : '6B7280'}/facebook-like--v1.png`} alt="facebook-like--v1" />}
                              children={<Text className={`text-inherit !font-medium ${authData && review.like.includes(authData.userId) ? '!text-[#FF6652]' : '!text-[#6B7280]'} pt-[2px]`}>Útil</Text>}
                              onClick={() => { if (authData) toogleLike(review) }}
                            />
                          </div>
                          <Text className="text-inherit !font-medium !text-gray-400 h-5 my-auto ml-20">{review.likeAmount} Likes</Text>
                          <div className="flex flex-col ml-auto relative">
                            <Button
                              shape="circle"
                              color="white_A700"
                              size="xs"
                              className="w-[36px] h-[36px] px-0 right-0 top-0 absolute shadow-none active:shadow-[inset_0_2px_4px_0_rgb(0,0,0,0.1)] active:mt-[4px] hover:shadow-[0_2px_4px_0_rgb(0,0,0,0.2)] hover:mt-[-2px]"
                              children={<img width="24" height="24" src="https://img.icons8.com/material-rounded/24/737373/menu-2.png" alt="menu-2" />}
                              onClick={() => {
                                const item = document.getElementsByName(review._id)
                                if (item[0].className.includes('hidden')) item[0].className = item[0].className.replace('hidden', '')
                                else item[0].className += ' hidden'
                              }}
                            />
                            {authData && review.createdBy == authData.userId ? (
                              <Button
                                name={review._id}
                                shape="round"
                                color="white_A700"
                                size="xs"
                                rightIcon={<img className="mr-2" width="20" height="20" src="https://img.icons8.com/material/20/9ca38f/pencil--v2.png" alt="pencil--v2" />}
                                className="border-2 border-gray-300 absolute top-9 right-2 hidden"
                                children={<Text className="text-inherit !font-medium !text-gray-400 pr-1 pl-2">Edit</Text>}
                                onClick={() => {
                                  const item = document.getElementsByName(review._id)
                                  item[0].className += ' hidden'
                                  setReview(review)
                                  setEditReview(true)
                                }}
                              />
                            ) : (
                              <Button
                                name={review._id}
                                shape="round"
                                color="white_A700"
                                size="xs"
                                className="border-2 border-gray-300 absolute top-9 right-2 hidden"
                                onMouse
                                children={<Text className="text-inherit !font-medium !text-gray-400 pt-[2px]">Report</Text>}
                                onClick={() => {
                                  const item = document.getElementsByName(review._id)
                                  item[0].className += ' hidden'
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  ))
                ) : null}
              </div>
              <ReviewModal isOpen={editReview} close={() => setEditReview(false)} onRequestClose={() => setEditReview(false)} review={review} target={"book"} />
            </div>
          </div>
        </div>
        <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
      </div>
    </>
  )
}