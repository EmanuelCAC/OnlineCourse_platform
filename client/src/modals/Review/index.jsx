import React, { useEffect, useState } from "react";
import { Text, CheckBox, Button, Input, Img, Heading, Slider, RatingBar } from "../../components";
import { default as ModalProvider } from "react-modal";
import axios from "axios";
import { useSelector } from "react-redux";

export default function ReviewModal({ isOpen, isSignupOpen, close, review, target, id, ...props }) {
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [confirm, setConfirm] = useState(false)
  const authData = useSelector((state) => state.auth.userData)

  const remove = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:3001/api/v1/book/review/${review._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      updateTarget()
      if (data) alert('Review Deleted Successifully')
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.patch(`http://localhost:3001/api/v1/${target}/review/${review._id}`,
        {
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
      updateTarget()
      close()
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  const addReview = async (e) => {
    e.preventDefault()

    try {
      if (target == "book") {
      const { data } = await axios.post(`http://localhost:3001/api/v1/${target}/review/`,
        {
          createdBy: authData.userId,
          bookId: id,
          comment,
          rating
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      } else if (target == "course") {
        const { data } = await axios.post(`http://localhost:3001/api/v1/${target}/review/`,
        {
          createdBy: authData.userId,
          courseId: id,
          comment,
          rating
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      }
      setComment("")
      setRating(0)
      updateTarget()
      close()
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  const updateTarget = async () => {
    try {
      const {data} = await axios.patch(`http://localhost:3001/api/v1/${target}/${id}`)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    if (review) {
      setRating(review.rating)
      setComment(review.comment)
    }
  }, [review])

  return (
    <ModalProvider
      {...props}
      appElement={document.getElementById("root")}
      isOpen={isOpen}
      className="w-[65%]"
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.25)'
        },
      }}
    >
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-row justify-center w-full px-14 py-[71px] md:p-5 bg-white-A700 rounded-[15px] outline-none">
          <div className="flex flex-row justify-center w-[97%]">
            <div className="flex flex-row justify-center w-full p-2">
              <div className="flex flex-row justify-center w-full">
                <div className="flex flex-row md:flex-col justify-between items-center w-full md:gap-10">
                  {review && <div className="flex flex-col justify-start w-full">
                    <Heading
                      size='lg'
                      className="mb-4"
                    >
                      {review.userName}
                    </Heading>
                    <form className="flex flex-col gap-3 w-full" onSubmit={(e) => submitHandler(e)} method="post">
                      <div className="flex flex-row gap-1">
                        <RatingBar
                          isEditable={true}
                          onChange={(e) => setRating(e)}
                          value={rating}
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
                        className="w-full sm:w-full rounded-tr-[10px] rounded-br-[10px] border-gray-400 border border-solid"
                      />
                      <Text as="p" size="xs" className="text-right px-1 mt-[-12px]">{comment.length}/200</Text>
                      <div className="flex flex-row gap-3 mt-[-10px]">
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
                          onClick={(e) => {
                            e.preventDefault()
                            setComment("")
                            setRating(0)
                            close()
                          }}
                        />
                        <Button
                          className="rounded-full bg-red-400 hover:bg-red-600 ml-auto"
                          size="xs"
                          children={'Delete'}
                          onClick={(e) => {
                            e.preventDefault()
                            setConfirm(true)
                          }}
                        />
                      </div>
                      {confirm && <div className="flex flex-row gap-4 ">
                        <Text size="lg" className="h-8 my-auto !text-black-900_cc">Are you sure you want to delete your review:</Text>
                        <Button
                          className="rounded-full bg-red-500"
                          size="xs"
                          children={'Confirm'}
                          onClick={(e) => {
                            e.preventDefault()
                            remove()
                            setConfirm(false)
                            close()
                          }}
                        /><Button
                          className="rounded-full border-2 border-gray-300 !text-gray-400"
                          size="xs"
                          color="white_A700"
                          children={'Cancel'}
                          onClick={(e) => {
                            e.preventDefault()
                            setConfirm(false)
                          }}
                        />
                      </div>}
                    </form>
                  </div>}
                  {!review && <div className="flex flex-col justify-start w-full">
                    <form className="flex flex-col gap-3 w-full" onSubmit={(e) => addReview(e)} method="post">
                      <div className="flex flex-row gap-1">
                        <RatingBar
                          isEditable={true}
                          onChange={(e) => setRating(e)}
                          value={rating}
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
                        className="w-full sm:w-full rounded-tr-[10px] rounded-br-[10px] border-gray-400 border border-solid"
                      />
                      <Text as="p" size="xs" className="text-right px-1 mt-[-12px]">{comment.length}/200</Text>
                      <div className="flex flex-row gap-3 mt-[-10px]">
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
                          onClick={(e) => {
                            e.preventDefault()
                            setComment("")
                            setRating(0)
                            close()
                          }}
                        />
                      </div>
                    </form>
                  </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
}
