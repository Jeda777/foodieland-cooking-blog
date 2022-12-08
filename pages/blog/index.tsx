import Head from 'next/head'
import Image from 'next/image'
import Inbox from '../../components/Inbox'
import style from '../../styles/Blog.module.scss'
import { BlogPost, User, Recipe } from '../../mongodb'
import { ads } from '../../assets/index'
import clientPromise from '../../database/mongodb'
import SmallRecipeCard from '../../components/SmallRecipeCard'
import PostCard from '../../components/PostCard'

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
          <aside>
            <h2>Other Recipe</h2>
            {recipesData.map((i, index) => (index < 3 ? <SmallRecipeCard key={index} recipe={i} /> : null))}
            <Image className={style.ad} src={ads} alt='ad' />
          </aside>
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
