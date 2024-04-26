import gsap from "gsap";

const marquee = () => {
    const SELECTORS = {
        lists: '.js-ticker-list',
        items: '.js-ticker-item',
    }

    const $lists = document.querySelectorAll(SELECTORS.lists);
    if (!$lists.length) return;

    const createClone = (list, items, itemClones) => {
        items.forEach(($item) => {
            const clone = $item.cloneNode(true);
            itemClones.push(clone);
        });

        itemClones.forEach((clone) => {
            list.insertBefore(clone, items[0]);
        });
    }

    const updateListStyleOffset = (list, startPosition, translate) => {
        list.style.transform = `translateX(${-startPosition + translate}px)`;
    }

    $lists.forEach(($list) => {
        const $items = $list.querySelectorAll(SELECTORS.items);
        if (!$items.length) return;
        const dataSpeed = parseInt($list.getAttribute('data-speed'));
        const dataDirection = $list.getAttribute('data-direction');
        const speed = dataSpeed ? dataSpeed : 1;

        let itemClones = [];
        let directionValue = 1;

        if (dataDirection == 'right') {
            directionValue = -1;
        }

        const listWidth = $list.getBoundingClientRect().width;

        const transformList = () => {
            let windowWidth = window.innerWidth;

            if (listWidth < windowWidth) {
                const countDuplicate = Math.floor(windowWidth / listWidth) + 2;

                for (let i = 0; i < countDuplicate; i++) {
                    createClone($list, $items, itemClones);
                }
            } else {
                createClone($list, $items, itemClones);
            }

            gsap.to($list, {
                duration: speed,
                ease: "none",
                repeat: -1,
                onUpdate: function() {
                    const progress = this.progress();
                    const currentOffset = Math.floor((listWidth) * progress);
                    updateListStyleOffset($list, listWidth, currentOffset*directionValue)
                }
            });
        }

        transformList();

        window.addEventListener('resize', transformList);
    });
};

export default marquee;
