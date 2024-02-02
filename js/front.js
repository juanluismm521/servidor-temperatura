
function carga() {
  let datos;
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/data/data.json", true);
  xhttp.send();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      datos = JSON.parse(this.responseText);
      console.log(datos);

      for (let i = 1; i < datos.length; i++) {
        var contendor = $("#tbody").html();
        var nuevaFila = "<tr>";
        nuevaFila += '<th scope="row">' + i + '</th>';
        nuevaFila += "<td>" + datos[i].fecha + "</td>";
        nuevaFila += "<td>" + datos[i].temperatura + "</td>";
        nuevaFila += "</tr>";
        $(nuevaFila).appendTo("#tbody");
      }
    }
  };
}

function ahora() {
    var hoy = new Date();
    var fecha =
      hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
    var hora = (hoy.getHours()+1) + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
    var fechaYHora = fecha + " " + hora;
    return fechaYHora;
  }


  module.exports.ahora = ahora;
