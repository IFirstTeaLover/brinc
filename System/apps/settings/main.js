requestAnimationFrame(settings)
var stopping = false


function settings(){ // Main app function
    ctx.beginPath()
    ctx.roundRect(renWidth/2-renWidth/2.2,height-height/1.03,renWidth/1.1,height/8, 15)
    ctx.fillStyle = '#171717'
    ctx.strokeStyle = '#0b0b0bff'
    ctx.stroke
    ctx.lineWidth = height/200
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
    ctx.roundRect(renWidth/2-renWidth/2.2,height-height/1.21,renWidth/1.1,height/8, 15)
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
    ctx.roundRect(renWidth/2-renWidth/2.2,height-height/1.47,renWidth/1.1,height/8, 15)
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