import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Header, Text, Heading, Img, RatingBar, Button, Footer, BreadCrumbs, Input } from "components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import EditReview from "modals/EditReview";

export default function BookDetails() {
  const { id } = useParams()
  const [book, setBook] = useState({})
  const [display, setDisplay] = useState(null)
  const [amount, setAmount] = useState(1)
  const [isForm, setIsForm] = useState(false)
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [reviews, setReviews] = useState()
  const [bookRating, setBookRating] = useState(0)
  const [totalReviews, setTotalReviews] = useState(0)
  const [editReview, setEditReview] = useState(false)
  const [review, setReview] = useState(null)
  const authData = useSelector((state) => state.auth.userData)

  const getBook = async () => {
    const data = await fetch(`http://localhost:3001/api/v1/book/${id}`)
    const result = await data.json()
    if (result) setBook(result)
    if (book) setDisplay(book.image)
  }

  const getReviews = async () => {
    const { data } = await axios.get(`http://localhost:3001/api/v1/review`, { bookId: book._id })
    const reviewsList = data.map(async (review) => {
      const data = await fetch(`http://localhost:3001/api/v1/user/${review.createdBy}`)
      const user = await data.json()
      if (user) review.userName = user.user.name
      return review
    })

    if (reviewsList) Promise.all(reviewsList).then((result) => setReviews(result))
  }

  const getBookRating = () => {
    let average = 0
    let i
    for (i = 0; i < reviews.length; i++) {
      average += reviews[i].rating
    }
    setBookRating(Number((average / i).toFixed(2)))
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post(`http://localhost:3001/api/v1/review/`,
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

  useEffect(() => {
    getBook()
    getReviews()
  }, [])

  useEffect(() => {
    getReviews()
  }, [submitHandler])

  useEffect(() => {
    if (reviews) {
      getBookRating()
      setTotalReviews(reviews.length)
    }
  }, [reviews])

  return (
    <>
      <Helmet>
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" />
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
                  <Img src={book.image} className={'w-16 hover:border-black-900_02 hover:border-2 mb-1 mx-3'} />
                </div>
                <div>
                  <Img src={display || book.image} />
                </div>
              </div>
              <div className="flex flex-col m-5 w-[50%]">
                <Heading children={book.name} size="xl" />
                <div className="flex flex-rol w-full justify-between">
                  <Text>
                    By {book.author}
                  </Text>
                  <div className="flex flex-rol gap-2">
                    <Text className="h-5 my-auto">{bookRating}</Text>
                    <RatingBar value={bookRating} size={20} />
                    <Text className="h-5 my-auto">({totalReviews})</Text>
                  </div>
                </div>
                <div className="mt-8">
                  <Heading children='Category' size="s" />
                  <div className="flex flex-row gap-3 mt-1">
                    <Text as="span" className="border-2 py-1 px-2 rounded-full bg-gray-100 text-black-900_02">{book.category}</Text>
                  </div>
                </div>
                <div className="mt-8">
                  <Heading children='Description' size="s" />
                  <Text as="p" className="text-black-900_02 my-1 mx-3">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta praesentium vero suscipit veniam ipsum facere facilis qui deleniti repudiandae totam veritatis doloremque repellat ipsam eaque mollitia, consequatur quam dolorum necessitatibus!
                  </Text>
                </div>
                <div className="flex flew-row mt-auto">
                  <Text as="p" className="text-black-900_02 my-auto mx-3 h-8" size="lg">
                    Amount:
                  </Text>
                  <div className="flex border-2 border-gray-200 h-[32px] my-auto">
                    <Button className="h-[30px] px-0 bg-gray-200 aspect-square" onClick={() => { if (amount > 1) setAmount(amount - 1) }}>
                      <Text size="lg" className="text-black-900_02" >-</Text>
                    </Button>
                    <Input
                      className="h-[30px] text-black-900_02 !px-5"
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
                      <Text size="lg" className="text-black-900_02" >+</Text>
                    </Button>
                  </div>
                  <Button className="ml-auto">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-10 px-3 w-full">
              <Heading size="lg" className="py-8 font-normal">Reviews</Heading>
              <div className="flex flex-row h-[60px] gap-3">
                <Text as="span" className="text-5xl font-extrabold h-[36px] my-auto">{bookRating}</Text>
                <div className="flex flex-col my-auto">
                  <RatingBar value={bookRating} size={20} />
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
                    <div key={review._id}>
                      <div className="flex flex-col w-full gap-2 my-5">
                        <div className="flex flex-row w-full gap-2">
                          <Img src="images/img_profile_24_outline.svg" className="h-[30px] w-[30px]" />
                          <Text className="!text-gray-600 !font-medium h-5 my-auto">{review.userName}</Text>
                          <Text className="!text-gray-500 !font-medium h-4 my-auto ml-auto" size="xs">{review.updatedAt.substr(0, 10)}</Text>
                        </div>
                        <RatingBar value={review.rating} />
                        <Text className="!text-gray-800 !font-medium">
                          {review.comment}
                        </Text>
                        <div className="flex flex-row w-full pt-1">
                          <Button
                            className="rounded-full border-2 border-[#6B7280] gap-1 font-medium"
                            color="white_A700"
                            size="xs"
                            rightIcon={<img width="24" height="24" src="https://img.icons8.com/material-outlined/24/6B7280/facebook-like--v1.png" alt="facebook-like--v1" />}
                            children={<Text className="text-inherit !font-medium !text-[#6B7280] pt-[2px]">Útil</Text>}
                          />
                          <div className="flex flex-col w-full relative">
                            <Button
                              shape="circle"
                              color="white_A700"
                              size="xs"
                              className="ml-auto"
                              children={<img width="24" height="24" src="https://img.icons8.com/material-rounded/24/737373/menu-2.png" alt="menu-2" />}
                              onClick={() => {
                                const item = document.getElementsByName(review.userName)
                                item[0].className = item[0].className.replace('hidden', '')
                              }}
                            />
                            {authData && review.createdBy == authData.userId ? (
                              <Button
                                name={review.userName}
                                shape="round"
                                color="white_A700"
                                size="xs"
                                rightIcon={<img width="20" height="20" src="https://img.icons8.com/material/20/9ca38f/pencil--v2.png" alt="pencil--v2" />}
                                className="border-2 border-gray-300 absolute top-9 right-2 hidden"
                                children={<Text className="text-inherit !font-medium !text-gray-400 pr-1">Edit</Text>}
                                onClick={() => {
                                  const item = document.getElementsByName(review.userName)
                                  item[0].className += ' hidden'
                                  setReview(review)
                                  setEditReview(true)
                                }}
                              />
                            ) : (
                              <Button
                                name={review.userName}
                                shape="round"
                                color="white_A700"
                                size="xs"
                                className="border-2 border-gray-300 absolute top-9 right-2 hidden"
                                children={<Text className="text-inherit !font-medium !text-gray-400 pt-[2px]">Report</Text>}
                                onClick={() => {
                                  const item = document.getElementsByName(review.userName)
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
              <EditReview isOpen={editReview} close={() => setEditReview(false)} onRequestClose={() => setEditReview(false)} review={review} />
            </div>
          </div>
        </div>
        <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
      </div>
    </>
  )
}