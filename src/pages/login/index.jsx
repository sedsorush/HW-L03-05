import styles from './login.module.scss'
import {Link, Outlet} from "react-router-dom"

const Header = () => {
  return (
    <div className={styles.formContainer}>
        <h1><Link to="/login/log">LOGIN</Link> <span>or</span> <Link to="/login/reg">REGISTER</Link></h1>
        <Outlet />
    </div>
  )
}

export default Header