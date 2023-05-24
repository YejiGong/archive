import SearchHeader from '../../components/SearchHeader';
import BoardList from '../../components/Board';
import Image from 'next/image';
import MediaSearchList from '../../components/MediaSearch';

const Media= ({data}) => {
    return(
        <>
        <div align="center" style={{backgroundColor:"#F2F2F2"}}>
        <div algin="center" style={{width:"800px", backgroundColor:"white"}}>
            <SearchHeader/>
        <div className = "search-board">
            <MediaSearchList data = {data}/>
        </div>
        </div>
        </div>
        </>
    )
}

export const getServerSideProps = async ({query}) =>{
    const page = query.page || 1
    const search = query.search
    const option = query.option
    let data = null

    try{
        const res= await fetch(`${process.env.FETCH_URL}/api/mediasearch?page=${page}&search=${search}&option=${option}`)
        if(res.status != 200){
            throw new Error('Failed to fetch')
        }
        data = await res.json()
    } catch(err){
        data = {error : {message: err.message}}
    }
    return {props: {data}}
}

export default Media;