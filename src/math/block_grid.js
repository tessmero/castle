
/** 
 * 
 * 
 * 
 */
class BlockGrid {
    
    constructor(){
        var n = global.gridWidth * global.gridHeight; // x y
        
        this.blockedByConstruction = new Array(n).fill(false)
        this.heights = new Array(n).fill(0) // z  
        
        // set ground height with perlin noise
        if( true ){
            var i = 0
            for( var x=0 ; x < global.gridWidth ; x++ ){
                for( var y=0 ; y < global.gridHeight ; y++ ){
                    this.heights[i] = .5+perlin.get(x/10,y/10)
                    i++
                }
            }
        }
        
        this.pathIndices = new Array(n)
        this.computePathIndices()
        
        // edges extending down to off-screen
        this.sideFaceEdge = global.blockUnits.z.mul(-50)
        
        // queue of blocks to be built at the start of the next update
        this.requestedBlockPlacements = []
    }
    
    //get internal array index for block
    getI(x,y){
        return y*global.gridWidth + x;
    }
    
    //populate blockedByConstruction member with bools
    computeBlockedByConstruction(){
        this.blockedByConstruction.fill(false)
        
        global.allBuildTasks.forEach( bt => {
            bt.path.blockCoords.forEach(xy => {
                var i = this.getI(...xy)
                this.blockedByConstruction[i] = true
            })
        })
    }
    
    // populate pathIndices member with integers
    computePathIndices(){
        this.pathIndices.fill(-1)
        
        var x = global.spawnPos[0]
        var y = global.spawnPos[1]
        var pathIndex = 0
        var i = this.getI(x,y)
        this.pathIndices[i] = pathIndex
        var h = this.heights[i]
        var propCoords = [[x,y,h]]
    
        while( propCoords.length > 0 ){
            pathIndex += 1
            var newCoords = []
            propCoords.forEach( xyh => {
                global.allDirections.forEach(d => {
                    var x1 = xyh[0]+d[0]
                    var y1 = xyh[1]+d[1]
                    if( (x1<0) || (x1>=global.gridWidth) || (y1<0) || (y1>=global.gridHeight) ){
                        return
                    }
                    var i1 = this.getI(x1,y1)
                    var h1 = this.heights[i1]
                    if( (this.pathIndices[i1] != -1) || (Math.abs(h1-xyh[2])>1) ){
                        return
                    }
                    this.pathIndices[i1] = pathIndex 
                    
                    //penalize jumps
                    var adh = Math.abs(h1-xyh[2])
                    if( adh > .5 ){
                        this.pathIndices[i] += 1e-4*adh
                    }
                    
                    newCoords.push([x1,y1,h1])
                })
            })
            propCoords = newCoords
        }
    }
    
    // get path from given tile to pathIndex 0 tile
    getPath(x,y){
        var result = []
        var i
        while( true ){
            i = this.getI(x,y)
            var pi = this.pathIndices[i]
            var z =  this.getHeightForPathfinding(i)
            result.push( [x,y,this.heights[i]] )
            
            // check if path is complete
            if((x==global.spawnPos[0]) && (y==global.spawnPos[1])){
                break
            }
            
            // check neightboring path indices
            var minNpi = 1e4
            var bestX,bestY
            global.allDirections.forEach(d => {
                var nx = x+d[0]
                var ny = y+d[1]
                if( (nx<0) || (nx>=global.gridWidth) || (ny<0) || (ny>=global.gridHeight) ){
                    return
                }
                var ni = this.getI(nx,ny)
                var nz = this.getHeightForPathfinding(ni)
                
                var npi = this.pathIndices[ni]
                if( npi == -1 ){
                    return
                }
                if( Math.abs(nz-z) > 1 ){
                    return
                }
                if( (npi < minNpi) || ((npi == minNpi) && Math.random()<.5) ){
                    
                    minNpi = npi
                    bestX = nx
                    bestY = ny
                }
            })
            x = bestX
            y = bestY
            
            
        }
            
        // return two-way path
        var rev = [...result].reverse()
        return new Path(rev.concat(result))
    }
    
