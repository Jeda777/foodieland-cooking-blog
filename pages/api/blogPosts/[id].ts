import { MongoClient, ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

const password = process.env.DB_PASS
const passToSend = encodeURIComponent(password || '')
const URI = `mongodb+srv://admin:${passToSend}@cluster0.lhg3cmk.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(URI)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  if (typeof id === 'string' && ObjectId.isValid(id)) {
    const db = client.db('Data')
    const recipes = db.collection('blogPosts')
    const data = await recipes.findOne({ _id: new ObjectId(id) })
    if (data == null) {
      res.status(404).json('Not Found')
    } else {
      res.status(200).json(data)
    }
  } else {
    res.status(400).json('Bad Request')
  }
}

export default handler
