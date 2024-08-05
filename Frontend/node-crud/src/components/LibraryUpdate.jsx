import { useEffect,useState } from "react"
import { useParams,useNavigate } from "react-router-dom"
import axios from "axios"

const LibraryUpdate = ()=>{
    const {id} = useParams()
    const [students,setStudents] = useState([])
    const [books,setBooks] = useState([]) 
    const [formData,setFormData] = useState({
        StudentId : '',
        BookId : '',
        startDate : '',
        endDate : ''
    })
    const navigator = useNavigate()
    const get_students_books = async()=>{
        const student_response = await axios.get('http://localhost:8080/getStudents');
        const books_response = await axios.get("http://localhost:8080/getBooks");
        const library_response = await axios.get(`http://localhost:8080/getLibraryById/${id}`)
        setStudents(student_response.data)
        setBooks(books_response.data)
        setFormData(library_response.data)
        console.log(student_response.data)
        console.log(books_response.data)
        console.log(library_response.data)
    }
    const getFormData = (e)=>{
        const {name,value} = e.target
        setFormData((prevData => ({
            ...prevData,
            [name] : value,
        })))
    }
    const addLibrary = async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:8080/updateLibrary/${id}`,formData)
            console.log(response)
            navigator("/")
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        get_students_books()
    },[])
    return(
        <>
            {/* <form>
                <label>Student Name</label>
                <select value={formData.StudentId} name="StudentId" onChange={getFormData}>
                    <option>Select</option>
                    {
                        students.map((element,index)=>{
                            return(
                                <>
                                    <option value={element.id}>{element.name}</option>
                                </>
                            )
                        })
                    }
                </select><br/><br/>
                <label>Book Name</label>
                <select value={formData.BookId} name="BookId" onChange={getFormData}>
                    <option>Select</option>
                    {
                        books.map((element,index)=>{
                            return(
                                <>
                                    <option value={element.id}>{element.name}</option>
                                </>
                            )
                        })
                    }
                </select><br/><br/>
                <label>Start date</label>
                <input type="date" value={(formData.startDate).slice(0,10)} name="startDate" onChange={getFormData}/><br/><br/>
                <label>End date</label>
                <input type="date" value={(formData.endDate).slice(0,10)} name="endDate" onChange={getFormData}/><br/><br/>
                <button onClick={addLibrary}>Save</button>
                <button>Cancel</button> 
                </form>*/}
                <div class="container mt-5">
                <h1 class="text-center">Student Records</h1>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-5">
                <form className="w-50">
                    <div className="mb-3">
                        <h2 className="text-info">Add record</h2>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Students
                        </label>
                        <select value={formData.StudentId} name="StudentId" onChange={getFormData}>
                            <option>Select</option>
                            {
                                students.map((element,index)=>{
                                    return(
                                        <>
                                            <option value={element.id}>{element.name}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Books
                        </label>
                        <select value={formData.BookId} name="BookId" onChange={getFormData}>
                            <option>Select</option>
                            {
                                books.map((element,index)=>{
                                    return(
                                        <>
                                            <option value={element.id}>{element.name}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Start Date
                        </label>
                        <input
                            type="date" value={formData.startDate.slice(0,10)} name="startDate" onChange={getFormData}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            End Date
                        </label>
                        <input
                            type="date" value={formData.endDate.slice(0,10)} name="endDate" onChange={getFormData}
                            className="form-control"
                        />
                    </div>
                    <button onClick={addLibrary} className="btn btn-primary">
                        Save
                    </button>
                </form>
                
            </div>
        </>
    )
}
export default LibraryUpdate