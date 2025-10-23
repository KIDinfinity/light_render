import lodash from 'lodash';
import { LS, LSKey } from '@/utils/cache';

const setPreHistory = () => {
  const { pathname, search } = window.location;

  if (!lodash.includes(pathname, 'task/detail') && !lodash.includes(pathname, 'proposal')) {
    LS.setItem(LSKey.TASK_PRE_HISTORY, `${pathname}${search}`);
  }

  if (!lodash.includes(pathname, 'proposal')) {
    LS.setItem(LSKey.PROPOSAL_PRE_HISTORY, `${pathname}${search}`);
  }
};

export { setPreHistory };
