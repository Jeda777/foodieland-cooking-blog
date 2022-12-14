import Head from 'next/head'
import Image from 'next/image'
import style from '../styles/Home.module.scss'
import {
  handpickedRecipes,
  heroPerson,
  bakedChickenWingsAsianStyleTomatoesSaucePlate,
  paper,
  timer,
  forkKnife,
  play,
  categories,
  ads,
  everyoneCanBeAChefInTheirOwnKitchen,
  posts,
} from '../assets'
import { Category, RecipeCard, InstagramIcon, Inbox } from '../components/index'
import { Recipe } from '../mongodb'
import clientPromise from '../database/mongodb'

type Props = {
  recipesData: Recipe[]
}

const Home: React.FC<Props> = ({ recipesData }) => {
  return (
    <>
      <Head>
        <title>Home - Foodieland.</title>
        <meta name='description' content='Foodieland. cooking blog and recipes app home page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section id={style.hero}>
        <div className={style['info-container']}>
          <div className={style['hot-recipes']}>
            <Image src={paper} alt='paper' />
            <p>Hot Recipes</p>
          </div>
          <div className={style['main-info']}>
            <h1>Spicy delicious chicken wings</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqut enim ad minim{' '}
            </p>
            <div className={style['additional-info']}>
              <div>
                <Image src={timer} alt='timer' />
                <p>30 Minutes</p>
              </div>
              <div>
                <Image src={forkKnife} alt='fork knife' />
                <p>Chicken</p>
              </div>
            </div>
          </div>
          <div className={style.publisher}>
            <div className={style.person}>
              <Image src={heroPerson} alt='person' />
              <div>
                <a>John Smith</a>
                <p>15 March 2022</p>
              </div>
            </div>
            <div className={style['publisher-recipes']}>
              <p>View Recipes</p>
              <Image src={play} alt='play' />
            </div>
          </div>
          <Image className={style.badge} src={handpickedRecipes} alt='handchecked recipes' />
        </div>
        <div className={style['image-container']}>
          <Image src={bakedChickenWingsAsianStyleTomatoesSaucePlate} alt='baked chicken wings asian style tomatoes sauce plate' />
        </div>
      </section>

      <section id={style.categories}>
        <div className={style['title-container']}>
          <h2>Categories</h2>
          <a>View All Categories</a>
        </div>
        <div className={style['categories-container']}>
          {categories.map((i) => (
            <Category key={i.name} name={i.name} image={i.img} />
          ))}
        </div>
      </section>

      <section id={style['recipes-1']}>
        <div className={style['title-container']}>
          <h2>Simple and tasty recipes</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut
            enim ad minim
          </p>
        </div>
        <div className={style['recipes-container']}>
          {recipesData.map((i: Recipe, index) => {
            if (index < 8) {
              return <RecipeCard key={i._id} data={i} type={1} index={index} />
            }
          })}
          <Image className={style.ad} src={ads} alt='ad' />
        </div>
      </section>

      <section id={style.everyone}>
        <div>
          <h2>Everyone can be a chef in their own kitchen</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut
            enim ad minim
          </p>
          <a>Learn More</a>
        </div>
        <Image src={everyoneCanBeAChefInTheirOwnKitchen} alt='chef with dish on plate' />
      </section>

      <section id={style.posts}>
        <div className={style['title-container']}>
          <h2>Check out @foodieland on Instagram</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut
            enim ad minim
          </p>
        </div>
        <div className={style.posts}>
          {posts.map((i, index) => (
            <Image key={index} src={i} alt={`post ${index}`} />
          ))}
        </div>
        <a>
          Visit Our Instagram <InstagramIcon />
        </a>
      </section>

      <section id={style['recipes-2']}>
        <div className={style['title-container']}>
          <h2>Try this delicious recipe to make your day</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut
            enim ad minim
          </p>
        </div>
        <div className={style['recipes-container']}>
          {recipesData.map((i: Recipe, index) => {
            if (index >= 8 && index <= 15) {
              return <RecipeCard key={i._id} data={i} type={2} index={index} />
            }
          })}
        </div>
      </section>

      <Inbox />
    </>
  )
}

export async function getStaticProps() {
  const client = await clientPromise
  const data = await client
    .db('Data')
    .collection('recipes')
    .find({ id: { $lt: 17 } })
    .toArray()
  const recipes: Recipe[] = JSON.parse(JSON.stringify(data))
  return {
    props: { recipesData: recipes },
  }
}

export default Home
