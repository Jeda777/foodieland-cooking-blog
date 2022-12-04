import Head from 'next/head'
import Inbox from '../../components/Inbox'
import style from '../../styles/Recipes.module.scss'
import { Recipe } from '../../mongodb'
import RecipeCard from '../../components/RecipeCard'
import Pagination from '../../components/Pagination'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'

const recipes = () => {
  const router = useRouter()
  const { page } = router.query

  const count = useRef(1)
  const [recipesData, setRecipesData] = useState<null | Recipe[]>(null)
  const [imgData, setImgData] = useState<{ id: number; images: { main: string } }[] | null>(null)

  const fetchRecipes = async () => {
    const recipesDataNoImg = await fetch(`/api/recipes?page=${page || 1}&img=0`).then((res) => res.json())
    count.current = recipesDataNoImg.count
    const recipesNoImg: Recipe[] = []
    recipesDataNoImg.recipes.forEach((i: Recipe) => {
      recipesNoImg.push({
        _id: i._id,
        id: i.id,
        name: i.name,
        time: i.time,
        dish: i.dish,
        expand: null,
        images: {
          main: '',
        },
      })
    })
    setRecipesData(recipesNoImg)
    const imgData = await fetch(`/api/recipes?page=${page || 1}&img=1`).then((res) => res.json())
    setImgData(imgData.recipes)
  }

  useEffect(() => {
    fetchRecipes()
  }, [page])

  const pageCount = Math.floor(count.current / 9) + 1
  const pageNumber = Number(page || 1)
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
        {recipesData !== null
          ? recipesData.map((i: Recipe, index) => {
              let data = i
              if (imgData !== null) data.images = imgData[index].images
              return <RecipeCard key={i._id} data={data} type={3} index={index} />
            })
          : 'loading'}
      </section>

      <Pagination count={pageCount} page={pageNumber} />

      <Inbox />
    </>
  )
}

export default recipes
