import './App.css';
import Navbar from '../Components/NavBar/NavBar';
import { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import appContext from '../context/AppContext';
import Splash from '../Pages/Splash/Splash';
import About from '../Pages/About/About';
import Faq from '../Pages/Faq/Faq';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Dashboard from '../Pages/Dashboard/Dashboard';
import { auth, db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';


function App() {

  const [splashdisplay, setSplashDisplay] = useState("show");
  const [mobileNavopen, setMobileNavOpen] = useState(false);
  const [btcPrice, setBtcPrice] = useState(0);
  const [userData, setUserData] = useState([])
  const appScrollBody = useRef()
  const navigate = useNavigate()
  function revealAnimation() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      // console.log(elementTop)
      var elementVisible = 100;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  useEffect(()=>{
    unShowSplash()
    let user = localStorage.getItem('user');
    if(user){
      // console.log('auth')
      getUserData()
      // navigate("/dashboard")
    }else{
      navigate("/")
    }
  },[])
  const userCollectionRef = collection(db, "User") 
  const getUserData = async() => {
    const userD = localStorage.getItem('user')
    const userEmail = JSON.parse(userD).email
    try{
        const d = await getDocs(query(userCollectionRef, where("email", "==", `${userEmail}`))) 
        let res = []
        console.log(d)
        d.forEach(user => {
            res.push({
                id: user.id, 
                ...user.data()
            })
        })
        
        setUserData(res)
    }catch(e){
        navigate('/', {replace: true})
        console.log(e.message)
    }
}

  function unShowSplash(){
    window.setTimeout(() => setSplashDisplay("noShow"), 3000);
  }

  return (
    <appContext.Provider value={{ appScrollBody, splashdisplay, setSplashDisplay, userData, setUserData, btcPrice, setBtcPrice, getUserData }}>
      <div ref={appScrollBody} className="App">
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/*" element={
              <>
                <header className="App-header">
                  <Navbar
                    mobileNavopen={mobileNavopen}
                    setMobileNavOpen={setMobileNavOpen}
                  />
                </header>
                <section>
                  <Routes>
                    <Route path="/" element={<Navigate to="/home" replace={true} />} />
                    <Route path="/home" element={<Home revealAnimation={revealAnimation} />} />
                    <Route path="/about" element={<About revealAnimation={revealAnimation} />} />
                    <Route path="/faq" element={<Faq revealAnimation={revealAnimation}/>} />
                    <Route path="*" element={<Navigate to="home" replace={true} />} />
                  </Routes>
                </section>
              </>
            } />
        </Routes>
        <Splash />
      </div>
    </appContext.Provider>
  );
}

export default App;
