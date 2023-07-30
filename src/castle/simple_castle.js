class SimpleCastle extends Castle{
    constructor(){
        super()
        this.heightMap = [
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000055556",
            "00000000000000045555",
            "00000000000000035556",
            "00000000000000025555",
            "00000000000000015556",
            "00000000000000005555",
            "00065000000000005556",
            "00055000000000015555",
            "00065000000000025556",
            "000550000000S0035555",
            "00065000000000045556",
            "00055000000000055555",
            "00065432111234555556",
            "00055555555555555555",
            "00065555555555555556",
            "00055555555555555555",
            "00065656565656565656",
        ]        
    }
    
    //helper
    getPos(c){
        
        for( var y = 0 ; y < this.heightMap.length ; y++ ){
            for( var x = 0 ; x < this.heightMap[0].length ; x++ ){
                if( this.heightMap[y].charAt(x) == c ){
                    return [x,y]
                }
            }
        }
    }
    
    // implement castle
    // called in setup.js
    getSpawnPos(){
        return this.getPos('S')
    }
    

    // implement castle
    getTargetHeight(x,y){
        try{
            return parseInt(this.heightMap[y].charAt(x))
        } catch {
            return 0
        }
    }
}