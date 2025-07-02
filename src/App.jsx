import gsap from 'gsap';
import React from 'react';
import {ScrollTrigger, SplitText} from 'gsap/all';
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Cocktails from "./components/Cocktails.jsx";
import About from "./components/About.jsx";
import Art from "./components/Art.jsx";
import Menu from "./components/Menu.jsx";
import Contact from "./components/Contact.jsx";
// import Loader from "./components/Loader.jsx";
gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
    // If you add async loading in the future, add a loading state here and show <Loader /> when loading.
    return(
        <main>
            <Navbar/>
            <Hero/>
            <Cocktails/>
            <About/>
            <Art/>
            <Menu/>
            <Contact/>
        </main>
    )
}
export default App;