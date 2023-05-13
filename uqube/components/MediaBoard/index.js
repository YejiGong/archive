import React, {useState, useEffect} from "react"
import {useRouter} from "next/router"
import Link from "next/link"
import Image from "next/image"

const MediaBoardList = ({data}) =>{
    const [datas, setDatas] = useState([])
    const router = useRouter()
    
    useEffect(()=>{
        if(data){
            setDatas(data.datas)
        }
    }, [data])
    useEffect(()=>{
        if("scrollKey" in sessionStorage){
            window.scrollTo(0,sessionStorage.getItem("scrollKey"))
            sessionStorage.removeItem("scrollKey")
        }
        })

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
                    sessionStorage.setItem("scrollKey", window.scrollY)
                    
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
                    <p className="data" key={i} align="left">
                        <div className="board-writer-container">
                            
                            <div className="board-writer" style={{height:"30px"}}>
                                <div style={{display:"flex", alignItems:"center", height:"10px", marginTop:"18px"}}>
                                    <div style={{height:"20px", width:"160px", marginRight:"7px", borderRadius:"20px", overflow:"hidden", border:"1px solid #376BB6", color:"#376BB6", textAlign:"center", fontSize:"15px"}}>
                                        {data.category}
                                    </div>
                                    <p style={{color:"#767676", fontSize:"15px"}}>{data.date}</p>
                                </div>
                            </div>
                            <div style={{flexBasis:"100%"}}></div>
                                <div className="board-writer" style={{display:"flex", justifyContents:"space-between", position:"relative"}}>
                                <Link href={{pathname:"/MediaBoardPage",query:{id:data._id}}}>
                                <p style={{marginBottom:"30px", whiteSpace:"pre-line", width:"500px"}}>{data.content.split("\n")[0]}</p>
                                </Link>
                                {(()=>{
                                    if(data.images && data.images.length>0){
                                        return <img src={"https://drive.google.com/uc?id="+String(data.images[0]).split("/")[5]} style={{width:"100px", height:"100px", borderRadius:"10px", objectFit:"cover", position:"absolute", left:"600px", bottom:"0px"}}/>
                                    }
                                })()}
                            </div>

                        </div>
                        <hr style={{marginRight:"20px", border:"thin solid #F2F2F2"}}/>
                    </p>
                )
            })}
        </ul>
        </>
    )
}



export default MediaBoardList