import style from '../styles/Footer.module.scss'
import { logo, facebook, twitter } from '../assets'
import Image from 'next/image'
import InstagramIcon from './InstagramIcon'

const Footer = () => {
  return (
    <footer id={style.footer}>
      <div className={style.upper}>
        <div className={style['logo-container']}>
          <Image src={logo} alt='foodieland.' />
          <p>Lorem ipsum dolor sit amet, consectetuipisicing elit, </p>
        </div>
        <div className={style.nav}>
          <a href='#'>Recipes</a>
          <a href='#'>Blog</a>
          <a href='#'>Contact</a>
          <a href='#'>About us</a>
        </div>
      </div>
      <div className={style.lower}>
        <div className={style.empty}></div>
        <p>
          © 2020 Flowbase. Powered by <span>Webflow</span>
        </p>
        <div className={style.socials}>
          <a href='#'>
            <Image src={facebook} alt='facebook' />
          </a>
          <a href='#'>
            <Image src={twitter} alt='twitter' />
          </a>
          <a href='#'>
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
