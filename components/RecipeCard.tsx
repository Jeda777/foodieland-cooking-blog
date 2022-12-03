import { Recipe } from '../mongodb'
import style from '../styles/RecipeCard.module.scss'
import { timer, forkKnife } from '../assets/index'
import Image from 'next/image'
import Heart from './Heart'
import { useState } from 'react'
import Link from 'next/link'

type Props = {
  type: number
  data: Recipe
  index: number
}

const RecipeCard: React.FC<Props> = ({ type, data, index }) => {
  const [liked, setLiked] = useState(false)
  return (
    <div className={`${style['recipe-card']} ${type == 1 ? style[`o-${index}`] : ''}`} data-type={type}>
      <div className={style['img-container']}>
        <Image unoptimized src={data.images.main} width='1' height='1' alt={data.name} />
        <Heart type={type} liked={liked} setLiked={setLiked} />
      </div>
      <Link href={`/recipes/${data._id}`} className={style['text-container']}>
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
      </Link>
    </div>
  )
}

export default RecipeCard
