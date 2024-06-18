import gsap from 'gsap';

const sectionTickerMy = () => {
    const SELECTORS = {
        lists: '.js-ticker-list',
        items: '.js-ticker-item',
    }

    const $lists = document.querySelectorAll(SELECTORS.lists);
    if (!$lists.length) return;

    const createClone = (list, itemClones) => {
        const $items = list.querySelectorAll(SELECTORS.items);
        if (!$items.length) return;

        $items.forEach(($item) => {
            const clone = $item.cloneNode(true);
            itemClones.push(clone);
        });

        itemClones.forEach((clone) => {
            list.insertBefore(clone, $items[0]);
        });
    }

    const updateListStyleOffset = (list, startPosition, translate) => {
        list.style.transform = `translateX(${-startPosition + translate}px)`;
    }

    $lists.forEach(($list) => {
        const dataSpeed = parseInt($list.getAttribute('data-speed'));
        const dataDirection = $list.getAttribute('data-direction');
        const speed = dataSpeed ? dataSpeed : 1;
        const $listItem = $list.querySelectorAll(SELECTORS.items);

        let itemClones = [];
        let directionValue = 1;

        if (dataDirection == 'right') {
            directionValue = -1;
        }

        const tl = gsap.timeline({repeat: - 1});

        const transformList = () => {
            let windowWidth = window.innerWidth;
            const countDuplicate = 2;
            for (let i = 0; i < countDuplicate; i++) {

                createClone($list, itemClones);
            }
            // createClone($list, itemClones);
            // const listWidth = $list.getBoundingClientRect().width;

            const listWidth = $list.offsetWidth;
            console.log('listWidth', listWidth);

            const listItemWidth = $listItem[0].getBoundingClientRect().width;

            gsap.set($list, {x: -listWidth });

            tl.to($list, {
                duration: speed,
                x: 0,
                ease: "none",
            });

            // if (listWidth < windowWidth) {
            //     // const countDuplicate = Math.floor(windowWidth / listWidth) + 2;


            //     for (let i = 0; i < countDuplicate; i++) {
            //         createClone($list, itemClones);
            //     }
            // } else {
            //     createClone($list, itemClones);
            // }

            // gsap.to($list, {
            //     duration: speed,
            //     x: 100,
            //     ease: "none",
            //     repeat: -1,
            //     // onUpdate: function() {
            //     //     const progress = this.progress();
            //     //     const currentOffset = Math.floor((listWidth) * progress);
            //     //     updateListStyleOffset($list, listWidth, currentOffset*directionValue)
            //     // }
            // });
        }

        transformList();

        // window.addEventListener('resize', transformList);
    });
};

export default sectionTickerMy;
