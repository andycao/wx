(function($){
  var busy = false;
  var currentCity = "ZhengZhou";

  var cityCodeList = {zhengzhou : "ZhengZhou", luoyang : "LuoYang", haikou : "HaiKou"};
  updateShopList("Shuang11", "BeiJing");

  function updateShopList(event, city){
    if(busy){
      return ;
    }
    busy = true;

    var params = {
      api : '1044',
      num : 50,
      ownertype: 'all',
      event : event,
      cityCode : city
    };

    useCfApi(params, function succ(result){
      console.log(result);
      //清除商店与卡券
      $("#shopList .shopBlock").remove();

      var shopList = result.data;

      var html = '';
      shopList.forEach(function(entry){
        console.log(entry);
        html += getShopBlockHtml(entry);
      });

      //添加商店列表
      if(html){
        $("#shopList").append(html);
      }

    }, apiError, function complete(){
      setAction();
      if(city === cityCodeList.zhengzhou ){
        $("#citys span").text("郑州");
      } else if(city === cityCodeList.luoyang ){
        $("#citys span").text("洛阳");
      } else{
        $("#citys span").text("海口");
      }
      currentCity = city;
      busy = false;
    });
  }

  function setAction(){
    $('.collapse').on('hide.bs.collapse', function () {
      $(this).parent().find(".arrow-down").addClass("arrow-right").removeClass("arrow-down");
    });
    $('.collapse').on('show.bs.collapse', function () {
      $(this).parent().find(".arrow-right").addClass("arrow-down").removeClass("arrow-right");
    });

    $("#main .rule").click(function(){
      location.href = "rule.html";
    });

    $("#citys").click(function(){
      $('#myModal').modal('show');
      $('.city').removeClass("btn-primary");
      if(currentCity === cityCodeList.zhengzhou){
        $('.zhengzhou').addClass("btn-primary");
      } else if( currentCity === cityCodeList.luoyang){
        $('.luoyang').addClass("btn-primary");
      } else if( currentCity === cityCodeList.haikou){
        $('.haikou').addClass("btn-primary");
      }
    });

    $("#myModal .modal-body .luoyang").click(function(){
      updateShopList("Shuang11", cityCodeList.luoyang);
      $('#myModal').modal('hide');
    });
    $("#myModal .modal-body .haikou").click(function(){
      updateShopList("Shuang11", cityCodeList.haikou);
      $('#myModal').modal('hide');
    });
    $("#myModal .modal-body .zhengzhou").click(function(){
      updateShopList("Shuang11", cityCodeList.zhengzhou);
      $('#myModal').modal('hide');
    });
  }

  //modal, card section
  function getCardHtml(pcard){
    if( !pcard ){
      return ;
    }
    var card = pcard;
    var html = '<div class="card">' +
      '<a role="button" href="' + getCardUrl(card.cardid) + '">' +
      '<img class="shopDemo" src="' + card.qimgurl + '-th320" alt=""/>'+
      '<h2>' + card.title + '</h2>'+
      '<div class="desc">' + card.desc + '</div>'+
      '<div class="price">'+
      '<span class="price_now">&yen;<span>' + getPrice(card.price_now) +'</span></span>'+
      '<span class="price_before">&yen;<span>' + getPrice(card.price_before) + '</span></span>'+
      '<span class="card_collect">' + card.view + '阅读</span>'+
      '</div>'+
      '</a>'+
      '</div>';


    return html;
  }

  //modal, whole shop html
  function getShopBlockHtml(shop){
    if( !shop ){
      return ;
    }

    var shopdata = calcShop(shop);

    var html =
    '<div class="shopBlock">' +
    '<div class="shop" role="tab">'+
    '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#' + shop.sid + '" aria-expanded="true" aria-controls="' + shop.sid + '">'+
    '<img class="shopDemo" src="' + shopdata.showQimgurl + '-th320" alt=""/>'+
    '<h2>' + shop.sname + '</h2>'+
    '<div class="mobile"><i class="fa fa-phone"></i><span>' + shop.mobile + '</span></div>'+
    '<div class="address"><i class="fa fa-map-marker"></i><span>' + shop.address + '</span></div>'+
    '<div class="details"><span>浏览' + shopdata.totalViews + '次</span>|<span>最高减免' + shopdata.bestDiscount + '元</span>|<span>当面付</span></div>'+

    '<div class="distance"><img src="' + getTransport(shop.dist) + '" alt=""/><' + distanceStr(shop.dist) + '</div>'+
    '<div class="arrow-right"></div>'+
    '</a>'+
    '</div>';

    html += '<div id="' + shop.sid + '" class="cardList collapse" role="tabpanel">';


    //card list
    var cardList = shop.cardSet;
    cardList.forEach(function(entry){
      html += getCardHtml(entry);
    });
    html += '</div>'; //end of cardlist
    html += "</div>"; //end of shopblock

    return html;
  }

  function getCardUrl(cardid){
    return "http://m.cusflo.com/wf/index.html#/card/" + cardid;
  }

})(jQuery);



function getPrice(price){
  var t = parseFloat(price);
  if(!isNaN(t))
    return Math.floor(t*100)/100;
  else
    return 0;
}

function distanceStr(dist){
  var t = getDistance(dist);
  if(t > 1000){
    return "遥远";
  } else {
    return t + "km";
  }
}
function getDistance(dist){
  return Math.ceil(dist/1000);
}

function getTransport(dist){
  var car = "images/car.png";
  var bike = "images/bike.png";
  var walk = "images/walk.png";

  var t = getDistance(dist);
  if(t < 10){
    return walk;
  } else if( t < 20){
    return bike;
  } else {
    return car;
  }
}

function calcShop(shop){
  var list = shop.cardSet;

  var totalViews = 0;
  var bestDiscount = 0;
  var showQimgurl = "";
  list.forEach(function(entry){
    totalViews += entry.view;

    if( (entry.price_before - entry.price_now) > bestDiscount){
      bestDiscount = entry.price_before - entry.price_now;
      showQimgurl = entry.qimgurl;
    }
  });

  return {totalViews : totalViews, bestDiscount : bestDiscount, showQimgurl : showQimgurl};
}
