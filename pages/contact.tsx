import Inbox from '../components/Inbox'
import YouMayLikeTheseRecipesToo from '../components/YouMayLikeTheseRecipesToo'
import clientPromise from '../database/mongodb'
import { Recipe } from '../mongodb'
import style from '../styles/Contact.module.scss'
import { chef, arrowDown } from '../assets/index'
import Image from 'next/image'

type Props = {
  recipesData: Recipe[]
}

const Contact: React.FC<Props> = ({ recipesData }) => {
  return (
    <>
      <section id={style.contact}>
        <h2>Contact us</h2>
        <div className={style.container}>
          <div className={style['image-container']}>
            <Image src={chef} alt='chef' />
          </div>
          <form action=''>
            <div className={style['form-group']}>
              <label htmlFor='name'>name</label>
              <input type='text' id='name' placeholder='Enter your name...' required />
            </div>
            <div className={style['form-group']}>
              <label htmlFor='email'>email address</label>
              <input type='text' id='email' placeholder='Your email address...' required />
            </div>
            <div className={style['form-group']}>
              <label htmlFor='subject'>subject</label>
              <input type='text' id='subject' placeholder='Enter subject...' required />
            </div>
            <div className={style['form-group']}>
              <label htmlFor='enquiry'>enquiry type</label>
              <select name='enquiry' id='enquiry' required style={{ backgroundImage: `url('${arrowDown.src}')` }}>
                <option value='advertising'>Advertising</option>
                <option value='recipe'>Recipe</option>
              </select>
            </div>
            <div className={`${style['form-group']} ${style['textfield']}`}>
              <label htmlFor='message'>message</label>
              <textarea name='message' id='message' rows={8} placeholder='Enter your message...' required></textarea>
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      </section>
      <Inbox />
      <YouMayLikeTheseRecipesToo recipesData={recipesData} />
    </>
  )
}

export const getStaticProps = async () => {
  const client = await clientPromise
  const recipesOriginalData = await client.db('Data').collection('recipes').find().limit(4).toArray()
  const recipesData: Recipe[] = await JSON.parse(JSON.stringify(recipesOriginalData))
  return {
    props: {
      recipesData: recipesData,
    },
  }
}

export default Contact
