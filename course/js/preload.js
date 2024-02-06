let n_telas_c = 0;
var total_images = 0;
var text_perc, preload_images
var cancel_interval;

function preload() {
    loadScript()
    returnList()
    total_images = preload_list.length
    text_perc = document.querySelector('.container-init-course')
    preload_images = document.querySelector('#preload')

    text_perc.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><filter id="dots_filter"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7" /></filter></defs></svg><div class="abs dots_container"><div class="dot dot-1"></div><div class="dot dot-2"></div><div class="dot dot-3"></div></div><p class="abs txt_load">0%</p>';
}

function loadScript() {
    $.getScript(`screens/${n_telas_c}/tela.js`, function () {
        n_telas_c++;
        if (n_telas_c < n_telas) {
            loadScript();
        }
        else {
            loadCss();
        }
    });
}

function loadCss() {
    for (let i = 0; i < n_telas; i++) {
        $('#preload').append(`<link rel="preload" href="screens/${i}/tela.css" as="style" />`)
    }
    //Load imgs soon
    preload_next();
    cancel_load();
}

var alt_count = 0;

function preload_next() {
    if (time_end) {
        return;
    }
    if (preload_list.length > 0) {
        let piv_src = preload_list.shift();
        try {
            let piv_img = document.createElement('img');
            piv_img.setAttribute("role", "presentation");
            piv_img.src = piv_src;
            piv_img.width = 1;
            piv_img.height = 1;
            piv_img.alt = "pImage" + alt_count;
            piv_img.onload = function () {
                checkIsReady(piv_img);
            }
            alt_count++;
            preload_images.appendChild(piv_img);
        } catch (error) {
            console.log('Erro ao carregar arquivo: ', error);
            preload_next();
        }
    } else {
        console.log('Load all');
        clearInterval(cancel_interval);
        setTimeout(function () {
            enableIni()
        }, 500);
    }
}

var count_perc = 0;
var check_piv_img;

function checkIsReady(element) {
    if (IsImageOk(element)) {
        preload_next();
        count_perc++;
        let perc = Math.ceil((count_perc / total_images) * 100);
        document.querySelector('.txt_load').innerText = `${perc}%`;
    } else {
        check_piv_img = element;
        setTimeout(() => { check_piv_img(element) }, 100);
    }
}

// External check loaded image
function IsImageOk(img) {
    if (!img.complete) {
        return false;
    }
    if (img.naturalWidth === 0) {
        return false;
    }
    return true;
}

var timer_w = 0;
var time_end = false;

function cancel_load() {
    cancel_interval = setInterval(() => {
        // console.log('Cancel>>>', timer_w)
        timer_w++;
        if (timer_w > 30) {
            time_end = true;
            clearInterval(cancel_interval);
            console.log('Cancel preload');
            enableIni()
        }
    }, 1000);
}

var preload_list = [];
function returnList() {
    preload_list = [];
}