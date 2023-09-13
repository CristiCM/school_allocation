import NavBar from "../../components/shared/NavBar";
import LoginForm from "../../components/shared/LoginForm";

function  Login(){
    return(
        <>
        <NavBar />
        <div className="fullPageContainer">
            < LoginForm />
        </div>
        
        </>
    )
}

export default Login;