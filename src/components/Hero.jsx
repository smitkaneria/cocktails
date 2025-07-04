import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

// Register GSAP plugins
gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  const videoRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    // Title split animation
    const heroSplit = new SplitText(".title", {
      type: "chars, words",
    });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    // Only animate first subtitle (headline), not both
    const subtitleLines = new SplitText(".subtitle-main", {
      type: "lines",
    });

    gsap.from(subtitleLines.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    // Parallax scroll effect for leaves and arrow
    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
    .to(".right-leaf", { y: 200 }, 0)
    .to(".left-leaf", { y: -200 }, 0)
    .to(".arrow", { y: 100 }, 0);

    // Scroll-controlled video playback
    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "120% top" : "bottom top";

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".inner-video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        tl.to(videoRef.current, {
          currentTime: videoRef.current.duration,
        });
      };
    }
  }, []);

  return (
    <div className="hero-container">
      <div id="hero" className="noisy">
        <h1 className="title">MOJITO</h1>

        <img src="/images/hero-left-leaf.png" alt="left-leaf" className="left-leaf" />
        <img src="/images/hero-right-leaf.png" alt="right-leaf" className="right-leaf" />

        <div className="body">
          <img src="/images/arrow.png" alt="arrow" className="arrow" />

          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle subtitle-main">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href="#cocktails">View cocktails</a>
            </div>
          </div>
        </div>
      </div>

      <div className="video absolute inset-0">
        <video
          className="inner-video"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
          autoPlay
          loop
        />
      </div>
    </div>
  );
};

export default Hero;
