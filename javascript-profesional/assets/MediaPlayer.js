"use strict";
//use config and this.media to make code reusable
function MediaPlayer(config) {
  /* parameter config = { el: video }
       el = HTML element, can be h1, p, div etc
      how do I reach video in player - assign it to this.media (we could name it e.g. myVideo), 
      config.el gives me video, the value of el { el: video } */
  this.media = config.el;
  // console.log(this); MediaPlayer, this.media inside is like MediaPlayer.media outside this function
  // console.log(this.media); <video class="movie"><source...></video>
}

//play => we could name it anything
MediaPlayer.prototype.play = function () {
  //reserved keyword play() - method of HTMLMediaElement <video> has a method play()
  this.media.play();
  /* other option instead of pause() and togglePlay(): 
    this.media.paused ? this.media.play() : this.media.pause() */
};

MediaPlayer.prototype.pause = function () {
  this.media.pause();
};

MediaPlayer.prototype.togglePlay = function () {
  //HTMLMediaElement.paused: A boolean value. true is paused and false is not paused
  this.media.paused ? this.media.play() : this.media.pause();
};

export default MediaPlayer;
/* export const foo = "bar"; */
