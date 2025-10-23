import { renderHook } from '@testing-library/react-hooks';
import useGetButtonSustainabilityOperatorTitle from 'process/NB/ManualUnderwriting/_hooks/useGetButtonSustainabilityOperatorTitle';

jest.mock('@/utils/dictFormatMessage', () => {
  const dicts = {
    Label_BIZ_policy: {
      increasePrem: 'increasePrem',
      prolongTerm: 'prolongTerm',
      reduceSA: 'reduceSA',
    },
  };
  return {
    formatMessageApi: (params: any) => {
      const typeCode = Object.keys(params)[0];
      const dictCode = Object.values(params)[0];
      return dicts[typeCode][dictCode];
    },
  };
});

describe('useGetButtonSustainabilityOperatorTitle', () => {
  test('get title', () => {
    const optionName = 'increasePrem&prolongTerm';

    const renderer = renderHook(() => {
      return useGetButtonSustainabilityOperatorTitle({
        optionName,
      });
    });

    expect(renderer.result.current).toEqual('increasePrem & prolongTerm');
  });

  test('get title duplicate operator', () => {
    const optionName = 'reduceSA&increasePrem&increasePrem';

    const renderer = renderHook(() => {
      return useGetButtonSustainabilityOperatorTitle({
        optionName,
      });
    });

    expect(renderer.result.current).toEqual('reduceSA & increasePrem & increasePrem');
  });
});
