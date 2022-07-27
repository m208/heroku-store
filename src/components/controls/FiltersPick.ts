import createElement from "../abstract/createElement";
import { createListOptions } from "../utils/types";
import FiltersGroup from "./FiltersGroup";

export default class FiltersPick extends FiltersGroup {
    buttons: HTMLElement[] = [];
    activeClassName = 'filter_active';

    constructor(
        parent: HTMLElement = document.body,
        options: Pick<createListOptions, 'header' | 'buttons'>,
        preInited: string[],
        callback: (name: string, value: string) => void
    ) {
        super(parent, { header: options.header });

        const list = createElement({ tag: 'ul', styles: 'btn-toggle-nav list-unstyled fw-normal pb-1 small list_item' });
        this.group.append(list);

        for (const item of options.buttons) {

            const listItem = createElement({ tag: 'li', styles: 'mb-0' });
            const button = createElement({ tag: 'a', styles: `link-dark d-inline-flex text-decoration-none rounded`, caption: item });

            button.onclick = () => {
                button.classList.toggle(this.activeClassName);
                callback('name', item);
            };

            this.buttons.push(button);

            listItem.append(button);
            list.append(listItem);

            this.setPreInited(preInited);
        }

    }

    setPreInited(values: string[] = []) {
        this.buttons.forEach(button => {
            button.classList.remove(this.activeClassName);
            if (button.textContent && values.includes(button.textContent))
                button.classList.add(this.activeClassName);
        });
    }
}