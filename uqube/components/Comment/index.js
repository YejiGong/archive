import React, {useState, useEffect} from "react"
import {useRouter} from "next/router"

const CommentList = ({data}) =>{
    const [datas, setDatas] = useState([])
    const router = useRouter()

    useEffect(()=>{
        if(data){
            setDatas(data)
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
                        <div className="board-writer-container" style={{marginLeft:"5%"}}>
                            <div className="board-writer" style={{width:"45px", height:"45px", borderRadius:"70%", border:"1px solid #B9B7B0", overflow:"hidden", marginTop:"10px"}}>
                                {(()=>{
                                    if(data[0].substr(-2)=="홍석"){
                                        return <img src="/images/pentagon_홍석.jpeg" style={{width:"100%", height:"100%", objectFit:"cover"}}></img>
                                    }else if (data[0].substr(-2)=="신원"){
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
                                    <p>{data[0].substr(7)}</p>
                                </div>
                                <p style={{color:"#767676", fontSize:"15px", paddingRight:"50%"}}>{data[1]}</p>
                            </div>
                            <div style={{flexBasis:"100%"}}></div>
                                <div className="board-writer">
                                <p style={{marginBottom:"30px", textAlign:"left"}}>{data[2]}</p>
                            </div>
                    </div>
                    <hr style={{marginRight:"20px", border:"thin solid #F2F2F2"}}/>
                        {/* <p>{data[0]}</p>
                        <p>{data[1]}</p>
                        <p>{data[2]}</p> */}
                    </p>
                )
            })}
        </ul>
        </>
    )
}



export default CommentList