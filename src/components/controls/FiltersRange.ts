import { createListOptions, TRange } from "@/components/utils/types";
import Slider from "../rangeSlider/Slider";
import FiltersGroup from "./FiltersGroup";
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import RangeInput from "./RangeInput";


export default class FiltersRange extends FiltersGroup {
    slider: Slider;
    inputMin: HTMLInputElement;
    inputMax: HTMLInputElement;
    realRange: TRange;

    constructor(parent: HTMLElement = document.body,
        options: Pick<createListOptions, 'header' | 'range'>,
        preInited: TRange,
        callback: (name: string, range: TRange) => void
    ) {
        super(parent, { header: options.header });

        const sliderDiv: noUiSlider.target = document.createElement('div');
        sliderDiv.classList.add('slider-round', 'mb-2', 'mt-2');

        const inputsDiv = document.createElement('div');
        inputsDiv.classList.add('filters-range-inputs');

        this.inputMin = new RangeInput(inputsDiv, '' + options.range.min, options.range).node;
        this.inputMax = new RangeInput(inputsDiv, '' + options.range.max, options.range).node;

        const sliderOnChange = (handle: number, value: number) => {
            const input = ((handle === 0) ? this.inputMin : this.inputMax);
            if (input) {
                input.value = '' + value;
                callback('name', { min: +this.inputMin.value, max: +this.inputMax.value });
            }
        };

        this.slider = new Slider(sliderDiv, options.range, sliderOnChange);



        this.group.append(sliderDiv, inputsDiv);

        const inputOnChange = () => { this.slider.set(+this.inputMin.value, +this.inputMax.value); };
        this.inputMin.oninput = () => { inputOnChange(); };
        this.inputMax.oninput = () => { inputOnChange(); };

        this.realRange = options.range;
        this.setPreInited(preInited);
    }

    setPreInited(preInited: TRange) {
        if (preInited.min === -Infinity && preInited.max === Infinity) {
            preInited = this.realRange;
        }

        this.slider.set(+preInited.min, +preInited.max);
    }
}