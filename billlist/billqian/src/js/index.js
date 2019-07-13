var addBtn = document.querySelector('.addBtn');
var content = document.querySelector('.content')
addBtn.onclick = function() {
    location.href = 'addbill.html'
}

//渲染购物列表
var xhr = new XMLHttpRequest();
xhr.onload = function(e) {
    var data = JSON.parse(e.target.responseText);
    if (data.code == 0) {
        content.innerHTML += data.data.map(function(val) {
            return ` <dl>
                        <dt>
                            <p><i  class="icon iconfont ${val.icon}"></i></p>
                        </dt>
                        <dd>
                            <span class="name">${val.name}</span>
                            <span class=${val.type==1?"money":"pay"}><b>${val.type==1?"+":"-"}</b>${val.money}</span>
                        </dd>
                    </dl>`
        }).join('')
    }
}
xhr.open('get', '/getlist');
xhr.send();