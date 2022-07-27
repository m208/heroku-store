import createElement from "@/components/abstract/createElement";
import LayoutItem from "@/components/abstract/LayoutItem";

export default class Modal extends LayoutItem {
    constructor(parent: HTMLElement = document.body) {

        const block = createElement({ tag: 'div', styles: 'modal fade py-5' });
        block.innerHTML = `
        <div class="modal-dialog" >
            <div class="modal-content rounded-4 shadow">
                <div class="modal-header border-bottom-0">
                </div>
                <div class="modal-body flex-column py-0">
                <h6 class="text-center">20 items are already in the cart. Time to buy!</h6>
                </div>
                <div class="modal-footer flex-column border-top-0">
                <button type="button" class="btn btn-lg btn-light w-100 mx-0" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
       </div>`;

        super(parent, block);
    }
}

