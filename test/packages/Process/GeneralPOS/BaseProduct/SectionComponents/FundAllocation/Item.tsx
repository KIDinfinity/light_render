import React from 'react';
import { Form, Icon } from 'antd';
import { connect, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import classNames from 'classnames';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Item = ({ form, fundAllocationFundList, transactionId, id: index, tableCollect }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);
  const item = fundAllocationFundList?.[index] || {};

  const remove = () => {
    dispatch({
      type: `${NAMESPACE}/fundAllocationUpdate`,
      payload: {
        transactionId,
        index,
        type: OperationTypeEnum.DELETE,
      },
    });
  };

  return (
    <div className={styles.box}>
      <Section form={form} editable={editable} section="FundAllocation" tableCollect={tableCollect}>
        <Fields.FundCode transactionId={transactionId} />
        <Fields.RiskLevel transactionId={transactionId} />
        <Fields.Allocation transactionId={transactionId} />
      </Section>
      {editable && !!item?.isAdd && (
        <div className={classNames(styles.btn)}>
          <div className={styles.icon} onClick={remove}>
            <Icon type="close" />
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, processTask }: any, { transactionId }: any) => ({
    task: processTask?.getTask,

    fundAllocationFundList:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.fundAllocation
        ?.fundAllocationFundList,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, id: index }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'fundAllocationUpdate',
          payload: {
            changedFields,
            transactionId,
            index,
            type: OperationTypeEnum.UPDATE,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { fundAllocationFundList, task, id: index } = props;
      const item = fundAllocationFundList?.[index] || {};

      return formUtils.mapObjectToFields(
        task?.taskStatus === 'completed' ? formUtils.cleanValidateData(item) : item
      );
    },
  })(Item)
);
