import { renderHook } from '@testing-library/react-hooks';
import useGetBenefitLevelExclusion from 'process/NB/ManualUnderwriting/_hooks/useGetBenefitLevelExclusion';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest.fn().mockImplementationOnce(() => {
      return {
        policyList: [
          {
            coverageList: [
              {
                id: 'coverageId',
                coverageExclusionList: [
                  {
                    id: 'exclusionId',
                    reason: '666',
                    longDescription: 'hhhh',
                    shortName: 'shortName',
                  },
                ],
              },
            ],
          },
        ],
      };
    }),
  };
});

describe('test useGetBenefitLevelExclusion', () => {
  test('test get item', () => {
    const renderer = renderHook(() => useGetBenefitLevelExclusion({ coverageId: 'coverageId' }));
    expect(renderer.result.current).toEqual([
      {
        id: 'exclusionId',
        reason: '666',
        longDescription: 'hhhh',
        shortName: 'shortName',
      },
    ]);
  });
});
