import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { containerQuery, type Dimensions } from 'ember-container-query';

import type { Image } from '../../../../../data/concert';
import { findBestFittingImage } from '../../../../../utils/components/widgets/widget-3';

interface ResponsiveImageArgs {
  images: Image[];
}

export default class WidgetsWidget3TourScheduleResponsiveImageComponent extends Component<ResponsiveImageArgs> {
  @tracked imageSource?: string;

  @action setImageSource({ dimensions }: { dimensions: Dimensions }): void {
    const { images } = this.args as ResponsiveImageArgs;

    this.imageSource = findBestFittingImage(images, dimensions);
  }
}
