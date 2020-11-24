var funList = []
var enabledSites = [
    "86ac3665-dc73-4926-92cd-de7463a086f6",
    "ba26ad9e-a9f9-4307-a82c-dc86b0a8a172"
]

function callScript(_scName, _scData, _scFunHandle){
    if(enabledSites.indexOf($('#hidWSId').val()) !== -1){
        var handleData = {
            scName: _scName,
            scFunHandle: _scFunHandle
        }
        if(funList.length) {
            let idx = funList.map(function(e) { 
                return e.scName; 
            }).indexOf(_scName);
            if(idx === -1) {
                funList.push(handleData);
            }
        }
        else {
            funList.push(handleData);
        }
        funScript(_scName, JSON.stringify(_scData));
    }   
}

function funScriptSuccess(a) { 
    var d = JSON.parse(a);
    let idx = funList.map(function(e) { 
        return e.scName; 
    }).indexOf(d.scName);
    if(funList[idx].scFunHandle) {
    	window[funList[idx].scFunHandle](d.data);
    }
}

