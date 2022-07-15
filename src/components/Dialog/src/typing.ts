import { ButtonProps } from 'element-plus'

export interface BasicDialogProps {
  draggable?: boolean
  fullscreen?: boolean
  top?: string
  width?: string | number
  modal?: boolean
  appendToBody?: boolean
  lockScroll?: boolean
  customClass?: string
  openDelay?: number
  closeDelay?: number
  closeOnClickModal?: boolean
  closeOnPressEscape?: boolean
  beforeClose?: Fn
  destroyOnClose?: boolean

  // extra props
  visible?: boolean
  loading?: boolean
  canFullscreen?: boolean
  canClose?: boolean
  showConfirmBtn?: boolean
  showCancelBtn?: boolean
  confirmBtnProps?: ButtonProps
  cancelBtnProps?: ButtonProps
  title?: string
  helpMessage?: string
}