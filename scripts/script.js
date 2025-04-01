// Typing effect with typed.js
const typed = new Typed(".animate", {
  strings: [
    "Kim Andre Lademo.",
    "a Web Developer.",
    "available for hire.",
    "a Nerd.",
    "a Tech Lover.",
    "a FPV pilot.",
    "a Programmer.",
    "a Coffee Addict.",
    "a VR Enthusiast.",
    "a Gamer.",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  // cursorChar: "_",
  loop: true,
});

const windows = {};
let availableIndexes = [];
let maxIndex = 0;
const WINDOWS_PER_COLUMN = 5;

function debounce(func, timeout = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
}

function calculateDimensions() {
  const isMobile = window.innerWidth <= 768;
  return {
    width: isMobile ? window.innerWidth * 0.9 : window.innerWidth * 0.6,
    height: isMobile ? window.innerHeight * 0.8 : window.innerHeight * 0.7,
    isMobile,
  };
}

function getWindowPosition(index, winbox, isMobile) {
  if (isMobile) return { x: "center", y: "center" };

  const baseOffset = 30;
  const column = Math.floor(index / WINDOWS_PER_COLUMN);
  const row = index % WINDOWS_PER_COLUMN;

  let xOffset = baseOffset + column * 30;
  let yOffset = baseOffset + row * 30;

  // Ensure window stays within viewport bounds
  const maxX = window.innerWidth - winbox.width - 20;
  const maxY = window.innerHeight - winbox.height - 20;

  return {
    x: Math.min(xOffset, maxX),
    y: Math.min(yOffset, maxY),
  };
}

function openProjectWindow(projectId, title) {
  const projectContent = document.querySelector(`#${projectId}`);
  if (!projectContent) return;

  const dimensions = calculateDimensions();

  if (windows[projectId] && !windows[projectId].winbox.closed) {
    windows[projectId].winbox.focus();
    return;
  }

  const index =
    availableIndexes.length > 0 ? availableIndexes.shift() : maxIndex++;

  const winbox = new WinBox({
    title: title,
    mount: projectContent,
    background: "#005f00",
    border: 2,
    width: dimensions.width,
    height: dimensions.height,
    onclose: () => {
      availableIndexes.push(index);
      availableIndexes.sort((a, b) => a - b);
      delete windows[projectId];
    },
    onfocus: function () {
      // Change to focused color
      this.setBackground("#00b015");
    },
    onblur: function () {
      // Revert to default color
      this.setBackground("#005f00");
    },
  });

  const position = getWindowPosition(index, winbox, dimensions.isMobile);
  winbox.move(position.x, position.y);

  windows[projectId] = { winbox, index };
}

const handleResize = debounce(() => {
  const dimensions = calculateDimensions();

  Object.entries(windows).forEach(([projectId, { winbox, index }]) => {
    if (!winbox || winbox.closed) return;

    // Update window size
    winbox.resize(dimensions.width, dimensions.height);

    // Update position
    const position = getWindowPosition(index, winbox, dimensions.isMobile);
    winbox.move(position.x, position.y);
  });
});

window.addEventListener("resize", handleResize);

window.addEventListener("resize", handleResize);

document.querySelector("#project1-btn").addEventListener("click", () => {
  openProjectWindow("project1-content", "Mini Message Board");
});

document.querySelector("#project2-btn").addEventListener("click", () => {
  openProjectWindow("project2-content", "Duodedra");
});

document.querySelector("#project3-btn").addEventListener("click", () => {
  openProjectWindow("project3-content", "Petplus Store");
});
document.querySelector("#project4-btn").addEventListener("click", () => {
  openProjectWindow("project4-content", "Portfolio");
});
document.querySelector("#project5-btn").addEventListener("click", () => {
  openProjectWindow("project5-content", "Portfolio");
});
document.querySelector("#project6-btn").addEventListener("click", () => {
  openProjectWindow("project6-content", "Portfolio");
});
document.querySelector("#project7-btn").addEventListener("click", () => {
  openProjectWindow("project7-content", "Portfolio");
});
document.querySelector("#project8-btn").addEventListener("click", () => {
  openProjectWindow("project8-content", "Portfolio");
});
document.querySelector("#project9-btn").addEventListener("click", () => {
  openProjectWindow("project9-content", "Portfolio");
});
document.querySelector("#project10-btn").addEventListener("click", () => {
  openProjectWindow("project10-content", "Portfolio");
});
