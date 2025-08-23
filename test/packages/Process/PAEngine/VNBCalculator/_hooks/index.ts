import { useContext, useEffect } from 'react';
import { NavigatorContext } from '../_context';
import type { VNBCalculatorState } from '../_models/state/index';
import { NAMESPACE } from '../config';
import useNamespaceModel from '@/_hooks/useNamespaceModel';
// import { SS, SSKey } from '@/utils/cache';

export const useMount = (fn: () => void) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fn(), []);
};

export const useNavigatorStep = (): [number, (step: number) => void] => {
  const navCxt = useContext(NavigatorContext);
  return [navCxt.currentStep, navCxt.setCurrentStep];
};

export const useVNBCalculatorModel = (): VNBCalculatorState => {
  const model = useNamespaceModel(NAMESPACE);
  // const ssModel = SS.getItem(SSKey.VNB_CALCULATOR_DATA);
  return { ...model } as VNBCalculatorState;
};

export const useGetSelectedBasicBeinfitInfo = () => {
  const { basicBenefit, basicBenefitConfig } = useVNBCalculatorModel();
  return basicBenefitConfig[basicBenefit?.pid] || {};
};
