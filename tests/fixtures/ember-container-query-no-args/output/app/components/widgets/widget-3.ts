import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import type { Concert } from '../../data/concert';
import concertData from '../../data/concert';

export default class WidgetsWidget3Component extends Component<{
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}> {
  @tracked concertData = {} as Concert;

  constructor(owner: unknown, args: {}) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.concertData = concertData;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget3': typeof WidgetsWidget3Component;
    'widgets/widget-3': typeof WidgetsWidget3Component;
  }
}
