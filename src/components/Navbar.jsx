import {navLinks} from "../constants/index.js";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
const Navbar = () => {

    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger: {
                trigger: "nav",
                start: "bottom top"
            }
        });

        navTween.to("nav", {
            backgroundColor: "rgba(255, 255, 255, 0.1)", // semi-transparent
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)", // for Safari
            duration: 1,
            ease: "power1.inOut"
        });
    }, []);



    return(
        <nav className="flex items-center justify-between px-10 ">
            <div>
            <a href="#home" className="flex items-center gap-2">
                <img src= "./images/logo.png" alt="logo"/>
                <p>Velvet Pour</p>
            </a>
            <ul>
                {navLinks.map((link) => (
                    <li key={link.id}>
                        <a href={`#${link.id}`}>{link.title}</a>
                    </li>
                ))}
            </ul>
            </div>
        </nav>
    )
}
export default Navbar;
