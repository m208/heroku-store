import createElement from "../abstract/createElement";
import { FiltersSortNames } from "../utils/constants";
import { createListOptions, SortTypes } from "../utils/types";
import FiltersGroup from "./FiltersGroup";

export default class FiltersSort extends FiltersGroup {
    buttons: HTMLElement[] = [];

    constructor(
        parent: HTMLElement = document.body,
        options: Pick<createListOptions, 'header' | 'buttons'>,
        callback: (name: string, value: SortTypes) => void
    ) {
        super(parent, { header: options.header });

        const list = createElement({ tag: 'ul', styles: 'btn-toggle-nav list-unstyled fw-normal pb-1 small' });
        this.group.append(list);

        for (const item of options.buttons) {

            const listItem = createElement({ tag: 'li', styles: 'mb-1' });
            const button = createElement({ tag: 'a', styles: 'link-dark d-inline-flex text-decoration-none rounded', caption: FiltersSortNames[item] });
            const buttonArrow = createElement({ tag: 'i', styles: 'bi bi-sort-up px-1' });
            button.append(buttonArrow);

            listItem.append(button);
            list.append(listItem);

            let dirIsUp = true;

            button.onclick = () => {
                dirIsUp = !dirIsUp;

                this.buttons.forEach(b => b.classList.remove('filter_active'));
                button.classList.add('filter_active');

                buttonArrow.classList.toggle('bi-sort-up');
                buttonArrow.classList.toggle('bi-sort-down');

                const sort: SortTypes = (dirIsUp) ? { [item]: 'Asc' } : { [item]: 'Desc' };
                callback('sort', sort);
            };

            this.buttons.push(button);
        }

        this.buttons[0].classList.add('filter_active');

    }
}