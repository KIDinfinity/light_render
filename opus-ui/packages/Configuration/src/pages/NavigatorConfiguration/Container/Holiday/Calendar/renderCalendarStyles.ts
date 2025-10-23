import moment from 'moment';

export default (type, current: any, list: any[], value) => {
  const currentMoment = moment(current).format('YYYY-MM-DD');
  const currentMonth = moment(current).format('YYYY-MM');
  const absoluteMonth = moment(value).format('YYYY-MM');

  let dataStyle = {
    open: false,
    first: false,
    last: false,
    caseNo: '',
  };

  list.forEach((item: any) => {
    const start_day = moment(item.start_day).format('YYYY-MM-DD');
    const end_day = moment(item.end_day).format('YYYY-MM-DD');

    if (currentMoment >= start_day && currentMoment <= end_day && currentMonth === absoluteMonth) {
      dataStyle = {
        open: true,
        first: currentMoment === start_day,
        last: currentMoment === end_day,
        caseNo: item.caseNo,
      };
    }
  });
  return dataStyle;
};
