function init() {
  // refers
  let destaque = document.querySelector(".foco");
  let btnArrow = document.querySelector("#btn_arrow");

  // balloon events
  let showAvancar = () => {
    gsap.to(btnArrow, .8, { display: "block", opacity: 1 });
  }

  setTimeout(() => { showAvancar(); }, 3000);
  destaque.addEventListener("click", showAvancar);

  // Animation
  let tl = new gsap.timeline();
  tl.fromTo(destaque, .8, { opacity: 0 }, { opacity: 1, delay: .5 });
}