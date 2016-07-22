function Navigation(e,t,i){function n(e){var t=document.getElementById(e);if(!t)return[];t=t.getElementsByTagName("li");for(var i=[],s=0;s<t.length;s++){t[s].style.display="none";var o={text:t[s].innerText,url:t[s].getAttribute("url")?t[s].getAttribute("url"):"#",submenu:n(e+"-submenu-"+(s+1))};i.push(o)}return i}this.elements=[],this.activeMenu={},this.smallDisplay=899,this.mediumDisplay=1040,this.search=!1,this.searchValue="",this.clickMobileMenu=!1,this.background=["#fff","#f2f2f2","#e5e5e5","#d5d5d5","#c5c5c5"],Main.call(this),this.head=document.getElementById("header"),this.navMenu=document.getElementById(t),this.navMenuMobile=document.getElementById(i),this.NormSearch=document.getElementById("big-search"),this.mobileSearch=document.getElementById("mobile-search");for(var s=document.getElementById(e).getElementsByTagName("li"),o=0;o<s.length;o++){s[o].style.display="none";var u={text:s[o].innerText,url:s[o].getAttribute("url")?s[o].getAttribute("url"):"#",submenu:n("for-"+s[o].id)};this.elements.push(u)}}Navigation.prototype.createMenu=function(){if(this.elements.length){var e="";this.navMenu.style.display="block",this.checkMobile();for(var t=0;t<this.elements.length;t++)e+='<div class="menu-element"><a href="'+("#"===this.elements[t].url?"javascript:void(0)":this.elements[t].url)+'" class="menu-url'+("#"!==this.elements[t].url?" active-url-after":"")+'" ',e+='onmouseout="menu.unhover(this)" onmouseover="menu.hover(this,\'menu-url\',1)" onclick="menu.getSubmenu(this, '+t+')">'+this.elements[t].text+"</a>",e+=this.getHtmlSubMenu(this.elements[t].submenu,t),e+="</div>";this.isMobile?(this.navMenuMobile.innerHTML=e,this.navMenu.innerHTML=""):(this.navMenu.innerHTML=e,this.navMenuMobile.innerHTML="")}},Navigation.prototype.getHtmlSub2Menu=function(e,t,i){for(var n='<div class="submenu-dropdown" id="sub-drop-'+i+"-"+t+'">',s=0;s<e.length;s++)n+='<div class="sub2menu-element"><a href="'+("#"===e[s].url?"javascript:void(0)":e[s].url)+'" ',n+='class="sub2menu-url'+("#"!==e[s].url?" active-url":"")+'" ',n+=(this.isMobile?'onmouseover="menu.hover(this,\'sub2menu-url\',3)" onmouseout="menu.unhover(this)"':"")+">",n+='<div class="dop-el'+("#"!==e[s].url?" active-url-after":"")+'">'+e[s].text+"</div></a>",n+="</div>";return n+="</div>"},Navigation.prototype.getHtmlSubMenu=function(e,t){for(var i='<div class="menu-dropdown" id="menu-drop-'+t+'">',n=0;n<e.length;n++)i+='<div class="submenu-element"><a href="'+("#"===e[n].url?"javascript:void(0)":e[n].url)+'" ',i+='class="submenu-url'+("#"!==e[n].url?" active-url":"")+'"'+(this.isMobile?' onmouseover="menu.hover(this,\'submenu-url\',2)" onmouseout="menu.unhover(this)"':" "),i+=(this.isMobile?"onclick":"onmouseover")+'="menu.getSub2menu(this,'+t+","+n+')"',i+='><div class="dop-el'+("#"!==e[n].url?" active-url-after":"")+'">'+e[n].text+"</div></a>",i+=this.getHtmlSub2Menu(e[n].submenu,n,t),i+="</div>";return i+="</div>"},Navigation.prototype.getSubmenu=function(e,t){if(this.activeMenu!=e){var i=document.getElementsByClassName("menu-element");this.activeMenu=e;for(var n=0;n<i.length;n++)i[n].getElementsByTagName("a")[0].style.background=this.isMobile?this.background[1]:this.background[0];e.style.background=this.isMobile?this.background[1]:this.background[1];var s=document.getElementsByClassName("menu-dropdown");for(n=0;n<s.length;n++)s[n].style.display="none";document.getElementById("menu-drop-"+t).style.display="block"}else this.activeMenu=null,document.getElementById("menu-drop-"+t).style.display="none"},Navigation.prototype.getSub2menu=function(e,t,i){var n=document.getElementById("sub-drop-"+t+"-"+i);if("block"!==n.style.display){for(var s=document.getElementsByClassName("submenu-element"),o=0;o<s.length;o++)s[o].getElementsByTagName("a")[0].style.background=this.isMobile?this.background[2]:this.background[1];e.style.background=this.isMobile?this.background[3]:this.background[2];var u=document.getElementsByClassName("submenu-dropdown");for(o=0;o<u.length;o++)u[o].style.display="none";if(n.style.display="block",!this.isMobile){var l=n.parentNode.parentNode;if(l.style.width="241px",n.height||(n.height=n.offsetHeight),l.height||(l.height=l.offsetHeight),!n.offsetHeight)return void(l.style.height=l.height+"px");n.height>=l.height?(l.style.height=n.height+"px",n.style.height=n.height+"px"):(l.style.height=l.height+"px",n.style.height=l.height+"px"),l.style.width="540px"}}else n.style.display="none"},Navigation.prototype.hover=function(e,t,i){for(var n=document.getElementsByClassName(t),s=0;s<n.length;s++)n[s]!=this.activeMenu&&(n[s].style.background=this.isMobile?this.background[i]:this.background[i-1]);e.basicColor=e.style.color,this.isMobile&&this.activeMenu!=e?e.style.background=this.background[i+1]:this.activeMenu!=e&&(e.style.background=this.background[i])},Navigation.prototype.unhover=function(e){e!=this.activeMenu&&(e.style.background=e.basicColor)},Navigation.prototype.hoverSearchButton=function(e){e.style.background=this.background[1]},Navigation.prototype.unhoverSearchButton=function(e){this.search||(e.style.background=this.background[0])},Navigation.prototype.getSearchField=function(e){this.search?(this.head.style.height="48px",e.style.background=this.background[0]):(e.style.background=this.background[1],this.head.style.height="123px"),this.search=!this.search},Navigation.prototype.getMobileMenu=function(e){if(this.clickMobileMenu=!this.clickMobileMenu,this.clickMobileMenu){e.style.backgroundColor=this.background[1];var t=window.innerHeight-48;this.navMenuMobile.style.display="block",this.navMenuMobile.style.height=t+"px",document.body.style.overflow="hidden"}else this.navMenuMobile.style.display="none",document.body.style.overflow="auto"},Navigation.prototype.checkMenuHeight=function(){this.isMobile||(document.body.style.overflow="auto",this.navMenuMobile.style.display="none",this.navMenuMobile.style.background=this.background[0],this.clickMobileMenu=!1),this.navMenuMobile.style.height=window.innerHeight-48+"px"};