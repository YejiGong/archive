import BoardList from '../components/Board';

const LetterBoard = ({data}) => {
    return(
        <div className = "letter-board">
            <BoardList data = {data}/>
        </div>
    )
}

export const getServerSideProps = async ({query}) =>{
    const page = query.page || 1
    let data = null

    try{
        const res= await fetch(`${process.env.FETCH_URL}/api/datas?page=${page}`)
        if(res.status != 200){
            throw new Error('Failed to fetch')
        }
        data = await res.json()
    } catch(err){
        data = {error : {message: err.message}}
    }
    return {props: {data}}
}

export default LetterBoard;