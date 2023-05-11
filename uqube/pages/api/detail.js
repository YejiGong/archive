import { formToJSON } from 'axios';
import {MongoClient} from 'mongodb';



export default async function detail(req, res){
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db("Cluster0")
    const item = await db.collection('letter').findOne({_id:parseInt(req.query.id)})
    var items = new Object();
    
    try{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(
            JSON.stringify({
                message: 'Fetched boards',
                datas: JSON.stringify(item)
            })
        )

    }catch(err){
        console.log(err)
    }
}