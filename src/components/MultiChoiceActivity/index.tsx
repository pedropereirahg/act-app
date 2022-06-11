import { Fragment, useState } from 'react';
import { Button, Input, Alert, Form, Checkbox } from 'antd';
import { setTwoToneColor, MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { cyan } from '@ant-design/colors';

import { ActivityOption } from '../../commons/factories/activity-option';
import styles from './MultiChoiceActivity.module.scss'

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

setTwoToneColor(`${cyan.primary}`);

export interface MultiChoiceActivityProps {
  editorIsDirty: boolean;
  onEditorSave: (value: any) => void;
}

export default function MultiChoiceActivity({ editorIsDirty, onEditorSave }: MultiChoiceActivityProps) {
  const [form] = Form.useForm();
  const [multiCorrectChoices, setMultiCorrectChoices] = useState<number[]>([])
  const [formIsValid, setFormIsValid] = useState<boolean>(false)

  const handleMultiChoiceChange = (choices: any) => {
    setMultiCorrectChoices([...choices])
    form.validateFields()
  }

  const formIsInvalid = () => (
    !editorIsDirty ||
    !formIsValid ||
    !(form.getFieldsValue().options && form.getFieldsValue().options.length > 1) ||
    !(form.getFieldsValue().options && form.getFieldsValue().options?.filter((o: any) => typeof o?.statement !== 'string' || o?.statement === '').length === 0) ||
    !(form.getFieldsValue().options && form.getFieldsValue().options?.filter((o: any) => multiCorrectChoices.includes(o?.key)).length > 0)
  )

  return (
    <Form
      {...formItemLayoutWithOutLabel}
      onFinish={(value: any) =>
        onEditorSave(Array.isArray(value.options)
          ? value.options.map(({ key, statement }: Pick<ActivityOption, 'statement'> & { key: number }) => ({
            statement,
            isCorrect: multiCorrectChoices.includes(key)
          }))
          : []
        )
      }
      autoComplete="off"
      form={form}
    >
      <Form.List
        name="options"
        rules={[
          {
            validator: async (_, options) => {
              if (!options || options.length < 2) {
                setFormIsValid(false)
                return Promise.reject(
                  new Error('Precisa existir pelo menos duas alternativas')
                );
              }
              if (!options.find((option: any) => multiCorrectChoices.includes(option?.key))) {
                setFormIsValid(false)
                return Promise.reject(
                  new Error('Você precisa marcar pelo menos uma alternativa correta')
                )
              }
              setFormIsValid(true)
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <Fragment>
            <Checkbox.Group
              style={{ width: '100%' }}
              onChange={handleMultiChoiceChange}
            >
              {fields.map(({ key, name, ...restFiled }, index) => (
                <Fragment key={key}>
                  <Form.Item
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    required={false}
                    style={{
                      paddingTop: name === 0 ? '16px' : 'none',
                    }}
                  >
                    <Form.Item
                      name={[name, 'key']}
                      initialValue={key}
                      required={false}
                      noStyle
                    >
                      <Checkbox
                        value={key}
                        checked={multiCorrectChoices.includes(key)}
                        style={{ marginRight: '8px' }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restFiled}
                      name={[name, 'statement']}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Por favor, digite o enunciado ou apague essa alternativa.",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="Digite a alternativa"
                        size="large"
                        style={{ width: 'calc(100% - 64px)' }}
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <MinusCircleTwoTone
                        className={styles.dynamicDeleteButton}
                        onClick={() => {
                          if (multiCorrectChoices.includes(key)) {
                            handleMultiChoiceChange(multiCorrectChoices)
                          }
                          remove(name)
                        }}
                      />
                    )}
                  </Form.Item>
                </Fragment>
              ))}
            </Checkbox.Group>
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '100%' }}
                icon={<PlusOutlined />}
              >
                Adicionar alternativa
              </Button>
              <br />
              {errors.map((error, index) => (
                <Fragment key={index}>
                  <br />
                  <Alert message={error} type="warning" />
                </Fragment>
              ))}
            </Form.Item>
          </Fragment>
        )}
      </Form.List>
      <Form.Item>
        <Button
          size="large"
          type="default"
          htmlType="submit"
          disabled={formIsInvalid()}>
          Criar atividade
        </Button>
      </Form.Item>
    </Form>
  )
}
