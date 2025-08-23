const { formatPathToFilename } = require('../formatPathToFilename');

describe('format path to filename', () => {
  test('format log path', () => {
    const path = 'Venus-UI/user/test/hello/world/index.less';
    const result = formatPathToFilename(path);
    expect(result).toBe('user-test-hello');
  });
  test('sort path', () => {
    const path = 'Venus-UI/user/hello.less';
    const result = formatPathToFilename(path);
    expect(result).toBe('user-hello');
  })
})
