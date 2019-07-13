var content = document.querySelector('.content');
var tabs = [...document.querySelectorAll('.tab span')];
var savebill = document.querySelector('.savebill');
var type = 1;
renderList();
tabs.map(function(val) {
    val.onclick = function() {
        tabs.map(function(item) {
            item.classList.remove('active');
        })
        this.classList.toggle('active');
        if (this.innerHTML == '收入') {
            type = 2;
        } else {
            type = 1;
        }
        renderList();
    }
});
//渲染列表
function renderList() {
    var xhr = new XMLHttpRequest();
    xhr.onload = function(e) {
        var data = JSON.parse(e.target.responseText);
        if (data.code == 0) {
            var html = '';
            data.data.map(function(val) {
                html += ` <dl data-main='${val.icon}'>
                <dt><i class='icon iconfont icon-${val.icon}'></i></dt>
                <dd><span>${val.name}</span></dd>
            </dl>`
            })
            content.innerHTML = html;
            var dls = [...content.querySelectorAll('dl')];
            dls.map(function(item) {
                item.onclick = function() {
                    dls.map(function(item) {
                        item.classList.remove('active');
                    })
                    this.classList.toggle('active');
                    var iconhtml = item.querySelector('.icon').classList;
                    var namehtml = item.querySelector('span').innerHTML;
                    myname.innerHTML = namehtml;
                    myicon.classList = iconhtml;
                    iconi = item.dataset.main;
                    savebill.onclick = function() {
                        var money = price.value;
                        var xhr = new XMLHttpRequest();
                        xhr.onload = function(e) {
                            var data = JSON.parse(e.target.responseText);
                            if (data.code == 0) {
                                console.log(data.mes);
                                location.href = 'index.html'
                            }
                        }
                        xhr.open('post', '/addlist');
                        xhr.setRequestHeader('Content-type', 'application/json')
                        xhr.send(JSON.stringify({
                            name: namehtml,
                            icon: iconi,
                            type: type,
                            money: money
                        }))
                    }
                }
            })

        }
    }
    xhr.open('get', '/iconlist?type=' + type);
    xhr.send();
}