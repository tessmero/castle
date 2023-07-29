class TempleCastle extends Castle{
    constructor(){
        super()
        
        // one quarter
        var h =  [
            "0000000000",
            "000000000S",
            "0065600000",
            "0055500010",
            "0065444420",
            "0000444430",
            "0000444444",
            "0000444555",
            "0001234566",
            "0000004567",
        ] 
        
        // unfold snowflake twice
        var n = h.length
        for( var i = 0 ; i < n ; i++ ){
            h[i] = h[i].concat(h[i].split('').reverse().join('').replace('S','0'))
        }
        for( var i = 0 ; i < n ; i++ ){
            h.push(h[n-i-1])
        }
        
        this.heightMap = h
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