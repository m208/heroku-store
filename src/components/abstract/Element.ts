import { CrElementOptions } from "../utils/types";

export default class Elem <T extends HTMLElement> {
    element: T;
    constructor (options: CrElementOptions){
        this.element = <T>document.createElement(options.tag);
        if(options.styles) this.element.classList.add(...options.styles.split(' '));
        if(options.caption) this.element.textContent = options.caption;
        if(options.id) this.element.id = options.id;
    }
}