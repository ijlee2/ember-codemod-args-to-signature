import templateOnlyComponent from '@ember/component/template-only';

interface TracksTableSignature {
  Args: {
    tracks: unknown;
  };
  Element: HTMLTableElement;
}

const TracksTableComponent =
  templateOnlyComponent<TracksTableSignature>();

export default TracksTableComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Tracks::Table': typeof TracksTableComponent;
    'tracks/table': typeof TracksTableComponent;
  }
}
