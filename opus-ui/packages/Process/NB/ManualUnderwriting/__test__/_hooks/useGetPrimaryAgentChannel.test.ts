import { renderHook } from '@testing-library/react-hooks';
import useGetPrimaryAgentChannel from 'process/NB/ManualUnderwriting/_hooks/useGetPrimaryAgentChannel';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: () => {
      return {
        agentList: [
          {
            agentType: 'P',
            agentChannelCode: 'TTT',
          },
          {
            agentType: 'S',
            agentChannelCode: 'SSSS',
          },
        ],
      };
    },
  };
});

describe('useGetPrimaryAgentChannel', () => {
  test('get channel', () => {
    const renderer = renderHook(() => useGetPrimaryAgentChannel());
    expect(renderer.result.current).toEqual('TTT');
  });
});
