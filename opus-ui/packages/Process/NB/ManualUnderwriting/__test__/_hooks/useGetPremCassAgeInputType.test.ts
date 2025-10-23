import { renderHook } from '@testing-library/react-hooks';
import useGetPremCassAgeInputType from 'process/NB/ManualUnderwriting/_hooks/useGetPremCassAgeInputType';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCurrentPlanProductDuration', () => {
  return jest
    .fn(() => {})
    .mockImplementationOnce(() => {
      return [
        {
          premiumTerm: '10',
          premiumTermType: 'A',
          premiumTermDisplayType: 'D',
        },
        {
          premiumTerm: '20',
          premiumTermType: 'A',
          premiumTermDisplayType: 'D',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          premiumTerm: '10',
          premiumTermType: 'Y',
          premiumTermDisplayType: 'D',
        },
        {
          premiumTerm: '20',
          premiumTermType: 'Y',
          premiumTermDisplayType: 'D',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          premiumTerm: '10',
          premiumTermType: 'Y',
          premiumTermDisplayType: 'T',
        },
        {
          premiumTerm: '20',
          premiumTermType: 'Y',
          premiumTermDisplayType: 'T',
        },
      ];
    });
});

describe('useGetPremCassAgeInputType', () => {
  test('premium term type has A, policyTermDisplayType  has D', () => {
    const renderer = renderHook(() =>
      useGetPremCassAgeInputType({
        coveraageItem: {},
        defaultFieldType: 'Text',
      })
    );

    expect(renderer.result.current).toEqual('Dropdown');
  });
  test('match default field type, policyTermDisplayType all null', () => {
    const renderer = renderHook(() =>
      useGetPremCassAgeInputType({
        coveraageItem: {},
        defaultFieldType: 'Radio',
      })
    );

    expect(renderer.result.current).toEqual('Radio');
  });

  test('policyTermDisplayType type all T', () => {
    const renderer = renderHook(() =>
      useGetPremCassAgeInputType({
        coveraageItem: {},
        defaultFieldType: 'Radio',
      })
    );

    expect(renderer.result.current).toEqual('Text');
  });
});
