import { renderHook } from '@testing-library/react-hooks';
import Rule from 'basic/components/Form/Rule';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest.fn((func) => {
      const state = {
        model: {
          a: {
            name: 'hello',
          },
          b: {
            name: 'hello',
          },
        },
        testSpace: {
          first: {
            second: {
              value: 'test',
            },
          },
        },
      };
      return func(state);
    }),
  };
});
describe('test rule', () => {
  test('one level combine is && return false', () => {
    const configs = {
      combine: '&&',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'name',
          },
          right: '666',
        },
        {
          left: 23,
          right: {
            domain: 'activity',
            dataPath: 'first.second.value',
          },
        },
      ],
    };
    const form = {
      getFieldValue: (key) => {
        const source = {
          name: '666',
        };
        return source[key];
      },
    };
    const namespace = 'testSpace';
    const renderer = renderHook(() => Rule(configs, form, namespace));
    expect(renderer.result.current).not.toBeTruthy();
  });

  test('one level combine is || return true', () => {
    const configs = {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'name',
          },
          operator: '===',
          right: '666',
        },
        {
          left: 23,
          operator: '===',
          right: {
            domain: 'activity',
            dataPath: 'first.second.value',
          },
        },
      ],
    };
    const form = {
      getFieldValue: (key) => {
        const source = {
          name: '666',
        };
        return source[key];
      },
    };
    const namespace = 'testSpace';
    const renderer = renderHook(() => Rule(configs, form, namespace));
    expect(renderer.result.current).toBeTruthy();
  });

  test('two level and combine is || return true', () => {
    const configs = {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'name',
          },
          operator: '===',
          right: '55',
        },
        {
          combine: '&&',
          conditions: [
            {
              left: 'test',
              operator: '===',
              right: {
                domain: 'activity',
                field: 'first.second.value',
              },
            },
            {
              left: {
                domain: 'field',
                field: 'name',
              },
              operator: '===',
              right: '666',
            },
          ],
        },
      ],
    };
    const form = {
      getFieldValue: (key) => {
        const source = {
          name: '666',
        };
        return source[key];
      },
    };
    const namespace = 'testSpace';
    const renderer = renderHook(() => Rule(configs, form, namespace));
    expect(renderer.result.current).toBeTruthy();
  });

  test('conditions has null', () => {
    const configs = {
      combine: '&&',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'name',
          },
          right: '666',
        },
        {
          left: 23,
          right: {
            domain: 'activity',
            dataPath: 'first.second.value',
          },
        },
        null,
      ],
    };
    const form = {
      getFieldValue: (key) => {
        const source = {
          name: '666',
        };
        return source[key];
      },
    };
    const namespace = 'testSpace';
    const renderer = renderHook(() => Rule(configs, form, namespace));
    expect(renderer.result.current).not.toBeTruthy();
  });

  test('return false', () => {
    const configs = {
      combine: '&&',
      conditions: [
        {
          left: { domain: 'field', field: 'pmLoading' },
          operator: 'empty',
          right: '',
        },
        {
          left: { domain: 'field', field: 'flatMortality' },
          operator: 'empty',
          right: '',
        },
      ],
    };
    const form = {
      getFieldValue: (key: string) => {
        const values = {
          code: 'MD',
          emPeriod: null,
          extraMortality: '',
          flatMortality: '50',
          fmPeriod: 1,
          pmLoading: 0,
          pmPeriod: null,
        };
        return values[key];
      },
    };
    const namespace = '';
    const renderer = renderHook(() => Rule(configs, form, namespace));
    expect(renderer.result.current).not.toBeTruthy();
  });
});
