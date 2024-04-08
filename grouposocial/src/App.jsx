import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from './components/header/Header';
import Home from './components/pages/home/Home';
import Login from './components/pages/login/Login';
import CreateAccount from './components/pages/createaccount/CreateAccount';
import Footer from './components/footer/Footer';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<div>
				<Header />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/create-account" element={<CreateAccount />}/>
                    <Route path="/log-in" element={<Login />}/>
                </Routes>
                <Footer />
			</div>
		</>
	);
}

export default App;
