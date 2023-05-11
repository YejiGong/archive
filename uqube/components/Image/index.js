import React, {useState, useEffect} from "react"
import {useRouter} from "next/router"

const ImageList = ({data}) =>{
    const [datas, setDatas] = useState([])
    const router = useRouter()

    useEffect(()=>{
        if(data.images){
            setDatas(data.images)
        }
    }, [data])
    console.log(data.images)

    //https://drive.google.com/uc?id=
    return(
        <>
        <ul className="image-list">
            {datas.length>0 &&
            datas.map((data,i) => {
                return(
                    <p className="data" key={i}>
                        <img src= {"https://drive.google.com/uc?id="+data.split("/")[5]}></img>
                    </p>
                )
            })}
        </ul>
        </>
    )
}



export default ImageList