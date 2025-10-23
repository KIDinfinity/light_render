import React, { useMemo } from 'react';

import { useDispatch } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

import { Tag } from 'opus/Components/Antd';

import styles from './index.less';

const Main = ({
  fieldName,
  searchDefault,
  activeTabKey,
  componentType,
  params,
  dropdownDatas,
}: any) => {
  const dispatch = useDispatch();
  const list = useMemo(() => {
    const oldList = formUtils.queryValue(params?.[fieldName] || []);
    return lodash.isString(oldList) ? oldList.split(',') : oldList;
  }, [params, fieldName]);

  const handleClose = (key: string) => {
    dispatch({
      type: 'reportCenterController/saveSearchDefault',
      payload: {
        searchDefault: {
          ...searchDefault?.[activeTabKey],
          params: {
            ...(searchDefault?.[activeTabKey]?.params || {}),
            [fieldName]: lodash.filter(list, (el: any) => el !== key),
          },
        },
        reportCode: activeTabKey,
      },
    });
  };

  return (
    <>
      {lodash.includes(['dropdown', 'multi_drop_down'], componentType) && (
        <div className={styles.selectTag}>
          {lodash.map(list, (key: any) => (
            <Tag
              closable
              key={key}
              onClose={() => {
                handleClose(key);
              }}
            >
              {lodash
                .chain(dropdownDatas || [])
                .find({ key })
                .get('value')
                .value() || ''}
            </Tag>
          ))}
        </div>
      )}
    </>
  );
};

export default Main;
