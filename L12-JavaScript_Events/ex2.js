const form = document.getElementById("form");

// form.addEventListener("focus", (event) => {
//         event.target.style.background = "yellow";
//     }, true);

// form.addEventListener("blur", (event) => {
//         event.target.style.background = "";
//     }, true);

form.addEventListener("focusin", (elementEvent) => {
    elementEvent.target.style.background = "yellow";
});

form.addEventListener("focusout", (elementEvent) => {
    elementEvent.target.style.background = "";
});