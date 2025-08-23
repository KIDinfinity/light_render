import { renderHook } from '@testing-library/react-hooks';
import useHandleChangeContactCountryCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleChangeContactCountryCallback';

let dispatchParams = {};

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetContactInfoById', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return {
        contactSeqNum: 1,
        contactType: 'MB',
        contactNo: '9999',
      };
    })
    .mockImplementationOnce(() => {
      return {
        contactSeqNum: 2,
        contactType: 'HM',
        contactNo: '5555',
      };
    })
    .mockImplementationOnce(() => {
      return {
        contactSeqNum: 3,
        contactType: 'OF',
        contactNo: '2222',
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
      useHandleChangeContactCountryCallback({
        contactId,
        clientId,
      })
    );
    const handler = renderer.result.current;
    handler('66');
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
      useHandleChangeContactCountryCallback({
        contactId,
        clientId,
      })
    );
    const handler = renderer.result.current;
    handler('77');
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
      useHandleChangeContactCountryCallback({
        contactId,
        clientId,
      })
    );
    const handler = renderer.result.current;
    handler('00');
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
