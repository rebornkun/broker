import './App.css';
import Navbar from '../Components/NavBar/NavBar';
import { useEffect, useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home/Home';
import appContext from '../context/AppContext';
import Splash from '../Pages/Splash/Splash';
import About from '../Pages/About/About';
import Faq from '../Pages/Faq/Faq';


function App() {

  const [splashdisplay, setSplashDisplay] = useState("show");
  const [mobileNavopen, setMobileNavOpen] = useState(false);
  const appScrollBody = useRef()
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
  },[])

  function unShowSplash(){
    window.setTimeout(() => setSplashDisplay("noShow"), 3000);
  }

  return (
    <appContext.Provider value={{ appScrollBody, splashdisplay, setSplashDisplay }}>
      <div ref={appScrollBody} className="App">
        <header className="App-header">
          <Navbar
            mobileNavopen={mobileNavopen}
            setMobileNavOpen={setMobileNavOpen}
          />
        </header>
        <section>
          <Routes>
            <Route path="/*" element={<Navigate to="/home" replace={true} />} />
            <Route path="/home" element={<Home revealAnimation={revealAnimation} />} />
            <Route path="/about" element={<About revealAnimation={revealAnimation} />} />
            <Route path="/faq" element={<Faq revealAnimation={revealAnimation}/>} />
            <Route path="*" element={<Navigate to="home" replace={true} />} />
          </Routes>
        </section>
        <Splash />
      </div>
    </appContext.Provider>
  );
}

export default App;
