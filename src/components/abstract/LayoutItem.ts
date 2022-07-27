export default class LayoutItem {
    node: HTMLElement;
    constructor(parent: HTMLElement, content: HTMLElement ){
        parent.append(content);
        this.node = content;
    }
}