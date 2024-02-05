function init() {
  // refers
  let btnAvancar = document.querySelector("#btn_arrow");

  // Animation
  let tl = new gsap.timeline();
  tl.fromTo(btnAvancar, .8, { opacity: 0 }, { opacity: 1, delay: .5 });
}