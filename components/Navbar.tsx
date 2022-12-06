import style from '../styles/Navbar.module.scss'
import Image from 'next/image'
import { useState } from 'react'
import { logo, facebook, twitter, close, menu } from '../assets/index'
import InstagramIcon from './InstagramIcon'
import Link from 'next/link'

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
          <Link href='/'>Home</Link>
          <Link href='/recipes'>Recipes</Link>
          <Link href='/blog'>Blog</Link>
          <Link href='/contact'>Contact</Link>
          <Link href='#'>About us</Link>
        </div>
        <div>
          <a>
            <Image src={facebook} alt='facebook' />
          </a>
          <a>
            <Image src={twitter} alt='twitter' />
          </a>
          <a>
            <InstagramIcon />
          </a>
        </div>
      </nav>
      <div className={style['desktop-nav']}>
        <Link href='/'>Home</Link>
        <Link href='/recipes'>Recipes</Link>
        <Link href='/blog'>Blog</Link>
        <Link href='/contact'>Contact</Link>
        <Link href='#'>About us</Link>
      </div>
      <div className={style['desktop-social']}>
        <a>
          <Image src={facebook} alt='facebook' />
        </a>
        <a>
          <Image src={twitter} alt='twitter' />
        </a>
        <a>
          <InstagramIcon />
        </a>
      </div>
    </header>
  )
}

export default Navbar
