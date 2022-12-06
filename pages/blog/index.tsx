import Head from 'next/head'
import Image from 'next/image'
import Inbox from '../../components/Inbox'
import style from '../../styles/Blog.module.scss'
import { BlogPost, User, Recipe } from '../../mongodb'
import { ads } from '../../assets/index'
import clientPromise from '../../database/mongodb'
import SmallRecipeCard from '../../components/SmallRecipeCard'

type Props = {
  recipesData: Recipe[]
  users: User[]
}

const index: React.FC<Props> = ({ recipesData, users }) => {
  return (
    <>
      <Head>
        <title>Blog - Foodieland.</title>
        <meta name='description' content='Foodieland. cooking blog and recipes app recipes page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header id={style.header}>
        <h1>Blog & Article</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
      </header>

      <section id={style.blog}>
        <div className={style.posts}></div>
        <aside>
          <h2>Other Recipe</h2>
          {recipesData.map((i, index) => (index < 3 ? <SmallRecipeCard recipe={i} /> : null))}
          <Image className={style.ad} src={ads} alt='ad' />
        </aside>
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
  return {
    props: { recipesData: recipesData, users: users },
  }
}

export default index
