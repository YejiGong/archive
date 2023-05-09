import dbConnect from "../utils/db/dbConnect";
import {MongoClient} from 'mongodb';

const LetterBoard = ({items}) => {
    return(
        <>
            <p>{items.writer}</p>
            <p>{items.contents}</p>
        </>
    )
}

export async function getServerSideProps(){
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db("Cluster0")
    const items = await db.collection('letter').findOne({_id:1})
    return {props:{items: items}}
}

export default LetterBoard;