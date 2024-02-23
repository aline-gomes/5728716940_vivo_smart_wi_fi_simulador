//Numero de telas
var n_telas = 1;
var c_screen = 0;

var subscreen = null;
var inputCapacitacao = [];
const container = $("#loaded_content");

async function init() {
  try {
    sco.init();
    sco.getSuspend()
    await calcScale();
    await preload();
    return;
  } catch (error) {
    console.log("Init error => \n", error);
  }
}

//#region Screen
var screen = {
  lock: false,
  goto: (n = c_screen) => {
    console.log("Goto > ", n)
    sco.setSupend();
    cleanStyles();

    n != c_screen ? (c_screen = n) : null;
    $(container).empty();
    $(container).load(`screens/${n}/tela.html`);

    setTimeout(() => {
      screen.lock = false;
      console.log("screen: ", c_screen);
    }, 2000);
  },
  next: () => {
    if (!screen.lock) {
      screen.lock = true;
      c_screen++;
      screen.goto();
    }
  },
  back: () => {
    if (!screen.lock) {
      screen.lock = true;
      c_screen--;
      screen.goto();
    }
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
    try {
      let susp = lms.SCORM.get("cmi.suspend_data");
      log("Get Suspend_Data: " + [susp]);

      if (susp != "" && susp != null) {
        susp = susp.split(";");
        modulos.t_fin = susp[0].split(',').filter(element => element !== '').map(Number)
        c_screen = parseInt(susp[1]);
        subscreen = JSON.parse(susp[2]);
        modulos.finish = JSON.parse(susp[3]);

        console.log("Data set => \n", susp)
      } else {
        log("No data available");
      }
    } catch (err) { }
  },

  setSupend: function () {
    if (!sco.isLMS) {
      return;
    }

    let infoSusp = modulos.t_fin.toString() + ';' + c_screen + ';' + subscreen + ';' + modulos.finish;
    log("Set Suspend_Data: " + infoSusp);
    lms.SCORM.set("cmi.suspend_data", infoSusp);
    lms.SCORM.save();
  },

  setRaw: function () {
    if (!sco.isLMS) {
      return;
    }
    let x = parseInt((modulos.t_fin.length / modulos.t_ini.length) * 100)
    log("Set score.raw: " + x);
    lms.SCORM.set('cmi.core.score.raw', x.toString());
    lms.SCORM.save();
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

// Menu control
var modulos = {
  finish: false,
  t_ini: [2, 3, 4, 5, 56, 64, 68, 81, 113, 114, 115, 116],
  t_fin: [],
  end: (n) => {
    if (modulos.t_fin.indexOf(n) != -1) {
      screen.goto(1)
      return
    }

    modulos.t_fin.push(n)
    subscreen = null
    sco.setSupend();
    sco.setRaw()

    if (n == 116) {
      modulos.finish = true;
      sco.complet();
    }
    screen.goto(1)
  }
}