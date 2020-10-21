"use strict";

const appConfig = {
    modules: [
        { url: "/js/data/api.js" },
        { url: "/js/modules/render-slider.js" },
        { url: "/js/modules/slider.js" },
        { url: "/js/modules/fade.js" },
        { url: "/js/modules/fade-image-plugin.js" },
        { url: "/js/modules/swipe.js" },
    ],
};

function addScript(url, callback) {
    console.log("addScript", { url, callback });
    const scriptNode = document.createElement("script");
    scriptNode.setAttribute("src", url);
    scriptNode.onload = callback || (() => {});
    document.head.append(scriptNode);
}

function loadResources(pageLoadedCallback) {
    console.log("loadResources", { pageLoadedCallback });
    const { modules } = appConfig;
    const loadedScripts = [];

    // load all scripts
    for (let i = 0; i < modules.length; i++) {
        addScript(modules[i].url, () => {
            console.log("script loaded:", { ...modules[i] });
            const scriptItem = modules[i];
            const callback = window[scriptItem.callback];

            if (scriptItem.callback && typeof callback === "function") {
                callback(scriptItem);
            }

            checkScriptLoading(scriptItem, pageLoadedCallback);
        });
    }

    function checkScriptLoading(script, successCallback) {
        console.log("checkScriptLoading", {
            script,
            successCallback,
            loadedScripts,
            modules,
        });
        loadedScripts.push(script);

        if (loadedScripts.length === modules.length) {
            successCallback();
        }
    }
}

// function onSliderLoad(script) {
//     console.log("onSliderLoad", { script });
// }

function onAllScriptsLoad() {
    console.log("onAllScriptsLoad");
    // ...

    const helpers = {
        show: (element) => element.classList.remove("hidden"),
        hide: (element) => element.classList.add("hidden"),
        fadeOut: fadeOutEffect,
        fadeIn: fadeInEffect,
    };

    const mainWrapper = document.getElementsByClassName("main-wrapper")[0];
    const preloader = document.getElementsByClassName("loading-page")[0];
    const sliderWrapper = document.getElementsByClassName("slider")[0];

    function showPreloader() {
        mainWrapper.classList.remove("loading-page-before-animate");
        setTimeout(
            initMainSlider,
            2000
            //0
        );
    }

    function initMainSlider() {
        helpers.fadeOut(preloader, 600, () => {
            helpers.hide(preloader);
            sliderWrapper.style.opacity = 0;
            helpers.show(sliderWrapper);

            const sliderDataWaiter = () => {
                if (window._data.sliderData) {
                    createSlider(window._data.sliderData);
                } else {
                    setTimeout(sliderDataWaiter, 50);
                }
            };
            sliderDataWaiter();
        });

        const createSlider = (data) => {
            const sliderHtml = renderSlider(data);
            console.log({ sliderHtml });

            const sliderHolder = sliderWrapper.getElementsByClassName(
                "slider-inner"
            )[0];
            sliderHolder.innerHTML = sliderHtml;

            const sliderInstance = slider({
                slide: ".slider-slide",
                nextArrow: ".slider-next",
                prevArrow: ".slider-prev",
                field: ".slider-inner",
            });

            // init fadeImage plugin
            [...document.getElementsByClassName("slider-slide")].forEach(
                (item) => {
                    fadeImagePlugin({
                        container: item,
                        imgClass: "slider-image",
                        onClass: "slider-icon-on",
                        offClass: "slider-icon-off",
                    });
                }
            );

            helpers.fadeIn(sliderWrapper, 600, () => {
                const sliderSwipeWrapper = swipe(sliderWrapper, 5);

                sliderSwipeWrapper.onLeft(() => {
                    // console.log('onLeft');
                    sliderInstance.goNext();
                });

                sliderSwipeWrapper.onRight(() => {
                    // console.log('onRight');
                    sliderInstance.goPrev();
                });

                // sliderSwipeWrapper.onUp(() => { console.log('onUp'); });
                // sliderSwipeWrapper.onDown(() => { console.log('onDown'); });
                sliderSwipeWrapper.listenSwipe();
            });
        };
    }

    window._data = {};
    API.getSliderData((data) => {
        window._data.sliderData = data;
    });

    setTimeout(showPreloader, 300);
}

window.addEventListener("DOMContentLoaded", () =>
    loadResources(onAllScriptsLoad)
);
