import { renderHook } from '@testing-library/react-hooks';
import useGetDisabledByDecisionEditInd from 'process/NB/ManualUnderwriting/_hooks/useGetDisabledByDecisionEditInd';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetProductionAndRider', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      return [
        {
          productCode: 'code',
          underwritingDecisionEditInd: 'N',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          productCode: 'code',
          underwritingDecisionEditInd: null,
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          productCode: 'code',
          underwritingDecisionEditInd: 'Y',
        },
      ];
    });
});

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');

  return {
    ...actual,
    useSelector: jest.fn(() => {
      return {
        policyList: [
          {
            coverageList: [
              {
                id: 'id',
                coreCode: 'code',
              },
            ],
          },
        ],
      };
    }),
  };
});

describe('useGetDisabledByDecisionEditInd', () => {
  test('test disabled', () => {
    const renderer = renderHook(() =>
      useGetDisabledByDecisionEditInd({
        id: 'id',
      })
    );
    expect(renderer.result.current).toBeTruthy();
  });
  test('test no data', () => {
    const renderer = renderHook(() =>
      useGetDisabledByDecisionEditInd({
        id: 'id',
      })
    );
    expect(renderer.result.current).toBeFalsy();
  });
  test('test not N', () => {
    const renderer = renderHook(() =>
      useGetDisabledByDecisionEditInd({
        id: 'id',
      })
    );
    expect(renderer.result.current).toBeFalsy();
  });
});
