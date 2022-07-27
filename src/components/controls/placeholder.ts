import createElement from "../abstract/createElement";
import LayoutItem from "../abstract/LayoutItem";

export default class Placeholder extends LayoutItem {

    constructor(parent: HTMLElement = document.body, title: string) {
        const block = createElement({ tag: 'div', styles: '' });
        const text = createElement({ tag: 'h2', styles: '', caption: title });
        block.append(text);
        super(parent, block);

    }


}