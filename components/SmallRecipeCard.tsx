import Image from 'next/image'
import style from '../styles/SmallRecipeCard.module.scss'
import { Recipe } from '../mongodb'
import Link from 'next/link'

type Props = {
  recipe: Recipe
}

const SmallRecipeCard: React.FC<Props> = ({ recipe }) => {
  return (
    <Link href={`/recipes/${recipe._id}`} className={style['small-recipe-card']}>
      <Image src={recipe.images.main} width='1' height='1' alt={recipe.name} />
      <p>{recipe.name}</p>
    </Link>
  )
}

export default SmallRecipeCard
