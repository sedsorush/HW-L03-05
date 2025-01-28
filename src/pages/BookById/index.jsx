import styles from './bookById.module.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import { ImSpinner2 } from "react-icons/im";
import { useGetBookByIdQuery } from '../../redux/slices/booksApiSlice'
import { useSelector } from 'react-redux';

const BookById = () => {

    const param = useParams()
    const navigate = useNavigate()
    const { data , isLoading , isFetching , isError } = useGetBookByIdQuery(param.id)
    const { token } = useSelector((state)=>state.logReducer)

  

  if(isFetching || isLoading) return <ImSpinner2 className={styles.spinner} />

  if (isError) return <div className={styles.error}>OOPS! Something went wrong and We couldn't access the book list!<br></br>
        <Button variant="bigPrimary" label="Turn back Home?" onClick={()=>navigate("/")}></Button></div>

  return (
    <div className={styles.mainContainer}>
      <div className={styles.bookContainer}>
            <p>Title:<br></br>
              <span>{data?.data?.title}</span>
            </p>
            <p>Author:<br></br>
              <span>{data?.data?.author}</span>
            </p>
            <p>Published Year:<br></br>
              <span>{data?.data?.publicationYear}</span>
            </p>
      </div>

      <div className={styles.buttonContainer}>
        <Button variant={token ? "smallPrimary":"disabledSmallPrimary"} 
          label="EDIT" disable={token ? false:true} 
          onClick={()=>navigate(`/books/${data?.data?._id}/edit`)}
        />
        <Button variant={token ? "smallSecondary":"disabledSmallSecondary"} 
          label="ADD A NEW BOOK" disable={token ? false:true}
          onClick={()=>navigate("/books/add")}
        />
      </div>

      {token ? null
        :<p className={styles.note}>for Editing and Adding new Books You must be <Link to="/login/log">LOGGED IN</Link></p>}
    </div>
  )
}

export default BookById