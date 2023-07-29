
    
    
// Render graphics
function draw(fps, t) {
   var ctx = global.ctx
   var canvas = global.canvas
    global.ctx.fillStyle = global.backgroundColor
    global.ctx.fillRect( 0, 0, canvas.width, canvas.height )
   
   global.grid.draw(ctx)
   
   global.test.draw(ctx)
   
   //debug
   //trace always-visible circle
   //ctx.strokeStyle = 'yellow'
   //ctx.beginPath()
   //ctx.arc( .5, .5, .2, 0, twopi )
   //ctx.stroke()
   
   
    //ctx.clearRect( 0, 0, canvas.width, canvas.height )
    
    //debug
    //drawFilledChunks(ctx)
    
    //y += 30
    //ctx.fillText(`camera: ${cameraX.toFixed(2)}, ${cameraY.toFixed(2)}, ${zoomLevel.toFixed(2)}`, x, y);
    //y += 30
    //ctx.fillText(gameState, x, y);
    //y += 30 
    //ctx.fillText(`canvas pos: ${canvasMouseX}, ${canvasMouseY}`, x, y);
    //y += 30
    //ctx.fillText(`virtual pos: ${virtualMouseX}, ${virtualMouseY}`, x, y);
}