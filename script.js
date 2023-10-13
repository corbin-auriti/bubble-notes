const bubble = document.querySelector('bubble');
const createButton = document.querySelector('.create-bubble');

createButton.addEventListener('click', createBubble);

let offsetX, offsetY;

function createBubble() {
    let bubble = document.createElement('div');
    bubble.className = 'bubble';
    document.body.appendChild(bubble);
    bubble.contentEditable = 'true';
  
    // Randomly position bubble within container
    const container = document.querySelector('.container');
    const left = Math.random() * container.offsetWidth;
    const top = Math.random() * container.offsetHeight;
    bubble.style.left = left + 'px';
    bubble.style.top = top + 'px';
  
    // Randomly color the bubble
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 100);
    const lightness = 75; // keep it pastel
    bubble.style.backgroundColor = `hsl(${hue}, ${saturation}%,     ${lightness}%)`;
    
    // Append the new bubble to the container
    container.appendChild(bubble);
    bubble.addEventListener('mousedown', handleMousedown);
    bubble.addEventListener('input', handleInput);
    bubble.addEventListener('keydown', keyPress);
    return bubble;
}

function keyPress(e) {
  const bubble = e.target;
  if (bubble.keyCode == 46) {  //Check to see if the delete key was pressed
    alert('Delete key released');
      document.removeChild(bubble);   //Remove the bubble element from the document
  }
}

function handleInput(e) {
  const bubble = e.target;
  const textLength = bubble.textContent.length;
  
  // Increase size based on text length and add minimum size of 100px
  const size = Math.max(textLength * 2, 100);
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  
  // Handle word wrapping
  bubble.style.wordWrap = "break-word";
  bubble.style.whiteSpace = "pre-wrap";
  bubble.style.overflowWrap = "break-word";
  bubble.style.display = "block";
  bubble.style.overflowY = "scroll";

  // Center the text with padding
  bubble.style.padding = '20px';
  bubble.style.textAlign = 'center';
}

function handleMousedown(e) {
  let bubble = e.target;
  offsetX = bubble.offsetLeft - e.clientX;
  offsetY = bubble.offsetTop - e.clientY;

  document.addEventListener('mousemove', handleMousemove);
  document.addEventListener('mouseup', handleMouseup);
}

function handleMousemove(e) {
  let bubble = e.target;
  bubble.style.left = e.clientX + offsetX + 'px';
  bubble.style.top = e.clientY + offsetY + 'px';
}

function handleMouseup() {
  document.removeEventListener('mousemove', handleMousemove);
  document.removeEventListener('mouseup', handleMouseup);
}

