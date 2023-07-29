class TempleCastle extends Castle{
    constructor(){
        super()
        this.heightMap = [
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
            "00000000000000000000",
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