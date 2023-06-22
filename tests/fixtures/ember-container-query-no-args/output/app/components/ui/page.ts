import Component from '@glimmer/component';

export default class UiPageComponent extends Component {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Ui::Page': typeof UiPageComponent;
    'ui/page': typeof UiPageComponent;
  }
}
