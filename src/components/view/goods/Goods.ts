import createElement from "@/components/abstract/createElement";
import LayoutItem from "@/components/abstract/LayoutItem";
import './goods.scss';

export default class Goods extends LayoutItem {
    constructor(parent: HTMLElement = document.body) {
        const block = createElement({tag:'div', styles:'goods'}); 
        super(parent, block);
    }
}