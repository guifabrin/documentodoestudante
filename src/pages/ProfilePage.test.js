import React from 'react';
import {render} from '@testing-library/react-native';
import ProfilePage from './ProfilePage';

const profile_documentodoestudante = {
  name: 'documentodoestudante_name',
  birthDate: 'documentodoestudante_birthDate',
  cpf: 'documentodoestudante_cpf',
  documentNumber: 'documentodoestudante_documentNumber',
  course: 'documentodoestudante_course',
  institution: 'documentodoestudante_institution',
  scholarity: 'documentodoestudante_scholarity',
  useCode: 'documentodoestudante_code',
};

const profile_estudantecc = {
  full_name: 'estudantecc_name',
  birth_date: 'estudantecc_birthDate',
  cpf: 'estudantecc_cpf',
  document_number: 'estudantecc_documentNumber',
  course_name: 'estudantecc_course',
  institution_name: 'estudantecc_institution',
  course_type: 'estudantecc_scholarity',
  registration_number: 'estudantecc_code',
};
describe('<ProfilePage />', () => {
  it('should render ProfilePage for documentodoestudante', () => {
    const tree = render(
      <ProfilePage
        handleLogout={() => {}}
        cardType="documentodoestudante"
        photo="img_src"
        qrCode="qrCode"
        profile={profile_documentodoestudante}
      />,
    ).toJSON();
    const json = JSON.stringify(tree);
    for (const key in profile_documentodoestudante)
      expect(json).toContain(profile_documentodoestudante[key]);
  });

  it('should render ProfilePage for estudantecc', () => {
    const tree = render(
      <ProfilePage
        handleLogout={() => {}}
        cardType="estudantecc"
        photo="img_src"
        qrCode="qrCode"
        profile={profile_estudantecc}
      />,
    ).toJSON();
    const json = JSON.stringify(tree);
    for (const key in profile_estudantecc)
      expect(json).toContain(profile_estudantecc[key]);
  });
});
