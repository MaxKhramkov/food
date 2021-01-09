"use strict";

window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsParent = document.querySelector('.tabheader__items'),
          tabsContent = document.querySelectorAll('.tabcontent');
    
    // tabs
    function hideTabsContent() {
        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        });

        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
    }

    function showTabsContent(i = 0) {
        tabs[i].classList.add('tabheader__item_active');
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show');
    }

    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click', (event) => {
        if(event.target && event.target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(item == event.target) {
                    hideTabsContent();
                    showTabsContent(i);
                }
            });
        }
    });

    // timer (getTimeRemaining, endtime, getZiro, setClock, selector, endTime, updateClock)

    const deadLine = "2021-1-9";

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / 1000) % 60);
        
        return {
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function getZiro(num) {
        if(num >= 0 && num < 10) {
            return '0' + num;
        }
        else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerInterval = setInterval(updateClock);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZiro(t.days);
            hours.innerHTML = getZiro(t.hours);
            minutes.innerHTML = getZiro(t.minutes);
            seconds.innerHTML = getZiro(t.seconds);

            if(t.total <= 0) {
                clearInterval(timerInterval);
            }

        }
    }

    setClock('.timer', deadLine);

    // modal window (btnModal, modalWindow, modalClose, closeModalWindow, )
    const btnModal = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal'),
          modalBtnClose = document.querySelector('[data-close]');

    btnModal.forEach((item) => {
        item.addEventListener('click', () => {
            modalWindow.classList.add('show');
            modalWindow.classList.remove('hide');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeModalWindow() {
        modalWindow.classList.remove('show');
        modalWindow.classList.add('hide');
        document.body.style.overflow = '';
    }

    modalBtnClose.addEventListener('click', closeModalWindow);

    modalWindow.addEventListener('click', (e) => {
        if(e.target === modalWindow) {
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modalWindow.classList.contains('show')) {
            closeModalWindow();
        }
    });
    
});