import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers, Users} from './data/user';

let _Users = Users;

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //登录
    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, {code: 1000, msg: '请求成功', user, data: {token: 'admin', refreshToken: '12345'}}]);
          } else {
            resolve([200, {code: 500, msg: '账号或密码错误'}]);
          }
        }, 1000);
      });
    });

    //获取用户信息
    mock.onGet('/user/login/info').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {code: 1000, msg: '请求成功', LoginUsers, data: {token: 'admin', refreshToken: '12345'}}]);
        }, 1000);
      });
    });

    //获取用户列表
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            users: mockUsers
          }]);
        }, 1000);
      });
    });

    //获取验证码
    mock.onGet('/captcha').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            "code": 1000,
            "message": "数据获取或提交成功",
            "data": {
              "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAZCAIAAAApJD5eAAACGUlEQVR42s2YMU4EMQxFU9DRUWzPCfYwNFyBhgZxVFpKzsFII1nW98/PdzRCSNZqdzYz8Zvv2E7G18/3+8fn8fmvbOnSOWDD82FO8Md4JvByZP13+HPEMDAxBx3geKZ/tkSGAaP1Xn3FKrZg0P8CXtXWYY4xQ/ua7fl+A6tjXm8PwjI59btSzcKYPsqRevg5owJXZg0805ySOGGsB9Pbh1icYCdhPFronOFn3tyf3g6r5HD9/Ovl9gjWzW18DevRFU8AH/dmVamYle28Aiv2sAq8zTz8VNQCDoXF9IFHX0G+KxNmwZ1cfRmwGdLag8ycv1PgGuQ0EegZG3V4lrRmN8Ya1q/85ARtYW1DDEeQzwqVBbxMeiJF01tCYc2cgevqpQpHSM+y/bq1dHqpnKVpMMN8NGkJkWvFElkaFjA1F5i2AVGWYpoZc8xUay+tpaBwbcJEWaJRqXUeflMWCtdXQKWeAcNjKTAMzpARzFSbnZCehTddt9CN6CxdvRRZOitGy9Ie8/A3A1XPHNsiael0lX3VjYeozO2k5ewqacve2rLAlyopAIPCuhsx3bDqsOjy/XAChpAXxtBmC9Lykll44jYeFYluXLpbfFqixf55tq/yzT0AoP61mJ02SDDP1o6YlF6/ANhk3rhOgXWgtctSa7flKLB9fqSjeuOg52Lg5dwbB2bi+VpkK2m1spf46ZxmXnJ8K47HxOL6BWV/gTqS/Re7AAAAAElFTkSuQmCC",
              "sessionId": "NeAcwQaMgb"
            }
          }]);
        }, 1000);
      });
    });

    //获取用户列表（分页）
    mock.onGet('/user/listpage').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code:1001,
            data: {
              total: total,
              users: mockUsers
            },
            message:"获取数据成功"
          }]);
        }, 1000);
      });
    });

    //获取用户列表（分页）
    mock.onGet('/price/query').reply(config => {
      let {page, name} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      let total = mockUsers.length;
      // mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 1000,
            data: {
              total: total,
              list: mockUsers
            },
            message: '获取数据成功'
          }]);
        }, 1000);
      });
    });

    //删除用户
    mock.onGet('/user/remove').reply(config => {
      let {id} = config.params;
      _Users = _Users.filter(u => u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //批量删除用户
    mock.onGet('/user/batchremove').reply(config => {
      let {ids} = config.params;
      ids = ids.split(',');
      _Users = _Users.filter(u => !ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑用户
    mock.onGet('/user/edit').reply(config => {
      let {id, name, addr, age, birth, sex} = config.params;
      _Users.some(u => {
        if (u.id === id) {
          u.name = name;
          u.addr = addr;
          u.age = age;
          u.birth = birth;
          u.sex = sex;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    //新增用户
    mock.onGet('/user/add').reply(config => {
      let {name, addr, age, birth, sex} = config.params;
      _Users.push({
        name: name,
        addr: addr,
        age: age,
        birth: birth,
        sex: sex
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

  }
};