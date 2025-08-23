import styles from './index.less';
import { Button, Form } from 'antd';
import { connect, useDispatch } from 'dva';
import { useCallback, useEffect, useMemo } from 'react';
import {
  requestBenefitsConfig,
  requestProductsList,
} from 'process/PAEngine/VNBCalculator/services/vnbCalculatorServices';
import { setVNBCalculatorData } from 'process/PAEngine/VNBCalculator/_models/actions';
import { chain, has, isEmpty } from 'lodash';
import { useNavigatorStep } from 'process/PAEngine/VNBCalculator/_hooks';
import { FormItemCheckboxGroup, formUtils } from 'basic/components/Form';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import { useVNBCalculatorModel } from '../../_hooks/index';
import { FlexLayout } from '../../Layout/index';
import handleMessageModal from '@/utils/commonMessage';
import React from 'react';

const Screen1 = ({ form, setLoading }) => {
  const [currentStep, setCurrentStep] = useNavigatorStep();
  const {
    product,
    basicBenefit,
    productInfo,
    basicBenefitConfig,
    subBenefitConfig,
  } = useVNBCalculatorModel();
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    requestProductsList()
      .then((products) => {
        const productInfoMap = chain(products)
          .reduce((output, cur) => {
            output[cur.pid] = cur;
            return output;
          }, {})
          .value();
        dispatch(setVNBCalculatorData('productInfo', productInfoMap));
        setLoading(false);
      })
      .catch((error) => {
        handleMessageModal([{ code: '0001', content: error }]);
        setLoading(false);
      });
  }, [dispatch, setLoading]);

  useEffect(() => {
    if (!!product) {
      setLoading(true);
      requestBenefitsConfig(product)
        .then(([basicConfig, subConfig]) => {
          dispatch(setVNBCalculatorData('basicBenefitConfig', basicConfig));
          dispatch(setVNBCalculatorData('subBenefitConfig', subConfig));
          setLoading(false);
        })
        .catch((error) => {
          handleMessageModal([{ code: '0001', content: error }]);
          setLoading(false);
        });
    }
  }, [dispatch, product, setLoading]);

  const productOptions = useMemo(
    () =>
      chain(Object.values(productInfo || {}))
        .map((item) => ({ dictName: item.productName?.en, dictCode: item.pid }))
        .sort((a, b) => a.dictName.localeCompare(b.dictName))
        .value(),
    [productInfo]
  );

  const basicBenefitOptions = useMemo(
    () =>
      chain(Object.values(basicBenefitConfig || {}))
        ?.map((item) => ({
          dictName: item?.productName?.en,
          dictCode: item.pid,
        }))
        .sort((a, b) => a.dictName.localeCompare(b.dictName))
        .value() || [],
    [basicBenefitConfig]
  );

  const subBenefitOptions = useMemo(
    () =>
      chain(subBenefitConfig)
        .filter((item) => item.pid !== product)
        .map((item) => ({
          dictName: item?.productName?.en,
          dictCode: item.pid,
        }))
        .sort((a: any, b: any) => a.dictName.localeCompare(b.dictName))
        .value() || [],
    [product, subBenefitConfig]
  );

  const validateFn = useCallback(() => {
    const errorList = [];
    if (isEmpty(product)) {
      errorList.push({ code: '002', content: 'Product should not be null.' });
    } else if (isEmpty(basicBenefit)) {
      errorList.push({ code: '003', content: 'Basic benefit should not be null.' });
    }
    return errorList;
  }, [product, basicBenefit]);

  const onStartCalculation = useCallback(() => {
    const errorList = validateFn();
    if (isEmpty(errorList)) {
      setCurrentStep(currentStep + 1);
    } else {
      handleMessageModal(errorList);
    }
  }, [currentStep, setCurrentStep, validateFn]);

  return (
    <Form hidden={currentStep !== 1} className={styles.screen1}>
      <FlexLayout flexDirection="col">
        {productOptions.length > 0 && (
          <>
            <FormItemSelect
              required
              labelId="Products"
              formName="product"
              form={form}
              dicts={productOptions}
            />
            {product && basicBenefitOptions?.length > 0 && (
              <>
                <FormItemSelect
                  required
                  labelId="Basic Benefits"
                  formName="selectedBasicBenefit"
                  form={form}
                  dicts={basicBenefitOptions}
                />
                <FormItemCheckboxGroup
                  mode="multiple"
                  labelId="Sub Benefits"
                  formName="selectedSubBenefits"
                  form={form}
                  dicts={subBenefitOptions}
                />
              </>
            )}
          </>
        )}
        <Button className={styles.calcBtn} onClick={onStartCalculation}>
          Start Calculation
        </Button>
      </FlexLayout>
    </Form>
  );
};

export default connect(({ vnbCalculator }) => {
  const { product, basicBenefit, subBenefits } = vnbCalculator;
  return {
    product,
    basicBenefit,
    subBenefits,
  };
})(
  Form.create({
    onValuesChange(props, changedValues) {
      const { dispatch } = props;
      if (has(changedValues, 'selectedBasicBenefit')) {
        dispatch(setVNBCalculatorData('basicBenefit.pid', changedValues?.selectedBasicBenefit));
      }
      if (has(changedValues, 'selectedSubBenefits')) {
        dispatch(setVNBCalculatorData('subBenefits', {}));
        changedValues.selectedSubBenefits.forEach((pid) =>
          dispatch(setVNBCalculatorData(`subBenefits.${pid}.pid`, pid))
        );
      }
      if (has(changedValues, 'product')) {
        dispatch(setVNBCalculatorData('product', changedValues?.product));
      }
    },
    mapPropsToFields(props) {
      const { product, basicBenefit, subBenefits } = props;
      return formUtils.mapObjectToFields({
        product,
        selectedBasicBenefit: basicBenefit?.pid,
        selectedSubBenefits: Object.values(subBenefits || {}).map((ben) => ben?.pid),
      });
    },
  })(Screen1)
);
