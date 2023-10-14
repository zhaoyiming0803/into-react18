// 仅供测试
// 用 useContext 会方便些

import React, { useRef } from 'react'

import { createRoot } from 'react-dom/client'

function useForm () {
  return {} as any
}

function App () {
  const form = useForm()

  return <>
    <Form
      form={form} 
      onFinish={() => {
        console.log(123)
      }}
      rules={{
        username: {
          required: true,
          errorMessage: '请输入用户名',
          rule: /\w+/img
        },
        password: {
          required: true,
          errorMessage: '请输入密码',
          rule: /\d{6}/img
        }
      }}>
      <FormItem 
        name='username' 
        label="用户名">
        <Input></Input>
      </FormItem>

      <FormItem name='password' label='密码'>
        <Input></Input>
      </FormItem>

      <FormItem>
        <button onClick={() => {
          form.onFinish()
        }}>Submit</button>
      </FormItem>
    </Form>
  </>
}

interface FormProps extends React.PropsWithChildren {
  form: any
  onFinish?: () => void
  rules?: {
    [key: string]: {
      required: boolean,
      rule: RegExp,
      errorMessage: string
    }
  }
}

function Form (props: FormProps) {
  const { children, form, onFinish, rules } = props

  const formRef = useRef(null)

  form.validate = () => {
    Object.keys(rules).forEach(name => {
      if (rules[name].rule.test('')) {
        console.log(rules[name].errorMessage)
      }
    })
  }
  
  form.onFinish = () => {
    console.log([].slice.call(formRef.current.children).map((item: any) => item))
    return onFinish()
  }
  
  return <div ref={formRef}>{children}</div>
}

interface FormItemProps extends React.PropsWithChildren {
  name?: string
  label?: string
}

function FormItem (props: FormItemProps) {
  const { children, label } = props
  console.log('children: ', children)
  return <>{label}: {children}</>
}

interface InputProps {
  initialValue?: string
}

function Input (props: InputProps) {
  const { initialValue } = props

  return <input 
    value={initialValue} 
    style={{
      border: '1px solid #f00'
    }}
  />
}

const root = createRoot(document.querySelector('#root1'))

root.render(<App />)