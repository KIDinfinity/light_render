import { renderHook } from '@testing-library/react-hooks';
import useGetCoverageList from 'process/NB/ManualUnderwriting/_hooks/useGetCoverageList';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');

  return {
    ...actual,
    useSelector: jest.fn().mockImplementationOnce(() => {
      return {
        policyList: [
          {
            id: 'policy-id',
            coverageList: [
              {
                id: 'coverage-id-1',
                isMain: 'N',
                lifeNo: '1',
              },
              {
                id: 'coverage-id-2',
                isMain: 'Y',
                lifeNo: '2',
              },
              {
                id: 'coverage-id-3',
                isMain: 'N',
                lifeNo: '3',
              },
            ],
          },
        ],
      };
    }),
  };
});

describe('useGetCoverageList', () => {
  test('reorder coverage list', () => {
    const renderer = renderHook(() => useGetCoverageList());
    expect(renderer.result.current).toEqual([
      {
        id: 'coverage-id-2',
        isMain: 'Y',
        lifeNo: '2',
      },
      {
        id: 'coverage-id-1',
        isMain: 'N',
        lifeNo: '1',
      },
      {
        id: 'coverage-id-3',
        isMain: 'N',
        lifeNo: '3',
      },
    ]);
  });
});
