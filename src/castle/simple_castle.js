class SimpleCastle extends Castle{
    constructor(){
        super()
        this.heightMap = [
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000056",
            "00000000000000000055",
            "00000000000000000056",
            "00000000000000000055",
            "00000000000000065656",
            "00000000000000055555",
            "00000000000000065556",
            "00000000000000055555",
            "00000000000000065556",
            "0000000000S000015555",
            "00000000000000025556",
            "00000000000000035555",
            "00612345656565645556",
            "00555555555555555555",
            "00655555555555555556",
            "00555555555555555555",
            "00565656565656565656",
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