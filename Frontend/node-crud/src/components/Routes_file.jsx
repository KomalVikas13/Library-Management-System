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
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <a className="nav-link" href="#" name="library" onClick={navig}>
                    Library Records
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" name="student" onClick={navig}>
                    Student Records
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" name="book" onClick={navig}>
                    Books Records
                    </a>
                </li>
            </ul>

        </>
    )
}
export default Routes_file