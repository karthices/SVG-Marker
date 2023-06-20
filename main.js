const start = document.getElementById("start");
const stop = document.getElementById("stop");
const container = document.getElementById("bgcontainer");
const undo = document.getElementById("undo");

const plot1 = document.getElementById("plot1");
const plot1color = document.getElementById("plot1color");

const fileInput = document.getElementById('my-file-input');
fileInput.addEventListener('change', handleFileSelect);

container.querySelector("svg").style.width = container.style.width;
container.querySelector("svg").style.height = container.style.height;

const plotpoints = [];
function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const imageUrl = event.target.result;
      const img = new Image();
      img.onload = function () {
        debugger;
      const imageWidth = img.width;
      const imageHeight = img.height;
      container.style.width = imageWidth+"px";
      container.style.height = imageHeight+"px";

    };
    img.src = imageUrl;
    container.style.backgroundImage = `url(${imageUrl})`;
    };
  
    reader.readAsDataURL(file);
  }

const generatePoints = function(){
    document.querySelectorAll(".points",function(x,y){
        y.remove();
    });

    plotpoints.forEach(element => {
        let pointsdiv = document.createElement("div");    
        pointsdiv.classList.add("points");
        pointsdiv.style.left = element.x+"px";
        pointsdiv.style.top = element.y+"px";
        container.appendChild(pointsdiv);
    });
}
start.addEventListener("click",function(e){
    container.classList.add("getpoints");
});

stop.addEventListener("click",function(e){
    container.classList.remove("getpoints");
    plot1.setAttribute("points",plotpoints.map((point)=>point.x+','+point.y).join(","));
});

undo.addEventListener("click",function(e){
    if(plotpoints.length > 0){
        plotpoints.pop();
        document.querySelector(".points:last-child").remove();
    }
    plot1.setAttribute("points",plotpoints.map((point)=>point.x+','+point.y).join(","));
});

container.addEventListener("click",function(e){
    if(container.classList.contains("getpoints")){
        plotpoints.push({x:e.clientX,y:e.clientY});
        plot1.setAttribute("points",plotpoints.map((point)=>point.x+','+point.y).join(","));
        generatePoints();
        // const div = document.createElement("div");
        // div.classList.add("points");
        // div.style.left = e.clientX+"px";
        // div.style.top = e.clientY+"px";
        // container.appendChild(div);
        // div.addEventListener("click",function(p){
            //     div.classList.add("active");
            // });
        }
    });
    
    
    plot1.addEventListener("click",function(e){
        plot1.classList.add("active");
    });

    plot1color.addEventListener("input",function(e){
        plot1.style.fill = plot1color.value;
        plot1.style.fillOpacity = 1;
    });