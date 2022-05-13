import * as React from 'react';
import Metadata from '../src/components/Metadata/index'
import TypeOfActivity from '../src/components/TypeOfActivity';

/* import styles from '../styles/Home.module.scss' */

const ActivityCreationPage = () => {
  return (
    <React.Fragment>
      <Metadata title={'Criar Atividade'} />
      <TypeOfActivity />
    </React.Fragment>
  )
}

export default ActivityCreationPage;
