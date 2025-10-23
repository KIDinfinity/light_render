import React from 'react';
import { useSelector } from 'dva';
import { Modal } from 'antd';
import lodash from 'lodash';
import DefaultEdit from './defaultEdit';
import NewEdit from './newEdit';
import DecisionEdit from './decisionEdit';
import Search from './Search';
import { ModalType } from '../Enum';

import styles from './modal.less';

export default () => {
  const { edit, search }: any = useSelector(
    (state: any) => state.ruleEngineController.modalOptions
  );

  const width = edit.type === ModalType.EditRuleFlowView ? '80%' : 1150;

  const configs = [
    {
      key: ModalType.EditDefault,
      component: DefaultEdit,
    },
    {
      key: ModalType.NewEdit,
      component: NewEdit,
    },
    {
      key: ModalType.EditDecision,
      component: DecisionEdit,
    },
    {
      key: ModalType.EditRuleFlowView,
      component: DefaultEdit,
    },
  ];

  const EditModal = (show: boolean, Component: any) => {
    return (
      <Modal
        visible={show}
        width={width}
        closable={false}
        className={styles.antModal}
        footer={null}
        bodyStyle={{
          zIndex: 1000,
        }}
      >
        {show && <Component />}
      </Modal>
    );
  };

  return (
    <>
      {lodash.map(configs, (item: any) => (
        <div key={item.key}>{EditModal(edit.type === item.key, item.component)}</div>
      ))}
      <Search search={search} />
    </>
  );
};
