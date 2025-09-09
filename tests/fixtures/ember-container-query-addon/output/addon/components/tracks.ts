import templateOnlyComponent from '@ember/component/template-only';

interface TracksSignature {
  Args: {
    tracks: unknown;
  };
}

const Tracks =
  templateOnlyComponent<TracksSignature>();

export default Tracks;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Tracks': typeof Tracks;
    'tracks': typeof Tracks;
  }
}
