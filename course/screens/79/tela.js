function init() {

  let validString = ["Estudo", "estudo"];
  let currDestaque = 0;

  // refers
  let mascara = document.querySelector(".mascara_balao");
  let balao = document.querySelector(".balao.b0");
  let btFecharBalao = document.querySelector(".balao button.fechar");

  let destaques = document.querySelectorAll(".foco");

  let inputField = document.querySelector("input.nome");

  let feedNeg = document.querySelector(".feedback");
  let btFecharFeed = document.querySelector(".feedback button.fechar");

  // on first focus...
  inputField.addEventListener("focus", e => {
    e.target.value = "";
    inputField.className = "nome abs"
  })

  // on leaving field...
  inputField.addEventListener("blur", e => {
    e.target.value = e.target.value === "" ? "" : e.target.value;
  })

  // on typing...
  inputField.addEventListener("input", e => {
    if (e.target.value.length >= validString[0].length) {
      // enable pulse for avatar sel.
      destaques[0].className = "divImg foco f0 pulse"
      destaques[0].style.cssText = 'touch-action: unset; pointer-events: unset;'
    }
  })

  // balloon events
  let showDestaque = (dest) => {
    destaques[dest].style.display = "block";
  }

  // close balloon event
  let handleCloseBalloon = (e) => {
    e.target.parentNode.style.display = "none";
    mascara.style.display = "none";
    currDestaque++;
  }
  btFecharBalao.addEventListener("click", handleCloseBalloon);

  // validate string, return bool
  let checkInput = (inp) => {
    if (inp.value === validString[0] ||
      inp.value === validString[1]) {
      return true;
    } else {
      return false;
    }
  }

  // destaque events
  let handleAvancar = (e) => {
    if (checkInput(inputField)) {
      if (currDestaque === (destaques.length)) {
        modulos.end(79)
      } else {
        destaques[currDestaque - 1].classList.remove('pulse')
        destaques[currDestaque - 1].style.cssText = 'touch-action: none; pointer-events: none;'

        destaques[currDestaque].classList.add('pulse')
        destaques[currDestaque].style.cssText = 'touch-action: unset; pointer-events: unset;'

        showDestaque(currDestaque);
        console.log(currDestaque);

        currDestaque++;
      }
    } else {
      // Incorrect feedback! Show feed =>
      feedNeg.style.display = "flex";
    }
  }

  destaques.forEach(el => {
    el.addEventListener("click", handleAvancar);
  });

  // feedback events
  let handleCloseFeed = (e) => {
    // Close feed, clean input + hide destaque[1] 
    e.target.parentNode.style.display = "none";
    destaques[0].className = "divImg foco f0"
    destaques[0].style.cssText = 'touch-action: none; pointer-events: none;'
    inputField.value = "";
    inputField.focus();
  }
  btFecharFeed.addEventListener("click", handleCloseFeed);

  // Animation
  let tl = new gsap.timeline();
  tl.fromTo(mascara, .8, { opacity: 0 }, { opacity: 1, delay: .5 });
  tl.fromTo('.hole', .5, { opacity: 0 }, { opacity: 1 });
  tl.fromTo(balao, .5, { opacity: 0 }, { opacity: 1 });
}