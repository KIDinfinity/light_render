import { renderHook } from '@testing-library/react-hooks';
import useHandleRemoveOrAddRelatedRiderCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleRemoveOrAddRelatedRiderCallback';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetCoverageList', () => {
  return jest
    .fn(() => {
      return [];
    })
    .mockImplementationOnce(() => {
      return [
        {
          coreCode: '6666',
          id: '233',
        },
        {
          coreCode: 'removeRider',
          id: 'rrrr',
        },
      ];
    });
});
jest.mock('process/NB/ManualUnderwriting/utils/getRelatedRider', () => {
  return jest
    .fn(() => {
      return [
        {
          productCode: '66666',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          productCode: 'rider1',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          productCode: 'removeRider',
        },
      ];
    })
    .mockImplementationOnce(() => {
      return [
        {
          productCode: 'gg',
        },
      ];
    });
});
let addItem: any = null;
jest.mock('process/NB/ManualUnderwriting/_hooks/useHandleAddRiderCallback', () => {
  return jest.fn(() => {
    return (rider: string) => {
      addItem = rider;
    };
  });
});
let removeDispatchParams = {};
jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useDispatch: jest.fn(() => {
      return (params: any) => {
        removeDispatchParams = params;
      };
    }),
    useSelector: jest.fn(() => {
      return {};
    }),
  };
});
describe('useHandleRemoveOrAddRelatedRiderCallback', () => {
  test('add item logic', () => {
    const renderer = renderHook(() => useHandleRemoveOrAddRelatedRiderCallback({ id: '233' }));
    const handleChange = renderer.result.current;

    handleChange('coverage');
    expect(addItem).toEqual(null);
    expect(removeDispatchParams).toEqual({
      type: 'manualUnderwriting/deleteRider',
      payload: {
        id: 'rrrr',
      },
    });
  });
});
