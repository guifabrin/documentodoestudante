import React from 'react';
import renderer from 'react-test-renderer';
import TabButton from './TabButton';

describe('TabButton', () => {
  test('renders correctly', () => {
    const tree = renderer
      .create(
        <TabButton
          handler={() => {}}
          title="Test Button"
          icon="ios-add"
          active={false}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders with active color when active is true', () => {
    const tree = renderer
      .create(
        <TabButton
          handler={() => {}}
          title="Test Button"
          icon="ios-add"
          active={true}
        />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
