import Button from '../../components/Button'
import styles from './BookEditor.module.scss'
import { useForm } from "react-hook-form"
import { useGetBookByIdQuery } from '../../redux/slices/booksApiSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { baseURL } from '../../axios/apiService'
import { ImSpinner2 } from 'react-icons/im'

const BookEditor = () => {

  const param = useParams()
  const navigate = useNavigate()
  const { data , isLoading , isFetching} = useGetBookByIdQuery(param.id)
  const { register , setValue , handleSubmit , watch , formState: {errors}} = useForm()
  

  useEffect(()=>{
    setValue('title' , data?.data?.title)
    setValue('author' , data?.data?.author)
    setValue('published' , data?.data?.publicationYear)
  },[data])

  const putBook = async({title,author,published}) => {
    try {
        const modBook = await axios.put(baseURL+`api/books/${data?.data?._id}`,
          {
            "title": title,
            "author": author,
            "publicationYear": published,
          },
          {
            headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token")
            }
          }
        );
        navigate("/books");
    } catch (error) {
        console.log(error);
    }
  }

  const deleteBook = async(id) => {
    try {
        const delBook = await axios.delete(baseURL+`api/books/${param.id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token")
            }
          }
        );
      navigate("/books")
        
    } catch (error) {
        console.log(error);
        
    }
}

  

  let unChanged = watch('title')===data?.data?.title && watch("author")===data?.data?.author && watch("published")===data?.data?.publicationYear

  if(!sessionStorage.getItem("token")) navigate("/login/log")
  if(isFetching || isLoading) return <ImSpinner2 className={styles.spinner} />
  return (
    <div className={styles.mainContainer}>
      <form className={styles.editorContainer}
        onSubmit={handleSubmit(putBook)}
      >
            <label className={styles.label} htmlFor='title'>Title:
              <input className={styles.input} id='title' 
                {...register('title',{})}
              />
              <p>{}</p>
            </label>
            <label className={styles.label} htmlFor='author'>Author:
              <input className={styles.input} id='author' 
                {...register('author',{})}
              />
              <p>{}</p>
            </label>
            <label className={styles.label} htmlFor='published'>Published Year:
              <input className={styles.input} id='published' 
                {...register('published',{})}
              />
              <p>{}</p>
            </label>
            <Button className={styles.editButton} variant={unChanged ? "disabledSmallPrimary":"smallPrimary"} 
              label="SAVE CHANGES" disable={unChanged ? true:false}
            />
      </form>

      <div className={styles.delButton}>
        <Button variant="smallSecondary" 
          label="DELETE THIS BOOK"
          onClick={()=>deleteBook()}
        />
      </div>

    </div>
  )
}

export default BookEditor