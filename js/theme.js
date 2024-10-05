'严格使用';
var 主题={
  /**
*主题组件/功能列表
*注释掉或删除不必要的组件。
*某些组件具有依赖性(插件)。
*不要忘记从src/js/vendor/中删除依赖项并重新编译。
*/
  init:功能 () {
主题。stickyHeader();
主题。子菜单();
主题。offCanvas();
主题。同位素();
主题。onepageHeaderOffset();
主题。spyScroll();
主题。anchorSmoothScroll();
主题。svgInject();
主题。BackgroundImage();
主题。backgroundImageMobile();
主题。imageHoverOverlay();
主题。放松();
主题。scrollCue();
主题。swiperSlider();
主题。灯箱();
主题。普利尔();
主题。progressbar();
主题。装载机();
主题。pageProgress();
主题。Counterup();
主题。bsTooltips();
主题。bsPopovers();
主题。bsModal();
主题。iTooltip();
主题。表格();
主题。passVisibility();
主题。pricingSwitcher();
主题。textRotator();
主题。CodeSnippet();
  },
  /**
*标题粘滞
*启用页面滚动时导航栏的粘滞行为
*需要assets/js/vendor/headhesive.min.js
*/
stickyHeader：()=>{
    var navbar=文档。querySelector(".navbar");
    如果 (navbar==无效的)返回;
    var 选项={
      抵消:350,
      offsetSide:'顶部',
      类:{
        克隆:'navbar-clone已修复',
        粘贴:'导航杆',
        不粘:'navbar-unstick',
      },
      onStick:功能() {
        var navbarClonedClass=这.clonedElem.classList;
        如果 (navbarClonedClass。包含('透明')&&navbarClonedClass。包含('navbar-dark')) {
这.clonedElem.className=这.clonedElem.className.取代("navbar-dark","navbar-light");
        }
      }
    };
    var 旗帜=新的头胶('.navbar'，选项);
  },
  /**
*子菜单
*启用多级下拉列表
*/
子菜单：()=>{
    (功能($bs) {
      Const class_NAME='has-child-down-show';
$bs.下拉式列表.原型.切换=功能(_原始) {
          返回 功能() {
文件。querySelectorAll('.'+CLASS_NAME).foreach(功能(e) {
e。classList.移除(class_NAME);
              });
              让 DD=这._元素.最靠近的('.dropdown').parentNode.最靠近的('.dropdown');
              为 (；dd&&dd！==document；dd=dd。parentNode.最靠近的('.dropdown')) {
DD.classList.添加(class_NAME);
              }
              返回_original。呼叫(这);
          }
      }($bs.下拉式列表.原型.切换);
      document.querySelectorAll('.dropdown').forEach(function(dd) {
          dd.addEventListener('hide.bs.dropdown', function(e) {
              if (this.classList.contains(CLASS_NAME)) {
                  this.classList.remove(CLASS_NAME);
                  e.preventDefault();
              }
              e.stopPropagation();
          });
      });
    })(bootstrap);
  },
  /**
   * Offcanvas
   * Enables offcanvas-nav, closes offcanvas on anchor clicks, focuses on input in search offcanvas
   */
  offCanvas: () => {
    var navbar = document.querySelector(".navbar");
    if (navbar == null) return;
    const navOffCanvasBtn = document.querySelectorAll(".offcanvas-nav-btn");
    const navOffCanvas = document.querySelector('.navbar:not(.navbar-clone) .offcanvas-nav');
    const bsOffCanvas = new bootstrap.Offcanvas(navOffCanvas, {scroll: true});
    const scrollLink = document.querySelectorAll('.onepage .navbar li a.scroll');
    const searchOffcanvas = document.getElementById('offcanvas-search');
    navOffCanvasBtn.forEach(e => {
      e.addEventListener('click', event => {
        bsOffCanvas.show();
      })
    });
    scrollLink.forEach(e => {
      e.addEventListener('click', event => {
        bsOffCanvas.hide();
      })
    });
    if(searchOffcanvas != null) {
      searchOffcanvas.addEventListener('shown.bs.offcanvas', function () {
        document.getElementById("search-form").focus();
      });
    }
  },
  /**
   * Isotope
   * Enables isotope grid layout and filtering
   * Requires assets/js/vendor/isotope.pkgd.min.js
   * Requires assets/js/vendor/imagesloaded.pkgd.min.js
   */
  isotope: () => {
    var grids = document.querySelectorAll('.grid');
    if(grids != null) {
      grids.forEach(g => {
        var grid = g.querySelector('.isotope');
        var filtersElem = g.querySelector('.isotope-filter');
        var buttonGroups = g.querySelectorAll('.isotope-filter');
        var iso = new Isotope(grid, {
          itemSelector: '.item',
          layoutMode: 'masonry',
          masonry: {
            columnWidth: grid.offsetWidth / 12
          },
          percentPosition: true,
          transitionDuration: '0.7s'
        });
        imagesLoaded(grid).on("progress", function() {
          iso.layout({
            masonry: {
              columnWidth: grid.offsetWidth / 12
            }
          })
        }),
        window.addEventListener("resize", function() {
          iso.arrange({
            masonry: {
              columnWidth: grid.offsetWidth / 12
            }
          });
        }, true);
        if(filtersElem != null) {
          filtersElem.addEventListener('click', function(event) {
            if(!matchesSelector(event.target, '.filter-item')) {
              return;
            }
            var filterValue = event.target.getAttribute('data-filter');
            iso.arrange({
              filter: filterValue
            });
          });
          for(var i = 0, len = buttonGroups.length; i < len; i++) {
            var buttonGroup = buttonGroups[i];
            buttonGroup.addEventListener('click', function(event) {
              if(!matchesSelector(event.target, '.filter-item')) {
                return;
              }
              buttonGroup.querySelector('.active').classList.remove('active');
              event.target.classList.add('active');
            });
          }
        }
      });
    }
  },
  /**
   * Onepage Header Offset
   * Adds an offset value to anchor point equal to sticky header height on a onepage
   */
  onepageHeaderOffset: () => {
    var navbar = document.querySelector(".navbar");
    if (navbar == null) return;
    const header_height = document.querySelector(".navbar").offsetHeight;
    const shrinked_header_height = 75;
    const sections = document.querySelectorAll(".onepage section");
    sections.forEach(section => {
      section.style.paddingTop = shrinked_header_height + 'px';
      section.style.marginTop = '-' + shrinked_header_height + 'px';
    });
    const first_section = document.querySelector(".onepage section:first-of-type");
    if(first_section != null) {
      first_section.style.paddingTop = header_height + 'px';
      first_section.style.marginTop = '-' + header_height + 'px';
    }
  },
  /**
   * Spy Scroll
   * Highlights the active nav link while scrolling through sections
   */
  spyScroll: () => {
    let section = document.querySelectorAll('section[id]');
    let navLinks = document.querySelectorAll('.scroll');
    window.onscroll = () => {
      section.forEach(sec => {
        let top = window.scrollY; //returns the number of pixels that the document is currently scrolled vertically.
        let offset = sec.offsetTop - 0; //returns the distance of the outer border of the current element relative to the inner border of the top of the offsetParent, the closest positioned ancestor element
        let height = sec.offsetHeight; //returns the height of an element, including vertical padding and borders, as an integer
        let id = sec.getAttribute('id'); //gets the value of an attribute of an element
        if (top >= offset && top < offset + height) {
          navLinks.forEach(links => {
            links.classList.remove('active');
            document.querySelector(`a.scroll[href*=${id}]`).classList.add('active');
            //[att*=val] Represents an element with the att attribute whose value contains at least one instance of the substring "val". If "val" is the empty string then the selector does not represent anything.
          });
        }
      });
    }
  },
  /**
   * Anchor Smooth Scroll
   * Adds smooth scroll animation to links with .scroll class
   * Requires assets/js/vendor/smoothscroll.js
   */
  anchorSmoothScroll: () => {
    const links = document.querySelectorAll(".scroll");
    for(const link of links) {
      link.addEventListener("click", clickHandler);
    }
    function clickHandler(e) {
      e.preventDefault();
      this.blur();
      const href = this.getAttribute("href");
      const offsetTop = document.querySelector(href).offsetTop;
      scroll({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  },
  /**
   * SVGInject
   * Replaces an img element with an inline SVG so you can apply colors to your SVGs
   * Requires assets/js/vendor/svg-inject.min.js
   */
  svgInject: () => {
    SVGInject.setOptions({
      onFail: function(img, svg) {
        img.classList.remove('svg-inject');
      }
    });
    document.addEventListener('DOMContentLoaded', function() {
      SVGInject(document.querySelectorAll('img.svg-inject'), {
        useCache: true
      });
    });
  },
  /**
   * Background Image
   * Adds a background image link via data attribute "data-image-src"
   */
  backgroundImage: () => {
    var bg = document.querySelectorAll(".bg-image");
    for(var i = 0; i < bg.length; i++) {
      var url = bg[i].getAttribute('data-image-src');
      bg[i].style.backgroundImage = "url('" + url + "')";
    }
  },
  /**
   * Background Image Mobile
   * Adds .mobile class to background images on mobile devices for styling purposes
   */
  backgroundImageMobile: () => {
    var isMobile = (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i)) ? true : false;
    if(isMobile) {
      document.querySelectorAll(".image-wrapper").forEach(e => {
        e.classList.add("mobile")
      })
    }
  },
  /**
   * Image Hover Overlay
   * Adds span.bg inside .overlay for simpler markup and styling purposes
   */
  imageHoverOverlay: () => {
    var overlay = document.querySelectorAll('.overlay > a, .overlay > span');
    for(var i = 0; i < overlay.length; i++) {
      var overlay_bg = document.createElement('span');
      overlay_bg.className = "bg";
      overlay[i].appendChild(overlay_bg);
    }
  },
  /**
   * Rellax.js
   * Adds parallax animation to shapes and elements
   * Requires assets/js/vendor/rellax.min.js
   */
  rellax: () => {
    if(document.querySelector(".rellax") != null) {
      window.onload = function() {
        var rellax = new Rellax('.rellax', {
          speed: 2,
          center: true,
          breakpoints: [576, 992, 1201]
        });
        var projects_overflow = document.querySelectorAll('.projects-overflow');
        imagesLoaded(projects_overflow, function() {
          rellax.refresh();
        });
      }
    }
  },
  /**
   * scrollCue.js
   * Enables showing elements by scrolling
   * Requires assets/js/vendor/scrollCue.min.js
   */
  scrollCue: () => {
    scrollCue.init({
      interval: -400,
      duration: 700,
      percentage: 0.8
    });
    scrollCue.update();
  },
  /**
   * Swiper Slider
   * Enables carousels and sliders
   * Requires assets/js/vendor/swiper-bundle.min.js
   */
  swiperSlider: function() {
    var carousel = document.querySelectorAll('.swiper-container');
    for(var i = 0; i < carousel.length; i++) {
      var slider1 = carousel[i];
      slider1.classList.add('swiper-container-' + i);
      var controls = document.createElement('div');
      controls.className = "swiper-controls";
      var pagi = document.createElement('div');
      pagi.className = "swiper-pagination";
      var navi = document.createElement('div');
      navi.className = "swiper-navigation";
      var prev = document.createElement('div');
      prev.className = "swiper-button swiper-button-prev";
      var next = document.createElement('div');
      next.className = "swiper-button swiper-button-next";
      slider1.appendChild(controls);
      controls.appendChild(navi);
      navi.appendChild(prev);
      navi.appendChild(next);
      controls.appendChild(pagi);
      var sliderEffect = slider1.getAttribute('data-effect') ? slider1.getAttribute('data-effect') : 'slide';
      if (slider1.getAttribute('data-items-auto') === 'true') {
        var slidesPerViewInit = "auto";
        var breakpointsInit = null;
      } else {
        var sliderItems = slider1.getAttribute('data-items') ? slider1.getAttribute('data-items') : 3; // items in all devices
        var sliderItemsXs = slider1.getAttribute('data-items-xs') ? slider1.getAttribute('data-items-xs') : 1; // start - 575
        var sliderItemsSm = slider1.getAttribute('data-items-sm') ? slider1.getAttribute('data-items-sm') : Number(sliderItemsXs); // 576 - 767
        var sliderItemsMd = slider1.getAttribute('data-items-md') ? slider1.getAttribute('data-items-md') : Number(sliderItemsSm); // 768 - 991
        var sliderItemsLg = slider1.getAttribute('data-items-lg') ? slider1.getAttribute('data-items-lg') : Number(sliderItemsMd); // 992 - 1199
        var sliderItemsXl = slider1.getAttribute('data-items-xl') ? slider1.getAttribute('data-items-xl') : Number(sliderItemsLg); // 1200 - end
        var sliderItemsXxl = slider1.getAttribute('data-items-xxl') ? slider1.getAttribute('data-items-xxl') : Number(sliderItemsXl); // 1500 - end
        var slidesPerViewInit = sliderItems;
        var breakpointsInit = {
          0: {
            slidesPerView: Number(sliderItemsXs)
          },
          576: {
            slidesPerView: Number(sliderItemsSm)
          },
          768: {
            slidesPerView: Number(sliderItemsMd)
          },
          992: {
            slidesPerView: Number(sliderItemsLg)
          },
          1200: {
            slidesPerView: Number(sliderItemsXl)
          },
          1400: {
            slidesPerView: Number(sliderItemsXxl)
          }
        }
      }
      var sliderSpeed = slider1.getAttribute('data-speed') ? slider1.getAttribute('data-speed') : 500;
      var sliderAutoPlay = slider1.getAttribute('data-autoplay') !== 'false';
      var sliderAutoPlayTime = slider1.getAttribute('data-autoplaytime') ? slider1.getAttribute('data-autoplaytime') : 5000;
      var sliderAutoHeight = slider1.getAttribute('data-autoheight') === 'true';
      var sliderMargin = slider1.getAttribute('data-margin') ? slider1.getAttribute('data-margin') : 30;
      var sliderLoop = slider1.getAttribute('data-loop') === 'true';
      var sliderCentered = slider1.getAttribute('data-centered') === 'true';
      var swiper = slider1.querySelector('.swiper:not(.swiper-thumbs)');
      var swiperTh = slider1.querySelector('.swiper-thumbs');
      var sliderTh = new Swiper(swiperTh, {
        slidesPerView: 5,
        spaceBetween: 10,
        loop: false,
        threshold: 2,
        slideToClickedSlide: true
      });
      if (slider1.getAttribute('data-thumbs') === 'true') {
        var thumbsInit = sliderTh;
        var swiperMain = document.createElement('div');
        swiperMain.className = "swiper-main";
        swiper.parentNode.insertBefore(swiperMain, swiper);
        swiperMain.appendChild(swiper);
        slider1.removeChild(controls);
        swiperMain.appendChild(controls);
      } else {
        var thumbsInit = null;
      }
      var slider = new Swiper(swiper, {
        on: {
          beforeInit: function() {
            if(slider1.getAttribute('data-nav') !== 'true' && slider1.getAttribute('data-dots') !== 'true') {
              controls.remove();
            }
            if(slider1.getAttribute('data-dots') !== 'true') {
              pagi.remove();
            }
            if(slider1.getAttribute('data-nav') !== 'true') {
              navi.remove();
            }
          },
          init: function() {
            if(slider1.getAttribute('data-autoplay') !== 'true') {
              this.autoplay.stop();
            }
            this.update();
          }
        },
        autoplay: {
          delay: sliderAutoPlayTime,
          disableOnInteraction: false
        },
        speed: parseInt(sliderSpeed),
        slidesPerView: slidesPerViewInit,
        loop: sliderLoop,
        centeredSlides: sliderCentered,
        spaceBetween: Number(sliderMargin),
        effect: sliderEffect,
        autoHeight: sliderAutoHeight,
        grabCursor: true,
        resizeObserver: false,
        breakpoints: breakpointsInit,
        pagination: {
          el: carousel[i].querySelector('.swiper-pagination'),
          clickable: true
        },
        navigation: {
          prevEl: slider1.querySelector('.swiper-button-prev'),
          nextEl: slider1.querySelector('.swiper-button-next'),
        },
        thumbs: {
          swiper: thumbsInit,
        },
      });
    }
  },
  /**
   * GLightbox
   * Enables lightbox functionality
   * Requires assets/js/vendor/glightbox.js
   */
  lightbox: () => {
    const lightbox = GLightbox({
      selector: '*[data-glightbox]',
      touchNavigation: true,
      loop: false,
      zoomable: false,
      autoplayVideos: true,
      moreLength: 0,
      slideExtraAttributes: {
        poster: ''
      },
      plyr: {
        css: '',
        js: '',
        config: {
          ratio: '',
          fullscreen: {
            enabled: false,
            iosNative: false
          },
          youtube: {
            noCookie: true,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3
          },
          vimeo: {
            byline: false,
            portrait: false,
            title: false,
            transparent: false
          }
        }
      },
    });
  },
  /**
   * Plyr
   * Enables media player
   * Requires assets/js/vendor/plyr.js
   */
  plyr: () => {
    var players = Plyr.setup('.player', {
      loadSprite: true,
    });
  },
  /**
   * Progressbar
   * Enables animated progressbars
   * Requires assets/js/vendor/progressbar.min.js
   * Requires assets/js/vendor/noframework.waypoints.min.js
   */
  progressBar: () => {
    const pline = document.querySelectorAll(".progressbar.line");
    const pcircle = document.querySelectorAll(".progressbar.semi-circle");
    pline.forEach(e => {
      var line = new ProgressBar.Line(e, {
        strokeWidth: 6,
        trailWidth: 6,
        duration: 3000,
        easing: 'easeInOut',
        text: {
          style: {
            color: 'inherit',
            position: 'absolute',
            right: '0',
            top: '-30px',
            padding: 0,
            margin: 0,
            transform: null
          },
          autoStyleContainer: false
        },
        step: (state, line) => {
          line.setText(Math.round(line.value() * 100) + ' %');
        }
      });
      var value = e.getAttribute('data-value') / 100;
      new Waypoint({
        element: e,
        handler: function() {
          line.animate(value);
        },
        offset: 'bottom-in-view',
      })
    });
    pcircle.forEach(e => {
      var circle = new ProgressBar.SemiCircle(e, {
        strokeWidth: 6,
        trailWidth: 6,
        duration: 2000,
        easing: 'easeInOut',
        step: (state, circle) => {
          circle.setText(Math.round(circle.value() * 100));
        }
      });
      var value = e.getAttribute('data-value') / 100;
      new Waypoint({
        element: e,
        handler: function() {
          circle.animate(value);
        },
        offset: 'bottom-in-view',
      })
    });
  },
  /**
   * Loader
   * 
   */
  loader: () => {
    var preloader = document.querySelector('.page-loader');
    if(preloader != null) {
      document.body.onload = function(){
        setTimeout(function() {
          if( !preloader.classList.contains('done') )
          {
            preloader.classList.add('done');
          }
        }, 1000)
      }
    }
  },
  /**
   * Page Progress
   * Shows page progress on the bottom right corner of pages
   */
  pageProgress: () => {
    var progressWrap = document.querySelector('.progress-wrap');
    var progressPath = document.querySelector('.progress-wrap path');
    if( progressPath && progressWrap) {
      var pathLength = progressPath.getTotalLength();
      var offset = 50;
      if(progressWrap != null) {
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        window.addEventListener("scroll", function(event) {
          var scroll = document.body.scrollTop || document.documentElement.scrollTop;
          var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          var progress = pathLength - (scroll * pathLength / height);
          progressPath.style.strokeDashoffset = progress;
          var scrollElementPos = document.body.scrollTop || document.documentElement.scrollTop;
          if(scrollElementPos >= offset) {
            progressWrap.classList.add("active-progress")
          } else {
            progressWrap.classList.remove("active-progress")
          }
        });
        progressWrap.addEventListener('click', function(e) {
          e.preventDefault();
          window.scroll({
            top: 0, 
            left: 0,
            behavior: 'smooth'
          });
        });
      }
    }

  },
  /**
   * Counter Up
   * Counts up to a targeted number when the number becomes visible
   * Requires assets/js/vendor/counterup.min.js
   * Requires assets/js/vendor/noframework.waypoints.min.js
   */
  counterUp: () => {
    var counterUp = window.counterUp["default"];
    const counters = document.querySelectorAll(".counter");
    counters.forEach(el => {
      new Waypoint({
        element: el,
        handler: function() {
          counterUp(el, {
            duration: 1000,
            delay: 50
          })
          this.destroy()
        },
        offset: 'bottom-in-view',
      })
    });
  },
  /**
   * Bootstrap Tooltips
   * Enables Bootstrap tooltips
   * Requires Poppers library
   */
  bsTooltips: () => {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: 'hover'
      })
    });
    var tooltipTriggerWhite = [].slice.call(document.querySelectorAll('[data-bs-toggle="white-tooltip"]'))
    var tooltipWhite = tooltipTriggerWhite.map(function(tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl, {
        customClass: 'white-tooltip',
        trigger: 'hover',
        placement: 'left'
      })
    })
  },
  /**
   * Bootstrap Popovers
   * Enables Bootstrap popovers
   * Requires Poppers library
   */
  bsPopovers: () => {
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function(popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    })
  },
  /**
   * Bootstrap Modal
   * Enables Bootstrap modal popup
   */
  bsModal: () => {
    if(document.querySelector(".modal-popup") != null) {
      var myModalPopup = new bootstrap.Modal(document.querySelector('.modal-popup'));
      setTimeout(function() {
        myModalPopup.show();
      }, 200);
    }
    // Fixes jumping of page progress caused by modal
    var innerWidth=窗口。innerWidth;
    var clientWidth=文档。身体.clientWidth;
    var scrollSize=innerWidth-clientWidth；
    var myModalEl=文档。querySelectorAll('.modal');
    var navbarFixed=文档。querySelector('.navbar.fixed');
    var pageProgress=文档。querySelector('.progress-wrap');
    功能 setPadding() {
      如果(navbarFixed！=无效的) {
navbarFixed。风格.paddingRight=scrollSize+'px';
      }
      如果(pageProgress！=无效的) {
pageProgress。风格.marginRight=scrollSize+'px';
      }
    }
    功能 removePadding() {
      如果(navbarFixed！=无效的) {
navbarFixed。风格.paddingRight='';
      }
      如果(pageProgress！=无效的) {
pageProgress。风格.marginRight='';
      }
    }
myModelel。foreach(myModalEl=>{
myModelel。addEventListener('show.bs.modal',功能(e) {
        setPadding();
      })
myModelel。addEventListener('hidden.bs.modal',功能(e) {
        removePadding();
      })
    });
  },
  /**
*iTooltip
*启用图像悬停文档/元素/hover.html的自定义工具提示样式
*需要assets/js/vendor/itooltip.min.js
*/
iTooltip：()=>{
    var 工具提示=新的iTooltip('.it工具提示')
工具提示。init({
      className:'ITooltip-inner',
      indentX:15,
      indentY:15,
      positionX:'右',
      有位置的:'底部'
    })
  },
  /**
*提交表单验证和联系表单
*引导验证-仅当窗体具有类“.actact-form”且已验证并显示成功/失败消息时才发送消息
*/
表格：()=>{
    (功能() {
      "使用严格";
窗户。addEventListener("加载",功能() {
        var 表格=文档。querySelectorAll(".needs-validation");
        var inputRecaptcha=文档。querySelector("输入[data-raptcha]");
窗户。verifyRecaptchaCallback=功能 (响应) {
inputRecaptcha。价值=响应；
inputRecaptcha。dispatchEvent(新的事件("更改"));
        }
窗户。expiredRecaptchaCallback=功能 () {
          var inputRecaptcha=文档。querySelector("输入[data-raptcha]");
inputRecaptcha。价值=“”;
inputRecaptcha。dispatchEvent(新的事件("更改"));
        }
        var 验证=阵列。原型.过滤器.呼叫(表格，功能(形式) {
形式。addEventListener("提交",功能(事件) {
            如果(形式。checkValidity()===假的) {
事件。preventDefault();
事件。stopPropagation();
            }
形式。classList.添加("was-validated");
            如果(形式。checkValidity()===正确) {
事件。preventDefault();
形式。classList.移除("was-validated");
              //仅当窗体有类时发送消息。contact-form
              var isContactForm=表格。classList.包含('contact-form');
              如果(isContactForm) {
                var 数据=新的FormData(形式);
                var alertClass='警报-危险';
                取来("assets/php/contact.php",{
                  方法:"发布",
                  身体：数据
                }).然后((数据)=>{
                  if(data.ok) {
                    alertClass = 'alert-success';
                  }
                  return data.text();
                }).then((txt) => {
                  var alertBox = '<div class="alert ' + alertClass + ' alert-dismissible fade show"><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' + txt + '</div>';
                  if(alertClass && txt) {
                    form.querySelector(".messages").insertAdjacentHTML('beforeend', alertBox);
                    form.reset();
                    grecaptcha.reset();
                  }
                }).catch((err) => {
                  console.log(err);
                });
              }
            }
          }, false);
        });
      }, false);
    })();
  },
  /**
   * Password Visibility Toggle
   * Toggles password visibility in password input
   */
  passVisibility: () => {
    let pass = document.querySelectorAll('.password-field');
    for (let i = 0; i < pass.length; i++) {
      let passInput = pass[i].querySelector('.form-control');
      let passToggle = pass[i].querySelector('.password-toggle > i');
      passToggle.addEventListener('click', (e) => {
        if (passInput.type === "password") {
          passInput.type = "text";
          passToggle.classList.remove('uil-eye');
          passToggle.classList.add('uil-eye-slash');
        } else {
          passInput.type = "password";
          passToggle.classList.remove('uil-eye-slash'); 
          passToggle.classList.add('uil-eye');
        } 
      }, false);
    }
  },
  /**
   * Pricing Switcher
   * Enables monthly/yearly switcher seen on pricing tables
   */
    */'use strict';
