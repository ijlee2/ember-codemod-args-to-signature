import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import type { Concert } from '../../data/concert';
import concertData from '../../data/concert';

export default class WidgetsWidget3Component extends Component {
  @tracked concertData = {} as Concert;

  constructor(owner: unknown, args: {}) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.concertData = concertData;
  }
}
