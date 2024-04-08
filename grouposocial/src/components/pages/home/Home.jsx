import "./home.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const Home = () => {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<Container className="main-sec d-flex flex-column justify-content-center align-items-center">
				<h1>Welcome to GroupoSocial.</h1>

        
				<Button className="lg-gm-btn d-flex align-items-center justify-content-center" href="/log-in" variant="primary" size="lg">
          Log In
				</Button>
        

        <Button className="lg-gm-btn d-flex align-items-center justify-content-center" href="/create-account" variant="primary" size="lg">
					Create Account
				</Button>

			</Container>
		</div>
	);
};

export default Home;
