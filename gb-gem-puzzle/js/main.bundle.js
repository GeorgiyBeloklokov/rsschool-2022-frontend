(()=>{"use strict";function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function n(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),Object.defineProperty(t,"prototype",{writable:!1}),t}function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function i(t){return function(t){if(Array.isArray(t))return a(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return a(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?a(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var s=function(){function e(n){t(this,e),this.count=n,this.result=0,this.sum=0,this.shuffleArray=[]}return n(e,[{key:"checkSolvability",value:function(){for(;0==this.result;){this.shuffle();for(var t=0;t<this.count;t++)if(0!=t)for(var e=t+1;e<=this.count;e++)this.shuffleArray[t]>this.shuffleArray[e]&&0!=this.shuffleArray[e]&&this.sum++;if(this.count%2==0){var n=this.getZeroPosition();if(this.sum=this.sum+n,this.sum%2==0)return this.result=1,this.shuffleArray}if(this.count%2!=0&&this.sum%2==0&&0!=this.sum)return this.result=1,this.shuffleArray}}},{key:"shuffle",value:function(){for(var t=i(Array(Math.pow(this.count,2)).keys()),e=t.length-1;e>0;e--){var n=Math.floor(Math.random()*(e+1)),a=t[e];t[e]=t[n],t[n]=a}this.shuffleArray=t}},{key:"getZeroPosition",value:function(){for(var t,e=this.shuffleArray.slice(),n=[],a=1;a<=e.length;a++){for(;e.length;)n.push(e.splice(0,this.count));n.forEach((function(e,n){e.includes(0,0)&&(t=n+1)}))}return t}}]),e}(),o=function(){function e(n,a){t(this,e),this.target=n,this.zero=a,this.zeroCoord={x:null,y:null},this.targetCoord={x:null,y:null},this.size=null,this.data=null,this.step=0}return n(e,[{key:"getdataNumber",value:function(){this.data=this.target.dataset.number}},{key:"getsize",value:function(){this.size=1.5*this.target.offsetWidth}},{key:"setTargetCoord",value:function(){this.targetCoord.x=Math.round(this.target.getBoundingClientRect().x),this.targetCoord.y=Math.round(this.target.getBoundingClientRect().y)}},{key:"setZeroCoord",value:function(){this.zeroCoord.x=Math.round(this.zero.getBoundingClientRect().x),this.zeroCoord.y=Math.round(this.zero.getBoundingClientRect().y)}},{key:"replaceItems",value:function(){this.getdataNumber(),this.getsize(),this.setTargetCoord(),this.setZeroCoord();var t=Math.abs(this.zeroCoord.x-this.targetCoord.x),e=Math.abs(this.zeroCoord.y-this.targetCoord.y);0==e&&t<=this.size&&(this.changeItems(),this.increaseStep()),0==t&&e<=this.size&&(this.changeItems(),this.increaseStep())}},{key:"changeItems",value:function(){this.target.setAttribute("data-number","0"),this.target.classList.remove("puzzle-item"),this.target.classList.add("empty"),this.target.innerText="",this.zero.setAttribute("data-number",this.data),this.zero.classList.remove("empty"),this.zero.classList.add("puzzle-item"),this.zero.innerText=this.data}},{key:"increaseStep",value:function(){this.step++}},{key:"getStep",value:function(){return this.step}},{key:"dragAndDrop",value:function(){var t=this;this.setTargetCoord(),this.setZeroCoord();var e=Math.abs(this.zeroCoord.x-this.targetCoord.x),n=Math.abs(this.zeroCoord.y-this.targetCoord.y);(n<=this.target.offsetWidth+10&&0==e||e<=this.target.offsetWidth+10&&0==n)&&(this.getdataNumber(),setTimeout((function(){t.target.classList.add("hide-item")}),0),this.target.addEventListener("dragend",(function(t){t.target.classList.remove("hide-item")})),this.zero.addEventListener("dragover",(function(t){t.preventDefault()})),this.zero.addEventListener("dragenter",(function(t){t.preventDefault(),t.target.classList.add("drag-hover")})),this.zero.addEventListener("dragleave",(function(t){t.target.classList.remove("drag-hover")})),this.zero.addEventListener("drop",(function(e){t.target.setAttribute("data-number","0"),t.target.classList.remove("puzzle-item"),t.target.classList.add("empty"),t.target.innerText="",e.target.setAttribute("data-number",t.data),e.target.classList.remove("empty"),e.target.classList.add("puzzle-item"),e.target.innerText=t.data,e.target.classList.remove("drag-hover")})))}}]),e}(),r=function(){function e(n,a,i,s){t(this,e),this.gameField=n,this.time=a,this.stepCount=i,this.itemCount=s,this.topMoves=[]}return n(e,[{key:"setDataToLocalStorage",value:function(){this.topMoves.push({step:this.stepCount});var t=JSON.parse(localStorage.getItem("gemPuzzle"));t&&(this.topMoves=[].concat(i(this.topMoves),i(null==t?void 0:t.topMoves)));var e=[];this.gameField.forEach((function(t){e.push(t.dataset.number)}));var n={gameField:e,time:this.time,step:this.stepCount,itemCount:this.itemCount,topMoves:this.topMoves};localStorage.setItem("gemPuzzle",JSON.stringify(n))}},{key:"createPopup",value:function(t){var e=document.createElement("div");e.classList.add("popup"),document.body.append(e);var n=document.createElement("p");return n.classList.add("text-popup"),n.innerText=t,e.append(n),e}},{key:"createPopupOfResult",value:function(t,e){var n=document.createElement("div");n.classList.add("popup"),document.body.append(n);var a=document.createElement("div");a.classList.add("container-popup");var i=document.createElement("p");i.classList.add("label-container"),i.innerText=e,a.append(i);var s=document.createElement("p");return s.classList.add("text-container"),s.innerText=null!=t?t:"0",a.append(s),n.append(a),n}},{key:"createSaveButton",value:function(t){var e=document.createElement("button");return e.classList.add("popup-button"),e.innerText=t,e}},{key:"createRejectButton",value:function(){var t=document.createElement("button");return t.classList.add("popup-button"),t.innerText="No",t}}]),e}(),u=function(){function e(){t(this,e),this.buttonYes=null,this.buttonNo=null,this.popup=null}return n(e,[{key:"checkDataInLocalStorage",value:function(){return null!==localStorage.getItem("gemPuzzle")?JSON.parse(localStorage.getItem("gemPuzzle")):null}},{key:"createLoadPopup",value:function(){var t=document.createElement("div");t.classList.add("popup"),document.body.append(t);var e=document.createElement("p");e.classList.add("text-popup"),e.innerHTML="There is a saved game, do you want to load it?",t.append(e);var n=document.createElement("button");n.classList.add("popup-button"),n.innerText="Yes",t.append(n);var a=document.createElement("button");a.classList.add("popup-button"),a.innerText="No",t.append(a),this.buttonNo=a,this.buttonYes=n,this.popup=t}}]),e}(),l=function(){function e(n,a){t(this,e),this.fieldSize=a,this.items=n,this.currentNumbers=[]}return n(e,[{key:"getCurrentNumbers",value:function(){var t=this;this.currentNumbers=[],this.items.forEach((function(e){t.currentNumbers.push(e.dataset.number)}))}},{key:"validation",value:function(){this.getCurrentNumbers();var t=i(Array(Math.pow(this.fieldSize,2)-1).keys()).map((function(t){return t+1})).concat(0),e=this.currentNumbers.join("");return t.join("")==e}}]),e}(),c=function(){function e(n,a){t(this,e),this.time="".concat(n.hours,":").concat(n.minutes,":").concat(n.seconds),this.step=a,this.winNotice="win!",this.winCount="Hooray! You solved the puzzle in ".concat(this.time," and  ").concat(this.step," moves !")}return n(e,[{key:"createWinNotice",value:function(){var t=document.createElement("div");t.classList.add("win-container"),document.body.append(t);var e=document.createElement("div");e.classList.add("win-notice"),t.append(e);var n=document.createElement("div");n.classList.add("win-count"),e.after(n);var a=document.createElement("button");a.classList.add("closeButton"),a.innerHTML="x",t.append(a),this.winNotice.split("").forEach((function(t,n){var a=document.createElement("span");a.innerHTML=t,e.append(a),setInterval((function(){a.classList.add("animateLetters")}),100*n)}));var i=document.createElement("span");return i.innerHTML=this.winCount,n.append(i),setInterval((function(){i.classList.add("animateLetters")}),2e3),t}}]),e}();(new(function(){function e(){t(this,e),this.itemCount="4",this.mainContainer=null,this.buttonContainer=null,this.puzzleContainer=null,this.settingContainer=null,this.puzzleItems=[],this.select=null,this.ul=null,this.frameSize=null,this.buttonSave,this.buttonPlay=null,this.buttonSetting=null,this.buttonRestart=null,this.buttonStop=null,this.buttonResult=null,this.changeSelectFrame=null,this.soundButton=null,this.saveButton=null,this.loadPopup=null,this.rejectButton=null,this.stepCountContainer=null,this.step=0,this.time=null,this.gameTime={hours:0,minutes:0,seconds:0},this.sound=!0,this.loadGame=null,this.popup=null,this.popupButtons={yes:null,no:null},this.isLoadSavedGame=!1}return n(e,[{key:"init",value:function(){var t=document.createElement("main"),e=document.createElement("button");t.classList.add("main-container"),e.classList.add("sound-button"),this.mainContainer=t,this.soundButton=e,this.soundButton.style.backgroundImage="url(../assets/images/mute-on.png)",document.body.append(this.mainContainer),document.body.append(e),this.loadSavedGame(),this.isLoadSavedGame=!1,this.clear(),this.startGame(),this.createSettingItem(),this.toggleSound()}},{key:"startGame",value:function(){this.createGameField(this.itemCount),this.replaceItems(),this.setTime(),this.setStepCount()}},{key:"createFieldGrid",value:function(t){return"3"===t?"small-field":"4"===t?"default-field":"5"===t?"middle-field":"6"===t?"middle-field-six":"7"===t?"big-field":"8"===t?"big-field-eight":void 0}},{key:"createGameField",value:function(t){var e=this,n=document.createElement("div");n.classList.add("button-container");var a=document.createElement("button");a.classList.add("game-button","restart-button"),a.innerText="Shuffle and start",this.buttonRestart=a,this.restart();var i=document.createElement("button");i.classList.add("game-button","stop-button"),i.innerText="Stop",this.buttonStop=i,this.stop();var o=document.createElement("button");o.classList.add("game-button","save-button"),o.innerText="Save",this.buttonSave=o,this.end();var r=document.createElement("button");r.classList.add("game-button","result-button"),r.innerText="Result",this.buttonResult=r,this.result(),n.append(a,i,o,r),this.mainContainer.append(n),this.buttonContainer=n;var u=[],l=this.createFieldGrid(t),c=document.createElement("div");c.classList.add("puzzle-container","puzzle-show"),c.classList.add(l),this.mainContainer.append(c),this.puzzleContainer=c,!0===this.isLoadSavedGame&&(u=this.loadGame.gameField),!1===this.isLoadSavedGame&&(u=new s(this.itemCount).checkSolvability()),u.forEach((function(t){var n=document.createElement("div");n.classList.add("puzzle-item"),n.setAttribute("data-number",t),n.setAttribute("draggable","true"),n.innerText=t,c.append(n),e.puzzleItems.push(n),0!==t&&"0"!==t||(n.innerText="",n.setAttribute("data-number","0"),n.classList.remove("puzzle-item"),n.classList.add("empty"),n.setAttribute("draggable","false"))}));var d=document.createElement("p");d.classList.add("time"),d.innerText="Time: ",this.puzzleContainer.append(d),this.time=d;var m=document.createElement("p");m.classList.add("step-count"),m.innerText="Moves: "+this.step,this.puzzleContainer.append(m),this.stepCountContainer=m}},{key:"createSettingItem",value:function(){var t=this;null!=this.settingContainer&&(document.querySelector(".setting-container").remove(),this.settingContainer=null);var e=document.createElement("section");e.classList.add("setting-container"),this.mainContainer.append(e),this.settingContainer=e;var n=document.createElement("label");n.classList.add("setting-label"),n.setAttribute("for","count-item"),n.innerText="Frame size: ".concat(this.frameSize),this.settingContainer.append(n);var a=document.createElement("ul");a.classList.add("ul"),["3x3","4x4","5x5","6x6","7x7","8x8"].map((function(e){var n=document.createElement("li"),i=document.createElement("p");n.append(i),i.innerText=e,a.append(n),t.settingContainer.append(a)})),this.ul=a,this.changeSelectFrame=this.ul,this.setItemCount()}},{key:"replaceItems",value:function(){var t=this;this.puzzleItems.forEach((function(e){e.addEventListener("click",(function(e){1==t.sound&&new Audio("../assets/sounds/move.mp3").play();var n=e.target;if(!n.classList.contains("empty")){var a=document.querySelector(".empty"),i=new o(n,a);if(i.replaceItems(),t.step+=i.getStep(),t.setStepCount(),!0===new l(t.puzzleItems,t.itemCount).validation()){t.puzzleContainer.remove(),t.toggleGameButtonHide();var s=new c(t.gameTime,t.step).createWinNotice();document.body.append(s),s.addEventListener("click",(function(){s.remove(),t.itemCount="4",t.puzzleItems=[]}))}}}))}))}},{key:"restart",value:function(){var t=this;this.buttonRestart.addEventListener("click",(function(){t.isLoadSavedGame=!1,t.puzzleItems=[],t.clear(),t.puzzleContainer.remove(),t.buttonStop.remove(),t.buttonRestart.remove(),t.buttonContainer.remove(),t.startGame(),t.createSettingItem(),t.setStepCount()}))}},{key:"stop",value:function(){var t=this;this.buttonStop.addEventListener("click",(function(){t.isLoadSavedGame=!1,t.clear(),t.gameTime=null,t.stepCountContainer=null}))}},{key:"end",value:function(){var t=this;this.buttonSave.addEventListener("click",(function(){var e=new r(t.puzzleItems,t.gameTime,t.step,t.itemCount),n=e.createPopup("Save the game? - F5 to load saved game ");t.mainContainer.append(n);var a=e.createSaveButton("Yes");n.append(a),t.saveButton=a;var i=e.createRejectButton();t.rejectButton=i,n.append(i),a.addEventListener("click",(function(){n.remove(),e.setDataToLocalStorage();var a=e.createPopup("Your game has been saved");t.mainContainer.append(a),setTimeout((function(){a.remove()}),800),t.puzzleItems=[]})),i.addEventListener("click",(function(){n.remove(),t.puzzleItems=[],t.clear(),t.itemCount="4"}))}))}},{key:"result",value:function(){var t=this;this.buttonResult.addEventListener("click",(function(){var e=new r,n=JSON.parse(localStorage.getItem("gemPuzzle")),a=e.createPopupOfResult(null==n?void 0:n.topMoves.map((function(t){return t.step})),"Top moves:");t.mainContainer.append(a);var i=e.createSaveButton("Close");a.append(i),t.saveButton=i,i.addEventListener("click",(function(){a.remove()}))}))}},{key:"toggleSound",value:function(){var t=this;this.soundButton.addEventListener("click",(function(){t.sound=!t.sound,1==t.sound?t.soundButton.style.backgroundImage="url(../assets/images/mute-on.png)":t.soundButton.style.backgroundImage="url(../assets/images/mute-off.png)"}))}},{key:"clear",value:function(){this.gameTime={hours:0,minutes:0,seconds:0},this.step=0}},{key:"loadSavedGame",value:function(){var t=this,e=new u;this.loadGame=e.checkDataInLocalStorage(),null!==this.loadGame&&(e.createLoadPopup(),e.buttonYes.addEventListener("click",(function(){t.puzzleContainer.remove(),t.buttonContainer.remove(),t.setLoadData(),t.startGame(),t.createSettingItem(),document.getElementsByClassName("popup")[0].remove()})),e.buttonNo.addEventListener("click",(function(){document.getElementsByClassName("popup")[0].remove()})))}},{key:"setLoadData",value:function(){this.itemCount=this.loadGame.itemCount,this.gameTime.hours=this.loadGame.time.hours,this.gameTime.minutes=this.loadGame.time.minutes,this.gameTime.seconds=this.loadGame.time.seconds,this.step=this.loadGame.step}},{key:"setItemCount",value:function(){var t=this;this.changeSelectFrame.addEventListener("click",(function(e){var n=e.target.textContent.toString();t.frameSize=n,t.itemCount=n.split("x")[0],t.isLoadSavedGame=!1,t.puzzleItems=[],t.clear(),t.puzzleContainer.remove(),t.buttonContainer.remove(),t.startGame(),t.setStepCount(),t.createSettingItem()}))}},{key:"setTime",value:function(){var t=this,e=document.createElement("span");this.time.append(e);var n=this.gameTime.seconds||0,a=this.gameTime.seconds||0,i=this.gameTime.minutes||0,s=this.gameTime.hours||0;setInterval((function(){null!==t.gameTime&&(n++,a=n<10?"0"+n:n,t.gameTime.seconds=a,i=t.gameTime.minutes<10?"0"+t.gameTime.minutes:t.gameTime.minutes,s=t.gameTime.hours<10?"0"+t.gameTime.hours:t.gameTime.hours,a>=59&&(n=0,t.gameTime.minutes++),i>=59&&t.gameTime.hours++,e.innerHTML=s+" : "+i+" : "+a)}),1e3)}},{key:"setStepCount",value:function(){this.stepCountContainer.innerHTML="Moves: "+this.step}}]),e}())).init()})();