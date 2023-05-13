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
    console.log("data", data)

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

    var mrg="5%"

    
    return(
        <>
        <ul className="board-list" style={{backgroundColor:"white"}}>
            {datas.length>0 &&
            datas.map((data,i) => {
                return(
                    <p className="data" key={i}>
                        {data.map((d, j)=>
                        
                        <p key={j}>
                            {(()=>{
                            if(j==0){
                                mrg="5%"
                            }else{
                                mrg="10%"
                            }
                        })()}
                                <div className="board-writer-container" style={{marginLeft:String(mrg)}}>
                                    
                                    <div className="board-writer" style={{width:"45px", height:"45px", borderRadius:"70%", border:"1px solid #B9B7B0", overflow:"hidden", marginTop:"10px"}}>

                                        {(()=>{
                                            if(d[0].substr(-2)=="홍석"){
                                                return <img src="/images/pentagon_홍석.jpeg" style={{width:"100%", height:"100%", objectFit:"cover"}}></img>
                                            }else if (d[0].substr(-2)=="신원"){
                                                return <img src="/images/pentagon_신원.jpeg" style={{width:"100%", height:"100%", objectFit:"cover"}}></img>
                                            }else{
                                                return <img src="/images/basic.png" style={{width:"100%", height:"100%", objectFit:"cover"}}></img>
                                            }
                                        })()}
                                        </div>
                                    <div className="board-writer" style={{height:"45px"}}>
                                        <div style={{display:"flex", alignItems:"center", height:"10px", marginTop:"18px"}}>
                                            {(()=>{
                                                if(d[0].split(" ")[0]=="Artist"){
                                                return <><div style={{height:"20px", width:"60px", marginRight:"7px", borderRadius:"20px", overflow:"hidden", border:"1px solid #376BB6", color:"#376BB6", textAlign:"center", fontSize:"15px"}}>
                                                    Artist
                                                </div>
                                                <p>{d[0].substr(7)}</p></>
                                                }
                                                else{
                                                    return <p align="left" style={{width:"280px", marginLeft:"7px"}}>{d[0]}</p>
                                                }
                                            })()}
                                            
                                            
                                        </div>
                                        <p style={{color:"#767676", fontSize:"15px", paddingRight:"50%", textAlign:"left"}}>{d[1][0]}</p>
                                    </div>
                                    <div style={{flexBasis:"100%"}}></div>
                                        <div className="board-writer">
                                        <p style={{marginBottom:"30px", textAlign:"left"}}>{d[1][1]}</p>
                                    </div>

                            </div>
                            <hr style={{marginRight:"20px", border:"thin solid #F2F2F2"}}/>
                            </p>
                            // <p>{d}</p>
                        )}
                    </p>
                )
            })}
        </ul>
        </>
    )
}



export default ReplyList