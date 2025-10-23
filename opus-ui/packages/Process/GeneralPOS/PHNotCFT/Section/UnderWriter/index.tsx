import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';

import FormSection from 'basic/components/Form/FormSection';
import lodash from 'lodash';
import { FormItemSelect, formUtils } from 'basic/components/Form';
import TaskDefKey from 'enum/TaskDefKey';
import { namespace } from '../../_models';
import { FormId } from '../../Enum';

interface IProps {
  dispatch: any;
  form?: any;
  loadingPosUwDecision: boolean;
  transactionTypeList: any[];
  taskDefKey: any;
  dictsPosUwDecision: any[];
  taskNotEditable: boolean;
  srvTransactionType: any;
}

const PosUnderWriter = (props: IProps) => {
  const {
    form,
    loadingPosUwDecision,
    dictsPosUwDecision,
    taskNotEditable,
    taskDefKey,
    srvTransactionType,
  } = props;
  const isPOSHistory = useSelector((state: any) => state.GeneralPOSPHNotCFTController.isPOSHistory);
  const isShow =
    (![TaskDefKey.PH_POS_ACT001].includes(taskDefKey) && !!srvTransactionType?.needUW) ||
    isPOSHistory;
  const isNotEditable = !lodash.includes([TaskDefKey.PH_POS_ACT002], taskDefKey);
  const isRequired = [TaskDefKey.PH_POS_ACT002].includes(taskDefKey);
  return isShow ? (
    <FormSection
      form={form}
      formId={FormId.PosUnderWriter}
      title="UW_Info"
      layConf={{
        default: 24,
        UWDecision: 8,
      }}
      isMargin
      formatType="Label_BIZ_POS"
    >
      <FormItemSelect
        form={form}
        formName="uwDecision"
        disabled={taskNotEditable || isNotEditable}
        name="UWDecision"
        loading={loadingPosUwDecision}
        dicts={dictsPosUwDecision}
        labelId="UWDecision"
        labelTypeCode="Label_BIZ_POS"
        required={isRequired}
      />
    </FormSection>
  ) : (
    ''
  );
};

export default connect(
  ({
    GeneralPOSPHNotCFTController,
    dictionaryController,
    loading,
    claimEditable,
    processTask,
  }: any) => ({
    uwInformation:
      GeneralPOSPHNotCFTController.claimProcessData?.businessData?.transactionTypes?.[0]
        ?.uwInformation || {},
    dictsPosUwDecision: dictionaryController.Dropdown_POS_UW_Decision,
    loadingPosUwDecision: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    taskNotEditable: claimEditable?.taskNotEditable,
    taskDefKey: processTask?.getTask?.taskDefKey,
    srvTransactionType:
      GeneralPOSPHNotCFTController.claimProcessData?.businessData?.transactionTypes?.[0]
        ?.srvTransactionType || {},
  })
)(
  Form.create({
    onFieldsChange(props, changedFields) {
      const { dispatch }: any = props;
      dispatch({
        type: `${namespace}/updateUwInfo`,
        payload: {
          changedFields,
        },
      });
    },
    mapPropsToFields(props) {
      const { uwInformation }: any = props;
      return formUtils.mapObjectToFields({
        uwDecision: uwInformation.uwDecision,
      });
    },
  })(PosUnderWriter)
);
