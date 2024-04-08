import "./footer.css";
import Container from "react-bootstrap/Container";


const Footer = () => {
  return (
    <div className="gm-footer">
        <Container className="d-flex justify-content-between align-items-center">
            <p className="footer-text">© CONNECT-E 2024</p>
            <img src="/icons/icon-left-font-monochrome-white.svg" width="130" className="d-inline-block align-top" alt="Groupomania logo with text"/>
        </Container>
    </div>
  )
}

export default Footer