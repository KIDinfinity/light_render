import { renderHook } from '@testing-library/react-hooks';
import useGetEditorType from 'bpm/pages/Information/_hooks/useGetEditorType';

jest.mock('dva', () => {
  const actual = jest.requireActual('dva');
  return {
    ...actual,
    useSelector: jest.fn((func) => {
      return func({
        atomConfig: {
          single: {
            information_add: {
              information_add_config: [
                {
                  atomCode: 'information_add_config',
                  atomGroupCode: 'information_add',
                  parentAtomCode: null,
                  description: null,
                  region: 'PH',
                  editor_type: 'textarea',
                  category: 'qanot',
                },
              ],
            },
          },
          groups: {
            information_add: [
              {
                atomCode: 'information_add_config_underwritingNote',
                atomGroupCode: 'information_add',
                parentAtomCode: null,
                description: null,
                region: 'PH',
                editor_type: 'textarea',
              },
            ],
          },
        },
      });
    }),
  };
});

describe('useGetEditorType', () => {
  test('match group config', () => {
    const renderer = renderHook(() =>
      useGetEditorType({
        item: {
          categoryCode: 'underwritingNote',
        },
      })
    );

    expect(renderer.result.current).toBe('textarea');
  });
  test('match single config', () => {
    const renderer = renderHook(() =>
      useGetEditorType({
        item: {
          categoryCode: 'qanot',
        },
      })
    );
    expect(renderer.result.current).toBe('textarea');
  });
  test('use default', () => {
    const renderer = renderHook(() =>
      useGetEditorType({
        item: {
          categoryCode: 'qcCommen',
        },
      })
    );

    expect(renderer.result.current).toBe('rich_editor');
  });
});
