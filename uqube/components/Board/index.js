import React, {useState, useEffect} from "react"
import {useRouter} from "next/router"
import Link from "next/link"
import Image from "next/image"

const BoardList = ({data}) =>{
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
                            <div className="board-writer" style={{width:"45px", height:"45px", borderRadius:"70%", border:"1px solid #B9B7B0", overflow:"hidden", marginTop:"25px"}}>
                                {(()=>{
                                    if(data.writer.substr(-2)=="홍석"){
                                        return <img src="/images/pentagon_홍석.jpeg" style={{width:"100%", height:"100%", objectFit:"cover"}}></img>
                                    }else if (data.writer.substr(-2)=="신원"){
                                        return <img src="/images/pentagon_신원.jpeg" style={{width:"100%", height:"100%", objectFit:"cover"}}></img>
                                    }else{
                                        return <img src="/images/basic.png" style={{width:"100%", height:"100%", objectFit:"cover"}}></img>
                                    }
                                })()}
                                </div>
                            <div className="board-writer" style={{height:"45px"}}>
                                <div style={{display:"flex", alignItems:"center", height:"10px", marginTop:"18px"}}>
                                    <div style={{height:"20px", width:"60px", marginRight:"7px", borderRadius:"20px", overflow:"hidden", border:"1px solid #376BB6", color:"#376BB6", textAlign:"center", fontSize:"15px"}}>
                                        Artist
                                    </div>
                                    <p>{data.writer.substr(7)}</p>
                                </div>
                                <p style={{color:"#767676", fontSize:"15px"}}>{data.date}</p>
                            </div>
                            <div style={{flexBasis:"100%"}}></div>
                                <div className="board-writer">
                                <Link href={{pathname:"/BoardPage",query:{id:data._id}}}>
                                <p style={{marginBottom:"30px", whiteSpace:"pre-line"}}>{data.contents}</p>
                                </Link>
                                {(()=>{
                                    if(data.images && data.images.length>0){
                                        return <img width="700" height="500" align="center" src={"https://drive.google.com/uc?id="+String(data.images[0]).split("/")[5]} style={{width:"700px", height:"500px", objectFit:"cover", objectPosition:"50% 50%"}}/>
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



export default BoardList