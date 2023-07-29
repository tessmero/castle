/**
 * a walkable path on a block grid
 *
 * defined by a list of 3D coords 
 * which are assumed to be a loop
 */
class Path{
    constructor(blockCoords){
        this.blockCoords = blockCoords
        
        this.nSteps = this.blockCoords.length-1
        this.duration = this.nSteps/global.workerSpeed
        this.stepDuration = this.duration/this.nSteps
        
    }
    
    // draw worker on path after t millisecs
    drawWorker(g,t){
        
        // which step
        var stepIndex = Math.floor(t/this.stepDuration) % this.nSteps
        
        // offset within step
        var r = (t % this.stepDuration) / this.stepDuration
        
        // neighboring 3d coords
        var a = this.blockCoords[stepIndex]
        var b = this.blockCoords[stepIndex+1]
        
        // interpolated 3d coords
        var ir = (1.0-r)
        var c = [a[0]*ir+b[0]*r,a[1]*ir+b[1]*r,a[2]*ir+b[2]*r]
        
        // translated 2d coords
        var p = global.grid.get2DCoords(...c).add(global.blockUnits.c)
        
        // jump between tiles
        p.y -= 3e-3*Math.abs(Math.sin(r*Math.PI))
        
        var holdingCargo = (stepIndex<this.nSteps/2)
        
        // draw body
        var w = .005
        var h = .008
        g.fillStyle = 'white'
        g.fillRect( p.x-w/2,p.y-h/2,w,h)
        
        // draw cargo
        if( holdingCargo ){
            w = h
            g.fillStyle = 'gray'
            g.fillRect( p.x-w/2,p.y-h/2-h,w,h)
        }
    }
    
    draw(g){
        var first = true
        g.strokeStyle = 'red'
        g.lineWidth = .001
        g.beginPath()
        this.blockCoords.forEach( xyz => {
            var p = global.grid.get2DCoords(...xyz).add(global.blockUnits.c)
            if( first ){
                g.moveTo(p.x,p.y)
                first = false
            } else {
                g.lineTo(p.x,p.y)
            }
        })
        g.stroke()
    }
}