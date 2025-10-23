import { renderHook } from '@testing-library/react-hooks';
import useMapAddressToContactInfoItem from 'process/NB/ManualUnderwriting/_hooks/useMapAddressToContactInfoItem';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest
      .fn()
      .mockImplementationOnce(() => {
        return 'C';
      })
      .mockImplementationOnce(() => {
        return {
          policyList: [
            {
              clientInfoList: [
                {
                  id: 'clientId',
                  name: 'test-item',
                  addressList: [
                    {
                      addrType: 'C',
                      address1: 'address1',
                      fullAddress: 'fullAddress',
                      zipCode: 'zipCode',
                    },
                  ],
                },
              ],
            },
          ],
        };
      }),
  };
});
describe('useMapAddressToContactInfoItem', () => {
  test('match item', () => {
    const item = {
      name: 'test-case-name',
      id: 'clientId',
    };
    const renderer = renderHook(() =>
      useMapAddressToContactInfoItem({
        item,
        id: 'clientId',
      })
    );
    expect(renderer.result.current).toEqual({
      currentAddress1: 'address1',
      currentFullAddress: 'fullAddress',
      currentZipCode: 'zipCode',
      name: 'test-case-name',
      id: 'clientId',
    });
  });
});
