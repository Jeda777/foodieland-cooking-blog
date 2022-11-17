import style from '../styles/Category.module.scss'
import { StaticImageData } from 'next/image'
import Image from 'next/image'

type props = {
  name: string
  image: StaticImageData
}

const Category: React.FC<props> = ({ name, image }) => {
  return (
    <a className={`${style.category} ${style[`${name}`]}`}>
      <Image src={image} alt={name} />
      <p>{name}</p>
    </a>
  )
}

export default Category
