import {CARD_TYPES} from '../config/variables';
import React from 'react';
import CardDocumentoDoEstudante from './CardPage/CardDocumentoDoEstudante';
import CardEstudanteCC from './CardPage/CardEstudanteCC';

export default ({cardType, card, photo}) => {
  if (cardType === CARD_TYPES.ESTUDANTE_CC)
    return <CardEstudanteCC card={card} photo={photo} />;

  if (cardType === CARD_TYPES.DOCUMENTO_DO_ESTUDANTE)
    return <CardDocumentoDoEstudante card={card} />;

  return null;
};
