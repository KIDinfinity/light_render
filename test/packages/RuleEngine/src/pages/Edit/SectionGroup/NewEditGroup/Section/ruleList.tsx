import React from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import { RuleType } from '../../../Enum';
import RuleItem from './ruleItem';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from '../index.less';

interface IProps {
  type: string;
}

export default ({ type }: IProps) => {
  const taskNotEditable = useSelector((state: any) => state.claimEditable.taskNotEditable);
  const { editData, libraryList } = useSelector((state: any) => state.ruleEngineController);
  const { conditions = [], results = [] } = editData;
  const list = lodash.compact(type === RuleType.Conditions ? conditions : results);

  const dispatch = useDispatch();

  const onDelete = async (item: any) => {
    await dispatch({
      type: `ruleEngineController/${
        type === RuleType.Conditions ? 'removeCondition' : 'removeResult'
      }`,
      payload: {
        ...item,
      },
    });
    await dispatch({
      type: `ruleEngineController/removeLibraryList`,
      payload: {
        id: item.id,
      },
    });
  };

  const getActive = (item: any) => {
    const matchItem = lodash.find(libraryList, (data: any) => item.id === data.id);
    return !lodash.isEmpty(matchItem);
  };

  return (
    <div className={styles.ruleList}>
      {lodash.map(list, (item, index) => (
        <div className={styles.ruleItemWrapper}>
          {item.binded === '1' && (
            <p className={styles.title}>
              {formatMessageApi({
                Label_RUL_AtomName: `${item.atomCode}`,
              })}
            </p>
          )}
          <RuleItem
            key={index}
            item={item}
            index={index}
            formKey={type}
            dataLength={list.length}
            type={type}
            disabled={taskNotEditable || getActive(item)}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};
