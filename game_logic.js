var timeMode = true;
var lang = 'en';
var buttonNumbers = [];
var usedButtonIndexes = [];
var isMobile = false;
var clicks = 0;
var wonGames = 0;
var lostGames = 0;

$(document).ready(function () {
  // load selected language
  if(localStorage.getItem("lang") != null){
    if(localStorage.getItem("lang") == "de"){
      lang_de();
    }
    else if (localStorage.getItem("lang") == "en") {
      lang_en();
    }
  }

  $('#start_game_button').removeAttr('disabled');
  $('#fade_in_input').removeAttr('disabled');
  $('#fade_out_input').removeAttr('disabled');
  $('#displayed_numbers_picker').removeAttr('disabled');
  $('#time_mode_radio').removeAttr('disabled');
  $('#click_mode_radio').removeAttr('disabled');
  // device detection
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){
        isMobile = true;
      }

  if(isMobile){
    //make start button bigger, to better be able to touch it on small screen.
    $('#playground').css('left', '18%');
    $('#playground').css('top', '420px');
    $('#fade_in_input').val('1500');
    $('#fade_in_input').css('margin-left', '3px');
    $('#time_mode_radio').css('margin-top', '8px');
    $('#time_mode_settings').css('margin-bottom', '4px');
    $('#close_button').css('height', '80px');
    $('#close_button').css('width', '140px');
    $('#start_game_button').css('height', '80px');
    $('#start_game_button').css('width', '140px');
    $('#start_game_button').css('font-size', '25px');
    $('#close_button').css('font-size', '25px');
    $('#won_games_label').css('font-size', '17px');
    $('#lost_games_label').css('font-size', '17px');
  }

  $('#time_mode_settings').slideDown(400);
  timeMode = true;
  $('#time_mode_radio').prop('checked', true);

  // radios
  $('input[type=radio][name=mode]').change(function () {
    if (this.id === 'time_mode_radio') {
      timeMode = true;
      $('#time_mode_settings').slideDown(400);
    }else if (this.id === 'click_mode_radio') {
      timeMode = false;
      $('#time_mode_settings').slideUp(400);
    }
  });

  // create the game field buttons
  for (var i = 0; i < 40; i++) {
    var r = $('<div style="float: left" id="'+ "buttondiv"+ String(i) +'"><button style="width: 100px; height: 100px; background-color: #000000; color: #ffffff; font-size : 60px; border:none;" id="' + "gameButton" + String(i)+'"></button>' + '</div>');
    $("#playground").append(r);
  }

  for (var f = 0; f < 40; f++) {
    $('#gameButton' + String(f)).prop('disabled', 'true');
  }

  //buttons
  $('button').on('click', function (){
    if (this.id === 'close_button') {

    }
    else if (this.id === 'start_game_button') {
      startTheGame();
    }
    else if (this.id === 'lang_en') {
      lang_en();
    }
    else if (this.id === 'lang_de') {
      lang_de();
    }
    else {
        clicks++;
        if(clicks === 1){
          hideDigits();
        }
        $('#' + String(this.id)).css('background-color', '#000000');
        $('#' + String(this.id)).prop('disabled', 'true');
        $('#' + String(this.id)).css('font-size', '0px');
        checkCorrectOrder($('#' + String(this.id)).html());
      }
    });
  });

  function startTheGame() {
      if ($('#fade_in_input').val()<1 || $('fade_out_input').val()<1) {
        showInputErrorWarning();
      }
      else {
        // disable settings
        $('#start_game_button').prop('disabled', 'true');
        $('#fade_in_input').prop('disabled', 'true');
        $('#fade_out_input').prop('disabled', 'true');
        $('#displayed_numbers_picker').prop('disabled', 'true');
        $('#time_mode_radio').prop('disabled', 'true');
        $('#click_mode_radio').prop('disabled', 'true');

        setTimeout(function(){
          generateNumbers();
        }, $('#fade_in_input').val());

      }
  }

function showInputErrorWarning () {
  if (lang === 'en') {
    window.alert('You have to enter a numeric value in both text fields.');
  }
  else if (lang === 'de') {
    window.alert('Sie müssen eine Zahl in beide Textfelder eingeben.');
  }
}

