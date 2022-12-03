import clientPromise from '../../database/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page } = req.query
  const client = await clientPromise

  if (page === undefined) {
    const data = await client.db('Data').collection('recipes').find().toArray()
    res.status(200).json(data)
  } else {
    const count = await client.db('Data').collection('recipes').countDocuments()
    const lt = count + 1 - (Number(page) - 1) * 9
    const gt = lt - 10
    const recipes = await client
      .db('Data')
      .collection('recipes')
      .find({ id: { $gt: gt, $lt: lt } })
      .sort({ id: -1 })
      .toArray()
    const data = {
      recipes: recipes,
      count: count,
    }
    res.status(200).json(data)
  }
}

export default handler
