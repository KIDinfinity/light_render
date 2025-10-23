import React from 'react';
import { useDispatch } from 'dva';
import { Button } from 'antd';
import LibraryRecord from './libraryRecord';
import { RuleType } from '../../../Enum';
import styles from '../index.less';

interface IProps {
  type: string;
  handleButton: Functon;
}

export default ({ handleButton, type }: IProps) => {
  const dispatch = useDispatch();

  const handleLibrary = async ({ checked, item }: any) => {
    if (!checked) {
      await dispatch({
        type: `ruleEngineController/${
          type === RuleType.Conditions ? 'removeCondition' : 'removeResult'
        }`,
        payload: {
          ...item,
        },
      });
    } else {
      dispatch({
        type: `ruleEngineController/addNewEditRule`,
        payload: {
          libraryItem: item,
          type,
        },
      });
    }
  };
  return (
    <div className={styles.header}>
      <div className={styles.libraryRecord}>
        <LibraryRecord type={type} handleLibrary={handleLibrary} />
      </div>
      <div className={styles.button}>
        <Button
          icon="plus"
          onClick={() => {
            handleButton(type);
          }}
        >
          New
        </Button>
      </div>
    </div>
  );
};
