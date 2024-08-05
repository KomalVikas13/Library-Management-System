import { useNavigate } from "react-router-dom"

const Routes_file = ()=>{
    const navigator = useNavigate()
    const navig = (e)=>{
        const {name} = e.target
        switch(name){
            case "library" : {navigator("/")
                                break}
            case "book" : {navigator("/book")
                                break}
            case "student" : {navigator("/student")
                                break}
        }
    }
    return(
        <>
            {/* <div class="container">
                <h1 class="text-center">Library Management System</h1>
            </div> */}
            <div class="shadow p-3 mb-5 bg-body-tertiary rounded">
            <ul className="nav justify-content-center">
                <li className="nav-item fw-bold fs-4">
                <button type="button" class="btn btn-outline-info fw-bold fs-4">
                    <a className="nav-link" href="#" name="library" onClick={navig}>
                        Library Record
                    </a>
                </button>
                </li>
                <li className="nav-item fw-bold fs-4">
                <button type="button" class="btn btn-outline-info fw-bold fs-4">
                    <a className="nav-link" href="#" name="student" onClick={navig}>
                        Student Record
                    </a>
                </button>
                </li>
                <li className="nav-item fw-bold fs-4">
                <button type="button" class="btn btn-outline-info fw-bold fs-4">
                    <a className="nav-link" href="#" name="book" onClick={navig}>
                        Book Record
                    </a>
                </button>
                </li>
            </ul>
            </div>
        </>
    )
}
export default Routes_file
