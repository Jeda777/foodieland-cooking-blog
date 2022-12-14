import Head from 'next/head'
import { Inbox, OtherRecipeAside, PostCard } from '../../components/index'
import style from '../../styles/Blog.module.scss'
import { BlogPost, User, Recipe } from '../../mongodb'
import clientPromise from '../../database/mongodb'

type Props = {
  recipesData: Recipe[]
  users: User[]
  posts: BlogPost[]
}

const index: React.FC<Props> = ({ recipesData, users, posts }) => {
  return (
    <>
      <Head>
        <title>Blog - Foodieland.</title>
        <meta name='description' content='Foodieland. cooking blog and recipes app recipes page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section id={style.blog}>
        <header id={style.header}>
          <h1>Blog & Article</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
        </header>
        <div className={style.container}>
          <div className={style.posts}>
            {posts.map((i) => {
              const user = users.find((u) => u._id === i.authorID)
              return <PostCard key={i._id} user={user} post={i} />
            })}
          </div>
          <OtherRecipeAside recipesData={recipesData} />
        </div>
      </section>

      <Inbox />
    </>
  )
}

export const getStaticProps = async () => {
  const client = await clientPromise
  const recipesOriginalData = await client.db('Data').collection('recipes').find().limit(4).toArray()
  const recipesData: Recipe[] = await JSON.parse(JSON.stringify(recipesOriginalData))
  const userData = await client.db('Data').collection('users').find().toArray()
  const users: User[] = await JSON.parse(JSON.stringify(userData))
  const postsData = await client.db('Data').collection('blogPosts').find().toArray()
  const posts: BlogPost[] = await JSON.parse(JSON.stringify(postsData))
  return {
    props: { recipesData: recipesData, users: users, posts: posts },
  }
}

export default index
