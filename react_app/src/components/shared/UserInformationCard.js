
function UserInfoCard({user}){
    return(
    <ul className="noBullets">
        <li>Email: {user.email}</li>
        <li>Admission_average: {user.admission_average !== null ? user.admission_average : 'N/A'}</li>
        <li>EN Average: {user.en_average !== null ? user.en_average : 'N/A'}</li>
        <li>Mathematics Grade: {user.mathematics_grade !== null ? user.mathematics_grade : 'N/A'}</li>
        <li>Graduation Grade: {user.graduation_average !== null ? user.graduation_average : 'N/A'}</li>
    </ul>);
}

export default UserInfoCard;