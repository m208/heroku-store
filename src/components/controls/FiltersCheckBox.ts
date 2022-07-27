
import createElement from "../abstract/createElement";
import LayoutItem from "../abstract/LayoutItem";


export default class FiltersCheckBox extends LayoutItem {
    input: HTMLInputElement | null = null;
    constructor(
        parent: HTMLElement = document.body,
        name: string, title: string,
        preinited: string[],
        callback: (name: string) => void
    ) {
        const block = createElement({ tag: 'div', styles: 'form-check' });
        const label = createElement({ tag: 'label', styles: 'form-check-label', caption: title });
        const input = document.createElement('input');
        input.name = name;
        input.type = 'checkbox';
        input.classList.add('form-check-input');

        input.onchange = () => callback(name);

        label.append(input);
        block.append(label);

        super(parent, block);

        this.input = input;
        this.setPreInited(preinited);
    }

    setPreInited(preinited: string[]) {
        if (this.input) this.input.checked = preinited.includes(this.input.name);
    }

}