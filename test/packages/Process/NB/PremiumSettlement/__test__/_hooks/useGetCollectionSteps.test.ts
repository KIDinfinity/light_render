import useGetCollectionSteps from 'process/NB/PremiumSettlement/_hooks/useGetCollectionSteps.ts';

import { renderHook } from '@testing-library/react-hooks';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ProcessStatusType from 'process/NB/PremiumSettlement/Enum/processStatusType';

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
              id: '1',
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
              id: '1',
              collectionStatus: null,
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
              id: '2',
              collectionStatus: 'integrationFailed',
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
              id: '3',
              collectionStatus: 'completed',
              createReceiptStatus: 'inprogress',
              premiumMatch: null,
            },
          ],
        };
      })
      .mockImplementationOnce(() => {
        return {
          policyList: [
            {
              id: '4',
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
              id: '5',
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
              id: '6',
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
              id: '7',
              collectionStatus: 'completed',
              createReceiptStatus: 'completed',
              premiumMatch: 'completed',
            },
          ],
        };
      }),
  };
});

let renderer = renderHook(() => {
  return useGetCollectionSteps();
});

const title = {
  Collect: formatMessageApi({
    Dropdown_POL_CollectStatus: 'Collect',
  }),
  CreateReceipt: formatMessageApi({
    Dropdown_POL_CollectStatus: 'CreateReceipt',
  }),
  PremiumMatch: formatMessageApi({
    Dropdown_POL_CollectStatus: 'PremiumMatch',
  }),
};

describe('useGetCollectionSteps', () => {
  afterEach(() => {
    renderer = renderHook(() => {
      return useGetCollectionSteps();
    });
  });

  test('| collection_status = inprogress | create_receipt_status = Any | premium_match = Any |', () => {
    expect(renderer.result.current).toEqual([
      {
        title: title.Collect,
        description: formatMessageApi({
          Dropdown_POL_CollectStatus: 'Inprogress',
        }),
        status: ProcessStatusType.Process,
      },
      {
        title: title.CreateReceipt,
        description: null,
        status: ProcessStatusType.Wait,
      },
      {
        title: title.PremiumMatch,
        description: null,
        status: ProcessStatusType.Wait,
      },
    ]);
  });

  test('| collection_status = null | create_receipt_status = Any | premium_match = Any |', () => {
    expect(renderer.result.current).toEqual([
      {
        title: title.Collect,
        description: formatMessageApi({
          Dropdown_POL_CollectStatus: 'Inprogress',
        }),
        status: ProcessStatusType.Process,
      },
      {
        title: title.CreateReceipt,
        description: null,
        status: ProcessStatusType.Wait,
      },
      {
        title: title.PremiumMatch,
        description: null,
        status: ProcessStatusType.Wait,
      },
    ]);
  });

  test('| collection_status	= integrationFailed | create_receipt_status = Any | premium_match = Any |', async () => {
    expect(await renderer.result.current).toEqual([
      {
        title: title.Collect,
        description: formatMessageApi({
          Dropdown_POL_CollectStatus: 'integrationFailed',
        }),
        icon: 'exclamation',
        status: ProcessStatusType.Error,
      },
      {
        title: title.CreateReceipt,
        description: null,
        status: ProcessStatusType.Wait,
      },
      {
        title: title.PremiumMatch,
        description: null,
        status: ProcessStatusType.Wait,
      },
    ]);
  });

  test('| collection_status	= completed | create_receipt_status = NULL/inprogress | premium_match = Any |', () => {
    expect(renderer.result.current).toEqual([
      {
        title: title.Collect,
        description: null,
        status: ProcessStatusType.Finish,
      },
      {
        title: title.CreateReceipt,
        description: formatMessageApi({
          Dropdown_POL_CollectStatus: 'Inprogress',
        }),
        status: ProcessStatusType.Process,
      },
      {
        title: title.PremiumMatch,
        description: null,
        status: ProcessStatusType.Wait,
      },
    ]);
  });

  test('| collection_status	= completed | create_receipt_status = integrationFailed | premium_match = Any |', () => {
    expect(renderer.result.current).toEqual([
      {
        title: title.Collect,
        description: null,
        status: ProcessStatusType.Finish,
      },
      {
        title: title.CreateReceipt,
        description: formatMessageApi({
          Dropdown_POL_CollectStatus: 'Integration failed',
        }),
        icon: 'exclamation',
        status: ProcessStatusType.Error,
      },
      {
        title: title.PremiumMatch,
        description: null,
        status: ProcessStatusType.Wait,
      },
    ]);
  });

  test('| collection_status	= completed | create_receipt_status = completed | premium_match = NULL/inprogress |', () => {
    expect(renderer.result.current).toEqual([
      {
        description: null,
        title: title.Collect,
        status: ProcessStatusType.Finish,
      },
      {
        description: null,
        title: title.CreateReceipt,
        status: ProcessStatusType.Finish,
      },
      {
        title: title.PremiumMatch,
        description: formatMessageApi({
          Dropdown_POL_CollectStatus: 'InProgress',
        }),
        status: ProcessStatusType.Process,
      },
    ]);
  });

  test('| collection_status	= completed | create_receipt_status = completed | premium_match = integrationFailed |', () => {
    expect(renderer.result.current).toEqual([
      {
        description: null,
        title: title.Collect,
        status: ProcessStatusType.Finish,
      },
      {
        description: null,
        title: title.CreateReceipt,
        status: ProcessStatusType.Finish,
      },
      {
        title: title.PremiumMatch,
        description: formatMessageApi({
          Dropdown_POL_CollectStatus: 'integrationFailed',
        }),
        icon: 'exclamation',
        status: ProcessStatusType.Error,
      },
    ]);
  });

  test('| collection_status	= completed | create_receipt_status = completed | premium_match = completed |', () => {
    expect(renderer.result.current).toEqual([
      {
        description: null,
        title: title.Collect,
        status: ProcessStatusType.Finish,
      },
      {
        description: null,
        title: title.CreateReceipt,
        status: ProcessStatusType.Finish,
      },
      {
        description: null,
        title: title.PremiumMatch,
        status: ProcessStatusType.Finish,
      },
    ]);
  });
});
