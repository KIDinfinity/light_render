import { renderHook } from '@testing-library/react-hooks';
import useJudgeMemoDeleteButtonAvailable from '../../hooks/useJudgeMemoDeleteButtonAvailable';

describe('useJudgeMemoDeleteButtonAvailable', () => {
  test('isDraft = false,memoDeleteButton disabled = false', () => {
    const renderer = renderHook(() =>
      useJudgeMemoDeleteButtonAvailable({
        isDraft: false,
        displayConfig: {
          sort: 3,
          visible: true,
          editable: true,
          children: {
            memoClientRole: {
              visible: false,
            },
            memoClientId: {
              visible: false,
            },
            memoRemark: {
              visible: false,
            },
            subInfos: {
              visible: false,
              multiple: false,
            },
            memoDeleteButton: {
              disabled: false,
            },
          },
        },
      })
    );

    expect(renderer.result.current).toBeTruthy();
  });

  test('isDraft = false,memoDeleteButton disabled = true', () => {
    const renderer = renderHook(() =>
      useJudgeMemoDeleteButtonAvailable({
        isDraft: false,
        displayConfig: {
          sort: 3,
          visible: true,
          editable: true,
          children: {
            memoClientRole: {
              visible: false,
            },
            memoClientId: {
              visible: false,
            },
            memoRemark: {
              visible: false,
            },
            subInfos: {
              visible: false,
              multiple: false,
            },
            memoDeleteButton: {
              disabled: true,
            },
          },
        },
      })
    );

    expect(renderer.result.current).not.toBeTruthy();
  });

  test('isDraft = true,  memoDeleteButton disabled = true', () => {
    const renderer = renderHook(() =>
      useJudgeMemoDeleteButtonAvailable({
        isDraft: true,
        displayConfig: {
          sort: 3,
          visible: true,
          editable: true,
          children: {
            memoClientRole: {
              visible: false,
            },
            memoClientId: {
              visible: false,
            },
            memoRemark: {
              visible: false,
            },
            subInfos: {
              visible: false,
              multiple: false,
            },
            memoDeleteButton: {
              disabled: true,
            },
          },
        },
      })
    );

    expect(renderer.result.current).toBeTruthy();
  });
});
