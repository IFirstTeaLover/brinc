var canvas = document.getElementById("screen")
var canvasLeft = canvas.offsetLeft + canvas.clientLeft
var canvasTop = canvas.offsetTop + canvas.clientTop
var elements = []
var ctx = canvas.getContext("2d")
var width = window.innerWidth
var height = window.innerHeight
var renWidth = height / 16 * 9
var mult = 3
var appAnim = false
var animationSize = 0
var appId
var inApp = false
const pageIcons = 4
const fps = 60
const img = new Image
ctx.imageSmoothingEnabled = false
function getConfig(parameter){ // fuck this shit just do it yourself
fetch('System/sysConfig.br')
  .then(response => {
    if (!response.ok) {
      console.error("Failed to load config!");
    }
    console.log("Loaded config file:", response);
    return response.json();
  })
  .then(CONFIG => {
    console.log("Parsed config:", CONFIG);
    console.log("Key:", CONFIG[parameter]);
    return CONFIG[parameter]
  })
  .catch(err => {
    console.error(err.message);
    return null
  });
}

console.log("Paper of wall is", getConfig("wallpaper"))
img.src = "System/wallpapers/wallpaper_2.jfif"

//RENDER
setInterval(() => {
    //Wallpaper
    height = window.innerHeight
    width = window.innerWidth
    renWidth = height / 16 * 9
    canvas.height = height
    canvas.width = renWidth
    ctx.drawImage(img, 0, 0, renWidth, height)
    var iconSize = renWidth / pageIcons



    //Icons
    ctx.beginPath()

    for (let y = pageIcons + 2; y > 0; y--) {
        for (let x = pageIcons; x > 0; x--) {
            ctx.roundRect((iconSize * x) / 1.07 - iconSize * 1 + (renWidth / (mult * pageIcons)), (iconSize * y) / 1.07 - iconSize * 1.02 + (renWidth / (mult * pageIcons)), iconSize - renWidth / (mult * pageIcons), iconSize - renWidth / (mult * pageIcons), 15);
            ctx.fillStyle = '#edd156ff'
            ctx.strokeStyle = '#eeae5bff'
        }
    }

    ctx.lineWidth = 3
    ctx.fill()
    ctx.stroke()


    //Open animation
    if (appAnim == true || inApp == true && !appAnim == "backwards") {
        ctx.beginPath()
        if (appId < 100) {
            ctx.roundRect(elements[appId].left - animationSize / 2, elements[appId - 1].top - animationSize / 2, elements[appId].width + animationSize, elements[appId].height + animationSize, 1000);
        }
        ctx.fillStyle = '#232323ff'
        ctx.strokeStyle = '#0d0d0dff'
        ctx.lineWidth = 30
        ctx.fill()
        ctx.stroke()
        if (animationSize < height * 2) {
            animationSize += 60
        }
    }

    //Close animation
    if (appAnim === "backwards") {
        ctx.beginPath()
        if (appId < 100 && animationSize > 0) {
            ctx.roundRect(elements[appId].left - animationSize / 2, elements[appId - 1].top - animationSize / 2, elements[appId].width + animationSize, elements[appId].height + animationSize, 1000);
        }
        ctx.fillStyle = '#232323ff'
        ctx.strokeStyle = '#0d0d0dff'
        ctx.lineWidth = 30
        ctx.fill()
        ctx.stroke()
        if (animationSize > 0) {
            animationSize -= 100
        }
        if (animationSize < 1) {
            appAnim = false
            appId = ""
            inApp = false
        }
    }
    ctx.fillStyle = "#34343487"
    ctx.fillRect(-renWidth / 2, height - 50, renWidth * 2, 100)
    ctx.fill

    //Home button
    ctx.beginPath();
    ctx.arc(renWidth / 2, height - 25, 10, 0, 2 * Math.PI);
    ctx.lineWidth = 15;
    ctx.strokeStyle = '#000000ff';
    ctx.stroke();
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#ffffffff';
    ctx.stroke();
}, 1000 / fps);

elements.push({
    width: 30,
    height: 30,
    top: height - 25 - 15,
    left: renWidth / 2 - 15,
    type: "home"
})
var iconSize = renWidth / pageIcons
for (let x = 0; x < pageIcons + 3; x++) {
    for (let y = 0; y < pageIcons + 1; y++) {
        elements.push({
            width: iconSize - renWidth / (mult * pageIcons),
            height: iconSize - renWidth / (mult * pageIcons),
            top: (iconSize * x) / 1.07 - iconSize * 1 + (renWidth / (mult * pageIcons)),
            left: (iconSize * y) / 1.07 - iconSize * 1.02 + (renWidth / (mult * pageIcons)),
            type: "icon"
        })
    }
}
function openApp(id) {
    if (!inApp) {
        appId = id - 1
        animationSize = 0
        appAnim = true
        inApp = true
    }
}

function closeApp() {
    appAnim = "backwards"
}

canvas.addEventListener('click', function (event) {
    var x = event.pageX - canvasLeft
    var y = event.pageY - canvasTop
    var i = 1
    elements.forEach(function (element) {
        console.log("ok")
        if (y > element.top && y < element.top + element.height
            && x > element.left && x < element.left + element.width
        ) {
            if (element.type == "home") {
                closeApp()
            } else if (element.type == "icon") {
                openApp(i)
            }
        }
        i++
    })
})