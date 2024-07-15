import { useDispatch } from "react-redux";
import "./footerLoggedIn.css";
import { logout } from '../../features/auth/authSlice';
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";


export const FooterLoggedIn = () => {
  const dispatch = useDispatch();
	const navigate = useNavigate();
  
  return (
    <div className="gm-footer">
        <Container className="d-flex justify-content-between align-items-center">
            <p className="footer-text">© CONNECT-E 2024</p>
            <a className="footer-link" href="#"
              onClick={
                function logOutUser(e) {
                  e.preventDefault();
                  dispatch(logout());
                  navigate('/'); // Navigate back to homepage with cleared store
                }
              }>
              Log Out
            </a>
            <a className="footer-link" href="/delete-account">Delete Account</a>
            <img src="/icons/icon-left-font-monochrome-white.svg" width="130" className="d-inline-block align-top" alt="Groupomania logo with text"/>
        </Container>
    </div>
  )
}

export default FooterLoggedIn