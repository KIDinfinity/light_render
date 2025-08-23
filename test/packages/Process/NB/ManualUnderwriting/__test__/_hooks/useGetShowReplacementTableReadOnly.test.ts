import { renderHook } from '@testing-library/react-hooks';
import useGetShowReplacementTableReadOnly from 'process/NB/ManualUnderwriting/_hooks/useGetShowReplacementTableReadOnly';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetReplacementInfoList', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      return [
        {
          reasonForPolicyReplacement: '1212',
          gmtModified: '2022-08-01T09:59:56.000+0000',
          replacedPolicyId: '111',
          transId: 'd6f9917c-d264-470a-bbc3-38d468e84cb2',
          applicationNo: 'DAI2022080100005',
          modifier: '0',
          extensionToExistingProduct: null,
          planName: null,
          orderNum: null,
          satisfiedExplanation: null,
          sumAssured: 0,
          insuredSeqNo: '2',
          roleCode: null,
          statement: null,
          id: '35253a4a-2cfc-4c11-afb3-e31a743ad695',
          creator: 'PHLAMT',
          partyInfluence: null,
          otherPolicyType: '10',
          gmtCreate: '2022-08-01T09:59:56.000+0000',
          insurerName: 'AIA',
          insuranceCompanyName: 'AIA',
          otherReason: '111',
          deleted: 0,
          policyId: 'KH082501',
          policyType: 'Life',
          policyReplacementFlag: 'N',
          comment: null,
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          reasonForPolicyReplacement: '',
          gmtModified: '2022-08-01T09:59:56.000+0000',
          replacedPolicyId: '',
          transId: 'd6f9917c-d264-470a-bbc3-38d468e84cb2',
          applicationNo: 'DAI2022080100005',
          modifier: '0',
          extensionToExistingProduct: null,
          planName: null,
          orderNum: null,
          satisfiedExplanation: null,
          sumAssured: 0,
          insuredSeqNo: '2',
          roleCode: null,
          statement: null,
          id: '35253a4a-2cfc-4c11-afb3-e31a743ad695',
          creator: 'PHLAMT',
          partyInfluence: null,
          otherPolicyType: '10',
          gmtCreate: '2022-08-01T09:59:56.000+0000',
          insurerName: null,
          insuranceCompanyName: undefined,
          otherReason: '111',
          deleted: 0,
          policyId: 'KH082501',
          policyType: '',
          policyReplacementFlag: 'N',
          comment: null,
        },
      ];
    });
});

jest.mock('basic/components/Form', () => {
  return {
    formUtils: {
      formatFlattenValue: (param: any) => param,
      cleanValidateData: (param: any) => param,
    },
  };
});

describe('useGetShowReplacementTableReadOnly', () => {
  test('target field has value', () => {
    const renderer = renderHook(() => useGetShowReplacementTableReadOnly());

    expect(renderer.result.current).toBeTruthy();
  });
  test('target field all empty', () => {
    const renderer = renderHook(() => useGetShowReplacementTableReadOnly());

    expect(renderer.result.current).not.toBeTruthy();
  });
});
