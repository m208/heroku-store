
export const FiltersPickNames: { [index: string]: string } = {
    brand: 'Brand',
    type: 'Category',
    size: 'Frame size',
};

export const FiltersRangeNames: { [index: string]: string } = {
    cost: 'Cost',
    flightTime: 'Flight time',
};

export const FiltersSingleParam: { [index: string]: string } = {
    topRated: 'Top rated',
    popular: 'Popular',
};

export const FiltersSortNames: { [index: string]: string } = {
    name: 'By name',
    cost: 'By cost',
    rating: 'By rating',
    flightTime: 'By flight time',
};

export const CardItemParams = {
    type: { name: 'Type', units: '' },
    size: { name: 'Frame size', units: '' },
    flightTime: { name: 'Flight time', units: 'min' },
    cost: { name: 'Cost', units: '$' },
};

export const ResetButtons: { [index: string]: string } = {
    filters: 'Reset filters',
    settings: 'Reset settings',
};