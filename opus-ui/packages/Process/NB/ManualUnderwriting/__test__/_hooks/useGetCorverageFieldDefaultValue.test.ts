import { renderHook } from '@testing-library/react-hooks';
import useGetCorverageFieldDefaultValue from 'process/NB/ManualUnderwriting/_hooks/useGetCorverageFieldDefaultValue';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetProductionAndRider', () => {
  return jest.fn().mockImplementationOnce(() => {
    return [
      {
        productCode: 'codeSelect',
        productName: 'product',
        linkProductCode: 'target',
      },
    ];
  });
});
jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest.fn().mockImplementationOnce(() => {
    return [
      {
        coreCode: 'target',
        permiumTerm: '666',
      },
    ];
  });
});
jest.mock('process/NB/ManualUnderwriting/_hooks/useGetBasicProductData', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      return {};
    })
    .mockImplementationOnce(() => {
      return {
        permiumTerm: '555',
      };
    });
});
jest.mock('process/NB/ManualUnderwriting/_hooks/useGetLinkProductDefaultValue', () => {
  return jest.fn(({  }) => {
    return () => {
      return '666'
    }
  })
  .mockImplementationOnce(({ }) => {
    return () => {
      return '666'
    }
  })
  .mockImplementationOnce(({}) => {
    return () => {
      return '555'
    }
  })
})

describe('useGetCorverageFieldDefaultValue', () => {
  test('has link code &  target prodcut', () => {
    const renderer = renderHook(() =>
      useGetCorverageFieldDefaultValue({
        id: '233',
        fieldKey: 'permiumTerm',
      })
    );
    const handler = renderer.result.current;
    expect(handler('codeSelect')).toEqual('666');
  });
  test('not matach target product', () => {
    const renderer = renderHook(() =>
      useGetCorverageFieldDefaultValue({
        id: '233',
        fieldKey: 'permiumTerm',
      })
    );
    const handler = renderer.result.current;
    expect(handler('codeSelect')).toEqual('555');
  });
});
