var enableCoreScriptLog = false;
var funList = []
var enabledSites = [
    "98295549-F0D3-4168-9BEF-8342E7EA167B", //sitio demo1
    "5421A861-5BB3-41AA-A21E-5F4F9D8A7A33", //sitio demo2 
    "62CA51DF-D7ED-4E20-A5EB-D7917151EEA8", //sitio demo3 
    "2970FBBA-1147-49F4-82ED-81DE2BF5B2C1",  //sitio GremioTech
    "5F6FB4FD-FC16-4A24-9D7D-291E9EE53282", //sitio Adma
    "32505348-7DBE-4206-A527-78F5AF5AE96C", //sitio Buenos Aires Bazar
    "9A9A4202-FAE7-4A26-90E4-43509F1A0CC4", //sitio ByF Deco
    "12F0F9F9-F23A-4549-B60D-EF7E49516330", //sitio Teknoventas
    "EA555C4F-D75B-4098-914B-87022D0C6396", //Micrositio Principal Teknoventas
    "A3DCDD48-B22E-404D-AD6E-01FA5066628D", //Micrositio Teknoventas
    "A632009A-7686-4FCB-A0B4-24B18CAF5234", //sitio Maximus
    "1C807F41-D6FA-48F8-B256-EDD2D7B02919", //sitio Compugarden
    "20C51876-0D04-4575-A4F1-5094587B9444", // sitio OFIT SRL
    "90FFABE9-3302-4054-8D7E-120D98C2D33D", // sitio Noxiestore
    "1D80BFA6-21E1-4B4C-AEC4-D24B930DC0AE", // sitio Mancini Beauty
    "D1DDEF72-6065-4EDB-9085-7F2515EE8DE9", // sitio ITyT
    "7BE05E43-9D16-49EF-BFD9-0F3D98CEC35B", // sitio Papelera las Lomas
    "C25D6CDA-D894-4C11-820A-7BD1415BC67D" // sitio Codigo Parque
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
            if(enableCoreScriptLog) {
                console.log('callScript - > funScript: ', _scName, _data);
            }
            funScript(_scName, _data);
        }
        catch {
            console.log('Error en parámetros callScript.');    
        }
    }   
}

function callScript2(_scName, _scData, _scFunHandle){
    if(enabledSites.indexOf($('#hidWSId').val().toUpperCase()) !== -1){
		
	  	let _auth = _scData && _scData.auth ? _scData.auth.split("|")[0] : '';
		let _funNumber = _scData && _scData.auth ? _scData.auth.split("|")[1] : '';
		
		//llamar a la funcion para verificar auth y esperar la respuesta con una promesa
		if (typeof window["AuthCheck" + _funNumber] !== "function") 
        {
          console.warn("Función HandShake inválida, abortando callScript");
          return;
        }

	  	if(_auth) {
		  window["AuthCheck" + _funNumber](_auth, function (isValid) {
			if (!isValid) {
			  console.warn("AUTH inválido, abortando callScript");
			  return;
			}});
		}
	  	else {
            console.warn("AUTH inválido, abortando callScript");
			return;    
        }
	  
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
            if(enableCoreScriptLog) {
                console.log('callScript - > funScript: ', _scName, _data);
            }
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
    	    window[funList[idx].scFunHandle](d.data, d.auth);
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


$(window).on('load', function() {
    if($('#hidWSId').val().toUpperCase() !== "A632009A-7686-4FCB-A0B4-24B18CAF5234") //Distinto sitio de Maximus
    {
      $("a[href$='globalbluepoint.com']").parent().append('<a href="https://1bit.com.ar" target="_blank" ><img src="https://cdn.jsdelivr.net/gh/easyappdev/CoreScripts@latest/developed_by.webp" style="padding-left: 15px;"></a>');
    }
});




