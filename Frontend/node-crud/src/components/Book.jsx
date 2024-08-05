import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Book = ()=>{
    const [books,setBooks] = useState([])
    const [formData,setFormData] = useState({
        name : '',
        author : '',
        publication : '',
        date : ''
    })
    const navigator = useNavigate();

    const addData = (e)=>{
        const {name,value} = e.target
        setFormData((prevState)=>({
            ...prevState,
            [name] : value,
        }))
    }

    const submitForm = async (e)=>{
        e.preventDefault()
        try{
            const data = await axios.post("http://localhost:8080/addBook",formData)
            console.log(data);
            getData();
        }catch(error){
            console.log(error)
        }
    }

    const getData = async ()=>{
        try {
            const response = await axios.get("http://localhost:8080/getBooks")
            console.log(response.data);
            setBooks(()=>response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const updateData = (id)=>{
        navigator(`/update/${id}`)
    }
    const deleteData = async (id)=>{
        try {
            const count = await axios.delete(`http://localhost:8080/deleteBook/${id}`)
            if(count != 0){
                getData()
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getData()
    },[])
    return(
        <>
            <div class="container mt-5">
                <h1 class="text-center">Books Records</h1>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-5">
                <form onSubmit={updateData} className="w-50">
                    <div className="mb-3">
                        <h2 className="text-info">Add book</h2>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Name
                        </label>
                        <input
                            type="text" name="name" value={formData.name} placeholder="Enter Book name" onChange={addData}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Author
                        </label>
                        <input
                            type="text" name="author" value={formData.author} placeholder="Enter Author name" onChange={addData}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Publication
                        </label>
                        <input
                            type="text" name="publication" value={formData.publication} placeholder="Enter publication" onChange={addData}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Date of Publication
                        </label>
                        <input
                            type="date" name="date" value={formData.date} onChange={addData}
                            className="form-control"
                        />
                    </div>
                    <button onClick={submitForm} className="btn btn-primary">
                        Save
                    </button>
                </form>
                
            </div>
            {
                books.length == 0  ? <h4 className="text text-danger text-center mt-5">Books records not found...!</h4>  :
            
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
                    {
                        books.map((element, index) => (
                            <div className="container text-center border border-dark d-flex flex-column align-items-center justify-content-center" key={element.id} style={{ height: '100%' }}>
                            <div className="row w-100">
                                <div className="col d-flex align-items-center justify-content-center">{element.name}</div>
                                <div className="col d-flex align-items-center justify-content-center">{element.author}</div>
                                <div className="col d-flex align-items-center justify-content-center">{element.publication}</div>
                                <div className="col d-flex align-items-center justify-content-center">{element.date.slice(0,10)}</div>
                                <div className="col d-flex align-items-center justify-content-center" onClick={()=>updateData((element.id))}>
                                    <i className="fa fa-edit"></i>
                                </div>
                                <div className="col d-flex align-items-center justify-content-center" onClick={()=>deleteData(element.id)}>
                                    <i className="fa fa-trash"></i>
                                </div>
                            </div>
                        </div>
                        
                        ))
                    }
                </div>
            </div>
            }
        </>
    )
}
export default Book;