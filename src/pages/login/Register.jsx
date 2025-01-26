import styles from './login.module.scss'
import Button from '../../components/Button'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { LuEye , LuEyeClosed  } from "react-icons/lu";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logActions } from '../../redux/slices/logSlice';
import { baseURL } from '../../axios/apiService';


const Register = () => {
    const [togglePass, setTogglePass] = useState(false);
    const [toggleRePass, setToggleRePass] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register , handleSubmit , formState: {errors} , getValues} = useForm()

    const sendRegForm = async (values) => {
    try {
        const res = await axios.post(baseURL+"api/auth/register",{
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
        <form className={styles.form} onSubmit={handleSubmit(sendRegForm)} >
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
                  <label className={styles.label} htmlFor="repassword">RE-ENTER PASSWORD
                  <input className={styles.input} placeholder="Enter your Password again" type={toggleRePass ? 'text':'password'} id="repassword"
                    {...register("repassword" , {required:true , validate: (value) => value === getValues("password")})}
                  />{toggleRePass ? <LuEye className={styles.eye} onClick={()=>setToggleRePass(!toggleRePass)} />:
                        <LuEyeClosed className={styles.eye} onClick={()=>setToggleRePass(!toggleRePass)} />}
                    <p className={styles.error}>{errors?.repassword?.type === "required" ? "Field can not be empty":""}</p>
                    <p className={styles.error}>{errors?.repassword?.type === "validate" ? "Passwords do not match":""}</p>
                  </label>
            </div>
            <Button variant="bigSecondary" label="REGISTER"  />
        </form >
      )
}

export default Register