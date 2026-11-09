let contentDisplay = document.getElementById("contentDisplay");
let tabs = document.getElementsByClassName("tab");

const showPage = (id) => {
  let html = "";

  dummyData.forEach((item) => {
    if (item.id === id) {
      html = `<h2>${item.name}</h2>
              <p>${item.content}</p>`;
    }
  });

  contentDisplay.innerHTML = html;

  [...tabs].forEach((tab) => {
    tab.className = tab.id === `tab-${id}` ? "tab active" : "tab";
  });
};

showPage(1);