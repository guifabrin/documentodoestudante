import React from 'react';
import {render} from '@testing-library/react-native';
import ProfilePage from './ProfilePage';
import {CARD_TYPES} from '../config/variables';

const fields = [
  'name',
  'birthDate',
  'cpf',
  'documentNumber',
  'course',
  'institution',
  'scholarity',
  'useCode',
];

describe('<ProfilePage />', () => {
  for (const cardType of Object.keys(CARD_TYPES)) {
    it(`should render ProfilePage for ${cardType}`, () => {
      const profile = {};
      for (const field of fields) {
        profile[field] = `${cardType}_${field}`;
      }
      const tree = render(
        <ProfilePage
          handleLogout={() => {}}
          cardType={cardType}
          photo="img_src"
          qrCode="qrCode"
          profile={profile}
        />,
      ).toJSON();
      const json = JSON.stringify(tree);
      for (const field of fields)
        expect(json).toContain(`${cardType}_${field}`);
    });
  }
});
