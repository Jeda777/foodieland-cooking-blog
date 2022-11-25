import style from '../styles/Pagination.module.scss'

type Props = {
  count: number
  page: number
}

const Pagination: React.FC<Props> = ({ count, page }) => {
  return (
    <div id={style.pagination}>
      {count < 6 ? (
        [...Array(count)].map((i, index) => (
          <a key={index} href={`?page=${index + 1}`} className={index + 1 === page ? style.active : ''}>
            {index + 1}
          </a>
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
      <a href={page !== 1 ? `?page=${1}` : undefined}>{'<'}</a>
      {page < 3 ? (
        <>
          {[...Array(5)].map((i, index) => (
            <a key={index + 1} href={`?page=${index + 1}`} className={index + 1 === page ? style.active : ''}>
              {index + 1}
            </a>
          ))}
        </>
      ) : count - page < 2 ? (
        <>
          {[count - 4, count - 3, count - 2, count - 1, count].map((i) => (
            <a key={i} href={`?page=${i}`} className={i === page ? style.active : ''}>
              {i}
            </a>
          ))}
        </>
      ) : (
        <>
          {[page - 2, page - 1, page, page + 1, page + 2].map((i) => (
            <a key={i} href={`?page=${i}`} className={i === page ? style.active : ''}>
              {i}
            </a>
          ))}
        </>
      )}
      <a href={page !== count ? `?page=${count}` : undefined}>{'>'}</a>
    </div>
  )
}

export default Pagination
