import styles from './index.less';
import { Form, Button } from 'antd';
import { useNavigatorStep, useVNBCalculatorModel } from 'process/PAEngine/VNBCalculator/_hooks';
import { useCallback } from 'react';
import { FlexLayout } from 'process/PAEngine/VNBCalculator/Layout';
import { connect, useDispatch } from 'dva';
import { setVNBCalculatorData } from 'process/PAEngine/VNBCalculator/_models/actions';
import { chain, get, isEmpty } from 'lodash';
import { requestAgeGroupConfig } from 'process/PAEngine/VNBCalculator/services/vnbCalculatorServices';
import handleMessageModal from '@/utils/commonMessage';
import { FormItemNumber, formUtils } from 'basic/components/Form';
import {
  mapBenefitPlanFields,
  mapSubBenefitPlanFields,
} from 'process/PAEngine/VNBCalculator/utils';
import { updateMainBenefitSAFactor } from '../../_models/actions';

const Screen2 = ({ form, setLoading }) => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useNavigatorStep();

  const model = useVNBCalculatorModel();
  const { basicBenefitConfig, subBenefitConfig, subBenefits, basicBenefit, product } = model;

  const validateFn = useCallback(() => {
    const errorList = [];
    if (get(basicBenefit, 'sumAssured1', 0) === 0) {
      const basicBenefitCfg = basicBenefitConfig[basicBenefit?.pid];
      errorList.push({
        code: '0004',
        content: `Please input the ${basicBenefitCfg?.productName?.en} plan value.`,
      });
    }
    Object.values(subBenefits || {}).forEach((ben) => {
      Array(10)
        .fill(0)
        .some((_, index) => {
          if (
            get(basicBenefit, `sumAssured${index + 1}`, 0) !== 0 &&
            get(ben, `sumAssured${index + 1}`, 0) === 0 &&
            !ben?.mainBenefitSAFactor
          ) {
            const subBenefitCfg = subBenefitConfig[ben?.pid];
            errorList.push({
              code: '0005',
              content: `Please input the ${subBenefitCfg?.productName?.en} plan${index + 1} value.`,
            });
            return true;
          }
          return false;
        });
    });
    return errorList;
  }, [basicBenefit, basicBenefitConfig, subBenefitConfig, subBenefits]);

  const onNextClick = useCallback(() => {
    const errorList = validateFn();
    if (isEmpty(errorList)) {
      setLoading(true);
      requestAgeGroupConfig(product)
        .then(([ageGroupCfg, genderCfg, occupationClassCfg, paymentModeCfg, basicCfg]) => {
          setLoading(false);
          dispatch(setVNBCalculatorData('ageGroupConfig', ageGroupCfg));
          dispatch(setVNBCalculatorData('genderConfig', genderCfg));
          dispatch(setVNBCalculatorData('occupationClassConfig', occupationClassCfg));
          dispatch(setVNBCalculatorData('paymentModeConfig', paymentModeCfg));
          dispatch(setVNBCalculatorData('basicConfig', basicCfg));
          setCurrentStep(currentStep + 1);
        })
        .catch((error) => {
          setLoading(false);
          handleMessageModal([{ code: '0001', content: error }]);
        });
    } else {
      handleMessageModal(errorList);
    }
  }, [currentStep, dispatch, product, setCurrentStep, setLoading, validateFn]);

  const planInputs = (name: string, mainFactor?: number) => (
    <FlexLayout flexDirection="row" className={styles.flexGap}>
      {Array(10)
        .fill(0)
        .map((_, index) => {
          return (
            <FormItemNumber
              key={`plan_input_${name}_${index + 1}`}
              precision={0}
              labelId={`Plan${index + 1}`}
              formName={`${name}_sumAssured${index + 1}`}
              form={form}
              min={0}
              disabled={!!mainFactor}
            />
          );
        })}
    </FlexLayout>
  );

  return (
    <Form hidden={currentStep !== 2} className={styles.screen2}>
      <FlexLayout flexDirection="col" className={styles.flexGap}>
        <p>Please input the sum covered for the benefits:</p>
        <h3>{basicBenefitConfig[basicBenefit?.pid]?.productName?.en}</h3>
        {planInputs('basicBenefit')}
        {chain(Object.values(subBenefits || {}))
          .map((benefit) => (
            <div key={`subbenefit_${benefit?.pid}_layout`}>
              <FlexLayout flexDirection="col" className={styles.flexGap}>
                <h3>{subBenefitConfig[benefit?.pid]?.productName?.en}</h3>
                <div className={styles.factor}>
                  <FormItemNumber
                    precision={0}
                    className={styles.factorInput}
                    key={`factor_${benefit?.pid}`}
                    labelId="SA Factor(%)"
                    formName={`subBenefits_${benefit?.pid}_mainBenefitSAFactor`}
                    form={form}
                    min={0}
                  />
                </div>
                {planInputs(`subBenefits_${benefit?.pid}`, benefit?.mainBenefitSAFactor)}
              </FlexLayout>
            </div>
          ))
          .value()}
        <Button className={styles.nextBtn} onClick={onNextClick}>
          Next
        </Button>
      </FlexLayout>
    </Form>
  );
};

export default connect(({ vnbCalculator }) => {
  const { basicBenefit, subBenefits } = vnbCalculator;
  return { basicBenefit, subBenefits };
})(
  Form.create({
    onValuesChange(props, changedValues) {
      const { dispatch } = props;
      Object.entries(changedValues || {}).forEach(([key, value]) => {
        const field = key.replace(/_/g, '.');
        if (field.endsWith('mainBenefitSAFactor')) {
          dispatch(updateMainBenefitSAFactor(field, value || undefined));
        } else {
          dispatch(setVNBCalculatorData(field, value || undefined));
        }
      });
    },
    mapPropsToFields(props) {
      const { basicBenefit, subBenefits } = props;
      return formUtils.mapObjectToFields({
        ...mapBenefitPlanFields(basicBenefit),
        ...mapSubBenefitPlanFields(basicBenefit, subBenefits),
      });
    },
  })(Screen2)
);
