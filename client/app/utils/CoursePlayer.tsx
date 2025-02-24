import axios from 'axios';
import React, { FC, useEffect, useState } from 'react'

type Props = {
  videoUrl: string;
  title: any;
}

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: ""
  })

  useEffect(() => {
    axios.post("http://localhost:3001/api/v1/getVdoCipherOTP", { videoId: videoUrl }).then((res) => { setVideoData(res.data) })


  }, [videoUrl])

  return (
    <div  style={{ position:"relative", paddingTop: "56.25%", overflow:"hidden"}}>
      {
        videoData.otp && videoData.playbackInfo !== "" && (

          <iframe src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}&player=BsGnyD6kbBTERaCM`}
          className='promo border-5 dark:border-white'
            style={{
              // border: "10px",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0
            }}
            allowFullScreen={true}
            allow="encrypted-media"></iframe>


        )
      }
    </div >
  )
}

export default CoursePlayer