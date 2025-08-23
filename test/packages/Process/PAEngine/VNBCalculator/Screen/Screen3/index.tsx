import { connect } from 'dva';
import { FlexLayout } from '../../Layout/index';
import { useNavigatorStep, useVNBCalculatorModel } from '../../_hooks/index';
import { setVNBCalculatorData } from '../../_models/actions/index';
import { chain, entries, isEmpty, values } from 'lodash';
import { Button, Form } from 'antd';
import handleMessageModal from '@/utils/commonMessage';
import { useCallback } from 'react';
import styles from './index.less';
import classNames from 'classnames';
import { FormItemNumber, formUtils } from 'basic/components/Form';
import { mapAlerationFields } from '../../utils';

const Screen3 = ({ form }) => {
  const [currentStep, setCurrentStep] = useNavigatorStep();
  const {
    ageGroupConfig,
    genderConfig,
    occupationClassConfig,
    paymentModeConfig,
    alterations,
  } = useVNBCalculatorModel();

  const renderFieldsByConfig = (name, config) => {
    return chain(Object.values(config || {}))
      .map((cfg) => (
        <FormItemNumber
          key={`alterations_${name}_${cfg?.value}`}
          labelId={cfg?.label?.en}
          precision={0}
          className={styles.ageInput}
          formName={`alterations_${name}_${cfg?.value}`}
          form={form}
          min={0}
          max={100}
          suffix="%"
        />
      ))
      .value();
  };

  const valiData = ({ datas }: any) => {
    const errorList = [];
    chain(['ageGroup', 'gender', 'occupationClass', 'paymentMode', 'planAllocation'])
      .some((key) => {
        const data = datas[key] || {};
        const total = chain(values(data))
          .reduce((totals: number, allocation) => {
            return totals + Number(allocation || 0);
          }, 0)
          .value();
        if (total !== 100) {
          errorList.push({
            code: key,
            content: `${key} should be 100%`,
          });
          return true;
        }
        return false;
      })
      .value();
    return errorList;
  };

  const planAllocations = () =>
    Array(10)
      .fill(0)
      .map((_, index) => (
        <FormItemNumber
          labelId={`Plan ${index + 1}`}
          key={`plan_allocation_${index + 1}`}
          precision={0}
          className={styles.ageInput}
          formName={`alterations_planAllocation_P${index + 1}`}
          form={form}
          min={0}
          max={100}
          suffix="%"
        />
      ));

  const onNextClick = useCallback(() => {
    const errorList = valiData({ datas: alterations });
    if (!isEmpty(errorList)) {
      handleMessageModal(errorList);
    } else {
      setCurrentStep(currentStep + 1, true);
    }
  }, [currentStep, setCurrentStep, alterations]);

  return (
    <Form hidden={currentStep !== 3} className={styles.screen3}>
      <FlexLayout flexDirection="col" className={styles.flexGap}>
        <p>
          Please provide the potential mixture by age group, else please provide the minimum and
          maximum coverage age:
        </p>
        <h3>Age Group:</h3>
        <FlexLayout flexDirection="row" className={classNames(styles.flexGap, styles.flexWrap)}>
          {renderFieldsByConfig('ageGroup', ageGroupConfig)}
        </FlexLayout>
        <p>
          Please provide the potential mixture by gender, occupation class and payment frequency:
        </p>
        <h3>Gender:</h3>
        <FlexLayout flexDirection="row" className={classNames(styles.flexGap, styles.flexWrap)}>
          {renderFieldsByConfig('gender', genderConfig)}
        </FlexLayout>
        <h3>Occupation Class:</h3>
        <FlexLayout flexDirection="row" className={classNames(styles.flexGap, styles.flexWrap)}>
          {renderFieldsByConfig('occupationClass', occupationClassConfig)}
        </FlexLayout>
        <h3>Mode of Payment:</h3>
        <FlexLayout flexDirection="row" className={classNames(styles.flexGap, styles.flexWrap)}>
          {renderFieldsByConfig('paymentMode', paymentModeConfig)}
        </FlexLayout>
        <h3>Plan Allocation:</h3>
        <FlexLayout flexDirection="row" className={classNames(styles.flexGap, styles.flexWrap)}>
          {planAllocations()}
        </FlexLayout>
        <Button className={styles.nextBtn} onClick={onNextClick}>
          Next
        </Button>
      </FlexLayout>
    </Form>
  );
};

export default connect(({ vnbCalculator }) => {
  const { alterations } = vnbCalculator;
  return { alterations };
})(
  Form.create({
    onValuesChange(props, changedValues) {
      const { dispatch } = props;
      entries(changedValues).forEach(([key, val]) => {
        const field = key.replace(/_/g, '.');
        dispatch(setVNBCalculatorData(field, val || undefined));
      });
    },
    mapPropsToFields(props) {
      const { alterations } = props;
      return formUtils.mapObjectToFields({ ...mapAlerationFields(alterations) });
    },
  })(Screen3)
);
