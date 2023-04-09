import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

jest.mock('./src/Content', () => () => 'Content')
describe('<App />', () => {
    it('has a header and a content', () => {
        const tree = renderer.create(<App/>).toJSON();
        const [screenStack] = tree.children
        const [rnsScreen] = screenStack.children
        const [rnsScreenStackHeaderConfig, view] = rnsScreen.children
        expect(rnsScreenStackHeaderConfig.props.title).toBe('Documento do Estudante');
        const [subView] = view.children
        const [content] = subView.children
        expect(content).toBe('Content');
    });
});