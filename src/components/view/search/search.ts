import LayoutItem from "@/components/abstract/LayoutItem";
import './search.scss';

export default class SearchBox extends LayoutItem {

    constructor(parent: HTMLElement, callback: (query: string) => void) {
        const input = document.createElement('input');
        input.type = 'search';
        input.classList.add(...'form-control py-2 border sort_search'.split(' '));
        input.placeholder = `Search...`;

        input.oninput = () => { callback(input.value); };
        super(parent, input);
    }
}