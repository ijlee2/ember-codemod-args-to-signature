import Component from '@glimmer/component';

interface TracksSignature {
  Args: {};
}

export default class TracksComponent extends Component<TracksSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Tracks': typeof TracksComponent;
    'tracks': typeof TracksComponent;
  }
}
