const dropdown = document.getElementById("dropdown");
const trigger = document.getElementById("dropdown-trigger");
const label = document.getElementById("dropdown-label");
const list = document.getElementById("dropdown-list");
const options = document.querySelectorAll(".dropdown__option");

function openList() {
  list.hidden = false;
  dropdown.classList.add("dropdown--open");
  trigger.setAttribute("aria-expanded", "true");
}

function closeList() {
  list.hidden = true;
  dropdown.classList.remove("dropdown--open");
  trigger.setAttribute("aria-expanded", "false");
}

// Click the button to open or close the menu
trigger.addEventListener("click", function () {
  if (list.hidden) {
    openList();
  } else {
    closeList();
  }
});

// Click an option: show it on the button, tick it, close the menu
options.forEach(function (option) {
  option.addEventListener("click", function () {
    const text = option.querySelector(".dropdown__option-text").textContent;

    label.textContent = text;
    label.classList.remove("is-placeholder");

    options.forEach(function (item) {
      const isPicked = item === option;
      item.setAttribute("aria-selected", isPicked);
    });

    closeList();
  });
});

// Click anywhere outside the dropdown to close it
document.addEventListener("click", function (event) {
  if (list.hidden) {
    return;
  }
  if (dropdown.contains(event.target)) {
    return;
  }
  closeList();
});
