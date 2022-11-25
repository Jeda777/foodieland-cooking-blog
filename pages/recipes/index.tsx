import Head from 'next/head'
import Inbox from '../../components/Inbox'
import clientPromise from '../../database/mongodb'
import style from '../../styles/Recipes.module.scss'
import { Recipe } from '../../mongodb'
import RecipeCard from '../../components/RecipeCard'
import { GetServerSideProps } from 'next'

type Props = {
  recipesData: Recipe[]
  count: number
}

const recipes: React.FC<Props> = ({ recipesData, count }) => {
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

      <section id={style.recipes}>
        {recipesData.map((i: Recipe, index) => {
          return <RecipeCard key={i._id} data={i} type={3} index={index} />
        })}
      </section>

      <Inbox />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{ recipesData: Recipe[]; count: number }> = async (context) => {
  let { page } = context.query
  if (page === undefined) page = '1'
  const client = await clientPromise
  const count = await client.db('Data').collection('recipes').countDocuments()
  const lt = count + 1 - (Number(page) - 1) * 9
  const gt = lt - 10
  const data = await client
    .db('Data')
    .collection('recipes')
    .find({ id: { $gt: gt, $lt: lt } })
    .sort({ id: -1 })
    .toArray()
  const recipes: Recipe[] = JSON.parse(JSON.stringify(data))
  return {
    props: { recipesData: recipes, count: count },
  }
}

export default recipes
