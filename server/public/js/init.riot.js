'use strict';

const felaMixin = {
    renderer: Fela.createRenderer(),
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
riot.mixin({ init: function() { this.opts.felaMixin = felaMixin; }});
riot.mount('*', { appVersion: window.APP_VERSION });