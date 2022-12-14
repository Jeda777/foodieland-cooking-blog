import style from '../styles/Pagination.module.scss'
import Link from 'next/link'

type Props = {
  count: number
  page: number
}

const Pagination: React.FC<Props> = ({ count, page }) => {
  return (
    <div id={style.pagination}>
      {count < 6 ? (
        [...Array(count)].map((i, index) => (
          <Link key={index} href={`?page=${index + 1}`} className={index + 1 === page ? style.active : ''}>
            {index + 1}
          </Link>
        ))
      ) : (
        <BigPagination count={count} page={page} />
      )}
    </div>
  )
}

const BigPagination: React.FC<Props> = ({ count, page }) => {
  return (
    <div id={style.pagination}>
      <Link href={`?page=${1}`}>{'<'}</Link>
      {page < 3 ? (
        <>
          {[...Array(5)].map((i, index) => (
            <Link key={index + 1} href={`?page=${index + 1}`} className={index + 1 === page ? style.active : ''}>
              {index + 1}
            </Link>
          ))}
        </>
      ) : count - page < 2 ? (
        <>
          {[count - 4, count - 3, count - 2, count - 1, count].map((i) => (
            <Link key={i} href={`?page=${i}`} className={i === page ? style.active : ''}>
              {i}
            </Link>
          ))}
        </>
      ) : (
        <>
          {[page - 2, page - 1, page, page + 1, page + 2].map((i) => (
            <Link key={i} href={`?page=${i}`} className={i === page ? style.active : ''}>
              {i}
            </Link>
          ))}
        </>
      )}
      <Link href={`?page=${count}`}>{'>'}</Link>
    </div>
  )
}

export default Pagination
