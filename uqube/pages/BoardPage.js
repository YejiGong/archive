import CommentList from '../components/Comment';
import ImageList from '../components/Image';
import ReplyList from '../components/Reply';

const BoardPage = ({data}) =>{
    return(
        <>
        <div className = "board">
            <p>{JSON.parse(data.datas).contents}</p>
            <ImageList data={JSON.parse(data.datas)}/>
        </div>
        <div className = "comment">
            <CommentList data={JSON.parse(data.datas).comments}/>
        </div>
        <div className = "reply">
            <ReplyList data={JSON.parse(data.datas).reply}/>
        </div>
        </>
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