import * as React from 'react';
import { Tabs, Modal, Input } from 'antd';
const { TabPane } = Tabs;

function IncludeActivity({ isModalVisible, handleOk, handleCancel }) {
  const { TextArea } = Input;

  const sendValue = (event) => {
    console.log(event.target.value)
  }
  return (
    <Modal title="Nova Atividade" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Tabs>
        <TabPane tab="Dissertativa" key="1">
          <TextArea
            onChange={sendValue}
            placeholder="Digite a questão"
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </TabPane>
        <TabPane tab="Múltipla Escolha" key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab="Escolha Única" key="3">
          Content of tab 3
        </TabPane>
      </Tabs>
    </Modal>
  )
};

export default IncludeActivity;
