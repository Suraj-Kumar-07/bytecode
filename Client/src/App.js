import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom'
import './App.css';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Contact from './Components/Contact';
import Home from './Components/Home';
import Problems from './Components/Problems';
import Contest from './Components/Contest';
import Footer from './Components/Footer';
import About from './Components/About';
import CodeEditor from './Components/CodeEditor';
import CreatePost from './Components/CreatePost';
import PostPage from './Components/PostPage';
import AddQuestion from './Components/AddQuestion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const HOST = 'http://localhost:5000' ;
  const notify = (msg) => toast(msg);
  return (
    <Router>
  
      <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route exact path='/' element={<Home notify={notify} HOST = {HOST}/>}/>
        <Route exact path='/problems' element={<Problems notify={notify} HOST={HOST}/>}/>
        <Route exact path='/contest' element={<Contest notify={notify}/>}/>
        <Route exact path='/login' element={<Login  notify={notify} HOST={HOST}  />}/>
        <Route exact path='/signup' element={<Signup notify={notify} HOST={HOST}  />}/>
        <Route exact path='/contact' element={<Contact notify={notify}/>}/>
        <Route exact path='problems/editor/:id' element={<CodeEditor notify={notify} HOST={HOST}/>}/>
        <Route exact path='/about' element={<About notify={notify}/>}/>
        <Route exact path='/blog/:id' element={<PostPage notify={notify} HOST={HOST}/>}/>
        <Route exact path='/createblog' element={<CreatePost notify={notify} HOST={HOST}/>}/>
        <Route exact path='/addquestion' element={<AddQuestion notify={notify} HOST={HOST}/>}/>
      </Routes>
      <Footer/>

    </Router>
  ); 
}

export default App;
