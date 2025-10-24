requestAnimationFrame(settings)
var stopping = false
try{
    const ipath = "System/icons"//icons path
}catch{}

newButton(0,0, 9999, 9999, "settingsButton", "SB1")

var camY = 0
function settings(){ // Main app function
    const buttonWidth = renWidth/2-renWidth/2.2
    ctx.beginPath()
    ctx.rect(0,0,renWidth,height)
    ctx.fillStyle = 'rgba(12, 13, 15, 0.73)'
    ctx.fill()
    ctx.beginPath()
    ctx.roundRect(buttonWidth,(height-height/1.03)-camY,renWidth/1.1,height/8, 15)
    ctx.fillStyle = '#1b1b1cff'
    ctx.strokeStyle = '#232325ff'
    editButton(buttonWidth,(height-height/1.03)-camY, (renWidth/1.1)-buttonWidth/2, height/8 - height/4, "settingsButton")
    ctx.stroke
    ctx.lineWidth = height/200
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
    ctx.roundRect(buttonWidth,(height-height/1.21)-camY,renWidth/1.1,height/8, 15)
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
    ctx.roundRect(buttonWidth,(height-height/1.47)-camY,renWidth/1.1,height/8, 15)
    ctx.fill()
    ctx.stroke()
    if (!stopping){
        requestAnimationFrame(() => settings());
    }
}



function stopApp(){
    console.log("Stopping!")
    stopping = true
}