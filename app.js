const canvas = document.querySelector("#pdf-canvas");
const form = document.querySelector(".signature-pad-form");
const clearButton = document.querySelector(".clear-button");
const pdfUpload = document.querySelector("#pdf-upload");
const ctx = canvas.getContext("2d");
let pdfDoc = null;
let pageNumber = 1;
let pdfViewport = null;
let writingMode = false;
let signatureDataUrl = "";

// Fonction pour appliquer les paramètres de couleur et d'épaisseur
const applyDrawingSettings = () => {
  const color = document.querySelector("#color").value;
  const thickness = document.querySelector("#thickness").value;
  ctx.strokeStyle = color;
  ctx.lineWidth = thickness;
};

// Charger et afficher le PDF
pdfUpload.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const fileReader = new FileReader();
  fileReader.onload = async function () {
    const typedArray = new Uint8Array(this.result);
    pdfDoc = await pdfjsLib.getDocument({ data: typedArray }).promise;
    renderPage(pageNumber);
    canvas.style.display = "block"; // Show the canvas once a PDF is uploaded
  };
  fileReader.readAsArrayBuffer(file);
});

const renderPage = async (num) => {
  const page = await pdfDoc.getPage(num);
  pdfViewport = page.getViewport({ scale: 1.5 });
  canvas.height = pdfViewport.height;
  canvas.width = pdfViewport.width;

  const renderContext = {
    canvasContext: ctx,
    viewport: pdfViewport,
  };
  await page.render(renderContext).promise;

  if (signatureDataUrl) {
    const img = new Image();
    img.src = signatureDataUrl;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
  }

  applyDrawingSettings(); // Apply drawing settings after rendering the page
};

// Dessiner la signature sur le PDF
const handlePointerDown = (e) => {
  writingMode = true;
  ctx.beginPath();
  const [positionX, positionY] = getTargetPosition(e);
  ctx.moveTo(positionX, positionY);
};

const handlePointerMove = (e) => {
  if (!writingMode) return;
  const [positionX, positionY] = getTargetPosition(e);
  ctx.lineTo(positionX, positionY);
  ctx.stroke();
};

const handlePointerUp = () => {
  writingMode = false;
  // Mettre à jour la signatureDataUrl après avoir fini de dessiner
  signatureDataUrl = canvas.toDataURL("image/png");
};

const getTargetPosition = (e) => {
  const rect = e.target.getBoundingClientRect();
  const positionX = e.clientX - rect.left;
  const positionY = e.clientY - rect.top;
  return [positionX, positionY];
};

const clearPad = () => {
  signatureDataUrl = "";
  renderPage(pageNumber);
};

// Mettre à jour la couleur et l'épaisseur en temps réel
document.querySelector("#color").addEventListener("input", (e) => {
  applyDrawingSettings();
});

document.querySelector("#thickness").addEventListener("input", (e) => {
  applyDrawingSettings();
});

// Soumettre le formulaire avec la signature
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!pdfDoc) {
    alert("Veuillez télécharger un fichier PDF.");
    return;
  }

  const pdfBytes = await pdfDoc.getData();
  const pdfLibDoc = await PDFLib.PDFDocument.load(pdfBytes);
  const pages = pdfLibDoc.getPages();
  const firstPage = pages[0];
  const { width, height } = firstPage.getSize();

  // Capturer la signature dessinée sur le canvas en tant qu'image PNG
  const signatureImage = await pdfLibDoc.embedPng(signatureDataUrl);

  // Convertir les coordonnées du canvas en coordonnées PDF
  const canvasScale = width / canvas.width;
  const signatureWidth = canvas.width * canvasScale;
  const signatureHeight = canvas.height * canvasScale;

  // Placer l'image de la signature sur le PDF à l'échelle correcte
  firstPage.drawImage(signatureImage, {
    x: 0,
    y: height - signatureHeight, // Placer la signature en bas du PDF
    width: signatureWidth,
    height: signatureHeight,
  });

  // Sauvegarder et télécharger le PDF modifié
  const modifiedPdfBytes = await pdfLibDoc.save();
  download(modifiedPdfBytes, "signed.pdf", "application/pdf");
  clearPad();
});

clearButton.addEventListener("click", (e) => {
  e.preventDefault();
  clearPad();
});

canvas.addEventListener("pointerdown", handlePointerDown, { passive: true });
canvas.addEventListener("pointerup", handlePointerUp, { passive: true });
canvas.addEventListener("pointermove", handlePointerMove, { passive: true });

function download(data, filename, type) {
  const blob = new Blob([data], { type: type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}
