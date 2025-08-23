import moment from 'moment';

export default (type, current: any, list: any[]) => {
  const currentMoment = moment(current).format('YYYY-MM-DD');
  let dataStyle = {
    open: false,
    first: false,
    last: false,
    caseNo: '',
  };

  list.forEach((item: any) => {
    const startTime = moment(item.startTime).format('YYYY-MM-DD');
    const endTime = moment(item.endTime).format('YYYY-MM-DD');

    if (currentMoment >= startTime && currentMoment <= endTime) {
      dataStyle = {
        open: true,
        first: currentMoment === startTime,
        last: currentMoment === endTime,
        caseNo: item.caseNo,
      };
    }
  });
  return dataStyle;
};
