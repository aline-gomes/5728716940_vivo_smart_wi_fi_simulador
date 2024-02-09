function init() {

  let validString = "Joanna";

  // refers
  let mascara = document.querySelector(".mascara_balao");
  let balao = document.querySelector(".balao.b0");
  let btFecharBalao = document.querySelector(".balao button.fechar");

  let destaque = document.querySelector(".foco");

  let inputField = document.querySelector("input.nome");

  let feedNeg = document.querySelector(".feedback");
  let btFecharFeed = document.querySelector(".feedback button.fechar");

  // on first focus...
  inputField.addEventListener("focus", e => {
    e.target.value = "";
    e.target.className = "nome abs"
  })

  // on leaving field...
  inputField.addEventListener("blur", e => {
    e.target.value = e.target.value === "" ? "Nome" : e.target.value;
  })

  // on typing...
  inputField.addEventListener("input", e => {
    if (e.target.value.length >= validString.length) {
      // enable pulse for avatar sel.
      destaque.className = "divImg foco pulse"
    }
  })

  // close balloon event
  let handleCloseBalloon = (e) => {
    e.target.parentNode.style.display = "none";
    mascara.style.display = "none";
  }
  btFecharBalao.addEventListener("click", handleCloseBalloon);

  // validate string, return bool
  let checkInput = (inp) => {
    inp.value = inp.value.replace(/^./, str => str.toUpperCase())

    if (inp.value === validString) {
      return true;
    } else {
      return false;
    }
  }

  // destaque events
  let handleAvancar = (e) => {
    if (checkInput(inputField)) {
      screen.next();
    } else {
      // Incorrect feedback! Show feed =>
      feedNeg.style.display = "flex";
    }
  }
  destaque.addEventListener("click", handleAvancar);

  // feedback events
  let handleCloseFeed = (e) => {
    // Close feed, clean input + hide destaque[1] 
    e.target.parentNode.style.display = "none";
    inputField.value = "";
  }
  btFecharFeed.addEventListener("click", handleCloseFeed);

  // Animation
  let tl = new gsap.timeline();
  tl.fromTo(mascara, .8, { opacity: 0 }, { opacity: 1, delay: .5 });
  tl.fromTo('.hole', .5, { opacity: 0 }, { opacity: 1 });
  tl.fromTo(balao, .5, { opacity: 0 }, { opacity: 1 });
}