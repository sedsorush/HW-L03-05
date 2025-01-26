import styles from './item.module.scss'

const Item = ({title,author,published,onClick}) => {
  return (
    <div className={styles.book} onClick={onClick}>
        <h1>{title}</h1>
        <div>
          <h2>{author}</h2>
          <p>{published}</p>
        </div>
    </div>
  )
}

export default Item