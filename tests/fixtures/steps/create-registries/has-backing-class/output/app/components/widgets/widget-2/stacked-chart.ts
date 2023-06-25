import Component from '@glimmer/component';

import type { Data } from '../../../utils/components/widgets/widget-2';

interface WidgetsWidget2StackedChartSignature {
  Args: {
    data: Data[];
  }
}

export default class WidgetsWidget2StackedChartComponent extends Component<WidgetsWidget2StackedChartSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget2::StackedChart': typeof WidgetsWidget2StackedChartComponent;
    'widgets/widget-2/stacked-chart': typeof WidgetsWidget2StackedChartComponent;
  }
}
