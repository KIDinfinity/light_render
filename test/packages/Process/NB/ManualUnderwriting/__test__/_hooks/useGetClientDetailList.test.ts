import { renderHook } from '@testing-library/react-hooks';
import useGetClientDetailList from 'process/NB/ManualUnderwriting/_hooks/useGetClientDetailList';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: () => {
      return {
        policyList: [
          {
            clientInfoList: [
              {
                akaRelationWithPh: 'testData',
                from: {
                  test: 'from data',
                },
                addressList: [
                  {
                    addrType: 'B',
                    address1: 'China',
                  },
                ],
              },
            ],
          },
        ],
      };
    },
  };
});
jest.mock('process/NB/ManualUnderwriting/_hooks/data.trans.config', () => {
  return {
    transConfig: {
      to: 'from.test',
      businessAddress1: {
        baseSource: 'addressList',
        dataSoureType: 'array',
        matchRule: {
          paramKey: 'addrType',
          paramValue: 'B',
        },
        targetParam: 'address1',
      },
    },
    extraDataSrouce: {},
  };
});
describe('test get client info list', () => {
  test('has client info list', () => {
    const renderer = renderHook(() => {
      return useGetClientDetailList();
    });
    expect(renderer.result.current).toEqual([
      {
        akaRelationWithPh: 'testData',
        from: {
          test: 'from data',
        },
        addressList: [
          {
            addrType: 'B',
            address1: 'China',
          },
        ],
        to: 'from data',
        businessAddress1: 'China',
      },
    ]);
  });
  test.todo('has not client info list');
  test.todo('extraDataSrouce unit test');
});
