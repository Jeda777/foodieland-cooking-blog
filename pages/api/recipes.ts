import clientPromise from '../../database/mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { page, img } = req.query
  const client = await clientPromise
  const count = await client.db('Data').collection('recipes').countDocuments()
  const lt = count + 1 - (Number(page) - 1) * 9
  const gt = lt - 10

  if (page === undefined) {
    const data = await client.db('Data').collection('recipes').find().toArray()
    res.status(200).json(data)
  } else {
    if (img === '0') {
      const recipes = await client
        .db('Data')
        .collection('recipes')
        .find({ id: { $gt: gt, $lt: lt } })
        .project({ images: 0, expand: 0 })
        .sort({ id: -1 })
        .toArray()
      const data = {
        recipes: recipes,
        count: count,
      }
      res.status(200).json(data)
    } else if (img === '1') {
      const recipes = await client
        .db('Data')
        .collection('recipes')
        .find({ id: { $gt: gt, $lt: lt } })
        .project({ expand: 0, name: 0, time: 0, dish: 0, _id: 0 })
        .sort({ id: -1 })
        .toArray()
      const data = {
        recipes: recipes,
        count: count,
      }
      res.status(200).json(data)
    } else {
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
}

export default handler
