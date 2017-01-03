import os from 'os';
import _ from 'lodash';


// https://pinggod.gitbooks.io/nodejs-doc-in-chinese/content/doc/os.html
var OS = {
  EOL: '', // 常量，返回当前操作系统的换行符
  arch: null, // CPU 架构
  cpus: null, // CPU 信息
  endianness: null, // 字节顺序 高位优先返回BE,低位优先的返回LE
  freemem: null, // 空闲内存字节
  homedir: null, // 当前登录用户的根目录
  hostname: null, // 操作系统主机名
  loadavg: null, // 系统最近5、10、15分钟的平均负载,这是一个针对linux或unix的统计，windows下始终返回[0,0,0]
  networkInterfaces: null, // 网络配置列表
  platform: null, // 操作系统类型,返回值有'darwin', 'freebsd', 'linux', 'sunos' , 'win32'
  release: null, // 操作系统版本
  tmpdir: null, // 操作系统临时文件的默认目录
  totalmem: null, // 系统总内存
  type: null, // 操作系统名称，基于linux的返回linux,基于苹果的返回Darwin,基于windows的返回Windows_NT
  uptime: null, // 计算机正常运行时间
  flush() {
    Object.keys(this).forEach(function (key) {
      if (os[key]) {
        if (_.isFunction(os[key])) {
          this[key] = os[key]();
        } else {
          this[key] = os[key];
        }
      }
    }, this);
    return this;
  }
};

export default OS.flush();

