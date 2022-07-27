import { IViewOptions, LocalStorageItems } from "../utils/types";

export default class LocalStorage {
    getStore(): LocalStorageItems | null {
        const item = localStorage.getItem('store');
        return (item) ? JSON.parse(item) : null;
    }

    setStore(store: LocalStorageItems) {
        localStorage.setItem('store', JSON.stringify(store));
    }

    getSettings(): IViewOptions | null {
        const item = localStorage.getItem('settings');
        return (item) ? JSON.parse(item) : null;
    }

    setSettings(settings: IViewOptions) {
        localStorage.setItem('settings', JSON.stringify(settings));
    }

    clearStore() {
        localStorage.removeItem('store');
    }

    clearSettings() {
        localStorage.removeItem('settings');
    }
}