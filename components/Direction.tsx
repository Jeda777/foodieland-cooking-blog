import style from '../styles/Direction.module.scss'
import Image from 'next/image'
import { done } from '../assets/index'
import { useState } from 'react'

type Props = {
  direction: string[]
  number: number
}

const Direction: React.FC<Props> = ({ direction, number }) => {
  const [active, setActive] = useState(false)
  return (
    <li className={`${style.direction} ${active ? style.active : ''}`}>
      <div className={style.done}>
        <Image alt='done' src={done} />
      </div>
      <button onClick={() => setActive((prev) => !prev)}>
        <h3>
          {number + 1}. {direction[0]}
        </h3>
        {direction.map((i, index) =>
          index === 0 ? null : i.startsWith('data:image/png;base64') ? (
            <Image key={index} src={i} alt='' unoptimized width='1' height='1' />
          ) : (
            <p key={index}>{i}</p>
          ),
        )}
      </button>
    </li>
  )
}

export default Direction
