import React, {useState, useEffect} from "react"
import {useRouter} from "next/router"

const ReplyList = ({data}) =>{
    const [datas, setDatas] = useState([])
    const router = useRouter()

    useEffect(()=>{
        if(Object.keys(data)){
            console.log("set data")
            setDatas(Object.values(data))
        }
    }, [data])
    console.log(Object.values(data))

    useEffect(()=>{
        window.addEventListener("scroll", handleScroll)
        return()=>{
            window.removeEventListener("scroll", handleScroll)
        }
    })

    const handleScroll = () =>{
        const lastDataLoaded = document.querySelector(
            ".board-list> .data:last-child"
        )
        if (lastDataLoaded){
            const lastDataLoadedOffset =
            lastDataLoaded.offsetTop + lastDataLoaded.clientHeight
            const pageOffset = window.pageYOffset + window.innerHeight
            if(pageOffset>lastDataLoadedOffset){
                if(data.curPage<data.maxPage){
                    const query = router.query
                    query.page = parseInt(data.curPage) + 1
                    router.push({
                        pathname:router.pathname,
                        query:query
                    })
                }
            }
        }
    }

    
    return(
        <>
        <ul className="board-list">
            {datas.length>0 &&
            datas.map((data,i) => {
                return(
                    <p className="data" key={i}>
                        <p>{data.length}</p>
                        {data.map((d)=>
                            <p>{d}</p>
                        )}
                    </p>
                )
            })}
        </ul>
        </>
    )
}



export default ReplyList