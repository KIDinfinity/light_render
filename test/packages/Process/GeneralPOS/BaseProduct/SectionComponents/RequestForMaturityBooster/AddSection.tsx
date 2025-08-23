import React from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import { OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Eventcode = ({ form, transactionId }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);
  return editable ? (
    <SectionDafault
      form={form}
      editable={editable}
      section="RequestForMaturityBooster-field"
      tableCollect={() => {}}
    >
      <Fields.Eventcode transactionId={transactionId} isAdd />
    </SectionDafault>
  ) : (
    <></>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }) => ({
  eventList:
    modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.maturityBooster?.eventList,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId }: any = props;
      if (
        formUtils.shouldUpdateState(changedFields) &&
        lodash.hasIn(changedFields, 'eventCode') &&
        !lodash.isEmpty(formUtils.queryValue(changedFields.eventCode))
      ) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'requestForMaturityBoosterUpdate',
          payload: {
            changedFields,
            transactionId,
            type: OperationTypeEnum.ADD,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      return formUtils.mapObjectToFields({
        eventCode: '',
      });
    },
  })(Eventcode)
);
