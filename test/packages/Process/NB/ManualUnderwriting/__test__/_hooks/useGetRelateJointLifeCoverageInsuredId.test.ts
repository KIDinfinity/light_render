import { renderHook } from '@testing-library/react-hooks';
import useGetRelateJointLifeCoverageInsuredId from 'process/NB/ManualUnderwriting/_hooks/useGetRelateJointLifeCoverageInsuredId';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetRelateJointLifeCoverageInsured', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          insuredId: 'client-2',
          decision: 'decision-2',
        },
      ];
    });
});

describe('useGetRelateJointLifeCoverageInsuredId', () => {
  it('should render', () => {
    const { result } = renderHook(() =>
      useGetRelateJointLifeCoverageInsuredId({
        coreCode: 'coreCode',
      })
    );
    expect(result.current).toEqual(['client-2']);
  });
});
