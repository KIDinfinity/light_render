import lodash from 'lodash';
import moment from 'moment';

export const getRadioDateListDicts = ({ therapeuticMonthList, duplicateMonthList }: any) => lodash
  .chain(therapeuticMonthList || [])
  .reduce((dicts: any, item: any) => {
    const date: any = lodash.head(JSON.parse(item?.therapeuticDateList));
    return lodash.includes(duplicateMonthList, moment(date).format('YYYY-M')) ?
      dicts :
      [...(dicts || []),
      {
        dictName: moment(date).format('YYYY/MM/DD'),
        dictCode: date,
      }]
  }, [])
  .value();

export default getRadioDateListDicts;
