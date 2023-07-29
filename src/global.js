resetRand()

const global = {
    
    // total time elapsed in milliseconds
    t: 0,
    
    // graphics context
    canvas: null,
    ctx: null,

    // 
    backgroundColor: 'white',
    
    // relate screen pixels to virtual 2D units
    canvasOffsetX: 0,
    canvasOffsetY: 0,
    canvasScale: 0,
    

    // relate 3D blocks to virtual 2D units
    // based on (0,0,0) 1x1x1 block edges 
    blockOrigin: v(.5,.75),
    blockUnits: {
        x: v(2,-1).mul( 8e-3),
        y: v(-2,-1).mul(8e-3),
        z: v(0,-1.5).mul( 8e-3),
        
        // offset to center of surface
        c: v(0,-1).mul( 8e-3), 
    },
    
    // BlockGrid instance
    grid: null,
    gridWidth: 20,
    gridHeight: 20,
    
    // active contruction projects
    allBuildTasks: [],
    workerDeployDelay: [100,1000], //millisecs 
    newTaskDelay: 200,
    newTaskCountdown: 700,
    taskCountLimit: 20,
    currentBuildHeight: 0, // z-value of new blocks
    workerSpeed: 7e-3, //tiles per ms
    deliveriesPerBlock: 5, // trips per block
    
    // long-term construction plan
    castle: null,
    spawnPos: null,
    
    // mouse
    canvasMousePos: v(0,0),     //pixels
    mousePos: v(0,0),           //virtual units
    
    // core logic helper
    allDirections: [
        [1,0],[-1,0],[0,1],[0,-1]
    ],
    
    //debug
    showPaths: false,
    debugBlockCoords: false,
    debugPathIndices: false,
    debugBuildTaskProgress: false,
}