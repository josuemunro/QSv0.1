let currentJSON;

function convertToHtml(jsonData) {
  let html = "";

  function getClassNames(classIds) {
      if (!classIds || classIds.length === 0) return "";
      return classIds.map(classId => {
          const style = jsonData.payload.styles.find(style => style._id === classId);
          return style ? style.name : "";
      }).join(" ");
  }

  function generateHtml(node) {
      let elementHtml = `<${node.tag}`;
      const classNames = getClassNames(node.classes);
      if (classNames) {
          elementHtml += ` class='${classNames}'`;
      }
      if (node.link && node.link.url) {
          elementHtml += ` href='${node.link.url}'`;
      }
      if (node._id) {
          elementHtml += ` id='${node._id}'`;
      }
      elementHtml += `>${node.v || ''}`;

      if (node.children) {
          for (const childId of node.children) {
              const childNode = jsonData.payload.nodes.find(n => n._id === childId);
              if (childNode) {
                  if (childNode.text) {
                      elementHtml += `${childNode.v}`;
                  } else {
                      elementHtml += generateHtml(childNode);
                  }
              }
          }
      }

      elementHtml += `</${node.tag}>`;
      return elementHtml;
  }

  for (const node of jsonData.payload.nodes) {
      html += generateHtml(node);
  }

  return html;
}

// Clears dropzone and renders current element's HTML inside
function updateDropZone(json) {
  // Clear the drop zone
  updateDropZone.dropzone.innerHTML = '';

  // Create a temporary element to render the HTML content
  let tempElement = document.createElement('div');
  tempElement.innerHTML = convertToHtml(json);

  // Append the rendered HTML content to the drop zone
  updateDropZone.dropzone.appendChild(tempElement);

}

// Sets currentJSON to the element's JSON
function setCurrentJSON(element) {
  // Find the embed element inside the provided element
  let jsonEmbedElement = element.querySelector('.component-json.w-embed');

  if (jsonEmbedElement) {
    // Get the text content of the embed element
    let jsonText = jsonEmbedElement.textContent.trim();
    return JSON.parse(jsonText);
  }
}

// Sets active styling, renders active element HTML to drop zone, sets JSON to active element JSON, saves HTML changes and saves JSON changes
function currentComponent(element) {

  // Remove the 'active' class from the last clicked card
  if (currentComponent.lastClicked) {
    currentComponent.lastClicked.classList.remove('active');
  }

  // Add the 'active' class to the clicked card
  element.classList.add('active');

  // Store a reference to the last clicked card
  currentComponent.lastClicked = element;

  // Set currentJson to element's embedded JSON
  currentComponent.Json = setCurrentJSON(element);
  //console.log(currentComponent.Json);

  updateDropZone(currentComponent.Json);
}

document.addEventListener("DOMContentLoaded", function () {

  // Find the first element with class 'library-main_card'
  let firstComponent = document.querySelector('.library-side_card');
  const copyButton = document.getElementById('copy-button');

  updateDropZone.dropzone = document.getElementById('drop-zone');

  // Add class 'active' to it
  if (firstComponent) {
    currentComponent(firstComponent);
  }

  // Find all elements with class '.library-side_card'
  var cardElements = document.querySelectorAll('.library-side_card');

  // Add click event listeners to each card element
  cardElements.forEach(function (card) {
    card.addEventListener('click', function () {
      // Call the render function with the clicked card element
      currentComponent(this);
    });
  });

  // Copying functionality
  copyButton.addEventListener('click', event => {
    event.preventDefault();
    console.log("Button clicked");

    document.addEventListener('copy', event => {
      console.log("Object copied");
      if (event.clipboardData) {
        event.clipboardData.setData('application/json', JSON.stringify(currentComponent.Json));
      } else if (window.clipboardData) {
        window.clipboardData.setData('application/json', JSON.stringify(currentComponent.Json));
      }
      event.preventDefault();
    });

    document.execCommand('copy');
  });
});