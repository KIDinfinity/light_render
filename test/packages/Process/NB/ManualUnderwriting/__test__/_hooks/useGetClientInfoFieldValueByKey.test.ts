import { renderHook } from '@testing-library/react-hooks';
import useGetClientInfoFieldValueByKey from 'process/NB/ManualUnderwriting/_hooks/useGetClientInfoFieldValueByKey';

jest.mock('process/NB/ManualUnderwriting/_hooks/useGetClientDetailList', () => {
  return jest.fn().mockImplementationOnce(() => {
    return [
      {
        id: '233',
        name: 'test name',
      },
    ];
  });
});
describe('useGetClientInfoFieldValueByKey', () => {
  test('get item', () => {
    const renderer = renderHook(() =>
      useGetClientInfoFieldValueByKey({
        id: '233',
        key: 'name',
      })
    );
    expect(renderer.result.current).toEqual('test name');
  });
});
