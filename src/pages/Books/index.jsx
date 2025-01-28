import styles from './books.module.scss'
import Item from '../../components/Item'
import { useGetBooksQuery } from '../../redux/slices/booksApiSlice'
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';


const Books = () => {

  const {data , isError , isLoading , isFetching , isSuccess} = useGetBooksQuery()
  const navigate = useNavigate()
  const books = data?.data
  const { token } = useSelector((state)=>state.logReducer)



  return (
    <div className={styles.bookList}>
      {isSuccess ? <div className={styles.header}>
        <h1>BOOKS</h1>{token ? <h3><a onClick={()=>navigate("/books/add")}>Create a new book</a></h3>
          :<h3>You can edit and add new books if You're <Link to='/login/log'>LOGGED IN</Link>.</h3>}
      </div>:null}
      {isFetching||isLoading ? <ImSpinner2 className={styles.spinner}/>:null}
      {isError ? <div className={styles.error}>OOPS! Something went wrong and We couldn't access the book list!<br></br>
        <Button variant="bigPrimary" label="Turn back Home?" onClick={()=>navigate("/")}></Button></div>:null}
      {books?.map((book)=>(
        <Item key={book._id} title={book.title} author={book.author} published={book.publicationYear} onClick={()=>navigate(`/books/${book._id}`)} />
      ))}
    </div>
  )
}

export default Books