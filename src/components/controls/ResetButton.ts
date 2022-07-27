
import createElement from "../abstract/createElement";
import LayoutItem from "../abstract/LayoutItem";
import { TResetCb } from "../utils/types";


export default class ResetButton extends LayoutItem {

    constructor(
        parent: HTMLElement = document.body,
        name: string, title: string,
        callback: TResetCb
    ) {
        const block = createElement({ tag: 'div', styles: '' });
        const button = createElement({ tag: 'button', styles: 'btn btn-outline-dark w-100 mb-3', caption: title });

        button.onclick = () => {
            button.blur();
            callback(name);
        };

        block.append(button);

        super(parent, block);

    }


}

