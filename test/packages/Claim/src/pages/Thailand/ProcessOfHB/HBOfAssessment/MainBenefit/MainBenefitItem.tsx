import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Form } from 'antd';
import type { FormComponentProps } from 'antd/lib/form';

import FormLayout from 'basic/components/Form/FormLayout';
import { FormItemInput, FormItemSelect, formUtils } from 'basic/components/Form';
import CardOfClaim from 'basic/components/Form/FormCard';
import { mainBenefitLayout } from '../FormLayout.json';

const FORMID_PREFIX = 'MainBenefitListItem';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  mainBenefitId: string;
  treatmentId: string;
  dateTimeOfDeath: Date;
  incidentDate: Date;
  existMainBenefitItems: string[];
}

@connect(
  (
    { hbOfClaimAssessmentController, dictionaryController, loading }: any,
    { mainBenefitId }: any
  ) => ({
    mainBenefitItem: hbOfClaimAssessmentController.claimEntities.mainBenefitListMap[mainBenefitId],
    dictsOfMainBenefit: dictionaryController.MainBenefit,
    loadingOfFindDictionary: loading.effects['dictionaryController/findDictionaryByTypeCodes'],
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props: any, changedFields: any) {
    const { dispatch, mainBenefitId, treatmentId } = props;
    dispatch({
      type: 'hbOfClaimAssessmentController/saveMainBenefitItem',
      payload: {
        changedFields,
        treatmentId,
        mainBenefitId,
      },
    });
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
  handleDelete = () => {
    const { dispatch, treatmentId, mainBenefitId } = this.props;

    dispatch({
      type: 'hbOfClaimAssessmentController/removeMainBenefitItem',
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
    }: any = this.props;

    return (
      <CardOfClaim showButton={false} handleClick={this.handleDelete}>
        <Form layout="vertical">
          <FormLayout json={mainBenefitLayout}>
            <FormItemSelect
              form={form}
              disabled
              required
              formName="mainBenefit"
              labelId="venus-claim-label-mainBenefit"
              dicts={dictsOfMainBenefit}
              loading={loadingOfFindDictionary}
              existCodes={existMainBenefitItems}
            />
            <FormItemInput
              form={form}
              disabled
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
