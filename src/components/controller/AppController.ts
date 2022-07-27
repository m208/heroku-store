import AppModel from "../model/AppModel";
import { isRange } from "../utils/guards";
import { IViewOptions, LocalStorageItems, SortTypes, StoreItemData, TCallBackDrawData, TRange } from "../utils/types";
import AppView from "../view/AppView";


export default class AppController {

    model: AppModel;
    view!: AppView;

    state: IViewOptions;

    constructor(model: AppModel) {
        this.model = model;
        this.state = model.getLocalSettings();
    }


    getData(options: IViewOptions, callback: TCallBackDrawData) {
        const data: StoreItemData[] = this.model.getData(options);
        const storage: LocalStorageItems = this.model.getLocalStore();
        callback(data, storage);
    }

    applyReset(item: string, drawData: TCallBackDrawData, redrawFilters: () => void, redrawSort: () => void) {
        if (item === 'filters') this.resetFilters(drawData, redrawFilters);
        if (item === 'settings') this.resetSettings(drawData, redrawFilters, redrawSort);
    }

    resetFilters(drawData: TCallBackDrawData, redrawFilters: () => void) {
        const sortSettings = this.state.sort;
        this.state = JSON.parse(JSON.stringify(this.model.defaultSettings));
        this.state.sort = sortSettings;
        this.applySetOfFilters(drawData);
        redrawFilters();
    }

    resetSettings(callback: TCallBackDrawData, redrawFilters: () => void, redrawSort: () => void) {
        this.state = JSON.parse(JSON.stringify(this.model.defaultSettings));

        this.model.localStorage.clearStore();
        this.view.drawCounters({ cart: [], favorites: [] });

        this.applySetOfFilters(callback);
        this.view.resetCardButtons();
        redrawFilters();
        redrawSort();
    }

    applySetOfFilters(callback: TCallBackDrawData) {
        this.getData(this.state, callback);
        this.model.localStorage.setSettings(this.state);
    }

    applySearch(query: string, callback: TCallBackDrawData) {
        this.state.search = query;
        this.applySetOfFilters(callback);
    }

    applySort(type: SortTypes, callback: TCallBackDrawData) {
        this.state.sort = type;
        this.applySetOfFilters(callback);
    }

    applyFilterByCategory(name: string, value: string, callback: TCallBackDrawData) {
        let tags = this.state.filters[name];

        if (!tags) tags = [value];

        else if (!isRange(tags) && tags.includes(value)) {
            tags = tags.filter((el: string) => (el !== value));
        } else if (!isRange(tags)) {
            tags.push(value);
        }

        this.state.filters[name] = tags;

        this.applySetOfFilters(callback);
    }

    applyFiltersByCheckBox(name: string, callback: TCallBackDrawData) {
        if (this.state.filtersBySingle.includes(name)) {

            this.state.filtersBySingle = this.state.filtersBySingle
                .filter((el: string) => (el !== name));
        }
        else this.state.filtersBySingle.push(name);

        this.applySetOfFilters(callback);
    }

    applyFiltersByRange(name: string, value: TRange, callback: TCallBackDrawData) {
        this.state.filters[name] = value;
        this.applySetOfFilters(callback);
    }

    updateStore(name: string, action: string) {
        const cartItems = this.model.getLocalStore().cart;

        if (action === 'cart' && cartItems.length > 19 && !cartItems.includes(name)) {
            this.view.showModal();
            const redrawCards = (d: StoreItemData[], s: LocalStorageItems) => this.view.drawItems(d, s, false);   // force redraw cards
            this.getData(this.state, redrawCards);  // redraw to unset 'added to cart' style =(  //Fix it!

        } else {
            this.model.setLocalStore(name, action);
            this.view.drawCounters(this.model.getLocalStore());
        }

    }
}
