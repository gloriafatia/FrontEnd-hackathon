import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate, // Import Navigate
} from "react-router-dom";
import Home from "./page/Home";
import Catalog from "./page/Catalog";
import Contact from "./page/Contact";
import About from "./page/About";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import PostCreate from "./page/PostCreate";
import Posts from "./page/Posts";
import PostEdit from "./page/PostEdit";
import PostRequests from "./page/PostRequests";
import Admin from "./page/Admin";
import i18n from "./components/i18n";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Redirect root (/) to /krye */}
      <Route path="/" element={<Navigate to="/krye" />} />
      <Route path="/krye" element={<Home />} />
      <Route path="katalogu" element={<Catalog />} />
      <Route path="postime" element={<Posts />} />
      <Route path="postime/krijo" element={<PostCreate />} />
      <Route path="/postime/edit-post/:postId" element={<PostEdit />} />
      <Route path="/postime/requests" element={<PostRequests />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="rreth" element={<About />} />
      <Route path="kontakt" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="i18n" element={<i18n />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
