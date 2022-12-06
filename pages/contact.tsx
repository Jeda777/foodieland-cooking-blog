import Inbox from '../components/Inbox'
import YouMayLikeTheseRecipesToo from '../components/YouMayLikeTheseRecipesToo'
import clientPromise from '../database/mongodb'
import { Recipe } from '../mongodb'

type Props = {
  recipesData: Recipe[]
}

const Contact: React.FC<Props> = ({ recipesData }) => {
  return (
    <>
      <Inbox />
      <YouMayLikeTheseRecipesToo recipesData={recipesData} />
    </>
  )
}

export const getStaticProps = async () => {
  const client = await clientPromise
  const recipesOriginalData = await client.db('Data').collection('recipes').find().limit(4).toArray()
  const recipesData: Recipe[] = await JSON.parse(JSON.stringify(recipesOriginalData))
  return {
    props: {
      recipesData: recipesData,
    },
  }
}

export default Contact
