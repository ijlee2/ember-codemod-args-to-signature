import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import musicRevenue from '../../data/music-revenue';
import type { Data, Summary } from '../../utils/components/widgets/widget-2';
import {
  createDataForVisualization,
  createSummariesForCaptions,
} from '../../utils/components/widgets/widget-2';

interface WidgetsWidget2Signature {
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}

export default class WidgetsWidget2Component extends Component<WidgetsWidget2Signature> {
  @tracked data = [] as Data[];
  @tracked summaries = [] as Summary[];

  constructor() {
    super(...arguments);

    this.loadData();
  }

  loadData(): void {
    this.data = createDataForVisualization(musicRevenue);
    this.summaries = createSummariesForCaptions(this.data);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget2': typeof WidgetsWidget2Component;
    'widgets/widget-2': typeof WidgetsWidget2Component;
  }
}
