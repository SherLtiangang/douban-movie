// $('footer>div').click(function () {
//     var index = $(this).index()
//     $('section').hide().eq(index).fadeIn()
//     $(this).addClass('active').siblings().removeClass('active')
// })
// var index = 0
// var isLoading = false
// start()
// function start() {
//     if (isLoading) return
//     isLoading = true
//     $('.loading').show()
//     $.ajax({
//         url: 'https://api.douban.com/v2/movie/top250',
//         type: 'GET',
//         data: {
//             start: index,
//             count: 20
//         },
//         dataType: 'jsonp'
//     }).done(function (ret) {
//         console.log(ret)
//         setData(ret)
//         index += 20
//     }).fail(function () {
//         console.log('error...')
//     }).always(function () {
//         isLoading = false
//         $('.loading').hide()
//     })
// }
// var clock
// //函数节流
// $('main').scroll(function () {
//     if (clock) {
//         clearTimeout(clock)
//     }
//     clock = setTimeout(
//         function () {
//             if ($('section').eq(0).height() - 10 <= $('main').height() + $('main').scrollTop()) {
//                 start()
//             }
//         }, 200)
// })
// function setData(data) {
//     data.subjects.forEach(function (movie) {
//         var template = `<div class="item">
//         <a href="#">
//             <div class="cover">
//                 <img src="" alt="">
//             </div>
//             <div class="detail">
//                 <h2></h2>
//                 <div class="extra"><span class="score"></span> / <span class="collect"></span>收藏</div>
//                 <div class="extra"><span class="year"></span> / <span class="type"></span></div>
//                 <div class="extra">导演：<span class="director"></span></div>
//                 <div class="extra">主演：<span class="actor"></span></div>
//             </div>
//         </a>
//     </div>`
//         //拼接字符串方法： 每一行后面加\转义字符
//         var $node = $(template)
//         $node.find('a').attr('herf', movie.alt)
//         $node.find('.cover img').attr('src', movie.images.medium)
//         $node.find('.detail h2').text(movie.title)
//         $node.find('.score').text(movie.rating.average + '分')
//         $node.find('.collect').text(movie.collect_count)
//         $node.find('.year').text(movie.year)
//         $node.find('.type').text(movie.genres.join('/'))
//         $node.find('.director').text(function () {
//             var directorsArr = []
//             movie.directors.forEach(function (item) {
//                 directorsArr.push(item.name)
//             })
//             return directorsArr.join('、')
//         })
//         $node.find('.actor').text(function () {
//             var actorsArr = []
//             movie.casts.forEach(function (item) {
//                 actorsArr.push(item.name)
//             })
//             return actorsArr.join('、')
//         })
//         $('.top250').append($node)
//     })
// }



