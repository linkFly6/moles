(function () {
    'use strict';
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


        
    }]);
})();