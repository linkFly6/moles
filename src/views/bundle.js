var app = angular.module('app', ['ngRoute']),
    ipcRenderer = require('electron').ipcRenderer;
app.controller('main', ['$scope', ($scope) => {
    $scope.viewRouterName = 'index.html';
    $scope.$on('$routeChangeStart', function (event, next, current) {
        $scope.viewRouterName = next.loadedTemplateUrl;
        //console.log(arguments);
    });
}]);
(function () {
    'use strict';
    /*
        程序员老黄历
    */
    var almanac = new function () {
        /*
        * 注意：本程序中的“随机”都是伪随机概念，以当前的天为种子。
        * 原作者：twitter: @fake_faith, G+: Yiding He
        */
        function random(dayseed, indexseed) {
            var n = dayseed % 11117;
            for (var i = 0; i < 100 + indexseed; i++) {
                n = n * n;
                n = n % 11117;   // 11117 是个质数
            }
            return n;
        }

        var today = new Date();
        var iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        var weeks = ["日", "一", "二", "三", "四", "五", "六"];
        var directions = ["北方", "东北方", "东方", "东南方", "南方", "西南方", "西方", "西北方"];
        var activities = [
            { name: "写单元测试", good: "写单元测试将减少出错", bad: "写单元测试会降低你的开发效率" },
            { name: "洗澡", good: "你几天没洗澡了？", bad: "仅有的思路都会被洗掉", weekend: true },
            { name: "锻炼一下身体", good: "", bad: "能量没消耗多少，吃得却更多", weekend: true },
            { name: "抽烟", good: "抽烟有利于提神，增加思维敏捷", bad: "除非你活够了，死得早点没关系", weekend: true },
            { name: "白天上线", good: "今天白天上线是安全的", bad: "可能导致灾难性后果" },
            { name: "重构", good: "代码质量得到提高", bad: "过段时间只有上帝能认识你的代码" },
            { name: "使用%t", good: "你看起来更有品位", bad: "别人会觉得你在装逼" },
            { name: "跳槽", good: "该放手时就放手", bad: "鉴于当前的经济形势，你的下一份工作未必比现在强" },
            { name: "招人", good: "你面前这位有成为牛人的潜质", bad: "这人会写程序吗？" },
            { name: "面试", good: "面试官昨晚没有跪搓衣板，心情很好", bad: '你会遇到"(46840404742).toString(36)是什么"这样的面试题' },
            { name: "提交辞职申请", good: "公司找到了一个比你更能干更便宜的家伙，巴不得你赶快滚蛋", bad: "鉴于当前的经济形势，你的下一份工作未必比现在强" },
            { name: "申请加薪", good: "老板今天心情很好", bad: "公司正在考虑裁员" },
            { name: "晚上加班", good: "晚上是程序员精神最好的时候", bad: "", weekend: true },
            { name: "在妹子面前吹牛", good: "改善你矮穷挫的形象", bad: "会被识破", weekend: true },
            { name: "撸管", good: "避免缓冲区溢出", bad: "强撸灰飞烟灭", weekend: true },
            { name: "浏览成人网站", good: "重拾对生活的信心", bad: "你会心神不宁", weekend: true },
            { name: "命名变量\"%v\"", good: "", bad: "" },
            { name: "写超过%l行的方法", good: "你的代码组织的很好，长一点没关系", bad: "你的代码将混乱不堪，你自己都看不懂" },
            { name: "提交代码", good: "千行代码过，bug不沾身", bad: "你遇到的一大堆冲突会让你觉得自己是不是时间穿越了" },
            { name: "代码复审", good: "发现重要问题的几率大大增加", bad: "你什么问题都发现不了，白白浪费时间" },
            { name: "开会", good: "写代码之余放松一下打个盹，有益健康", bad: "小心被扣屎盆子背黑锅" },
            { name: "打DOTA", good: "hasaki！你将有如神助", bad: "千里送人头", weekend: true },
            { name: "晚上上线", good: "晚上是程序员精神最好的时候", bad: "你白天已经筋疲力尽了" },
            { name: "修复BUG", good: "你今天对BUG的嗅觉大大提高", bad: "新产生的BUG将比修复的更多" },
            { name: "设计评审", good: "设计评审会议将变成头脑风暴", bad: "人人筋疲力尽，评审就这么过了" },
            { name: "需求评审", good: "", bad: "" },
            { name: "上微博", good: "今天发生的事不能错过", bad: "今天的微博充满负能量", weekend: true },
            { name: "上AB站", good: "还需要理由吗？", bad: "满屏兄贵亮瞎你的眼", weekend: true },
            { name: "玩扫雷", good: "今天破纪录的几率很高", bad: "除非你想玩到把电脑砸了", weekend: true }
        ];

        var specials = [
            //情人节
            { date: 20170214, type: 'bad', name: '待在男（女）友身边', description: '脱团火葬场，入团保平安。' }
        ];

        var tools = ["Eclipse写程序", "MSOffice写文档", "记事本写程序", "Windows8", "Linux", "MacOS", "IE", "Android设备", "iOS设备"];

        var varNames = ["jieguo", "huodong", "pay", "expire", "zhangdan", "every", "free", "i1", "a", "virtual", "ad", "spider", "mima", "pass", "ui"];

        var drinks = ["水", "茶", "红茶", "绿茶", "咖啡", "奶茶", "可乐", "鲜奶", "豆奶", "果汁", "果味汽水", "苏打水", "运动饮料", "酸奶", "酒"];

        function is_someday() {
            return today.getMonth() == 5 && today.getDate() == 4;
        }

        function star(num) {
            var result = [];
            var i = 0;
            while (i < num) {
                result.push(true);
                i++;
            }
            while (i < 5) {
                result.push(false)
                i++;
            }
            return result;
        }


        // 去掉一些不合今日的事件
        function filter(activities) {
            var result = [];

            // 周末的话，只留下 weekend = true 的事件
            if (isWeekend()) {
                for (var i = 0; i < activities.length; i++) {
                    if (activities[i].weekend) {
                        result.push(activities[i]);
                    }
                }
                return result;
            }
            return activities;
        }

        function isWeekend() {
            return today.getDay() == 0 || today.getDay() == 6;
        }

        // 添加预定义事件
        function pickSpecials() {
            var specialSize = [0, 0];

            for (var i = 0; i < specials.length; i++) {
                var special = specials[i];

                if (iday == special.date) {
                    if (special.type == 'good') {
                        specialSize[0]++;
                        addToGood({ name: special.name, good: special.description });
                    } else {
                        specialSize[1]++;
                        addToBad({ name: special.name, bad: special.description });
                    }
                }
            }

            return specialSize;
        }

        // 从 activities 中随机挑选 size 个
        function pickRandomActivity(activities, size) {
            var picked_events = pickRandom(activities, size);

            for (var i = 0; i < picked_events.length; i++) {
                picked_events[i] = parse(picked_events[i]);
            }

            return picked_events;
        }

        // 从数组中随机挑选 size 个
        function pickRandom(array, size) {
            var result = [];

            for (var i = 0; i < array.length; i++) {
                result.push(array[i]);
            }

            for (var j = 0; j < array.length - size; j++) {
                var index = random(iday, j) % result.length;
                result.splice(index, 1);
            }

            return result;
        }

        // 解析占位符并替换成随机内容
        function parse(event) {
            var result = { name: event.name, good: event.good, bad: event.bad };  // clone

            if (result.name.indexOf('%v') != -1) {
                result.name = result.name.replace('%v', varNames[random(iday, 12) % varNames.length]);
            }

            if (result.name.indexOf('%t') != -1) {
                result.name = result.name.replace('%t', tools[random(iday, 11) % tools.length]);
            }

            if (result.name.indexOf('%l') != -1) {
                result.name = result.name.replace('%l', (random(iday, 12) % 247 + 30).toString());
            }

            return result;
        }

        // 添加到“宜”
        function addToGood(event) {
            goodEvents.push({ name: event.name, des: event.good });
        }

        // 添加到“不宜”
        function addToBad(event) {
            badEvents.push({ name: event.name, des: event.bad });
        }


        //64 event
        //if (is_someday()) { document.body.className = 'someday' };
        // 生成今日运势
        var _activities = filter(activities);

        var numGood = random(iday, 98) % 3 + 2;
        var numBad = random(iday, 87) % 3 + 2;
        var eventArr = pickRandomActivity(_activities, numGood + numBad),
            goodEvents = [],
            badEvents = [];

        pickSpecials();

        for (var i = 0; i < numGood; i++) {
            addToGood(eventArr[i]);
        }

        for (var i = 0; i < numBad; i++) {
            addToBad(eventArr[numGood + i]);
        }
        return {
            week: weeks[today.getDay()],//星期
            date: today,//今天的日期
            direction: directions[random(iday, 2) % directions.length],//座位朝向
            drink: pickRandom(drinks, 2).join('，'),//今日宜饮
            stars: star(random(iday, 6) % 5 + 1),
            goodEvents: goodEvents,
            badEvents: badEvents
        };
    }


    app.controller('index-ctr', ['$scope', '$timeout', function ($scope, $timeout) {
        //当前焦点图索引
        var currIndex = 3,
            $bannerBox = $('#b-box'),
            $bannerChild = $bannerBox.children(),
            bannerLength = $bannerChild.length,
            temp,
            createClassName = function (index) {
                return 'i-box' + index;
            },
            move2Right = function () {
                temp = $bannerChild[bannerLength - 1];
                //$bannerChild.removeAttr('class');
                for (var i = bannerLength - 1; i > 0; i--) {
                    $bannerChild[i] = $bannerChild[i - 1];
                    $bannerChild.eq(i).removeAttr('class').addClass(createClassName(i + 1)).data('index', i + 1);

                }
                $bannerChild[0] = temp;
                $bannerChild.eq(0).removeAttr('class').addClass(createClassName(1)).data('index', 1);
            },
            move2Left = function () {
                temp = $bannerChild.eq(0);
                $bannerChild.removeAttr('class');
                for (var i = 0; i < bannerLength - 1; i++) {
                    //if ($bannerChild[i + 1]) {
                    $bannerChild[i] = $bannerChild[i + 1];
                    $bannerChild.eq(i).addClass(createClassName(i + 1)).data('index', i + 1);
                    //}
                }
                temp.addClass(createClassName(bannerLength)).data('index', bannerLength);
                $bannerChild[bannerLength - 1] = temp[0];
            };
        $scope.bannerClick = (e) => {
            var clickIndex = $(e.currentTarget).data('index');
            if (clickIndex == currIndex - 1) {
                move2Right();
            } else if (clickIndex == currIndex + 1) {
                move2Left();
            } else if (currIndex === clickIndex) {
                alert('当前项');
            };
        };
        //程序员老黄历 TODO => 如果程序没关，第二天怎么显示？
        $scope.almanac = almanac;
    }]);
})();
(function () {
    'use strict';
    const _ = require('lodash');
    //本地存储
    const storage = require('electron-json-storage');
    //本地存储key（文件名称）
    const STORAGENAME = 'VIEWS_SIM_COMPRESSOR_OPTIONS';
    var globalOptions = {
        JS: {
            join_vars: true,////合并多个变量声明，加入连续的var语句
            hoist_funs: true,//函数声明置顶，多个变量合并不利于压缩代码调试
            hoist_vars: true,//变量声明置顶，多个变量合并不利于压缩代码调试
            drop_debugger: true,//删除调试器和调试语句（debugger）
            dead_code: true,//删除运行不到的代码
            unused: true,//删除没用的声明
            loops: true,//优化循环
            if_return: true,//优化if-else表达式
            conditionals: true,//优化条件表达式（转换成二元）
            evaluate: true,//优化常量表达式（尝试去计算常量表达式）
            comparisons: true,//优化逻辑操作符
            booleans: true,//优化布尔表达式
            properties: false//智能对象转换=>类似a['foo'] 智能优化为 a.foo
        },
        CSS: {
        }
    };

    app.controller('simple-Compressor-ctr', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.oldCodeSource = $scope.newCodeSource = $scope.info = '';
        $scope.compressType = 0;
        //是否正在压缩中
        $scope.compressoring = false;

        //这次压缩是否有异常
        $scope.isErrorResult = false;
        //错误文本
        $scope.errorText = '';

        //选择压缩类型
        $scope.selectType = (compressType) => {
            //切换了选项，则清空
            if ($scope.compressType != compressType) {
                $scope.oldCodeSource = $scope.newCodeSource = $scope.info = '';
            }
            $scope.compressType = compressType;
        };

        //js压缩模型
        $scope.jsConfig = {
            jsComprssConfig: false,
            toggleConfig: function () {
                $scope.jsConfig.jsComprssConfig = !$scope.jsConfig.jsComprssConfig;
            },
            options: globalOptions.JS
        };
        //从本地存储读取配置
        storage.get(STORAGENAME, function (error, data) {
            if (error) return;//throw error //有错误则不读取了
            if (data && data.JS) {
                globalOptions.JS = data.JS;
                $scope.jsConfig.options = data.JS;
            }
        });

        //监听js压缩选项变动，有变动则存入本地
        $scope.$watch('jsConfig.options', _.debounce(function (newOptions, oldOptions) {//函数节流，2s之后才会执行
            globalOptions.JS = newOptions;
            storage.set(STORAGENAME, globalOptions, function (error, data) {
                //if (error) throw error;
                if (error) return;//有错误也不抛出
            });
        }, 2000), true/*对象属性变动都会触发*/);

        $scope.$watch('oldCodeSource', _.debounce(() => {
            if ($scope.isErrorResult) {
                $scope.$apply(() => {
                    $scope.isErrorResult = false;
                    $scope.errorText = '';
                });
            }
        }, 300));



        //压缩
        $scope.compressor = () => {
            var oldValue = $scope.oldCodeSource.trim();
            if (oldValue.length) {
                $scope.compressoring = true;
                switch ($scope.compressType) {
                    case 0://压缩js
                        ipcRenderer.send('async-compressor-js', {
                            source: oldValue,
                            options: $scope.jsConfig.options
                        });
                        break;

                    case 1://压缩css

                        break;

                    default://压缩HTML

                        break;
                }
            }
        }
        //压缩完成
        ipcRenderer.on('async-compressor-js-reply', function (event, err, data, extra, oldBytes, newBytes, timer) {//事件源，错误，压缩后的代码，警告，压缩前bytes，压缩后bytes，压缩耗时（ms）
            if (err != null) {
                console.log(err);
                $scope.$apply(() => {
                    $scope.compressoring = false;
                    $scope.info = `压缩异常 - 错误行：${err.line}，错误列：${err.col} `;
                    $scope.isErrorResult = true;
                    $scope.errorText = `错误信息：\n${err.message}`;//\n错误明细：\n${err.stack}
                });
                return;
            }
            if (data != null) {
                $scope.$apply(function () {
                    $scope.newCodeSource = data.code;
                    $scope.compressoring = false;
                    $scope.info = `当前体积：${newBytes}byte | 原始体积：${oldBytes}byte | 比率：${(newBytes / oldBytes * 100).toFixed(2)}% | 执行时间：${timer} (ms)`;
                });
            } else {
                $scope.$apply(() => {
                    $scope.compressoring = false;
                });
            }

        });
    }]);
})();
(function () {
    'use strict';
    const _ = require('lodash');
    //本地存储
    const storage = require('electron-json-storage');
    //本地存储key（文件名称）
    const STORAGENAME = 'VIEWS_SIM_COMPILE_OPTIONS';
    var globalOptions = {
        templateLiterals: true,//字符串模板
        arrowFunctions: true,//箭头函数
        blockScopedFunctions: true,//函数块级作用域
        classes: false,//支持Class
        shorthandProperties: false,//对象快捷属性
        shorthandKeys: false,//重复属性转换
        computedProperties: false,//对象中括号属性
        forOf: true,//编译for...of语法
        stickyRegex: false,//正则标记(y)
        unicodeRegex: false,//正则标记(u)
        constants: true,//const常量
        spread: true,//扩展运算符(...values)
        parameters: false,//参数默认值
        destructuring: false,//赋值解构
        blockScoping: true,//let和const块级作用域
        typeofSymbol: false,//编译typeof Symbol()
        modulesCommonjs: false,//commonJS
        modulesAmd: false,//AMD
        modulesUmd: true,//UMD
        eval: true,//包装eval
        asyncMethod: false,//async转换
        regenerator: false//Generator
    };

    app.controller('simple-Compile-ctr', ['$scope', '$timeout', ($scope, $timeout) => {
        $scope.oldCodeSource = $scope.newCodeSource = $scope.info = '';
        //是否正在编译中
        $scope.compressoring = false;

        //这次压缩是否有异常
        $scope.isErrorResult = false;
        //错误文本
        $scope.errorText = '';
        //js压缩模型
        $scope.options = {
            compile: false,
            toggleConfig: function () {
                $scope.options.compile = !$scope.options.compile;
            },
            config: globalOptions
        };
        //从本地存储读取配置
        storage.get(STORAGENAME, (error, data) => {
            if (error) return;//throw error //有错误则不读取了
            if (data) {
                globalOptions = data;
                $scope.options.config = data;
            }
        });

        //监听js压缩选项变动，有变动则存入本地
        $scope.$watch('options.config', _.debounce(function (newOptions, oldOptions) {//函数节流，2s之后才会执行
            globalOptions = newOptions;
            storage.set(STORAGENAME, globalOptions, function (error, data) {
                //if (error) throw error;
                if (error) return;//有错误也不抛出
            });
        }, 2000), true/*对象属性变动都会触发*/);

        $scope.$watch('oldCodeSource', _.debounce(() => {
            if ($scope.isErrorResult) {
                $scope.$apply(() => {
                    $scope.isErrorResult = false;
                    $scope.errorText = '';
                });
            }
        }, 300));



        //开始编译
        $scope.compressor = () => {
            var oldValue = $scope.oldCodeSource.trim();
            if (oldValue.length) {
                $scope.compressoring = true;
                ipcRenderer.send('async-compile-es', {
                    source: oldValue,
                    options: $scope.options.config
                });
            }
        }
        //编译完成
        ipcRenderer.on('async-compile-es-reply', function (event, err, data, oldBytes, newBytes, timer) {//事件源，错误，编译后的代码，编译前bytes，编译后bytes，编译耗时（ms）
            console.log(err, data);
            if (err != null) {
                $scope.$apply(() => {
                    $scope.compressoring = false;
                    $scope.info = `编译异常 - 错误行：${err.loc.line}，错误列：${err.loc.column} `;
                    $scope.isErrorResult = true;
                    $scope.errorText = `错误信息：\n${err.codeFrame}`;//\n错误明细：\n${err.stack}
                });
                return;
            }
            if (data != null) {
                $scope.$apply(function () {
                    $scope.newCodeSource = data.code;
                    $scope.compressoring = false;
                    $scope.info = `当前体积：${newBytes}byte | 原始体积：${oldBytes}byte | 比率：${(newBytes / oldBytes * 100).toFixed(2)}% | 执行时间：${timer} (ms)`;
                });
            } else {
                $scope.$apply(() => {
                    $scope.compressoring = false;
                });
            }

        });
    }]);
})();
(function () {
    //注册路由
    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/', {
            templateUrl: "index.html",
            controller: 'index-ctr'
        }).when('/simCom', {
            templateUrl: 'quickcompress.html',
            controller: 'simple-Compressor-ctr'
        }).when('/simCompile', {
            templateUrl: 'quickcompile.html',
            controller: 'simple-Compile-ctr'
        })
            .otherwise('/');//默认路由
    });
})();