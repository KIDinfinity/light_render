import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Icon, Form, Button } from 'antd';
import lodash from 'lodash';
import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput, FormItemSelect, formUtils } from 'basic/components/Form';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';

import type { IntActiveTaskItem } from 'claimBasicProduct/pages/UnknownDocument/_models/interfaces';
import { claimantLayout } from '../FormLayout.json';
import { validateSearchInsuredInfo } from '../_models/functions';

import searchStyles from './SearchInsuredModal.less';

const FORMID = 'newTask';
const searchInsuredValidateKeyArr: string[] = ['firstName', 'surname'];
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
        type: `PHCLMOfDataCaptureController/saveSearchInsuredInfo`,
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
      firstName: (value: string | object) => value,
      extName: (value: string | object) => value,
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

  setNewSearchInsuredObj = (key: string, value: string) => {
    const newSearchInsuredObj = {};
    newSearchInsuredObj[key] = {
      value: formUtils.queryValue(value),
      name: key,
      touched: true,
      dirty: false,
      errors: validateSearchInsuredInfo(key, formUtils.queryValue(value)),
      validating: false,
    };
    return newSearchInsuredObj;
  };

  searchInsured = () => {
    const { searchInsuredObj, dispatch }: any = this.props;
    const insuredObj = lodash.reduce(
      searchInsuredValidateKeyArr,
      (result, key) => {
        const obj = this.setNewSearchInsuredObj(key, searchInsuredObj[key]);
        result = { ...result, ...obj };
        return result;
      },
      {}
    );
    dispatch({
      type: `PHCLMOfDataCaptureController/saveSearchInsuredInfo`,
      payload: {
        changedFields: insuredObj,
      },
    });
    // 找出 searchInsuredObj 中是否包含有error的对象
    let error = 0;
    lodash.mapKeys(insuredObj, (val, key) => {
      if (!lodash.isEmpty(insuredObj[key].errors)) {
        error += 1;
        dispatch({
          type: `PHCLMOfDataCaptureController/saveInsuredListInfo`,
          payload: {
            insuredList: {},
          },
        });
      }
    });
    // error 为0 则必填的字段已有值 可以进行查询操作
    if (error === 0 && !lodash.isEmpty(searchInsuredObj)) {
      dispatch({
        type: `PHCLMOfDataCaptureController/searchInsuredInfoByKeys`,
        payload: {
          searchInsuredObj,
        },
      });
    }
  };

  render() {
    const { taskNotEditable, dictsOfGender, form } = this.props;
    return (
      <div className={searchStyles.searchInsured}>
        <Form layout="vertical">
          <FormLayout json={claimantLayout}>
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              required
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
              required
              formName="surname"
              maxLength={30}
              labelId="app.navigator.task-detail-of-data-capture.label.surname"
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="extName"
              maxLength={30}
              labelId="venus_claim.phowb.dataCapture.label.policyOwnerInformation.extName"
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

export default connect(
  ({ PHCLMOfDataCaptureController, dictionaryController, claimEditable }: any) => ({
    searchInsuredObj: PHCLMOfDataCaptureController.searchInsuredObj,
    dictsOfGender: dictionaryController.Gender,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)(SearchInsuredForm);
