import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { containerQuery, type Dimensions } from 'ember-container-query';

import { findBestFittingImage } from '../../../../utils/components/widgets/widget-3';

export default class WidgetsWidget3TourScheduleResponsiveImageComponent extends Component<{
  Args: {};
  Blocks: {
    default: [];
  };
  Element: null;
}> {
  @tracked imageSource?: string;

  @action setImageSource({ dimensions }: { dimensions: Dimensions }): void {
    const { images } = this.args;

    this.imageSource = findBestFittingImage(images, dimensions);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget3::TourSchedule::ResponsiveImage': typeof WidgetsWidget3TourScheduleResponsiveImageComponent;
    'widgets/widget-3/tour-schedule/responsive-image': typeof WidgetsWidget3TourScheduleResponsiveImageComponent;
  }
}
