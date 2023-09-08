// ローディングアニメーション
// クッキー登録
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
// クッキーを取得
function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length === 2){
      return parts.pop().split(";").shift();
  }else{
      return "";
  }
}
// アニメーション再生
const loadingAnime = document.querySelector('.js-loading');
const body = document.body;
const scrollPosition = window.scrollY;
function playAnimation() {
  if (loadingAnime) {
    body.style.overflow = 'hidden'; // スクロールを禁止
    const openingTL = gsap.timeline();
    openingTL
    .fromTo('.js-loading-title',
      {clipPath:'inset(100% 0 0 0)',scale:1.1,autoAlpha:0},
      {clipPath:'inset(0% 0 0 0)',scale:1,autoAlpha:1,duration:2,ease:'power4.out',delay:1})
    .fromTo('.js-loading-img',
      {y:'100%'},
      {y:'0%',duration:2,ease:'power4.out',stagger:.1},'-=0.5')
    .to('.js-loading-title',{autoAlpha:0,duration:.8},'<')
    .fromTo('.js-loading-title',
      {autoAlpha:0,scale:0.9},
      {autoAlpha:1,scale:1,duration:1,ease:'power4.in',color:'#fff'},'-=.5')
    .fromTo('.js-loading',{autoAlpha:1},{autoAlpha:0,duration:1,ease:'power4.in'},'+=2')
    .call(enableScroll); // アニメーション終了時にスクロールを有効にする
  }
}
function enableScroll() {
  // スクロールを有効にする
  body.style.overflow = 'auto';
  // スクロール位置を元に戻す（任意の位置にスクロールさせない場合はこの行を削除できます）
  window.scrollTo(0, scrollPosition);
}
// オープニングアニメーションに関わる要素を非表示
function hideAnimation() {
  if (loadingAnime) {
    gsap.set('.js-loading',{autoAlpha:0})
  }
}
// まず最初に読み込まれる所
document.addEventListener("DOMContentLoaded", function() {
  const animationPlayed = getCookie("animationPlayed");
  if (animationPlayed) {
    hideAnimation();
  } else {
    playAnimation();
    setCookie("animationPlayed", "true", 1);
  }
});


// ページ遷移
window.addEventListener('load', function() {
  const body = document.querySelector('body');
  body.classList.add('is-active');
});


jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

// ヘッダー背景変更
$(window).on('scroll', function () {
  if ($('.js-mv').height() < $(this).scrollTop()) {
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
const slider1 = new Swiper ('.js-mv-slider', {
  loop: true,
  effect: "fade",
  speed: 3000,
  allowTouchMove: false,
  autoplay: {
    delay: 3000,
  },
});


  //Slider2
  const slider2 = new Swiper ('.js-campaign-slider', {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 24,
    freeModeSticky: true,
    speed: 2000,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        spaceBetween: 40,
      },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
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


  // モーダル
  $(function() {
    const open = $(".js-modal-open"),
      close = $(".js-modal-close"),
      modal = $(".js-modal"),
      modalImg = $(".js-modal-img img");

    //開くボタンをクリックしたら
    open.on("click", function () {
      // クリックされた画像を取得
      var clickedImgSrc = $(this).find("img").attr("src");
      // モーダル内の画像を設定
      modalImg.attr("src", clickedImgSrc);
      // モーダルを表示する
      modal.addClass("is-open");
    });

    //閉じるボタンをクリックしたらモーダルを閉じる
    close.add(modal).on("click", function () {
      modal.removeClass("is-open");
    });
  });


  // informationタブメニュー
  //任意のタブにURLからリンクするための設定
  function GethashID (hashIDName){
    if(hashIDName){
      $('.js-tab-button li').find('a').each(function() {
        var idName = $(this).attr('href');
        if(idName == hashIDName){
          var parentElm = $(this).parent();
          $('.js-tab-button li').removeClass("current");
          $(parentElm).addClass("current");
          //表示させるエリア設定
          $(".js-tab-content li").removeClass("is-active");
          $(hashIDName).addClass("is-active");
          // スクロール位置の調整
          var headerHeight = $('.header').outerHeight();
          var tabHeight = $('.information-tab').outerHeight();
          var scrollTo = $(hashIDName).offset().top - tabHeight - headerHeight - 40;
          $('html, body').animate({
            scrollTop: scrollTo
          }, 500);
        }
      });
    }
  }

  //タブをクリックしたら
  $('.js-tab-button a').on('click', function() {
    var idName = $(this).attr('href');
    GethashID (idName);
    return false;
  });

  // 上記の動きをページが読み込まれたらすぐに動かす
  $(window).on('load', function () {
      $('.js-tab-button li:first-of-type').addClass("active");
      $('.js-tab-content li:first-of-type').addClass("is-active");
    var hashName = location.hash;
    GethashID (hashName);
  });


  // アコーディオン
  $(function () {
    // タイトルをクリックすると
    $(".js-accordion-title").on("click", function () {
      // クリックした次の要素を開閉
      $(this).next().slideToggle(300);
      // タイトルにopenクラスを付け外しして+-を変更
      $(this).toggleClass("is-open", 300);
    });
  });


  // コンタクトフォーム
  $(function () {
    //バリデーション
    $("input[required], textarea[required]").on("blur", function () {
      let error;
      let value = $(this).val();
      if (value == "" || !value.match(/[^\s\t]/)) {
        error = true;
      }

      if (error) {
        //エラー時の処理
        $(this).addClass("error"); // エラー時にerrorクラスを追加
        $(".js-error").show(); // エラー時メッセージを表示
      } else {
        $(this).removeClass("error"); // エラーが解消されたらerrorクラスを削除
        $(".js-error").hide(); // エラーが解消されたらメッセージを削除
      }
    });

    // チェックボックスのバリデーション
    $("input[type=checkbox]").on("change", function () {
      if ($(this).prop("checked")) {
        $(this).removeClass("error");
      } else {
        $(this).addClass("error");
      }
    });

    // 送信ボタンクリック時の処理
    $(".button-submit__input").click(function (event) {
      let hasError = false;

      $("input[required], textarea[required]").each(function () {
        let value = $(this).val();
        if (value == "" || !value.match(/[^\s\t]/)) {
          hasError = true;
          $(this).addClass("error");
          $(".js-error").show();
        } else {
          $(this).removeClass("error");
        }
      });

      // チェックボックスのバリデーション
      if (!$("input[type=checkbox]").prop("checked")) {
        hasError = true;
        $("input[type=checkbox]").addClass("error");
      } else {
        $("input[type=checkbox]").removeClass("error");
      }

      if (hasError) {
        event.preventDefault(); // フォーム送信を中止
        // エラーがある場合にエラーメッセージ表示
        $(".js-error").show();
        // エラーがある場合にフォーカスを設定
        $("input[required].error, textarea[required].error").eq(0).focus();
      }
    });
  });


  // サイドバーアコーディオン
  $(function () {
    // 最初のコンテンツは表示
    $(".js-accordion-item:first-of-type .js-accordion-inner").css("display", "block");
    // 最初の矢印は開いた時の状態に
    $(".js-accordion-item:first-of-type .js-accordion-header").addClass("is-open");
    // タイトルをクリックすると
    $(".js-accordion-header").on("click", function () {
      // クリックした次の要素を開閉
      $(this).next().slideToggle(300);
      // タイトルにopenクラスを付け外しして矢印の向きを変更
      $(this).toggleClass("is-open", 300);
    });
  });

});
