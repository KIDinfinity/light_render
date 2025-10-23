import { renderHook } from '@testing-library/react-hooks';
import useGetCoverageItemValue from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageItemValue';

jest.mock('@/utils/accuracy', () => {
  return {
    getFieldDisplayAmount: (value: any) => value + 1,
  };
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetcfgPlanHospitalBenefitTarget', () => {
  return jest.fn(() => {
    return {};
  });
});

jest.mock('dva', () => {
  const ActualEntity = jest.requireActual('dva');
  return {
    ...ActualEntity,
    useSelector: () => {
      return [];
    },
  };
});

jest.mock('@/utils/dictFormatMessage', () => {
  const actual = jest.requireActual('@/utils/dictFormatMessage');

  return {
    ...actual,
    getDrowDownList: jest.fn(() => {
      return [];
    }),
  };
});
describe('useGetCoverageItemValue', () => {
  test('normal', () => {
    const renderer = renderHook(() =>
      useGetCoverageItemValue({
        item: {
          name: 'user',
        },
        col: {
          key: 'name',
        },
      })
    );
    expect(renderer.result.current).toEqual({
      normal: 'user',
    });
    expect(true).toBeTruthy();
  });
  test('use formart', () => {
    const item = {
      coreCode: 'code',
      productName: 'newProduct',
    };
    const col = {
      key: 'coreCode',
      format: ['coreCode', 'productName'],
    };
    const renderer = renderHook(() =>
      useGetCoverageItemValue({
        item,
        col,
      })
    );

    expect(renderer.result.current).toEqual({ normal: 'code-newProduct' });
  });
});
