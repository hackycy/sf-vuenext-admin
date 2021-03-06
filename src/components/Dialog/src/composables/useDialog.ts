import type {
  BasicDialogActionType,
  BasicDialogProps,
  ExtraBasicDialogActionType,
  UseDialogReturnType,
} from '../typing'

import {
  getCurrentInstance,
  nextTick,
  onUnmounted,
  reactive,
  ref,
  toRaw,
  unref,
  watchEffect,
} from 'vue'
import { error } from '/@/utils/log'
import { isFunction, isNil } from 'lodash-es'
import { tryOnUnmounted } from '@vueuse/shared'

// store the parameters passed when opening the pop-up window
const store = reactive<any>({})

export function useDialog(): UseDialogReturnType {
  const dialogRef = ref<Nullable<BasicDialogActionType>>(null)
  const loadedRef = ref<boolean>(false)
  const uidRef = ref<number>(-1)

  function register(action: BasicDialogActionType, uid: number) {
    onUnmounted(() => {
      dialogRef.value = null
      loadedRef.value = false
      store[unref(uidRef.value)] = null
    })

    uidRef.value = uid
    if (unref(loadedRef) && action === unref(dialogRef)) return

    dialogRef.value = action
    loadedRef.value = true
  }

  const getInstance = () => {
    const instance = unref(dialogRef)
    if (!instance) {
      error('useDialog instance is undefined!')
    }
    return instance
  }

  const methods: ExtraBasicDialogActionType = {
    setProps: (props: Partial<BasicDialogProps>) => {
      getInstance()?.setProps(props)
    },
    setLoading: (loading = true) => {
      getInstance()?.setProps({ loading })
    },
    openDialog: <T = any>(data?: T) => {
      getInstance()?.setProps({ visible: true })

      if (!data) return

      const id = unref(uidRef)
      store[id] = null
      store[id] = toRaw(data)
    },
    closeDialog: () => {
      getInstance()?.setProps({ visible: false })
    },
  }

  return [register, methods]
}

export function useDialogInner(callbackFn?: Fn): UseDialogReturnType {
  const dialogRef = ref<Nullable<BasicDialogActionType>>(null)
  const uidRef = ref<number>(-1)
  const currentInstance = getCurrentInstance()

  function register(action: BasicDialogActionType, uid: number) {
    tryOnUnmounted(() => {
      dialogRef.value = null
    })

    uidRef.value = uid
    dialogRef.value = action
    // ????????????BasicDialog??????????????????????????????????????????useDialog?????????????????????
    currentInstance?.emit('register', action, uid)
  }

  const getInstance = () => {
    const instance = unref(dialogRef)
    if (!instance) {
      error('useDialog instance is undefined!')
    }
    return instance
  }

  watchEffect(() => {
    const data = store[unref(uidRef)]
    if (isNil(data)) return
    if (!callbackFn || !isFunction(callbackFn)) return
    nextTick(() => {
      callbackFn(data)
    })
  })

  const methods: ExtraBasicDialogActionType = {
    setProps: (props: Partial<BasicDialogProps>) => {
      getInstance()?.setProps(props)
    },
    setLoading: (loading = true) => {
      getInstance()?.setProps({ loading })
    },
    openDialog: <T = any>(data?: T) => {
      getInstance()?.setProps({ visible: true })

      if (!data) return

      const id = unref(uidRef)
      store[id] = null
      store[id] = toRaw(data)
    },
    closeDialog: () => {
      getInstance()?.setProps({ visible: false })
    },
  }

  return [register, methods]
}
