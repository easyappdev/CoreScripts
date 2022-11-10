var funList = []
var enabledSites = [
    "98295549-F0D3-4168-9BEF-8342E7EA167B", //sitio demo1
    "5421A861-5BB3-41AA-A21E-5F4F9D8A7A33",  //sitio demo2 
    "2970FBBA-1147-49F4-82ED-81DE2BF5B2C1",  //sitio GremioTech
    "5F6FB4FD-FC16-4A24-9D7D-291E9EE53282" //sitio Adma
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
        console.log('script result error:', err.message, " - GBP error:", a);
    }
}

function RemoveSpecialCaracters(str) {
   return str.replace(/[^a-zA-Z0-9\s\-]/gi, "").replace(/\s/gi, "-").toLowerCase();
}

function isNumeric(n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
}

function soloNumeros(e){
    tecla=(document.all)?e.keyCode:e.which;
    if(tecla==8)
    {
      return true;
    }
    patron=/[0-9]/;
    tecla_final=String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

/*
$(window).on('load', function() {
   $('body').append('<div style="position: relative; bottom: 30px; left: 56%; width: 75px"><a href="https://www.init.com.ar" target="_blank"><img src="https://cdn.jsdelivr.net/gh/easyappdev/CoreScripts@latest/developed_by.webp"></a></div>');
});
*/
