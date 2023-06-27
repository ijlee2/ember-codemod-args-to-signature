import templateOnlyComponent from '@ember/component/template-only';

interface TracksSignature {
  Args: {};
  Element: HTMLElement;
}

const TracksComponent =
  templateOnlyComponent<TracksSignature>();

export default TracksComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Tracks': typeof TracksComponent;
    'tracks': typeof TracksComponent;
  }
}
