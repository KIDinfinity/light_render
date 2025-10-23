import { renderHook } from '@testing-library/react-hooks';
import useGetSections from 'basic/components/Questionnaire/_hooks/useGetSections';

jest.mock('basic/components/Questionnaire/_hooks/useGetQuestionnaireBySelected', () => {
  return jest
    .fn()
    .mockImplementationOnce(() => {
      return {
        sections: [],
      };
    })
    .mockImplementationOnce(() => {
      return {};
    })
    .mockImplementationOnce(() => {
      return {
        sections: [
          {
            name: 'name',
          },
        ],
      };
    });
});
describe('get secions', () => {
  it('sections is empty', () => {
    const renderer = renderHook(() => {
      return useGetSections();
    });
    expect(renderer.result.current).toEqual([]);
  });
  it('sections is undefined', () => {
    const renderer = renderHook(() => {
      return useGetSections();
    });
    expect(renderer.result.current).toEqual([]);
  });
  it('sections has data', () => {
    const renderer = renderHook(() => useGetSections());
    expect(renderer.result.current).toEqual([
      {
        name: 'name',
      },
    ]);
  });
});
