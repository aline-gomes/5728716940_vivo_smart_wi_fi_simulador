function init() {

  let validString = "CAPACITACAO";
  let currDestaque = 0;

  // refers
  let mascara = document.querySelector(".mascara_balao");
  let balao = document.querySelector(".balao.b0");
  let btFecharBalao = document.querySelector(".balao button.fechar");

  let inputField = document.querySelector("input.nome");

  let feedNeg = document.querySelector(".feedback");
  let btFecharFeed = document.querySelector(".feedback button.fechar");

  // on first focus...
  inputField.addEventListener("focus", e => {
    e.target.value = "";
  })

  // on leaving field...
  inputField.addEventListener("blur", e => {
    e.target.value = e.target.value === "" ? "" : e.target.value;
  })

  // close balloon event
  let handleCloseBalloon = (e) => {
    e.target.parentNode.style.display = "none";
    mascara.style.display = "none";

    inputField.focus();
    currDestaque++;
  }
  btFecharBalao.addEventListener("click", handleCloseBalloon);

  // validate string, return bool
  let checkInput = (inp) => {
    inp = inp.value.toUpperCase();

    if (inp === validString) {
      return true;
    } else {
      return false;
    }
  }

  // on typing...
  inputField.addEventListener("input", e => {
    if (e.target.value.length >= validString.length) {
      // enable pulse for avatar sel.
      if (checkInput(inputField)) {
        console.log('Correto!')
        inputCapacitacao.push(e.target.value)
        setTimeout(() => { screen.next(); }, 500);
      }
      else {
        // Incorrect feedback! Show feed =>
        feedNeg.style.display = "flex";
      }
    }
  })

  // feedback events
  let handleCloseFeed = (e) => {
    // Close feed, clean input + hide destaque[1] 
    e.target.parentNode.style.display = "none";
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