import useSetProcessStatus from 'process/NB/PremiumSettlement/_hooks/useSetProcessStatus';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn(() => {
        return {};
      })
      .mockImplementationOnce(() => {
        return {
          policyList: [
            {
              collectionStatus: 'completed',
              createReceiptStatus: 'completed',
              premiumMatch: 'integrationFailed',
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          policyList: [
            {
              collectionStatus: 'completed',
              createReceiptStatus: 'completed',
              premiumMatch: 'completed',
            },
          ],
        };
      }),
  };
});

describe('test useSetProcessStatus', () => {
  test('premium process type includes integrationFailed', () => {
    const renderer = renderHook(() => useSetProcessStatus());
    expect(renderer.result.current).toEqual('error');
  });
  test('premium process type not includes integrationFailed', () => {
    const renderer = renderHook(() => useSetProcessStatus());
    expect(renderer.result.current).toEqual('process');
  });
});
