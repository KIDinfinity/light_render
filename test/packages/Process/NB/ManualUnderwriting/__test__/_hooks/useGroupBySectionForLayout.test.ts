import { renderHook } from '@testing-library/react-hooks';
import useGroupBySectionForLayout from 'process/NB/ManualUnderwriting/_hooks/useGroupBySectionForLayout';

describe('useGroupBySectionForLayout', () => {
  test('group data', () => {
    const data = [
      {
        span: 12,
        expand: 'N',
        key: 'name',
      },
      {
        span: 8,
        expand: 'Y',
        key: 'age',
      },
      {
        span: 8,
        expand: 'Y',
        key: 'ss',
      },
    ];
    const renderer = renderHook(() =>
      useGroupBySectionForLayout({
        data,
      })
    );

    expect(renderer.result.current).toEqual([
      [
        {
          span: 8,
          expand: 'Y',
          key: 'age',
        },
      ],
      [
        {
          span: 8,
          expand: 'Y',
          key: 'ss',
        },
      ],
    ]);
  });
});
