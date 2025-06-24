import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {SplitText} from "gsap/SplitText";


const Hero = () => {

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

       </>
    )
}
export default Hero;