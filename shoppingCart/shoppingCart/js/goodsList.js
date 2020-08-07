$(function(){
    //加载数据
    $.ajax({
        url:'./data/goods.json',
        type:'get',
        datatype:'json',
        success:function(jsonArr){
            //这里拿到的字符数组对象
            $.each(jsonArr,function(index,item){
                var goodsDom =`<div class="goods">
                <img src="${item.imgurl}" alt="">
                <p>${item.price}</p>
                <h3>${item.title}</h3>
                <div code ="${item.code}">加入购物车</div>
            </div>`
            $('.content').append(goodsDom);
            })

        }
    })

    $('.content').on('click','.goods div',function(){
        //需要存到本地存储 
        //之前是否有加入过购物车
        //localStorage //key /value
        //数据的存储格式
        //本地存储是否有数据

        var goodsArr = [];//r如果没有就是一个空的 就需要push数据进来
        //如果之前本地存储有数据的话，
        if(localStorage.getItem('goods')){
            goodsArr = JSON.parse(localStorage.getItem('goods'));//有数据就获取 
            console.log(goodsArr)
        }
       
        var code =$(this).attr('code')//当前商品的编码
        var flag = false;
        $.each(goodsArr,function(index,item){
            if(item.code === code){
                item.num++;
                return false;
                //如果执行进来  说明已经有数据
            }
        })
        //如果购物车没有次商品，就要加一条数据
        if(!flag){
            goodsArr.push({"code":code,"num":1})
        }
        //存到localstorage中
        localStorage.setItem('goods',JSON.stringify(goodsArr));
        alert('加入购物车成功')
       
    })
})