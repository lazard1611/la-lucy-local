import gsap from 'gsap';
import Observer from 'gsap/Observer';
import Draggable from 'gsap/dist/Draggable';
// import InertiaPlugin from 'gsap/dist/InertiaPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { isTouchDevice } from '../utils/utils';
import { BREAKPOINTS } from '../utils/constants';

gsap.registerPlugin(ScrollTrigger, Observer, Draggable);

export const marqueeAnimation = ({ trackSelector, slideSelector } = {}) => {
    const $tracks = document.querySelectorAll(trackSelector);
    if (!$tracks.length) return null;

    ScrollTrigger.refresh();

    const defaultSpeed = 0.5;
    let dir = 1;

    $tracks.forEach(($track) => {
        let speed = defaultSpeed;
        let tickerTm = null;
        let tickedEnabled = false;

        const removeTicker = (fn) => {
            if (!tickedEnabled) return;
            tickedEnabled = false;

            clearInterval(tickerTm);
        };

        const addTicker = (fn) => {
            if (tickedEnabled) return;
            tickedEnabled = true;

            clearInterval(tickerTm);
            tickerTm = setInterval(() => {
                window.requestAnimationFrame(() => {
                    fn();
                });
            }, 1000 / 120);
        };

        let $slides = $track.querySelectorAll(slideSelector);
        let slideLength = Math.floor($slides[0].offsetHeight);
        let defaultOffset = slideLength;
        let draggable;

        if ($slides.length <= 2) return;

        let offset = defaultOffset;

        const ticker = (val = 0) => {
            if (offset >= 0) {
                offset = -slideLength - speed;
            } else if (offset <= -slideLength * 2) {
                offset = -slideLength - speed;
            } else {
                offset -= val || speed * dir;
            }

            gsap.set($track, { x: offset });
        };

        const handleDrag = () => {
            const { deltaY } = draggable[0];
            ticker(-deltaY);
            if (-deltaY < 0) {
                dir = -1;
            } else {
                dir = 1;
            }
        };

        const handleWheel = (e) => {
            if (e.target.closest(trackSelector)) {
                e.preventDefault();
            }
        };

        const matchMedia = gsap.matchMedia();

        matchMedia.add(`(min-width: ${BREAKPOINTS.mediaPoint1 - 1}px)`, () => {
            slideLength = Math.floor($slides[0].clientHeight);
            defaultOffset = slideLength;
            Observer.create({
                target: $track,
                type: 'wheel, pointer',
                onPress: (e) => {
                    removeTicker(ticker);
                },
                onRelease: (e) => {
                    addTicker(ticker);
                },
                onUp: (e) => {
                    if (e.event.type === 'wheel') {
                        removeTicker();
                        ticker(-e.deltaY / 2);
                        dir = 1;
                        addTicker(ticker);
                    }
                },
                onDown: (e) => {
                    if (e.event.type === 'wheel') {
                        removeTicker();
                        ticker(-e.deltaY / 2);
                        dir = -1;
                        addTicker(ticker);
                    }
                },
            });

            draggable = Draggable.create($track.parentElement, {
                onDragStart: () => {
                    removeTicker(ticker);
                },
                onDragEnd: () => {
                    addTicker(ticker);
                },
            });
            if (draggable) draggable[0]?.addEventListener('drag', handleDrag);
            window.addEventListener('wheel', handleWheel, { passive: false });
            addTicker(ticker);
        });
        matchMedia.add(`(max-width: ${BREAKPOINTS.mediaPoint1 - 1}px)`, () => {
            window.removeEventListener('wheel', handleWheel, { passive: false });
            if (draggable) draggable[0]?.removeEventListener('drag', handleDrag);
            removeTicker(ticker);
        });
    });

    return null;
};

export default marqueeAnimation;