function isNumber (evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

function generateNumbers () {
  buttonNumbers = [];
  for (var i = 0; i < $('#displayed_numbers_picker').val(); i++) {
    var number = Math.floor((Math.random() * 9)+1);
    if(buttonNumbers.indexOf(number) === -1){
    buttonNumbers[i] = number;
  }
  else {
    i--;
  }
  }
  for (var f = 0; f < 40; f++) {
    $('#gameButton' + String(f)).removeAttr('disabled');
  }
  initializeButtons();
}

function initializeButtons () {
  usedButtonIndexes = [];
  for (var i = 0; i < buttonNumbers.length; i++) {
    var number = Math.floor((Math.random() * 40));
    if(usedButtonIndexes.indexOf(number) === -1){
      usedButtonIndexes[i] = number;
    }
    else {
      i--;
    }
  }
  for (var i = 0; i < buttonNumbers.length; i++) {
    $('#gameButton' + String(usedButtonIndexes[i])).html(buttonNumbers[i]);
  }
  for (var c = 0; c < 40; c++) {
    if (!$('#gameButton' + String(c)).text().trim().length) {
      $('#gameButton' + String(c)).prop('disabled', 'true');
    }
  }
  if(timeMode){
    setTimeout(function(){
      hideDigits();
    }, $('#fade_out_input').val());
  }
  else {
    // let the hideDigits function be called from button click.
  }
}

function hideDigits () {
  for (var i = 0; i < buttonNumbers.length; i++) {
    $('#gameButton' + String(usedButtonIndexes[i])).css('background-color', '#ffffff');
  }
}

function checkCorrectOrder (buttonDigit){
  buttonNumbers.sort(function(a, b){return b-a});
  if(buttonDigit == buttonNumbers[buttonNumbers.length-1]){
    buttonNumbers.pop();
    console.log(buttonNumbers[buttonNumbers.length-1]);
    if(buttonNumbers.length == 0){
      won();
    }
  }
  else {
    lost();
  }
}

function lost (){
  lostGames++;
  for (var i = 0; i < 40; i++) {
    $('#gameButton' + String(i)).css('background-color', '#000000');
    $('#gameButton' + String(i)).prop('disabled', 'true');
    $('#gameButton' + String(i)).css('font-size', '60px');
  }
  if(lang === 'en'){
    $("#lost_games_label").html("Lost Games: " + String(lostGames));
    showDialog('You lost.', 'Do you want to play again?', 'Yes', 'No');
  }
  else if (lang === 'de') {
    showDialog('Verloren.', 'Möchten sie erneut spielen?', 'Ja', 'Nein');
    $("#lost_games_label").html("Verloren: " + String(lostGames));
  }
}

function won () {
  wonGames++;
  for (var i = 0; i < 40; i++) {
    $('#gameButton' + String(i)).css('font-size', '60px');
  }
  if(lang === 'en'){
    showDialog('You won.', 'Do you want to play again?', 'Yes', 'No');
    $("#won_games_label").html("Won Games: " + String(wonGames));
  }
  else if (lang === 'de') {
    showDialog('Gewonnen.', 'Möchten sie erneut spielen?', 'Ja', 'Nein');
    $("#won_games_label").html("Gewonnen: " + String(wonGames));
  }
}

function showDialog (title_text, message, option1, option2) {
  var btnNames = {};
    btnNames[option1] = function(){ restartGame (); $(this).dialog('close'); };
    btnNames[option2] = function(){ resetGame(); $(this).dialog('close'); };

if(isMobile){
  $('<div></div>').appendTo('body')
  .html('<div><h1>' + message + '</h1></div>')
  .dialog({
      modal: true, title: title_text, zIndex: 10000, autoOpen: true,
      width: 'auto', resizable: true,
      buttons: btnNames,
      close: function (event, ui) {
        resetGame();
        $(this).remove();},
      dialogClass: "dialog",
      create:function () {
        $(this).closest(".ui-dialog").find(".ui-button:first").addClass("custom_mobile");
        $(this).closest(".ui-dialog").find('button:contains("' + option1 + '")').addClass('yes_option_mobile');
        $(this).closest(".ui-dialog").find('button:contains("' + option2 + '")').addClass('no_option_mobile');
    }
  });
}
else {
  $('<div></div>').appendTo('body')
  .html('<div><h5>' + message + '</h5></div>')
  .dialog({
      modal: true, title: title_text, zIndex: 10000, autoOpen: true,
      width: 'auto', resizable: true,
      buttons: btnNames,
      close: function (event, ui) {
        resetGame();
        $(this).remove();},
      dialogClass: "dialog",
      create:function () {
        $(this).closest(".ui-dialog").find(".ui-button:first").addClass("custom");
        $(this).closest(".ui-dialog").find('button:contains("' + option1 + '")').addClass('yes_option');
        $(this).closest(".ui-dialog").find('button:contains("' + option2 + '")').addClass('no_option');
    }

});
}
 $(".ui-dialog-titlebar").removeClass("ui-widget-header");
$(".dialog .ui-dialog-titlebar").css("background-color", "#FFDB0D");

//restore settings
$('#start_game_button').removeAttr('disabled');
$('#fade_in_input').removeAttr('disabled');
$('#fade_out_input').removeAttr('disabled');
$('#displayed_numbers_picker').removeAttr('disabled');
$('#time_mode_radio').removeAttr('disabled');
$('#click_mode_radio').removeAttr('disabled');
}

function restartGame () {
  for (var f = 0; f < 40; f++) {
    $('#gameButton' + String(f)).css('background-color', '#000000');
    $('#gameButton' + String(f)).removeAttr("disabled");
    $('#gameButton' + String(f)).html('');
  }
  clicks = 0;
  startTheGame();
}

function resetGame () {
  for (var f = 0; f < 40; f++) {
    $('#gameButton' + String(f)).css('background-color', '#000000');
    $('#gameButton' + String(f)).html('');
  }
  clicks = 0;
}

function lang_en () {
  lang = 'en';
  $("#won_games_label").html('Won Games: ' + String(wonGames));
  $("#lost_games_label").html('Lost Games: ' + String(lostGames));
  $('#start_game_button').html('Start');
  $('#displayed_numbers_label').html('How many Numbers: ');
  $('#fade_in_input_label').html('Time for Fade-In: ');
  $('#fade_out_input_label').html('Time for Fade-Out: ');
  $('#time_mode_radio_label').html('Time-Mode');
  $('#click_mode_radio_label').html('Click-Mode');
  $('#close_button').val('Close');
  $('#close_button').css('width', '70px');
  $('#fade_in_input').css('margin-left', '17px');
  $('h3').html("Settings");
  //changing tooltips
  $('#close_button').prop('title', 'Go back to my Github page.');
  $('#start_game_button').prop('title', 'Start the Game.');
  $('#fade_in_input').prop('title', 'Time for fade-in. This is in order for your eyes to concentrate on the game screen after hitting the start button. Default value should be fine.');
  $('#fade_out_input').prop('title', 'Time for fade-out. E.g. how long you can see the numbers until they get hidden. During this time you can not click any numbers.');
  $('#displayed_numbers_picker').prop('title', 'How many digits can you remember?');
  $('#click_mode_radio').prop('title', 'In click-mode the digits will be hidden after you clicked the first digit.');
  $('#time_mode_radio').prop('title', 'In time-mode the digits will be auto-hidden after the selected fade-out time.');
  $('#click_mode_radio_label').prop('title', 'In click-mode the digits will be hidden after you clicked the first digit.');
  $('#time_mode_radio_label').prop('title', 'In time-mode the digits will be auto-hidden after the selected fade-out time.');
  saveLang(lang);
}

function lang_de () {
  lang = 'de';
  $("#won_games_label").html('Gewonnen: ' + String(wonGames));
  $("#lost_games_label").html('Verloren: ' + String(lostGames));
  $('#start_game_button').html('Start');
  $('#displayed_numbers_label').html('Wie viele Zahlen: ');
  $('#fade_in_input_label').html('Einblendzeit: ');
  $('#fade_out_input_label').html('Ausblendzeit: ');
  $('#time_mode_radio_label').html('Zeit-Modus');
  $('#click_mode_radio_label').html('Klick-Modus');
  $('#close_button').val('Schliessen');
  $('#close_button').css('width', '85px');
  $('#fade_in_input').css('margin-left', '9px');
  $('h3').html("Einstellungen");
  //changing tooltips
  $('#close_button').prop('title', 'Zurück zur Github Seite.');
  $('#start_game_button').prop('title', 'Spiel starten.');
  $('#fade_in_input').prop('title', 'Die Einblendzeit ist die Zeit bis die Zahlen nach drücken des Start Knopfes auf dem Bildschirm auftauchen und dient dazu, dass sich die Augen auf das Spielfeld konzentrieren können. Der Standardwert sollte ausreichen.');
  $('#fade_out_input').prop('title', 'Die Ausblendzeit gibt an wie lange die Zahlen auf dem Bildschirm auftauchen, bis sie automatisch verdeckt werden. In dieser Zeit können sie noch keine Zahlen anklicken.');
  $('#displayed_numbers_picker').prop('title', 'Anzahl der Ziffern die man sich merken muss.');
  $('#click_mode_radio').prop('title', 'Beim Klick-Modus werden die Zahlen erst nach auswählen der ersten Zahl verdeckt.');
  $('#time_mode_radio').prop('title', 'Im Zeit-Modus werden die Zahlen nach Ablauf der Ausblendzeit automatisch verdeckt.');
  $('#click_mode_radio_label').prop('title', 'Beim Klick-Modus werden die Zahlen erst nach auswählen der ersten Zahl verdeckt.');
  $('#time_mode_radio_label').prop('title', 'Im Zeit-Modus werden die Zahlen nach Ablauf der Ausblendzeit automatisch verdeckt.');
  saveLang(lang);
}

function saveLang(language){
  localStorage.setItem("lang", language);
}
