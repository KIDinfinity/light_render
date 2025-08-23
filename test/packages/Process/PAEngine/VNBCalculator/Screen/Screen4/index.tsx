import React, { useCallback } from 'react';
import { connect } from 'dva';
import { Form, Button } from 'antd';
import { useNavigatorStep } from 'process/PAEngine/VNBCalculator/_hooks';
import { FormItemSelect, FormItemCheckbox, formUtils, FormItemNumber } from 'basic/components/Form';
import { useVNBCalculatorModel } from '../../_hooks/index';
import getOptionList from '../../utils/getOptionList';
import { FlexLayout } from '../../Layout/index';
import styles from './index.less';
import { setVNBCalculatorData } from 'process/PAEngine/VNBCalculator/_models/actions';
import { mapDataToOccClassAgePremium, validateModel } from '../../utils';
import handleMessageModal from '@/utils/commonMessage';
import { requestOccClassAgePremium } from 'process/PAEngine/VNBCalculator/services/vnbCalculatorServices';
import { useDispatch } from 'dva';

const Basic = ({ form, setLoading }: any) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useNavigatorStep();

  const model = useVNBCalculatorModel();
  const { basicConfig } = model;
  const { channel, salesProcess, premiumPayment } = basicConfig || {};

  const onNextClick = useCallback(() => {
    setLoading(true);
    validateModel(model)
      .then(() => {
        requestOccClassAgePremium(model)
          .then(([maxPremiumCfg, minPremiumCfg, midPremium]) => {
            setLoading(false);
            dispatch(setVNBCalculatorData('maxPremiumConfig', maxPremiumCfg));
            dispatch(setVNBCalculatorData('minPremiumConfig', minPremiumCfg));
            dispatch(
              setVNBCalculatorData('occClassAgePremium', mapDataToOccClassAgePremium(midPremium))
            );
            setCurrentStep(currentStep + 1);
          })
          .catch((error) => {
            setLoading(false);
            handleMessageModal([{ code: '0001', content: error }]);
          });
      })
      .catch((errorList) => {
        handleMessageModal(errorList);
        setLoading(false);
      });
  }, [currentStep, dispatch, model, setCurrentStep, setLoading]);

  return (
    <Form hidden={currentStep !== 4} className={styles.screen4}>
      <FlexLayout flexDirection="col">
        <FormItemSelect
          labelId="Channel"
          formName="channel"
          form={form}
          dicts={getOptionList(channel)}
        />
        <FormItemSelect
          labelId="Sales Process"
          formName="salesProcess"
          form={form}
          dicts={getOptionList(salesProcess)}
        />
        <FormItemSelect
          labelId="Premium Payment"
          formName="premiumPayment"
          form={form}
          dicts={getOptionList(premiumPayment)}
        />
        <FormItemCheckbox form={form} formName="careCard" labelId="Care Card" isInline />
        <FormItemNumber form={form} formName="targetAPE" labelId="Target APE ('million)" />
        <Button className={styles.calcBtn} onClick={onNextClick}>
          Next
        </Button>
      </FlexLayout>
    </Form>
  );
};

export default connect(({ formCommonController, vnbCalculator }: any) => ({
  validating: formCommonController.validating,
  basicInfo: vnbCalculator.basicInfo || {},
  targetAPE: vnbCalculator.targetAPE || 0,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        Object.values(changedFields).forEach((field: any) => {
          if (field.name === 'targetAPE') {
            dispatch(
              setVNBCalculatorData('targetAPE', Number(changedFields?.targetAPE?.value || 0))
            );
          } else {
            dispatch(
              setVNBCalculatorData(
                `basicInfo.${field.name}`,
                field.name === 'careCard' ? field.value === 1 : field.value
              )
            );
          }
        });
      }
    },
    mapPropsToFields(props: any) {
      const { basicInfo, targetAPE } = props;
      return formUtils.mapObjectToFields({
        ...basicInfo,
        careCard: basicInfo?.careCard ? 1 : 0,
        targetAPE,
      });
    },
  })(Basic)
);
