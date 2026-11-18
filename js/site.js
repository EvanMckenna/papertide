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
  // store cards: single select (radio semantics); Book link still navigates
  [].slice.call(d.querySelectorAll(".shop-grid")).forEach(function(g){
    var cards=[].slice.call(g.querySelectorAll(".shop-card"));
    function pick(c){cards.forEach(function(x){x.setAttribute("aria-checked",x===c?"true":"false")});}
    cards.forEach(function(c){
      c.addEventListener("click",function(e){if(e.target.closest("a"))return;pick(c);});
      c.addEventListener("keydown",function(e){if(e.target!==c)return;
        if(e.key==="Enter"||e.key===" "){e.preventDefault();pick(c);}
        else if(e.key==="ArrowRight"||e.key==="ArrowDown"||e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault();var i=cards.indexOf(c)+((e.key==="ArrowRight"||e.key==="ArrowDown")?1:-1);var n=cards[(i+cards.length)%cards.length];n.focus();pick(n);}});
    });
  });
})();
