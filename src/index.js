const visit = require("unist-util-visit")
import { html } from "./html-tags.js"

function setParentForComponents(markdownAST, components) {
    for (let i = 0, len = components.length; i < len; i++) {
        visit(markdownAST, `html`, (node, index, parent) => {
            if (node.value === `<${components[i]}>`) {
                parent.type = "div"
            }
        })
    }
}

function setParentForNonHtmlElements(markdownAST) {
    visit(markdownAST, "html", (node, index, parent) => {
        if (
            !html.some(
                tag => node.value == `<${tag}>` || node.value.startsWith(`<${tag} `)
            )
        ) {
            parent.type = "div"
        }
    })
}

module.exports = ({ markdownAST }, { components = [] }) => {
    if (!components.length) {
        return setParentForNonHtmlElements(markdownAST)
    }

    return setParentForComponents(markdownAST, components)
}
