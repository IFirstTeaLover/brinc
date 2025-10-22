var canvas = document.getElementById("screen")
var canvasLeft = canvas.offsetLeft + canvas.clientLeft
var canvasTop = canvas.offsetTop + canvas.clientTop
var elements = []
var icons = []
var ctx = canvas.getContext("2d")
var width = window.innerWidth
var height = window.innerHeight
var renWidth = height / 16 * 9
var mult = 3
var appAnim = false
var animationSize = 0
var appId
var inApp = false
var iconAmount = 0
var isDev = false
var data
const pageIcons = 4
const fps = 60
const img = new Image
ctx.imageSmoothingEnabled = false

function getConfig(parameter){
fetch('System/sysConfig.br')
  .then(response => {
    if (!response.ok) throw new Error("Failed to load config!")
    return response.json();
  })
  .then(data => {
    img.src = data["wallpaper"]
    console.log("Key:", data[parameter]);
    return data[parameter]
  })
  .catch(err => {
    console.error(err.message);
    return null
  });
  return false

}

console.log("Paper of wall is", getConfig("wallpaper"))

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

    let x = 0
    let y = 1
    icons.forEach(function () {
        x++
        if (x > pageIcons){
            x = 1
            y++
        }
        ctx.roundRect((iconSize * x) / 1.07 - iconSize * 1 + (renWidth / (mult * pageIcons)), (iconSize * y) / 1.07 - iconSize * 1.02 + (renWidth / (mult * pageIcons)), iconSize - renWidth / (mult * pageIcons), iconSize - renWidth / (mult * pageIcons), height/46);
        ctx.fillStyle = '#edd156ff'
        ctx.strokeStyle = '#eeae5bff'
    })

    ctx.lineWidth = height/231
    ctx.fill()
    ctx.stroke()


    //Open animation
    if (appAnim == true || inApp == true && !appAnim == "backwards") {
        ctx.beginPath()
        if (appId < 100) {
            ctx.roundRect(elements[appId].left - animationSize / 2, elements[appId].top - animationSize / 2, elements[appId].width + animationSize, elements[appId].height + animationSize, 1000);
        }
        ctx.fillStyle = '#232323ff'
        ctx.strokeStyle = '#0d0d0dff'
        ctx.lineWidth = height/23
        ctx.fill()
        ctx.stroke()
        if (animationSize < height * 2) {
            animationSize += height/11.6
        }
    }

    //Close animation
    if (appAnim === "backwards") {
        ctx.beginPath()
        if (appId < 100 && animationSize > 0) {
            ctx.roundRect(elements[appId].left - animationSize / 2, elements[appId].top - animationSize / 2, elements[appId].width + animationSize, elements[appId].height + animationSize, 1000);
        }
        ctx.fillStyle = '#232323ff'
        ctx.strokeStyle = '#0d0d0dff'
        ctx.lineWidth = height/23
        ctx.fill()
        ctx.stroke()
        if (animationSize > 0) {
            animationSize -= height/6.9
        }
        if (animationSize < 1) {
            appAnim = false
            appId = ""
            inApp = false
        }
    }

    //debugging
    if (isDev){
        var iconSize = renWidth / pageIcons
        for (let x = 0; x < pageIcons; x++) {
            for (let y = 0; y < pageIcons + 2; y++) {
                ctx.fillRect(iconSize - renWidth / (mult * pageIcons),iconSize - renWidth / (mult * pageIcons),(iconSize * ((iconAmount % pageIcons)+1)) / 1.07 - iconSize * 1 + (renWidth / (mult * pageIcons)),(iconSize * ((Math.floor(iconAmount / pageIcons))+1)) / 1.07 - iconSize * 1.02 + (renWidth / (mult * pageIcons)))
                ctx.fillStyle = '#ff0000ff'
                ctx.strokeStyle = '#000000ff'   
    }
        }
    }

    //Remote Drawing
    function createRectAt(x, y, w, h, c, s, l, f) {
        ctx.beginPath()
        ctx.fillStyle = c
        ctx.strokeStyle = s
        ctx.lineWidth = l
        ctx.rect(x, y, w, h)
        if (f) ctx.fill()
        ctx.stroke()
    }
    //createRectAt(100, 100, 100, 100, "#eb4034", "#5634ebff",10,true)

    ctx.fillStyle = "#34343487"
    ctx.fillRect(-renWidth / 2, height - height/14, renWidth * 2, 100)
    ctx.fill

    //Home button
    ctx.beginPath();
    ctx.arc(renWidth / 2, height - height/28, height/69.5, 0, 2 * Math.PI);
    ctx.lineWidth = height/46;
    ctx.strokeStyle = '#000000ff';
    ctx.stroke();
    ctx.lineWidth = height/87;
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

addIcon(iconSize - renWidth / (mult * pageIcons),(iconSize * ((iconAmount % pageIcons)+1)) / 1.07 - iconSize * 1 + (renWidth / (mult * pageIcons)),(iconSize * ((Math.floor(iconAmount / pageIcons))+1)) / 1.07 - iconSize * 1.02 + (renWidth / (mult * pageIcons)))
addIcon(iconSize - renWidth / (mult * pageIcons),(iconSize * ((iconAmount % pageIcons)+1)) / 1.07 - iconSize * 1 + (renWidth / (mult * pageIcons)),(iconSize * ((Math.floor(iconAmount / pageIcons))+1)) / 1.07 - iconSize * 1.02 + (renWidth / (mult * pageIcons)))
addIcon(iconSize - renWidth / (mult * pageIcons),(iconSize * ((iconAmount % pageIcons)+1)) / 1.07 - iconSize * 1 + (renWidth / (mult * pageIcons)),(iconSize * ((Math.floor(iconAmount / pageIcons))+1)) / 1.07 - iconSize * 1.02 + (renWidth / (mult * pageIcons)))
addIcon(iconSize - renWidth / (mult * pageIcons),(iconSize * ((iconAmount % pageIcons)+1)) / 1.07 - iconSize * 1 + (renWidth / (mult * pageIcons)),(iconSize * ((Math.floor(iconAmount / pageIcons))+1)) / 1.07 - iconSize * 1.02 + (renWidth / (mult * pageIcons)))
addIcon(iconSize - renWidth / (mult * pageIcons),(iconSize * ((iconAmount % pageIcons)+1)) / 1.07 - iconSize * 1 + (renWidth / (mult * pageIcons)),(iconSize * ((Math.floor(iconAmount / pageIcons))+1)) / 1.07 - iconSize * 1.02 + (renWidth / (mult * pageIcons)))

function addIcon(w, l, t) {
    elements.push({
        width: w,
        height: w,
        top: t,
        left: l,
        type: "icon"
    })

    icons.push({
        width: w,
        height: w,
        top: t,
        left: l,
        type: "icon"
    })
    iconAmount++
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
