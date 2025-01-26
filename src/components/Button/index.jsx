import styles from './button.module.scss'

const Button = ({onClick , label , variant , disable}) => {
    
  return (
    <button className={`${styles.btn} ${styles[variant]}`} onClick={onClick} disabled={disable} >{label}</button>
  )
}

export default Button