import style from '../styles/Pagination.module.scss'

type Props = {
  count: number
  page: number
}

const Pagination: React.FC<Props> = ({ count, page }) => {
  console.log(page)
  return (
    <div id={style.pagination}>
      {count < 6
        ? [...Array(count)].map((i, index) => (
            <a key={index} href={`?page=${index + 1}`} className={index + 1 === page ? style.active : ''}>
              {index + 1}
            </a>
          ))
        : ''}
    </div>
  )
}

export default Pagination
