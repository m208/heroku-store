import LayoutItem from "../abstract/LayoutItem";
import { TRange } from "../utils/types";

export default class RangeInput extends LayoutItem {
    node: HTMLInputElement;

    constructor(parent: HTMLElement = document.body, value: string, range: TRange) {
        const block = document.createElement("input");

        const classes = 'form-control filters-range-input mb-2';
        block.classList.add(...classes.split(' '));

        block.setAttribute('type', 'number');
        block.setAttribute('min', '' + range.min);
        block.setAttribute('max', '' + range.max);

        block.value = value;

        super(parent, block);

        this.node = block;

    }

}