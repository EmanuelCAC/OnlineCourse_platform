import React from "react";
import { Text, Img, Button, RatingBar } from "components";
import { useSelector } from "react-redux";
import axios from "axios";

const ReviewComment = ({review, getReviews, setReview, setEditReview}) => {
  const authData = useSelector((state) => state.auth.userData)

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

  return (
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
  )
}

export { ReviewComment }