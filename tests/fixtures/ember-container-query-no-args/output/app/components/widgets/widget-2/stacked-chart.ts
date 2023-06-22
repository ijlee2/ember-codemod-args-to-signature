import Component from '@glimmer/component';

export default class WidgetsWidget2StackedChartComponent extends Component<{
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget2::StackedChart': typeof WidgetsWidget2StackedChartComponent;
    'widgets/widget-2/stacked-chart': typeof WidgetsWidget2StackedChartComponent;
  }
}
