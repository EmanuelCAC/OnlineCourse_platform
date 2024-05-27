import axios from "axios";

try {
  const {data} = await axios.get('http://localhost:3001/api/v1/course?limit=100')

  data.map(async (course) => {
    for(let i=0; i<8; i++) {
      await axios.post("http://localhost:3001/api/v1/coursePlaylist", {
        courseId: course._id,
        name: `video ${i+1}`,
        video: "https://res.cloudinary.com/duheudj5m/video/upload/v1715084583/samples/elephants.mp4",
        order: i,
        poster: "/images/img_pexels_vanessa_garcia_6325959.png"
      })
    }
  })
} catch (error) {
  console.log(error.response);
}

// try {
//   const {data} = await axios.post('http://localhost:3001/api/v1/coursePlaylist/all', {courseId: "662267ca866cefc888892139"})

//   data.map(async (video) => {
//     await axios.delete(`http://localhost:3001/api/v1/coursePlaylist/${video._id}`)
//   })
// } catch (error) {
//   console.log(error);
// }