
 // 「くらしのサービス」カルーセル
function createKurashiServicesCarousel() {
    const cleanupKey = "__karteKurashiServicesCarouselCleanup";
    if (typeof window[cleanupKey] === "function") window[cleanupKey]();

    const eventCleanupCallbacks = [];
    const pendingTimeoutIds = new Set();
    let autoplayIntervalId = null;
    let restoreCarouselDom = () => {};

    function addManagedListener(target, type, listener, options) {
        target.addEventListener(type, listener, options);
        eventCleanupCallbacks.push(() => target.removeEventListener(type, listener, options));
    }

    function scheduleTimeout(callback, delay) {
        const timeoutId = setTimeout(() => {
            pendingTimeoutIds.delete(timeoutId);
            callback();
        }, delay);
        pendingTimeoutIds.add(timeoutId);
        return timeoutId;
    }

    function cleanupCarousel() {
        clearInterval(autoplayIntervalId);
        pendingTimeoutIds.forEach(clearTimeout);
        pendingTimeoutIds.clear();
        eventCleanupCallbacks.splice(0).forEach(removeListener => removeListener());
        restoreCarouselDom();
        if (window[cleanupKey] === cleanupCarousel) delete window[cleanupKey];
    }

    const c = document.querySelector(".karte_kcx_home_services_slider_SERVICES_JS");
    let i = document.querySelector(".karte_kcx_home_services_slider__Group_SERVICES_JS"),
        e = document.querySelectorAll(".karte_kcx_home_services_slider__Item_SERVICES_JS");
    const u = document.querySelector(".karte_kcx_home_services_slider__IndicatorGroup_SERVICES_JS");
    let B = document.querySelector(".karte_kcx_home_services_slider__Indicator_SERVICES_JS"),
        o = document.querySelector(".karte_kcx_home_services_sliderCurrent_SERVICES_JS"),
        a = document.querySelector(".karte_kcx_home_services_slider__prev_SERVICES_JS"),
        f = document.querySelector(".karte_kcx_home_services_slider__next_SERVICES_JS"),
        pauseBtn = document.querySelector(".karte_kcx_home_services_slider__PauseBtn_SCOPO"),
        m = !1,
        d = 0;
    if (!i || e.length === 0) return;

    const originalSlides = Array.from(e);
    const originalSlideStates = new Map(originalSlides.map(slide => [slide, {
        className: slide.className,
        dataSliderIndex: slide.getAttribute("data-slider-index")
    }]));
    const originalIndicators = u ? Array.from(u.querySelectorAll(".karte_kcx_home_services_slider__Indicator_SERVICES_JS")) : [];
    const originalIndicatorStates = new Map(originalIndicators.map(indicator => [indicator, {
        className: indicator.className,
        dataIndicatorIndex: indicator.getAttribute("data-indicator-index")
    }]));
    const controls = [a, f, u, pauseBtn].filter(Boolean);
    const originalControlStates = controls.map(control => [control, control.hidden]);
    const originalGroupClassName = i.className;
    const originalPauseButtonState = pauseBtn ? {
        innerHTML: pauseBtn.innerHTML,
        ariaLabel: pauseBtn.getAttribute("aria-label")
    } : null;

    restoreCarouselDom = () => {
        originalSlides.forEach(slide => {
            const state = originalSlideStates.get(slide);
            slide.className = state.className;
            if (state.dataSliderIndex === null) slide.removeAttribute("data-slider-index");
            else slide.setAttribute("data-slider-index", state.dataSliderIndex);
            i.appendChild(slide);
        });
        if (u) {
            u.querySelectorAll("[data-carousel-indicator-clone='true']").forEach(clone => clone.remove());
            originalIndicators.forEach(indicator => {
                const state = originalIndicatorStates.get(indicator);
                indicator.className = state.className;
                if (state.dataIndicatorIndex === null) indicator.removeAttribute("data-indicator-index");
                else indicator.setAttribute("data-indicator-index", state.dataIndicatorIndex);
            });
        }
        i.className = originalGroupClassName;
        originalControlStates.forEach(([control, wasHidden]) => { control.hidden = wasHidden; });
        if (pauseBtn && originalPauseButtonState) {
            pauseBtn.innerHTML = originalPauseButtonState.innerHTML;
            if (originalPauseButtonState.ariaLabel === null) pauseBtn.removeAttribute("aria-label");
            else pauseBtn.setAttribute("aria-label", originalPauseButtonState.ariaLabel);
        }
    };
    window[cleanupKey] = cleanupCarousel;

    // 一時停止中のアイコン(再生アイコン)。停止ボタンは元のSVG(一時停止アイコン)をそのまま使う
    const pauseIconHtml = pauseBtn ? pauseBtn.innerHTML : "";
    const playIconHtml = `
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#fff"></circle>
            <path d="M9.5 7.3L17 12L9.5 16.7V7.3Z" fill="#E72221"></path>
        </svg>
    `;

    // 自動スライド設定(5秒)の関数
    function startAutoSlide() {
        if (autoplayIntervalId || e.length < 2) return;
        autoplayIntervalId = setInterval(() => {
            s("next", 1);
        }, 5000);
    }


    // 自動スライドを停止
    function stopAutoplay() {
        clearInterval(autoplayIntervalId);
        autoplayIntervalId = null;
    }

    // 自動スライドの再生ボタンと停止ボタンを押した時のメソッド
    function togglePauseOrStart() {
        if (!pauseBtn) return;

        let isPlaying = !0;

        function toggle() {
            if (isPlaying) {
                stopAutoplay();
                pauseBtn.innerHTML = playIconHtml;
                pauseBtn.setAttribute("aria-label", "自動再生を開始");
            } else {
                startAutoSlide();
                pauseBtn.innerHTML = pauseIconHtml;
                pauseBtn.setAttribute("aria-label", "自動再生を停止");
            }
            isPlaying = !isPlaying;
        }

        addManagedListener(pauseBtn, "click", toggle);
        addManagedListener(pauseBtn, "keydown", function(t) {
            if (t.key === "Enter" || t.key === " ") {
                t.preventDefault();
                toggle();
            }
        });
    }

    function T() {
        e = document.querySelectorAll(".karte_kcx_home_services_slider__Item_SERVICES_JS");
        for (let r = 0; r < e.length; r++) e[r].classList.remove("karte_kcx_home_services_sliderCurrent_SERVICES_JS");
        e[2] ? e[2].classList.add("karte_kcx_home_services_sliderCurrent_SERVICES_JS") : e[1] && e[1].classList.add("karte_kcx_home_services_sliderCurrent_SERVICES_JS"), o = document.querySelector(".karte_kcx_home_services_sliderCurrent_SERVICES_JS"), o && (d = Number(o.getAttribute("data-slider-index")))
    }

    function g() {
        const r = document.querySelectorAll(".karte_kcx_home_services_slider__Indicator_SERVICES_JS");
        for (let n = 0; n < r.length; n++) r[n].classList.remove("indicatorCurrent_SERVICES_JS");
        r[d] && r[d].classList.add("indicatorCurrent_SERVICES_JS")
    }

    function v() {
        if (e.length === 1) {
            i.classList.add("sliderSingle_SERVICES_JS");
            controls.forEach(control => { control.hidden = true; });
        }
        else if (e.length < 5) e.length === 2 ? i && i.classList.add("sliderDouble_SERVICES_JS") : i && i.classList.add("sliderSimple_SERVICES_JS");
        else return
    }

    function s(r, n) {
        if (!e || e.length === 0) return;
        if (!m) {
            m = !0;
            for (let l = 0; l < n; l++) scheduleTimeout(() => {
                if (!e || e.length === 0) return;
                if (r === "next") i && e[0] && i.appendChild(e[0]);
                else if (r === "prev") i && e[0] && i.insertBefore(e[e.length - 1], e[0]);
                else return;
                T(), g()
            }, 200 * l);
            scheduleTimeout(() => {
                m = !1
            }, 800 + 200 * Math.max(0, n - 1))
        }
    }


    function Q(r) {
        if (o && (d = Number(o.getAttribute("data-slider-index")), d !== r))
            if (d < r) {
                let n = r - d;
                s("next", n)
            } else {
                let n = d - r;
                s("prev", n)
            }
    }

    function V() {
        for (let t = 0; t < e.length - 1; t++) {
            if (!u || !B) continue;
            const indicatorClone = B.cloneNode(true);
            indicatorClone.setAttribute("data-carousel-indicator-clone", "true");
            u.appendChild(indicatorClone);
        }
        if (v(), e.length === 1) return;
        const r = document.querySelectorAll(".karte_kcx_home_services_slider__Indicator_SERVICES_JS");
        for (let t = 0; t < e.length; t++) e[t].setAttribute("data-slider-index", String(t)), r[t] && r[t].setAttribute("data-indicator-index", String(t));
        for (let t = 0; t < r.length; t++) addManagedListener(r[t], "click", function() {
            let z = Number(r[t].getAttribute("data-indicator-index"));
            Q(z)
        });
        i && i.insertBefore(e[e.length - 2], e[0]), i && i.insertBefore(e[e.length - 1], e[0]), T(), g();
        scheduleTimeout(() => {
            i && i.classList.add("sliderLoaded_SERVICES_JS");
        }, 50);
        if (a) addManagedListener(a, "click", function() { s("prev", 1); });
        if (f) addManagedListener(f, "click", function() { s("next", 1); });
        let startX = 0,
            startY = 0,
            currentX = 0,
            currentY = 0,
            h = 30,
            isHorizontalSwipe = false,
            hasDirectionLock = false;
        if (c) {
            addManagedListener(c, "touchstart", function(t) {
                startX = t.touches[0].pageX;
                startY = t.touches[0].pageY;
                currentX = startX;
                currentY = startY;
                isHorizontalSwipe = false;
                hasDirectionLock = false;
            }, { passive: true });
            addManagedListener(c, "touchmove", function(t) {
                currentX = t.changedTouches[0].pageX;
                currentY = t.changedTouches[0].pageY;

                if (!hasDirectionLock) {
                    const diffX = Math.abs(currentX - startX);
                    const diffY = Math.abs(currentY - startY);

                    if (diffX > 8 || diffY > 8) {
                        hasDirectionLock = true;
                        isHorizontalSwipe = diffX > diffY;
                    }
                }

                // 横スワイプと判定した場合のみカルーセル操作として扱い、縦スクロールを止める
                if (isHorizontalSwipe) {
                    t.preventDefault();
                }
            }, { passive: false });
            addManagedListener(c, "touchend", function() {
                if (!isHorizontalSwipe) {
                    return;
                }

                currentX < startX && startX > currentX + h ? s("next", 1) : startX < currentX && startX + h < currentX && s("prev", 1);
            });
            addManagedListener(c, "touchcancel", function() {
                isHorizontalSwipe = false;
                hasDirectionLock = false;
            });
        }
    }
    V()
    // 自動スライド設定
    startAutoSlide();
    // 自動スライドの再生ボタンと停止ボタンを押した時のメソッド
    togglePauseOrStart();
}

document.addEventListener('DOMContentLoaded', function() {
    createKurashiServicesCarousel();
});

