import React, { Component } from 'react';
import { connect } from 'dva';
import type { FormComponentProps } from 'antd/es/form';
import type { Dispatch } from 'redux';
import moment from 'moment';
import FormSection, {
  FormItemSelect,
  FormItemDatePicker,
  FormItemInput,
  FormLayout,
} from 'basic/components/Form/FormSection';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { VLD_000214 } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/ValidatorRules/Validators';
import Layout, { Layout5, Layout7 } from './Layout';

interface IProps extends FormComponentProps {
  registeForm: Function;
  unRegisterForm: Function;
  dispatch: Dispatch<any>;
  formData: any;
  form: any;
  documentId: any;
  treatmentId: any;
  CancerFlagV: any;
}

class Intraepithelial extends Component<IProps> {
  render() {
    const {
      form,
      CancerFlagV,
      documentId,
      taskNotEditable,
      MNType,
      HistoforIntraepithelial,
      OncologyCode,
      DepthColorectalCancer,
      StageofIntraepithelial,
      DistantMetastasis,
      NotifInsured,
    } = this.props;
    const distantMetastasis = form.getFieldValue('distantMetastasis');
    return (
      <FormSection
        form={form}
        formId={`IntraepithelialHeader_${documentId}`}
        layout={Layout}
        isPadding={false}
        isHideBgColor
      >
        <FormLayout json={Layout5}>
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="cancerFlag5th"
            dicts={CancerFlagV}
            labelId="venus_claim.label.cancerFlag5th"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="intraepithelialExamination"
            dicts={HistoforIntraepithelial}
            labelId="claim.intraepithelial.intraepithelialExamination"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="intraepithelialNeoplasmType"
            dicts={MNType}
            labelId="claim.intraepithelial.intraepithelialNeoplasmType"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="diseaseTypesOfIntraepithelialNeoplasm"
            dicts={StageofIntraepithelial}
            labelId="claim.intraepithelial.diseaseTypesOfIntraepithelialNeoplasm"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="depthOfColorectalCancer"
            dicts={DepthColorectalCancer}
            labelId="claim.intraepithelial.depthOfColorectalCancer"
          />
        </FormLayout>
        <FormLayout json={Layout7}>
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            formName="firstDiagnosisDate"
            labelId="claim.intraepithelial.firstDiagnosisDate"
            format="L"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="firstDiagnosisName"
            maxLength={100}
            labelId="claim.intraepithelial.firstDiagnosisName"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="firstTNNTypeT"
            name="number"
            labelId="claim.intraepithelial.firstTNNTypeT"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="firstTNNTypeN"
            name="number"
            labelId="claim.intraepithelial.firstTNNTypeN"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="firstTNNTypeM"
            name="number"
            labelId="claim.intraepithelial.firstTNNTypeM"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="firstICD"
            name="number"
            labelId="claim.intraepithelial.firstICD"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="firstOncologyCode"
            dicts={OncologyCode}
            labelId="claim.intraepithelial.firstOncologyCode"
          />
        </FormLayout>
        <FormLayout json={Layout7}>
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            formName="finalDiagnosisDate"
            labelId="claim.intraepithelial.finalDiagnosisDate"
            format="L"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="finalDiagnosisName"
            maxLength={100}
            labelId="claim.intraepithelial.finalDiagnosisName"
          />
          <FormItemInput
            form={form}
            name="number"
            disabled={taskNotEditable}
            formName="finalTNNTypeT"
            labelId="claim.intraepithelial.finalTNNTypeT"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="finalTNNTypeN"
            name="number"
            labelId="claim.intraepithelial.finalTNNTypeN"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="finalTNNTypeM"
            name="number"
            labelId="claim.intraepithelial.finalTNNTypeM"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="finalICD"
            name="number"
            labelId="claim.intraepithelial.finalICD"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="finalOncologyCode"
            dicts={OncologyCode}
            labelId="claim.intraepithelial.finalOncologyCode"
          />
        </FormLayout>
        <FormLayout json={Layout5}>
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="distantMetastasis"
            dicts={DistantMetastasis}
            labelId="claim.intraepithelial.distantMetastasis"
          />
          <FormItemInput
            form={form}
            required={VLD_000214({ checkValue: distantMetastasis })}
            disabled={taskNotEditable}
            formName="metastaticSites"
            maxLength={100}
            labelId="claim.intraepithelial.metastaticSites"
          />
          <FormItemDatePicker
            form={form}
            required={VLD_000214({ checkValue: distantMetastasis })}
            disabled={taskNotEditable}
            formName="diagnosisDateOfDistantMetastasis"
            labelId="claim.intraepithelial.diagnosisDateOfDistantMetastasis"
            format="L"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="notificationOfSelfIntraepithelialNeoplasm"
            dicts={NotifInsured}
            labelId="claim.intraepithelial.notificationOfSelfIntraepithelialNeoplasm"
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            formName="notificationDateOfSelfIntraepithelialNeoplasm"
            labelId="claim.intraepithelial.notificationDateOfSelfIntraepithelialNeoplasm"
            format="L"
          />
        </FormLayout>
      </FormSection>
    );
  }
}

export default connect(
  (
    { JPCLMOfQualityController, claimEditable, formCommonController, dictionaryController }: any,
    { documentId }: any
  ) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    formData:
      JPCLMOfQualityController.claimProcessData.claimEntities.bpoFormDataList[documentId].formData,
    CancerFlagV: dictionaryController.CancerFlagV,
    HistoforIntraepithelial: dictionaryController.HistoforIntraepithelial,
    OncologyCode: dictionaryController.OncologyCode,
    MNType: dictionaryController.MNType,
    DepthColorectalCancer: dictionaryController.DepthColorectalCancer,
    StageofIntraepithelial: dictionaryController.StageofIntraepithelial,
    DistantMetastasis: dictionaryController.DistantMetastasis,
    NotifInsured: dictionaryController.NotifInsured,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, documentId, applicationNo, validating } = props;
      const finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, [
        'finalDiagnosisDate',
        'firstDiagnosisDate',
        'diagnosisDateOfDistantMetastasis',
        'notificationDateOfSelfIntraepithelialNeoplasm',
      ]);
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfQualityController/saveFormDataEntry',
              target: 'JPCLMOfQualityController/saveFormData',
              payload: {
                changedFields: finalChangedFields,
                documentId,
                applicationNo,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfQualityController/saveFormDataLatest',
            target: 'saveFormData',
            payload: {
              changedFields: finalChangedFields,
              documentId,
              applicationNo,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { formData } = props;

      return formUtils.mapObjectToFields(formData, {
        finalDiagnosisDate: (value: any) => (value ? moment(value) : null),
        firstDiagnosisDate: (value: any) => (value ? moment(value) : null),
        diagnosisDateOfDistantMetastasis: (value: any) => (value ? moment(value) : null),
        notificationDateOfSelfIntraepithelialNeoplasm: (value: any) =>
          value ? moment(value) : null,
      });
    },
  })(Intraepithelial)
);
