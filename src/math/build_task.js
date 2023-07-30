// an assignemnt to build one specific block
//    - path for workers to follow
//    - deploy,update,remove workers
//    - track building progress
//    - 
class BuildTask{
    constructor(x,y,path){
        this.x = x
        this.y = y
        this.i = global.grid.getI(x,y)
        this.path = path
        this.deliveryTimeOffset = this.path.duration/2
        this.workerOffsets = [] // position of workers on path
        this.orCount = 0 // number of workers in first half of path
        this.workerDeployCountDown = this.randCountdown()
        this.remainingDeliveries = global.deliveriesPerBlock
        this.firstDelivery = true
    }
    
    // called in update() when a worker arrives at the block
    madeDelivery(){
        
        // flatten terrain
        if( this.firstDelivery ){
            global.grid.heights[this.i] = Math.floor(global.grid.heights[this.i])
            this.firstDelivery = false
        }
        
        this.remainingDeliveries--
        this.orCount--
        
        // add visual indication of progress
        global.grid.underConstruction[this.i] = true
        global.grid.heights[this.i] += (.9/global.deliveriesPerBlock)
        
        
        // check if construction completed
        if( this.remainingDeliveries==0 ){
            global.grid.underConstruction[this.i] = false
            global.grid.requestBlockPlacement(this.x,this.y)
        }
    }
    
    randCountdown(){
        return randRange(...global.workerDeployDelay) * (global.allBuildTasks.length/global.taskCountLimit)
    }
    
    update(dt){
        
        // deploy worker periodically
        if( this.workerDeployCountDown <= 0 ){
            if( this.orCount < this.remainingDeliveries ){
                this.workerOffsets.push(0)
                this.orCount++
            }
            this.workerDeployCountDown = this.randCountdown()
        }
        this.workerDeployCountDown -= dt
        
        // advance workers 
        this.workerOffsets = this.workerOffsets.flatMap(wo => {
            
            // check if delivery made during this update
            if( (wo<this.deliveryTimeOffset) && (wo+dt>=this.deliveryTimeOffset) ){
                this.madeDelivery()
            }
            wo += dt
            if( wo > this.path.duration ){
                return []
            }
            return [wo];
        })
        
        
        if( (this.remainingDeliveries<=0) && (this.workerOffsets.length==0) ){
            
            // signal task complete
            return false
            
        }
        
        // signal task ongoing
        return true
    }
    
    draw(g){
        if( global.showPaths ) this.path.draw(g)
        this.workerOffsets.forEach(wo=>this.path.drawWorker(g,wo))
        
        if( global.debugBuildTaskProgress ){
            var p = global.grid.get2DCoords(this.x,this.y)
            g.fillStyle = 'black'
            g.font = ".001em Arial";
            g.textAlign = "center";
            g.fillText(`${this.remainingDeliveries}`, p.x,p.y-.01);
        }
    }
}