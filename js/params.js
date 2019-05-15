var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var
  player,
  eventListeners;


function onYouTubeIframeAPIReady() {
  player = new YT.Player('playerVars', {
    videoId: 'spPG2BBavro',
  });
}


var playerVarsSubmit = document.getElementById('buttonApply').addEventListener('click', function(e) {
  e.preventDefault();
  updatePlayerVars();
});


var playerVarsSubmit = document.getElementById('buttonReset').addEventListener('click', function(e) {
  e.preventDefault();
  resetSettings();
});


function updatePlayerVars() {
  var variables = createVarsObject();
  updateContainer();
  player = new YT.Player('playerVars', variables);
};


function copyToClipboard(element){
  var copyText = document.getElementById(element).innerText; 
  document.execCommand("copy");
}


function resetSettings(){
  document.getElementById("printAreaIframe").innerHTML = "";
  document.getElementById("printAreaAPI").innerHTML = "";
  document.getElementById('videoIdInput').value = "";
  document.getElementById('autoplayTick').checked = false;
  document.getElementById('startInput').value = "";
  document.getElementById('endInput').value = "";
  document.getElementById('relTick').checked = false;
  document.getElementById('playlistInput').value = "";
  document.getElementById('widgetRefererInput').value = "";
  document.getElementById('playsInlineTick').checked = "";
  document.getElementById('muteTick').checked = false;
  document.getElementById('loopTick').checked = false;
  document.getElementById('modestbrandingTick').checked = false;   
  document.getElementById('enablejsapiTick').checked = false;  
  document.getElementById('disablekbTick').checked = false;
  document.getElementById('controlsTick').checked = false;
  document.getElementById('colorSelector').value = "";
  document.getElementById('ccLoadPolicyTick').checked = false;
  document.getElementById('ivLoadPolicyTick').checked = false;
}

function createVarsObject(){
  var objVars = {};

  // Get parameters (videoId, width, height ...)
  getParameters(objVars);

  // Get Player Vars Object
  var playerVars = createPlayerVarsObject();
  if(Object.getOwnPropertyNames(playerVars).length !== 0){
    objVars.playerVars = playerVars;
  }

  // Get Event Object
  objVars.events = createEventObject();

  // Display the current API config
  updatePrintAreaAPI(objVars);

  // Display the current iframe config
  updatePrintAreaIframe(objVars);

  return objVars;
}


function updatePrintAreaIframe(objVars){
  document.getElementById("printAreaIframe").innerHTML = "";
  var iframe = "<iframe src=\"https://www.youtube.com/embed/" + objVars.videoId + "?"; 

  for (var key in objVars) {
    if(key === 'events')
      continue;

    if(key === 'playerVars'){
      for (var k in objVars.playerVars){
        iframe += k + "=" + objVars.playerVars[k] + "&";
      }
      continue;
    }
  }

  iframe = iframe.slice(0,-1) + "\"/>";
  document.getElementById("printAreaIframe").append(iframe);
}


function updatePrintAreaAPI(objVars){
  document.getElementById("printAreaAPI").innerHTML = JSON.stringify(objVars, undefined, 2);
}


function getParameters(objParams){
  var videoIdValue;
  if(document.getElementById('videoIdInput').value == ""){
    videoIdValue = 'spPG2BBavro';
  }
  else{
    videoIdValue = document.getElementById('videoIdInput').value;
  }

  objParams.videoId = videoIdValue;
}


function createPlayerVarsObject(){
  var playerVars = {};

  if(document.getElementById('autoplayTick').checked){
    playerVars.autoplay = document.getElementById('autoplayTick').checked;
  }

  if(document.getElementById('startInput').value != ""){
    playerVars.start = document.getElementById('startInput').value;
  }

  if(document.getElementById('endInput').value != ""){
    playerVars.end = document.getElementById('endInput').value;
  }

  if(document.getElementById('relTick').checked){
    playerVars.rel = 0;
  }

  if(document.getElementById('playlistInput').value != ""){
    playerVars.playlist = document.getElementById('playlistInput').value; 
  }

  if(document.getElementById('widgetRefererInput').value != ""){
    playerVars.widget_referrer = document.getElementById('widgetRefererInput').value; 
  }

  if(document.getElementById('playsInlineTick').checked){
    playerVars.playsinline = document.getElementById('playsInlineTick').checked; 
  }

  if(document.getElementById('loopTick').checked){
    playerVars.loop = 1; 
  }

  if(document.getElementById('modestbrandingTick').checked){
    playerVars.modestbranding = 1; 
  }

  if(document.getElementById('enablejsapiTick').checked){
    playerVars.enablejsapi = 1;   
  }

  if(document.getElementById('fsTick').checked){
    playerVars.fs = 0;   
  }

  if(document.getElementById('disablekbTick').checked){
    playerVars.disablekb = 1;   
  }

  if(document.getElementById('controlsTick').checked){
    playerVars.controls = 0;   
  }

  if(document.getElementById('colorSelector').value != ""){
    playerVars.color = document.getElementById('colorSelector').value; 
  }

  if(document.getElementById('ccLoadPolicyTick').checked){
    playerVars.cc_load_policy = 1;   
  }

  if(document.getElementById('ivLoadPolicyTick').checked){
    playerVars.iv_load_policy = 3;   
  }

  return playerVars;
}


function getValues(input){
  return input.split(',');
}


function createEventObject(){
  var eventObject = {};
  eventObject.onReady = 'onPlayerReady'

  return eventObject;
}


function onPlayerReady() {
  if (document.getElementById('muteTick').checked){
    player.mute();
  }
}


function updateContainer() {
  var container = document.getElementById('playerVars').parentNode;
  var newPlayer = document.createElement('div');
  newPlayer.setAttribute("id", "playerVars");
  container.removeChild(document.getElementById('playerVars'));
  container.appendChild(newPlayer);
}