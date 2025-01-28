import { useNavigate, useParams } from 'react-router-dom'
import styles from './BookAdder.module.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import Button from '../../components/Button'
import { useEffect } from 'react'
import { baseURL } from '../../axios/apiService'
import axios from 'axios'
import * as Yup from "yup"
import { useSelector } from 'react-redux'


const BookAdder = () => {

  const navigate = useNavigate()
  const { token } = useSelector((state)=>state.logReducer)

  const validationSchema = Yup.object({
    title: Yup.string().required().min(4),
    author: Yup.string(),
    published: Yup.number().lessThan((new Date()).getFullYear())
  })
  const { register , handleSubmit , setValue , watch , formState: {errors}} = useForm( {resolver: yupResolver(validationSchema) } )

  const postBook = async({title , author , published , isbn}) => {
    try {
        const newBook = await axios.post(baseURL + "api/books",
          {
            "title": title,
            "author": author,
            "publicationYear": published,
            "isbn": isbn || Math.round((Math.random()*10000))
            ,
          },
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );
        navigate("/books")

    } catch (error) {
        console.log(error);
        
    }
}

    useEffect(()=>{
      setValue('title' , "")
      setValue('author' , "")
      setValue('published' , "")
    },[])

    console.log(errors);
    
  let unChanged = watch('title')==="" && watch("author")==="" && watch("published")===""  

  if(!token) navigate("/login/log")
  return (
    <div className={styles.mainContainer}>
      <form className={styles.editorContainer}
        onSubmit={handleSubmit(postBook)}
      >
            <label className={styles.label} htmlFor='title'>Title:
              <input className={styles.input} id='title' 
                {...register('title',{required:true})}
              />
              <p className={styles.error}>{errors?.title?.type === "required" ? "Title can't be Empty":null}</p>
            </label>
            <label className={styles.label} htmlFor='author'>Author:
              <input className={styles.input} id='author' 
                {...register('author',{})}
              />
            </label>
            <label className={styles.label} htmlFor='published'>Published Year:
              <input className={styles.input} id='published' 
                {...register('published',{})}
              />
              <p className={styles.error}>{errors?.published?.type === "max" ? "Enter the Year, the Book has been published":null}</p>
              <p className={styles.error}>{errors?.published?.type === "typeError" ? "Enter the Book's publication Year, as a number ":null}</p>
            </label>
            <label className={styles.label} htmlFor='isbn'>ISBN:
              <input className={styles.input} id='isbn' 
                {...register('isbn',{})}
              />
            </label>
            <Button className={styles.editButton} variant={unChanged ? "disabledBigPrimary":"bigPrimary"} 
              label="ADD BOOK" disable={unChanged ? true:false}
            />
      </form>
    </div>
  )
}

export default BookAdder