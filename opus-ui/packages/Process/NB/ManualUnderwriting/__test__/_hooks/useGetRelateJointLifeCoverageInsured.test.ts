import { renderHook } from '@testing-library/react-hooks';
import useGetRelateJointLifeCoverageInsured from 'process/NB/ManualUnderwriting/_hooks/useGetRelateJointLifeCoverageInsured';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: '1',
          coreCode: 'coreCode',
          coverageInsuredList: [
            {
              unionInsuredSeqNum: 1,
              clientId: 'client-1',
            },
          ],
          coverageDecision: {
            uwDecision: 'D',
          },
        },
        {
          id: '2',
          coreCode: 'coreCode',
          coverageInsuredList: [
            {
              unionInsuredSeqNum: 2,
              clientId: 'client-2',
            },
          ],
          coverageDecision: {
            uwDecision: 'R',
          },
        },
      ];
    });
});

describe('useGetRelateJointLifeCoverageInsured', () => {
  it('should render', () => {
    const { result } = renderHook(() =>
      useGetRelateJointLifeCoverageInsured({
        coreCode: 'coreCode',
      })
    );
    expect(result.current).toEqual([
      {
        insuredId: 'client-2',
        decision: 'R',
      },
    ]);
  });
});
