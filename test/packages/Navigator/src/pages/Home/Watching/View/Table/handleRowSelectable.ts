import lodash from 'lodash';
import { produce } from 'immer';

export default ({ record, index, dataSource = [], stateOfSearch }: any) => {
  return produce(stateOfSearch, draft => {
    const { selectable } = draft
    if (dataSource[index - 1]) {
      lodash.set(selectable, 'prev.id', dataSource[index - 1].taskId);
      lodash.set(selectable, 'prev.index', index - 1);
    } else {
      lodash.set(selectable, 'prev.id', null);
      lodash.set(selectable, 'prev.index', null);
    }

    lodash.set(selectable, 'current.id', record.taskId);
    lodash.set(selectable, 'current.index', index);

    if (dataSource[index + 1]) {
      lodash.set(selectable, 'next.id', dataSource[index + 1].taskId);
      lodash.set(selectable, 'next.index', index + 1);
    } else {
      lodash.set(selectable, 'next.id', null);
      lodash.set(selectable, 'next.index', null);
    }
  })
};
