import templateOnlyComponent from '@ember/component/template-only';

import type { Track } from '../data/album';

interface TracksSignature {
  Args: {
    tracks?: Track[];
  };
  Element: HTMLElement;
}

const TracksComponent = templateOnlyComponent<TracksSignature>();

export default TracksComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    Tracks: typeof TracksComponent;
  }
}
