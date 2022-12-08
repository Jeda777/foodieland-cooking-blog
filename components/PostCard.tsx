import { BlogPost, User } from '../mongodb'
import Image from 'next/image'
import Link from 'next/link'
import style from '../styles/PostCard.module.scss'
import moment from 'moment'

type Props = {
  post: BlogPost
  user: User | undefined
}

const PostCard: React.FC<Props> = ({ post, user }) => {
  return (
    <article className={style.post}>
      <Image src={post.images.main} width='1' height='1' alt={post.name} />
      <Link href={`/blog/${post._id}`} className={style['post-info']}>
        <h3>{post.name}</h3>
        <p className={style.description}>{post.description}</p>
        {user !== undefined ? (
          <div className={style['author-info']}>
            <div>
              <Image src={user.images.main} width='1' height='1' alt={post.name} />
              <p>
                {user.name} {user.surname}
              </p>
            </div>
            <p>{moment(post.date).format('D MMMM YYYY')}</p>
          </div>
        ) : null}
      </Link>
    </article>
  )
}

export default PostCard
