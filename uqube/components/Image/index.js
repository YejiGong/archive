import React, {useState, useEffect} from "react"
import {useRouter} from "next/router"
import Image from "next/image"

const ImageList = ({data}) =>{
    const [datas, setDatas] = useState([])
    const [image, setImages] = useState(0)
    const router = useRouter()

    useEffect(()=>{
        if(data.images){
            setDatas(data.images)
        }
    }, [data])

    const clickLeftImage = () => {
        if(image>0){
            setImages(image-1)
        }
    }
    const clickRightImage = () => {
        if(data.images.length-1>image){
            setImages(image+1)
        }
    }

    //https://drive.google.com/uc?id=
    return(
        <>
        <ul className="image-list">
            {(()=>{
                if(datas.length>0){
                    return(
                        <p className="data" style={{display:"flex", alignItems:"center"}}>
                            <button onClick={clickLeftImage} className="arrow-prev"></button>
                            <img align="center" src= {"https://drive.google.com/uc?id="+datas[image].split("/")[5]} style={{width:"600px", height:"800px", objectFit:"contain"}}></img>
                            <button onClick={clickRightImage} className="arrow-next"></button>
                        </p>
                    )
                }

            })()}
        </ul>
        </>
    )
}



export default ImageList