import { NAMESPACE } from 'process/PAEngine/VNBCalculator/config';

export const setVNBCalculatorData = (key: string, data: any, storage?: boolean) => ({
  type: `${NAMESPACE}/setVNBCalculatorData`,
  payload: { key, data },
  storage,
});

export const updateMainBenefitSAFactor = (key: string, mainFactor: number) => ({
  type: `${NAMESPACE}/updateMainBenefitSAFactor`,
  payload: { key, mainFactor },
});
