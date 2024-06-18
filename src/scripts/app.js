import gsap from 'gsap';
import '../index.html';
import '../styles/app.scss';
import { pageLoad } from './utils/utils';
import marquee from './components/ticker-curve-svg';
import sectionTicker from './components/ticker';
import sectionTickerMy from './components/ticker-my';
import dropdownItem from './components/dropdown-item';

pageLoad(() => {
    // tickerCurveSvg();
    // marquee();
    // sectionTicker();
    sectionTickerMy();
    dropdownItem();


    // let mm = gsap.matchMedia();
    // mm.add('(min-width: 768px)', () => {
    //     marquee({classTicker: '.js-ticker-desktop'});
    // })
    // mm.add('(max-width: 767px)', () => {
    //     marquee({classTicker: '.js-ticker-mobile'});
    // })
});

