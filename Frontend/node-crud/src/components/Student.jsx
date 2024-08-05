import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Student = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        class: "",
        image: null,
        video: null
    });
    const navigator = useNavigate()

    const getStudents = async () => {
        const response = await axios.get('http://localhost:8080/getStudents');
        setStudents(response.data);
        console.log(response.data[0].image.replace(/\\/g, '/'));
    };

    const getFormData = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0]
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const addStudent = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('class', formData.class);
        data.append('image', formData.image);
        data.append('video', formData.video);

        try {
            const response = await axios.post('http://localhost:8080/addStudent', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
        getStudents();
    };
    const updateStudent = async (id)=>{
        navigator(`/updateStudent/${id}`)
    }
    const deleteStudent = async (id)=>{
        try {
            const response = await axios.delete(`http://localhost:8080/deleteStudent/${id}`)
            console.log(response)
            getStudents()
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getStudents();
    }, []);

    return (
        <>
            <div class="container mt-5">
                <h1 class="text-center">Student Records</h1>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-5">
                <form onSubmit={addStudent} className="w-50">
                    <div className="mb-3">
                        <h2 className="text-info">Add students</h2>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Name
                        </label>
                        <input
                            type="text" placeholder="Enter Student name"
                            name="name" value={formData.name} onChange={getFormData}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Class
                        </label>
                        <input
                            type="text" placeholder="Enter Class" name="class" value={formData.class} onChange={getFormData}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Image
                        </label>
                        <input
                            type="file" placeholder="upload image" name="image" accept="image/*" onChange={getFormData} 
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Video
                        </label>
                        <input
                            type="file" placeholder="upload video" accept="video/*" name="video" onChange={getFormData}  
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </form>
            </div>
            {
                (students.length == 0) ? <h4 className="text text-danger text-center mt-5">Student records not found...!</h4> : 
            <div className="mt-5">
                <div className="container text-center border border-dark">
                    <div className="row">
                        <div className="col p-2">Name</div>
                        <div className="col p-2">Class</div>
                        <div className="col p-2">Photo</div>
                        <div className="col p-2">Video</div>
                        <div className="col p-2">Edit</div>
                        <div className="col p-2">Delete</div>
                    </div>
                </div>
                <div>
                    {
                        
                        students.map((element, index) => (
                            <div className="container text-center border border-dark d-flex flex-column align-items-center justify-content-center" key={element.id} style={{ height: '100%' }}>
                            <div className="row w-100">
                                <div className="col d-flex align-items-center justify-content-center">{element.name}</div>
                                <div className="col d-flex align-items-center justify-content-center">{element.class}</div>
                                <div className="col d-flex align-items-center justify-content-center">
                                    <img src={`http://localhost:8080/${element.image.replace(/\\/g, '/')}`} width={100} alt={element.name} />
                                </div>
                                <div className="col d-flex align-items-center justify-content-center">
                                    <video width={200} controls>
                                        <source src={`http://localhost:8080/${element.video.replace(/\\/g, '/')}`} type="video/mp4" />
                                    </video>
                                </div>
                                <div className="col d-flex align-items-center justify-content-center" onClick={()=>updateStudent(element.id)}>
                                    <i className="fa fa-edit"></i>
                                </div>
                                <div className="col d-flex align-items-center justify-content-center" onClick={()=>deleteStudent(element.id)}>
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
    );
};

export default Student;
