import style from '../styles/YouMayLikeTheseRecipesToo.module.scss'
import { Recipe } from '../mongodb'
import { RecipeCard } from './index'

type Props = {
  recipesData: Recipe[]
}

const YouMayLikeTheseRecipesToo: React.FC<Props> = ({ recipesData }) => {
  return (
    <section id={style.YouMayLikeTheseRecipesToo}>
      <h2>You may like these recipes too</h2>
      <div className={style['recipes-container']}>
        {recipesData !== undefined
          ? recipesData.map((i: Recipe, index) => {
              return <RecipeCard key={index} type={2} data={i} index={index} />
            })
          : null}
      </div>
    </section>
  )
}

export default YouMayLikeTheseRecipesToo
