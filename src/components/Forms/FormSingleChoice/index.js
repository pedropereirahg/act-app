import * as React from 'react';
import { Row, Col, Button, Input, Radio, Typography } from 'antd';
import styles from './FormSingleChoice.module.scss';

function SingleChoice() {
  const { TextArea } = Input;

  const [enunciateValue, setEnunciateValue] = React.useState({
    "statement": ""
  });
  const [teste, setTeste] = React.useState(false);

  const [option, setOption] = React.useState({ "statement": "", isCorrect: false });

  const [value, setValue] = React.useState({
    "statement": "",
    "options": [],
    "type": "singleChoice"
  });

  const getEnunciateValue = (event) => {
    setEnunciateValue({ ...value, statement: event.target.value })
  }

  const editEnunciateValue = (event) => {
    setTeste(false)
    setEnunciateValue({ ...value, statement: event.target.value })
  }

  const sendEnunciateValue = () => {
    setTeste(true)
    setValue({ ...value, statement: enunciateValue.statement })
  }

  const handleChange = (event) => {
    setOption({ ...option, statement: event.target.value })
  };

  const handleClick = () => {
    setValue({
      ...value,
      options: [...value.options, option]
    })
    setOption({ "statement": "", isCorrect: false })
  };

  const deleteOption = (statement) => {
    const newOptions = value.options.filter(option => option.statement !== statement)
    setValue({ ...value, options: newOptions })
  };

  return (
    <form style={{ width: '100%' }}>
      <Row justify="center" align="middle" style={{ height: '160px', width: '100%' }}>
        <Col span={24} align='center'>
          <p className={styles.title}>Escreva abaixo o enunciado da questão:</p>
        </Col>
        <Col span={12}>
          <TextArea
            disabled={teste}
            onChange={getEnunciateValue}
            placeholder="Digite a questão"
            autoSize={{ minRows: 5, maxRows: 8 }}
          />
        </Col>
      </Row>

      {teste == false ?
        <>
          <Row justify='center' align="bottom" style={{ height: '50px', width: '100%' }}>
            <Col span={12} align='end'>
              <Button size={'large'} type="primary" onClick={sendEnunciateValue}>Salvar Enunciado</Button>
            </Col>
          </Row>
        </>

        :
        <>
          <Row justify='center' align="bottom" style={{ height: '50px', width: '100%' }}>
            <Col span={12} align='end'>
              <Button size={'large'} type="primary" onClick={editEnunciateValue}>Editar</Button>
            </Col>
          </Row>
          {value.options && value.options.length !== 0 ?

            <Radio.Group>
              {value.options.map((option, i) => (
                <Row key={i} justify="center" align="middle" style={{ height: '50px', width: '100%' }}>
                  <Col span={12}><Radio value={i}>{option.statement}</Radio></Col>
                  <Col span={12}><Button danger onClick={() => deleteOption(option.statement)}>x</Button></Col>
                </Row>
              ))}

            </Radio.Group>
            : <></>
          }
          <Row justify="center" align="middle" style={{ height: '95px', width: '100%' }}>
            <Col span={24} align='center'>
              <p className={styles.title}>Escreva abaixo as respostas e as adicione para selecionar a correta:</p>
            </Col>
            <Col span={12}>
              <TextArea
                onChange={handleChange}
                placeholder="Digite a questão"
                autoSize={{ minRows: 2, maxRows: 3 }}
                value={option.statement}
              />
            </Col>
          </Row>

          <Row justify='center' align="bottom" style={{ height: '50px', width: '100%' }}>
            <Col span={12} align='end'>
              <Button size={'large'} type="primary" onClick={handleClick}>Adicionar</Button>
            </Col>
          </Row>
        </>
      }
    </form>
  )
};

export default SingleChoice;
