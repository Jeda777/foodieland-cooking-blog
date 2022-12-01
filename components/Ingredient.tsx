import style from '../styles/Ingredient.module.scss'
import { done } from '../assets/index'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
  text: string
}

const Ingredient: React.FC<Props> = ({ text }) => {
  const [active, setActive] = useState(false)
  return (
    <li className={`${style.ingredient} ${active ? style.active : ''}`}>
      <div>
        <Image alt='done' src={done} />
      </div>
      <button onClick={() => setActive((prev) => !prev)}>{text}</button>
    </li>
  )
}

export default Ingredient
