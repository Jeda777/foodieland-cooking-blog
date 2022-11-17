import clientPromise from '../../../../database/mongodb'
import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise
  const { id } = req.query
  if (typeof id === 'string' && ObjectId.isValid(id)) {
    const data = await client
      .db('Data')
      .collection('blogPosts')
      .find({ authorID: new ObjectId(id) })
      .toArray()
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
