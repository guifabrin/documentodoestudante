import EstudanteCC from './EstudanteCC';

describe('EstudanteCC', () => {
  const email = 'test@example.com';
  const password = 'password';
  const mockCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  it('should call the callback function with the correct data', async () => {
    const mockOrdersResponse = {
      orders: [
        {
          status: 'approved',
          payment_status: 'paid',
          photo_url: 'https://example.com/photo.png',
          full_name: 'John Doe',
          birth_date: '01/01/2000',
          cpf: '12345678901',
          document_number: '1234567890',
          course_name: 'Computer Science',
          institution_name: 'University of Example',
          course_type: 'Undergraduate',
          registration_number: '123456',
          card_svg_html: '<svg>...</svg>',
          identifier: 'abc123',
        },
      ],
    };
    fetch = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          headers: {
            get: jest.fn(),
          },
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockOrdersResponse),
        }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          blob: () => Promise.resolve(new Blob()),
        }),
      );

    Object.defineProperty(global, 'FileReader', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        result: 'photo',
        readAsDataURL: function () {
          this.onload();
        },
      })),
    });

    await new Promise(resolve => {
      EstudanteCC.get(
        email,
        password,
        data => {
          mockCallback(data);
          resolve();
        },
        () => {
          mockErrorCallback();
          resolve();
        },
      );
    });

    expect(mockCallback).toHaveBeenCalledWith({
      profile: {
        name: 'John Doe',
        birthDate: '01/01/2000',
        cpf: '12345678901',
        documentNumber: '1234567890',
        course: 'Computer Science',
        institution: 'University of Example',
        scholarity: 'Undergraduate',
        useCode: '123456',
      },
      cardType: 'estudantecc',
      photo: 'photo',
      card: 'data:image/svg+xml;utf8,<svg>...</svg>',
      qrCode: 'https://api.estudante.cc/student_card_validation/abc123',
    });
  });

  it('should call the errorCallback function if there is an error', async () => {
    fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(new Error('Network error')));

    await new Promise(resolve => {
      EstudanteCC.get(email, password, mockCallback, () => {
        mockErrorCallback();
        resolve();
      });
    });

    expect(mockErrorCallback).toHaveBeenCalled();
  });
});
