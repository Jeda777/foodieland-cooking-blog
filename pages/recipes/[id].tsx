import { ObjectId } from 'mongodb'
import { GetServerSideProps } from 'next'
import { Recipe } from '../../mongodb'
import clientPromise from '../../database/mongodb'

type Props = {
  id: string | undefined
}

const id: React.FC<Props> = ({ id }) => {
  return <div>{id}</div>
}

export const getServerSideProps: GetServerSideProps<{ id: undefined | string }> = async (context) => {
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
        props: {
          id: undefined,
        },
        notFound: true,
      }
    } else {
      return {
        props: {
          id: id,
        },
      }
    }
  } else {
    return {
      props: {
        id: undefined,
      },
      notFound: true,
    }
  }
}

export default id
