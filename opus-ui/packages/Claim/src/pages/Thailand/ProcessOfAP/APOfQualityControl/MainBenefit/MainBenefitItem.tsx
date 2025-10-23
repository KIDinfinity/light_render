import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Form } from 'antd';
import type { FormComponentProps } from 'antd/lib/form';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput, FormItemSelect, formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { shouldUpdateState } from 'claim/pages/utils/formUtils';
import { mainBenefitLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'MainBenefitListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  mainBenefitId: string;
  treatmentId: string;
  dateTimeOfDeath: Date;
  incidentDate: Date;
  existMainBenefitItems: string[];
  validating: boolean;
}

@connect(
  (
    {
      apOfClaimCaseController,
      dictionaryController,
      loading,
      formCommonController,
      claimEditable,
    }: any,
    { mainBenefitId }: any
  ) => ({
    mainBenefitItem: apOfClaimCaseController.claimEntities.mainBenefitListMap[mainBenefitId],
    dictsOfMainBenefit: dictionaryController.MainBenefit,
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props: any, changedFields: any) {
    const { dispatch, mainBenefitId, treatmentId, validating } = props;
    if (shouldUpdateState(validating, changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'apOfClaimCaseController/saveEntry',
            target: 'saveMainBenefitItem',
            payload: {
              changedFields,
              treatmentId,
              mainBenefitId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'apOfClaimCaseController/saveFormData',
          target: 'saveMainBenefitItem',
          payload: {
            changedFields,
            treatmentId,
            mainBenefitId,
          },
        });
      }
    }
  },
  mapPropsToFields(props: any) {
    const { mainBenefitItem } = props;

    return formUtils.mapObjectToFields(mainBenefitItem, {
      mainBenefit: (value: any) => value,
      doctor: (value: any) => value,
    });
  },
})
class MainBenefitItem extends Component<IProps> {
  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, mainBenefitId } = this.props;

    if (mainBenefitId) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${mainBenefitId}`,
        },
      });
    }
  };

  registeForm = () => {
    const { dispatch, form, mainBenefitId } = this.props;

    if (mainBenefitId) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${mainBenefitId}`,
        },
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  handleDelete = () => {
    const { dispatch, treatmentId, mainBenefitId } = this.props;

    dispatch({
      type: 'apOfClaimCaseController/removeMainBenefitItem',
      payload: {
        treatmentId,
        mainBenefitId,
      },
    });
  };

  render() {
    const {
      form,
      dictsOfMainBenefit,
      loadingOfFindDictionary,
      existMainBenefitItems,
      taskNotEditable,
    }: any = this.props;

    return (
      <CardOfClaim showButton={!taskNotEditable} handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={mainBenefitLayout}>
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              required
              formName="mainBenefit"
              labelId="venus-claim-label-mainBenefit"
              dicts={dictsOfMainBenefit}
              loading={loadingOfFindDictionary}
              existCodes={existMainBenefitItems}
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              required
              formName="doctor"
              maxLength={60}
              labelId="app.navigator.task-detail-of-data-capture.label.name-of-doctor"
            />
          </FormLayout>
        </Form>
      </CardOfClaim>
    );
  }
}

export default MainBenefitItem;