    // get tile height for purposes of pathfinding
    getHeightForPathfinding(i){
        var h = this.heights[i]
        if( h%1==0 ){
            return h
        }
        return 0
    }
    
    // project world coords to isometric 2d view
    // based on (0,0,0) 1x1x1 block edges 
    // defined in global.js
    get2DCoords(x,y,z=null){
        
        if(z==null){
            z = this.heights[this.getI(x,y)]
        }
        
        return global.blockOrigin
            .add(global.blockUnits.x.mul(x))
            .add(global.blockUnits.y.mul(y))
            .add(global.blockUnits.z.mul(z))
    }
    
    // request z coordinate to be increased to nearest integer
    // called in build_task.js
    requestBlockPlacement(x,y){
        this.requestedBlockPlacements.push([x,y])
    }
    
    // called once per update
    processBlockPlacements(){
        var placedAny = false
        while( this.requestedBlockPlacements.length > 0 ){
            var xy = this.requestedBlockPlacements.pop()
            var i = this.getI(...xy)
            var z = this.heights[i]
            if( z%1==0 ){
                z++
            } else {
                z = Math.ceil(z)
            }
            this.heights[i] = z
            placedAny = true
        }
        if( placedAny ) this.computePathIndices()
    }
    
    draw(g){
        for( var x=global.gridWidth-1 ; x>=0 ; x-- ){
            for( var y=global.gridHeight-1 ; y>=0 ; y-- ){
                var z = this.heights[this.getI(x,y)]
                this.drawBlock(g,x,y,z)
            }
        }
        
        //draw spawn
        
    }
    
    drawBlock(g,x,y,z){
        var a = this.get2DCoords(x,y,z)
        var b = a.add(global.blockUnits.x)
        var c = b.add(global.blockUnits.y)
        var d = a.add(global.blockUnits.y)
        
        var topColor = '#7ec850'
        var leftColor = '#9b7653'
        var rightColor = '#9b7653'
        if( z%1==0 ){
            topColor = '#DDD'
            leftColor = '#AAA'
            rightColor = '#CCC'
        }
        
        var edgeColor = null//'black'
        
        // draw top of block
        this.drawQuad(g,a,b,c,d,topColor,edgeColor)
        
        // draw visible left face of block
        this.drawQuad(g,a,d,d.add(this.sideFaceEdge),a.add(this.sideFaceEdge),leftColor,edgeColor)
        
        // draw visible right face of block
        this.drawQuad(g,a,b,b.add(this.sideFaceEdge),a.add(this.sideFaceEdge),rightColor,edgeColor)
        
        if( global.debugBlockCoords ){
            g.fillStyle = 'black'
            g.font = ".001em Arial";
            g.textAlign = "center";
            g.fillText(`${x},${y},${z.toFixed(1)}`, a.x, a.y-.01);
        }
        
        if( global.debugPathIndices ){
            var pathIndex = this.pathIndices[this.getI(x,y)]
            g.fillStyle = 'black'
            g.font = ".001em Arial";
            g.textAlign = "center";
            g.fillText(pathIndex.toFixed(0), a.x, a.y-.005);
        }
    }
    
    drawQuad(g,a,b,c,d,fillStyle,strokeStyle=null){
        g.fillStyle = fillStyle
        this.quadPath(g,a,b,c,d)
        g.fill()
        
        if( strokeStyle != null ){
            g.strokeStyle = strokeStyle
            g.lineWidth = .001
            this.quadPath(g,a,b,c,d)
            g.stroke()
        }
    }
    
    quadPath(g,a,b,c,d){
        g.beginPath()
        g.moveTo( a.x, a.y )
        g.lineTo( b.x, b.y )
        g.lineTo( c.x, c.y )
        g.lineTo( d.x, d.y )
        g.lineTo( a.x, a.y )
    }
}