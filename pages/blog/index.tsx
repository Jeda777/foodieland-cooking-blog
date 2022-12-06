import Head from 'next/head'
import Inbox from '../../components/Inbox'
import style from '../../styles/Blog.module.scss'
import { BlogPost } from '../../mongodb'

const index = () => {
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

      <Inbox />
    </>
  )
}

export default index
