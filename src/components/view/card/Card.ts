import createElement from "@/components/abstract/createElement";
import LayoutItem from "@/components/abstract/LayoutItem";
import { CardItemParams } from "@/components/utils/constants";
import { ItemStoreState, StoreItemData } from "@/components/utils/types";
import './card.scss';

const buttonsCaption = {
    favorites: {
        default: { icon: 'bi-heart', text: '' },
        active: { icon: 'bi-heart-fill', text: '' }
    },
    cart: {
        default: { icon: 'bi-cart-plus', text: ' Add to cart' },
        active: { icon: 'bi-cart-check-fill', text: ' Added to cart' }
    },
};

export default class Card extends LayoutItem {
    buttons: HTMLElement[] = [];
    card!: HTMLElement;
    constructor(
        parent: HTMLElement = document.body,
        data: StoreItemData,
        store: ItemStoreState,
        callback: (id: string, action: string) => void
    ) {
        const block = document.createElement('div');
        block.classList.add('card', 'goods-card');

        if (store.cart) block.classList.add('card_active');

        const imgs = document.createElement('div');
        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = data.photoUrl;
        img.alt = 'Drone photo';

        const img2 = document.createElement('img');
        img2.classList.add('card-img-top', 'd-none');
        img2.src = data.photoUrlSecondary;
        img2.alt = 'Drone photo';

        imgs.append(img, img2);

        const imgOn = () => {
            if (data.photoUrlSecondary) {
                img.classList.toggle('d-none');
                img2.classList.toggle('d-none');
            }
        };
        const imgOut = () => {
            if (data.photoUrlSecondary) {
                img.classList.toggle('d-none');
                img2.classList.toggle('d-none');
            }
        };
        img.onmouseover = imgOn;
        img2.onmouseover = imgOn;
        img.onmouseleave = imgOut;
        img2.onmouseleave = imgOut;

        const content = document.createElement('div');
        content.classList.add('card_content');

        const header = document.createElement('h6');
        header.classList.add('card_content_header');
        header.textContent = `${data.brand} ${data.name}`;
        header.title = data.descrLong;

        const list = document.createElement('ul');
        list.classList.add('list-group', 'list-group-flush', 'card_list');

        Object.entries(CardItemParams).forEach(([key, value]) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.textContent = `${value.name}: ${data[key]} ${value.units ? value.units : ''} `;
            list.append(listItem);
        });

        list.append(Card.createRatingListItem(data));

        const buttons = document.createElement('div');
        buttons.classList.add('d-flex', 'card_buttons', 'w-100', 'mt-2');

        const buttonElements: HTMLElement[] = [];

        Object.keys(buttonsCaption).forEach(button => {
            const buttonAddtoCart = document.createElement('a');

            const i = button as keyof typeof store;
            let active = store[i];
            const set = active ? 'active' : 'default';
            const wideButton = (i === 'cart') ? 'w-100' : 'me-2';

            const bttnStyle = active ? 'btn-danger' : 'btn-outline-dark';
            buttonAddtoCart.classList.add('btn', bttnStyle, wideButton, 'card_button');

            const pic = document.createElement('i');
            pic.classList.add('bi', buttonsCaption[i][set].icon);
            const text = createElement({ tag: 'span', styles: 'card_button_text', caption: buttonsCaption[i][set].text });
            pic.append(text);
            buttonAddtoCart.append(pic);

            buttons.append(buttonAddtoCart);

            buttonAddtoCart.onclick = () => {
                active = !active;
                const set = active ? 'active' : 'default';
                text.textContent = buttonsCaption[i][set].text;

                pic.classList.toggle(buttonsCaption[i]['active'].icon);
                pic.classList.toggle(buttonsCaption[i]['default'].icon);

                buttonAddtoCart.classList.toggle('btn-danger');
                buttonAddtoCart.classList.toggle('btn-outline-dark');

                if (i === 'cart') block.classList.toggle('card_active');

                callback(data.name, button);
            };

            buttonElements.push(buttonAddtoCart);
        });

        content.append(header, list, buttons);
        block.append(imgs, content);

        super(parent, block);
        this.buttons = buttonElements;
        this.card = block;
    }

    // should be reworked
    resetButtonsState() {

        this.card.classList.remove('card_active');

        this.buttons.forEach(button => {
            button.classList.remove('btn-danger');
            button.classList.add('btn-outline-dark');
        });

        Array.from(this.buttons[0].getElementsByTagName('i'))
            .forEach(pic => {
                pic.innerHTML = `<span class="card_button_text"> ${buttonsCaption.favorites.default.text}</span>`;
                pic.classList.remove(buttonsCaption.favorites.active.icon);
                pic.classList.add(buttonsCaption.favorites.default.icon);
            });

        Array.from(this.buttons[1].getElementsByTagName('i'))
            .forEach(pic => {
                pic.innerHTML = `<span class="card_button_text"> ${buttonsCaption.cart.default.text}</span>`;
                pic.classList.remove(buttonsCaption.cart.active.icon);
                pic.classList.add(buttonsCaption.cart.default.icon);
            });
    }

    static createRatingListItem(item: StoreItemData) {
        const ratingItemWrapper = document.createElement('li');
        ratingItemWrapper.classList.add('list-group-item');
        const ratingItem = document.createElement('span');
        ratingItem.setAttribute('role', 'button');

        for (let i = 0; i < 5; i++) {
            const star = document.createElement('i');
            const color = (+item.rating > i) ? 'text-warning' : 'text-secondary';
            star.classList.add('bi-star-fill', color);
            ratingItem.append(star);
        }
        ratingItem.append(createElement({ tag: 'span', styles: 'm-1', caption: `(${item.reviews || '0'})` }));

        ratingItemWrapper.append(ratingItem);

        return ratingItemWrapper;
    }
}
