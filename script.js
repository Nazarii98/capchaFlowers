let selectedImages = [];

function selectImage(img) {
  if (selectedImages.includes(img.src)) {
    selectedImages = selectedImages.filter((src) => src !== img.src);
    img.classList.remove("selected");
  } else {
    if (selectedImages.length < 3) {
      selectedImages.push(img.src);
      img.classList.add("selected");
    } else {
      alert("You can choose only 3 items");
    }
  }
  updateSelectedImages();
}

function updateSelectedImages() {
  const selectedImagesContainer = document.getElementById("selected-images");
  selectedImagesContainer.innerHTML = "";
  selectedImages.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Вибране зображення";
    img.style.width = "50px";
    img.style.height = "50px";
    img.style.borderRadius = "5px";
    selectedImagesContainer.appendChild(img);
  });
}

function submitCaptcha() {
  if (selectedImages.length !== 3) {
    alert("Choose 3 pictures");
    return;
  }

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ images: selectedImages }),
  };

  fetch("https://capchaserver.onrender.com/submit-captcha", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      document.getElementById("title").classList.add("hidden");
      document.getElementById("subtitle").classList.add("hidden");
      document.getElementById("captcha-container").classList.add("hidden");
      document.getElementById("result-message").classList.remove("hidden");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
