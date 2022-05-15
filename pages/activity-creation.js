import * as React from 'react';

import Metadata from '../src/components/Metadata/index'
import TypeOfActivity from '../src/components/TypeOfActivity';

const ActivityCreationPage = () => {
  return (
    <React.Fragment>
      <Metadata title={'Criar Atividade'} />
      <TypeOfActivity />
    </React.Fragment>
  )
}

export default ActivityCreationPage;
