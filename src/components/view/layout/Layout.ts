import createElement from "@/components/abstract/createElement";
import LayoutItem from "@/components/abstract/LayoutItem";
import './layout.scss';

export default class Layout extends LayoutItem {
    header: HTMLElement;
    filters: HTMLElement;
    goods: HTMLElement;
    footer: HTMLElement;
    sorts: HTMLElement;

    constructor(parent: HTMLElement = document.body) {

        const block = createElement({ tag: 'div', styles: '' });
        const header = createElement({ tag: 'header', styles: 'store_header bg-secondary text-secondary px-4 mb-4 text-center' });
        const container = createElement({ tag: 'div', styles: 'container' });

        const main = createElement({ tag: 'div', styles: 'store_main' });
        const filters = createElement({ tag: 'div', styles: 'store_filters' });

        const rughtCol = createElement({ tag: 'div', styles: 'store_goods' });
        const sorts = createElement({ tag: 'div', styles: 'store_sorts' });
        const goods = createElement({ tag: 'div', styles: 'store_items' });

        rughtCol.append(sorts, goods);
        main.append(filters, rughtCol);

        const footer = createElement({ tag: 'div', styles: 'store_footer' });

        container.append(main, footer);
        block.append(header, container);

        super(parent, block);

        this.header = header;
        this.filters = filters;
        this.sorts = sorts;
        this.goods = goods;
        this.footer = footer;
    }
}