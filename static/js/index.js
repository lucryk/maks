

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.logos-carousel-track');
    const blocks = document.querySelectorAll('.logo-block');
    const blockWidth = 200 + 40;
    let position = 0;
    let animationId;
    let direction = -1;

    blocks.forEach(block => {
        const clone = block.cloneNode(true);
        track.appendChild(clone);
    });

    function animate() {
        position += direction * 0.8;

        if (position < -blockWidth * blocks.length) {
            position = 0;
        } else if (position > 0) {
            position = -blockWidth * blocks.length;
        }

        track.style.transform = `translateX(${position}px)`;
        animationId = requestAnimationFrame(animate);
    }

    animate();

    track.addEventListener('mouseenter', () => {
        cancelAnimationFrame(animationId);
    });

    track.addEventListener('mouseleave', () => {
        animate();
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.price-prev-btn');
    const nextBtn = document.querySelector('.price-next-btn');

    // Оригинальный код для экранов >1400px
    if (window.innerWidth > 1400) {
        const visibleSlides = 4;
        let currentIndex = 0;

        function updateSlider() {
            const slideWidth = slides[0].offsetWidth + 10;
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = Math.min(currentIndex + 1, slides.length - visibleSlides);
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = Math.max(currentIndex - 1, 0);
            updateSlider();
        });

        updateSlider();
    }
    // Адаптация для экранов <=1400px
    else {
        let visibleSlides = 3; // По умолчанию для десктопа
        let currentIndex = 0;

        // Определение количества видимых слайдов
        function updateVisibleSlides() {
            if (window.innerWidth < 576) {
                visibleSlides = 1;
            } else if (window.innerWidth < 992) {
                visibleSlides = 2;
            } else {
                visibleSlides = 3;
            }
        }

        function updateSlider() {
            updateVisibleSlides();
            const slideWidth = slides[0].offsetWidth + 20;
            const maxIndex = Math.max(slides.length - visibleSlides, 0);
            currentIndex = Math.min(currentIndex, maxIndex);
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }

        nextBtn.addEventListener('click', () => {
            const maxIndex = Math.max(slides.length - visibleSlides, 0);
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            updateSlider();
        });

        // Инициализация
        updateVisibleSlides();
        updateSlider();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const casesTrack = document.querySelector('.cases-track');
    const casesSlides = document.querySelectorAll('.cases-slide');
    const casesPrev = document.querySelector('.cases-prev');
    const casesNext = document.querySelector('.cases-next');


    let casesCurrent = 0;
    const casesTotal = casesSlides.length;

    function updateCasesSlider() {
        casesTrack.style.transform = `translateX(-${casesCurrent * 100}%)`;
    }

    casesNext.addEventListener('click', function() {
        casesCurrent = (casesCurrent + 1) % casesTotal;
        updateCasesSlider();
    });

    casesPrev.addEventListener('click', function() {
        casesCurrent = (casesCurrent - 1 + casesTotal) % casesTotal;
        updateCasesSlider();
    });



    updateCasesSlider();
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.video-carousel-track');
    const blocks = document.querySelectorAll('.video-block');
    const blockWidth = 300 + 20;
    let position = 0;
    let animationId;
    let direction = -1;

    blocks.forEach(block => {
        const clone = block.cloneNode(true);
        track.appendChild(clone);
    });

    function animate() {
        position += direction * 0.5;

        if (position < -blockWidth * blocks.length) {
            position = 0;
        } else if (position > 0) {
            position = -blockWidth * blocks.length;
        }

        track.style.transform = `translateX(${position}px)`;
        animationId = requestAnimationFrame(animate);
    }

    animate();

    track.addEventListener('mouseenter', () => {
        cancelAnimationFrame(animationId);
    });

    track.addEventListener('mouseleave', () => {
        animate();
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
            const faqCards = document.querySelectorAll('.faq-card');

            faqCards.forEach(card => {
                const toggle = card.querySelector('.faq-toggle');

                toggle.addEventListener('click', () => {
                    card.classList.toggle('active');

                    faqCards.forEach(otherCard => {
                        if (otherCard !== card && otherCard.classList.contains('active')) {
                            otherCard.classList.remove('active');
                        }
                    });
                });
            });
        });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerOffset = 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function easeInOutQuad(t, b, c, d) {
                t /= d/2;
                if (t < 1) return c/2*t*t + b;
                t--;
                return -c/2 * (t*(t-2) - 1) + b;
            }

            requestAnimationFrame(animation);

            history.pushState(null, null, targetId);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.kvizblok');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const currentStepEl = document.querySelector('.current-step');
    const totalStepsEl = document.querySelector('.total-steps');

    let currentStep = 0;
    const totalSteps = steps.length;

    totalStepsEl.textContent = totalSteps;

    showStep(currentStep);

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                showStep(currentStep);
                updateProgress();
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
                updateProgress();
            }
        });
    });

    function showStep(step) {
        steps.forEach((s, index) => {
            s.classList.toggle('active', index === step);
        });

        const prevButtons = document.querySelectorAll('.prev-btn');
        prevButtons.forEach(btn => {
            btn.disabled = step === 0;
        });
    }

    function updateProgress() {
        currentStepEl.textContent = currentStep + 1;
    }
});

// index.js
document.addEventListener('DOMContentLoaded', function() {
    // Обработчики для обеих форм
    const forms = document.querySelectorAll('#info-form, #modal-form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmit(this);
        });
    });

    // Обработчики для открытия модального окна
    document.querySelectorAll('.block5link, .open-modal').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('modal').style.display = 'block';
        });
    });

    // Закрытие модального окна
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('modal').style.display = 'none';
    });

    // Закрытие при клике вне окна
    window.addEventListener('click', function(e) {
        if (e.target === document.getElementById('modal')) {
            document.getElementById('modal').style.display = 'none';
        }
    });

    // Инициализация масок для всех телефонных полей
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        initPhoneMask(input);
    });
});

function handleFormSubmit(form) {
    const formData = new FormData(form);
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    fetch('', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfToken,
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = '/success/';
        } else {
            alert('Ошибка: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Произошла ошибка при отправке формы');
    });
}

// Функция для инициализации маски телефона
function initPhoneMask(input) {
    // Весь код маски из вашего файла, но адаптированный для работы с любым input
    // ... (остальной код маски)
}

