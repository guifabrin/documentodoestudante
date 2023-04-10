import React from 'react';
import {render} from '@testing-library/react-native';
import CardPage from './CardPage';

jest.mock('react-native-remote-svg', () => () => 'SVGImage');
jest.mock('react-native-vector-icons/Ionicons', () => () => 'Ionicons');

describe('<CardPage />', () => {
  it("shouldn't render CardPage", () => {
    const tree = render(
      <CardPage cardType="someotherdocument" card="card" photo="img_src" />,
    ).toJSON();
    expect(tree).toBe(null);
  });

  it('should render CardPage for documentodoestudante', () => {
    const tree = render(
      <CardPage cardType="documentodoestudante" card="card" photo="img_src" />,
    ).toJSON();
    const json = JSON.stringify(tree);
    expect(json).not.toContain('SVGImage');
    expect(json).toContain('Image');
  });

  it('should render CardPage for estudantecc', () => {
    const tree = render(
      <CardPage cardType="estudantecc" card="card" photo="img_src" />,
    ).toJSON();
    const json = JSON.stringify(tree);
    expect(json).toContain('SVGImage');
  });
});
