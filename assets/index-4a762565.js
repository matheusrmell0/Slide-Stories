var c=Object.defineProperty;var m=(o,t,e)=>t in o?c(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var i=(o,t,e)=>(m(o,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))d(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&d(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(s){if(s.ep)return;s.ep=!0;const n=e(s);fetch(s.href,n)}})();class a{constructor(t,e){i(this,"id");i(this,"handler");i(this,"start");i(this,"timeLeft");this.handler=t,this.id=setTimeout(t,e),this.start=Date.now(),this.timeLeft=e}clear(){clearTimeout(this.id)}pause(){this.clear();const t=Date.now()-this.start;this.timeLeft=this.timeLeft-t}continue(){this.clear(),this.id=setTimeout(this.handler,this.timeLeft),this.start=Date.now()}}class p{constructor(t,e,d,s=5e3){i(this,"container");i(this,"slides");i(this,"controls");i(this,"time");i(this,"index");i(this,"slide");i(this,"timeOut");i(this,"paused");i(this,"pausedTimeout");i(this,"thumbItems");i(this,"thumb");this.container=t,this.slides=e,this.controls=d,this.time=s,this.index=localStorage.getItem("activeSlide")?Number(localStorage.getItem("activeSlide")):0,this.slide=this.slides[this.index],this.timeOut=null,this.paused=!1,this.pausedTimeout=null,this.thumbItems=null,this.thumb=null,this.init()}hide(t){t.classList.remove("active"),t instanceof HTMLVideoElement&&(t.currentTime=0,t.pause())}show(t){this.index=t,this.slide=this.slides[this.index],localStorage.setItem("activeSlide",String(this.index)),this.slides.forEach(e=>this.hide(e)),this.slide.classList.add("active"),this.slide instanceof HTMLVideoElement?this.autoVideo(this.slide):this.auto(this.time),this.thumbItems&&(this.thumb=this.thumbItems[this.index],this.thumbItems.forEach(e=>e.classList.remove("active")),this.thumb.classList.add("active"))}autoVideo(t){t.muted=!0,t.play();let e=!0;t.addEventListener("playing",()=>{e&&(this.auto(t.duration*1e3),e=!1)})}prev(){if(this.paused)return;const t=this.index>0?this.index-1:this.slides.length-1;this.show(t)}next(){if(this.paused)return;const t=this.index+1<this.slides.length?this.index+1:0;this.show(t)}auto(t){var e;(e=this.timeOut)==null||e.clear(),this.timeOut=new a(()=>{this.next()},t),this.thumb&&(this.thumb.style.animationDuration=`${String(t)}ms`)}pause(){document.body.classList.add("paused"),this.pausedTimeout=new a(()=>{var t,e;(t=this.timeOut)==null||t.pause(),this.paused=!0,this.slide instanceof HTMLVideoElement&&this.slide.pause(),(e=this.thumb)==null||e.classList.add("paused")},300)}continue(){var t,e,d;document.body.classList.remove("paused"),(t=this.pausedTimeout)==null||t.clear(),this.paused&&(this.paused=!1,(e=this.timeOut)==null||e.continue(),(d=this.thumb)==null||d.classList.remove("paused"),this.slide instanceof HTMLVideoElement&&this.slide.play())}addControls(){const t=document.createElement("button"),e=document.createElement("button");t.addEventListener("pointerup",()=>this.prev()),e.addEventListener("pointerup",()=>this.next()),t.innerText="Slide Anterior",e.innerText="Próximo Slide",this.controls.appendChild(t),this.controls.appendChild(e),this.controls.addEventListener("pointerdown",()=>this.pause()),document.addEventListener("pointerup",()=>this.continue()),document.addEventListener("touchend",()=>this.continue())}addThumbItems(){const t=document.createElement("div");t.id="slide-thumb";for(let e=0;e<this.slides.length;e++)t.innerHTML+="<span><span class='thumb-item'></span></span>";this.controls.appendChild(t),this.thumbItems=Array.from(document.querySelectorAll(".thumb-item"))}init(){this.addControls(),this.addThumbItems(),this.show(this.index)}}const l=document.getElementById("slide"),h=document.getElementById("slide-elements"),u=document.getElementById("slide-controls");l&&h&&u&&h.children.length&&new p(l,Array.from(h.children),u,3e3);