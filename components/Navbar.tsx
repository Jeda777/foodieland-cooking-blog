import style from '../styles/Navbar.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import { logo, facebook, twitter, instagram, close, menu } from '../assets/index'

const Navbar = () => {
  const [opened, setOpened] = useState(false)

  return (
    <header id={style.navbar}>
      <button onClick={() => setOpened((prev) => !prev)}>
        <Image src={opened ? close : menu} alt='open/close menu' />
      </button>
      <Image src={logo} alt='foodieland.' />
      <nav className={`${opened ? style.active : ''} ${style['mobile-nav']}`}>
        <div>
          <a href='#'>Home</a>
          <a href='#'>Recipes</a>
          <a href='#'>Blog</a>
          <a href='#'>Contact</a>
          <a href='#'>About us</a>
        </div>
        <div>
          <a href='#'>
            <Image src={facebook} alt='facebook' />
          </a>
          <a href='#'>
            <Image src={twitter} alt='twitter' />
          </a>
          <a href='#'>
            <Image src={instagram} alt='instagram' />
          </a>
        </div>
      </nav>
      <div className={style['desktop-nav']}>
        <a href='#'>Home</a>
        <a href='#'>Recipes</a>
        <a href='#'>Blog</a>
        <a href='#'>Contact</a>
        <a href='#'>About us</a>
      </div>
      <div className={style['desktop-social']}>
        <a href='#'>
          <Image src={facebook} alt='facebook' />
        </a>
        <a href='#'>
          <Image src={twitter} alt='twitter' />
        </a>
        <a href='#'>
          <Image src={instagram} alt='instagram' />
        </a>
      </div>
    </header>
  )
}

export default Navbar
