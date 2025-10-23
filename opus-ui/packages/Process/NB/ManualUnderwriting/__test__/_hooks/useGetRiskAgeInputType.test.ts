import { renderHook } from '@testing-library/react-hooks';
import useGetRiskAgeInputType from 'process/NB/ManualUnderwriting/_hooks/useGetRiskAgeInputType';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCurrentPlanProductDuration', () => {
  return jest
    .fn(() => {})
    .mockImplementationOnce(() => {
      return [
        {
          policyTerm: '20',
          policyTermType: 'A',
          policyTermDisplayType: 'D',
        },
        {
          policyTerm: '20',
          policyTermType: 'A',
          policyTermDisplayType: 'T',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          policyTerm: '20',
          policyTermType: 'A',
          policyTermDisplayType: null,
        },
        {
          policyTerm: '20',
          policyTermType: 'A',
          policyTermDisplayType: null,
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          policyTerm: '20',
          policyTermType: 'A',
          policyTermDisplayType: 'T',
        },
        {
          policyTerm: '20',
          policyTermType: 'A',
          policyTermDisplayType: 'T',
        },
      ];
    });
});

describe('useGetRiskAgeInputType', () => {
  test('premium term type has A, policyTermDisplayType  has D', () => {
    const renderer = renderHook(() =>
      useGetRiskAgeInputType({
        coveraageItem: {},
        defaultFieldType: 'Text',
      })
    );

    expect(renderer.result.current).toEqual('Dropdown');
  });
  test('match default field type, policyTermDisplayType all null', () => {
    const renderer = renderHook(() =>
      useGetRiskAgeInputType({
        coveraageItem: {},
      })
    );

    expect(renderer.result.current).toEqual('Text');
  });

  test('policyTermDisplayType type all T', () => {
    const renderer = renderHook(() =>
      useGetRiskAgeInputType({
        coveraageItem: {},
      })
    );

    expect(renderer.result.current).toEqual('Text');
  });
});
