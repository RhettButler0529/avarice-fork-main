$('.shared-header')[0].innerHTML =
    `
<div class="mobile-menu md:hidden" style="border: 0; width: 100vw">
    <div class="mobile-menu-bar" style="background: #3f4366; box-shadow: 0px 0px 10px #121420; height: 60px;">
        <a href="" class="flex mr-auto" onclick="openMenuM()">
            <img alt="LAVA Token" class="w-6" src="../panel/dist/imgs/duorice_logo_1.png" style="width: 34vw;">
        </a><div class="top-bar-boxed flex items-center" style="margin-right: -5px;">
            <div style="background: #040417;/* box-shadow: 2px 2px 8px #202639a1; */height: 38px;border-radius: 6px;padding: 2px 0px 0px 10px;border: 3px solid #42527178;color: #c5d6f3;font-size: 18px;font-weight: 500;margin-right: 20px;"><span class="day-end-in-mb" style="padding-right: 10px;">Day Ends In: -- : -- : --</span></div>
        </div><a onclick="openMenuM()"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2 w-8 h-8 text-white transform -rotate-90"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg> </a>
        </div>


<div class="mobile-exten" style="background: rgb(60, 60, 99); box-shadow: rgb(18, 20, 32) 0px 0px 10px; z-index: 1000000000; position: absolute; width: 100%; align-items: center; display: none; height: auto;">

        <ul class="border-t border-theme-24 py-7">
             <li style="border-color: #93939330;
             border-bottom-width: 2px;" onclick="location.href='stake.html';">
                <a href="stake.html" class="menu">
                    <div class="menu__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg> </div>
                    <div class="menu__title">Stake</div>
                </a>
            </li> 
            <li style="border-color: #93939330;
            border-bottom-width: 2px;" onclick="location.href='lobby.html';">
                <a href="lobby.html" class="menu">
                    <div class="menu__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-server"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg> </div>
                    <div class="menu__title">Auction Lobbies</div>
                </a>
            </li>
            <li style="border-color: #93939330;
            border-bottom-width: 2px;" onclick="location.href='buyandsell.html';">
                <a href="buyandsell.html" class="menu">
                    <div class="menu__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shuffle"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg> </div>
                    <div class="menu__title">Buy and sell</div>
                </a>
            </li>

            <li onclick="location.href='faq.html';">
                <a  class="menu ">
                    <div class="menu__icon"> <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="white" height="24" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M204.3 32.01H96c-52.94 0-96 43.06-96 96c0 17.67 14.31 31.1 32 31.1s32-14.32 32-31.1c0-17.64 14.34-32 32-32h108.3C232.8 96.01 256 119.2 256 147.8c0 19.72-10.97 37.47-30.5 47.33L127.8 252.4C117.1 258.2 112 268.7 112 280v40c0 17.67 14.31 31.99 32 31.99s32-14.32 32-31.99V298.3L256 251.3c39.47-19.75 64-59.42 64-103.5C320 83.95 268.1 32.01 204.3 32.01zM144 400c-22.09 0-40 17.91-40 40s17.91 39.1 40 39.1s40-17.9 40-39.1S166.1 400 144 400z"/></svg> </div>
                    <div class="menu__title">FAQ</div>
                </a>
            </li>
        </ul>
    </div>
</div>
<div class="border-b hd-nm border-theme-24 -mt-10 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 pt-3 md:pt-0 mb-10" style="border: none; background: #262935; padding:0px">
    <div class="top-bar-boxed flex items-center" style="height: 55px;box-shadow: 0px 4px 6px #3e46725e; padding: 5px; background: linear-gradient(to right, #1d1d20 0%, #363945 100%) !important">
        <!-- BEGIN: Logo -->
        <a href="/" class="-intro-x hidden md:flex">
           <img alt="LAVA Tokens" class="w-6" src="./dist/imgs/duorice_logo_1.png" style="filter: drop-shadow(0px 0px 3px #120f275e);; width: 60px">&nbsp;
           <strong style="color: white;font-size: 28px;font-weight: bold">Duorice</strong>
        </a>
        <!-- END: Logo -->
       <div style="width: 100%;display: inline-block;">
<div style="display: contents;float: right;right: 2px;/* position: absolute; *//* right: 5px; *//* float: right; */">
<div style="background: #2c303d;/* box-shadow: 2px 2px 8px #202639a1; */height: 38px;border-radius: 6px;padding: 2px 0px 0px 10px;border: 3px solid #42527178;color: #c5d6f3;font-size: 18px;font-weight: 500;margin-right: 70px;float: inherit;"><span class="day-end-in" style="padding-right: 10px;">Day Ends In: 00 : 00 : 00</span></div>
<div style="height: 38px;padding: 2px 0px 0px 10px;font-size: 18px;font-weight: 500;padding-top: 7px;padding-left: 40px;">


   <a class="t-pp pg_tt_staking" href="stake.html">Staking</a>

   <a class="t-pp pg_tt_auction" href="lobby.html">Lobby</a>



   <a class="t-pp pg_tt_buyandsell" href="buyandsell.html">Buy&Sell</a>

   <a class="t-pp pg_tt_faq" href="faq.html">FAQ</span>

   <a class="t-pp pg_tt_faq" onclick="openModal3()">Tokens Transfer</a>

   <div class="pg_sl_r" style="
      height: 3px;
      width: 62px;
      background: #00dfb2;
      margin-top: 9.3px;
      opacity: 0;
      "></div>
</div>











</div>
    </div>
</div>
`

