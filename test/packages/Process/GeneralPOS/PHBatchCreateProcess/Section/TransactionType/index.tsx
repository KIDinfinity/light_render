import React from 'react';
import type { FormComponentProps } from 'antd/es/form';
import type { Dispatch } from 'redux';
import { connect } from 'dva';

import Title from './Title';
import styles from './index.less';
import { FormAntCard } from 'basic/components/Form';
import Item from './Item';

interface IProps {
  name: string;
  form: FormComponentProps;
  dispatch: Dispatch;
  transactionTypes: any[];
  taskNotEditable: boolean;
  submited: boolean;
}

const TransactionType = ({ transactionTypes, submited }: IProps) => {
  return (
    <>
      <div className={styles.TransactionType}>
        <FormAntCard
          title={<Title submited={submited} selectedCount={transactionTypes?.length || 0} />}
        >
          <Item />
        </FormAntCard>
      </div>
    </>
  );
};

export default connect(
  ({ PHBatchCreateProcessController, claimEditable, formCommonController }: any) => ({
    transactionTypes: PHBatchCreateProcessController?.processData?.transactionTypes,
    taskNotEditable: claimEditable.taskNotEditable,
    submited: formCommonController.submited,
  })
)(TransactionType);
