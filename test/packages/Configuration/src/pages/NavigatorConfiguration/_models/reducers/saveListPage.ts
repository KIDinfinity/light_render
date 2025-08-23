import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';

export default (state: any, action: any) => {
  const { listPage } = action.payload;
  const { rows = [] } = listPage;

  return {
    ...state,
    listPage: {
      ...listPage,
      rows: lodash.map(rows, (item: any) => ({
        ...item,
        cc_key: uuidv4(),
        key: uuidv4(),
      })),
    },
  };
};