var top250 = {
    init: function () {
        this.$element = $('#top250')
        this.isLoading = false
        this.index = 0
        this.isFinish = false
        this.bind()
        this.start()

    },
    bind: function () {
        var _this = this
        this.$element.scroll(function () {
            _this.start()
        })
    },
    start: function () {
        var _this = this
        this.getData(function (data) {
            _this.render(data)
        })
    },
    getData: function (callback) {
        var _this = this
        if (_this.isLoading) return
        _this.isLoading = true
        _this.$element.find('.loading').show()
        $.ajax({
            url: 'https://douban.uieee.com/v2/movie/top250',
            type: 'GET',
            data: {
                start: _this.index || 0,
                count: 20
            },
            dataType: 'jsonp'
        }).done(function (ret) {
            console.log(ret)
            _this.index += 20
            if (_this.index >= ret.total) {
                _this.isFinish = true
            }
            callback && callback(ret)
        }).fail(function () {
            console.log('error...')
        }).always(function () {
            _this.isLoading = false
            _this.$element.find('.loading').hide()
        })
    },
    render: function (data) {
        var _this = this
        data.subjects.forEach(function (movie) {
            var template = `<div class="item">
        <a href="#">
            <div class="cover">
                <img src="" alt="">
            </div>
            <div class="detail">
                <h2></h2>
                <div class="extra"><span class="score"></span> / <span class="collect"></span>收藏</div>
                <div class="extra"><span class="year"></span> / <span class="type"></span></div>
                <div class="extra">导演：<span class="director"></span></div>
                <div class="extra">主演：<span class="actor"></span></div>
            </div>
        </a>
    </div>`
            //拼接字符串方法： 每一行后面加\转义字符
            var $node = $(template)
            $node.find('a').attr('herf', movie.alt)
            $node.find('.cover img').attr('src', movie.images.medium)
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average + '分')
            $node.find('.collect').text(movie.collect_count)
            $node.find('.year').text(movie.year)
            $node.find('.type').text(movie.genres.join('/'))
            $node.find('.director').text(function () {
                var directorsArr = []
                movie.directors.forEach(function (item) {
                    directorsArr.push(item.name)
                })
                return directorsArr.join('、')
            })
            $node.find('.actor').text(function () {
                var actorsArr = []
                movie.casts.forEach(function (item) {
                    actorsArr.push(item.name)
                })
                return actorsArr.join('、')
            })
            _this.$element.find('.container').append($node)
        })
    },
    isToBottom: function () {
        return this.$element.find('.container') <= this.$element.height() + this.$element.scrollTop() + 10
    }
}
var usBox = {
    init: function () {
        this.$element = $('#beimei')
        this.start()
    },
    start: function () {
        var _this = this
        this.getData(function (data) {
            _this.render(data)
        })
    },
    getData: function (callback) {
        var _this = this
        if (_this.isLoading) return
        _this.isLoading = true
        _this.$element.find('.loading').show()
        $.ajax({
            url: 'https://douban.uieee.com/v2/movie/us_box',
            type: 'GET',
            dataType: 'jsonp'
        }).done(function (ret) {
            console.log(ret)
            callback && callback(ret)
        }).fail(function () {
            console.log('error...')
        }).always(function () {
            _this.$element.find('.loading').hide()
        })
    },
    render: function (data) {
        var _this = this
        data.subjects.forEach(function (movie) {
            movie = movie.subject
            var template = `<div class="item">
        <a href="#">
            <div class="cover">
                <img src="" alt="">
            </div>
            <div class="detail">
                <h2></h2>
                <div class="extra"><span class="score"></span> / <span class="collect"></span>收藏</div>
                <div class="extra"><span class="year"></span> / <span class="type"></span></div>
                <div class="extra">导演：<span class="director"></span></div>
                <div class="extra">主演：<span class="actor"></span></div>
            </div>
        </a>
    </div>`
            //拼接字符串方法： 每一行后面加\转义字符
            var $node = $(template)
            $node.find('a').attr('herf', movie.alt)
            $node.find('.cover img').attr('src', movie.images.medium)
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average + '分')
            $node.find('.collect').text(movie.collect_count)
            $node.find('.year').text(movie.year)
            $node.find('.type').text(movie.genres.join('/'))
            $node.find('.director').text(function () {
                var directorsArr = []
                movie.directors.forEach(function (item) {
                    directorsArr.push(item.name)
                })
                return directorsArr.join('、')
            })
            $node.find('.actor').text(function () {
                var actorsArr = []
                movie.casts.forEach(function (item) {
                    actorsArr.push(item.name)
                })
                return actorsArr.join('、')
            })
            _this.$element.find('.container').append($node)
        })
    }
}
var search = {
    init: function () {
        this.$element = $('#search')
        this.keyword = ''
        this.bind()
        this.start()
    },
    bind: function(){
        var _this = this 
        this.$element.find('.button').click(
            function(){
                _this.keyword = _this.$element.find('input').val()
                _this.start()
            }
        )
    },
    start: function () {
        var _this = this
        this.getData(function (data) {
            _this.render(data)
        })
    },
    getData: function (callback) {
        var _this = this
        _this.$element.find('.loading').show()
        $.ajax({
            url: 'https://douban.uieee.com/v2/movie/search',
            data: {
                q: _this.keyword
            },
            type: 'GET',
            dataType: 'jsonp'
        }).done(function (ret) {
            console.log(ret)
            callback && callback(ret)
        }).fail(function () {
            console.log('error...')
        }).always(function () {
            _this.$element.find('.loading').hide()
        })
    },
    render: function (data) {
        var _this = this
        data.subjects.forEach(function (movie) {
            var template = `<div class="item">
        <a href="#">
            <div class="cover">
                <img src="" alt="">
            </div>
            <div class="detail">
                <h2></h2>
                <div class="extra"><span class="score"></span> / <span class="collect"></span>收藏</div>
                <div class="extra"><span class="year"></span> / <span class="type"></span></div>
                <div class="extra">导演：<span class="director"></span></div>
                <div class="extra">主演：<span class="actor"></span></div>
            </div>
        </a>
    </div>`
            //拼接字符串方法： 每一行后面加\转义字符
            var $node = $(template)
            $node.find('a').attr('herf', movie.alt)
            $node.find('.cover img').attr('src', movie.images.medium)
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average + '分')
            $node.find('.collect').text(movie.collect_count)
            $node.find('.year').text(movie.year)
            $node.find('.type').text(movie.genres.join('/'))
            $node.find('.director').text(function () {
                var directorsArr = []
                movie.directors.forEach(function (item) {
                    directorsArr.push(item.name)
                })
                return directorsArr.join('、')
            })
            $node.find('.actor').text(function () {
                var actorsArr = []
                movie.casts.forEach(function (item) {
                    actorsArr.push(item.name)
                })
                return actorsArr.join('、')
            })
            _this.$element.find('.search-result').append($node)
        })
    },

}
var app = {
    init: function () {
        this.$tabs = $('footer>div')
        this.$panels = $('section')
        this.bing()
        top250.init()
        usBox.init()
        search.init()
    },
    bing: function () {
        var _this = this
        this.$tabs.on('click', function () {
            $(this).addClass('active').siblings().removeClass('active')
            _this.$panels.eq($(this).index()).fadeIn().siblings().hide()
        })
    }
}
app.init()












