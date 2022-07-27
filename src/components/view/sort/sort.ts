import createElement from "@/components/abstract/createElement";
import LayoutItem from "@/components/abstract/LayoutItem";
import AppModel from "@/components/model/AppModel";
import { FiltersSortNames } from "@/components/utils/constants";
import { SortTypes, Tcb, TSearchCb, TSortCb } from "@/components/utils/types";
import SearchBox from "../search/search";
import './sort.scss';

const activeClassName = 'filter_active';

export default class Sorts extends LayoutItem {
    buttons: HTMLElement[] = [];
    arrows: HTMLElement[] = [];
    searchBox!: SearchBox;

    constructor(
        parent: HTMLElement,
        model: AppModel,
        callbacks: Map<string, Tcb>
    ) {
        const searchCB = <TSearchCb>callbacks.get('search');
        const sortCB = <TSortCb>callbacks.get('sort');
        if (!searchCB || !sortCB) return;

        const block = createElement({ tag: 'div', styles: 'main_sort' });    //d-flex justify-content-between align-items-center

        const search = createElement({ tag: 'div', styles: 'sort_search' });
        const searchInput = new SearchBox(search, searchCB);

        const sortControls = createElement({ tag: 'div', styles: 'd-flex' });
        const title = createElement({ tag: 'b', styles: 'sort_header', caption: 'Sort items: ' });

        const ul = createElement({ tag: 'ul', styles: 'mb-1 list-group list-group-horizontal list-unstyled ' });

        sortControls.append(title, ul);
        block.append(search, sortControls);

        const sorts = Object.keys(FiltersSortNames);

        const preInited = model.getLocalSettings().sort;
        const buttons: HTMLElement[] = [];
        const arrows: HTMLElement[] = [];

        for (const item of sorts) {
            let activeClass = '';
            let arrowClass = 'bi-sort-up';
            let dirIsUp = true;

            if (item === Object.keys(preInited)[0]) {
                activeClass = activeClassName;
                dirIsUp = (preInited[item] === 'Asc') ? true : false;
                arrowClass = dirIsUp ? 'bi-sort-up' : 'bi-sort-down';
            }

            const listItem = createElement({ tag: 'li', styles: 'mb-1 btn_sort' });
            const button = createElement({ tag: 'a', styles: `${activeClass} link-dark d-inline-flex text-decoration-none rounded me-2 border-bottom sort_button`, caption: FiltersSortNames[item] });
            const buttonArrow = createElement({ tag: 'i', styles: `bi ${arrowClass} px-1 sort_icon` });
            button.setAttribute('name', item);
            button.append(buttonArrow);

            listItem.append(button);
            ul.append(listItem);

            button.onclick = () => {
                dirIsUp = !dirIsUp;

                this.buttons.forEach(b => b.classList.remove(activeClassName));
                button.classList.add(activeClassName);

                buttonArrow.classList.toggle('bi-sort-up');
                buttonArrow.classList.toggle('bi-sort-down');

                const sort: SortTypes = (dirIsUp) ? { [item]: 'Asc' } : { [item]: 'Desc' };
                sortCB(sort);
            };

            buttons.push(button);
            arrows.push(buttonArrow);
        }

        super(parent, block);
        this.buttons = buttons;
        this.arrows = arrows;
        this.searchBox = searchInput;

    }

    resetStateToDefault() {
        this.buttons.forEach(button => {
            button.classList.remove(activeClassName);
        });

        this.buttons[0].classList.add(activeClassName);

        this.arrows.forEach(arrow => {
            arrow.classList.remove('bi-sort-down');
            arrow.classList.add('bi-sort-up');
        });

    }
}