let mmO
// setInterval(() => {
//     ckmobileDoes()
// }, 1000)

setTimeout(() => {
    ckmobileDoes()
}, 1000)

ckmobileDoes()

function ckmobileDoes() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.hd-nm')[0].style.display = "none"
        // $('.my-acc-add')[0].style.fontSize = "16px"
        $('.day-end-in')[0].style.fontSize = "16px"


        //$('.mb-slider-menu')[0].style.display = "inline-block"
        $('.recent-events')[0].style.display = "none"
        // $('.shared-header')[0].style.display = "none"


        $('.l-12-b2')[0].style = `display: inline-block;
        width: 100%;
        position: absolute;
        float: right;
        padding: 0;
        margin: 0;
        margin-top: 8vh`


        $('.row')[0].style.width = "100vw"
        $('.row')[0].style.textAlign = "center"
        $('.row')[0].style.display = "-webkit-box"
        $('.row')[0].style.padding = "0px"

        $('.row')[0].style["max-width"] = "100%"
        $('.row')[0].style.overflow = "scroll"

        for (var i = 0; i < $('.mb-xl-0').length; i++) {
            $('.mb-xl-0')[i].style.maxWidth = "50%"
        }

        $('.waht-is-avc')[0].style.display = "none"


        $('.section-mb-53')[0].style.float = "right"
        $('.section-mb-53')[0].style.width = "99%"
        //$('.section-mb-53')[0].style.marginRight =  "-2vw"

        $('.bcs-mb-32')[0].style.float = "right"
        // $('.bcs-mb-32')[0].style.width =  "95vw"
        // $('.bcs-mb-32')[0].style.marginRight =  "-2vw"

        $('.bcs-mb-37')[0].style.float = "right"
        $('.bcs-mb-37')[0].style.width = "100vw"
        // $('.bcs-mb-37')[0].style.marginRight =  "-2vw"

        $('.mc-mb-23')[0].style.width = "99%"
        $('.mc-mb-23')[0].style.paddingRight = "1%"


        $('.b-table')[0].style.width = "150%"

        if ($('.tb-mb-55')[0]) {
            $('.tb-mb-55')[0].style.maxWidth = "100%"
            $('.tb-mb-55')[0].style.width = "98%"
            $('.tb-mb-55')[0].style.overflow = "scroll"
            $('.tb-mb-55')[0].style.marginBottom = "10px"
            $('.tb-mb-55')[0].style.marginLeft = "1%"
        }

        if ($('.l-12-b2')[0]) $('.l-12-b2')[0].style.right = "0px"

        if ($('.sm-mb-44')[0]) $('.sm-mb-44')[0].style.float = "right"


        $('.nnb-31')[0].style.flex = "unset"
        $('.nnb-32')[0].style.flex = "unset"
        $('.nnb-33')[0].style.flex = "unset"

        if ($('.nnb-322')[0]) $('.nnb-322')[0].style.display = "none"

        if ($('.tohund')[0]) $('.tohund')[0].style.width = "100%"
        if ($('.tohund')[1]) $('.tohund')[1].style.width = "100%"
        if ($('.tohund')[2]) $('.tohund')[2].style.width = "100%"

        // if ($('.nnb-32')[0]){
        //     $('.nnb-32')[0].style.margin = "0px 0.5rem 0px 0.5rem"
        //     $('.nnb-32')[0].style.display = "inline-block"
        //     $('.nnb-32')[0].style.padding = "0px 2%"
        //     $('.nnb-32')[0].style.width = "auto"
        //     $('.nnb-32')[0].style["vertical-align"] = "top"
        //     $('.nnb-32')[0].style.margin = "0px"
        // }

        // if ($('.nnb-33')[0]){
        //     $('.nnb-33')[0].style.margin = "0px 0.5rem 0px 0.5rem"
        //     $('.nnb-33')[0].style.display = "inline-block"
        //     $('.nnb-33')[0].style.padding = "0px 2%"
        //     $('.nnb-33')[0].style.width = "auto"
        //     $('.nnb-33')[0].style["vertical-align"] = "top"
        //     $('.nnb-33')[0].style.margin = "0px"
        // }


        if ($('.mbb-83')[0]) {
            $('.mbb-83')[0].style.width = "100%"
        }

        if ($('.nm-stak-23')[0]) {
            $('.nm-stak-23')[0].style.width = "100%"
        }

        if ($('.stake-inp-amount')[0]) {
            $('.stake-inp-amount')[0].style.margin = "0px 0px 5px 3px"
            $('.stake-inp-amount')[0].style.width = "-webkit-fill-available"

            $('.stake-inp-days')[0].style.margin = "0px 0px 5px 3px"
            $('.stake-inp-days')[0].style.width = "-webkit-fill-available"

            $('.do-stake-btn')[0].style.margin = "0px 0px 5px 3px"
            $('.do-stake-btn')[0].style.width = "-webkit-fill-available"

            $('.mc-mb-23')[0].before($('.nm-stak-23')[0]);
            $('.nm-stak-23')[0].style.marginBottom = "15px"
        }

        if ($('.tr-445')[0]) {
            $('.tr-445')[0].style.display = "none"
        }

        $('.card-title-rv')[0].style.display = "none"

    }
}

function openMenuM() {
    if (mmO) {
        mmO = false
        $('.mobile-exten')[0].style.display = "none"
    } else {
        mmO = true
        $('.mobile-exten')[0].style.display = "block"
    }
}

