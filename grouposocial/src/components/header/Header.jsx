
import "./header.css";
import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";

const Header = () => {
	return (
		<div>
			<Navbar className="bg-body-tertiary logged-out-nav">
        <Container className="d-flex justify-content-center">
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
      </Navbar>
		</div>
	);
};

export default Header;
