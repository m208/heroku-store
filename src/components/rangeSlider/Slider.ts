import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { TRange } from '../utils/types';
import './slider.scss';

export default class Slider {
    slider: noUiSlider.API | null = null;
    constructor(
        element: noUiSlider.target,
        range: TRange,
        callback: (handler: number, value: number) => void
    ) {

        noUiSlider.create(element, {
            start: [range.min, range.max],
            connect: true,
            range: {
                'min': +range.min,
                'max': +range.max
            }
        });

        if (element.noUiSlider) {
            element.noUiSlider.on('update', (values, handle, unencoded) => {
                callback(handle, Math.trunc(unencoded[handle]));
            });

            this.slider = element.noUiSlider;
        }
    }

    set(min: number, max: number) {
        if (this.slider) this.slider.set([min, max]);
    }

}