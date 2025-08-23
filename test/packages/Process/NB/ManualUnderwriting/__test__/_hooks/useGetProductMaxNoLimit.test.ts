import { renderHook } from '@testing-library/react-hooks';
import useGetProductMaxNoLimit from 'process/NB/ManualUnderwriting/_hooks/useGetProductMaxNoLimit';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageProductList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return ['RHLA', 'RHLA', 'RHLB', 'RHLC', 'RHLC', 'RHLC'];
    });
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCurrentContractTypeProductDicts', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          productCode: 'RHLA',
          maxNo: '2',
        },

        {
          productCode: 'RHLB',
          maxNo: null,
        },
        {
          productCode: 'RHLC',
          maxNo: 2,
        },
      ];
    });
});
describe('useGetProductMaxNoLimit', () => {
  test('test limit logic', () => {
    const renderer = renderHook(() => useGetProductMaxNoLimit());

    expect(renderer.result.current).toEqual(['RHLA', 'RHLC']);
  });
});
