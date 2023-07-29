class SimpleCastle extends Castle{
    constructor(){
        super()
        this.heightMap = [
            "0000000000",
            "0000000005",
            "0000000005",
            "0000000005",
            "0000000015",
            "0000000025",
            "0000000035",
            "0000000045",
            "0000123455",
            "0555555555",
        ]        
    }
    

    // implement castle
    getTargetHeight(x,y){
        return parseInt(this.heightMap[y].charAt(x))
    }
}