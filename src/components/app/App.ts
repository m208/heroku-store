import AppController from "../controller/AppController";
import AppModel from "../model/AppModel";
import { LocalStorageItems, StoreItemData } from "../utils/types";
import AppView from "../view/AppView";

export default class App {
    model: AppModel;
    view!: AppView;
    controller!: AppController;

    constructor() {
        this.model = new AppModel();
    }

    async start() {
        await this.model.loadData();

        this.controller = new AppController(this.model);
        this.view = new AppView(this.model, this.controller);

        this.controller.getData(this.controller.state, (data: StoreItemData[], store: LocalStorageItems) => {
            this.view.drawCounters(store);
            this.view.drawItems(data, store);
            this.view.setSearchFocus();
        });
    }

}

