'use strict';

var html = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "math", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rb", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "slot", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr"];

var visit = require("unist-util-visit");
function setParentForComponents(markdownAST, components) {
    var _loop = function _loop(i, len) {
        visit(markdownAST, "html", function (node, index, parent) {
            if (node.value === "<" + components[i] + ">") {
                parent.type = "div";
            }
        });
    };

    for (var i = 0, len = components.length; i < len; i++) {
        _loop(i, len);
    }
}

function setParentForNonHtmlElements(markdownAST) {
    visit(markdownAST, "html", function (node, index, parent) {
        if (!html.some(function (tag) {
            return node.value == "<" + tag + ">" || node.value.startsWith("<" + tag + " ");
        })) {
            parent.type = "div";
        }
    });
}

module.exports = function (_ref, _ref2) {
    var markdownAST = _ref.markdownAST;
    var _ref2$components = _ref2.components,
        components = _ref2$components === undefined ? [] : _ref2$components;

    if (!components.length) {
        return setParentForNonHtmlElements(markdownAST);
    }

    return setParentForComponents(markdownAST, components);
};
