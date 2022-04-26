let data ;
let numero=0;


getTabella();


function getTabella(){
$.ajax ({
    method:"GET",
    url:"http://localhost:8080/index.php"
})
.done(function(msg){
    console.log(msg);
    data =msg['_embedded']['employees'];
   
    creaTabella();
})
}


function getUltimaTabella(){
    $.ajax ({
        method:"GET",
        url:"http://localhost:8080/index.php?TotalPages=15001"
    })
    .done(function(msg){
        console.log(msg['_embedded']['employees']);
        data = msg['_embedded']['employees'];
        creaTabella();
    })
    }



function creaTabella() {
    let table = "";
    $.each(data, function (chiave, valore) {
       
        table = table + "<tr>";
        table = table + "<td>" + valore.id + "</td>";
        table = table + "<td>" + valore.first_name + "</td>";
        table = table + "<td>" + valore.last_name + "</td>";
        table = table + "<td>" + valore.gender + "</td>";
        table = table + "</tr>"
        
    });

    $("#tbody").append(table);
}

//$(document).ready(function () { creaTabella(); });

function aggiungi() {
let n1=0;
let dato3;
    let dato1=prompt("Inserisci nome");
    let dato2=prompt("Inserisci cognome");
    do{
        if(n1>0){
            alert("Puoi inserire solo M o F");
        }
     dato3=prompt("Inserisci sesso");
  
    n1++;
    }while(dato3!="M" && dato3!="F");

    let dati = {
        first_name: dato1,
        last_name: dato2,
        birth_date: "",
        hire_date: "",
        gender: dato3,
      };

    $.ajax ({
        method:"POST",
        url:"http://localhost:8080/index.php",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(dati),

  success: function(data, textStatus, jXHR) {
     console.log("Operazione riuscita", data, textStatus, jXHR);
     svuotaTabella();
     getTabella();
     window.location.reload();
  },
  error: function(jqXHR, textStatus, errorThrown) {
     console.log("Operazione fallita", jqXHR, textStatus, errorThrown);  
  }
})
   


}

function rimuovi() {
     let id=prompt("Inserisci id del dipendente da eliminare")


    $.ajax({
        url: "http://localhost:8080/index.php/?id=" + id,
        type: 'DELETE',
       
        success: function(data, textStatus, jXHR) {
            console.log("Operazione riuscita", data, textStatus, jXHR);
            svuotaTabella();
            getTabella();
           window.location.reload();
         },
         error: function(jqXHR, textStatus, errorThrown) {
            console.log("Operazione fallita", jqXHR, textStatus, errorThrown); 
        
          
         }
      });
    

}
function modifica() {
    let dato3;
    let n1=0;
let identifica=prompt("inserisci l'id utente da modificare");
let dato1=prompt("Inserisci nome");
let dato2=prompt("Inserisci cognome");
do{
    if(n1>0){
        alert("Puoi inserire solo M o F");
    }
 dato3=prompt("Inserisci sesso");
 
n1++;
}while(dato3!="M" && dato3!="F");

let dati = {
    first_name: dato1,
    last_name: dato2,
    birth_date: "",
    hire_date: "",
    gender: dato3,
  };

    $.ajax({
        method: "PUT",
        url: "http://localhost:8080/index.php?id="+identifica,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(dati),
        success: function(data, textStatus, jXHR) {
            console.log("Operazione riuscita", data, textStatus, jXHR);
            svuotaTabella();
            getTabella();
           window.location.reload();
         },
         error: function(jqXHR, textStatus, errorThrown) {
            console.log("Operazione fallita", jqXHR, textStatus, errorThrown); 
            
           
         }
      });
   

}




function svuotaTabella() {
    $("#prova tr").remove();

}

function numeroPagina(){
   
}


function primaPagina(){
    svuotaTabella();
    getTabella();
}
function prossimaPagina(){
    
}
function precedentePagina(){
    $.ajax ({
        method:"GET",
        url:"http://localhost:8080/index.php"
    })
    .done(function(msg){
        console.log(msg['_links']['previous']);
        data = msg['_links'][''];
        
    })
}
function ultimaPagina(){
svuotaTabella();
 getUltimaTabella();

}