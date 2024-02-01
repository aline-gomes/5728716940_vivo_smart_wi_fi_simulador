function init() {

    let validString = "Joanna";

    // refers
    let mascara = document.querySelector(".mascara_balao");
    let balao = document.querySelector(".balao.b0");
    let btFecharBalao = document.querySelector(".balao button.fechar");

    let destaques = document.querySelectorAll(".destaque");

    let inputField = document.querySelector("input.nome");

    let feedNeg = document.querySelector(".feedback");
    let btFecharFeed = document.querySelector(".feedback button.fechar");
    
    // on first focus...
    inputField.addEventListener("focus", e => {
      e.target.value = "";
      destaques[0].style.display = "none";
    })
    
    // on leaving field...
    inputField.addEventListener("blur", e => {
      e.target.value = e.target.value === "" ? "Nome" : e.target.value;
    })

    // on typing...
    inputField.addEventListener("input", e => {
      if (e.target.value.length >= validString.length) {
        // enable pulse for avatar sel.
        destaques[1].style.display = "block";
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

      showDestaque(0);
    }
    btFecharBalao.addEventListener("click", handleCloseBalloon);

    // validate string, return bool
    let checkInput = (inp) => {
      if(inp.value === validString) {
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
    destaques[1].addEventListener("click", handleAvancar);

    // feedback events
    let handleCloseFeed = (e) => {
      // Close feed, clean input + hide destaque[1] 
      e.target.parentNode.style.display = "none";
      inputField.value = "";
      destaques[1].style.display = "none";
    }
    btFecharFeed.addEventListener("click", handleCloseFeed);
    
    // Animation
    let tl = new gsap.timeline();
    tl.fromTo(mascara, .8, { opacity: 0 }, { opacity: 1, delay: .5 });
    tl.fromTo(balao, .8, { opacity: 0 }, { opacity: 1 });
}