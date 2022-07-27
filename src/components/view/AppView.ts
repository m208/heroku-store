import * as bootstrap from "bootstrap";
import LayoutItem from "../abstract/LayoutItem";
import AppController from "../controller/AppController";
import Placeholder from "../controls/placeholder";
import AppModel from "../model/AppModel";
import { ItemStoreState, LocalStorageItems, SortTypes, StoreItemData, Tcb, TRange } from "../utils/types";
import Card from "./card/Card";
import Filters from "./filters/Filters";
import Footer from "./footer/Footer";
import Goods from "./goods/Goods";
import Header from "./header/Header";
import Layout from "./layout/Layout";
import Modal from "./modal/modal";
import Sorts from "./sort/sort";

export default class AppView {
    model: AppModel;
    controller: AppController;

    header: Header;
    filters: Filters;
    goods: Goods;
    footer: LayoutItem;

    layout: Layout;
    sorts: Sorts;
    modal: bootstrap.Modal;
    currentlyDisplayed: string = '';
    cards: Card[] = [];

    constructor(model: AppModel, controller: AppController) {
        this.model = model;
        this.controller = controller;
        this.controller.view = this;

        this.layout = new Layout();
        this.header = new Header(this.layout.header);
        this.footer = new Footer(this.layout.footer);
        this.goods = new Goods(this.layout.goods);

        const drawItemsCB = (data: StoreItemData[], storage: LocalStorageItems) => this.drawItems(data, storage);

        const resetFilters = () => {
            this.resetFiltersView();
        };

        const resetAll = () => {
            this.resetFiltersView();
            this.resetSortView();
        };


        const filterCheckbox = (name: string) => {
            this.controller.applyFiltersByCheckBox(name, drawItemsCB);
        };

        const filterCategory = (name: string, value: string) => {
            this.controller.applyFilterByCategory(name, value, drawItemsCB);
        };

        const filterRange = (name: string, value: TRange) => {
            this.controller.applyFiltersByRange(name, value, drawItemsCB);
        };

        const resetButtonsCB = (name: string) => {
            this.controller.applyReset(name, drawItemsCB, resetFilters, resetAll);
        };

        const searchCB = (query: string) => {
            this.controller.applySearch(query, drawItemsCB);
        };

        const sortCB = (type: SortTypes) => {
            this.controller.applySort(type, drawItemsCB);
        };

        const callbacks = new Map<string, Tcb>();
        callbacks.set('filterCategory', filterCategory);
        callbacks.set('filterCheckbox', filterCheckbox);
        callbacks.set('filterRange', filterRange);
        callbacks.set('reset', resetButtonsCB);
        callbacks.set('search', searchCB);
        callbacks.set('sort', sortCB);

        this.filters = new Filters(this.layout.filters, this.model, callbacks);
        this.sorts = new Sorts(this.layout.sorts, this.model, callbacks);
        const modal = new Modal().node;
        this.modal = new bootstrap.Modal(modal);
    }

    drawItems(items: StoreItemData[], storage: LocalStorageItems, check = true) {

        if (check) {    // prevent rendering if all items are same
            if (this.displayedItemsHash(items, storage) === this.currentlyDisplayed) return;
        }

        this.goods.node.innerHTML = '';

        if (items.length == 0) {
            new Placeholder(this.goods.node, `Sorry, nothing found :(`);
        }

        items.forEach(item => {
            const store: ItemStoreState = {
                cart: storage.cart.includes(item.name),
                favorites: storage.favorites.includes(item.name),
            };
            this.cards.push(new Card(
                this.goods.node, item, store,
                (name: string, action: string) => this.controller.updateStore(name, action)));

        });
        this.currentlyDisplayed = this.displayedItemsHash(items, storage);
    }

    displayedItemsHash(items: StoreItemData[], storage: LocalStorageItems) {
        const data = items.map(el => el.name).join('/');
        return data + ' cart: ' + storage.cart + ' favorites: ' + storage.favorites;
    }

    drawCounters(store: LocalStorageItems) {
        this.header.redrawCounters(store);
    }

    resetFiltersView() {
        this.filters.setPreInitedValues([], { min: -Infinity, max: Infinity });
    }
    resetSortView() {
        this.sorts.resetStateToDefault();
    }

    cartButtons() {
        this.sorts.resetStateToDefault();
    }

    showModal() {
        this.modal.show();
    }

    resetCardButtons() {
        this.cards.forEach(card => card.resetButtonsState());
    }

    setSearchFocus() {
        this.sorts.searchBox.node.focus();
    }

}
