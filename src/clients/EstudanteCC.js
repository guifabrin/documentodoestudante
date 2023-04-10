import {CARD_TYPES} from '../config/variables';

export default {
  get: async (email, password, callback, errorCallback) => {
    try {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      const response = await fetch('https://estudante.cc/api/v1/auth/sign_in', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        redirect: 'follow',
        headers,
      });
      const responseOrders = await fetch('https://estudante.cc/api/v1/orders', {
        headers: {
          uid: email,
          'access-token': response.headers.get('access-token'),
          client: response.headers.get('client'),
        },
      }).then(response => response.json());
      const order = responseOrders.orders.find(
        order => order.status === 'approved' && order.payment_status === 'paid',
      );
      if (!order) {
        return null;
      }
      let image = await fetch(order.photo_url).then(response =>
        response.blob(),
      );
      const photo = await new Promise(_resolve => {
        const fileReaderInstance = new FileReader();
        fileReaderInstance.onload = () => {
          _resolve(fileReaderInstance.result);
        };
        fileReaderInstance.readAsDataURL(image);
      });
      callback({
        profile: {
          name: order.full_name,
          birthDate: order.birth_date,
          cpf: order.cpf,
          documentNumber: order.document_number,
          course: order.course_name,
          institution: order.institution_name,
          scholarity: order.course_type,
          useCode: order.registration_number,
        },
        cardType: CARD_TYPES.ESTUDANTE_CC,
        photo: photo.replace(
          'data:application/octet-stream;base64,',
          'data:image/png;base64,',
        ),
        card: `data:image/svg+xml;utf8,${order.card_svg_html.replace(
          /(\r\n|\n|\r)/gm,
          '',
        )}`,
        qrCode: `https://api.estudante.cc/student_card_validation/${order.identifier}`,
      });
    } catch (e) {
      errorCallback();
    }
  },
};
