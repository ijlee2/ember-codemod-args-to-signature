import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

export default class extends Component {
  inputId = guidFor(this);
}
