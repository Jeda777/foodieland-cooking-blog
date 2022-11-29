import { ObjectId } from 'mongodb'
import { GetServerSideProps } from 'next'
import { Recipe } from '../../mongodb'
import clientPromise from '../../database/mongodb'
import Inbox from '../../components/Inbox'

type Props = {
  recipe: Recipe
}

const id: React.FC<Props> = ({ recipe }) => {
  return (
    <>
      {recipe.name}
      <Inbox />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{ recipe: Recipe }> = async (context) => {
  const id = context.params?.id
  if (typeof id === 'string' && ObjectId.isValid(id)) {
    const client = await clientPromise
    const data = await client
      .db('Data')
      .collection('recipes')
      .findOne({ _id: new ObjectId(id) })
    const recipe: Recipe = JSON.parse(JSON.stringify(data))
    if (recipe === null || recipe.expand === null) {
      return {
        notFound: true,
      }
    } else {
      return {
        props: {
          recipe: recipe,
        },
      }
    }
  } else {
    return {
      notFound: true,
    }
  }
}

export default id
