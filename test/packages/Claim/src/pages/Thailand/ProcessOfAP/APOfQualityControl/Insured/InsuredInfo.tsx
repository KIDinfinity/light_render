import React, { Component } from 'react';
import { Card, Form } from 'antd';
import type { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemDatePicker from 'basic/components/Form/FormItem/FormItemDatePicker';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import type { IDictionary, INationality } from '@/dtos/dicts';
import type { IInsured } from '@/dtos/claim';
import { insuredLayout } from '../FormLayout.json';
import styles from './InsuredInfo.less';
import ButtonOfSmall from 'claim/components/ButtonOfSmall';

const FORMID = 'insured';

interface IProps {
  dispatch?: Dispatch<any>;
  insured?: IInsured;
  form?: any;
  loadingOfFindDictionary?: boolean;
  dictsOfGender?: IDictionary[];
  occupationDropdown?: IDictionary[];
  dictsOfIdentityType?: IDictionary[];
  nationalityDropdown?: INationality[];
  dictsOfCurrentState?: IDictionary[];
  caseCategory?: string;
  taskNotEditable?: boolean;
  refreshLoading?: boolean;
}

interface IFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  insured?: IInsured;
  validating: boolean;
}
// @ts-ignore
@connect(
  ({
    dictionaryController,
    loading,
    apOfClaimCaseController,
    formCommonController,
    claimEditable,
    processTask,
  }: any) => ({
    dictsOfGender: dictionaryController.Gender,
    dictsOfIdentityType: dictionaryController.IdentityType,
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    refreshLoading: loading.effects['apOfClaimCaseController/reloadInsureInfo'],
    insured: lodash.get(apOfClaimCaseController, 'claimProcessData.insured') || {},
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
    caseCategory: processTask?.getTask?.caseCategory,
  })
)
// @ts-ignore
@Form.create<IFormProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;
    if (!formUtils.shouldUpdateState(changedFields)) return;
    // @ts-ignore
    let finalChangedFields = formUtils.onFieldsChangeOfDate(changedFields, ['dateOfBirth']);
    finalChangedFields = formUtils.onFieldsChangeOfDateOrgin(finalChangedFields, [
      // @ts-ignore
      'dateTimeOfDeath',
    ]);
    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'apOfClaimCaseController/saveEntry',
            target: 'saveInsured',
            payload: {
              changedFields: finalChangedFields,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'apOfClaimCaseController/saveFormData',
          target: 'saveInsured',
          payload: {
            changedFields: finalChangedFields,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { insured } = props;
    return formUtils.mapObjectToFields(insured, {
      firstName: (value: string | Record<string, unknown>) => value,
      middleName: (value: string | Record<string, unknown>) => value,
      surname: (value: string | Record<string, unknown>) => value,
      gender: (value: string | Record<string, unknown>) => value,
      identityType: (value: string | Record<string, unknown>) => value,
      identityNo: (value: string | Record<string, unknown>) => value,
      dateOfBirth: (value: string | Record<string, unknown>) => (value ? moment(value) : null),
      age: (value: string | Record<string, unknown>) => value,
    });
  },
})
class InsuredInfo extends Component<IProps> {
  componentDidMount = () => {
    this.registeForm();
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  registeForm = () => {
    const { dispatch, form } = this.props;

    (dispatch as Dispatch)({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    (dispatch as Dispatch)({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };
  refreshInsuredInfo = async () => {
    const { dispatch, caseCategory, form } = this.props;
    const errors = await formUtils.validateFormsAndGetErrors({
      forms: [form],
      force: true,
    });
    if (errors.length > 0) return;
    (dispatch as Dispatch)({
      type: 'apOfClaimCaseController/reloadInsureInfo',
      payload: {
        caseCategory,
      },
    });
  };
  render() {
    const {
      form,
      loadingOfFindDictionary,
      dictsOfGender,
      dictsOfIdentityType,
      taskNotEditable,
      refreshLoading,
      insured,
    } = this.props;
    const canReload = !taskNotEditable && insured?.enableReload !== 'N';
    return (
      <div className={styles.insured}>
        <Card
          title={formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.insured-information',
          })}
          extra={
            canReload && (
              <ButtonOfSmall
                icon="sync"
                handleClick={this.refreshInsuredInfo}
                loading={refreshLoading}
              />
            )
          }
        >
          <Form layout="vertical">
            <FormLayout json={insuredLayout}>
              <FormItemInput
                form={form}
                disabled
                formName="firstName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.first-name"
              />
              <FormItemInput
                form={form}
                disabled
                formName="middleName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.middle-name"
              />
              <FormItemInput
                form={form}
                disabled
                required
                formName="surname"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.surname"
              />
              <FormItemSelect
                form={form}
                disabled={!canReload}
                formName="gender"
                labelId="app.usermanagement.basicInfo.label.gender"
                dicts={dictsOfGender}
                loading={loadingOfFindDictionary}
              />
              <FormItemSelect
                form={form}
                disabled={!canReload}
                required
                formName="identityType"
                labelId="app.usermanagement.basicInfo.label.id-entity-type"
                dicts={dictsOfIdentityType}
                loading={loadingOfFindDictionary}
              />
              <FormItemInput
                form={form}
                disabled={!canReload}
                required
                formName="identityNo"
                maxLength={20}
                labelId="app.navigator.task-detail-of-data-capture.label.identity-no"
              />
              <FormItemDatePicker
                form={form}
                disabled
                required
                formName="dateOfBirth"
                labelId="app.navigator.task-detail-of-data-capture.label.date-of-birth"
                format="L"
              />
              <FormItemInput
                form={form}
                disabled
                formName="age"
                maxLength={200}
                labelId="app.usermanagement.basicInfo.label.age"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default InsuredInfo;
