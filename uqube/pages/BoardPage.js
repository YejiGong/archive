import CommentList from '../components/Comment';
import { useState } from 'react';
import { useRouter } from 'next/router';
import ImageList from '../components/Image';
import ReplyList from '../components/Reply';
import Link from 'next/link';
import Image from 'next/image';

const BoardPage = ({data}) =>{
    const router = useRouter();
    const [showComment, setComment] = useState(true)
    const clickComment=()=>{
        setComment(!showComment)
        var el_1 = document.getElementById("cmt_btn")
        var el_2 = document.getElementById("reply_btn")
        if(!showComment){ //댓글보기 버튼 활성화
            el_1.style.color="white"
            el_1.style.backgroundColor = "#376BB6"
            
            el_2.style.color="#376BB6"
            el_2.style.backgroundColor = "white"
        }else{
            el_2.style.color="white"
            el_2.style.backgroundColor = "#376BB6"

            el_1.style.color="#376BB6"
            el_1.style.backgroundColor = "white"
        }
    }
    return(
        <div style={{backgroundColor:"#F2F2F2", height:"100%"}} align="center">
            <div style={{backgroundColor:"white", width:"800px", height:"100%"}}>
                <div align="right" className="close" onClick={()=>router.back()}></div>
                <div className="board-writer-container" style={{marginLeft:"5%", paddingTop:"8%"}}>
                            <div className="board-writer" style={{width:"45px", height:"45px", borderRadius:"70%", border:"1px solid #B9B7B0", overflow:"hidden", marginTop:"25px"}}>
                                {(()=>{
                                    if(JSON.parse(data.datas).writer.substr(-2)=="홍석"){
                                        return <img src="/images/pentagon_홍석.jpeg" style={{width:"100%", height:"100%", objectFit:"cover"}}></img>
                                    }else if (JSON.parse(data.datas).writer.substr(-2)=="신원"){
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
                                    <p>{JSON.parse(data.datas).writer.substr(7)}</p>
                                </div>
                                <p style={{color:"#767676", fontSize:"15px", paddingRight:"50%"}}>{JSON.parse(data.datas).date}</p>
                            </div>
                            <div style={{flexBasis:"100%"}}></div>
                                <div className="board-writer">
                                <p style={{marginBottom:"30px", textAlign:"left", whiteSpace:"pre-line"}}>{JSON.parse(data.datas).contents}</p>
                                <ImageList data={JSON.parse(data.datas)}></ImageList>
                            </div>
                    </div>
                    <hr style={{marginRight:"20px", border:"thin solid #F2F2F2"}}/>
                    <div align="center" style={{display:"flex", alignItems:"center", marginLeft:"25%", paddingBottom:"3%"}}>
                        <div id="cmt_btn" onClick={clickComment} style={{height:"30px", width:"200px", marginRight:"7px", paddingTop:"3px",borderRadius:"10px", overflow:"hidden", border:"1px solid #376BB6", color:"white", backgroundColor:"#376BB6",textAlign:"center", fontSize:"15px"}}>
                                            아티스트 댓글 보기
                        </div>
                        <div id="reply_btn" onClick={clickComment} style={{height:"30px", width:"200px", marginRight:"7px", paddingTop:"3px",borderRadius:"10px", overflow:"hidden", border:"1px solid #376BB6", color:"#376BB6", textAlign:"center", fontSize:"15px"}}>
                                            아티스트 답글 보기
                        </div>
                    </div>
                <div className = "comment">
                    {showComment && <CommentList data={JSON.parse(data.datas).comments}/>}
                </div>
                <div className = "reply">
                    {!showComment && <ReplyList data={JSON.parse(data.datas).reply}/>}
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({query}) =>{
    const id = query.id
    let data = null

    try{
        const res= await fetch(`${process.env.FETCH_URL}/api/detail?id=${id}`)
        if(res.status != 200){
            throw new Error('Failed to fetch')
        }
        data = await res.json()
    } catch(err){
        data = {error : {message: err.message}}
    }
    return {props: {data}}
}

export default BoardPage