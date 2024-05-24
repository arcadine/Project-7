import "./headerLoggedIn.css";
import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";

export const Header2 = () => {
	return (
		<div>
			<Navbar className="bg-body-tertiary logged-in-nav d-flex justify-content-between align-items-center">
        <Container className="d-flex justify-content-start">
          <Navbar.Brand href="/" className="logo">
            <img
              src="/icons/icon.svg"
              width="75"
              height="75"
              className="d-inline-block align-top"
              alt="Groupomania logo"
            />
          </Navbar.Brand>
        </Container>
        <Container className="d-flex justify-content-end align-items-center">
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">Latest Posts</a>
            </li> 
            <li className="nav-item">
              <a className="nav-link" href="/new-post">New Post</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/my-posts">My Posts</a>
            </li>             
          </ul>
        </div>
        </Container>
      </Navbar>
		</div>
	);
};

export default Header2;
