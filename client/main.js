/**
 * Licensed under MIT License
 * Copyright (c) 2017 Bernhard Grünewaldt
 */
import riot from 'riot'
import { createRenderer } from 'fela'

import './riot/app.tag.html'

import './main.css'
import '../node_modules/dropzone/dist/basic.css'
import '../node_modules/dropzone/dist/dropzone.css'


const felaMixin = {
    renderer: createRenderer(),
    renderAll: function(rulesObj, propsObj) {
        const classes = Object.keys(rulesObj);
        const generatesClassnames = {};
        for (let i = 0; i < classes.length; i++) {
            const rule = rulesObj[classes[i]];
            generatesClassnames[classes[i]] = felaMixin.renderer.renderRule(rule, propsObj);
        }
        return generatesClassnames;
    },
    mergeWithGlobalStyleProps: function(props) {
        return Object.assign({}, {
            primaryColor: '#02A300',
        }, props);
    }
};
felaMixin.renderer.subscribe(() => {
    document.getElementById('felaStyles').innerText = felaMixin.renderer.renderToString();
});

const busMixin = {
    publish: (eventName, payload) => {
        const event = document.createEvent("CustomEvent");
        event.initCustomEvent(eventName, true, true, payload);
        document.dispatchEvent(event);
    },
    subscribe: (eventName, subscribeCallback) => {
        document.addEventListener(eventName, subscribeCallback, false);
    },
};

riot.mixin({ init: function() {
    this.opts.felaMixin = felaMixin;
    this.opts.busMixin = busMixin;
}});
riot.mount('*', { appVersion: window.APP_VERSION });