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
  this.plugins = config.plugins || [];
  //initialize
  this._initPlugins();
}

MediaPlayer.prototype._initPlugins = function () {
  //user has control if he whats to play video, exception: autoplay is possible when mute
  /* Right now we are passing this on to all plugins. 
  But I like to have control over how much data I'm passing to the plugins. 
  Maybe I don't want them to have access to the whole player, but only to a single set of its functionality 
  virtual properties don`t exist directly */
  /* this.plugins.forEach((plugin) => {
    plugin.run(this);
  }); */
  const player = {
    play: () => this.play(),
    pause: () => this.pause(),
    media: this.media,
    get muted() {
      return this.media.muted;
    },
    set muted(value) {
      this.media.muted = value;
      /*  if (value === true) {
        this.media.muted = true;
      } else {
        this.media.muted = false;
      } */
    },
  };

  this.plugins.forEach((plugin) => {
    plugin.run(player); //like this none of the plugins will have access to togglePlay, mute, unmute, toggleMute etc
  });
};

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

MediaPlayer.prototype.mute = function () {
  this.media.muted = true;
};

MediaPlayer.prototype.unmute = function () {
  this.media.muted = false;
};

MediaPlayer.prototype.toggleMute = function () {
  this.media.muted = !this.media.muted;
};

MediaPlayer.prototype.volumeUp = function () {
  this.media.volume += 0.05;
};

MediaPlayer.prototype.volumeDown = function () {
  this.media.volume -= 0.05;
};

export default MediaPlayer;
/* export const foo = "bar"; */
