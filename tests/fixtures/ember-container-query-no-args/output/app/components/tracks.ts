import Component from '@glimmer/component';

export default class TracksComponent extends Component<{
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Tracks': typeof TracksComponent;
    'tracks': typeof TracksComponent;
  }
}
