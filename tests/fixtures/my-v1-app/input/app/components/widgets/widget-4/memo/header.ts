import Component from '@glimmer/component';
import type { QueryResults } from 'ember-container-query';

const Header = class FooComponent extends Component<{
  cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
}> {}

export default Header;
