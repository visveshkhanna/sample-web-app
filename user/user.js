const user = {
  name: "Test Student",
  progress: 50,
};

const userHandler = {
  set(target, prop, value) {
    if (prop === "progress") {
      if (typeof value !== "number" || value < 0 || value > 100) {
        throw new Error("Invalid progress value. Must be between 0 and 100.");
      }
    }
    target[prop] = value;
    return true;
  },
};

const userProxy = new Proxy(user, userHandler);

document.getElementById("userName").innerText = `Name: ${userProxy.name}`;
document.getElementById(
  "userProgress"
).innerText = `Progress: ${userProxy.progress}%`;

document.getElementById("updateProgress").addEventListener("click", () => {
  const progressInput = document.getElementById("progressInput").value;
  try {
    userProxy.progress = Number(progressInput);
    document.getElementById(
      "userProgress"
    ).innerText = `Progress: ${userProxy.progress}%`;
  } catch (error) {
    alert(error.message);
  }
});
