import { defineStore } from 'pinia'
import { usePermissionStore } from './permission'
import { getAccountInfo, logout as logoutRequest } from '/@/api/account'
import { RoleEnum } from '/@/enums/roleEnum'
import { resetRouter } from '/@/router'
import { setToken as setLocalToken, removeToken } from '/@/utils/auth'

interface UserState {
  token: string
  userInfo: Nullable<UserInfo>
  roleList: RoleEnum[]
}

interface UserInfo {
  name: string
  avatar: string
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => {
    return {
      token: '',
      userInfo: null,
      roleList: [],
    }
  },
  getters: {
    getToken(): string {
      return this.token
    },
    getUserInfo(): Nullable<UserInfo> {
      return this.userInfo
    },
    getRoleList(): RoleEnum[] {
      return this.roleList
    },
  },
  actions: {
    setToken(token: string) {
      // storage token
      setLocalToken(token)
      // store token
      this.token = token
    },
    setRoleList(roleList: RoleEnum[]): void {
      this.roleList = roleList
    },
    async getUserInfoAction(): Promise<void> {
      const data = await getAccountInfo()
      this.userInfo = {
        name: data!.name,
        avatar: data!.headImg,
      }
      // 角色列表（远程获取，这里Mock了假数据）
      this.setRoleList([RoleEnum.ROOT])
    },
    async logout(): Promise<void> {
      // can fail
      await logoutRequest()

      const permissionStore = usePermissionStore()
      this.resetState()
      permissionStore.resetState()

      resetRouter()
    },
    resetState(): void {
      // remove storage token
      removeToken()
      // store
      this.token = ''
      this.userInfo = null
      this.roleList = []
    },
  },
})
