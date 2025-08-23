import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Icon, Form, Button, notification } from 'antd';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput, FormItemSelect } from 'basic/components/Form';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import type { IntActiveTaskItem } from 'claimBasicProduct/pages/UnknownDocument/_models/interfaces';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { claimantLayout } from '../../FormLayout.json';
import searchStyles from './SearchInsuredModal.less';

const FORMID = 'newTask';
const searchInsuredValidateKeyArr: string[] = ['policyId', 'clientId', 'firstName', 'surname'];
interface IProps {
  dispatch: any;
  item: IntActiveTaskItem;
  form: any;
  caseCategoryList: string;
  submitParams: any;
  caseCategory: any;
  caseCategoryOptions: any;
  insuredNameList: any;
  policyNoList: any;
  dictsOfGender: any;
  taskNotEditable: boolean;
}

// @ts-ignore
@Form.create({
  async onFieldsChange(props, changedFields) {
    const { validating, dispatch }: any = props;

    if (!formUtils.shouldUpdateState(changedFields)) return;

    if (!validating || lodash.size(changedFields) === 1) {
      dispatch({
        type: `JPCLMOfDataCapture/saveSearchInsuredInfo`,
        payload: {
          changedFields,
        },
      });
    }
  },
  // @ts-ignore
  mapPropsToFields(props: IProps) {
    const { searchInsuredObj } = props;
    return formUtils.mapObjectToFields(searchInsuredObj, {
      policySource: (value: string | object) => value,
      policyId: (value: string | object) => value,
      clientId: (value: string | object) => value,
      firstName: (value: string | object) => value,
      surname: (value: string | object) => value,
      gender: (value: string | object) => value,
      middleName: (value: string | object) => value,
      dateOfBirth: (value: string | object) => (value ? moment(value) : null),
    });
  },
})
class SearchInsuredForm extends Component<IProps> {
  registeForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  searchInsured = () => {
    const { searchInsuredObj, dispatch }: any = this.props;
    const insuredObj = formUtils.formatFlattenValue(formUtils.cleanValidateData(searchInsuredObj));
    const hasAtLeastOne = lodash.some(searchInsuredValidateKeyArr, (key) => {
      return !lodash.isEmpty(insuredObj[key]);
    });
    if (!hasAtLeastOne) {
      notification.error({
        message: formatMessageApi({
          Label_COM_ErrorMessage: 'MSG_000389',
        }),
      });
      dispatch({
        type: `JPCLMOfDataCapture/savePartyListInfo`,
        payload: { insuredList: [] },
      });
      return;
    }
    dispatch({
      type: `JPCLMOfDataCapture/getInsuredInfo`,
      payload: { searchByPolicyId: false },
    });
  };

  render() {
    const { taskNotEditable, dictsOfGender, form } = this.props;
    return (
      <div className={searchStyles.searchInsured}>
        <Form layout="vertical">
          <FormLayout json={claimantLayout}>
            <FormItemInput
              form={form}
              disabled
              formName="policySource"
              maxLength={30}
              labelId="PolicySource"
              labelTypeCode="Label_BIZ_Policy"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="policyId"
              maxLength={30}
              labelId="policyNo"
              labelTypeCode="Label_BIZ_Policy"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="clientId"
              labelId="ClientID"
              labelTypeCode="Label_BIZ_Individual"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="firstName"
              maxLength={30}
              labelId="app.navigator.task-detail-of-data-capture.label.first-name"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="middleName"
              maxLength={30}
              labelId="MiddleName"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="surname"
              maxLength={30}
              labelId="app.navigator.task-detail-of-data-capture.label.surname"
            />
            <FormItemDatePicker
              form={form}
              disabled={taskNotEditable}
              formName="dateOfBirth"
              labelId="app.navigator.task-detail-of-data-capture.label.date-of-birth"
              format="L"
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              formName="gender"
              labelId="app.usermanagement.basicInfo.label.gender"
              dicts={dictsOfGender}
            />
          </FormLayout>
        </Form>
        {!taskNotEditable && (
          <div className={searchStyles.searchButton}>
            <Button key="submit" type="primary" onClick={this.searchInsured}>
              {/* {formatMessageApi({
                Label_BPM_Button: 'venus_claim.button.confirm',
              })} */}
              Search
              <Icon type="search" />
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(({ JPCLMOfDataCapture, dictionaryController, claimEditable }: any) => ({
  searchInsuredObj: JPCLMOfDataCapture.searchInsuredObj,
  dictsOfGender: dictionaryController.Gender,
  taskNotEditable: claimEditable.taskNotEditable,
}))(SearchInsuredForm);
