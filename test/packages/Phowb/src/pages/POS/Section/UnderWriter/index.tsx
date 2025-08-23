import React, { Component } from 'react';
import { Form } from 'antd';
import { connect } from 'dva';

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
  transactionType: string;
  transactionTypeList: any[];
  taskDefKey: any;
  dictsPosUwDecision: any[];
  taskNotEditable: boolean;
}
class PosUnderWriter extends Component<IProps> {
  get isShow() {
    const { taskDefKey, transactionType, transactionTypeList } = this.props;
    const needUw = (lodash.chain(transactionTypeList) as any)
      .find({ transactionTypeCode: formUtils.queryValue(transactionType) })
      .get('needUw')
      .value();
    return ![TaskDefKey.PH_POS_ACT001].includes(taskDefKey) && needUw;
  }

  get isNotEditable() {
    const { taskDefKey } = this.props;
    return !lodash.includes([TaskDefKey.PH_POS_ACT002], taskDefKey);
  }

  get isRequired() {
    const { taskDefKey } = this.props;
    return [TaskDefKey.PH_POS_ACT002].includes(taskDefKey);
  }

  OnRecover = (changedFields: any) => {
    const { dispatch } = this.props;
    dispatch({
      type: `${namespace}/updateContactInformation`,
      payload: {
        changedFields,
      },
    });
  };

  render() {
    const { form, loadingPosUwDecision, dictsPosUwDecision, taskNotEditable } = this.props;
    return this.isShow ? (
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
          disabled={taskNotEditable || this.isNotEditable}
          name="UWDecision"
          loading={loadingPosUwDecision}
          dicts={dictsPosUwDecision}
          labelId="UWDecision"
          labelTypeCode="Label_BIZ_POS"
          required={this.isRequired}
        />
      </FormSection>
    ) : (
      ''
    );
  }
}

export default connect(
  ({
    phowbDataCaptureController,
    dictionaryController,
    loading,
    claimEditable,
    processTask,
  }: any) => ({
    uwInformation: phowbDataCaptureController.claimProcessData.posDataDetail?.uwInformation || {},
    dictsPosUwDecision: dictionaryController.Dropdown_POS_UW_Decision,
    loadingPosUwDecision: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    policy: phowbDataCaptureController.claimProcessData.posDataDetail?.policy || {},
    taskNotEditable: claimEditable?.taskNotEditable,
    taskDefKey: processTask?.getTask?.taskDefKey,
    transactionTypeList: phowbDataCaptureController.transactionTypeList,
    transactionType:
      phowbDataCaptureController?.claimProcessData?.posDataDetail?.posRequestInformation
        ?.transactionType,
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
