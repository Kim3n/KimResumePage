const getComputedStyleValue = (property) =>
  getComputedStyle(document.documentElement).getPropertyValue(property).trim();

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
    width: isMobile ? window.innerWidth * 0.9 : window.innerWidth * 0.5,
    height: isMobile ? window.innerHeight * 0.8 : window.innerHeight * 0.5,
    isMobile,
  };
}

// Function to calculate the position of the window based on its index
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
      this.setBackground(getComputedStyleValue("--primary-color"));
    },
    onblur: function () {
      this.setBackground(getComputedStyleValue("--tertiary-color"));
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

    // // Update position
    // const position = getWindowPosition(index, winbox, dimensions.isMobile);
    // winbox.move(position.x, position.y);
  });
});

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
  openProjectWindow("project4-content", "User Manuals App");
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

// Theme and Mask toggle functionality

const buttonBrightness = document.querySelector("[data-theme-toggle]");
const buttonMask = document.querySelector("[data-mask-toggle]");
let isMaskOn = true;
const body = document.body;
const localStorageTheme = localStorage.getItem("theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
const lightModeWarning = document.querySelector("#lightModeWarning");

function calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
}) {
  if (localStorageTheme !== null) {
    return localStorageTheme;
  }
  if (systemSettingDark.matches) {
    return "dark";
  }
  return "light";
}

function updateBrightnessButton({ isDark }) {
  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");
  sunIcon.style.display = isDark ? "block" : "none";
  moonIcon.style.display = isDark ? "none" : "block";
}

function updateMaskButton({ isMaskOn }) {
  const maskOnIcon = document.getElementById("mask-on-icon");
  const maskOffIcon = document.getElementById("mask-off-icon");
  maskOnIcon.style.display = isMaskOn ? "block" : "none";
  maskOffIcon.style.display = isMaskOn ? "none" : "block";
}

function updateThemeOnHtmlEl({ theme }) {
  document.querySelector("html").setAttribute("data-theme", theme);
}

let currentThemeSetting = calculateSettingAsThemeString({
  localStorageTheme,
  systemSettingDark,
});

updateBrightnessButton({
  buttonEl: buttonBrightness,
  isDark: currentThemeSetting === "dark",
});
updateThemeOnHtmlEl({ theme: currentThemeSetting });

buttonBrightness.addEventListener("click", (event) => {
  const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
  localStorage.setItem("theme", newTheme);
  updateBrightnessButton({ isDark: newTheme === "dark" });
  updateThemeOnHtmlEl({ theme: newTheme });
  currentThemeSetting = newTheme;
  if (currentThemeSetting === "light") {
    lightModeWarning.style.display = "block";
    setTimeout(() => {
      lightModeWarning.style.display = "none";
    }, 3000);
  }
});

buttonMask.addEventListener("click", (event) => {
  updateMaskButton({ isMaskOn });

  body.classList.toggle("no-mask");
  isMaskOn = !isMaskOn;
});

//SCROLL TO TOP BUTTON
const scrollToTopButton = document.querySelector("#scrollToTopBtn");
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
scrollToTopButton.addEventListener("click", scrollToTop);

// Show or hide the button based on scroll position
const toggleScrollToTopButton = () => {
  if (
    document.body.scrollTop > 600 ||
    document.documentElement.scrollTop > 600
  ) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
};

window.onscroll = toggleScrollToTopButton;
