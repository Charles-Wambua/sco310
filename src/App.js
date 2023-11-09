import LoginPage from './classes/LoginPage';
import RegisterPage from './classes/RegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WelcomeScreen from './classes/WelcomeScreen';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <LoginPage/>} />
        <Route path='/register' element={ <RegisterPage/>} />
        <Route path='/home' element={ <WelcomeScreen/>} />
      </Routes>
    </Router>
  );
}

export default App;
