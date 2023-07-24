import { alertMsg } from "./alert.message.js";
let api = "https://url-6huw.onrender.com";
const form = document.getElementById("urlForm");
const submitButton = document.getElementById("submitButton");
const shortUrlContainer = document.getElementById("shortUrlContainer");
const copyButton = document.getElementById("copyButton");
const whatsappButton = document.getElementById("whatsappButton");
const facebookButton = document.getElementById("facebookButton");
const linkedinButton = document.getElementById("linkedinButton");
const shareButton = document.getElementById("shareButton");
const reloadbtn = document.getElementById("reloadbtn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  submitButton.innerHTML = `<span id="spinner" class="spinner"></span>`;
  const spinner = document.getElementById("spinner");
  submitButton.disabled = true; // Disable the button
  spinner.style.display = "block"; // Show the spinner

  const longUrlInput = document.getElementById("longUrl");
  const lengthInput = document.getElementById("Length");
  const aliasInput = document.getElementById("alias");

  const longUrl = longUrlInput.value.trim();
  const length = lengthInput.value.trim();
  const alias = aliasInput.value.trim();

  const response = await fetch(`${api}/shortUrl`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: longUrl,
      length: +length,
      alias: alias,
    }),
  });

  const data = await response.json();
  console.log(data.msg);
  submitButton.disabled = false; // Re-enable the button
  spinner.style.display = `none`;
  submitButton.innerHTML= 'Submit'
  let short_url;

  if (response.ok) {
    short_url = data.short_url;
    alertMsg("Short URL created successfully: ", "success");
    shortUrl.innerText = `${api}/${short_url}`;
    shortUrlContainer.style.display = "block";
  } else {
    if (data.msg == "Alias already in use") {
      alertMsg("Alias already in use:", "error");
    } else alertMsg("Error creating short URL:", "fail");
  }
});

copyButton.addEventListener("click", () => {
  const textToCopy = shortUrl.innerText;
  navigator.clipboard
    .writeText(textToCopy)
    .then(() => alertMsg("URL copied to clipboard", "success"))
    .catch((err) => console.error("Failed to copy: ", err));
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".share-dropdown")) {
    const shareDropdowns = document.querySelectorAll(".share-options");
    shareDropdowns.forEach((dropdown) => {
      dropdown.classList.remove("show-up");
    });
  }
});

whatsappButton.addEventListener("click", () => {
  const sendUrl = shortUrl.innerText;
  const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    sendUrl
  )}`;
  window.open(whatsappURL, "_blank");
});

facebookButton.addEventListener("click", () => {
  const sendUrl = shortUrl.innerText;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    sendUrl
  )}`;
  window.open(facebookURL, "_blank");
});

linkedinButton.addEventListener("click", () => {
  const sendUrl = shortUrl.innerText;
  const linkedinURL = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
    sendUrl
  )}`;
  window.open(linkedinURL, "_blank");
});

shareButton.addEventListener("click", () => {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
});
document.addEventListener("click", (event) => {
  const menu = document.getElementById("menu");

  if (!event.target.matches(".dropdown-button")) {
    menu.style.display = "none";
  }
});
document.getElementById("menu").addEventListener("click", (event) => {
  event.stopPropagation();
});

reloadbtn.addEventListener("click", () => {
  location.reload();
});
