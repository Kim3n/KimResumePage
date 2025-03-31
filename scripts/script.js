// Typing effect with typed.js
const typed = new Typed(".animate", {
  strings: [
    "Web Developer.",
    "Programmer.",
    "Nerd.",
    "Tech Lover.",
    "FPV pilot.",
    "Coffee Addict.",
    "VR Enthusiast.",
    "Gamer.",
  ],
  typeSpeed: 100,
  backSpeed: 100,
  loop: true,
});

const windows = {}; // Track open windows

let winboxOffsetX = 50;
let winboxOffsetY = 50;

function openProjectWindow(projectId, title) {
  const projectContent = document.querySelector(`#${projectId}`);

  if (windows[projectId] && !windows[projectId].closed) {
    windows[projectId].focus();
  } else {
    windows[projectId] = new WinBox({
      title: title,
      mount: projectContent,
      width: "900px",
      height: "600px",
      x: winboxOffsetX,
      y: winboxOffsetY,

      onclose: () => {
        windows[projectId] = null;
      },
    });

    // Offset for next window
    winboxOffsetX += 30;
    winboxOffsetY += 30;

    if (winboxOffsetX > window.innerWidth - 300) winboxOffsetX = 50;
    if (winboxOffsetY > window.innerHeight - 200) winboxOffsetY = 50;
  }
}

document.querySelector("#project1-btn").addEventListener("click", () => {
  openProjectWindow("project1-content", "Mini Message Board");
});

document.querySelector("#project2-btn").addEventListener("click", () => {
  openProjectWindow("project2-content", "Project 2");
});
