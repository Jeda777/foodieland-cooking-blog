import { Recipe } from '../mongodb'
import style from '../styles/RecipeCard.module.scss'
import { bigAndJuicyWagyuBeefCheeseburger, timer, forkKnife } from '../assets/index'
import Image from 'next/image'

type Props = {
  type: number
  data: Recipe
  index: number
}

const RecipeCard: React.FC<Props> = ({ type, data, index }) => {
  console.log(index)
  return (
    <div className={`${style['recipe-card']} ${style[`o-${index}`]}`} data-type={type}>
      <div className={style['img-container']}>
        <Image src={bigAndJuicyWagyuBeefCheeseburger} alt='fd' />
      </div>
      <div className={style['text-container']}>
        <h6>{data.name}</h6>
        <div>
          <div>
            <Image src={timer} alt='timer' />
            <p>{data.time} Minutes</p>
          </div>
          <div>
            <Image src={forkKnife} alt='fork knife' />
            <p>{data.dish}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
