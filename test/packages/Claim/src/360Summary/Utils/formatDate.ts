import moment from 'moment';

export default (value?: string | Date) => (value ? moment(value).format('L') : '');
