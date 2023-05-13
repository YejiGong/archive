import { formToJSON } from 'axios';
import {MongoClient} from 'mongodb';



export default async function mediadetail(req, res){
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db("Cluster0")
    var item = await db.collection('media').findOne({_id:parseInt(req.query.id)})
    //item.contents = item.contents.replaceAll("\n", "<br/>")
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