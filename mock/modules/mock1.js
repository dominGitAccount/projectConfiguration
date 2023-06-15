const Mock = require('mockjs') //   这个是引用库
 
const Random = Mock.Random    // 生成随机数
 
let Result = {
    code: 200,
    msg: '操作成功',
    data: null
}
 
// mock.mock的目的就是拦截目的，这样axios的访问，就可以被拦截了。但是一定要记得， 在main.js当中引入，只有引入了才生效。
Mock.mock('/captcha', 'get', () => {
 
    Result.data = {
        token: Random.string(32),
        captchaImg: Random.dataImage('120x40', 'p7n5w')
    }
    return Result
})
 
export default Mock.mock('/login', 'post', () => {
 
    // 无法在header中传入数jwt
 
    // Result.code = 400
    // Result.msg = "验证码错误"
 
    return Result
})
Mock.mock('/sys/userInfo', 'get', () => {
 
    Result.data = {
        id: "1",
        username: "test",
        avatar: "https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg"
    }
 
    return Result
})
 
Mock.mock('/logout', 'post', () => {
 
    return Result
})
 
// 获取用户菜单以及权限接口
Mock.mock('/sys/menu/nav', 'get', () => {
 
    let nav = [
        {
            name: 'SysManga',
            title: '系统管理',
            icon: 'el-icon-s-operation',
            component: '',
            path: '',
            children: [
                {
                    name: 'SysUser',
                    title: '用户管理',
                    icon: 'el-icon-s-custom',
                    path: '/sys/users',
                    component: 'sys/User',
                    children: []
                },
                {
                    name: 'SysRole',
                    title: '角色管理',
                    icon: 'el-icon-rank',
                    path: '/sys/roles',
                    component: 'sys/Role',
                    children: []
                },
                {
                    name: 'SysMenu',
                    title: '菜单管理',
                    icon: 'el-icon-menu',
                    path: '/sys/menus',
                    component: 'sys/Menu',
                    children: []
                }
            ]
        },
        {
            name: 'SysTools',
            title: '系统工具',
            icon: 'el-icon-s-tools',
            path: '',
            component: '',
            children: [
                {
                    name: 'SysDict',
                    title: '数字字典',
                    icon: 'el-icon-s-order',
                    path: '/sys/dicts',
                    component: '',
                    children: []
                },
            ]
        }
    ]
 
    let authoritys = ['sys:user:list', "sys:user:save", "sys:user:delete"]
 
    Result.data = {
        nav: nav,
        authoritys: authoritys
    }
 
    return Result
})