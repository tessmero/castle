

// member methods implement building logic 
//  - build according to blueprint (global.castle)
//  - build at global.currentBuildHeight
//  - build longest path first
//  - do not build on active paths
    
function getNextBlockToBuild(){
    var maxPi = 0
    var bestX=null,bestY=null
    for( var x = 0 ; x < global.gridWidth ; x++ ){
        for( var y = 0 ; y < global.gridHeight ; y++ ){
            var i = global.grid.getI(x,y)
            if( global.grid.blockedByConstruction[i] ){
                continue
            }
            var h = global.grid.heights[i]
            var pi = global.grid.pathIndices[i]
            var th = global.castle.getTargetHeight(x,y)
            if( (Math.floor(h)==global.currentBuildHeight) && (pi > maxPi) && (h<th) ) {
                bestX = x
                bestY = y
                maxPi = pi
            }
        }
    }
    if( bestX == null ){
        return null
    }
    return [bestX,bestY]
}