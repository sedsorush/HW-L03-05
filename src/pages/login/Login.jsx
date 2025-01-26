import styles from './login.module.scss'
import Button from '../../components/Button'
import {useForm} from "react-hook-form"
import axios from 'axios'
import { useState } from 'react'
import { LuEye , LuEyeClosed  } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux'
import { logActions } from '../../redux/slices/logSlice'
import { useNavigate } from 'react-router-dom'
import { baseURL } from '../../axios/apiService'

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [togglePass, setTogglePass] = useState(false);

  const { register , handleSubmit , formState: { errors } } = useForm()

  const sendLogForm = async (values) => {
  try {
      const res = await axios.post(baseURL+"api/auth/login",{
        username: values.username,
        password: values.password
      })
      
      dispatch(logActions.login(res.data.token));
      navigate("/");

    } catch (error) {
      console.log(error.status , error.message)
    }
  }
  
  return (
    <div>
        <form className={styles.form} onSubmit={handleSubmit(sendLogForm)} >
            <div className={styles.inputContainer}>
                  <label className={styles.label} htmlFor="username">USERNAME
                  <input className={styles.input} placeholder="Enter your Username" id="username"
                    {...register("username" , {required:true , minLength:4})}
                  /><p className={styles.error}>{errors?.username?.type === "minLength" ? "Not long enough":""}</p>
                    <p className={styles.error}>{errors?.username?.type === "required" ? "Field can not be empty":""}</p>
                  </label>
                  <label className={styles.label} htmlFor="password">PASSWORD
                  <input className={styles.input} placeholder="Enter your Password" type={togglePass ? 'text':'password'} id="password"
                    {...register("password" , {required:true , minLength:8})}
                  />{togglePass ? <LuEye className={styles.eye} onClick={()=>setTogglePass(!togglePass)} />:
                      <LuEyeClosed className={styles.eye} onClick={()=>setTogglePass(!togglePass)} />}
                    <p className={styles.error}>{errors?.password?.type === "minLength" ? "Not long enough":""}</p>
                    <p className={styles.error}>{errors?.password?.type === "required" ? "Field can not be empty":""}</p>
                  </label>
            </div>
        <Button variant="bigPrimary" label="LOGIN"  />
        </form >
    </div>
  )
}

export default Login