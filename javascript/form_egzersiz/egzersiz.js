let userFormDOM = document.querySelector("#userForm");
userFormDOM.addEventListener("submit", formHandler);
const alertDOM = document.querySelector("#alert");

function formHandler(event) {
  event.preventDefault();
  const USER_NAME = document.querySelector("#username");
  const SCORE = document.querySelector("#score");
  if (USER_NAME.value && SCORE.value) {
    addItem(USER_NAME.value, SCORE.value);
  } else {
    alertDOM.innerHTML = alertFunction(
      "HATA!",
      "Eksik Bilgi Girdiniz!",
      "danger"
    );
  }
}

let userListDOM = document.querySelector("#userList");

const addItem = (userName, score) => {
  let liDOM = document.createElement("li");
  liDOM.innerHTML = `<li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
        <div class="fw-bold">Deneme</div>
        ${userName}
    </div>
    <span class="badge bg-primary rounded-pill">${score}</span>
  </li> `;
  userListDOM.append(liDOM);
};

const alertFunction = (title, message, className = "warning") => `
<div class="alert alert-${className} alert-dismissible fade show" role="alert">
  <strong>${title}</strong> ${message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

{
  /* <li
class="list-group-item d-flex justify-content-between align-items-start"
>
<div class="ms-2 me-auto">
  <div class="fw-bold">Subheading</div>
  Content for list item
</div>
<span class="badge bg-primary rounded-pill">14</span>
</li> */
}
