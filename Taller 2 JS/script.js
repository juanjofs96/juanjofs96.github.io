/* Cargar las noticias de noticias.json y noticias.xml */

function addNew(autor, contenido, url, fecha) {
    var title = $("<h5/>", {
      "class":"card-title col-sm-12 col-md-12 col-lg-12 col-12",
      html: autor + " dijo: "
    })

    var p = $("<p/>",{
      "class": "card-text col-sm-12 col-md-12 col-lg-12 col-12",
      html: contenido
    })

    var link = $("<p/>",{
      "class": "card-text col-sm-12 col-md-12 col-lg-12 col-12",
      html: url
    })

    var p2 = $("<div/>",{
      "class": "card-text col-sm-12 col-md-12 col-lg-12 col-12",
      html: fecha
    })

    var avatar = $( "<img/>", {
      "class": "card-body rounded float-left",
      "src": "bird.jpg"
      });

    var div = $( "<div/>", {
      "class": "card-body col-12 col-sm-12 col-md-12 col-lg-12",
      "id": "caja"
    });

    var div2 = $( "<span/>", {
      "class": "card-body col-12 col-sm-12 col-md-12 col-lg-12"
    });

    avatar.appendTo("#noticias")
    title.appendTo(div)
    p.appendTo(div)
    link.appendTo(div)
    p2.appendTo(div2)
    div2.appendTo(div)
    div.appendTo( "#noticias" );
}

function loadNewsXml(texto) {
  $.ajax({
      type: "GET",
      url: "https://twitrss.me/twitter_search_to_rss/?term="+texto,
      dataType: "xml",
      success: function(xml){
          $(xml).find('item').each(function(){
            var contenido = $(this).find('description').text();
            var autor = $(this).find('dc\\:creator').text();
            var fecha = $(this).find('pubDate').text(); 
            var url = $(this).find('link').text();
            
            addNew(autor, contenido, url, fecha);

          });
      },
      error: function() {
        alert("Error al procesar el xml");
      }
  });
}

/* Filtrar las noticias de acuerdo al contenido ingresado en el input#buscador, ya sea por el texto en el título o en el contenido */

$(document).ready(function(){
  
  var texto="";

  $("button").click(function(e){

    texto = $('input#buscador').val();

    loadNewsXml(texto);
    document.getElementById("info").innerHTML=texto;
    
    if(texto.length != 0) {
      
      var noticias = $('#noticias .card-body');
      $('#noticias .card-body').filter(function(index){
        
        $(this).show();
        
        var noticia = $(this).text()
        if(noticia.indexOf(texto) == -1) {
          $(this).hide()
        }

      });

    } else {
      $('#noticias .card-body').each(function(){
        $(this).hide();
        document.getElementById("info").innerHTML="No ha ingresado nada";
      });
    }

    return false;
    
  })

  });

