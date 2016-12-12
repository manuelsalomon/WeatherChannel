var ciudades=[]
$('#input').keypress(function(e){
if(e.keyCode===13){
  var thisInput=$(this)
  console.log(thisInput)
  $.ajax({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?q='+encodeURI($(this).val())+'&appid=95176c8edea30e33338e0eaddd53a916&units=metric',
      success:function(data){
        ciudades.push(thisInput.val())
        crear_botones()
        thisInput.val("")

    },
    error:function(){
      alert("La ciudad no existe")
      thisInput.val("")
    }
  })
}

})
function crear_botones(){
  $("#botones").empty()
  for(var i = 0; i < ciudades.length; i++ ){
  $('#botones').append("<button class='btn btn-default'>"+ciudades[i]+"</button>")
}}

  $('#botones').on('click', "button", function() {

      $.ajax({
          method: 'GET',
          url: 'http://api.openweathermap.org/data/2.5/weather?q='+encodeURI($(this).text())+'&appid=95176c8edea30e33338e0eaddd53a916&units=metric',
          success: function(data) {
          $('#temp').text(data.main.temp+"°C")
          $('#max').text(data.main.temp_max+"°C")
          $('#min').text(data.main.temp_min+"°C")
          $('#desc').text(data.weather[0].description)
          $('#viento').text(data.wind.speed+"km/h")
          $('#amane').text(new Date(data.sys.sunrise*1000).getHours()+":"+new Date(data.sys.sunrise*1000).getMinutes()+"hs")
          $('#puesta').text(new Date(data.sys.sunset*1000).getHours()+":"+new Date(data.sys.sunset*1000).getMinutes()+"hs")
          }
      })

  });
