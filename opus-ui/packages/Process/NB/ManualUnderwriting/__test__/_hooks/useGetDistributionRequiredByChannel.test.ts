import { renderHook } from '@testing-library/react-hooks';
import useGetDistributionRequiredByChannel from 'process/NB/ManualUnderwriting/_hooks/useGetDistributionRequiredByChannel';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetDistributionChannel', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      return [
        {
          id: 'test-id',
          agentChannelCode: {
            value: 'BC',
          },
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          id: 'test-id',
          agentChannelCode: {
            value: 'BCCCCC',
          },
        },
      ];
    });
});

describe('useGetDistributionRequiredByChannel', () => {
  test('test channel value match', () => {
    const renderer = renderHook(() =>
      useGetDistributionRequiredByChannel({
        id: 'test-id',
      })
    );
    expect(renderer.result.current).toBeTruthy();
  });
  test('test channel value match', () => {
    const renderer = renderHook(() =>
      useGetDistributionRequiredByChannel({
        id: 'test-id',
      })
    );
    expect(renderer.result.current).not.toBeTruthy();
  });
});
