const dropdownItem = () => {
    const SELECTORS = {
        dropdown: '.js-options-dropdown',
        head: '.js-options-dropdown-head',
        list: '.js-options-dropdown-list',
    }

    const CLASSES = {
        active: 'active'
    }

    const $dropdowns = document.querySelectorAll(SELECTORS.dropdown);
    if (!$dropdowns.length) return;

    $dropdowns.forEach(($dropdown) => {
        const $head = $dropdown.querySelector(SELECTORS.head);
        const $list = $dropdown.querySelector(SELECTORS.list);
        const $inputs = $list.querySelectorAll('input');

        const handleHeadText = () => {
            if (!$inputs.length) return;
            $inputs.forEach(($input) => {

                if ($input.checked) {
                    $head.textContent = $input.value;
                }
            })
        }

        handleHeadText();


       $head.addEventListener('click', () => {
           $list.classList.add(CLASSES.active);
       })

       $list.addEventListener('change', () => {
           handleHeadText();
           $list.classList.remove(CLASSES.active);
       })
    })
};

export default dropdownItem;
