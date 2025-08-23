import {v4 as uuidv4 } from 'uuid';
import lodash from 'lodash';

export default (caseNo: string, calendarDate: string) => {
  return {
    id: uuidv4(),
    caseNo,
    sortOrder: 1234,
    startTime: !lodash.isEmpty(calendarDate) ? `${calendarDate} 08:30:00` : '',
    endTime: !lodash.isEmpty(calendarDate) ? `${calendarDate} 18:30:00` : '',
    reason: '',
  };
};
