import type { ColProps, FormItemRule, FormItemProp } from 'element-plus'
import type { VNodeChild, ExtractPropTypes, Component } from 'vue'
import { basicProps } from './props'
import type { SizeType } from '/#/config'

export interface RenderCallbackParams {
  schema: FormSchema
  model: Recordable
  prop: FormItemProp
}

export type BasicFormProps = ExtractPropTypes<typeof basicProps>

export interface FormSchema {
  // prop name
  prop: FormItemProp
  // label
  label?: string
  // label width
  labelWidth?: string | number
  // required
  required?: boolean | ((params: RenderCallbackParams) => boolean)
  // validate rules
  rules?: Arrayable<FormItemRule> | ((params: RenderCallbackParams) => Arrayable<FormItemRule>)
  // error tips
  error?: string
  // show validate error message
  showMessage?: boolean
  // inline show message
  inlineMessage?: boolean
  // size
  size?: SizeType

  // extend config
  // variable name bound to v-model default value, default modelValue
  modelField?: string
  // event name triggered by internal value change, default change
  changeEvent?: string
  // default value
  defaultValue?: any
  // form item hidden
  hidden?: boolean | ((params: RenderCallbackParams) => boolean)
  // component string will be using resolveComponent handle, need global register component
  component?: string | Component
  // render function
  render?: (params: RenderCallbackParams) => VNodeChild
  // component props
  componentProps?: Recordable | ((params: RenderCallbackParams) => Recordable)
  // slot in basic form
  slot?: string
  // el-col props
  colProps?: Partial<Writable<ColProps>>
}

export interface BasicFormActionType {
  validate: () => Promise<boolean | never>
  validateField: (props?: Arrayable<FormItemProp>) => Promise<boolean | never>
  resetFields: (props?: Arrayable<FormItemProp>) => void
  scrollToField: (prop: FormItemProp) => void
  clearValidate: (props?: Arrayable<FormItemProp>) => void

  // extra
  setProps: (formProps: Partial<BasicFormProps>) => void
  getFieldsValue: () => Recordable
}