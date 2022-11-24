import Head from 'next/head'
import Inbox from '../components/Inbox'
import style from '../styles/Recipes.module.scss'

const recipes = () => {
  return (
    <>
      <Head>
        <title>Recipes - Foodieland.</title>
        <meta name='description' content='Foodieland. cooking blog and recipes app recipes page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section id={style.recipes}>
        <header>
          <h1>Recipes</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
        </header>
      </section>

      <Inbox />
    </>
  )
}

export default recipes
