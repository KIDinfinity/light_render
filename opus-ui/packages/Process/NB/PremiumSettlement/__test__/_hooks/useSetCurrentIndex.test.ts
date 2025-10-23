import useSetCurrentIndex from 'process/NB/PremiumSettlement/_hooks/useSetCurrentIndex';
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
              collectionStatus: 'inprogress',
              createReceiptStatus: null,
              premiumMatch: null,
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          policyList: [
            {
              collectionStatus: 'completed',
              createReceiptStatus: 'integrationFailed',
              premiumMatch: null,
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
              premiumMatch: 'inprogress',
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
      })
      .mockImplementationOnce(() => {
        return {
          policyList: [
            {
              collectionStatus: null,
              createReceiptStatus: null,
              premiumMatch: 'integrationFailed',
            },
          ],
        };
      }),
  };
});

describe('test useSetCurrentIndex', () => {
  test('collectionStatus is inprogress', () => {
    const renderer = renderHook(() => useSetCurrentIndex());
    expect(renderer.result.current).toEqual(0);
  });
  test('createReceiptStatus is integrationFailed', () => {
    const renderer = renderHook(() => useSetCurrentIndex());
    expect(renderer.result.current).toEqual(1);
  });
  test('premiumMatch is inprogress', () => {
    const renderer = renderHook(() => useSetCurrentIndex());
    expect(renderer.result.current).toEqual(2);
  });
  test('premiumMatch is completed', () => {
    const renderer = renderHook(() => useSetCurrentIndex());
    expect(renderer.result.current).toEqual(3);
  });
  test('premiumMatch is integrationFailed', () => {
    const renderer = renderHook(() => useSetCurrentIndex());
    expect(renderer.result.current).toEqual(2);
  });
});
