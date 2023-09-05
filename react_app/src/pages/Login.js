import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";

function  Login(){
    return(
        <>
        <NavBar />
        <h2>Login</h2>
        < LoginForm />
        </>
    )
}

export default Login;




// 1. React Context API:
// The Context API is a feature of React that allows you to create global state without having to pass props down manually at every level.

// Usage:

// Create a context.
// Provide the context at a high level in your component tree.
// Consume the context where needed.
// For your use case, you might create a UserContext that holds the user's data, and then you can consume this context wherever you need it.

// jsx
// Copy code
// import React, { createContext, useContext, useState } from 'react';

// const UserContext = createContext();

// export const useUser = () => {
//     return useContext(UserContext);
// };

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);

//     const value = {
//         user,
//         setUser
//     };

//     return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// };
// Then, wrap your app (or part of it) with the UserProvider:

// jsx
// Copy code
// import { UserProvider } from './UserContext';

// function App() {
//     return (
//         <UserProvider>
//             {/* rest of your app */}
//         </UserProvider>
//     );
// }
// Anywhere in your app, you can then use the useUser hook to get or set the user:

// jsx
// Copy code
// import { useUser } from './UserContext';

// function SomeComponent() {
//     const { user, setUser } = useUser();
    
//     // ...
// }




// 3. LocalStorage or SessionStorage:
// For persistence across page reloads, you can use the Web Storage API. If you decide to store the user data in localStorage, for example, it will still be there even if the user refreshes the page. However, this method is synchronous and has storage limits, so it's best for smaller amounts of data.

// javascript
// Copy code
// // To store user data:
// localStorage.setItem('user', JSON.stringify(user));

// // To retrieve user data:
// const storedUser = JSON.parse(localStorage.getItem('user'));




