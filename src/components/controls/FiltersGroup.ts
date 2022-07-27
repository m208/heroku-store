import createElement from "@/components/abstract/createElement";
import LayoutItem from "@/components/abstract/LayoutItem";
import { createListOptions } from "@/components/utils/types";


export default class FiltersGroup extends LayoutItem {
    group: HTMLElement;

    constructor(parent: HTMLElement = document.body, options: Pick<createListOptions, 'header'>) {

        const block = createElement({ tag: 'li', styles: 'mb-0' });
        const header = createElement({ tag: 'h6', styles: 'd-inline-flex mb-1 ms-2', caption: options.header });

        const group = createElement({ tag: 'div' });

        block.append(header, group);

        super(parent, block);
        this.group = group;
    }

}