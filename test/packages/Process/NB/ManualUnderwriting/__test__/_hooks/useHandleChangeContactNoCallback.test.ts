import { renderHook } from '@testing-library/react-hooks';
import useHandleChangeContactNoCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleChangeContactNoCallback';

let dispatchParams = {};

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetContactInfoById', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return {
        contactSeqNum: 1,
        countryCode: '66',
        contactType: 'MB',
      };
    })
    .mockImplementationOnce(() => {
      return {
        contactSeqNum: 2,
        contactType: 'HM',
        countryCode: '77',
      };
    })
    .mockImplementationOnce(() => {
      return {
        contactSeqNum: 3,
        contactType: 'OF',
        countryCode: '00',
      };
    });
});

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useDispatch: () => {
      return jest.fn((params: any) => {
        dispatchParams = params;
      });
    },
  };
});

describe('test handle change contact callback', () => {
  beforeEach(() => {
    dispatchParams = {};
  });
  test('change Home Contact no ', () => {
    const contactId = 'contact_id';
    const clientId = 'client_id';
    const renderer = renderHook(() =>
      useHandleChangeContactNoCallback({
        contactId,
        clientId,
      })
    );
    const handler = renderer.result.current;
    handler('9999');
    expect(dispatchParams).toEqual({
      type: 'manualUnderwriting/changeBasicInfoFields',
      payload: {
        changedFields: {
          phoneNo: '669999',
        },
        id: clientId,
      },
    });
  });
  test('change Mobile Contact no ', () => {
    const contactId = 'contact_id';
    const clientId = 'client_id';
    const renderer = renderHook(() =>
      useHandleChangeContactNoCallback({
        contactId,
        clientId,
      })
    );
    const handler = renderer.result.current;
    handler('5555');
    expect(dispatchParams).toEqual({
      type: 'manualUnderwriting/changeBasicInfoFields',
      payload: {
        changedFields: {
          homeNumber: '775555',
        },
        id: clientId,
      },
    });
  });
  test('change Office Contact no ', () => {
    const contactId = 'contact_id';
    const clientId = 'client_id';
    const renderer = renderHook(() =>
      useHandleChangeContactNoCallback({
        contactId,
        clientId,
      })
    );
    const handler = renderer.result.current;
    handler('2222');
    expect(dispatchParams).toEqual({
      type: 'manualUnderwriting/changeBasicInfoFields',
      payload: {
        changedFields: {
          workNumber: '002222',
        },
        id: clientId,
      },
    });
  });
});
