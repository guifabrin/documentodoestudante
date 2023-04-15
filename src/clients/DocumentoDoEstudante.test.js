import axios from 'axios';
import DocumentoDoEstudante from './DocumentoDoEstudante';
import {CARD_TYPES} from '../config/variables';

jest.mock('axios');

describe('DocumentoDoEstudante', () => {
  describe('get', () => {
    it('should call the callback function with the correct data', async () => {
      const textData =
        'var data = {\n' +
        "                name: 'John Doe',\n" +
        "                socialName: '',\n" +
        "                institution: 'Some instituition',\n" +
        "                scholarity: 'Scholarity',\n" +
        "                course: 'Course',\n" +
        "                birthDate: '01/01/2000',\n" +
        "                documentNumber: '00000000000',\n" +
        "                cpf: '000.000.000-00',\n" +
        "                useCode: '123456',\n" +
        "                enrollment: '01234567',\n" +
        '                template: "dne-2023",\n' +
        "                url: 'http://example.com'\n" +
        '              }\n';
      const responseGeneration = {data: {image: 'fakeImage'}};
      const cookie = ['cookie1=value1', 'cookie2=value2'];

      const expectedOutput = {
        profile: {
          birthDate: '01/01/2000',
          course: 'Course',
          cpf: '000.000.000-00',
          documentNumber: '00000000000',
          enrollment: '01234567',
          institution: 'Some instituition',
          name: 'John Doe',
          scholarity: 'Scholarity',
          socialName: '',
          template: 'dne-2023',
          url: 'http://example.com',
          useCode: '123456',
        },
        photo: 'http://example.com',
        card: 'data:image/png;base64,fakeImage',
        cardType: CARD_TYPES.DOCUMENTO_DO_ESTUDANTE,
        qrCode: 'https://www.meiaentrada.org.br/validador/123456/20000101',
      };

      axios.request.mockResolvedValue(responseGeneration);

      global.fetch = jest.fn(() => Promise.resolve({text: () => textData}));

      const email = 'test@example.com';
      const password = 'test123';
      const callback = jest.fn();
      const errorCallback = jest.fn();

      await new Promise(resolve => {
        DocumentoDoEstudante.get(
          email,
          password,
          data => {
            callback(data);
            resolve();
          },
          errorCallback,
          cookie,
        );
      });

      expect(callback).toHaveBeenCalledWith(expectedOutput);
    });

    it('should call the errorCallback function when there is an error', async () => {
      const error = new Error('Network error');

      global.fetch = jest.fn(() => Promise.reject(error));

      const email = 'test@example.com';
      const password = 'test123';
      const callback = jest.fn();
      const errorCallback = jest.fn();

      await DocumentoDoEstudante.get(email, password, callback, errorCallback);

      expect(errorCallback).toHaveBeenCalled();
    });
  });
});
