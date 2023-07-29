
    
    
// Render graphics
function draw(fps, t) {
    
    var ctx = global.ctx
    var canvas = global.canvas
    ctx.fillStyle = global.backgroundColor
    ctx.fillRect( 0, 0, canvas.width, canvas.height )

    // draw map and built blocks
    global.grid.draw(global.ctx)

    // draw spawn
    var sp = global.grid.get2DCoords(...global.spawnPos).add(global.blockUnits.c)
    ctx.fillStyle = 'black'
    ctx.beginPath();
    ctx.ellipse(sp.x,sp.y, 8e-3,3e-3, 0, 0, 2 * Math.PI);
    ctx.fill();

    // draw workers and partially built blocks
    global.allBuildTasks.forEach(bt=>bt.draw(global.ctx))

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