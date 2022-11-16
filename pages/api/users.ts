import { MongoClient } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

const password = process.env.DB_PASS
const passToSend = encodeURIComponent(password || '')
const URI = `mongodb+srv://admin:${passToSend}@cluster0.lhg3cmk.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(URI)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = client.db('Data')
  const recipes = db.collection('users')
  const cursor = recipes.find()
  const data = await cursor.toArray()
  res.status(200).json(data)
}

export default handler
