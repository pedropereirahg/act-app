import * as React from 'react';

import Metadata from '../components/Metadata/index';
import EssayQuestion from '../components/EssayQuestion';

const EssayQuestionPage = () => {
  return (
    <React.Fragment>
      <Metadata title={'Atividade Dissertativa'} />
      <EssayQuestion />
    </React.Fragment>
  )
}

export default EssayQuestionPage;
