import "./login.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = () => {
	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<Container className="main-sec d-flex flex-column justify-content-center align-items-center">
				<h1>Log In</h1>

				<h2>
					Don&apos;t have an account? Create one{" "}
					<a href="/create-account">here</a>.
				</h2>

				<Form className="d-flex flex-column justify-content-center align-items-center">
					<Form.Group className="form-fld mb-3" controlId="formBasicEmail">
						<Form.Label className="form-lbl">Email</Form.Label>
						<Form.Control type="email" placeholder="Enter email" />
					</Form.Group>

					<Form.Group className="form-fld mb-3" controlId="formBasicPassword">
						<Form.Label className="form-lbl">Password</Form.Label>
						<Form.Control type="password" placeholder="Password" />
					</Form.Group>

					<Button className="form-btn d-flex align-items-center justify-content-center" type="submit">
						Log In
					</Button>
				</Form>
			</Container>
		</div>
	);
};

export default Login;
