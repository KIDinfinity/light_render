import { renderHook } from '@testing-library/react-hooks';
import useGetCoverageInsuredClientIds from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageInsuredClientIds';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'coverage-1',
          coverageInsuredList: [
            {
              id: 'insured-1',
              clientId: 'insured-client-1',
            },
          ],
        },
        {
          id: 'coverage-2',
          coverageDecision: {
            uwDecision: 'NS',
          },
          coverageInsuredList: [
            {
              id: 'coverage-1',
              clientId: 'insured-client-1',
            },
            {
              id: 'coverage-2',
              clientId: 'insured-client-2',
            },
          ],
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'coverage-1',
          coverageInsuredList: [
            {
              id: 'insured-1',
              clientId: 'insured-client-1',
            },
          ],
        },
        {
          id: 'coverage-2',
          coverageDecision: {
            uwDecision: 'NS',
          },
          coverageInsuredList: [
            {
              id: 'coverage-1',
              clientId: 'insured-client-1',
            },
            {
              id: 'coverage-2',
              clientId: 'insured-client-2',
            },
          ],
        },

        {
          id: 'coverage-3',
          coverageDecision: {
            uwDecision: 'NS',
          },
          coreCode: 'match',
          coverageInsuredList: [
            {
              id: 'insured-4',
              clientId: 'insured-client-3',
            },
            {
              id: 'insured-5',
              clientId: 'insured-client-4',
            },
          ],
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'coverage-1',
          coverageInsuredList: [
            {
              id: 'insured-1',
              clientId: 'insured-client-1',
            },
          ],
        },
        {
          id: 'coverage-2',
          coverageDecision: {
            uwDecision: 'NS',
          },
          coverageInsuredList: [
            {
              id: 'coverage-1',
              clientId: 'insured-client-1',
            },
            {
              id: 'coverage-2',
              clientId: 'insured-client-2',
            },
          ],
        },

        {
          id: 'coverage-3',
          coverageDecision: {
            uwDecision: 'NS',
          },
          coreCode: 'match',
          coverageInsuredList: [
            {
              id: 'insured-4',
              clientId: 'insured-client-3',
            },
            {
              id: 'insured-5',
              clientId: 'insured-client-4',
            },
          ],
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'coverage-1',
          coverageInsuredList: [
            {
              id: 'insured-1',
              clientId: 'insured-client-1',
            },
          ],
        },
        {
          id: 'coverage-2',
          coverageDecision: {
            uwDecision: 'NS',
          },
          coverageInsuredList: [
            {
              id: 'coverage-1',
              clientId: 'insured-client-1',
            },
            {
              id: 'coverage-2',
              clientId: 'insured-client-2',
            },
          ],
        },

        {
          id: 'coverage-3',
          coverageDecision: {
            uwDecision: 'NS',
          },
          coreCode: 'match',
          coverageInsuredList: [
            {
              id: 'insured-4',
              clientId: 'insured-client-3',
            },
            {
              id: 'insured-5',
              clientId: 'insured-client-4',
            },
          ],
        },
      ];
    });
});

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn()
      .mockImplementationOnce(() => {
        return {};
      })
      .mockImplementationOnce(() => {
        return {
          productName: 'match',
        };
      })
      .mockImplementationOnce(() => {
        return {
          productName: ['match'],
        };
      })
      .mockImplementationOnce(() => {
        return {
          productName: [],
        };
      }),
  };
});

describe('useGetCoverageInsuredClientIds', () => {
  test('get client ids, productName is empty', () => {
    const renderer = renderHook(() => useGetCoverageInsuredClientIds());

    expect(renderer.result.current).toEqual(['insured-client-1', 'insured-client-2']);
  });

  test('productName is String', () => {
    const renderer = renderHook(() => useGetCoverageInsuredClientIds());

    expect(renderer.result.current).toEqual(['insured-client-3', 'insured-client-4']);
  });
  test('productName is Array', () => {
    const renderer = renderHook(() => useGetCoverageInsuredClientIds());

    expect(renderer.result.current).toEqual(['insured-client-3', 'insured-client-4']);
  });
  test('productName is []', () => {
    const renderer = renderHook(() => useGetCoverageInsuredClientIds());

    expect(renderer.result.current).toEqual([
      'insured-client-1',
      'insured-client-2',
      'insured-client-3',
      'insured-client-4',
    ]);
  });
});
