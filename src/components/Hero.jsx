import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import { useRef, useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Custom useMediaQuery hook
const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);

        return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
};

const Hero = () => {
    const videoRef = useRef();
    const isMobile = useMediaQuery("(max-width: 767px)");



    useGSAP(()=>{
        const heroSplit = new SplitText('.title',{type:"chars,words"});
        const paragraphSplit = new SplitText('.subtitle',{type:"lines"});

        heroSplit.chars.forEach((char,i) =>  char.classList.add(`text-gradient`));

        gsap.fromTo(heroSplit.chars,
            {y: 20, opacity: 0}, {y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power1.inOut"})

        gsap.from(paragraphSplit.lines,{
            opacity:0,
            yPercent:100,
            stagger:0.06,
            duration:1.8,
            ease:"expo.out",
            delay:1
        })

        // First ScrollTrigger for leaf animations
        gsap.timeline({scrollTrigger:{
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub:true,
            pin: true,
            pinSpacing: false
            }
        })
            .to('.right-leaf',{y: 200},0)
            .to('.left-leaf',{y: -200},0)

        // Define values based on mobile or desktop
        const startValue = isMobile ? 'top 50%' : 'center 60%';
        const endValue = isMobile ? 'top 120%' : 'bottom top';

        // Second ScrollTrigger using the defined values
        const tl= gsap.timeline({
            scrollTrigger: {
                trigger: "video",
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            }
        })
        videoRef.current.onloadedmetadata = () => {
        tl.to(videoRef.current, {
            currentTime: videoRef.current.duration
            })
        }
    },[])

    return(
       <>
           <section id="hero" className="noisy">
               <h1 className="title">Mojito</h1>
               <img src="./images/hero-left-leaf.png" alt="left leaf" className="left-leaf"/>
               <img src="./images/hero-right-leaf.png" alt="left leaf" className="right-leaf"/>

               <div className="body">
                <div className="content">
                    <div className="space-y-5 hidden md:block">
                        <p>Cool.Crisp.Classic.</p>
                        <p className="subtitle">sip the spirit <br/>of Summer</p>
                    </div>
                    <div className="view-cocktails">
                        <p className="subtitle">
                            Every cocktail on our menu is a blend of premium ingredients,
                            creative flair, and timeless recipes — designed to delight your senses.View cocktails
                            <a href="#cocktails">view cocktails</a>.
                        </p>
                    </div>
                </div>
               </div>
           </section>
            <div className="video inset-0">
                <video src="/videos/output.mp4" muted playsInline preload="auto" ref={videoRef} />
            </div>
       </>
    )
}
export default Hero;
