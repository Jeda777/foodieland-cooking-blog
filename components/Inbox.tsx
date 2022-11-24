import style from '../styles/Inbox.module.scss'
import Image from 'next/image'
import { subscribe1, subscribe2 } from '../assets'
import { FormEvent } from 'react'

const Inbox = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <section id={style.inbox}>
      <h2>Deliciousness to your inbox</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetuipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqut enim
        ad minim{' '}
      </p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type='email' placeholder='Your email address...' required />
        <button type='submit'>Subscribe</button>
      </form>
      <Image src={subscribe1} alt='vegetables' />
      <Image src={subscribe2} alt='dish' />
    </section>
  )
}

export default Inbox
