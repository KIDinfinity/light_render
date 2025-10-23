import { renderHook } from '@testing-library/react-hooks';
import useGetDictsByConfig from 'basic/hooks/useGetDictsByConfig';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest.fn((func) => {
      return func({
        dictionaryController: {
          fromConfigType: [
            {
              dictCode: 'remote-dict-code',
              dictName: 'remote-dict-name',
            },
          ],
          fromLocalConfig: [
            {
              dictCode: 'local-dict-code',
              dictName: 'local-dict-name',
            },
          ],
        },
      });
    }),
  };
});

describe('useGetDictsByConfig', () => {
  test('coniig has not field-props', () => {
    const config = {
      'x-dict': {
        dictTypeCode: 'fromConfigType',
      },
    };
    const fieldConfig = {
      'field-props': {
        'x-dict': {
          dictTypeCode: 'fromLocalConfig',
        },
      },
    };
    const renderer = renderHook(() => useGetDictsByConfig({ config, fieldConfig }));
    expect(renderer.result.current).toEqual([
      {
        dictCode: 'remote-dict-code',
        dictName: 'remote-dict-name',
      },
    ]);
  });

  test('config has field-props', () => {
    const config = {
      'field-props': {
        'x-dict': {
          dictTypeCode: 'fromConfigType',
        },
      },
    };
    const fieldConfig = {
      'field-props': {
        'x-dict': {
          dictTypeCode: 'fromLocalConfig',
        },
      },
    };
    const renderer = renderHook(() => useGetDictsByConfig({ config, fieldConfig }));
    expect(renderer.result.current).toEqual([
      {
        dictCode: 'remote-dict-code',
        dictName: 'remote-dict-name',
      },
    ]);
  });

  test('use local config', () => {
    const config = {};
    const fieldConfig = {
      'field-props': {
        'x-dict': {
          dictTypeCode: 'fromLocalConfig',
        },
      },
    };
    const renderer = renderHook(() => useGetDictsByConfig({ config, fieldConfig }));
    expect(renderer.result.current).toEqual([
      {
        dictCode: 'local-dict-code',
        dictName: 'local-dict-name',
      },
    ]);
  });
});
