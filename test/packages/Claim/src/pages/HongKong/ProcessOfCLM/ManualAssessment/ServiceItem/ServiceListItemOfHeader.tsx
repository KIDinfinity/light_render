import React, { PureComponent } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import { Form } from 'antd';

import FormLayout from 'basic/components/Form/FormLayout';
import { getNotRepeatableCodes } from 'claim/pages/utils/getNotRepeatableCodes';
import { FormItemSelectPlus, formUtils } from 'basic/components/Form';
import FormItemCurrency from 'basic/components/Form/FormItem/FormItemCurrency';
import { serviceItemHeaderLayout } from '../FormLayout.json';
import { calculatPayoutAmountServiceLevel } from '../_models/functions/calculatePayoutAmount';

const FORMID_PREFIX = 'ServiceListItemHeader';

const mapStateToProps = (
  { HKCLMOfClaimAssessmentController, formCommonController, claimEditable }: any,
  { serviceItemId }: any
) => {
  const { claimEntities, claimProcessData } = HKCLMOfClaimAssessmentController;
  const serviceItemPayableListMapEntries = Object.entries(claimEntities.serviceItemPayableListMap);
  const serviceItemPayableList = [];
  lodash.map(serviceItemPayableListMapEntries, (item) => {
    if (item[1].serviceItemId === serviceItemId) {
      serviceItemPayableList.push(item[1]);
    }
  });
  return {
    totalPayableAmount: calculatPayoutAmountServiceLevel(
      claimEntities,
      claimProcessData,
      serviceItemId
    ),
    serviceItem: HKCLMOfClaimAssessmentController.claimEntities.serviceItemListMap[serviceItemId],
    validating: formCommonController.validating,
    repeatableServiceItemList: HKCLMOfClaimAssessmentController.repeatableServiceItemList,
    serviceItemListMap: HKCLMOfClaimAssessmentController.claimEntities.serviceItemListMap,
    taskNotEditable: claimEditable.taskNotEditable,
    claimDecision: lodash.get(HKCLMOfClaimAssessmentController, 'claimProcessData.claimDecision'),
  };
};

@connect(mapStateToProps)
// @ts-ignore
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch, serviceItemId, invoiceId, validating } = props;

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'HKCLMOfClaimAssessmentController/saveEntry',
            target: 'saveServiceItem',
            payload: {
              changedFields,
              serviceItemId,
              invoiceId,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'HKCLMOfClaimAssessmentController/saveFormData',
          target: 'saveServiceItem',
          payload: {
            changedFields,
            serviceItemId,
            invoiceId,
          },
        });
      }
    }
  },
  mapPropsToFields(props) {
    const { serviceItem, totalPayableAmount } = props;

    return formUtils.mapObjectToFields(serviceItem, {
      serviceItem: (value) => value,
      transId: () => totalPayableAmount,
    });
  },
})
class ServiceListItem extends PureComponent {
  componentDidMount = () => {
    this.registeForm();
  };

  unRegisterForm = () => {
    const { dispatch, form, serviceItemId }: any = this.props;

    if (serviceItemId) {
      dispatch({
        type: 'formCommonController/unRegisterForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${serviceItemId}`,
        },
      });
    }
  };

  registeForm = () => {
    const { dispatch, form, serviceItemId }: any = this.props;

    if (serviceItemId) {
      dispatch({
        type: 'formCommonController/registerForm',
        payload: {
          form,
          formId: `${FORMID_PREFIX}_${serviceItemId}`,
        },
      });
    }
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  handleDelete = () => {
    const { dispatch, invoiceId, serviceItemId }: any = this.props;

    dispatch({
      type: 'HKCLMOfClaimAssessmentController/removeServiceItem',
      payload: {
        invoiceId,
        serviceItemId,
      },
    });
  };

  onSelect = (value: any) => {
    const { dispatch, invoiceId }: any = this.props;

    dispatch({
      type: 'HKCLMOfClaimAssessmentController/getRepeatableByServiceCode',
      payload: {
        codes: [value],
        invoiceId,
      },
    });
  };

  render() {
    const {
      form,
      taskNotEditable,
      claimDecision,
      invoiceId,
      repeatableServiceItemList,
      serviceItemListMap,
    }: any = this.props;
    const payoutCurrency = claimDecision?.payoutCurrency;
    const notRepeatableCodeList = getNotRepeatableCodes({
      repeatableServiceItemList,
      invoiceId,
      serviceItemListMap,
    });
    return (
      <Form layout="vertical">
        <FormLayout json={serviceItemHeaderLayout}>
          <FormItemSelectPlus
            form={form}
            disabled={taskNotEditable}
            required
            disabledDictCodes={notRepeatableCodeList}
            onSelectCallback={this.onSelect}
            formName="serviceItem"
            searchName="serviceItem"
            labelId="app.navigator.task-detail-of-data-capture.label.item"
            dropdownCode="claim_dict001"
            optionShowType="both"
          />
          <FormItemCurrency
            form={form}
            disabled
            formName="transId"
            labelId="Payout Amount"
            name="fieldOne"
            hiddenPrefix
            currencyCode={payoutCurrency}
            hiddenDropDown
          />
        </FormLayout>
      </Form>
    );
  }
}

export default ServiceListItem;
