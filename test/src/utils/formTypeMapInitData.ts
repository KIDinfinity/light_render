import moment from 'moment';

export default (type: number | null, data: any) => {
  if (type === 2) {
    return data?.split(',').length > 1
      ? data.split(',').map((item: any) => moment(item))
      : moment(data);
  }
  if (type === 3) {
    return data?.split(',');
  }
  return data;
};
