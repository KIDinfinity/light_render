import React from 'react';
import { useSelector, useDispatch } from 'dva';
import {Modal} from 'antd';
import lodash from 'lodash';
import SiderOk from '../components/Button/SiderOk';
import TableSearch from '../TableSearch';
import getTypeKey from '../Utils/getTypeKey';
import { AddType } from '../Enum';
import styles from './modal.less';

export default ({search}: any) => {
  const { searchData, actionCallBack } = useSelector((state: any) => state.ruleEngineController);
  const { activeCode, data } = searchData;
  const { onSearchOk } = actionCallBack;

  const dispatch = useDispatch();
  const handleCancel = async () => {
    await dispatch({
      type: 'ruleEngineController/saveModalOptions',
      payload: {
        search: {
          show: false,
          type: '',
        },
      },
    });

    await dispatch({
      type: 'ruleEngineController/clearSearchParams',
      payload: {
        activeCode,
      },
    });
  };
  const handleOk = async () => {
    if (activeCode === AddType.RuleSet) {
      const { list, selectedRowKeys } = data[activeCode];
      const newList = lodash.filter(list, (item: any) =>
        selectedRowKeys.includes(item[getTypeKey(activeCode)])
      );
      await onSearchOk(newList);
      await dispatch({
        type: 'ruleEngineController/saveModalOptions',
        payload: {
          search: {
            show: false,
            type: '',
          },
        },
      });
    } else {
      await dispatch({
        type: 'ruleEngineController/getLibrary',
      });
    }

    // TODO:这里如果是ruleSet需要单独出来
    await dispatch({
      type: 'ruleEngineController/clearSearchParams',
      payload: {
        activeCode,
      },
    });
  };

  return (
    <Modal
    visible={search.show && search.type !==AddType.NewRuleSet}
      width='80%'
      closable={false}
      className={styles.antModal}
      // TODO:这个是否不需要?因为右上角没有x按钮
      onCancel={handleCancel}
      footer={null}
      bodyStyle={{
        zIndex: 1000,
      }}
    >
      <div className={styles.modalRule}>
        <div className={styles.buttonGroup}>
          <SiderOk onOk={handleOk} onCancel={handleCancel} />
        </div>
        <div className={styles.content}> <TableSearch /></div>
      </div>
    </Modal>

  );
};
