//#region Configs
//Numero de telas
var n_telas = 1;
//Tela inicial 0
var c_screen = 2;

const container = $("#loaded_content");
//#endregion

async function init() {
  try {
    await calcScale();
    await preload();
    sco.init();
    return;
  } catch (error) {
    console.log("Init error => \n", error);
  }
}

//#region Screen
var screen = {
  lock: false,
  goto: (n = c_screen) => {

    cleanStyles();

    n != c_screen ? (c_screen = n) : null;
    $(container).empty();
    $(container).load(`screens/${n}/tela.html`);

    hud.config(n);

    setTimeout(() => {
      screen.lock = false;
      hud.enable_nav();
      console.log("screen: ", c_screen);
    }, 2000);
  },
  next: () => {
    if (!screen.lock) {
      screen.lock = true;
      c_screen++;
      screen.goto();
      hud.block_nav();
    }
  },
  back: () => {
    if (!screen.lock) {
      screen.lock = true;
      c_screen--;
      screen.goto();
      hud.block_nav();
    }
  },
};

//#endregion

//#region Hud
const hud = {
  html: null,
  config: (n) => {
    hud.html ? false : (hud.html = $(".hud")[0]);
  },
  show: () => {
    if ((hud.html.style.display = "none")) {
      hud.html.style.display = "block";
    }
    let btn_next = document.querySelector(".btn-next");
    if (btn_next.style.display == "none") {
      btn_next.style.display = "block";
    }
  },
  hide: () => {
    if ((hud.html.style.display = "block")) {
      hud.html.style.display = "none";
    }
  },
  block_send: () => {
    if (document.querySelector(".question-btn")) {
      document.querySelector(".question-btn").disabled = true;
    } else {
      setTimeout(hud.block_send, 500);
    }
  },
  enable_send: () => {
    if (document.querySelector(".question-btn")) {
      document.querySelector(".question-btn").disabled = false;
    } else {
      setTimeout(hud.enable_send, 500);
    }
  },
  block_nav: () => {
    document.querySelector(".btn-next").style.opacity = ".3";
    document.querySelector(".btn-back").style.opacity = ".3";
    document.querySelector(".btn-next").classList.add("disabled");
    document.querySelector(".btn-back").classList.add("disabled");
  },
  enable_nav: () => {
    document.querySelector(".btn-next").style.opacity = "1";
    document.querySelector(".btn-back").style.opacity = "1";
    document.querySelector(".btn-next").classList.remove("disabled");
    document.querySelector(".btn-back").classList.remove("disabled");

    if (c_screen == 0) {
      hud.block_btnb();
    }

    if (c_screen == n_telas) {
      hud.block_btnn();
    }
  },
  block_btnb: () => {
    document.querySelector(".btn-back").classList.add("disabled");
  },
  block_btnn: () => {
    document.querySelector(".btn-next").classList.add("disabled");
  },
};

//#endregion

//#region Scorm
const sco = {
  score: 0,
  end: 0,
  isLMS: false,

  init: function () {
    window.addEventListener("beforeunload", function (e) {
      lms.SCORM.quit();
    });

    console.log("Script_Scorm: init");

    try {
      this.isLMS = lms.SCORM.init();

      lms.SCORM.set('cmi.core.score.min', '0');
      lms.SCORM.set('cmi.core.score.max', '100');
      lms.SCORM.set('cmi.core.lesson_status', 'incomplete');
      lms.SCORM.save();

    } catch (err) {
      console.log("Script_Scorm: Fora da plataforma");
      console.log(err);
    }
  },

  complet: function () {
    if (!sco.isLMS) {
      return;
    }
    console.log("Script_Scorm: complet");

    lms.SCORM.set('cmi.core.score.raw', '100');
    lms.SCORM.set('cmi.core.lesson_status', 'completed');
    lms.SCORM.save();
  },

  getSuspend: function () {
    if (!sco.isLMS) {
      return;
    }
    log("Script_Scorm: getSuspend");
    try {
      susp = lms.SCORM.get("cmi.suspend_data");

      log("Get Suspend_Data: " + [susp]);

      if (susp != "" && susp != null) {
        susp = susp.split(";");
        c_screen = parseInt(susp[0]);
        sco.score = parseInt(susp[1]);
      } else {
        susp = null;
        log("No susp Avaible");
      }
    } catch (err) { }
  },

  setSupend: function () {
    if (!sco.isLMS) {
      return;
    }
    log("Script_Scorm: setSupend");

    console.log(sco.score);
    console.log("c_screen", c_screen);
    console.log(typeof c_screen);

    var pivSusp = c_screen + ";" + sco.score;
    pivSusp = pivSusp.toString();
    lms.SCORM.set("cmi.suspend_data", pivSusp);
    lms.SCORM.save();
  },

  finish: function () {
    if (!sco.isLMS) {
      return;
    }
    console.log("Script_Scorm: end");
    try {
      lms.SCORM.save();
      lms.SCORM.quit();

      clearInterval(countTimePass);
      sco.isLMS = false;
    } catch (err) {
      console.log("Scorm já encerrado");
      sco.isLMS = false;
    }
  },
};

function log(text) {
  console.log("%c" + ">>>" + text + "<<<", "color:#0080ff;font-weight: bold;");
}

// "Triga" o evento associado ao node (click etc) em qq local
function fireClick(node) {
  if (document.createEvent) {
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, false);
    node.dispatchEvent(evt);
  } else if (document.createEventObject) {
    node.fireEvent("onclick");
  } else if (typeof node.onclick == "function") {
    node.onclick();
  }
}
