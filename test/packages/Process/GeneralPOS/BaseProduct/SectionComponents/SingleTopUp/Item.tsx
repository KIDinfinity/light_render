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

const Item = ({ form, fundList, transactionId, id: index, tableCollect }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);
  const item = fundList?.[index] || {};

  const remove = () => {
    dispatch({
      type: `${NAMESPACE}/singleTopUpUpdate`,
      payload: {
        transactionId,
        index,
        type: OperationTypeEnum.DELETE,
      },
    });
  };

  return (
    <div className={styles.box}>
      <Section form={form} editable={editable} section="SingleTopUp" tableCollect={tableCollect}>
        <Fields.FundCode transactionId={transactionId} />
        <Fields.TopUpValue transactionId={transactionId} />
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

    fundList: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.singleTopup?.fundList,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, id: index }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'singleTopUpUpdate',
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
      const { fundList, task, id: index } = props;
      const item = fundList?.[index] || {};

      return formUtils.mapObjectToFields(
        task?.taskStatus === 'completed' ? formUtils.cleanValidateData(item) : item
      );
    },
  })(Item)
);
