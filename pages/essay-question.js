import * as React from 'react';
import Metadata from '../src/components/Metadata/index';
import EssayQuestion from '../src/components/ EssayQuestion';
/* import styles from '../styles/Home.module.scss' */

const EssayQuestionPage = () => {
  return (
    <React.Fragment>
      <Metadata title={'Atividade Dissertativa'} />
      <EssayQuestion />
    </React.Fragment>
  )
}

export default EssayQuestionPage;
