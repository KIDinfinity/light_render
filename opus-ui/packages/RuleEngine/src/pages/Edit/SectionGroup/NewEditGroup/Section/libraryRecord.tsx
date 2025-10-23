import React, { useState } from 'react';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Icon, Checkbox, List } from 'antd';
import classnames from 'classnames';
import styles from '../index.less';

interface IProps {
  type: string;
  handleLibrary: Function;
}

export default ({ type, handleLibrary }: IProps) => {
  const [moreShow, setMoreShow] = useState(false);

  const { editData, libraryList } = useSelector((state: any) => state.ruleEngineController);

  const list = libraryList.filter((item: any) => item.type === type) || [];

  const getActive = (item: any) => {
    const matchItem = lodash.find(editData[type], (data: any) => item.id === data.id);
    return !lodash.isEmpty(matchItem);
  };

  return (
    <div className={classnames(styles.libraryRecord, !moreShow && styles.libraryRecordHiddenMore)}>
      {list.length > 0 && (
        <div className={classnames(styles.list, moreShow && styles.moreLit)}>
          <List
            grid={{ gutter: 10, column: 6 }}
            dataSource={list}
            renderItem={(item: any) => (
              <List.Item>
                <Checkbox
                  checked={getActive(item)}
                  onClick={(e: any) => {
                    handleLibrary({
                      checked: e.target?.checked,
                      item,
                    });
                  }}
                >
                  <span
                    title={formatMessageApi({
                      Label_RUL_AtomName: `${item.name}`,
                    })}
                  >
                    {formatMessageApi({
                      Label_RUL_AtomName: `${item.name}`,
                    })}
                  </span>
                </Checkbox>
              </List.Item>
            )}
          />
        </div>
      )}

      {lodash.isArray(list) && list.length > 6 && (
        <div
          className={styles.moreIcon}
          onClick={() => {
            setMoreShow(!moreShow);
          }}
        >
          <Icon type={moreShow ? 'down' : 'up'} />
        </div>
      )}
    </div>
  );
};
