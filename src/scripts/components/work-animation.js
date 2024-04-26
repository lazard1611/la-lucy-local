import ScrollTrigger from 'gsap/ScrollTrigger';
import gsap from "gsap";
import svgDrawPlugin from '../libs/svgDrawPlugin';

const workAnim = () => {
    const SELECTORS = {
        section: '.js-works',
        item: '.js-item',
        decor: '.js-item-decor'
    }

    gsap.registerPlugin(ScrollTrigger, svgDrawPlugin);

    const $sections = document.querySelectorAll(SELECTORS.section);
    if (!$sections.length) return;
    const duration = 0.8;
    let isScrollTriggerActive = false;

    const timeLine = (tl, item, decor, index) => {
        if (index == 0) {
            tl
                .fromTo(item,
                    {
                        y: 100,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: duration,
                    }
                )
        }
        if (index == 1) {
            tl
                .fromTo(decor,
                        {
                            drawSVG: '0%',
                        },
                        {
                            drawSVG: '100%',
                            duration: duration,
                            stagger: 1,
                        }
                    )
                .fromTo(item,
                    {
                        y: 100,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: duration,
                    }, '-=1.8'
                )

        }
        if (index == 2) {
            tl
                .fromTo(decor,
                    {
                        drawSVG: '0%',
                    },
                    {
                        drawSVG: '100%',
                        duration: duration,
                    }, '-=1'
                )
                .fromTo(item,
                    {
                        y: 100,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: duration,
                    }, '-=0.5'
                )

        }
    }

    $sections.forEach(($section) => {
        const $items = $section.querySelectorAll(SELECTORS.item);
        if (!$items.length) return;

        const tl = gsap.timeline({paused: true});

        ScrollTrigger.create({
            trigger: $section,
            start: 'top 60%',
            end: 'bottom 60%',
            markers: true,
            animation: tl,
            onEnterBack: () => {
                isScrollTriggerActive = true;
                console.log('onEnterBack');
            }
        });

        $items.forEach(($item, index) => {
            const $decorSvg = $item.querySelectorAll('path');
            const $subItem = $item.children[0];

            if (!isScrollTriggerActive) {
                timeLine(tl, $subItem, $decorSvg, index);
            }
        })
    });
};

export default workAnim;
