import CommentList from '../components/Comment';
import { useState } from 'react';
import ImageList from '../components/Image';
import ReplyList from '../components/Reply';
import Link from 'next/link';

const MediaBoardPage = ({data}) =>{
    var idx = JSON.parse(data.datas).content.indexOf("\n")
    return(
        <div style={{backgroundColor:"#F2F2F2", height:"100%"}} align="center">
            <div style={{backgroundColor:"white", width:"800px", height:"100%"}}>
                <Link align="right" className="close" href="/MediaBoard"></Link>
                <div className="board-writer-container" style={{marginLeft:"5%", paddingTop:"8%"}}>
                            <div style={{height:"20px", width:"130px", marginRight:"7px", borderRadius:"20px", overflow:"hidden", border:"1px solid #376BB6", color:"#376BB6", textAlign:"center", fontSize:"15px"}}>
                                                    {JSON.parse(data.datas).category}
                            </div>
                            <div style={{flexBasis:"100%"}}></div>
                            <div className="board-writer" style={{width:"45px", height:"45px", borderRadius:"70%", border:"1px solid #B9B7B0", overflow:"hidden", marginTop:"25px"}}>
                                <img src="/images/profile_cube.png" style={{width:"100%", height:"100%", objectFit:"cover"}}></img>
                            </div>
                            <div className="board-writer" style={{height:"35px", width:"200px"}}>
                                <div style={{display:"flex", alignItems:"center", height:"0px", marginTop:"20px"}}>
                                    <p>관리자</p>
                                </div>
                                <p style={{color:"#767676", fontSize:"15px", paddingRight:"58%", marginTop:"13px"}}>{JSON.parse(data.datas).date}</p>
                            </div>
                            <div style={{flexBasis:"100%"}}></div>
                            <div className="board-writer">
                                <p style={{textAlign:"left", whiteSpace:"pre-line"}}>{JSON.parse(data.datas).content.split("\n")[0]}</p>
                                <hr style={{marginRight:"20px", border:"thin solid #767676"}}/>
                                <p style={{textAlign:"left", whiteSpace:"pre-line"}}>{JSON.parse(data.datas).content.slice(idx+1)}</p>
                                <ImageList data={JSON.parse(data.datas)} style={{margin:"auto"}}></ImageList>
                            </div>
                    </div>
                    <hr style={{marginRight:"20px", border:"thin solid #F2F2F2"}}/>
                    
            </div>
        </div>
    )
}

export const getServerSideProps = async ({query}) =>{
    const id = query.id
    let data = null

    try{
        const res= await fetch(`${process.env.FETCH_URL}/api/mediadetails?id=${id}`)
        if(res.status != 200){
            throw new Error('Failed to fetch')
        }
        data = await res.json()
    } catch(err){
        data = {error : {message: err.message}}
    }
    return {props: {data}}
}

export default MediaBoardPage