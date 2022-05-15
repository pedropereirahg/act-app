import { Fragment } from 'react';

import Metadata from '../components/Metadata/index'
import TypeOfActivity from '../components/TypeOfActivity';

const ActivityCreationPage = () => {
  return (
    <Fragment>
      <Metadata title={'Criar Atividade'} />
      <TypeOfActivity />
    </Fragment>
  )
}

export default ActivityCreationPage;
