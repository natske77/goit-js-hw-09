const t=document.querySelector("body"),e=document.querySelector("[data-start]"),r=document.querySelector("[data-stop]");let o=null,n=!1;function a(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}t.style.backgroundColor=a(),e.addEventListener("click",(()=>{n||(n=!0,o=setInterval((()=>{t.style.backgroundColor=a()}),500))})),r.addEventListener("click",(()=>{n=!1,clearInterval(o)}));
//# sourceMappingURL=01-color-switcher.a9db7432.js.map
