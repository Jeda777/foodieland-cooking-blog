import { Recipe } from '../mongodb'
import Image from 'next/image'
import { SmallRecipeCard } from './index'
import style from '../styles/OtherRecipeAside.module.scss'
import { ads } from '../assets'

type Props = {
  recipesData: Recipe[]
}

const OtherRecipeAside: React.FC<Props> = ({ recipesData }) => {
  return (
    <aside id={style.aside}>
      <h2>Other Recipe</h2>
      <div id={style['recipes-container']}>
        {recipesData.map((i, index) => (index < 3 ? <SmallRecipeCard key={index} recipe={i} /> : null))}
      </div>
      <Image className={style.ad} src={ads} alt='ad' />
    </aside>
  )
}

export default OtherRecipeAside
