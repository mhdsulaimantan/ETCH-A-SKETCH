const squareRange = document.querySelector("#squares-range");
const squaresText = document.querySelectorAll(".square-num");

const container = document.getElementById("container");

// Create elements in the container with the default value of square range
gridBoxes(squareRange.value); 

let color;

// Create event listeners for the color section
const buttons = document.getElementById("colors-section").querySelectorAll("button");
for(const btn of buttons){
    btn.addEventListener('click', () =>{
        // Change the background for the clicked button to pick and font color to black
        btn.style.cssText = "background-color: pink; color: black;";
        
        // Give the color variable a value based on the clicked button   
        if(btn.id === "black-color-btn") color = "black";
        
        else if(btn.id === "random-color-btn"){
            color = "random";
        }

        else if(btn.id === "erase-btn") color = "white";
        
        else if(btn.id === "reset-btn") {
            // get all elements on the container and change their background to white
            document.querySelectorAll(".sqr").forEach((sqr) => {
                sqr.style.background = "white";
            });
            color = "";
        }
        
        // change the background for the other button that didn't click to its default
        for(const b of buttons){
            if(b.id === "reset-btn" || b !== btn) {
                b.style.background = "";
            }
        }

        // send the color value to change the mouse color
        mouseColor(color);

        // because this section contain an input and not a button 
        document.getElementById("pick-color").style.cssText = "background-color: whitesmoke;";
    });
}

// Create an event listener for the pick color input
const pickedColor = document.getElementById("selected-color");
pickedColor.addEventListener('change', () => { 
    document.getElementById("pick-color").style.cssText = "background-color: pink; color: black;";
    for(const b of buttons){
        b.style.background = "whitesmoke";
    }
    color = pickedColor.value;
    mouseColor(color);
});

// Create an event listener for the input range (square range)
squareRange.addEventListener('change', () => {
    squaresText.forEach((squareText) => {
        
        // change the value of the square text 
        squareText.textContent = squareRange.value;
    });
    
    // reset the element that have been created in the container before
    container.replaceChildren();
    
    // Create new elements in the container with the new square value input 
    gridBoxes(squareRange.value);

    // keep the same color used before 
    mouseColor(color);
});

function gridBoxes(boxesNum){
    // fixed values for the container
    const containerWidth = 500;
    const containerHeight = 500;

    // Create a box with specific width,height and add class to it called sqr 
    const square = document.createElement("div");
    square.style.cssText = "width: " + containerWidth / boxesNum + "px; height: " + containerHeight / boxesNum + "px;";
    square.classList.add("sqr");
    
    // Create the same element to fill the container and add them to the container
    for(let i = 1; i <= boxesNum * boxesNum; i++) {
        container.appendChild(square.cloneNode(true));
    }
}

function mouseColor(color){
    // get all the element inside the container
    const allCreatedSquares = document.querySelectorAll(".sqr");
    
    // Create event listener when mouse hover on the elements
    allCreatedSquares.forEach((sqr) => {
        sqr.addEventListener('mouseover', () => {
            
            // Generate random color for each element when the color value is random
            if(color === "random"){
                const letters = '0123456789ABCDEF';
                randomColor = '#';
                for (let i = 0; i < 6; i++) {
                    randomColor += letters[Math.floor(Math.random() * 16)];
                }
                sqr.style.background = randomColor;
            }
 
            else{
                sqr.style.background = color;
            }
        });
    });
}



