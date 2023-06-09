import Header from '../components/Header';
import MediaBoardList from '../components/MediaBoard';
import Image from 'next/image';

const MediaBoard = ({data}) => {
    return(
        <>
        <div align="center" style={{backgroundColor:"#F2F2F2"}}>
        <div algin="center" style={{width:"800px", backgroundColor:"white"}}>
        <Header/>
        <div className = "letter-board">
                <MediaBoardList data = {data}/>
            </div>
        </div>
        </div>
        </>
    )
}

export const getServerSideProps = async ({query}) =>{
    const page = query.page || 1
    let data = null

    try{
        const res= await fetch(`${process.env.FETCH_URL}/api/mediadatas?page=${page}`)
        if(res.status != 200){
            throw new Error('Failed to fetch')
        }
        data = await res.json()
    } catch(err){
        data = {error : {message: err.message}}
    }
    return {props: {data}}
}

export default MediaBoard;