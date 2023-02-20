// V1.0.38
// https://1bit.com.ar

function CotizadorOCA_Tarifar_Envio_Corporativo(_Operativa, _CodigoPostalOrigen, _CodigoPostalDestino, _PesoTotal, _VolumenTotal, _CantidadPaquetes, _handleFunctionOK, _handleFunctionFail) {

    var myHeaders = new Headers();
    myHeaders.append("WSId", $('#hidWSId').val().toUpperCase());
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "Operativa": _Operativa,
        "CodigoPostalOrigen": _CodigoPostalOrigen,
        "CodigoPostalDestino": _CodigoPostalDestino,
        "PesoTotal": _PesoTotal,
        "VolumenTotal": _VolumenTotal,
        "CantidadPaquetes": _CantidadPaquetes
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://apitools.1bitservices.com.ar/oca/TarifarEnvioCorporativo", requestOptions)
        .then(response => response.text())
        .then(result => window[_handleFunctionOK](result))
        .catch(error => {
            console.log("CotizadorOCA Error: ", error);
            window[_handleFunctionFail](error);
        });
}
