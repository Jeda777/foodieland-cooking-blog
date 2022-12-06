import style from '../styles/Footer.module.scss'
import { logo, facebook, twitter } from '../assets'
import Image from 'next/image'
import InstagramIcon from './InstagramIcon'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer id={style.footer}>
      <div className={style.upper}>
        <div className={style['logo-container']}>
          <Image src={logo} alt='foodieland.' />
          <p>Lorem ipsum dolor sit amet, consectetuipisicing elit, </p>
        </div>
        <div className={style.nav}>
          <Link href='/recipes'>Recipes</Link>
          <Link href='/blog'>Blog</Link>
          <Link href='/contact'>Contact</Link>
          <Link href='#'>About us</Link>
        </div>
      </div>
      <div className={style.lower}>
        <div className={style.empty}></div>
        <p>
          © 2020 Flowbase. Powered by <span>Webflow</span>
        </p>
        <div className={style.socials}>
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
      </div>
    </footer>
  )
}

export default Footer
