import NavBar from "../components/NavBar";
import UserInfoCard from "../components/UserInformationCard";


function  Home(){
    const current_user = JSON.parse(localStorage.getItem('user'))
    return(
        <>
        <NavBar />
        <h2>Home Page</h2>
        <button className="btn btn-primary">Click Me</button>
        { current_user && <UserInfoCard user= {current_user}/>}
        { localStorage.getItem('jwt')}
        </>
    )
}

export default Home;