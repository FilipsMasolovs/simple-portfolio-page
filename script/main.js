(function() {
    const slides = document.querySelectorAll('.slide');
    const next = document.querySelector('#nextBtn');
    const prev = document.querySelector('#prevBtn');
    const slider = document.getElementById('slider');
    let auto = true;
    const dots = true;
    const intervalTime = 5000;
    let slideInterval;
    let currentSlide = 0;


    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            currentSlide = currentSlide + 1
        } else {
            currentSlide = 0
        }

        updateSlideState();
        updateDotsState();
    }

    const prevSlide = () => {
        if (currentSlide === 0) {
            currentSlide = slides.length - 1
        } else {
            currentSlide = currentSlide - 1
        }

        updateSlideState();
        updateDotsState();
    }

    const updateSlideState = () => {
        slides.forEach((item, index) => {
            item.classList.remove('current');
            if (index === currentSlide) {
                item.classList.add('current');
            }
        });
    }

    const updateDotsState = () => {
        const allDots = document.querySelectorAll('.dot');
        allDots.forEach((item, index) => {
            item.classList.remove('active-dot');
            if (index === currentSlide) {
                item.classList.add('active-dot');
            }
        });
    }



    next.addEventListener('click', e => {
        nextSlide();
    });
    prev.addEventListener('click', e => {
        prevSlide();
    });

    const handleDotClick = (event) => {
        let currentDot = parseInt(event.currentTarget.getAttribute('data-dot-index'));
        currentSlide = currentDot;
        updateSlideState();
        updateDotsState();
    }

    if (dots) {
        slider.insertAdjacentHTML('beforeend', '<div class="dots" id="dots"></div>');
        let dotContainer = document.getElementById('dots');

        for (let i = 0; i < slides.length; i++) {
            let dotClassName = 'dot';
            if (i === currentSlide) {
                dotClassName += ' active-dot';
            }
            dotContainer.insertAdjacentHTML('beforeend', `<button class="${dotClassName}" data-dot-index="${i}"></button>`);
        }
        let allDots = document.querySelectorAll('.dot');
        allDots.forEach((item, index) => {
            item.addEventListener('click', handleDotClick);
        })
    }

    if (auto) {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    const sliderMouseEnter = () => {
        clearInterval(slideInterval);
    }

    const sliderMouseLeave = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    slider.addEventListener('mouseenter', sliderMouseEnter);
    slider.addEventListener('mouseleave', sliderMouseLeave);
}());