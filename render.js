var canvas = document.getElementById("screen")
var canvasLeft = canvas.offsetLeft + canvas.clientLeft
var canvasTop = canvas.offsetTop + canvas.clientTop
var elements = []
var ctx = canvas.getContext("2d")
var width = window.innerWidth
var height = window.innerHeight
var renWidth = height / 16 * 9
const pageIcons = 4
const fps = 60
const img = new Image
ctx.imageSmoothingEnabled = false

img.src = "System/wallpapers/wallpaper_1.jfif"

//RENDER
setInterval(() => {
    //Wallpaper
    height = window.innerHeight
    width = window.innerWidth
    renWidth = height / 16 * 9
    canvas.height = height
    canvas.width = renWidth
    var iconSize = renWidth / pageIcons

    //Home button
    ctx.drawImage(img, 0, 0, renWidth, height)
    ctx.beginPath();
    ctx.arc(renWidth / 2, height - 35, 10, 0, 2 * Math.PI);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#000000ff';
    ctx.stroke();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ffffffff';
    ctx.stroke();

    //Icons
    ctx.beginPath()
    for (let x = pageIcons; x > 0; x--) {
        ctx.roundRect(iconSize*x-renWidth/4.43, 200, iconSize-renWidth/20, iconSize-renWidth/20, 15);
    }

    //Draw 'em
    ctx.fillStyle = '#eed35bff'
    ctx.strokeStyle = '#eeae5bff'
    ctx.lineWidth = 3
    ctx.fill()
    ctx.stroke()

}, 1000 / fps);

elements.push({
    width: 30,
    height: 30,
    top: height - 35-15,
    left: renWidth / 2-15
})


canvas.addEventListener('click', function (event) {
    var x = event.pageX - canvasLeft
    var y = event.pageY - canvasTop
    elements.forEach(function (element) {
        if (y > element.top && y < element.top + element.height
             && x > element.left && x < element.left + element.width
        ) {
            alert("Home button clciked")
        }
    })
})