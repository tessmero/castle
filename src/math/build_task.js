// an assignemnt to build one specific block
//    - path for workers to follow
//    - deploy,update,remove workers
//    - track building progress
//    - 
class BuildTask{
    constructor(x,y){
        this.path = global.grid.getPath(x,y)
        this.workerOffsets = [500,1000,1500]
        this.t = 0
        this.remainingDeliveries = 10
        
        // 
        this.areWorkers
    }
    
    update(dt){
        for (var i = 0; i < this.workerOffsets.length; i++){
            this.workerOffsets[i] += dt;
        }
        
        // indicate task ongoing
        return false
        
        // task complete
        return true
    }
    
    draw(g){
        this.path.draw(g)
        this.workerOffsets.forEach(wo=>this.path.drawWorker(g,wo))
        
        if( global.debugBuildTaskProgress ){
            var xyz = this.path.blockCoords[0]
            var p = global.grid.get2DCoords(...xyz)
            g.fillStyle = 'black'
            g.font = ".001em Arial";
            g.textAlign = "center";
            g.fillText('task', p.x,p.y-.01);
        }
    }
}