# moles - 可视化前端开发集成工具

![moles logo](http://i1.piimg.com/567571/c362ff146c5f416a.png)


一个可视化前端开发集成工具 —— 自动化你的自动化工具

我相信你也和我一样讨厌编写各种各样的配置，讨厌编写配置的时候要查阅各种官方文档。当所有人说我们可以通过 `webpack/gulp` 写点配置文件，就可以搞定的自动化工作的时候。我们却发现，你在写这些配置 (js) 的时候并没有自动化。

于是我想到：
- 为什么我们不能让这些配置文件也可以自动生成呢？
- 为什么我们要查阅各种配置？
- 为什么要让我们主动去编写代码而不能提供好现成的配置给我们自由选择？
- 为什么我们还需要写代码？难道鼠标点几下不会更舒服么？

是的，编写代码很酷很 geek。但当你把许多的时间浪费在编写配置，查阅文档和各种技术的时候，这可一点也不酷。

所以，我想做一个简单的工具，让这些配置工作十分的简单。

动动手指之间，就可以配置好你的自动化任务。

# 安装和开始

安装

```shell
$ npm i --dd
$ npm i -g gulp
$ npm i -g webpack
$ npm i -g electron
```

开始

```shell
$ node build/build.js
$ electron .
```

![moles](http://i1.piimg.com/567571/7bdcfcf65fee712b.png)

国内 `npm` 访问速度略慢，可以使用 `cnpm` 代替 `npm` 安装包内容：

```
npm i -g cnpm --registry=https://registry.npm.taobao.org
```

# 技术

特别感谢这些伟大的项目为 `moles` 提供了强有力的技术根基

- nodejs
- electron
- vue
- muse-ui
- babel


# 协议

[moles](https://github.com/linkFly6/moles) 项目采用 [知识共享署名3.0 ( CC Attribution-NonCommercial )](https://creativecommons.org/licenses/by-nc/3.0/) 许可，并且 [moles](https://github.com/linkFly6/moles) 项目和代码还采用 [GPL](http://choosealicense.com/licenses/gpl-3.0/) 协议。

您必须遵循以下要求(包括但不局限于)：

 - 署名
 - 禁止商业演绎