import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form } from 'antd';
import lodash from 'lodash';
import FormLayout from 'basic/components/Form/FormLayout';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import FormRegist from '@/components/FormRegistComponent';
import {
  FormItemInput,
  FormItemSelectAuto,
  FormItemSelect,
  formUtils,
} from 'basic/components/Form';
import type { AppealInfoModal } from '../_dto/Models';

import json from './layout.json';

interface IProps extends IFormRegistProps {
  dispatch: any;
  claimAppealInfo: AppealInfoModal;
  validating: boolean;
  form: any;
  claimTypeList: any[];
  dataEditable: boolean;
}

class AppealInformation extends PureComponent<IProps> {
  get claimTypeList() {
    const { appealRelateCase } = this.props;
    return lodash
      .chain(appealRelateCase)
      .map((item) => lodash.chain(item.claimType).split(',').compact().value())
      .flatten()
      .uniq()
      .compact()
      .map((item) => ({
        dictCode: item,
        dictName: formatMessageApi({ Dropdown_CLM_PHClaimType: item }),
      }))
      .value();
  }

  get originalCaseCategoryList() {
    const { appealRelateCase } = this.props;
    return lodash
      .chain(appealRelateCase)
      .map((item) => item.originalCaseCategory)
      .uniq()
      .compact()
      .map((item) => ({
        dictCode: item,
        dictName: formatMessageApi({ Label_BPM_CaseCategory: item }),
      }))
      .value();
  }

  getCaseList = () => {
    const { form, dispatch } = this.props;
    const params = form.getFieldValue('originalInquiryClaimNo');
    dispatch({
      type: 'MaAppealCaseController/getAppealRelateCase',
      payload: params,
    });
  };

  render() {
    const { form, dataEditable, taskNotEditable } = this.props;
    return (
      <Card>
        <Form layout="vertical">
          <FormLayout json={json}>
            <FormItemInput
              form={form}
              disabled={dataEditable}
              formName="originalInquiryClaimNo"
              maxLength={30}
              required
              onBlur={this.getCaseList}
              labelId="app.claim.originalClaimNo"
            />
            <FormItemSelect
              form={form}
              disabled={dataEditable}
              mode="multiple"
              formName="claimTypeList"
              labelId="app.navigator.taskDetail.inquireForm.label.claim-type"
              // dicts={dictsOfClaimType}
              dicts={this.claimTypeList}
            />
            <FormItemSelect
              form={form}
              disabled={dataEditable}
              formName="originalCaseCategory"
              labelId="app.claim.originalCaseCategory"
              dicts={this.originalCaseCategoryList}
            />
            <FormItemSelectAuto
              form={form}
              formName="appealType"
              disabled={taskNotEditable}
              labelId="app.claim.appealType"
              required
              typeCode="appeal_type"
            />
          </FormLayout>
        </Form>
      </Card>
    );
  }
}

const FormWrapped = Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'MaAppealCaseController/saveEntry',
            target: 'saveClaimAppealInfo',
            payload: {
              changedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'MaAppealCaseController/saveFormData',
          target: 'saveClaimAppealInfo',
          payload: {
            changedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { claimAppealInfo } = props;

    return formUtils.mapObjectToFields(claimAppealInfo, {
      claimType: (value) => (value ? lodash.split(value, ',') : []),
    });
  },
})(FormRegist()(AppealInformation));

export default connect(({ MaAppealCaseController, formCommonController, claimEditable }: any) => ({
  claimAppealInfo: MaAppealCaseController?.claimAppealInfo,
  appealRelateCase: MaAppealCaseController?.appealRelateCase,
  validating: formCommonController.validating,
  taskNotEditable: claimEditable.taskNotEditable,
}))(FormWrapped);
