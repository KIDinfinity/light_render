import React, { useCallback } from 'react';
import { useNavigatorStep } from 'process/PAEngine/VNBCalculator/_hooks/index';
import { requestVNBQuotation } from 'process/PAEngine/VNBCalculator/services/vnbCalculatorServices';
import { useDispatch } from 'dva';
import { setVNBCalculatorData } from '../../_models/actions/index';
import { FlexLayout } from '../../Layout';
import { useVNBCalculatorModel } from '../../_hooks/index';
import PremiumGrid, { PremiumGridStatic } from './PremiumGrid';
import styles from './index.less';
import { Button } from 'antd';
import { isEmpty } from 'lodash';
import { validateModel } from '../../utils';
import handleMessageModal from '@/utils/commonMessage';

const Screen5 = ({ setLoading }: any) => {
  const [currentStep, setCurrentStep] = useNavigatorStep();
  const dispatch = useDispatch();
  const model = useVNBCalculatorModel();
  const { maxPremiumConfig, minPremiumConfig, occClassAgePremium } = model;

  const onCalculateClick = useCallback(() => {
    setLoading(true);
    validateModel(model)
      .then(() =>
        requestVNBQuotation(model)
          .then((summary) => {
            setLoading(false);
            if (!isEmpty(summary)) {
              setCurrentStep(currentStep + 1);
              dispatch(setVNBCalculatorData('summary', summary));
              dispatch(setVNBCalculatorData('proposalInfo', null));
            } else {
              handleMessageModal([{ code: '0001', content: 'Get calculation summary fialed.' }]);
            }
          })
          .catch((errorList) => {
            setLoading(false);
            handleMessageModal(errorList);
          })
      )
      .catch((errorList) => {
        setLoading(false);
        handleMessageModal(errorList);
      });
  }, [currentStep, dispatch, model, setCurrentStep, setLoading]);

  return (
    <FlexLayout flexDirection="col" hidden={currentStep !== 5} className={styles.screen5}>
      <h2>Tariff</h2>
      {minPremiumConfig && maxPremiumConfig && (
        <>
          <PremiumGridStatic
            minPremiumConfig={minPremiumConfig}
            prefix="min"
            prefixLabel="Min"
            className={styles.premiumGrid}
          />
          <PremiumGridStatic
            maxPremiumConfig={maxPremiumConfig}
            prefix="max"
            prefixLabel="Max"
            className={styles.premiumGrid}
          />
          <PremiumGrid
            minPremiumConfig={minPremiumConfig}
            maxPremiumConfig={maxPremiumConfig}
            occClassAgePremium={occClassAgePremium}
            editable={true}
            prefix="selected"
            prefixLabel="Selected"
            description={'(Please input amount in below table)'}
            className={styles.premiumGrid}
          />
          <Button onClick={onCalculateClick}>Calculate</Button>
        </>
      )}
    </FlexLayout>
  );
};

export default Screen5;
