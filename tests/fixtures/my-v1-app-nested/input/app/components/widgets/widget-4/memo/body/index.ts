import Component from '@glimmer/component';
import type { QueryResults } from 'ember-container-query';

const Body = class extends Component<{
  cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
}> {}

export default Body;
