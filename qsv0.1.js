// Function to render HTML content from an embed into the drop zone
function renderHTMLFromEmbed(element) {
  // Clear the drop zone
  var dropZone = document.getElementById('drop-zone');
  dropZone.innerHTML = '';

  // Find the embed element inside the provided element
  var embedElement = element.querySelector('.component-html.w-embed');

  if (embedElement) {
    // Get the text content of the embed element
    var htmlText = embedElement.textContent.trim();

    // Create a temporary element to render the HTML content
    var tempElement = document.createElement('div');
    tempElement.innerHTML = htmlText;

    // Append the rendered HTML content to the drop zone
    dropZone.appendChild(tempElement);
  }

  // Remove the 'active' class from the last clicked card
  if (renderHTMLFromEmbed.lastClickedCard) {
    renderHTMLFromEmbed.lastClickedCard.classList.remove('active');
  }

  // Add the 'active' class to the clicked card
  element.classList.add('active');

  // Store a reference to the last clicked card
  renderHTMLFromEmbed.lastClickedCard = element;
}

document.addEventListener("DOMContentLoaded", function () {
  // Find the first element with class 'library-main_card'
  let currentComponent = document.querySelector('.library-side_card');

  // Add class 'active' to it
  if (currentComponent) {
    renderHTMLFromEmbed(currentComponent);
  }

  // Find all elements with class '.library-side_card'
  var cardElements = document.querySelectorAll('.library-side_card');

  // Add click event listeners to each card element
  cardElements.forEach(function (card) {
    card.addEventListener('click', function () {
      // Call the render function with the clicked card element
      renderHTMLFromEmbed(this);
    });
  });
});