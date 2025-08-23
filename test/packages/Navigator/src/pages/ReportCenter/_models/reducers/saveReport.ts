import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';

export default (state: any, action: any) => {
  const { tableReport } = action.payload;
  const { rows = [] } = tableReport;
  return {
    ...state,
    tableReport: {
      ...tableReport,
      rows: lodash.map(rows, (item: any) => ({
        ...item,
        cc_key: uuidv4(),
      })),
    },
  };
};
