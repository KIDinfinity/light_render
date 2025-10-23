import { renderHook } from '@testing-library/react-hooks';
import useHandleChangeContactTypeCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleChangeContactTypeCallback';
import ContactType from 'process/NB/ManualUnderwriting/Enum/ContactType';

let dispatchParams = {};

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useDispatch: jest.fn(() => {
      return (params: any) => {
        dispatchParams = params;
      };
    }),
  };
});

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetClientDetailById', () => {
  return jest.fn(() => {
    return {
      phoneNo: '123334',
      homeNumber: '666',
      workNumber: '999',
    };
  });
});

describe('test contact type change callback', () => {
  beforeEach(() => {
    dispatchParams = {};
  });
  test('Chagne to Mobile type', () => {
    const clientId = 'client_id';
    const contactId = 'contact_id';
    const renderer = renderHook(() =>
      useHandleChangeContactTypeCallback({
        clientId,
        contactId,
      })
    );
    const handler = renderer.result.current;
    handler(ContactType.Mobile);
    expect(dispatchParams).toEqual({
      type: 'manualUnderwriting/changeContactInfoFields',
      payload: {
        changedFields: {
          contactSeqNum: 1,
          contactNo: '123334',
        },
        id: clientId,
        contactItemId: contactId,
      },
    });
  });
  test('Change to Home type', () => {
    const clientId = 'client_id';
    const contactId = 'contact_id';
    const renderer = renderHook(() =>
      useHandleChangeContactTypeCallback({
        clientId,
        contactId,
      })
    );
    const handler = renderer.result.current;
    handler(ContactType.Home);
    expect(dispatchParams).toEqual({
      type: 'manualUnderwriting/changeContactInfoFields',
      payload: {
        changedFields: {
          contactSeqNum: 2,
          contactNo: '666',
        },
        id: clientId,
        contactItemId: contactId,
      },
    });
  });
  test('Chagne to Office type', () => {
    const clientId = 'client_id';
    const contactId = 'contact_id';
    const renderer = renderHook(() =>
      useHandleChangeContactTypeCallback({
        clientId,
        contactId,
      })
    );
    const handler = renderer.result.current;
    handler(ContactType.Office);
    expect(dispatchParams).toEqual({
      type: 'manualUnderwriting/changeContactInfoFields',
      payload: {
        changedFields: {
          contactSeqNum: 3,
          contactNo: '999',
        },
        id: clientId,
        contactItemId: contactId,
      },
    });
  });
  test('Chagne to Fax type', () => {
    const clientId = 'client_id';
    const contactId = 'contact_id';
    const renderer = renderHook(() =>
      useHandleChangeContactTypeCallback({
        clientId,
        contactId,
      })
    );
    const handler = renderer.result.current;
    handler(ContactType.Fax);
    expect(dispatchParams).toEqual({
      type: 'manualUnderwriting/changeContactInfoFields',
      payload: {
        changedFields: {
          contactSeqNum: 4,
        },
        id: clientId,
        contactItemId: contactId,
      },
    });
  });
});
