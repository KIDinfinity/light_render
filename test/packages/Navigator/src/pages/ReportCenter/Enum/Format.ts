enum Format {
  report_date_time_format_dmyhm = 'report_date_time_format_dmyhm',
  // 2020/01/22 12:20
  // moment(date).format('YYYY/MM/DD HH:mm')
  report_date_format_ymd01 = 'report_date_format_ymd01',
  // 2020/01/22
  // moment(date).format('YYYY/MM/DD')
  report_date_format_ymd02 = 'report_date_format_ymd02',
  // 01/22/2020
  // moment(date).format('MM/DD/YYYY')
  report_date_format_ymd03 = 'report_date_format_ymd03',
  // 22/01/2020
  // moment(date).format('DD/MM/YYYY')
  report_date_format_ym01 = 'report_date_format_ym01',
  // 2020 Jan
  // moment(date).format('YYYY MMM')
  report_date_format_ym02 = 'report_date_format_ym02',
  // 2020/01
  // moment(date).format('YYYY/MM')
  report_date_format_ym03 = 'report_date_format_ym03',
  // Jan-20
  // moment(date).format('MMM-YY')
  report_date_format_md01 = 'report_date_format_md01',
  // 01/22
  // moment(date).format('MM/DD')
  report_date_format_md02 = 'report_date_format_md02',
  // 22-Jan
  // moment(date).format('DD/MMM')
  report_date_format_md03 = 'report_date_format_md03',
  // Jan-22
  // moment(date).format('MMM/DD')
  report_date_format_m01 = 'report_date_format_m01',
  // 01
  // moment(date).format('MM')
  report_date_format_m02 = 'report_date_format_m02',
  // Jan
  // moment(date).format('MMM')
  report_date_format_y01 = 'report_date_format_y01',
  // 2020
  // moment(date).format('YYYY')
  report_date_format_d01 = 'report_date_format_d01',
  // 22
  // moment(date).format('DD')
  report_number_format_amount = 'report_number_format_amount',
}

export default Format;
