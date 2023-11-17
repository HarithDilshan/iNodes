// AuthLayout.js
// import React from 'react';
// import { Navigate,Outlet } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const AuthLayout  = () => {
//   const { isConnected, isLoggedIn } = useAuth();
//   console.log(isLoggedIn);
//   return isLoggedIn ? 'hello world'  : <Navigate to="/login" />;
// };

// export default AuthLayout ;



// PrivateRoute.js
// import { Route, Navigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';

// const AuthLayout = ({ component: Component, ...rest }) => {
//   const { isLoggedIn } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isLoggedIn ? <Component {...props} /> : <Navigate to="/login" />
//       }
//     />
//   );
// };

// export default AuthLayout ;
import {
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useAuth } from './AuthContext';

const AuthLayout = ({ redirectPath = '/login' }) => {
  const { isAuthenticated } = useAuth();

  console.log('isAuthenticated', isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  return <Outlet />;
};

export default AuthLayout ;