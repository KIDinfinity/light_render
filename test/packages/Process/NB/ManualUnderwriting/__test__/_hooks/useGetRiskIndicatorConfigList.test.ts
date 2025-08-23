import { renderHook } from '@testing-library/react-hooks';
import useGetRiskIndicatorConfigList from 'process/NB/ManualUnderwriting/_hooks/useGetRiskIndicatorConfigList';

let mockBizData = {};
jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: (callback: Function) => {
      const state = {
        manualUnderwriting: {
          businessData: mockBizData,
        },
      };
      return callback(state);
    },
  };
});
jest.mock('@/utils/dictFormatMessage', () => {
  const dicts = {
    Dropdown_IND_RiskIndicator: {
      MAS: 'mas',
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
jest.mock('process/NB/ManualUnderwriting/_hooks/useRiskIndicatorConfigFilterListByRole', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          riskFactorCode: 'MAS',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          riskFactorCode: 'MAS',
        },
      ];
    });
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetTooltipTitle', () => {
  return jest.fn(({ tagList }: any) => {
    return tagList.map((item: any) => ({
      ...item,
      tooltipTitle: 'mock-title',
    }));
  });
});
describe('test get risk indicator config list', () => {
  test('clientInfoList empty', () => {
    mockBizData = {
      riskIndicatorConfigList: [],
    };
    const renderer = renderHook(() => {
      return useGetRiskIndicatorConfigList({ id: 233 });
    });
    expect(renderer.result.current).toEqual([]);
  });
  test('riskIndicatorList empty', () => {
    const renderer = renderHook(() => {
      return useGetRiskIndicatorConfigList({
        id: 233,
      });
    });
    expect(renderer.result.current).toEqual([]);
  });
  test('riskIndicatorList not match', () => {
    mockBizData = {
      riskIndicatorConfigList: [
        {
          riskFactorCode: 'MAS',
        },
      ],
      policyList: [
        {
          clientInfoList: [
            {
              id: 233,
              riskIndicatorList: [],
            },
          ],
        },
      ],
    };
    const renderer = renderHook(() => {
      return useGetRiskIndicatorConfigList({
        id: 233,
      });
    });
    expect(renderer.result.current).toEqual([
      {
        label: 'mas',
        status: 'notMatch',
        fecRiskMsg: '',
        riskScore: '',
        tooltipTitle: 'mock-title',
      },
    ]);
  });
});
