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
let p = document.querySelector(".notodos");

if (localStorage.getItem("todoExt")) {
  var locltodos = JSON.parse(localStorage.getItem("todoExt"));
  ul.innerText += "";
  updateDom(locltodos);
} else {
  p.innerText = ` No Todos ! YAY `;
}

clearTodo();

form.addEventListener("submit", (e) => {
  p.innerText = "";
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
        if (ul.querySelectorAll("li").length < 1) {
          console.log("firiuyn");
          console.log(p);
        }
        const updatedTOdo = locltodos.filter((todo) => {
          return e.target.parentElement.innerText == todo;
        });
        setLocal(updatedTOdo);
        if (updatedTOdo.length == 0) {
          p.innerText = ` No Todos ! YAY  `;
        }
      });
    });
  }
}
