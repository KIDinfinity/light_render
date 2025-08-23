import React from 'react';
import { Form, Icon } from 'antd';
import { connect, useDispatch, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import classNames from 'classnames';
import { OperationTypeEnum, EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
const Item = ({
  form,
  transactionId,
  id: clientSeq,
  tableCollect,
  changeCustomerInfoList,
}: any) => {
  const dispatch = useDispatch();
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);
  const originclientInfoList = useSelector(
    (state) => state?.GeneralPOSController?.processData?.policyInfo?.clientInfoList
  );
  const remove = () => {
    dispatch({
      type: `${NAMESPACE}/changeCustomerInfoUpdate`,
      payload: {
        transactionId,
        clientSeq,
        type: OperationTypeEnum.DELETE,
      },
    });
  };
  const clientId = lodash.find(
    changeCustomerInfoList,
    (item) => item?.clientSeq === clientSeq
  )?.clientId;
  const clientInfoItem = lodash.find(originclientInfoList, (item) => item?.clientId === clientId);
  const recoverObj = {
    ...clientInfoItem,
    clientName: clientInfoItem?.wholeName,
  };
  const OnRecover = (e: any) => {
    dispatch({
      type: `${NAMESPACE}/changeCustomerInfoUpdate`,
      payload: {
        transactionId,
        clientSeq,
        recoverItem: e,
        type: OperationTypeEnum.COVER,
      },
    });
  };
  return (
    <div className={styles.box}>
      <Section
        form={form}
        editable={editable}
        formId={`ChangeCustomerInformation${clientSeq}`}
        section="ChangeCustomerInformation"
        tableCollect={tableCollect}
      >
        <Fields.ClientName
          transactionId={transactionId}
          recoverObj={recoverObj}
          OnRecover={OnRecover}
        />
        <Fields.Title transactionId={transactionId} recoverObj={recoverObj} OnRecover={OnRecover} />
        <Fields.FirstName recoverObj={recoverObj} OnRecover={OnRecover} />
        <Fields.MiddleName recoverObj={recoverObj} OnRecover={OnRecover} />
        <Fields.SurName recoverObj={recoverObj} OnRecover={OnRecover} />
        <Fields.MaritalStatus
          transactionId={transactionId}
          recoverObj={recoverObj}
          OnRecover={OnRecover}
        />
      </Section>
      {editable && (
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
  ({ [NAMESPACE]: modelnamepsace, processTask }: any, { transactionId, id }: any) => ({
    task: processTask?.getTask,

    changeCustomerInfoList:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.changeCustomerInfoList,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any, form) {
      const { dispatch, transactionId, id: clientSeq }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'changeCustomerInfoUpdate',
          payload: {
            changedFields,
            transactionId,
            type: OperationTypeEnum.UPDATE,
            clientSeq,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { id: clientSeq, changeCustomerInfoList } = props;
      const item =
        lodash.find(
          changeCustomerInfoList,
          (item) => clientSeq === formUtils.queryValue(item?.clientSeq)
        ) || {};
      return formUtils.mapObjectToFields(item);
    },
  })(Item)
);
