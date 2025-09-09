import Component from '@glimmer/component';

export default class TracksListComponent extends Component {
  get numColumns(): number {
    const { 'num-columns': numColumns } = this.args;

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
