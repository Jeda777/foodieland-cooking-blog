import { Inbox, YouMayLikeTheseRecipesToo, InstagramIcon } from '../../components/index'
import { ObjectId } from 'mongodb'
import { GetServerSideProps } from 'next'
import { BlogPost, User, Recipe } from '../../mongodb'
import clientPromise from '../../database/mongodb'
import Image from 'next/image'
import Head from 'next/head'
import style from '../../styles/BlogPost.module.scss'
import moment from 'moment'
import { facebook, twitter } from '../../assets/index'

type Props = {
  recipesData: Recipe[]
  post: BlogPost
  user: User
}

const id: React.FC<Props> = ({ recipesData, post, user }) => {
  if (post.expand === null) throw new Error('Post dont have details')
  return (
    <>
      <Head>
        <title>{`${post.name} - Foodieland.`}</title>
        <meta name='description' content='Foodieland. cooking blog and recipes app recipes page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section id={style.post}>
        <header>
          <h1>{post.name}</h1>
          <div className={style['user-info']}>
            <div>
              <Image alt='user photo' width='1' height='1' src={user.images.main} />
              <p>
                {user.name} {user.surname}
              </p>
            </div>
            <p className={style.date}>{moment(post.date).format('D MMMM YYYY')}</p>
          </div>
          <p className={style.description}>{post.description}</p>
        </header>

        <Image id={style['hero-img']} src={post.expand.images.main} alt='' width='1' height='1' />

        <div id={style.details}>
          <div id={style['details-post']}>
            {post.expand.parts.map((i, index) => (
              <div className={style['post-section']}>
                {i.map((i2, index2) =>
                  index2 === 0 ? (
                    <h2 className={style['post-section-heading']} key={index2}>
                      {i[0]}
                    </h2>
                  ) : i2.startsWith('data:image/png;base64') ? (
                    <Image className={style['post-section-img']} key={index2} src={i2} alt='' width='1' height='1' />
                  ) : i2.startsWith('“') && i2.endsWith('”') ? (
                    <p className={style['post-section-quote']} key={index2}>
                      {i2}
                    </p>
                  ) : (
                    <p className={style['post-section-text']} key={index2}>
                      {i2}
                    </p>
                  ),
                )}
              </div>
            ))}
          </div>
          <div id={style['details-share']}>
            <p>SHARE THIS ON:</p>
            <div>
              <a>
                <Image src={facebook} alt='facebook' />
              </a>
              <a>
                <Image src={twitter} alt='twitter' />
              </a>
              <a>
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

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
