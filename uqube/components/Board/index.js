import React, {useState, useEffect} from "react"
import {useRouter} from "next/router"
import Link from "next/link"

const BoardList = ({data}) =>{
    const [datas, setDatas] = useState([])
    const router = useRouter()

    useEffect(()=>{
        if(data){
            setDatas(data.datas)
        }
    }, [data])


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

    console.log(datas)
    
    return(
        <>
        <ul className="board-list">
            {datas.length>0 &&
            datas.map((data,i) => {
                return(
                    <p className="data" key={i}>
                        <p>{data.writer}, {data._id}</p>
                        <Link href={{pathname:"/BoardPage",query:{id:data._id}}}>
                            <p>{data.contents}</p>
                        </Link>
                    </p>
                )
            })}
        </ul>
        </>
    )
}



export default BoardList