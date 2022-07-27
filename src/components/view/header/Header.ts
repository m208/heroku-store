import createElement from "@/components/abstract/createElement";
import LayoutItem from "@/components/abstract/LayoutItem";
import { LocalStorageItems } from "@/components/utils/types";
import './header.scss';

export default class Header extends LayoutItem {
    counters: HTMLElement[] = [];
    constructor(parent: HTMLElement = document.body) {

        const block = createElement({ tag: 'div', styles: 'container' });
        const header = createElement({ tag: 'div', styles: 'd-flex flex-wrap align-items-center justify-content-center justify-content-lg-between' });
        block.append(header);

        const a = document.createElement('a');
        a.classList.add('header_logo');
        a.href = '././';

        const img = document.createElement('img');
        img.src = './pics/logo.png';
        img.width = 330;
        img.classList.add('header_image');
        a.append(img);

        const nav = createElement({ tag: 'div', styles: 'text-end header_counters' });
        const headLinks = ['Wish list', 'Cart'];

        const badges: HTMLElement[] = [];
        headLinks.forEach(item => {
            const button = createElement({ tag: 'button', styles: 'btn btn-outline-light me-3 position-relative', caption: item });
            const badge = createElement({ tag: 'span', styles: 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger', caption: '0' });
            button.append(badge);
            nav.append(button);

            badges.push(badge);
        });

        header.append(a, nav);
        super(parent, block);

        this.counters = badges;
    }

    redrawCounters(store: LocalStorageItems) {
        this.counters[0].textContent = '' + store.favorites.length;
        this.counters[1].textContent = '' + store.cart.length;
    }
}