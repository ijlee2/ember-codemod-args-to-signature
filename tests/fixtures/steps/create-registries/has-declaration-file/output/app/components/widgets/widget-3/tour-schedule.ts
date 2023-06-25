import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget3TourScheduleSignature {
  Args: {};
}

const WidgetsWidget3TourScheduleComponent =
  templateOnlyComponent<WidgetsWidget3TourScheduleSignature>();

export default WidgetsWidget3TourScheduleComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget3::TourSchedule': typeof WidgetsWidget3TourScheduleComponent;
    'widgets/widget-3/tour-schedule': typeof WidgetsWidget3TourScheduleComponent;
  }
}
