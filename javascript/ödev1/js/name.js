let firstName = prompt("Lütfen isminizi giriniz: ");
let fixedFirstName = firstName[0].toLocaleUpperCase() + firstName.slice(1);
let info = document.querySelector("#myName");
info.innerHTML = fixedFirstName;
