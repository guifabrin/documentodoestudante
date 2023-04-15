import axios from 'axios';
import {CARD_TYPES} from '../config/variables';

const scrap = async (email, password, callback, errorCallback, cookie = []) => {
  try {
    const data = new FormData();
    data.append('username', email);
    data.append('password', password);

    let response;

    try {
      response = await fetch(
        `https://www.documentodoestudante.com.br/loginPost?targetUrl=&dummy=${Date.now()}`,
        {
          method: 'POST',
          headers: {
            Cookie: cookie.join('; '),
          },
          body: data,
          credentials: 'include',
          redirect: cookie.length ? '' : 'manual',
        },
      );
    } catch (error) {
      if (!error.response) errorCallback();
      return scrap(
        email,
        password,
        callback,
        errorCallback,
        error.response.headers['set-cookie'],
      );
    }

    const textData = await response.text();
    const userData = textData.split('var data = ')[1].split('}')[0] + '}';

    const getData = new Function(
      `return ${userData
        .replace(/(\r\n|\n|\r)/gm, '')
        .replace(/\s+/g, ' ')
        .trim()}`,
    );

    const jsonData = getData();

    const responseGeneration = await axios.request({
      method: 'POST',
      maxBodyLength: Infinity,
      url: 'https://file.documentodoestudante.com.br/preview/generate-document',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookie.join('; '),
      },
      data: jsonData,
    });
    const year = jsonData.birthDate.substring(6);
    const month = jsonData.birthDate.substring(3, 5);
    const day = jsonData.birthDate.substring(0, 2);
    const image = responseGeneration.data.image;
    callback({
      profile: jsonData,
      photo: jsonData.url,
      card: `data:image/png;base64,${image}`,
      cardType: CARD_TYPES.DOCUMENTO_DO_ESTUDANTE,
      qrCode: `https://www.meiaentrada.org.br/validador/${jsonData.useCode}/${year}${month}${day}`,
    });
  } catch (e) {
    errorCallback();
  }
};
export default {
  get: scrap,
};
