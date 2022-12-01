import Image from 'next/image'
import style from '../styles/SmallRecipeCard.module.scss'
import { Recipe } from '../mongodb'

type Props = {
  recipe: Recipe
}

const SmallRecipeCard: React.FC<Props> = ({ recipe }) => {
  return (
    <a href={`/recipes/${recipe._id}`} className={style['small-recipe-card']}>
      <Image unoptimized src={recipe.images.main} width='1' height='1' alt={recipe.name} />
      <p>{recipe.name}</p>
    </a>
  )
}

export default SmallRecipeCard
