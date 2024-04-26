import gsap from 'gsap';
import '../index.html';
import '../styles/app.scss';
import { pageLoad } from './utils/utils';
import marquee from './components/ticker-curve-svg';
import marqueeAnimation from './components/ticker';
import workAnim from './components/work-animation';
import animateSvgDecor from './components/animate-svg-decor';

pageLoad(() => {
    // tickerCurveSvg();
    // marquee();
    // workAnim();
    // marquee({classTicker: '.js-ticker-desktop'});
    animateSvgDecor();
    // let mm = gsap.matchMedia();
    // mm.add('(min-width: 768px)', () => {
    //     marquee({classTicker: '.js-ticker-desktop'});
    // })
    // mm.add('(max-width: 767px)', () => {
    //     marquee({classTicker: '.js-ticker-mobile'});
    // })
});

