import gsap from 'gsap';

const marquee = ({classTicker}= {}) => {
    const $tickers = document.querySelectorAll(classTicker);
    if (!$tickers.length) return;

    const updateTextPathOffset = (item, offset, count) => {
        item.setAttribute('startOffset', offset + count)
    }

    $tickers.forEach(($ticker) => {
        const $path = $ticker.querySelector('path');
        const speed = parseInt($ticker.getAttribute('data-speed'));
        let initAnimate;

        const repeatTextContent = (textContent, repetitions) => {
            let repeatedContent = '';
            for (let i = 0; i < repetitions; i++) {
                repeatedContent += textContent;
            }
            return repeatedContent;
        }

        const $textPath = $ticker.querySelector('textPath');
        if (!$textPath) return;

        const animateTextLine = () => {
            const textPathLength = $textPath.getComputedTextLength();
            const textPathWidth = $textPath.getBoundingClientRect().width;

            const textContent = $textPath.textContent;

            const pathLength = $path.getTotalLength();
            const countText = Math.floor(pathLength / textPathLength * 2);

            let repeatedTextContent = repeatTextContent(textContent, countText);
            $textPath.innerHTML = repeatedTextContent;

            if (initAnimate) {
                initAnimate.kill();
            }

            initAnimate = gsap.to($textPath, {
                duration: speed,
                ease: "none",
                repeat: -1,
                onUpdate: function() {
                    const progress = this.progress();
                    const currentOffset = Math.floor(textPathLength * progress);
                    // console.log(currentOffset);
                    updateTextPathOffset($textPath, -textPathWidth, currentOffset);
                }
            });
        }

        animateTextLine();

        window.addEventListener('resize', animateTextLine);
    });
};

export default marquee;

