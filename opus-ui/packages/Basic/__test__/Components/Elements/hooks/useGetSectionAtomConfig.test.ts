import { renderHook } from '@testing-library/react-hooks';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';

jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return {
    ...actual,
    useContext: jest
      .fn(() => {
        const state = {
          pageAtomConfig: [
            {
              section: 'test-section',
              caseCategory: 'test-case',
              activityCode: 'test-task',
            },
            {
              section: 'test-section-second',
              caseCategory: 'test-case',
              activityCode: 'test-task',
            },
          ],
        };
        return { state };
      })
      // mapping item
      .mockImplementationOnce(() => {
        const state = {
          pageAtomConfig: [
            {
              section: 'test-section',
              caseCategory: 'test-case',
              activityCode: 'test-task',
            },
            {
              section: 'test-section-second',
              caseCategory: 'test-case',
              activityCode: 'test-task',
            },
          ],
        };
        return { state };
      })
      // local config not exist
      .mockImplementationOnce(() => {
        const state = {
          pageAtomConfig: [
            {
              section: 'test-section',
              caseCategory: 'test-case',
              activityCode: 'test-task',
            },
            {
              section: 'test-section-second',
              caseCategory: 'test-case',
              activityCode: 'test-task',
            },
          ],
        };
        return { state };
      })
      // use local config
      .mockImplementationOnce(() => {
        const state = {
          pageAtomConfig: [
            {
              section: 'test-section',
              caseCategory: 'test-case',
              activityCode: 'test-task',
            },
            {
              section: 'test-section-second',
              caseCategory: 'test-case',
              activityCode: 'test-task',
            },
          ],
        };
        return { state };
      })
      // merge config
      .mockImplementationOnce(() => {
        const state = {
          pageAtomConfig: [
            {
              section: 'test-section',
              caseCategory: 'test-case',
              activityCode: 'test-task',
              field: 'merge-test',
              'field-props': {
                required: true,
              },
            },
            {
              section: 'test-section-second',
              caseCategory: 'test-case',
              activityCode: 'test-task',
            },
          ],
        };
        return { state };
      })
      // extra config
      .mockImplementationOnce(() => {
        const state = {
          pageAtomConfig: [
            {
              section: 'test-section',
              caseCategory: 'test-case',
              activityCode: 'test-task',
              field: 'expiryDate',
            },
          ],
        };
        return { state };
      }),
  };
});

describe('useGetSectionAtomConfig', () => {
  test('mapping item', () => {
    const renderer = renderHook(() =>
      useGetSectionAtomConfig({
        section: 'test-section',
        caseCategory: 'test-case',
        activityCode: 'test-task',
        localConfig: {
          remote: true,
        },
      })
    );
    expect(renderer.result.current).toEqual([
      {
        section: 'test-section',
        caseCategory: 'test-case',
        activityCode: 'test-task',
      },
    ]);
  });
  test('local config not exitt', () => {
    const renderer = renderHook(() =>
      useGetSectionAtomConfig({
        section: 'test-section',
        caseCategory: 'test-case',
        activityCode: 'test-task',
      })
    );
    expect(renderer.result.current).toEqual([
      {
        section: 'test-section',
        caseCategory: 'test-case',
        activityCode: 'test-task',
      },
    ]);
  });
  test('use loacal config', () => {
    const renderer = renderHook(() =>
      useGetSectionAtomConfig({
        section: 'test-section',
        caseCategory: 'test-case',
        activityCode: 'test-task',
        localConfig: {
          configs: [
            {
              section: 'test-section',
              caseCategory: 'test-case',
              activityCode: 'test-task',
              field: 'localconfig',
            },
          ],
          remote: false,
        },
      })
    );
    expect(renderer.result.current).toEqual([
      {
        section: 'test-section',
        caseCategory: 'test-case',
        activityCode: 'test-task',
        field: 'localconfig',
      },
    ]);
  });
  test('merge config', () => {
    const renderer = renderHook(() =>
      useGetSectionAtomConfig({
        section: 'test-section',
        caseCategory: 'test-case',
        activityCode: 'test-task',
        localConfig: {
          configs: [
            {
              section: 'test-section',
              caseCategory: 'test-case',
              activityCode: 'test-task',
              field: 'merge-test',
              'field-props': {
                required: false,
                'editable-condition': {
                  combine: '||',
                  conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
                },
              },
            },
          ],
          remote: true,
        },
      })
    );
    expect(renderer.result.current).toEqual([
      {
        section: 'test-section',
        caseCategory: 'test-case',
        activityCode: 'test-task',
        field: 'merge-test',
        'field-props': {
          required: true,
          'editable-condition': {
            combine: '||',
            conditions: [{ left: { domain: '', field: '' }, operator: '', right: '' }],
          },
        },
      },
    ]);
  });

  test('extra config', () => {
    const renderer = renderHook(() =>
      useGetSectionAtomConfig({
        section: 'test-section',
        caseCategory: 'test-case',
        activityCode: 'test-task',
        localConfig: {},
        extraConfig: {
          expiryDate: {
            format: 'MM/YYYY',
          },
        },
      })
    );
    expect(renderer.result.current).toEqual([
      {
        section: 'test-section',
        caseCategory: 'test-case',
        activityCode: 'test-task',
        field: 'expiryDate',
        format: 'MM/YYYY',
      },
    ]);
  });
});
