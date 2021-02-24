var funList = []
var enabledSites = [
    "98295549-F0D3-4168-9BEF-8342E7EA167B", //sitio demo
    "BA26AD9E-A9F9-4307-A82C-DC86B0A8A172"  //GN  
]

function callScript(_scName, _scData, _scFunHandle){
    if(enabledSites.indexOf($('#hidWSId').val().toUpperCase()) !== -1){
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
        try { 
            let _data = _scData ? JSON.stringify(_scData) : '';
            funScript(_scName, _data);
        }
        catch {
            console.log('Error en parámetros callScript.');    
        }
    }   
}

function funScriptSuccess(a) { 
    try {
        var d = JSON.parse(a);
        let idx = funList.map(function(e) { 
            return e.scName; 
        }).indexOf(d.scName);
        if(funList[idx].scFunHandle) {
    	    window[funList[idx].scFunHandle](d.data);
        }
    }
    catch (err) {
        console.log('script result error: ', err.message);
    }
}

