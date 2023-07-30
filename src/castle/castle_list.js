var allCastles = [
    new TempleCastle(),
    new SimpleCastle(),
]

function getCastle(){
    var i = Math.floor( Math.random() * allCastles.length )
    return allCastles[i]
}

