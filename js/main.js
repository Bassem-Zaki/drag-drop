const dropArea = document.querySelector(".drop-area"),
  paraDrop = document.querySelector(".drop-area p"),
  browseBtn = document.querySelector(".drop-area button"),
  inputFile = document.querySelector(".drop-area input");

let file;

browseBtn.addEventListener("click", () => {
  inputFile.click();
});

inputFile.addEventListener("change", function () {
  file = this.files[0];
  showFile();
});

dropArea.addEventListener("dragover", (el) => {
  el.preventDefault();
  dropArea.classList.add("active");
  paraDrop.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("active");
  paraDrop.textContent = "Drag & Drop to Upload Files";
});

dropArea.addEventListener("drop", (el) => {
  el.preventDefault();
  file = el.dataTransfer.files[0];
  showFile();
});

function showFile() {
  let fileType = file.type;
  let validImages = [
    "image/webp",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ];
  if (validImages.includes(fileType)) {
    let fileReader = new FileReader();
    fileReader.addEventListener("load", () => {
      let fileURL = fileReader.result;
      let imgTag = `<img src="${fileURL}" alt="" draggable="true" />`;
      dropArea.innerHTML = imgTag;
    });
    fileReader.readAsDataURL(file);
  } else {
    paraDrop.textContent = "This is not an Image File";
    dropArea.classList.remove("active");
  }
}
