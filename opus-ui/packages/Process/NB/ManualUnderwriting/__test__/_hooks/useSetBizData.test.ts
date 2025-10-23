import { renderHook } from '@testing-library/react-hooks';
import useSetBizData from 'process/NB/ManualUnderwriting/_hooks/useSetBizData';
import { NAMESPACE } from '../../activity.config';

let callParams = {};
jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useDispatch: () => {
      return (params: any) => {
        callParams = params;
        return params;
      };
    },
  };
});

describe('test use set biz data hook', () => {
  test('set biz data hook', () => {
    const businessData = {
      test: '233',
    };
    const renderer = renderHook(() => {
      return useSetBizData({ businessData });
    });
    expect(callParams).toEqual({
      type: `${NAMESPACE}/saveBizData`,
      payload: {
        businessData,
      },
    });
    renderer.unmount();
    expect(callParams).toEqual({
      type: `${NAMESPACE}/clearBizData`,
    });
  });
});
