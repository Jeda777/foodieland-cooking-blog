import { ObjectId } from 'mongodb'
import { GetServerSideProps } from 'next'
import { Recipe, User } from '../../mongodb'
import clientPromise from '../../database/mongodb'
import Inbox from '../../components/Inbox'
import YouMayLikeTheseRecipesToo from '../../components/YouMayLikeTheseRecipesToo'
import style from '../../styles/RecipeDetails.module.scss'
import Image from 'next/image'
import { timer, forkKnife, printer, share } from '../../assets/index'
import moment from 'moment'

type Props = {
  recipe: Recipe
  user: User
  recipesData: Recipe[]
}

const id: React.FC<Props> = ({ recipe, user, recipesData }) => {
  if (recipe.expand === null) throw new Error('Recipe dont have details')
  return (
    <>
      <section id={style['recipe-details']}>
        <header>
          <div className={style.left}>
            <h1>{recipe.name}</h1>
            <div className={style['additional-info']}>
              <div className={style['user-info']}>
                <Image alt='user photo' unoptimized width='1' height='1' src={user.images.main} />
                <div>
                  <p>John Smith</p>
                  <p>{moment(recipe.expand.date).format('D MMMM YYYY')}</p>
                </div>
              </div>
              <div className={style.time}>
                <Image alt='timer' src={timer} />
                <div>
                  <p>Prep Time</p>
                  <p>{recipe.expand.prepTime} Minutes</p>
                </div>
              </div>
              <div className={style.time}>
                <Image alt='timer' src={timer} />
                <div>
                  <p>Cock Time</p>
                  <p>{recipe.expand.cookTime} Minutes</p>
                </div>
              </div>
              <div className={style.dish}>
                <Image alt='fork and knife' src={forkKnife} />
                <p>{recipe.dish}</p>
              </div>
            </div>
          </div>
          <div className={style.right}>
            <div>
              <button>
                <Image alt='print' src={printer} />
              </button>
              <p>PRINT</p>
            </div>
            <div>
              <button>
                <Image alt='share' src={share} />
              </button>
              <p>SHARE</p>
            </div>
          </div>
        </header>
      </section>
      <Inbox />
      <YouMayLikeTheseRecipesToo recipesData={recipesData} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<{ recipe: Recipe }> = async (context) => {
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
        notFound: true,
      }
    } else {
      const recipesOriginalData = await client.db('Data').collection('recipes').find().limit(4).toArray()
      const recipesData: Recipe[] = await JSON.parse(JSON.stringify(recipesOriginalData))
      const userData = await client
        .db('Data')
        .collection('users')
        .findOne({ _id: new ObjectId(recipe.expand.authorID) })
      const user: User = await JSON.parse(JSON.stringify(userData))
      return {
        props: {
          recipe: recipe,
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
