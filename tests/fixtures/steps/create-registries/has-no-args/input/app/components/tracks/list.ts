import Component from '@glimmer/component';

interface TracksListSignature {
  Args: {};
}

export default class TracksListComponent extends Component<TracksListSignature> {
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
