(function(){
  var d=document,root=d.documentElement;
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els=[].slice.call(d.querySelectorAll(".reveal"));
  if(reduce||!("IntersectionObserver" in window)){els.forEach(function(el){el.classList.add("in")});}
  else{
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add("in");io.unobserve(en.target);}});
    },{rootMargin:"0px 0px -8% 0px",threshold:0.08});
    els.forEach(function(el){io.observe(el)});
  }
  // header: add a hairline shadow once scrolled
  var h=d.querySelector(".site-header");
  if(h){var f=function(){h.classList.toggle("scrolled",window.scrollY>8)};f();window.addEventListener("scroll",f,{passive:true});}
  // close mobile menu on link click / escape
  var m=d.querySelector(".menu");
  if(m){m.addEventListener("click",function(e){if(e.target.tagName==="A")m.removeAttribute("open")});
    d.addEventListener("keydown",function(e){if(e.key==="Escape"&&m.hasAttribute("open")){m.removeAttribute("open");m.querySelector("summary").focus();}});}
})();
