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
    blockOrigin: v(.5,.7),
    blockUnits: {
        x: v(.03,-.015),
        y: v(-.03,-.015),
        z: v(0,-.03),
        
        // offset to center of surface
        c: v(0,-.015), 
    },
    
    // BlockGrid instance
    grid: null,
    gridWidth: 10,
    gridHeight: 10,
    
    // active contruction projects
    allBuildTasks: [],
    workerDeployDelay: 100, //millisecs 
    newTaskDelay: 500,
    newTaskCountdown: 0,
    taskCountLimit: 10,
    currentBuildHeight: 0, // z-value of new blocks
    workerSpeed: 9e-3, //tiles per ms
    deliveriesPerBlock: 5, // trips per block
    
    // long-term construction plan
    castle: new SimpleCastle(),
    
    
    // game objects
    hubPos: [5,5],
    
    // mouse
    canvasMousePos: v(0,0),     //pixels
    mousePos: v(0,0),           //virtual units
    
    // core logic helper
    allDirections: [
        [1,0],[-1,0],[0,1],[0,-1]
    ],
    
    //debug
    debugBlockCoords: false,
    debugPathIndices: true,
    debugBuildTaskProgress: false,
}