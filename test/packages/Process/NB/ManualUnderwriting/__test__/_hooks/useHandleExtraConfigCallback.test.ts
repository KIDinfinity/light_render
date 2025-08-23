import { renderHook } from '@testing-library/react-hooks';
import useHandleExtraConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleExtraConfigCallback';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetClientDetailList', () => {
  return jest.fn(() => {
    return [
      {
        id: 233,
      },
    ];
  });
});
jest.mock('basic/hooks/useGetFieldsCustomerTypeConfig', () => {
  return jest.fn(() => {
    return [];
  });
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig', () => {
  return jest.fn(() => {
    return [];
  })
})

jest.mock('process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions', () => {
  return jest.fn(({ fieldConfig }) => {
    return fieldConfig
  })
})

describe('use FilterFieldsByClientId', () => {
  test('if role is empty', () => {
    const renderer = renderHook(() => {
      return useHandleExtraConfigCallback({
        id: '233',
      });
    });
    const callback = renderer.result.current;
    const config = {};
    const result = callback({ config });
    expect(result).toEqual([]);
  });
});
