import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const StudentUpdate = () => {
    const { data } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        name: '',
        class: '',
        image: null,
        video: null
    });

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getStudentById/${data}`);
            setStudent(response.data);
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
        const { name, value, files } = e.target;
        if (files) {
            setStudent((prevData) => ({
                ...prevData,
                [name]: files[0] // Store the file object
            }));
        } else {
            setStudent((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };
    

    const updateData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', student.name);
        formData.append('class', student.class);
        if (student.image) formData.append('image', student.image);
        if (student.video) formData.append('video', student.video);
    
        try {
            const response = await axios.put(`http://localhost:8080/updateStudent/${data}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);  // Check the response data
            navigate("/student");
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
        }
    };
    
    return (
        <>
            
            <div className="d-flex justify-content-center align-items-center mt-5">
                <form onSubmit={updateData} className="w-50">
                    <div className="mb-3">
                        <h2 className="text-info">Update students</h2>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Student name"
                            name="name"
                            value={student.name}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Class
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Class"
                            name="class"
                            value={student.class}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Image
                        </label>
                        <input
                            type="file"
                            placeholder="upload image"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="form-control"
                        />
                        {student.image && typeof student.image === 'string' && (
                            <img
                                src={`http://localhost:8080/${student.image.replace(/\\/g, '/')}`}
                                width={100}
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Video
                        </label>
                        <input
                            type="file"
                            placeholder="upload video"
                            accept="video/*"
                            name="video"
                            onChange={handleChange}
                            className="form-control"
                        />
                        
                        {student.video && typeof student.video === 'string' && (
                            <video width={500} controls>
                                <source
                                    src={`http://localhost:8080/${student.video.replace(/\\/g, '/')}`}
                                    type="video/mp4"
                                />
                            </video>
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </form>
                
            </div>
        </>
    );
};

export default StudentUpdate;
