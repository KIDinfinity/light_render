import React from 'react';
import { Form, Icon } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import classNames from 'classnames';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { isDecision } from 'process/GeneralPOS/common/utils';

const Item = ({ form, eventList, transactionId, id: index, tableCollect, section }: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);
  const item = eventList?.[index] || {};
  const { caseCategory, activityKey } = useSelector(({ processTask }: any) => processTask?.getTask);

  const remove = async () => {
    await dispatch({
      type: `${NAMESPACE}/requestForMaturityBoosterUpdate`,
      payload: {
        transactionId,
        index,
        type: OperationTypeEnum.DELETE,
      },
    });

    if (isDecision({ caseCategory, activityKey })) {
      await dispatch({
        type: `${NAMESPACE}/validateFields`,
      });
    }
  };

  return (
    <div className={styles.box}>
      <Section form={form} editable={editable} section={section} tableCollect={tableCollect}>
        <Fields.Eventcode transactionId={transactionId} />
        <Fields.Occurrencedate transactionId={transactionId} />
        <Fields.Validity transactionId={transactionId} />
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

    eventList:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.maturityBooster?.eventList,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, id: index }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'requestForMaturityBoosterUpdate',
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
      const { eventList, task, id: index } = props;

      const item = eventList?.[index] || {};

      return formUtils.mapObjectToFields(
        task?.taskStatus === 'completed' ? formUtils.cleanValidateData(item) : item
      );
    },
  })(Item)
);
