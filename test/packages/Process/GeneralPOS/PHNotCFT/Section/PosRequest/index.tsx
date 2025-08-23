import React, { useCallback } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import type { Dispatch } from 'redux';
import { formUtils } from 'basic/components/Form';
import FormSection, {
  FormItemSelect,
  FormItemInput,
  FormLayout,
} from 'basic/components/Form/FormSection';
import TaskDefKey from 'enum/TaskDefKey';
import CreateLocation from 'enum/CreateLocation';
import { FormId } from '../../Enum';
import BaseInfo from './BaseInfo';
import CaseCategory from 'enum/CaseCategory';

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  taskNotEditable: boolean;
  policy: object;
  policyNo: string;
  transactionType: string;
  validating: any;
  name?: any;
  taskDefKey: string;
  createLocation?: any;
  posNo: string;
  duplicate: boolean;
}

const PosQequest = (props: IProps) => {
  const {
    taskNotEditable,
    taskDefKey,
    createLocation,
    dispatch,
    posNo,
    caseNo,
    caseCategory,
    form,
    posRequestInformation,
    duplicate,
  } = props;
  const isNotEditable =
    taskNotEditable ||
    !(taskDefKey === TaskDefKey.PH_POS_ACT001 && createLocation === CreateLocation['01']);
  const transactionEditable =
    taskNotEditable ||
    !(
      taskDefKey === TaskDefKey.PH_POS_ACT001 &&
      (createLocation === CreateLocation['03'] || createLocation === CreateLocation['01'])
    );

  const handleOnBlurPolicyNo = useCallback(() => {
    const policyId =
      form.getFieldValue('policyId') || formUtils.queryValue(posRequestInformation?.policyId);
    if (false && lodash.size(policyId) !== 8) {
    }
    dispatch({
      type: `GeneralPOSPHNotCFTController/getPolicyInfoByPolicyNo`,
      payload: {
        policyId,
      },
    });
  }, [posRequestInformation, dispatch, form]);

  const dictKey =
    caseCategory !== CaseCategory.PH_POS_CTG001
      ? 'Dropdown_COM_POSTransactionType_Major'
      : 'Dropdown_COM_POSTransactionType_Minor';
  const transactionTypeList = useSelector((state) => state.dictionaryController[dictKey]);
  const onChangeTransactionType = useCallback(
    async (transactionType: string) => {
      return;
    },
    [caseNo]
  );

  return (
    <FormSection
      form={form}
      formId={FormId.InfoInsured}
      title="POSReqInfo"
      layConf={24}
      isMargin
      formatType="Label_BIZ_Policy"
    >
      <FormLayout
        layConf={{
          default: 4,
          transactionType: 8,
        }}
      >
        <FormItemInput
          form={form}
          name="policyNo"
          disabled={isNotEditable}
          formName="policyId"
          maxLength={8}
          onBlur={handleOnBlurPolicyNo}
          required
          labelId="venus_claim.label.policyNo"
        />
        <FormItemSelect
          form={form}
          disabled={transactionEditable}
          name="transactionType"
          formName="transactionType"
          labelId="TransType"
          labelTypeCode="Label_BIZ_POS"
          required
          dicts={transactionTypeList}
          // @ts-ignore
          onChange={onChangeTransactionType}
          rules={[
            {
              validator: (rule: any, value: any, callback: Function) => {
                if (duplicate) {
                  callback(
                    formatMessageApi({
                      Label_COM_WarningMessage: 'ERR_000294',
                    })
                  );
                  return;
                }
                callback();
              },
            },
          ]}
        />
      </FormLayout>

      <BaseInfo form={form} />
    </FormSection>
  );
};

export default connect(({ claimEditable, GeneralPOSPHNotCFTController, processTask }: any) => ({
  taskNotEditable: claimEditable?.taskNotEditable,
  posRequestInformation:
    GeneralPOSPHNotCFTController?.claimProcessData?.businessData?.posRequestInformation,
  taskDefKey: processTask?.getTask?.taskDefKey,
  createLocation: processTask?.getTask?.createLocation,
  posNo: processTask?.getTask?.inquiryBusinessNo,
  caseNo: processTask?.getTask?.caseNo,
  duplicate: GeneralPOSPHNotCFTController.duplicate,
  caseCategory: processTask?.getTask?.caseCategory,
  transactionType:
    GeneralPOSPHNotCFTController?.claimProcessData?.businessData?.transactionTypes?.[0]
      ?.transactionTypeCode,
}))(
  Form.create({
    async onFieldsChange(props: IProps, changedFields: any) {
      const { dispatch } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        await dispatch({
          type: 'GeneralPOSPHNotCFTController/saveFormData',
          target: changedFields.transactionType
            ? 'updateTransactionTypes'
            : 'updatePosRequestInformation',
          payload: {
            changedFields,
          },
        });
        if (changedFields.transactionType) {
          await dispatch({
            type: `GeneralPOSPHNotCFTController/saveSnapshot`,
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { posRequestInformation, transactionType }: any = props;
      return formUtils.mapObjectToFields({
        ...posRequestInformation,
        transactionType,
        premiumStatus: formatMessageApi({
          Dropdown_POL_PremiumStatus: posRequestInformation?.premiumStatus,
        }),
        riskStatus: formatMessageApi({
          risk_status: posRequestInformation?.riskStatus,
        }),
      });
    },
  })(PosQequest)
);
