import templateOnlyComponent from '@ember/component/template-only';
import type { QueryResults } from 'ember-container-query';

interface WidgetsWidget4MemoActionsArgs {
  cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
}

export default templateOnlyComponent<WidgetsWidget4MemoActionsArgs>();
