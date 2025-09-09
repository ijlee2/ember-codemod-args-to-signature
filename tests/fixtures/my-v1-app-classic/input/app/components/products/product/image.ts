import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';
import config from 'docs-app/config/environment';

@tagName('')
export default class TracksComponent extends Component {
  isTestEnvironment = config.environment === 'test';
}
