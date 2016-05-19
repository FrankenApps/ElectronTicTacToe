/**
* @author NearCZ
*/
var a1, a2, a3, b1, b2, b3, c1, c2, c3;
var starter = 1;
var spielzuege = 0;
var siege1 = 0;
var siege2 = 0;
var unentschiedeneSpiele = 0;
var rate1 = 0.0;
var rate2 = 0.0;
var spielanzahl = 0;
var lang = "de";
var comp1 = false;
var comp2 = false;
var starterBackup = 1;
var array = [];
var gesperrt=true;
var randomInt = 0;
var computer1Beginntcounter=0;

var remote = require('remote');

$(document).ready(function(){
  // load selected language
  if(localStorage.getItem("lang") != null){
    if(localStorage.getItem("lang") == "de"){
      lang_de();
    }
    else if (localStorage.getItem("lang") == "en") {
      lang_en();
    }
  }
  // If no language saved use English
  else {
    lang_en();
  }

  //wiederherrstellen
  spielzuege = 0;
  $('input[name=starter]').attr("disabled",false);
  document.getElementById("radio1").checked = true;
  $("#color1").prop('disabled', false);
  $("#color2").prop('disabled', false);
  $("#computer1").prop('disabled', false);
  $("#computer2").prop('disabled', false);
  $("#computer1").prop('checked', false);
  $("#computer2").prop('checked', false);
  $('#name1').prop('disabled', false);
  $('#name2').prop('disabled', false);
  $('#reset').prop('disabled', false);
  $('#startGame').prop('disabled', false);
  $('#symbol1').prop('disabled', false);
  $('#symbol2').prop('disabled', false);
  starter=1;
  a1=a2=a3=b1=b2=b3=c1=c2=c3=0;
  for(i=1; i<10; i++){
    $("#"+String(i)).prop('disabled', false);
    $("#"+String(i)).css("background-color",'#dddddd');
  }
  comp1 = false;
  comp2 = false;
  labelsetzten();

  //radios verwalten
  $('input[type=radio][name=starter]').change(function() {
    if (this.id == 'radio1') {
      starter=1;
      starterBackup=starter;
      if(comp1===true){
        $("#startGame").slideDown("slow");
        computerBeginntUi();
      }
      else {
        $("#startGame").slideUp("slow");
        computerBeginntUiReverse();
      }
    }
    else if (this.id == 'radio2') {
      starter=2;
      starterBackup=starter;
      if(comp2===true){
        $("#startGame").slideDown("slow");
        computerBeginntUi();
      }
      else {
        $("#startGame").slideUp("slow");
        computerBeginntUiReverse();
      }
    }
  });

  //spielt ein computer?
  $('input[type=checkbox]').change(
    function(){
      if (this.checked) {
        if(String(this.id)==="computer1"){
          comp1=true;
          $("#name1").val("Computer 1");
          if(starter===1){
            $("#startGame").slideDown("slow");
            computerBeginntUi();
          }
        }
        else if (String(this.id)==="computer2") {
          comp2=true;
          $("#name2").val("Computer 2");
          if(starter===2){
            $("#startGame").slideDown("slow");
            computerBeginntUi();
          }
        }
      }
      else {
        if(String(this.id)==="computer1"){
          comp1=false;
          if(lang==="en"){
            $("#name1").val("Player 1");
          }
          else if (lang==="de") {
            $("#name1").val("Spieler 1");
          }
          if(comp2===false){
            $("#startGame").slideUp("slow");
            computerBeginntUiReverse();
          }
          else {
            if(starter===1){
              $("#startGame").slideUp("slow");
              computerBeginntUiReverse();
            }
          }
        }
        else if (String(this.id)==="computer2") {
          comp2=false;
          if(lang==="en"){
            $("#name2").val("Player 2");
          }
          else if (lang==="de") {
            $("#name2").val("Spieler 2");
          }
          if(comp1===false){
            $("#startGame").slideUp("slow");
            computerBeginntUiReverse();
          }
          else {
            if(starter===2){
              $("#startGame").slideUp("slow");
              computerBeginntUiReverse();
            }
          }
        }
      }
      labelsetzten();
    });

    //textboxes
    $('#name1').on('input propertychange paste', function() {
      labelsetzten();
    });
    $('#name2').on('input propertychange paste', function() {
      labelsetzten();
    });

    //button click
    $("button").on('click', function () {
      if(this.id==1||this.id==2||this.id==3||this.id==4||this.id==5||this.id==6||this.id==7||this.id==8||this.id==9){
        if(comp1===false && comp2===false){
          //sperren nach spielbeginn:
          $('input[name=starter]').attr("disabled",true);
          $("#color1").prop('disabled', true);
          $("#color2").prop('disabled', true);
          $("#computer1").prop('disabled', true);
          $("#computer2").prop('disabled', true);
          $('#name1').prop('disabled', true);
          $('#name2').prop('disabled', true);
          $('#reset').prop('disabled', false);
          $('#startGame').prop('disabled', true);
          $('#symbol1').prop('disabled', true);
          $('#symbol2').prop('disabled', true);

          //spielzug
          spielzuege=spielzuege+1;

          if (starter===1) {
            $("#"+String(this.id)).css("background-color",$("#color1").css('backgroundColor'));
            $("#"+String(this.id)).css('font-size', '40px');
            $("#"+String(this.id)).html($('#symbol1').val());
            $("#"+String(this.id)).prop('disabled', true);
            if(this.id==1){
              a3 = 1;
            }
            else if (this.id==2) {
              a1 = 1;
            }
            else if (this.id==3) {
              a2 = 1;
            }
            else if (this.id==4) {
              b3 = 1;
            }
            else if (this.id==5) {
              b1 = 1;
            }
            else if (this.id==6) {
              b2 = 1;
            }
            else if (this.id==7) {
              c3 = 1;
            }
            else if (this.id==8) {
              c1 = 1;
            }
            else if (this.id==9) {
              c2 = 1;
            }
            starter=2;
          }
          else{
            $("#"+String(this.id)).css("background-color",$("#color2").css('backgroundColor'));
            $("#"+String(this.id)).prop('disabled', true);
            $("#"+String(this.id)).css('font-size', '40px');
            $("#"+String(this.id)).html($('#symbol2').val());
            if(this.id==1){
              a3 = 2;
            }
            else if (this.id==2) {
              a1 = 2;
            }
            else if (this.id==3) {
              a2 = 2;
            }
            else if (this.id==4) {
              b3 = 2;
            }
            else if (this.id==5) {
              b1 = 2;
            }
            else if (this.id==6) {
              b2 = 2;
            }
            else if (this.id==7) {
              c3 = 2;
            }
            else if (this.id==8) {
              c1 = 2;
            }
            else if (this.id==9) {
              c2 = 2;
            }
            starter=1;
          }

          console.log(this.id);

          checken();
        }
        else{
          if(starter===1 && comp1===true){
            computer1Beginnt(this.id);
          }
          else if (starter===2 && comp2===true) {
            computer2Beginnt(this.id);
          }
          else{
            if(comp2===true && starter===1){
              computerIstZweiter(this.id);
              console.log("computerIstZweiter");
            }
            else if (comp1===true && starter===2){
              console.log("anderescomputerIstZweiter");
              anderescomputerIstZweiter(this.id);
            }
          }
        }
      }
    });
  });

  function checken(){
    setTimeout(function(){console.log("manno");},200);
    if(a1==1&&a2==1&&a3==1){
      sieger(1);
    }
    else if (a1==2&&a2==2&&a3==2) {
      sieger(2);
    }
    else if (b1==1&&b2==1&&b3==1) {
      sieger(1);
    }
    else if (b1==2&&b2==2&&b3==2) {
      sieger(2);
    }
    else if (c1==1&&c2==1&&c3==1) {
      sieger(1);
    }
    else if (c1==2&&c2==2&&c3==2) {
      sieger(2);
    }
    else if (a1==1&&b1==1&&c1==1) {
      sieger(1);
    }
    else if (a1==2&&b1==2&&c1==2) {
      sieger(2);
    }
    else if (a2==1&&b2==1&&c2==1) {
      sieger(1);
    }
    else if (a2==2&&b2==2&&c2==2) {
      sieger(2);
    }
    else if (a3==1&&b3==1&&c3==1) {
      sieger(1);
    }
    else if (a3==2&&b3==2&&c3==2) {
      sieger(2);
    }
    else if (a1==1&&b2==1&&c3==1) {
      sieger(1);
    }
    else if (a1==2&&b2==2&&c3==2) {
      sieger(2);
    }
    else if (a3==1&&b2==1&&c1==1) {
      sieger(1);
    }
    else if (a3==2&&b2==2&&c1==2) {
      sieger(2);
    }
    else if (spielzuege==9) {
      unentschieden();
    }
  }

  function sieger(siegerNummer){
    spielanzahl = spielanzahl + 1;
    for(i=1; i<10; i++){
      $("#"+String(i)).prop('disabled', true);
    }
    if(document.getElementById("radio1").checked == true){
      if(siegerNummer==1 || comp1===true && starterBackup===1 && comp2===false){
        siege1 = siege1 + 1;
        scoreUpdate();
        if(lang==="de"){
          alert(document.getElementById("name1").value + " hat gewonnen.");
          restartIt();
        }
        else if (lang==="en") {
          alert(document.getElementById("name1").value + " has won.");
          restartIt();
        }
      }
      else if (siegerNummer==2) {
        siege2 = siege2 + 1;
        scoreUpdate();
        if(lang==="de"){
          alert(document.getElementById("name2").value + " hat gewonnen.");
          restartIt();
        }
        else if (lang==="en") {
          alert(document.getElementById("name2").value + " has won.");
          restartIt();
        }
      }
    }
    else {
      if(siegerNummer==1 || comp1===true && starterBackup===2 && comp2===false){
        siege1 = siege1 + 1;
        scoreUpdate();
        if(lang==="de"){
          alert(document.getElementById("name1").value + " hat gewonnen.");
          restartIt();
        }
        else if (lang==="en") {
          alert(document.getElementById("name1").value + " has won.");
          restartIt();
        }
      }
      else if (siegerNummer==2) {
        siege2 = siege2 + 1;
        scoreUpdate();
        if(lang==="de"){
          alert(document.getElementById("name2").value + " hat gewonnen.");
          restartIt();
        }
        else if (lang==="en") {
          alert(document.getElementById("name2").value + " has won.");
          restartIt();
        }
      }
    }
  }

  function unentschieden(){
    unentschiedeneSpiele = unentschiedeneSpiele + 1;
    scoreUpdate();
    if(lang==="de"){
      alert("Das Spiel endet unentschieden.");
      restartIt();
    }
    else if (lang==="en") {
      alert("The game ends with a draw.");
      restartIt();
    }
  }
  //kein jQuery
  function restartIt(){
    gesperrt=true;
    for(d=1; d<10; d++){
      $("#"+String(d)).html('');
    }
    while(array.length > 0) {
      array.pop();
    }
    if(starterBackup===1){
      starter=1;
      document.getElementById("radio1").checked = true;
    }
    else {
      starter=2;
      document.getElementById("radio2").checked = true;
    }
    if(comp1===true && comp2===true){
      $('#startGame').slideDown("slow");
      spielzuege = 0;
      $('input[name=starter]').attr("disabled",false);
      $("#color1").prop('disabled', false);
      $("#color2").prop('disabled', false);
      $("#computer1").prop('disabled', false);
      $("#computer2").prop('disabled', false);
      $('#name1').prop('disabled', false);
      $('#name2').prop('disabled', false);
      $('#reset').prop('disabled', false);
      $('#startGame').prop('disabled', false);
      $('#symbol1').prop('disabled', false);
      $('#symbol2').prop('disabled', false);
      a1=a2=a3=b1=b2=b3=c1=c2=c3=0;
      for(i=1; i<10; i++){
        $("#"+String(i)).css("background-color",'#aaaaaa');
      }
    }
    else if (comp1===true && starter===1) {
      $('#startGame').slideDown("slow");
      spielzuege = 0;
      $('input[name=starter]').attr("disabled",false);
      $("#color1").prop('disabled', false);
      $("#color2").prop('disabled', false);
      $("#computer1").prop('disabled', false);
      $("#computer2").prop('disabled', false);
      $('#name1').prop('disabled', false);
      $('#name2').prop('disabled', false);
      $('#reset').prop('disabled', false);
      $('#startGame').prop('disabled', false);
      $('#symbol1').prop('disabled', false);
      $('#symbol2').prop('disabled', false);
      a1=a2=a3=b1=b2=b3=c1=c2=c3=0;
      for(i=1; i<10; i++){
        $("#"+String(i)).css("background-color",'#aaaaaa');
      }
      computer1Beginntcounter=0;
    }
    else if (comp2===true && starter===2) {
      $('#startGame').slideDown("slow");
      spielzuege = 0;
      $('input[name=starter]').attr("disabled",false);
      $("#color1").prop('disabled', false);
      $("#color2").prop('disabled', false);
      $("#computer1").prop('disabled', false);
      $("#computer2").prop('disabled', false);
      $('#name1').prop('disabled', false);
      $('#name2').prop('disabled', false);
      $('#reset').prop('disabled', false);
      $('#startGame').prop('disabled', false);
      $('#symbol1').prop('disabled', false);
      $('#symbol2').prop('disabled', false);
      a1=a2=a3=b1=b2=b3=c1=c2=c3=0;
      for(i=1; i<10; i++){
        $("#"+String(i)).css("background-color",'#aaaaaa');
      }
      computer1Beginntcounter=0;
    }
    else {
      spielzuege = 0;
      $('input[name=starter]').attr("disabled",false);
      $("#color1").prop('disabled', false);
      $("#color2").prop('disabled', false);
      $("#computer1").prop('disabled', false);
      $("#computer2").prop('disabled', false);
      $('#name1').prop('disabled', false);
      $('#name2').prop('disabled', false);
      $('#reset').prop('disabled', false);
      $('#startGame').prop('disabled', false);
      $('#symbol1').prop('disabled', false);
      $('#symbol2').prop('disabled', false);
      a1=a2=a3=b1=b2=b3=c1=c2=c3=0;
      for(i=1; i<10; i++){
        $("#"+String(i)).prop('disabled', false);
        $("#"+String(i)).css("background-color",'#dddddd');
      }
    }
  }

  function labelsetzten(){
    $("#SpielerLabel1").html("<strong>" + String(document.getElementById("name1").value + "</strong>"));
    $("#SpielerLabel2").html("<strong>" + String(document.getElementById("name2").value + "</strong>"));
  }

  function scoreUpdate(){
    if(spielanzahl>0){
      rate1 = siege1/spielanzahl*100;
      rate2 = siege2/spielanzahl*100;
    }
    else {
      rate1 = 0;
      rate2 = 0;
    }
    if(lang==="de"){
      $("#SiegeLabel1").text("Siege: " + String(siege1));
      $("#SiegeLabel2").text("Siege: " + String(siege2));
      $("#UnentschiedenLabel1").text("Unentschieden: " + String(unentschiedeneSpiele));
      $("#UnentschiedenLabel2").text("Unentschieden: " + String(unentschiedeneSpiele));
      $("#RateLabel1").text("Rate: " + String(Math.round(rate1*100)/100) + "%");
      $("#RateLabel2").text("Rate: " + String(Math.round(rate2*100)/100) + "%");
    }
    else if (lang==="en") {
      $("#SiegeLabel1").text("Victories: " + String(siege1));
      $("#SiegeLabel2").text("Victories: " + String(siege2));
      $("#UnentschiedenLabel1").text("Draws: " + String(unentschiedeneSpiele));
      $("#UnentschiedenLabel2").text("Draws: " + String(unentschiedeneSpiele));
      $("#RateLabel1").text("Quota: " + String(Math.round(rate1*100)/100) + "%");
      $("#RateLabel2").text("Quota: " + String(Math.round(rate2*100)/100) + "%");
    }
  }

  function lang_de(){
    if(lang==="en"){
      $('label[for=radio1]').html('Beginner');
      $('label[for=radio2]').html('Beginner');
      $('label[for=computer1]').html('Computer');
      $('label[for=computer2]').html('Computer');
      $("#name1Label").text("Name: ");
      $("#name2Label").text("Name: ");
      $("#farbe1").text("Farbe: ");
      $("#farbe2").text("Farbe: ");
      $("#restart").html('Neustart');
      $('#close').val("Beenden")
      $("#close").css("margin-left",'0px');
      $("#labelReset").html("Ergebnisse Zurücksetzten");
      $("#reset").css("margin-left",'0px');
      if(comp1===false && comp2===false){
        $("#name2").val("Spieler 2");
        $("#name1").val("Spieler 1");
      }
      else{
        if(comp1===true && comp2===true){
          $("#name1").val("Computer 1");
          $("#name2").val("Computer 2");
        }
        else if(comp1===true){
          $("#name1").val("Computer 1");
          $("#name2").val("Spieler 2");
        }
        else if(comp2===true){
          $("#name2").val("Computer 2");
          $("#name1").val("Spieler 1");
        }
      }
      $("#startGameFont").html("Spiel starten");
    }
    lang="de";
    scoreUpdate();
    labelsetzten();
    saveLang(lang);
  }

  function lang_en(){
    if(lang==="de"){
      $('label[for=radio1]').html('Beginner');
      $('label[for=radio2]').html('Beginner');
      $('label[for=computer1]').html('Computer');
      $('label[for=computer2]').html('Computer');
      $("#name1Label").text("Name: ");
      $("#name2Label").text("Name: ");
      $("#farbe1").text("Color: ");
      $("#farbe2").text("Color: ");
      $("#restart").html('Restart');
      $('#close').val("Close");
      $("#close").css("margin-left",'44px');
      $("#labelReset").html("Reset Score");
      $("#reset").css("margin-left",'44px');
      if(comp1===false && comp2===false){
        $("#name2").val("Player 2");
        $("#name1").val("Player 1");
      }
      else{
        if(comp1===true && comp2===true){
          $("#name1").val("Computer 1");
          $("#name2").val("Computer 2");
        }
        else if(comp1===true){
          $("#name1").val("Computer 1");
          $("#name2").val("Player 2");
        }
        else if(comp2===true){
          $("#name2").val("Computer 2");
          $("#name1").val("Player 1");
        }
      }
      $("#startGameFont").html("Start Game");
    }
    lang="en";
    scoreUpdate();
    labelsetzten();
    saveLang(lang);
  }

  function resetScores(){
    siege1=0;
    siege2 = 0;
    unentschiedeneSpiele=0;
    spielanzahl = 0;
    scoreUpdate();
  }

  function computerBeginntUi(){
    for(i=1; i<10; i++){
      $("#"+String(i)).prop('disabled', true);
      $("#"+String(i)).css("background-color",'#aaaaaa');
    }
  }

  function computerBeginntUiReverse(){
    for(i=1; i<10; i++){
      $("#"+String(i)).prop('disabled', false);
      $("#"+String(i)).css("background-color",'#dddddd');
    }
  }

  function computerIstZweiter(id){
    spielzuege=spielzuege+1;

    if (starter===1) {
      $("#"+String(id)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(id)).prop('disabled', true);
      $("#"+String(id)).css('font-size', '40px');
      $("#"+String(id)).html($('#symbol1').val());
      if(id==1){
        a3 = 1;
      }
      else if (id==2) {
        a1 = 1;
      }
      else if (id==3) {
        a2 = 1;
      }
      else if (id==4) {
        b3 = 1;
      }
      else if (id==5) {
        b1 = 1;
      }
      else if (id==6) {
        b2 = 1;
      }
      else if (id==7) {
        c3 = 1;
      }
      else if (id==8) {
        c1 = 1;
      }
      else if (id==9) {
        c2 = 1;
      }
      starter=2;
      computerIstZweiter(0);
    }
    else{
      computerSpielzugLogik();
      starter=1;
    }
    console.log(id);

    checken();
  }

  function computerSpielzugLogik(){
    //Mittleres Feld
    if(b2===0){
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    //Zwei Felder aneinander == nächster Zug Sieg
    //horizontal
    else if (a1===2 && a2===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    else if (a2===2 && a3===2 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (a1===2 && a3===2 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol2').val());
    }
    else if (b1===2 && b2===2 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol2').val());
    }
    else if (b2===2 && b3===2 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol2').val());
    }
    else if (b1===2 && b3===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    else if (c1===2 && c2===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (c2===2 && c3===2 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    else if (c1===2 && c3===2 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol2').val());
    }
    //vertikal
    else if (a1===2 && b1===2 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    else if (a1===2 && c1===2 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol2').val());
    }
    else if (b1===2 && c1===2 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (a2===2 && b2===2 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol2').val());
    }
    else if (a2===2 && c2===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    else if (b2===2 && c2===2 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol2').val());
    }
    else if (a3===2 && b3===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (b3===2 && c3===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    else if (a3===2 && c3===2 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol2').val());
    }
    //schief
    else if (a1===2 && b2===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (c3===2 && b2===2 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (a1===2 && c3===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    //schief andere Richtung
    else if (a3===2 && b2===2 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    else if (a3===2 && c1===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    else if (b2===2 && c1===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    //Sieg des Gegners verhindern
    //horizontal
    else if (a1===1 && a2===1 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    else if (a2===1 && a3===1 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (a1===1 && a3===1 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol2').val());
    }
    else if (b1===1 && b2===1 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol2').val());
    }
    else if (b2===1 && b3===1 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol2').val());
    }
    else if (b1===1 && b3===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    else if (c1===1 && c2===1 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (c2===1 && c3===1 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    else if (c1===1 && c3===1 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol2').val());
    }
    //vertikal
    else if (a1===1 && b1===1 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    else if (a1===1 && c1===1 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol2').val());
    }
    else if (b1===1 && c1===1 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (a2===1 && b2===1 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol2').val());
    }
    else if (a2===1 && c2===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    else if (b2===1 && c2===1 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol2').val());
    }
    else if (a3===1 && b3===1 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (b3===1 && c3===1 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    else if (a3===1 && c3===1 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol2').val());
    }
    //schief
    else if (a1===1 && b2===1 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (c3===1 && b2===1 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (a1===1 && c3===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    //schief andere Richtung
    else if (a3===1 && b2===1 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    else if (a3===1 && c1===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    else if (b2===1 && c1===1 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    //nur ein kästchen + reihe frei
    else if (a1===2 && a2===0 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    else if (a1===0 && a2===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    else if (a1===0 && a2===0 && a3===2) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (b1===2 && b2===0 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol2').val());
    }
    else if (b1===0 && b2===2 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol2').val());
    }
    else if (b1===0 && b2===0 && b3===2) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    else if (c1===2 && c2===0 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (c1===0 && c2===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (c1===0 && c2===0 && c3===2) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    //ansonsten eckfelder
    else if (a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    else if (a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    //ansonsten aussenfelder mitte
    else if (a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol2').val());
    }
    else if (b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol2').val());
    }
    else if (c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol2').val());
    }
    else if (b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol2').val());
    }
    //random
    else{
      if(a1!=0 && a2!=0 && a3!=0 && b1!=0 && b2!=0 && b3!=0 && c1!=0 && c2!=0 && c3!=0){
        unentschieden();
      }
    }
  }

  function anderescomputerIstZweiter(id){
    spielzuege=spielzuege+1;

    if (starter===2) {
      $("#"+String(id)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(id)).prop('disabled', true);
      $("#"+String(id)).css('font-size', '40px');
      $("#"+String(id)).html($('#symbol2').val());
      if(id==1){
        a3 = 1;
      }
      else if (id==2) {
        a1 = 1;
      }
      else if (id==3) {
        a2 = 1;
      }
      else if (id==4) {
        b3 = 1;
      }
      else if (id==5) {
        b1 = 1;
      }
      else if (id==6) {
        b2 = 1;
      }
      else if (id==7) {
        c3 = 1;
      }
      else if (id==8) {
        c1 = 1;
      }
      else if (id==9) {
        c2 = 1;
      }
      starter=1;
      anderescomputerIstZweiter(0);
    }
    else{
      anderecomputerSpielzugLogik();
      starter=2;
    }
    console.log(id);

    checken();
  }

  function anderecomputerSpielzugLogik(){
    //Mittleres Feld
    if(b2===0){
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    //Zwei Felder aneinander == nächster Zug Sieg
    //horizontal
    else if (a1===2 && a2===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    else if (a2===2 && a3===2 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (a1===2 && a3===2 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol1').val());
    }
    else if (b1===2 && b2===2 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol1').val());
    }
    else if (b2===2 && b3===2 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol1').val());
    }
    else if (b1===2 && b3===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    else if (c1===2 && c2===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (c2===2 && c3===2 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    else if (c1===2 && c3===2 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol1').val());
    }
    //vertikal
    else if (a1===2 && b1===2 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    else if (a1===2 && c1===2 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol1').val());
    }
    else if (b1===2 && c1===2 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (a2===2 && b2===2 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol1').val());
    }
    else if (a2===2 && c2===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    else if (b2===2 && c2===2 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol1').val());
    }
    else if (a3===2 && b3===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (b3===2 && c3===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    else if (a3===2 && c3===2 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol1').val());
    }
    //schief
    else if (a1===2 && b2===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (c3===2 && b2===2 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (a1===2 && c3===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    //schief andere Richtung
    else if (a3===2 && b2===2 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    else if (a3===2 && c1===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    else if (b2===2 && c1===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    //Sieg des Gegners verhindern
    //horizontal
    else if (a1===1 && a2===1 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    else if (a2===1 && a3===1 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (a1===1 && a3===1 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol1').val());
    }
    else if (b1===1 && b2===1 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol1').val());
    }
    else if (b2===1 && b3===1 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol1').val());
    }
    else if (b1===1 && b3===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    else if (c1===1 && c2===1 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (c2===1 && c3===1 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    else if (c1===1 && c3===1 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol1').val());
    }
    //vertikal
    else if (a1===1 && b1===1 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    else if (a1===1 && c1===1 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol1').val());
    }
    else if (b1===1 && c1===1 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (a2===1 && b2===1 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol1').val());
    }
    else if (a2===1 && c2===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    else if (b2===1 && c2===1 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol1').val());
    }
    else if (a3===1 && b3===1 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (b3===1 && c3===1 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    else if (a3===1 && c3===1 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol1').val());
    }
    //schief
    else if (a1===1 && b2===1 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (c3===1 && b2===1 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (a1===1 && c3===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    //schief andere Richtung
    else if (a3===1 && b2===1 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    else if (a3===1 && c1===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    else if (b2===1 && c1===1 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    //nur ein kästchen + reihe frei
    else if (a1===2 && a2===0 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    else if (a1===0 && a2===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    else if (a1===0 && a2===0 && a3===2) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (b1===2 && b2===0 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol1').val());
    }
    else if (b1===0 && b2===2 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol1').val());
    }
    else if (b1===0 && b2===0 && b3===2) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    else if (c1===2 && c2===0 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (c1===0 && c2===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (c1===0 && c2===0 && c3===2) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    //ansonsten eckfelder
    else if (a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    else if (a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    //ansonsten aussenfelder mitte
    else if (a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol1').val());
    }
    else if (b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol1').val());
    }
    else if (c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol1').val());
    }
    else if (b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol1').val());
    }
    //random
    else{
      if(a1!=0 && a2!=0 && a3!=0 && b1!=0 && b2!=0 && b3!=0 && c1!=0 && c2!=0 && c3!=0){
        unentschieden();
      }
    }
  }

  function computerBeginnt(){
    restartIt();
    $("#startGame").slideUp("slow");
    computerBeginntUiReverse();
    if(comp1===true && comp2===true){
      gesperrt=false;
      zweiComputer();
    }
    else{
      if(comp1==true){
        computer1BeginntLogik();
      }
      else{
        computer2BeginntLogik();
      }
    }
  }

  function zweiComputer(){

    zahlBestimmen()
    if (starter===1) {
      $("#"+String(randomInt)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(randomInt)).prop('disabled', true);
      $("#"+String(randomInt)).css('font-size', '40px');
      $("#"+String(randomInt)).html($('#symbol1').val());
      if(randomInt==1){
        a3 = 1;
      }
      else if (randomInt==2) {
        a1 = 1;
      }
      else if (randomInt==3) {
        a2 = 1;
      }
      else if (randomInt==4) {
        b3 = 1;
      }
      else if (randomInt==5) {
        b1 = 1;
      }
      else if (randomInt==6) {
        b2 = 1;
      }
      else if (randomInt==7) {
        c3 = 1;
      }
      else if (randomInt==8) {
        c1 = 1;
      }
      else if (randomInt==9) {
        c2 = 1;
      }
      starter=2;
    }
    else{
      $("#"+String(randomInt)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(randomInt)).prop('disabled', true);
      $("#"+String(randomInt)).css('font-size', '40px');
      $("#"+String(randomInt)).html($('#symbol2').val());
      if(randomInt==1){
        a3 = 2;
      }
      else if (randomInt==2) {
        a1 = 2;
      }
      else if (randomInt==3) {
        a2 = 2;
      }
      else if (randomInt==4) {
        b3 = 2;
      }
      else if (randomInt==5) {
        b1 = 2;
      }
      else if (randomInt==6) {
        b2 = 2;
      }
      else if (randomInt==7) {
        c3 = 2;
      }
      else if (randomInt==8) {
        c1 = 2;
      }
      else if (randomInt==9) {
        c2 = 2;
      }
      starter=1;
    }
    if(a1==1&&a2==1&&a3==1){
      sieger(1);
    }
    else if (a1==2&&a2==2&&a3==2) {
      sieger(2);
    }
    else if (b1==1&&b2==1&&b3==1) {
      sieger(1);
    }
    else if (b1==2&&b2==2&&b3==2) {
      sieger(2);
    }
    else if (c1==1&&c2==1&&c3==1) {
      sieger(1);
    }
    else if (c1==2&&c2==2&&c3==2) {
      sieger(2);
    }
    else if (a1==1&&b1==1&&c1==1) {
      sieger(1);
    }
    else if (a1==2&&b1==2&&c1==2) {
      sieger(2);
    }
    else if (a2==1&&b2==1&&c2==1) {
      sieger(1);
    }
    else if (a2==2&&b2==2&&c2==2) {
      sieger(2);
    }
    else if (a3==1&&b3==1&&c3==1) {
      sieger(1);
    }
    else if (a3==2&&b3==2&&c3==2) {
      sieger(2);
    }
    else if (a1==1&&b2==1&&c3==1) {
      sieger(1);
    }
    else if (a1==2&&b2==2&&c3==2) {
      sieger(2);
    }
    else if (a3==1&&b2==1&&c1==1) {
      sieger(1);
    }
    else if (a3==2&&b2==2&&c1==2) {
      sieger(2);
    }
    else if (spielzuege==9) {
      unentschieden();
    }
    else {
      if(gesperrt===false){
        zweiComputer();
      }
    }
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function zahlBestimmen(){
    randomInt = getRandomInt(1,9);
    if(array.indexOf(randomInt)!=-1){
      zahlBestimmen();
    }
    else {
      spielzuege=spielzuege+1;
      array.push(randomInt);
    }
  }

  function computer1Beginnt(id){
    console.log("computer1Beginnt");
    spielzuege=spielzuege+1;

    if (starter===1) {
      $("#"+String(id)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(id)).prop('disabled', true);
      $("#"+String(id)).css('font-size', '40px');
      $("#"+String(id)).html($('#symbol2').val());
      computer1Beginntcounter=computer1Beginntcounter+1;
      console.log("computer1Beginntcounter: "+ computer1Beginntcounter);
      if(id==1){
        a3 = 1;
      }
      else if (id==2) {
        a1 = 1;
      }
      else if (id==3) {
        a2 = 1;
      }
      else if (id==4) {
        b3 = 1;
      }
      else if (id==5) {
        b1 = 1;
      }
      else if (id==6) {
        b2 = 1;
      }
      else if (id==7) {
        c3 = 1;
      }
      else if (id==8) {
        c1 = 1;
      }
      else if (id==9) {
        c2 = 1;
      }
      console.log("starter: "+starter);
      starter=2;

      if(computer1Beginntcounter===4){
        computer1BeginntLogik();
      }
      computer1Beginnt(0);
    }
    else{
      computer1BeginntLogik();
      console.log("starter: "+starter);
      starter=1;
    }
    console.log(id);

    checken();
  }

  function computer1BeginntLogik(){
    $('input[name=starter]').attr("disabled",true);
    $("#color1").prop('disabled', true);
    $("#color2").prop('disabled', true);
    $("#computer1").prop('disabled', true);
    $("#computer2").prop('disabled', true);
    $('#name1').prop('disabled', true);
    $('#name2').prop('disabled', true);
    $('#reset').prop('disabled', false);
    $('#startGame').prop('disabled', true);
    $('#symbol1').prop('disabled', true);
    $('#symbol2').prop('disabled', true);

    //Logik beginnt
    if(b2===0){
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    //sicheren sieg des gegners beim nächsten Zug verhindern
    else if (a1===1 && a2===0 && a3===1) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol1').val());
    }
    //Zwei Felder aneinander == nächster Zug Sieg
    //horizontal
    else if (a1===2 && a2===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    else if (a2===2 && a3===2 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (a1===2 && a3===2 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol1').val());
    }
    else if (b1===2 && b2===2 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol1').val());
    }
    else if (b2===2 && b3===2 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol1').val());
    }
    else if (b1===2 && b3===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    else if (c1===2 && c2===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (c2===2 && c3===2 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    else if (c1===2 && c3===2 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol1').val());
    }
    //vertikal
    else if (a1===2 && b1===2 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    else if (a1===2 && c1===2 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol1').val());
    }
    else if (b1===2 && c1===2 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (a2===2 && b2===2 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol1').val());
    }
    else if (a2===2 && c2===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    else if (b2===2 && c2===2 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol1').val());
    }
    else if (a3===2 && b3===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (b3===2 && c3===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    else if (a3===2 && c3===2 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol1').val());
    }
    //schief
    else if (a1===2 && b2===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (c3===2 && b2===2 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (a1===2 && c3===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    //schief andere Richtung
    else if (a3===2 && b2===2 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    else if (a3===2 && c1===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    else if (b2===2 && c1===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    else if (a2===0 && b2===2 && c2===0 && spielzuege>4) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol1').val());
    }
    //Sieg des Gegners verhindern
    //horizontal
    else if (a1===1 && a2===1 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    else if (a2===1 && a3===1 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (a1===1 && a3===1 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol1').val());
    }
    else if (b1===1 && b2===1 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol1').val());
    }
    else if (b2===1 && b3===1 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol1').val());
    }
    else if (b1===1 && b3===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    else if (c1===1 && c2===1 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (c2===1 && c3===1 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    else if (c1===1 && c3===1 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol1').val());
    }
    //vertikal
    else if (a1===1 && b1===1 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    else if (a1===1 && c1===1 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol1').val());
    }
    else if (b1===1 && c1===1 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (a2===1 && b2===1 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol1').val());
    }
    else if (a2===1 && c2===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    else if (b2===1 && c2===1 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol1').val());
    }
    else if (a3===1 && b3===1 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (b3===1 && c3===1 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    else if (a3===1 && c3===1 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol1').val());
    }
    //schief
    else if (a1===1 && b2===1 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (c3===1 && b2===1 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (a1===1 && c3===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    //schief andere Richtung
    else if (a3===1 && b2===1 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    else if (a3===1 && c1===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    else if (b2===1 && c1===1 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    //nur ein kästchen + reihe frei
    else if (a1===2 && a2===0 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    else if (a1===0 && a2===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    else if (a1===0 && a2===0 && a3===2) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (b1===2 && b2===0 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol1').val());
    }
    else if (b1===0 && b2===2 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol1').val());
    }
    else if (b1===0 && b2===0 && b3===2) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol1').val());
    }
    else if (c1===2 && c2===0 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (c1===0 && c2===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (c1===0 && c2===0 && c3===2) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    //ansonsten eckfelder
    else if (a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol1').val());
    }
    else if (c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol1').val());
    }
    else if (c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol1').val());
    }
    else if (a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol1').val());
    }
    //ansonsten aussenfelder mitte
    else if (a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol1').val());
    }
    else if (b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol1').val());
    }
    else if (c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol1').val());
    }
    else if (b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol1').val());
    }
    //random
    else{
      if(a1!=0 && a2!=0 && a3!=0 && b1!=0 && b2!=0 && b3!=0 && c1!=0 && c2!=0 && c3!=0){
        unentschieden();
      }
    }
    checken();
  }

  function computer2Beginnt(id){
    console.log("computer2Beginnt");
    spielzuege=spielzuege+1;

    if (starter===2) {
      $("#"+String(id)).css("background-color",$("#color1").css('backgroundColor'));
      $("#"+String(id)).prop('disabled', true);
      $("#"+String(id)).css('font-size', '40px');
      $("#"+String(id)).html($('#symbol1').val());
      computer1Beginntcounter=computer1Beginntcounter+1;
      console.log("computer1Beginntcounter: "+ computer1Beginntcounter);
      if(id==1){
        a3 = 1;
      }
      else if (id==2) {
        a1 = 1;
      }
      else if (id==3) {
        a2 = 1;
      }
      else if (id==4) {
        b3 = 1;
      }
      else if (id==5) {
        b1 = 1;
      }
      else if (id==6) {
        b2 = 1;
      }
      else if (id==7) {
        c3 = 1;
      }
      else if (id==8) {
        c1 = 1;
      }
      else if (id==9) {
        c2 = 1;
      }
      console.log("starter: "+starter);
      starter=1;

      if(computer1Beginntcounter===4){
        computer2BeginntLogik();
      }
      computer2Beginnt(0);
    }
    else{
      computer2BeginntLogik();
      console.log("starter: "+starter);
      starter=2;
    }
    console.log(id);

    checken();
  }

  function computer2BeginntLogik(){
    $('input[name=starter]').attr("disabled",true);
    $("#color1").prop('disabled', true);
    $("#color2").prop('disabled', true);
    $("#computer1").prop('disabled', true);
    $("#computer2").prop('disabled', true);
    $('#name1').prop('disabled', true);
    $('#name2').prop('disabled', true);
    $('#reset').prop('disabled', false);
    $('#startGame').prop('disabled', true);
    $('#symbol1').prop('disabled', true);
    $('#symbol2').prop('disabled', true);

    //Logik beginnt
    if(b2===0){
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    //Zwei Felder aneinander == nächster Zug Sieg
    //horizontal
    else if (a1===2 && a2===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    else if (a2===2 && a3===2 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (a1===2 && a3===2 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol2').val());
    }
    else if (b1===2 && b2===2 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol2').val());
    }
    else if (b2===2 && b3===2 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol2').val());
    }
    else if (b1===2 && b3===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    else if (c1===2 && c2===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (c2===2 && c3===2 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    else if (c1===2 && c3===2 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol2').val());
    }
    //vertikal
    else if (a1===2 && b1===2 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    else if (a1===2 && c1===2 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol2').val());
    }
    else if (b1===2 && c1===2 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (a2===2 && b2===2 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol2').val());
    }
    else if (a2===2 && c2===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    else if (b2===2 && c2===2 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol2').val());
    }
    else if (a3===2 && b3===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (b3===2 && c3===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    else if (a3===2 && c3===2 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol2').val());
    }
    //schief
    else if (a1===2 && b2===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (c3===2 && b2===2 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (a1===2 && c3===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    //schief andere Richtung
    else if (a3===2 && b2===2 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    else if (a3===2 && c1===2 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    else if (b2===2 && c1===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    else if (a2===0 && b2===2 && c2===0 && spielzuege>4) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol2').val());
    }
    //Sieg des Gegners verhindern
    //horizontal
    else if (a1===1 && a2===1 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    else if (a2===1 && a3===1 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (a1===1 && a3===1 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol2').val());
    }
    else if (b1===1 && b2===1 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol2').val());
    }
    else if (b2===1 && b3===1 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol2').val());
    }
    else if (b1===1 && b3===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    else if (c1===1 && c2===1 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (c2===1 && c3===1 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    else if (c1===1 && c3===1 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol2').val());
    }
    //vertikal
    else if (a1===1 && b1===1 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    else if (a1===1 && c1===1 && b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol2').val());
    }
    else if (b1===1 && c1===1 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (a2===1 && b2===1 && c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol2').val());
    }
    else if (a2===1 && c2===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    else if (b2===1 && c2===1 && a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol2').val());
    }
    else if (a3===1 && b3===1 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (b3===1 && c3===1 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    else if (a3===1 && c3===1 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol2').val());
    }
    //schief
    else if (a1===1 && b2===1 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (c3===1 && b2===1 && a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (a1===1 && c3===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    //schief andere Richtung
    else if (a3===1 && b2===1 && c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    else if (a3===1 && c1===1 && b2===0) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    else if (b2===1 && c1===1 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    //nur ein kästchen + reihe frei
    else if (a1===2 && a2===0 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    else if (a1===0 && a2===2 && a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    else if (a1===0 && a2===0 && a3===2) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (b1===2 && b2===0 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol2').val());
    }
    else if (b1===0 && b2===2 && b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol2').val());
    }
    else if (b1===0 && b2===0 && b3===2) {
      b2=2;
      $("#"+String(6)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(6)).prop('disabled', true);
      $("#"+String(6)).css('font-size', '40px');
      $("#"+String(6)).html($('#symbol2').val());
    }
    else if (c1===2 && c2===0 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (c1===0 && c2===2 && c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (c1===0 && c2===0 && c3===2) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    //ansonsten eckfelder
    else if (a1===0) {
      a1=2;
      $("#"+String(2)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(2)).prop('disabled', true);
      $("#"+String(2)).css('font-size', '40px');
      $("#"+String(2)).html($('#symbol2').val());
    }
    else if (c3===0) {
      c3=2;
      $("#"+String(7)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(7)).prop('disabled', true);
      $("#"+String(7)).css('font-size', '40px');
      $("#"+String(7)).html($('#symbol2').val());
    }
    else if (c1===0) {
      c1=2;
      $("#"+String(8)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(8)).prop('disabled', true);
      $("#"+String(8)).css('font-size', '40px');
      $("#"+String(8)).html($('#symbol2').val());
    }
    else if (a3===0) {
      a3=2;
      $("#"+String(1)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(1)).prop('disabled', true);
      $("#"+String(1)).css('font-size', '40px');
      $("#"+String(1)).html($('#symbol2').val());
    }
    //ansonsten aussenfelder mitte
    else if (a2===0) {
      a2=2;
      $("#"+String(3)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(3)).prop('disabled', true);
      $("#"+String(3)).css('font-size', '40px');
      $("#"+String(3)).html($('#symbol2').val());
    }
    else if (b3===0) {
      b3=2;
      $("#"+String(4)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(4)).prop('disabled', true);
      $("#"+String(4)).css('font-size', '40px');
      $("#"+String(4)).html($('#symbol2').val());
    }
    else if (c2===0) {
      c2=2;
      $("#"+String(9)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(9)).prop('disabled', true);
      $("#"+String(9)).css('font-size', '40px');
      $("#"+String(9)).html($('#symbol2').val());
    }
    else if (b1===0) {
      b1=2;
      $("#"+String(5)).css("background-color",$("#color2").css('backgroundColor'));
      $("#"+String(5)).prop('disabled', true);
      $("#"+String(5)).css('font-size', '40px');
      $("#"+String(5)).html($('#symbol2').val());
    }
    //random
    else{
      if(a1!=0 && a2!=0 && a3!=0 && b1!=0 && b2!=0 && b3!=0 && c1!=0 && c2!=0 && c3!=0){
        unentschieden();
      }
    }
    checken();
  }

  function saveLang(language){
    localStorage.setItem("lang", language);
  }


function close_app(){
       var window = remote.getCurrentWindow();
       window.close();
     }
