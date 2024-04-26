import gsap from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';

const animateSvgDecor = () => {
    const $decorWraps = document.querySelectorAll('.js-animate-svg-decor');
    if (!$decorWraps.length) return;

    gsap.registerPlugin(ScrollTrigger);

    $decorWraps.forEach(($decorWrap) => {
        const $svgArr = $decorWrap.querySelectorAll('svg');
        if (!$svgArr.length) return;
        const $parentSection = $decorWrap.closest('.section');

        const tl = gsap.timeline({ repeat: -1 });

        ScrollTrigger.create({
            trigger: $parentSection,
            start: "top center",
            end: "bottom center",
            markers: true,
            onEnter: () => {
                tl.play();
            },
            onEnterBack: () => {
                tl.play();
            },
            onLeave: () => {
                tl.pause();
            },
            onLeaveBack: () => {
                tl.pause();
            },
            animation: tl
        });

        $svgArr.forEach(($svg) => {
            tl.to($svg,
        {
                duration: 0.1,
                onStart: () => {
                    $svg.classList.add('active')
                },
                onComplete: () => {
                    $svg.classList.remove('active')
                }
            });
        })
        tl.pause();
    })
}

export default animateSvgDecor;
