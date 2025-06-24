import gsap from 'gsap';
import React from 'react';
import {ScrollTrigger, SplitText} from 'gsap/all';
gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
    return(
        <div>
            <h1 className="text-9xl text-indigo-400 flex-center h-[100vh]">hello Gsap</h1>
        </div>
    )
}
export default App;