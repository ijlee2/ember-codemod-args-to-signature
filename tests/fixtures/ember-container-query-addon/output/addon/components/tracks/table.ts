import templateOnlyComponent from '@ember/component/template-only';

interface TracksTableSignature {
  Args: {
    tracks: unknown;
  };
}

const TracksTable =
  templateOnlyComponent<TracksTableSignature>();

export default TracksTable;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Tracks::Table': typeof TracksTable;
    'tracks/table': typeof TracksTable;
  }
}
