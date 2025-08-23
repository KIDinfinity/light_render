import DurationFormat from './DurationFormat';

export default {
  year: [DurationFormat.report_duration_format_y, DurationFormat.report_duration_format_ym],
  month: [
    DurationFormat.report_duration_format_mon,
    DurationFormat.report_duration_format_ym,
    DurationFormat.report_duration_format_md,
  ],
  day: [
    DurationFormat.report_duration_format_d,
    DurationFormat.report_duration_format_dh,
    DurationFormat.report_duration_format_dhm,
    DurationFormat.report_duration_format_md,
    DurationFormat.report_duration_format_day_ceil,
  ],
  hour: [
    DurationFormat.report_duration_format_h,
    DurationFormat.report_duration_format_dh,
    DurationFormat.report_duration_format_hm,
    DurationFormat.report_duration_format_dhm,
    DurationFormat.report_duration_format_hms,
  ],
  minute: [
    DurationFormat.report_duration_format_min,
    DurationFormat.report_duration_format_hm,
    DurationFormat.report_duration_format_dhm,
    DurationFormat.report_duration_format_hms,
    DurationFormat.report_duration_format_ms,
    DurationFormat.report_duration_format_m,
  ],
  second: [
    DurationFormat.report_duration_format_hms,
    DurationFormat.report_duration_format_ms,
    DurationFormat.report_duration_format_s,
  ],
};
