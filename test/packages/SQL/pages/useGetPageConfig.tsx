import { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { UrlCodeEnum } from '@/auth/Constant';
import { getAuth } from '@/auth/Utils';

import Import from './Import';
import Query from './Query';
import List from './List';
import Patch from './Patch';
import Check from './UploadCheck';

export default () => {
  const dispatch = useDispatch();
  const commonAuthorityList = useSelector((state: any) => state.authController.commonAuthorityList);

  return useMemo(() => {
    const memu = [
      {
        key: 'import',
        desc: 'Import SQL',
        component: Import,
        show: getAuth(commonAuthorityList, {
          authorityCode: UrlCodeEnum.SQL,
        }),
      },
      {
        key: 'query',
        desc: 'SQL Query',
        component: Query,
        show: getAuth(commonAuthorityList, {
          authorityCode: UrlCodeEnum.SQL,
        }),
      },
      {
        key: 'list',
        desc: 'Import SQL List',
        component: List,
        show: getAuth(commonAuthorityList, {
          authorityCode: UrlCodeEnum.SQL,
        }),
      },
      {
        key: 'patch',
        desc: 'Data Patch',
        component: Patch,
        show: getAuth(commonAuthorityList, {
          authorityCode: UrlCodeEnum.SQL,
        }),
      },
      {
        key: 'queryOnly',
        desc: 'Query Only',
        component: Query,
        show: getAuth(commonAuthorityList, {
          authorityCode: UrlCodeEnum.SQLONLY,
        }),
      },
      {
        key: 'Check',
        desc: 'Check',
        component: Check,
        show: true,
      },
    ].filter((el) => el.show);

    if (!lodash.isEmpty(commonAuthorityList) && !lodash.isEmpty(memu)) {
      dispatch({
        type: 'sqlController/saveCurrentMenu',
        payload: {
          currentMenu: memu[0].key,
        },
      });
    }

    return memu.reduce((result, current) => {
      result[current.key] = current;
      return result;
    }, {});
  }, [commonAuthorityList]);
};
