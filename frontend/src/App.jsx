import Navbar from "./components/navbar/Navbar";
import Main from "./components/mainpage/Main";
import Login from "./components/login/Login";
import Register from "./components/login/Register";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/><Register/></>
    },
    {
      path:"/login",
      element:<><Navbar/><Login/></>
    },
    {
      path:"/main",
      element:<><Navbar/><Main/></>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
