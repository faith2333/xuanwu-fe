import { method } from 'lodash';
import { request } from 'umi';

/** 登录接口 POST /v1/user/login */
export async function login(body: USER.LoginReq, options?: { [key: string]: any }) {
    return request<USER.LoginResp>('/v1/user/login', {
      method: 'POST',
      data: body,
      ...(options || {}),
    });
  }

  /** 退出登录 POST /v1/user/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<{}>('/v1/user/logout', {
    method: 'POST',
    data: {},
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /v1/user/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<USER.CurrentUser>('/v1/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getUserByUsername(username: string) {
  return request<USER.User>(`/v1/user/getByUsername`,{
    method: 'GET',
    params: { username },
    });
}

