const STORAGE_KEY = "task22_lanes";
const DEFAULT_LANES = ["learnprogramming", "javascript"];

const lanesBoard = document.getElementById("lanes-board");
const addLaneBtn = document.getElementById("add-lane-btn");
const addDialog = document.getElementById("add-dialog");
const addForm = document.getElementById("add-form");
const subredditInput = document.getElementById("subreddit-input");
const addError = document.getElementById("add-error");

let lanes = [];

const upArrowSvg = `
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 4l-8 8h6v8h4v-8h6z"/>
  </svg>
`;

const normalizeName = (raw) => {
  let name = raw.trim().toLowerCase();
  if (name.startsWith("/r/")) {
    name = name.slice(3);
  } else if (name.startsWith("r/")) {
    name = name.slice(2);
  }
  return name;
};

const saveLanes = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lanes));
};

const loadLanesFromStorage = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  lanes = saved ? JSON.parse(saved) : DEFAULT_LANES.slice();

  if (!Array.isArray(lanes) || lanes.length === 0) {
    lanes = DEFAULT_LANES.slice();
  }

  if (!saved) {
    saveLanes();
  }
};

const redditJsonUrl = (name) =>
  `https://www.reddit.com/r/${name}.json?limit=20&raw_json=1`;

const getPosts = async (name) => {
  const url = redditJsonUrl(name);

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (firstError) {
    const backupUrl = `https://api.reddit.com/r/${name}.json?limit=20&raw_json=1`;
    try {
      const { data } = await axios.get(backupUrl);
      return data;
    } catch (secondError) {
      return null;
    }
  }
};

const makePostList = (json) => {
  const kids = json && json.data ? json.data.children : [];
  const posts = [];

  for (const child of kids.slice(0, 20)) {
    const d = child.data;
    posts.push({
      title: d.title,
      author: d.author,
      ups: d.ups,
      url: `https://www.reddit.com${d.permalink}`,
    });
  }

  return posts;
};

const showLaneText = (laneEl, text, isError) => {
  const body = laneEl.querySelector(".lane__body");
  const extraClass = isError ? " lane__status--error" : "";
  body.innerHTML = `<p class="lane__status${extraClass}">${text}</p>`;
};

const showLanePosts = (laneEl, posts) => {
  const body = laneEl.querySelector(".lane__body");
  let html = '<ul class="post-list">';

  for (const post of posts) {
    html += `
      <li class="post-card">
        <div class="post-card__votes">${upArrowSvg}<span>${post.ups}</span></div>
        <p class="post-card__title">
          <a href="${post.url}" target="_blank" rel="noopener noreferrer">${post.title}</a>
        </p>
        <p class="post-card__author">u/${post.author}</p>
      </li>
    `;
  }

  html += "</ul>";
  body.innerHTML = html;
};

const loadLane = async (name) => {
  const laneEl = lanesBoard.querySelector(`[data-subreddit="${name}"]`);
  if (!laneEl) {
    return;
  }

  laneEl.classList.add("lane--loading");
  showLaneText(laneEl, "Loading posts…", false);

  const json = await getPosts(name);
  const posts = json ? makePostList(json) : [];

  if (posts.length === 0) {
    showLaneText(
      laneEl,
      json
        ? "No posts found for this subreddit."
        : "Could not load Reddit. Check the name and try again.",
      true
    );
  } else {
    showLanePosts(laneEl, posts);
  }

  laneEl.classList.remove("lane--loading");
};

const createLaneHtml = (name) => {
  return `
    <article class="lane" data-subreddit="${name}">
      <header class="lane__header">
        <h2 class="lane__title">/r/${name}</h2>
        <div class="lane__menu-wrap">
          <button type="button" class="lane__menu-btn" data-action="toggle-menu" aria-label="Lane options">⋮</button>
          <div class="lane__dropdown" hidden>
            <button type="button" data-action="refresh">Refresh</button>
            <button type="button" data-action="delete">Delete</button>
          </div>
        </div>
      </header>
      <div class="lane__body">
        <p class="lane__status">Loading posts…</p>
      </div>
    </article>
  `;
};

const renderBoard = () => {
  let html = "";
  for (const name of lanes) {
    html += createLaneHtml(name);
  }
  lanesBoard.innerHTML = html;

  for (const name of lanes) {
    loadLane(name);
  }
};

const deleteLane = (name) => {
  const i = lanes.indexOf(name);
  if (i > -1) {
    lanes.splice(i, 1);
    saveLanes();
    renderBoard();
  }
};

const closeAllMenus = () => {
  const menus = document.querySelectorAll(".lane__dropdown");
  for (const menu of menus) {
    menu.hidden = true;
  }
};

const showAddError = (message) => {
  addError.textContent = message;
  addError.hidden = message ? false : true;
};

const addLane = async (rawName) => {
  const name = normalizeName(rawName);

  if (!name) {
    showAddError("Please enter a subreddit name.");
    return;
  }

  if (lanes.includes(name)) {
    showAddError("This subreddit is already on your board.");
    return;
  }

  const json = await getPosts(name);
  const posts = json ? makePostList(json) : [];

  if (posts.length === 0) {
    showAddError(
      json
        ? "No posts found for this subreddit."
        : "Subreddit not found or could not load."
    );
    return;
  }

  lanes.push(name);
  saveLanes();
  addDialog.close();
  renderBoard();
};

lanesBoard.addEventListener("click", (event) => {
  const action = event.target.dataset.action;
  if (!action) {
    return;
  }

  const laneEl = event.target.closest(".lane");
  if (!laneEl) {
    return;
  }

  const name = laneEl.dataset.subreddit;

  if (action === "toggle-menu") {
    const dropdown = laneEl.querySelector(".lane__dropdown");
    const isClosed = dropdown.hidden;
    closeAllMenus();
    dropdown.hidden = isClosed ? false : true;
    return;
  }

  if (action === "refresh") {
    closeAllMenus();
    loadLane(name);
    return;
  }

  if (action === "delete") {
    closeAllMenus();
    deleteLane(name);
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".lane__menu-wrap")) {
    closeAllMenus();
  }
});

addLaneBtn.addEventListener("click", () => {
  subredditInput.value = "";
  showAddError("");
  addDialog.showModal();
  subredditInput.focus();
});

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addLane(subredditInput.value);
});

loadLanesFromStorage();
renderBoard();
