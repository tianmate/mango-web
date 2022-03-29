import { get, post, postObj } from "./http";

const apis = {
    //公共接口
    login: p => postObj('/system/login/common', p), // 登录
    createImageCode: p => get('/system/login/createImageCode', p), // 验证码
    //系统接口
    //用户
    getUser: p =>postObj('/system/account/getList', p),
    editUser: p =>postObj('/system/account/update', p),
    addUser: p =>postObj('/system/account/register', p),
    removeUser:p =>postObj('/system/account/remove',p),
    getUserMenu: p=>postObj('/system/account/getUserMenu', p),
    getUserRole: p=>postObj('/system/account/getUserRole', p),
    addUserRole: p=>postObj('/system/account/assignRole', p),
    removeUserRole:p=>postObj('/system/account/removeUserRole', p),
    //角色
    getRole: p =>postObj('/system/role/getList', p),
    editRole: p =>postObj('/system/role/update', p),
    addRole: p =>postObj('/system/role/add', p),
    getRoleMenu: p =>postObj('/system/role/getRoleMenu', p),
    addRoleMenu: p =>postObj('/system/role/assignMenu', p),
    removeRoleMenu: p =>postObj('/system/role/removeRoleMenu',p),

}

export default apis;
