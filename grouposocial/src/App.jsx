/* eslint-disable no-mixed-spaces-and-tabs */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from './components/header/Header';
import HeaderLoggedIn from './components/header-loggedin/HeaderLoggedIn';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Feed from './pages/feed/Feed';
import DeleteAccount from './pages/deleteAccount/DeleteAccount';
import CreateAccount from './pages/createAccount/CreateAccount';
import NewPost from './pages/newPost/NewPost';
import MyPosts from './pages/myPosts/MyPosts'
import Footer from './components/footer/Footer';
import FooterLoggedIn from './components/footer-loggedin/FooterLoggedIn';
import { Routes, Route } from 'react-router-dom';


function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  console.log('second test', isLoggedIn);
  return (
    <>
      <div className="page-content d-flex flex-column justify-content-between">
        {isLoggedIn ? <HeaderLoggedIn /> : <Header />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Feed />} />
              <Route path="/new-post" element={<NewPost />} />
			  <Route path="/my-posts" element={<MyPosts />} />
			  <Route path="/delete-account" element={<DeleteAccount />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/log-in" element={<Login />} />
            </>
          )}
        </Routes>
        {isLoggedIn ? <FooterLoggedIn /> : <Footer />}
      </div>
    </>
  );
}

export default App;
