import {MongoClient} from 'mongodb';



export default async function searchhandler(req, res){
    const curPage = req.query.page || 1
    const search = req.query.search
    const option = req.query.option
    const perPage = 5
    const data = []
    const rgx = (pattern)=>new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(search);
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db("Cluster0")
    if(option==="writer"){
        const items = await db.collection('letter').find({writer:{$regex:searchRgx, $options:"i"}}).limit(curPage*perPage).toArray()
        data.push(items)
    }else{
        const items = await db.collection('letter').find({contents:{$regex:searchRgx, $options:"i"}}).limit(curPage*perPage).toArray()
        data.push(items)
        
    }

    try{
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(
            JSON.stringify({
                message: 'Fetched boards',
                datas: data,
                search: search,
                curPage: curPage,
                maxPage: Math.ceil(data.length / perPage),
            })
        )

    }catch(err){
        console.log(err)
    }
}