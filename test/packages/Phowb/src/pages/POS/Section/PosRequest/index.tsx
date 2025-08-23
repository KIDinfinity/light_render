import React, { Component } from 'react';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { connect } from 'dva';
import { Form, Modal } from 'antd';
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

interface IProps {
  dispatch: Dispatch<any>;
  form: any;
  taskNotEditable: boolean;
  transactionTypeList: object[];
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

class PosQequest extends Component<IProps> {
  get isNotEditable() {
    const { taskNotEditable, taskDefKey, createLocation } = this.props;
    return (
      taskNotEditable ||
      !(taskDefKey === TaskDefKey.PH_POS_ACT001 && createLocation === CreateLocation['01'])
    );
  }

  get transactionEditable() {
    const { taskNotEditable, taskDefKey, createLocation } = this.props;
    return (
      taskNotEditable ||
      !(
        taskDefKey === TaskDefKey.PH_POS_ACT001 &&
        (createLocation === CreateLocation['03'] || createLocation === CreateLocation['01'])
      )
    );
  }

  handleOnBlurPolicyNo = async () => {
    const { dispatch, form, posRequestInformation }: any = this.props;
    const policyNo =
      form.getFieldValue('policyNo') || formUtils.queryValue(posRequestInformation?.policyNo);
    if (lodash.size(policyNo) !== 8) {
      if (!lodash.isEmpty(policyNo) && policyNo !== 'undefined') {
        this.showModel(policyNo);
      }
      dispatch({
        type: `phowbDataCaptureController/cleanSubmitParam`,
        payload: {
          policyNo: policyNo || '',
          transactionType: posRequestInformation?.transactionType || '',
        },
      });
      return;
    }
    dispatch({
      type: `phowbDataCaptureController/getPolicyInfoByPolicyNo`,
      payload: {
        policyNo,
        transactionType: posRequestInformation?.transactionType,
      },
    });
  };

  onChangeTransactionType = async (transactionType: string) => {
    const { dispatch, taskDefKey, createLocation, posNo, caseNo, caseCategory } = this.props;
    const isPendCreate =
      taskDefKey === TaskDefKey.PH_POS_ACT001 &&
      createLocation === CreateLocation['03'] &&
      posNo &&
      transactionType;
    const respone = isPendCreate
      ? await dispatch({
          type: 'phowbDataCaptureController/checkDuplicatedTransType',
          payload: {
            posNo,
            transactionType,
          },
        })
      : false;
    if (!respone) {
      await dispatch({
        type: `phowbDataCaptureController/getPolicyInfoByPolicyNo`,
        payload: {
          transactionType,
        },
      });
      if (isPendCreate) {
        await dispatch({
          type: 'phowbDataCaptureController/updateDocumentByTransType',
          payload: {
            caseNo,
            transactionType,
            caseCategory,
          },
        });
      }
    } else {
      Modal.error({
        title: formatMessageApi({
          Label_COM_Message: 'ErrorMessage',
        }),
        content: formatMessageApi({
          Label_COM_WarningMessage: 'ERR_000294',
        }),
        onOk: () => {
          dispatch({
            type: 'phowbDataCaptureController/updatePosRequestInformation',
            payload: {
              changedFields: {
                transactionType: null,
              },
            },
          });
          dispatch({
            type: 'phowbDataCaptureController/saveDuplicate',
            payload: {
              duplicate: false,
            },
          });
        },
      });
    }
  };

  showModel = (policyNo: string) => {
    Modal.warning({
      content: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000058' }, policyNo),
      okText: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.receivedModalCancel' }),
    });
  };

  render() {
    const { form, transactionTypeList, duplicate } = this.props;

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
            disabled={this.isNotEditable}
            formName="policyNo"
            maxLength={8}
            onBlur={this.handleOnBlurPolicyNo}
            required
            labelId="venus_claim.label.policyNo"
          />
          <FormItemSelect
            form={form}
            disabled={this.transactionEditable}
            name="transactionType"
            formName="transactionType"
            labelId="TransType"
            labelTypeCode="Label_BIZ_POS"
            required
            dictCode="transactionTypeCode"
            dictName="transactionTypeName"
            dicts={transactionTypeList}
            // @ts-ignore
            onChange={this.onChangeTransactionType}
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
  }
}

export default connect(
  ({ claimEditable, formCommonController, phowbDataCaptureController, processTask }: any) => ({
    taskNotEditable: claimEditable?.taskNotEditable,
    transactionTypeList: phowbDataCaptureController?.transactionTypeList,
    posRequestInformation:
      phowbDataCaptureController?.claimProcessData?.posDataDetail?.posRequestInformation,
    validating: formCommonController?.validating,
    taskDefKey: processTask?.getTask?.taskDefKey,
    createLocation: processTask?.getTask?.createLocation,
    posNo: processTask?.getTask?.inquiryBusinessNo,
    caseNo: processTask?.getTask?.caseNo,
    duplicate: phowbDataCaptureController.duplicate,
    caseCategory: processTask?.getTask?.caseCategory,
  })
)(
  Form.create({
    onFieldsChange(props: IProps, changedFields: any) {
      const { dispatch, validating } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'phowbDataCaptureController/saveEntry',
              target: 'updatePosRequestInformation',
              payload: {
                changedFields,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'phowbDataCaptureController/saveFormData',
            target: 'updatePosRequestInformation',
            payload: {
              changedFields,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { posRequestInformation }: any = props;
      return formUtils.mapObjectToFields(posRequestInformation);
    },
  })(PosQequest)
);
