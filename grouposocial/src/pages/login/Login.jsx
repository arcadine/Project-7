import "./login.css";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { loginUser } from "../../components/services";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<div className="d-flex flex-column justify-content-center align-items-center">
			<Container className="main-sec d-flex flex-column justify-content-center align-items-center">
				<h1>Log In</h1>

				<h2>
					Don&apos;t have an account? Create one{" "}
					<a href="/create-account" className="link-txt">here</a>.
				</h2>

				<Form className="d-flex flex-column justify-content-center align-items-center">
					<Form.Group className="form-fld mb-3" controlId="formBasicEmail">
						<Form.Label className="form-lbl">Email</Form.Label>
						<Form.Control 
							onChange={function (e) {
								setEmail(e.target.value);
							}}
							type="email" 
							placeholder="Enter email" 
						/>
					</Form.Group>

					<Form.Group className="form-fld mb-3" controlId="formBasicPassword">
						<Form.Label className="form-lbl">Password</Form.Label>
						<Form.Control 
							onChange={function loginUser(e) {
								setPassword(e.target.value);
							}}
							type="password" 
							placeholder="Password" 
						/>
					</Form.Group>

					<Button 
						onClick={async (e) => {
							e.preventDefault();
							const { userId, token, message } = await loginUser(email, password);
							if(userId && token){
								dispatch(loginSuccess({ userId, email, token }));
								navigate('/'); // Navigate to the new homepage
								console.log("2");
							}
							else {
								alert("There was an error in the login process", message);
							}
						}}
						className="form-btn d-flex align-items-center justify-content-center" 
						type="submit"
					>
						Log In
					</Button>
				</Form>
			</Container>
		</div>
	);
};

export default Login;


