import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BookUpdate = () => {
    const { data } = useParams();
    const navigator = useNavigate()
    console.log(data)
    const [book, setBook] = useState({
        name: '',
        author: '',
        publication: '',
        date: ''
    });
    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getBookById/${data}`);
            setBook(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (data) {
            getData();
        }
    }, [data]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prevBook => ({
            ...prevBook,
            [name]: value
        }));
    };
    const updateData = async(e)=>{
        e.preventDefault()
        try {
            const response = await axios.put(`http://localhost:8080/updateBook/${data}`,book)
            navigator("/book")
        } catch (error) {
            console.log(error)
        }   
    }

    return (
        <>
            
            <div class="container mt-5">
                <h1 class="text-center">Student Records</h1>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-5">
                <form onSubmit={updateData} className="w-50">
                    <div className="mb-3">
                        <h2 className="text-info">Update book</h2>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={book.name}
                            onChange={handleChange}
                            placeholder="Enter Book name"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Author
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={book.author}
                            onChange={handleChange}
                            placeholder="Enter Author name"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Publication
                        </label>
                        <input
                            type="text"
                            name="publication"
                            value={book.publication}
                            onChange={handleChange}
                            placeholder="Enter publication"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Date of Publication
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={book.date ? book.date.slice(0, 10) : ''} // Adjusting date format
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" onClick={updateData} className="btn btn-primary">
                        Save
                    </button>
                </form>
                
            </div>
    
        </>
    );
};

export default BookUpdate;
