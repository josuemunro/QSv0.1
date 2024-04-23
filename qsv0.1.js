// Function to render HTML content from an embed into the drop zone
function renderHTMLFromEmbed(element) {
  // Find the embed element inside the provided element
  const embedElement = element.querySelector('.component-html.w-embed');

  console.log(embedElement);

  if (embedElement) {
    // Get the text content of the embed element
    var htmlText = embedElement.textContent.trim();

    // Create a temporary element to render the HTML content
    var tempElement = document.createElement('div');
    tempElement.innerHTML = htmlText;

    // Find the drop zone element
    const dropZone = document.getElementById('drop-zone');

    // Append the rendered HTML content to the drop zone
    dropZone.appendChild(tempElement);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Find the first element with class 'library-main_card'
  let currentComponent = document.querySelector('.library-main_card');

  // Add class 'active' to it
  if (currentComponent) {
    currentComponent.classList.add('active');
    renderHTMLFromEmbed(currentComponent);
  }
});