export const COLORS = {
    PRIMARY: '#f09e26'
}

export const CARD_TYPES = {
    DOCUMENTO_DO_ESTUDANTE: 'documentodoestudante',
    ESTUDANTE_CC: 'estudantecc'
}

export const PROFILE_REF = {
    [CARD_TYPES.DOCUMENTO_DO_ESTUDANTE]: {
        name: 'name',
        birthDate: 'birthDate',
        cpf: 'cpf',
        documentNumber: 'documentNumber',
        course: 'course',
        institution: 'institution',
        scholarity: 'scholarity',
        code: 'useCode'
    },
    [CARD_TYPES.ESTUDANTE_CC]: {
        name: 'full_name',
        birthDate: 'birth_date',
        cpf: 'cpf',
        documentNumber: 'document_number',
        course: 'course_name',
        institution: 'institution_name',
        scholarity: 'course_type',
        code: 'registration_number'
    }
}