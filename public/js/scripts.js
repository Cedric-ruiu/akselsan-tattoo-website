var form = document.querySelector('form[action*="web3forms"]');
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    var btn = form.querySelector('[type="submit"]');
    var originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Envoi en cours…";
    var res = await fetch(form.action, { method: "POST", body: new FormData(form) });
    var json = await res.json();
    if (json.success) {
      btn.textContent = "Message envoyé !";
      form.reset();
    } else {
      btn.textContent = originalText;
      btn.disabled = false;
      alert("Une erreur est survenue, veuillez réessayer.");
    }
  });
}

var body = document.querySelector("body");
var menuTrigger = document.querySelector("#toggle-main-menu-mobile");
var menuContainer = document.querySelector("#main-menu-mobile");

if (menuTrigger && menuContainer) {
  menuTrigger.onclick = () => {
    menuContainer.classList.toggle("open");
    menuTrigger.classList.toggle("is-active");
    body.classList.toggle("lock-scroll");
  };
}
