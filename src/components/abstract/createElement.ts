import { CrElementOptions } from "../utils/types";



export default function createElement(options: CrElementOptions) {

    const element = document.createElement(options.tag);
    if (options.styles) options.styles.trim().split(' ').forEach(style => element.classList.add(style));
    if (options.caption) element.textContent = options.caption;
    if (options.id) element.id = options.id;

    return element;
}