import "./footerLoggedIn.css";
import Container from "react-bootstrap/Container";


export const Footer2 = () => {
  return (
    <div className="gm-footer">
        <Container className="d-flex justify-content-between align-items-center">
            <p className="footer-text">© CONNECT-E 2024</p>
            <a className="footer-link" href="">Log Out</a>
            <a className="footer-link" href="/delete-account">Delete Account</a>
            <img src="/icons/icon-left-font-monochrome-white.svg" width="130" className="d-inline-block align-top" alt="Groupomania logo with text"/>
        </Container>
    </div>
  )
}

export default Footer2