import * as React from 'react';
import Metadata from '../src/components/Metadata/index';
import MultipleChoice from '../src/components/MultipleChoice';

const MultipleChoicePage = () => {
  return (
    <React.Fragment>
      <Metadata title={'Atividade Multipla Escolha'} />
      <MultipleChoice />
    </React.Fragment>
  )
}

export default MultipleChoicePage;
