
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

// ヘッダー背景変更
$(window).on('scroll', function () {
  if ($('.mv').height() < $(this).scrollTop()) {
      $('.js-header').addClass('change-color');
} else {
      $('.js-header').removeClass('change-color');
}
});


  // ハンバーガーメニュー
$(".js-hamburger,.js-drawer").click(function () {
  $(".js-hamburger").toggleClass("is-active");
  $(".js-drawer").fadeToggle();
});

//Slider1
var slider1 = new Swiper ('.js-slider1', {
  loop: true,
  effect: "fade",
  speed: 3000,
  allowTouchMove: false,
  autoplay: {
    delay: 3000,
  },
});


  // 画像のスライドアニメーション
  //要素の取得とスピードの設定
  var box = $('.js-slide-animation'),
  speed = 700;

  //.slide-animationの付いた全ての要素に対して下記の処理を行う
  box.each(function(){
    // 背景スライド用の要素を追加
    $(this).append('<div class="slide-animation__bg"></div>');

    var color = $(this).find('.slide-animation__bg');
    var image = $(this).find('.slide-animation__img');
    var counter = 0;

    // 画像と背景の初期スタイル設定
    image.css('opacity','0');
    color.css('width','0%');

    // inviewを使って背景色が画面に現れたら処理をする
    color.on('inview', function(){
      if(counter == 0){
        $(this).delay(200).animate({'width':'100%'},speed,function(){
          // 背景色表示後の処理
          image.css('opacity','1');
          $(this).css({'left':'0','right':'auto'});
          $(this).animate({'width':'0%'},speed);
        })
        counter = 1;
      }
    });
  });


  //  ページトップボタン
  $(function() {
    // 変数にクラスを入れる
    var btn = $('.js-page-top');

    //スクロールしてページトップから100に達したらボタンを表示
    $(window).on('load scroll', function(){
      if($(this).scrollTop() > 100) {
        btn.addClass('is-active');
      }else{
        btn.removeClass('is-active');
      }
    });

    //フッターの手前でボタンを止める
    $(window).on('load scroll', function(){
      var height = $(document).height(), //ドキュメントの高さ
          position = window.innerHeight + $(window).scrollTop(), //ページトップから現在地までの高さ
          footer = $('footer').height(); //フッターの高さ
      if ( height - position  < footer ){
        btn.addClass('is-absolute');
      } else {
        btn.removeClass('is-absolute');
      }
    });

    //スクロールしてトップへ戻る
    btn.on('click',function () {
      $('body,html').animate({
        scrollTop: 0
      });
    });
  });


});
