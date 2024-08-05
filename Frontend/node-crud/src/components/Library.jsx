import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Library = ()=>{
    const [students,setStudents] = useState([])
    const [books,setBooks] = useState([])
    const [library,setLibrary] = useState([]) 
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
        const library_response = await axios.get("http://localhost:8080/getLibrary")
        setStudents(student_response.data)
        setBooks(books_response.data)
        setLibrary(library_response.data)
        console.log(student_response.data)
        console.log(books_response.data)
        console.log(library_response.data)
    }
    const addLibrary = async ()=>{
        try {
            const response = await axios.post(`http://localhost:8080/addLibrary`,formData)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        
    }
    const updateLibrary = (id)=>{
        navigator(`/updateLibray/${id}`)
    }
    const deleteLibrary = async (id)=>{
        try {
            const response = await axios.delete(`http://localhost:8080/deleteLibrary/${id}`)
            console.log(response)   
        } catch (error) {
            console.log(error)
        }
        get_students_books()
    }
    useEffect(()=>{
        get_students_books()
    },[])
    const getFormData = (e)=>{
        const {name,value} = e.target
        setFormData((prevData => ({
            ...prevData,
            [name] : value,
        })))
    }
    return(
        <>
            <div class="container mt-5">
                <h1 class="text-center">Library Records</h1>
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
                            type="date" value={formData.startDate} name="startDate" onChange={getFormData}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            End Date
                        </label>
                        <input
                            type="date" value={formData.endDate} name="endDate" onChange={getFormData}
                            className="form-control"
                        />
                    </div>
                    <button onClick={addLibrary} className="btn btn-primary">
                        Save
                    </button>
                </form>
                
            </div>
            {/* <div>
                <div>
                    <div>Name</div>
                    <div>Author</div>
                    <div>Publication</div>
                    <div>Year</div>
                </div>
                <div>
                    {
                        library.map((element,index)=>{
                            return(
                                <div key={index}>
                                {
                                    (!element.Student || !element.Book) ? (
                                        deleteLibrary(element.id)
                                    ) : (
                                        <>
                                            <div>{element.Student.name}</div>
                                            <div>{element.Book.name}</div>
                                            <div>{(element.startDate).slice(0, 10)}</div>
                                            <div>{(element.endDate).slice(0, 10)}</div>
                                            <div onClick={() => updateLibrary(element.id)} style={{ cursor: 'pointer', color: 'blue' }}>Edit</div>
                                            <div onClick={() => deleteLibrary(element.id)} style={{ cursor: 'pointer', color: 'red' }}>Delete</div>
                                        </>
                                    )
                                }
                            </div>
                            )
                        })
                    }
                </div>
            </div> */}
            {
                (library.length == 0) ? <h4 className="text text-danger text-center mt-5">Library records not found...!</h4> :
            <div className="mt-5">
                <div className="container text-center border border-dark">
                    <div className="row">
                        <div className="col p-2">Name</div>
                        <div className="col p-2">Author</div>
                        <div className="col p-2">Publication</div>
                        <div className="col p-2">Date</div>
                        <div className="col p-2">Edit</div>
                        <div className="col p-2">Delete</div>
                    </div>
                </div>
                <div>
                    {library.map((element) => (
                        <>
                        {
                            (library.StudentId == null || library.BookId) ? deleteLibrary(library.id) :
                        
                        <div
                            key={element.id}
                            className="container text-center border border-dark d-flex flex-column align-items-center justify-content-center mt-2"
                            style={{ height: '100%' }}
                        >
                            <div className="row w-100">
                                <div className="col d-flex align-items-center justify-content-center">
                                    {element.Student ? element.Student.name : 'N/A'}
                                </div>
                                <div className="col d-flex align-items-center justify-content-center">
                                    {element.Book ? element.Book.name : 'N/A'}
                                </div>
                                <div className="col d-flex align-items-center justify-content-center">
                                    {element.startDate ? element.startDate.slice(0, 10) : 'N/A'}
                                </div>
                                <div className="col d-flex align-items-center justify-content-center">
                                    {element.endDate ? element.endDate.slice(0, 10) : 'N/A'}
                                </div>
                                <div
                                    className="col d-flex align-items-center justify-content-center"
                                    onClick={() => updateLibrary(element.id)}
                                    // style={{ cursor: 'pointer', color: 'blue' }}
                                >
                                    <i className="fa fa-edit"></i>
                                </div>
                                <div
                                    className="col d-flex align-items-center justify-content-center"
                                    onClick={() => deleteLibrary(element.id)}
                                    // style={{ cursor: 'pointer', color: 'red' }}
                                >
                                    <i className="fa fa-trash"></i>
                                </div>
                            </div>
                        </div>
                        }
                        </>
                    ))}
                </div>
            </div>
        }
        </>
    )
}
export default Library