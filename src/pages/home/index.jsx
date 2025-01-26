import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import styles from './home.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { logActions } from '../../redux/slices/logSlice'
import { baseURL } from '../../axios/apiService'

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userInfo , setUserInfo] = useState({})
  const userLogStatus = useSelector((state)=>state.logReducer)

  const getProfile = async() => {
    try {
      const res = await axios
        .get(baseURL+"api/auth/me" , {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token")
          }
        });
        setUserInfo(res.data)
        
    } catch (error) {
      console.log(error);
      
    }  
  }

  useEffect(()=>{
    getProfile()
  },[userLogStatus])

  
  return (
    <div className={styles.mainContainer}>
        <div className={styles.container}>
          <h1>WELOCME TO BOOKSTORE</h1>
          <h2>{sessionStorage.getItem("token")? userInfo?.username:null}</h2>
          <p>{sessionStorage.getItem("token")? `id: ${userInfo?._id}`:null}</p>
        </div>
        <div className={styles.menu}>
            {sessionStorage.getItem("token") ? 
              <Button onClick={()=>{dispatch(logActions.logout());
                navigate("/")}} label="LOGOUT" variant="bigPrimary" />
              :<Button onClick={()=>navigate("/login/log")} label="LOGIN & REGISTER" variant="bigPrimary" />

              }
            <Button onClick={()=>navigate("/books")} label="BOOKS" variant="bigSecondary" />
        </div>
    </div>
  )
}

export default Home