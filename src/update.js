


function update(dt) {    
    fitToContainer()
    global.t += dt
    
    // assign new build tasks if necessary
    if( global.newTaskCountdown <= 0 ){
        while( (global.allBuildTasks.length<global.taskCountLimit) ){
            
            // request build target
            var xy = getNextBlockToBuild()
            
            // if no build target
            if(xy == null){
                if(global.allBuildTasks.length == 0){
                    if(global.noBuildTasksLastUpdate){
                        if( verifyLevelComplete() ){
                            // advance build height
                            global.currentBuildHeight++
                            if( global.currentBuildHeight > 1000 ){
                                global.currentBuildHeight = 1000
                            }
                        }
                        global.noBuildTasksLastUpdate = false
                        
                    } else {
                        
                        // maybe advance build height next update
                        global.noBuildTasksLastUpdate = true
                    }
                }
                break
            } else {
                
                // foudn build target, start building
                var path = global.grid.getPath(...xy)
                var bt = new BuildTask(...xy, path)
                global.allBuildTasks.push( bt )
                bt.path.blockCoords.forEach( xy => {
                    var i = global.grid.getI(...xy)
                    global.grid.blockedByConstruction[i] = true
                })
            }
        }
        global.newTaskCountdown=global.newTaskDelay
    }
    global.newTaskCountdown -= dt
    
    // advance tasks and remove finished tasks
    var oldN = global.allBuildTasks.length
    global.allBuildTasks = global.allBuildTasks
                            .filter( bt=> bt.update(dt) )
                            
    // unblock grid if any tasks were removed
    if( global.allBuildTasks.length != oldN ){
        global.grid.computeBlockedByConstruction()
    }
    
    global.grid.processBlockPlacements()
}




var lastCanvasOffsetWidth = -1;
var lastCanvasOffsetHeight = -1;
function fitToContainer(){
    
    var cvs = global.canvas
    if( (cvs.offsetWidth!=lastCanvasOffsetWidth) || (cvs.offsetHeight!=lastCanvasOffsetHeight) ){
        
      cvs.width  = cvs.offsetWidth;
      cvs.height = cvs.offsetHeight;
        
        var padding = 10; // (extra zoom IN) thickness of pixels CUT OFF around edges
        var dimension = Math.max(cvs.width, cvs.height) + padding*2;
        global.canvasScale = dimension;
        global.canvasOffsetX = (cvs.width - dimension) / 2;
        global.canvasOffsetY = (cvs.height - dimension) / 2;
    global.ctx.setTransform(global.canvasScale, 0, 0, 
        global.canvasScale, global.canvasOffsetX, global.canvasOffsetY);
    }
}