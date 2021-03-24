var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
//  Date Logic
const dateObj = new Date();
let date = `${dateObj.getDate()} ${
  months[dateObj.getMonth()]
} ${dateObj.getUTCFullYear()}`;
document.querySelector(".date").innerText = date;

// selectors

const form = document.querySelector("form");
let ul = document.querySelector("ul");

if (localStorage.getItem("todoExt")) {
  var locltodos = JSON.parse(localStorage.getItem("todoExt"));
  updateDom(locltodos);
  ul.innerHTML += `<p class='notodos'> </p>`;
} else {
  ul.innerHTML += `<p class='notodos'> No Todos ! YAY  </p>`;
}

clearTodo();

form.addEventListener("submit", (e) => {
  if (!localStorage.getItem("todoExt")) {
    const p = document.querySelector(".notodos");
    p.innerText = "";
  }

  e.preventDefault();
  const todo = form.input.value.trim();
  updateDom([todo]);
  form.input.value = "";
  const li = document.querySelectorAll("li");
  let todos = [];
  li.forEach((li) => {
    todos.push(li.innerText);
  });

  setLocal(todos);
  clearTodo();
});

function setLocal(arr) {
  localStorage.setItem("todoExt", JSON.stringify(arr));
}

function updateDom(arr) {
  arr.forEach((todo) => {
    ul.innerHTML += `<li> ${todo}  <img class='close' src="./images/close.png" alt="" /></li>`;
  });
}

function clearTodo() {
  const close = document.querySelectorAll(".close");

  if (close.length > 0) {
    close.forEach((close) => {
      close.addEventListener("click", (e) => {
        e.target.parentElement.remove();
        const updatedTOdo = locltodos.filter((todo) => {
          return e.target.parentElement.innerText == todo;
        });
        setLocal(updatedTOdo);
      });
    });
  }
}
