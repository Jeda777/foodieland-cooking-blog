import Head from 'next/head'
import Inbox from '../components/Inbox'
import clientPromise from '../database/mongodb'
import style from '../styles/Recipes.module.scss'
import { Recipe } from '../mongodb'

type Props = {
  recipesData: Recipe[]
}

const recipes: React.FC<Props> = ({ recipesData }) => {
  return (
    <>
      <Head>
        <title>Recipes - Foodieland.</title>
        <meta name='description' content='Foodieland. cooking blog and recipes app recipes page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header id={style.header}>
        <h1>Recipes</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
      </header>

      <section id={style.recipes}></section>

      <Inbox />
    </>
  )
}

export async function getServerSideProps() {
  const client = await clientPromise
  const data = await client.db('Data').collection('recipes').find().toArray()
  const recipes: Recipe[] = JSON.parse(JSON.stringify(data))
  return {
    props: { recipesData: recipes },
  }
}

export default recipes
