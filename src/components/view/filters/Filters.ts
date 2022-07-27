import createElement from "@/components/abstract/createElement";
import LayoutItem from "@/components/abstract/LayoutItem";
import './filters.scss';
import FiltersPick from "@/components/controls/FiltersPick";
import FiltersRange from "@/components/controls/FiltersRange";
import { Tcb, TFilterCb, TFilterCbCb, TFilterRangeCb, TRange, TResetCb } from "@/components/utils/types";
import AppModel from "@/components/model/AppModel";
import { FiltersPickNames, FiltersRangeNames, FiltersSingleParam, ResetButtons } from "@/components/utils/constants";
import { isRange } from "@/components/utils/guards";
import FiltersCheckBox from "@/components/controls/FiltersCheckBox";
import ResetButton from "@/components/controls/ResetButton";

export default class Filters extends LayoutItem {
    categories: FiltersPick[] = [];
    checkBoxes: FiltersCheckBox[] = [];
    ranges: FiltersRange[] = [];

    constructor(
        parent: HTMLElement = document.body,
        model: AppModel,
        callbacks: Map<string, Tcb>
    ) {

        const resetCB = <TResetCb>callbacks.get('reset');
        const filterBoxCB = <TFilterCbCb>callbacks.get('filterCheckbox');
        const filterCategoryCB = <TFilterCb>callbacks.get('filterCategory');
        const filterRangeCB = <TFilterRangeCb>callbacks.get('filterRange');

        const block = createElement({ tag: 'div', styles: 'flex-shrink-0 px-3 bg-white' });
        const title = createElement({ tag: 'span', styles: 'd-flex align-items-center pb-2 mb-1 link-dark text-decoration-none border-bottom' });
        title.append(createElement({ tag: 'span', styles: 'fs-5 fw-semibold', caption: 'Browse:' }));
        const list = createElement({ tag: 'ul', styles: 'list-unstyled ps-0' });

        block.append(list);
        list.append(title);

        const local = model.getLocalSettings();

        const tags = model.getTagSources();
        const catElements: FiltersPick[] = [];

        for (const item in FiltersPickNames) {
            const filter = local.filters[<keyof typeof local.filters>item];
            const preInited: string[] = !isRange(filter) ? filter : [];

            const element = new FiltersPick(
                list,
                { header: FiltersPickNames[item], buttons: tags[item].sort() },
                preInited,
                (name, value) => filterCategoryCB(item, value));

            catElements.push(element);
        }

        list.append(createElement({ tag: 'li', styles: 'border-top my-2' }));

        const checkbElements: FiltersCheckBox[] = [];

        for (const [key, value] of Object.entries(FiltersSingleParam)) {
            const preInited = local.filtersBySingle;
            checkbElements.push(new FiltersCheckBox(list, key, value, preInited, filterBoxCB));
        }

        list.append(createElement({ tag: 'li', styles: 'border-top my-2' }));

        const rangeElements: FiltersRange[] = [];

        const ranges = model.getRangeSources();
        for (const item in FiltersRangeNames) {
            const filter = local.filters[<keyof typeof local.filters>item];
            const preInited: TRange = isRange(filter) ? filter : ranges[item];

            const element = new FiltersRange(
                list,
                { header: FiltersRangeNames[item], range: ranges[item] },
                preInited,
                (name, range) => filterRangeCB(item, range));

            rangeElements.push(element);
        }

        list.append(createElement({ tag: 'li', styles: 'border-top my-2 mb-3' }));

        for (const [key, value] of Object.entries(ResetButtons)) {
            new ResetButton(list, key, value, resetCB);
        }

        super(parent, block);

        this.categories = catElements;
        this.checkBoxes = checkbElements;
        this.ranges = rangeElements;

    }

    setPreInitedValues(values: string[], ranges: TRange) {
        this.categories.forEach(item => item.setPreInited(values));
        this.checkBoxes.forEach(item => item.setPreInited(values));
        this.ranges.forEach(item => item.setPreInited(ranges));

    }

}

