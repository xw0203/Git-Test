$(function(){
   //判断购物车中是否有数据
   if(localStorage.getItem('goods')){
       var goodsArr = JSON.parse(localStorage.getItem('goods'))
       //如果有数据，就把本地存储的数据拿过来
       $.ajax({
           url:'./data/goods.json',
           type:'get',
           dataType:'json',
           success:function(jsonArr){
               //json数组 根据本地存储商品的id来取需要的数据
               $.each(goodsArr,function(index,item){
                   //在本地存储中取出一条数据和jsonArr中相比 ，一样的就遍历出来取出来
                   $.each(jsonArr,function(i,obj){
                       if(item.code === obj.code){
                           var goodsDom = `<li>
                           <img src="${obj.imgurl}" alt="">
                           <h3>${obj.title}</h3>
                           <p>${obj.price}</p>
                           <span>${item.num}</span>
                           <em code =${item.code}>删除</em>
                       </li>`
                       $('.list').append(goodsDom);
                       }
                   })
               })

            }
       })
       //当前商品的编号
       $('.list').on('click','li em',function(){
           var code =$(this).attr('code');
           $.each(goodsArr,function(index,item){
               if(item.code === code){
                   goodsArr.splice(index,1);
                   return false;
               }
           })

          
           if (goodsArr.length > 0) {
            // 把数据更新到本地存储
            localStorage.setItem('goods',JSON.stringify(goodsArr));
        } else {
            localStorage.clear();
            var newLi = '<li style="line-height:80px; text-align:center; color: #999;">购物车暂无数据！</li>';
            $('.list').html(newLi);
        }

           $(this).parent().remove();
           alert('商品移除购物车成功')
       })

   }else{
       //没有数据的话 就提示
       var newli = '<li>购物车暂无数据</li>'
       $('.list').html(newli)
   }
})