var theme = {
  /**
   * Theme's components/functions list
   * Comment out or delete the unnecessary component.
   * Some components have dependencies (plugins).
   * Do not forget to remove dependency from src/js/vendor/ and recompile.
   */
  init: function () {
    theme.stickyHeader();
    theme.subMenu();
    theme.offCanvas();
    theme.isotope();
    theme.onepageHeaderOffset();
    theme.spyScroll();
    theme.anchorSmoothScroll();
    theme.svgInject();
    theme.backgroundImage();
    theme.backgroundImageMobile();
    theme.imageHoverOverlay();
    theme.rellax();
    theme.scrollCue();
    theme.swiperSlider();
    theme.lightbox();
    theme.plyr();
    theme.progressBar();
    theme.loader();
    theme.pageProgress();
    theme.counterUp();
    theme.bsTooltips();
    theme.bsPopovers();
    theme.bsModal();
    theme.iTooltip();
    theme.forms();
    theme.passVisibility();
    theme.pricingSwitcher();
    theme.textRotator();
    theme.codeSnippet();
  },
  /**
   * Sticky Header
   * Enables sticky behavior on navbar on page scroll
   * Requires assets/js/vendor/headhesive.min.js
  */
  stickyHeader: () => {
    var navbar = document.querySelector(".navbar");
    if (navbar == null) return;
    var options = {
      offset: 350,
      offsetSide: 'top',
      classes: {
        clone: 'navbar-clone fixed',
        stick: 'navbar-stick',
        unstick: 'navbar-unstick',
      },
      onStick: function() {
        var navbarClonedClass = this.clonedElem.classList;
        if (navbarClonedClass.contains('transparent') && navbarClonedClass.contains('navbar-dark')) {
          this.clonedElem.className = this.clonedElem.className.replace("navbar-dark","navbar-light");
        }
      }
    };
    var banner = new Headhesive('.navbar', options);
  },
  /**
   * Sub Menus
   * Enables multilevel dropdown
   */
  subMenu: () => {
    (function($bs) {
      const CLASS_NAME = 'has-child-dropdown-show';
      $bs.Dropdown.prototype.toggle = function(_original) {
          return function() {
              document.querySelectorAll('.' + CLASS_NAME).forEach(function(e) {
                  e.classList.remove(CLASS_NAME);
              });
              let dd = this._element.closest('.dropdown').parentNode.closest('.dropdown');
              for (; dd && dd !== document; dd = dd.parentNode.closest('.dropdown')) {
                  dd.classList.add(CLASS_NAME);
              }
              return _original.call(this);
          }
      }($bs.Dropdown.prototype.toggle);
      document.querySelectorAll('.dropdown').forEach(function(dd) {
          dd.addEventListener('hide.bs.dropdown', function(e) {
              if (this.classList.contains(CLASS_NAME)) {
                  this.classList.remove(CLASS_NAME);
                  e.preventDefault();
              }
              e.stopPropagation();
          });
      });
    })(bootstrap);
  },
  /**
   * Offcanvas
   * Enables offcanvas-nav, closes offcanvas on anchor clicks, focuses on input in search offcanvas
   */
  offCanvas: () => {
    var navbar = document.querySelector(".navbar");
    if (navbar == null) return;
    const navOffCanvasBtn = document.querySelectorAll(".offcanvas-nav-btn");
    const navOffCanvas = document.querySelector('.navbar:not(.navbar-clone) .offcanvas-nav');
    const bsOffCanvas = new bootstrap.Offcanvas(navOffCanvas, {scroll: true});
    const scrollLink = document.querySelectorAll('.onepage .navbar li a.scroll');
    const searchOffcanvas = document.getElementById('offcanvas-search');
    navOffCanvasBtn.forEach(e => {
      e.addEventListener('click', event => {
        bsOffCanvas.show();
      })
    });
    scrollLink.forEach(e => {
      e.addEventListener('click', event => {
        bsOffCanvas.hide();
      })
    });
    if(searchOffcanvas != null) {
      searchOffcanvas.addEventListener('shown.bs.offcanvas', function () {
        document.getElementById("search-form").focus();
      });
    }
  },
  /**
   * Isotope
   * Enables isotope grid layout and filtering
   * Requires assets/js/vendor/isotope.pkgd.min.js
   * Requires assets/js/vendor/imagesloaded.pkgd.min.js
   */
  isotope: () => {
    var grids = document.querySelectorAll('.grid');
    if(grids != null) {
      grids.forEach(g => {
        var grid = g.querySelector('.isotope');
        var filtersElem = g.querySelector('.isotope-filter');
        var buttonGroups = g.querySelectorAll('.同位素过滤器');
        var ISO=新的同位素(网格，{
          ItemSelector:'.item',
          layoutMode:'砌体',
          砖石建筑:{
            columnWidth：网格。offsetWidth/12
          },
          percentPosition:正确,
          transitionDuration:'0.7s'
        });
        imagesLoaded(网格).在……之上("进度",功能() {
ISO.布局({
            砖石建筑:{
              columnWidth：网格。offsetWidth/12
            }
          })
        }),
窗户。addEventListener("调整大小",功能() {
ISO.安排({
            砖石建筑:{
              columnWidth：网格。offsetWidth/12
            }
          });
        },正确);
        如果(filtersElem！=无效的) {
filtersElem。addEventListener('单击',功能(事件) {
            如果(!matchesSelector(事件。目标,'.filter-item')) {
              返回;
            }
            var filterValue=事件。目标.getattribute('数据筛选器');
ISO.安排({
              过滤器：filterValue
            });
          });
          为(var 我=0,Len=buttonGroups。长度；i<len；i++) {
            var buttonGroup=buttonGroups[我];
buttonGroup。addEventListener('单击',功能(事件) {
              如果(!matchesSelector(事件。目标,'.filter-item')) {
                返回;
              }
buttonGroup。querySelector('.active').classList.移除('活动');
事件。目标.classList。添加('活动');
pricingSwitcher：()=>{
    如果(文件。querySelector(".定价交换机")!=无效的) {
      Const 包装器=文档。querySelectorAll(".定价包装");
包装器。foreach(包=>{
        Const 切换器=包装。querySelector(".定价转换程序");
        Const 转换开关=包装。querySelectorAll(".定价转换程序");
        Const 价格=包装。querySelectorAll(".price");
转换开关。addEventListener("单击",(e)=>{
切换器。foreach(s=>{
s。classList.切换("定价转换程序激活");
          });
价格。foreach(p=>{
p。classList.移除("价格隐藏");
p。classList.切换("价格展示");
p。classList.切换("隐藏价格");
          });
        });
      });
    }
  },
  /**
*ReplaceMe.js
*启用文本旋转器
*需要assets/js/vendor/replaceme.min.js
*/
textRotator：()  textRotator: {
    if(document.querySelector(".rotator-zoom") != null) {
      var replace = new ReplaceMe(document.querySelector('.rotator-zoom'), {
        animation: 'animate__animated animate__zoomIn',
        speed: 2500,
        separator: ',',
        clickChange: false,
        loopCount: 'infinite'
      });
    }
    if(document.querySelector(".rotator-fade") != null) {
      var replace = new ReplaceMe(document.querySelector('.rotator-fade'), {
        animation: 'animate__animated animate__fadeInDown',
        speed: 2500,
        separator: ',',
        clickChange: false,
        loopCount: 'infinite'
      });
    }
  },
  /**
   * Clipboard.js
   * Enables clipboard on docs
   * Requires assets/js/vendor/clipboard.min.js
   */
  codeSnippet: () => {
    var btnHtml = '<button type="button" class="btn btn-sm btn-white rounded-pill btn-clipboard">Copy</button>'
    document.querySelectorAll('.code-wrapper-inner').forEach(function(element) {
      element.insertAdjacentHTML('beforebegin', btnHtml)
    })
    var clipboard = new ClipboardJS('.btn-clipboard', {
      target: function(trigger) {'use strict';
var theme = {
  /**
   * Theme's components/functions list
   * Comment out or delete the unnecessary component.
   * Some components have dependencies (plugins).
   * Do not forget to remove dependency from src/js/vendor/ and recompile.
   */
  init: function () {
    theme.stickyHeader();
    theme.subMenu();
    theme.offCanvas();
    theme.isotope();
    theme.onepageHeaderOffset();
    theme.spyScroll();
    theme.anchorSmoothScroll();
    theme.svgInject();
    theme.backgroundImage();
    theme.backgroundImageMobile();
    theme.imageHoverOverlay();
    theme.rellax();
    theme.scrollCue();
    theme.swiperSlider();
    theme.lightbox();
    theme.plyr();
    theme.progressBar();
    theme.loader();
    theme.pageProgress();
    theme.counterUp();
    theme.bsTooltips();
    theme.bsPopovers();
    theme.bsModal();
    theme.iTooltip();
    theme.forms();
    theme.passVisibility();
    theme.pricingSwitcher();
    theme.textRotator();
    theme.codeSnippet();
  },
  /**
   * Sticky Header
   * Enables sticky behavior on navbar on page scroll
   * Requires assets/js/vendor/headhesive.min.js
  */
  stickyHeader: () => {
    var navbar = document.querySelector(".navbar");
    if (navbar == null) return;
    var options = {
      offset: 350,
      offsetSide: 'top',
      classes: {
        clone: 'navbar-clone fixed',
        stick: 'navbar-stick',
        unstick: 'navbar-unstick',
      },
      onStick: function() {
        var navbarClonedClass = this.clonedElem.classList;
        if (navbarClonedClass.contains('transparent') && navbarClonedClass.contains('navbar-dark')) {
          this.clonedElem.className = this.clonedElem.className.replace("navbar-dark","navbar-light");
        }
      }
    };
    var banner = new Headhesive('.navbar', options);
  },
  /**
   * Sub Menus
   * Enables multilevel dropdown
   */
  subMenu: () => {
    (function($bs) {
      const CLASS_NAME = 'has-child-dropdown-show';
      $bs.Dropdown.prototype.toggle = function(_original) {
          return function() {
              document.querySelectorAll('.' + CLASS_NAME).forEach(function(e) {
                  e.classList.remove(CLASS_NAME);
              });
              let dd = this._element.closest('.dropdown').parentNode.closest('.dropdown');
              for (; dd && dd !== document; dd = dd.parentNode.closest('.dropdown')) {
                  dd.classList.add(CLASS_NAME);
              }
              return _original.call(this);
          }
      }($bs.Dropdown.prototype.toggle);
      document.querySelectorAll('.dropdown').forEach(function(dd) {
          dd.addEventListener('hide.bs.dropdown', function(e) {
              if (this.classList.contains(CLASS_NAME)) {
                  this.classList.remove(CLASS_NAME);
                  e.preventDefault();
              }
              e.stopPropagation();
          });
      });
    })(bootstrap);
  },
  /**
   * Offcanvas
   * Enables offcanvas-nav, closes offcanvas on anchor clicks, focuses on input in search offcanvas
   */
  offCanvas: () => {
    var navbar = document.querySelector(".navbar");
    if (navbar == null) return;
    const navOffCanvasBtn = document.querySelectorAll(".offcanvas-nav-btn");
    const navOffCanvas = document.querySelector('.navbar:not(.navbar-clone) .offcanvas-nav');
    const bsOffCanvas = new bootstrap.Offcanvas(navOffCanvas, {scroll: true});
    const scrollLink = document.querySelectorAll('.onepage .navbar li a.scroll');
    const searchOffcanvas = document.getElementById('offcanvas-search');
    navOffCanvasBtn.forEach(e => {
      e.addEventListener('click', event => {
        bsOffCanvas.show();
      })
    });
    scrollLink.forEach(e => {
      e.addEventListener('click', event => {
        bsOffCanvas.hide();
      })
    });
    if(searchOffcanvas != null) {
      searchOffcanvas.addEventListener('shown.bs.offcanvas', function () {
        document.getElementById("search-form").focus();
      });
    }
  },
  /**
   * Isotope
   * Enables isotope grid layout and filtering
   * Requires assets/js/vendor/isotope.pkgd.min.js
   * Requires assets/js/vendor/imagesloaded.pkgd.min.js
   */
  isotope: () => {
    var grids = document.querySelectorAll('.grid');
    if(grids != null) {
      grids.forEach(g => {
        var grid = g.querySelector('.isotope');
        var filtersElem = g.querySelector('.isotope-filter');
        var buttonGroups = g.querySelectorAll('.isotope-filter');
        var iso = new Isotope(grid, {
          itemSelector: '.item',
          layoutMode: 'masonry',
          masonry: {'use strict';
var theme = {
  /**
   * Theme's components/functions list
   * Comment out or delete the unnecessary component.
   * Some components have dependencies (plugins).
   * Do not forget to remove dependency from src/js/vendor/ and recompile.
   */
  init: function () {
    theme.stickyHeader();
    theme.subMenu();
    theme.offCanvas();
    theme.isotope();
    theme.onepageHeaderOffset();
    theme.spyScroll();
    theme.anchorSmoothScroll();
    theme.svgInject();
    theme.backgroundImage();
    theme.backgroundImageMobile();
    theme.imageHoverOverlay();
    theme.rellax();
    theme.scrollCue();
    theme.swiperSlider();
    theme.lightbox();
    theme.plyr();
    theme.progressBar();
    theme.loader();
    theme.pageProgress();
    theme.counterUp();
    theme.bsTooltips();
    theme.bsPopovers();
    theme.bsModal();
    theme.iTooltip();
    theme.forms();
    theme.passVisibility();
    theme.pricingSwitcher();
    theme.textRotator();
    theme.codeSnippet();
  },
  /**
   * Sticky Header
   * Enables sticky behavior on navbar on page scroll
   * Requires assets/js/vendor/headhesive.min.js
  */
  stickyHeader: () => {'use strict';
var theme = {
  /**
   * Theme's components/functions list
   * Comment out or delete the unnecessary component.
   * Some components have dependencies (plugins).
   * Do not forget to remove dependency from src/js/vendor/ and recompile.
   */
  init: function () {
    theme.stickyHeader();
    theme.subMenu();
    theme.offCanvas();
    theme.isotope();
    theme.onepageHeaderOffset();
    theme.spyScroll();
    theme.anchorSmoothScroll();
    theme.svgInject();
    theme.backgroundImage();
    theme.backgroundImageMobile();
    theme.imageHoverOverlay();
    theme.rellax();
    theme.scrollCue();
    theme.swiperSlider();
    theme.lightbox();
    theme.plyr();
    theme.progressBar();
    theme.loader();
    theme.pageProgress();
    theme.counterUp();
    theme.bsTooltips();
    theme.bsPopovers();
    theme.bsModal();
    theme.iTooltip();
    theme.forms();
    theme.passVisibility();
    theme.pricingSwitcher();
    theme.textRotator();
    theme.codeSnippet();
  },
  /**
   * Sticky Header
   * Enables sticky behavior on navbar on page scroll
   * Requires assets/js/vendor/headhesive.min.js
  */
  stickyHeader: () => {
    var navbar = document.querySelector(".navbar");
    if (navbar == null) return;
    var options = {
      offset: 350,
      offsetSide: 'top',
      classes: {
        clone: 'navbar-clone fixed',
        stick: 'navbar-stick',
        unstick: 'navbar-unstick',
      },
      onStick: function() {
        var navbarClonedClass = this.clonedElem.classList;
        if (navbarClonedClass.contains('transparent') && navbarClonedClass.contains('navbar-dark')) {
          this.clonedElem.className = this.clonedElem.className.replace("navbar-dark","navbar-light");
        }
      }
    };
    var banner = new Headhesive('.navbar', options);
  },
  /**
   * Sub Menus
   * Enables multilevel dropdown
   */
  subMenu: () => {
    (function($bs) {
      const CLASS_NAME = 'has-child-dropdown-show';
      $bs.Dropdown.prototype.toggle = function(_original) {
          return function() {
              document.querySelectorAll('.' + CLASS_NAME).forEach(function(e) {
                  e.classList.remove(CLASS_NAME);
              });
              let dd = this._element.closest('.dropdown').parentNode.closest('.dropdown');
              for (; dd && dd !== document; dd = dd.parentNode.closest('.dropdown')) {
                  dd.classList.add(CLASS_NAME);
              }
              return _original.call(this);
          }
      }($bs.Dropdown.prototype.toggle);
      document.querySelectorAll('.dropdown').forEach(function(dd) {
          dd.addEventListener('hide.bs.dropdown', function(e) {
              if (this.classList.contains(CLASS_NAME)) {
                  this.classList.remove(CLASS_NAME);
                  e.preventDefault();
              }
              e.stopPropagation();
          });
      });
    })(bootstrap);
  },
  /**
   * Offcanvas
   * Enables offcanvas-nav, closes offcanvas on anchor clicks, focuses on input in search offcanvas
   */
  offCanvas: () => {
    var navbar = document.querySelector(".navbar");
    if (navbar == null) return;
    const navOffCanvasBtn = document.querySelectorAll(".offcanvas-nav-btn");
    const navOffCanvas = document.querySelector('.navbar:not(.navbar-clone) .offcanvas-nav');
    const bsOffCanvas = new bootstrap.Offcanvas(navOffCanvas, {scroll: true});
    const scrollLink = document.querySelectorAll('.onepage .navbar li a.scroll');
    const searchOffcanvas = document.getElementById('offcanvas-search');
    navOffCanvasBtn.forEach(e => {
      e.addEventListener('click', event => {
        bsOffCanvas.show();
      })
    });
    scrollLink.forEach(e => {
      e.addEventListener('click', event => {
        bsOffCanvas.hide();
      })
    });
    if(searchOffcanvas != null) {
      searchOffcanvas.addEventListener('shown.bs.offcanvas', function () {
        document.getElementById("search-form").focus();
      });
    }
  },
  /**
   * Isotope
   * Enables isotope grid layout and filtering
   * Requires assets/js/vendor/isotope.pkgd.min.js
   * Requires assets/js/vendor/imagesloaded.pkgd.min.js
   */
  isotope: () => {
    var grids = document.querySelectorAll('.grid');
    if(grids != null) {
      grids.forEach(g => {
        var grid = g.querySelector('.isotope');
        var filtersElem = g.querySelector('.isotope-filter');
        var buttonGroups = g.querySelectorAll('.isotope-filter');
        var iso = new Isotope(grid, {
          itemSelector: '.item',
          layoutMode: 'masonry',
          masonry: {
            columnWidth: grid.offsetWidth / 12
          },
          percentPosition: true,
          transitionDuration: '0.7s'
        });
        imagesLoaded(grid).on("progress", function() {
          iso.layout({
            masonry: {
              columnWidth: grid.offsetWidth / 12
            }
          })
        }),
        window.addEventListener("resize", function() {
          iso.arrange({
            masonry: {
              columnWidth: grid.offsetWidth / 12
            }
          });
        }, true);
        if(filtersElem != null) {
          filtersElem.addEventListener('click', function(event) {
            if(!matchesSelector(event.target, '.filter-item')) {
              return;
            }
            var filterValue = event.target.getAttribute('data-filter');
            iso.arrange({
              filter: filterValue
            });
          });
          for(var i = 0, len = buttonGroups.length; i < len; i++) {
            var buttonGroup = buttonGroups[i];
            buttonGroup.addEventListener('click', function(event) {
              if(!matchesSelector(event.target, '.filter-item')) {
                return;
              }
              buttonGroup.querySelector('.active').classList.remove('active');
              event.target.classList.add('active');
    var navbar = document.querySelector(".navbar");
    if (navbar == null) return;
    var options = {
      offset: 350,
      offsetSide: 'top',
      classes: {
        clone: 'navbar-clone fixed',
        stick: 'navbar-stick',
        unstick: 'navbar-unstick',
      },
      onStick: function() {
        var navbarClonedClass = this.clonedElem.classList;
        if (navbarClonedClass.contains('transparent') && navbarClonedClass.contains('navbar-dark')) {
          this.clonedElem.className = this.clonedElem.className.replace("navbar-dark","navbar-light");
        }
      }
    };
    var banner = new Headhesive('.navbar', options);
  },
  /**
   * Sub Menus
   * Enables multilevel dropdown
   */
  subMenu: () => {
    (function($bs) {
      const CLASS_NAME = 'has-child-dropdown-show';
      $bs.Dropdown.prototype.toggle = function(_original) {
          return function() {
              document.querySelectorAll('.' + CLASS_NAME).forEach(function(e) {
                  e.classList.remove(CLASS_NAME);
              });
              let dd = this._element.closest('.dropdown').parentNode.closest('.dropdown');
              for (; dd && dd !== document; dd = dd.parentNode.closest('.dropdown')) {
                  dd.classList.add(CLASS_NAME);
              }
              return _original.call(this);
          }
      }($bs.Dropdown.prototype.toggle);
      document.querySelectorAll('.dropdown').forEach(function(dd) {
          dd.addEventListener('hide.bs.dropdown', function(e) {
              if (this.classList.contains(CLASS_NAME)) {
                  this.classList.remove(CLASS_NAME);
                  e.preventDefault();
              }
              e.stopPropagation();
          });
      });
    })(bootstrap);
  },
  /**
   * Offcanvas
   * Enables offcanvas-nav, closes offcanvas on anchor clicks, focuses on input in search offcanvas
   */
  offCanvas: () => {
    var navbar = document.querySelector(".navbar");
    if (navbar == null) return;
    const navOffCanvasBtn = document.querySelectorAll(".offcanvas-nav-btn");
    const navOffCanvas = document.querySelector('.navbar:not(.navbar-clone) .offcanvas-nav');
    const bsOffCanvas = new bootstrap.Offcanvas(navOffCanvas, {scroll: true});
    const scrollLink = document.querySelectorAll('.onepage .navbar li a.scroll');
    const searchOffcanvas = document.getElementById('offcanvas-search');
    navOffCanvasBtn.forEach(e => {
      e.addEventListener('click', event => {
        bsOffCanvas.show();
      })
    });
    scrollLink.forEach(e => {
      e.addEventListener('click', event => {
        bsOffCanvas.hide();
      })
    });
    if(searchOffcanvas != null) {
      searchOffcanvas.addEventListener('shown.bs.offcanvas', function () {
        document.getElementById("search-form").focus();
      });
    }
  },
  /**
   * Isotope
   * Enables isotope grid layout and filtering
   * Requires assets/js/vendor/isotope.pkgd.min.js
   * Requires assets/js/vendor/imagesloaded.pkgd.min.js
   */
  isotope: () => {
    var grids = document.querySelectorAll('.grid');
    if(grids != null) {
      grids.forEach(g => {
        var grid = g.querySelector('.isotope');
        var filtersElem = g.querySelector('.isotope-filter');
        var buttonGroups = g.querySelectorAll('.isotope-filter');
        var iso = new Isotope(grid, {
          itemSelector: '.item',
          layoutMode: 'masonry',
          masonry: {
            columnWidth: grid.offsetWidth / 12
          },
          percentPosition: true,
          transitionDuration: '0.7s'
        });
        imagesLoaded(grid).on("progress", function() {
          iso.layout({
            masonry: {
              columnWidth: grid.offsetWidth / 12
            }
          })
        }),
窗户。addEventListener("调整大小",功能() {
ISO.安排({
            砖石建筑:{
              columnWidth：网格。offsetWidth/12
            }
          });
        },正确);
        如果(filtersElem！=无效的) {
filtersElem。addEventListener('单击'filtersElem.功能(事件) {
            如果(!matchesSelector(事件。目标,'.filter-item')) {
返回;
            }
            var filterValue=事件。目标.getattribute('数据筛选器');
ISO.安排({
              过滤器：filterValue
            });
          });
          为(var我=0，Len=buttonGroups。长度；I<len；i++) {
            var buttonGroup=buttonGroups[我];
buttonGroup。addEventListener('单击',功能(事件) {
              如果(!matchesSelector(事件。目标,'.filter-item')) {
返回;
              }
buttonGroup。querySelector('.active').classList.移除('活动');
事件。目标.classList.添加('活动');
columnWidth：网格。offsetWidth/12
          },
百分比位置：正确,
transitionDuration：'0.7s'
        });
        imagesLoaded(网格).在……之上("进度",功能() {
ISO.布局({
            砖石建筑:{
              columnWidth：网格。offsetWidth/12
            }
          })
        }),
窗户。addEventListener("调整大小",功能() {
ISO.安排({
            砖石建筑:{
              columnWidth：网格。offsetWidth/12
            }
          });
        },正确);
        如果(filtersElem！=无效的) {
filtersElem。addEventListener('单击',功能(事件) {
            如果(!matchesSelector(事件。目标,'.filter-item')) {
返回;
            }
            var filterValue=事件。目标.getattribute('数据筛选器');
ISO.安排({
              过滤器：filterValue
            });
          });
          为(var我=0，Len=buttonGroups。长度；I<len；i++) {
            var buttonGroup=buttonGroups[我];
buttonGroup。addEventListener('单击',功能(事件) {
              如果(!matchesSelector(事件。目标,'.filter-item')) {
返回;
              }
buttonGroup。querySelector('.active').classList.移除('活动');
事件。目标.classList.添加('活动');
返回触发。nextElementSibling
      }
    })
剪贴板。在……之上('成功',事件=>{
事件。触发.textContent=“收到！”;
事件。clearSelection();
      setTimeout(功能 () {
事件。触发.textContent='复制';
      },2000);
    });
    var copyIconCode=新的剪贴板JS('.btn-copy-icon');
copyIconCode。在……之上('成功',功能(事件) {
事件。clearSelection();
事件。触发.
窗户。setTimeout(功能() {
事件。触发.textContent='复制';
      },2300);
    });
  },
}
主题。init();
