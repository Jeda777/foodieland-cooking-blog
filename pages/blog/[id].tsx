import Inbox from '../../components/Inbox'
import YouMayLikeTheseRecipesToo from '../../components/YouMayLikeTheseRecipesToo'
import { ObjectId } from 'mongodb'
import { GetServerSideProps } from 'next'
import { BlogPost, User, Recipe, BlogPostExpand } from '../../mongodb'
import clientPromise from '../../database/mongodb'
import Image from 'next/image'
import Head from 'next/head'
import style from '../../styles/BlogPost.module.scss'

type Props = {
  recipesData: Recipe[]
  post: BlogPost
  user: User
}

const id: React.FC<Props> = ({ recipesData, post, user }) => {
  return (
    <>
      <Inbox />
      <YouMayLikeTheseRecipesToo recipesData={recipesData} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const id = context.params?.id
  if (typeof id === 'string' && ObjectId.isValid(id)) {
    const client = await clientPromise
    const data = await client
      .db('Data')
      .collection('blogPosts')
      .findOne({ _id: new ObjectId(id) })
    const post: BlogPost = JSON.parse(JSON.stringify(data))
    if (post === null || post.expand === null) {
      return {
        notFound: true,
      }
    } else {
      const recipesOriginalData = await client.db('Data').collection('recipes').find().limit(4).toArray()
      const recipesData: Recipe[] = await JSON.parse(JSON.stringify(recipesOriginalData))
      const userData = await client
        .db('Data')
        .collection('users')
        .findOne({ _id: new ObjectId(post.authorID) })
      const user: User = await JSON.parse(JSON.stringify(userData))
      return {
        props: {
          post: post,
          user: user,
          recipesData: recipesData,
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
