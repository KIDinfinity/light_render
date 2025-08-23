import { renderHook } from '@testing-library/react-hooks';
import useGetClients from 'basic/components/Questionnaire/_hooks/useGetClients';

jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return {
    ...actual,
    useContext: jest
      .fn()
      .mockImplementationOnce(() => {
        return { state: { questionnaires: [] } };
      })
      .mockImplementationOnce(() => {
        return {
          state: {
            questionnaires: [
              {
                firstName: 'first',
                surname: 'sur',
                roleList: [],
                hello: 'hello',
                id: '666',
              },
            ],
          },
        };
      }),
  };
});
describe('test get clients', () => {
  test('questionnaires is null', () => {
    const renderer = renderHook(() => {
      return useGetClients();
    });
    expect(renderer.result.current).toEqual([]);
  });
  test('questionnaires has data', () => {
    const renderer = renderHook(() => {
      return useGetClients();
    });
    expect(renderer.result.current).toEqual([
      {
        firstName: 'first',
        surname: 'sur',
        roleList: [],
        id: '666',
      },
    ]);
  });
});
