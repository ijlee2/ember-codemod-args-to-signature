import Component from '@glimmer/component';

export default class TracksListComponent extends Component<{
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}> {
  get numColumns(): number {
    const { numColumns } = this.args;

    return numColumns ?? 1;
  }

  get numRows(): number {
    const { tracks } = this.args;

    if (!tracks) {
      return 0;
    }

    return Math.ceil(tracks.length / this.numColumns);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Tracks::List': typeof TracksListComponent;
    'tracks/list': typeof TracksListComponent;
  }
}
