import clientPromise from '../../database/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise
  const data = await client.db('Data').collection('recipes').find().toArray()
  res.status(200).json(data)
}

export default handler
