import React from 'react';
import renderer from 'react-test-renderer';
import Default from '../../ButtonUI/Default';

jest.mock('../../ButtonUI/Icon', () => require('mocks/OWB/Sider/ButtonUI/Icon'));

describe('test icon', () => {
  test('default', () => {
    const action = () => {};
    const tree = renderer
      .create(
        <Default
          title="default button"
          styles={{
            testIcon: 'testIcon',
            box: 'test-box',
            className: 'testClassName',
          }}
          status="default"
          icon="testIcon"
          buttonCode="testButtonCode"
          action={action}
          className="className"
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
