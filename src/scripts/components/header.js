import { onWindowScroll, exist } from '../utils/utils';

const header = () => {
    const SELECTORS = {
        header: '.header',
        menuTrigger: '.js-header-trigger',
    };

    const CLASSNAMES = {
        bodyOpenMenuState: 'body--open_menu_state',
        headerScrollState: 'header--scroll_state',
    };

    const $body = document.body;
    const $header = document.querySelector(SELECTORS.header);
    const $menuTrigger = document.querySelector(SELECTORS.menuTrigger);
    if (!exist([$header, $menuTrigger])) return;

    let isMenuOpen = false;

    const handleTriggerClick = () => {
        if (!isMenuOpen) {
            $body.classList.add(CLASSNAMES.bodyOpenMenuState);
            isMenuOpen = true;
        } else {
            $body.classList.remove(CLASSNAMES.bodyOpenMenuState);
            isMenuOpen = false;
        }
    };

    const headerScroll = (windowScrollTop) => {
        if (windowScrollTop > 10 && !$header.classList.contains(CLASSNAMES.headerScrollState)) {
            $header.classList.add(CLASSNAMES.headerScrollState);
        } else if (windowScrollTop <= 10 && $header.classList.contains(CLASSNAMES.headerScrollState)) {
            $header.classList.remove(CLASSNAMES.headerScrollState);
        }
    };

    onWindowScroll(headerScroll);

    $menuTrigger.addEventListener('click', () => {
        handleTriggerClick();
    });
};

export default header;
