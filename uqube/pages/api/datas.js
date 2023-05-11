import {MongoClient} from 'mongodb';



export default async function handler(req, res){
    const curPage = req.query.page || 1
    const perPage = 10
    const data = []
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db("Cluster0")
    for(var i=1; i<curPage+perPage; i++){
        const items = await db.collection('letter').findOne({_id:i})
        data.push(items)
    }

    try{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(
            JSON.stringify({
                message: 'Fetched boards',
                datas: data,
                curPage: curPage,
                maxPage: Math.ceil(data.length / perPage),
            })
        )

    }catch(err){
        console.log(err)
    }
}