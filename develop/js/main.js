if(Modernizr.json && Modernizr.filereader && Modernizr.sessionstorage && Modernizr.localstorage){
	$(function(){
		var $txtinput = $("#text"),
			$btnRepl = $("#rpl");
		$txtinput.on("change input", function(){
			
		});
		$btnRepl.on("click", function(e){
			var txt = $txtinput.val(),
				out = "",
				regex1 = /^# (.+)/gm,
				subst1 = '[color=orange][SIZE=7]\$1[/SIZE][/color]',
				regex2 = /^## (.+)/gm,
				subst2 = '[color=orange][SIZE=6]\$1[/SIZE][/color]',
				regimg = /^(img_attach)/gm,
				count = 0,
				list = "[attachmentid=1923106],[attachmentid=1923107],[attachmentid=1923108],[attachmentid=1923109],[attachmentid=1923110],[attachmentid=1923111],[attachmentid=1923112]".split(",");
				
				
			out = txt.replace(regex1, subst1).replace(regex2, subst2);
			out = out.replace(regimg, function(match, p1, offset, string){
				++count;
				return list[count-1];
			});
			$txtinput.val(out);
		});
	});
}else{
	if (!document.getElementsByClassName) {
		var indexOf = [].indexOf || function(prop) {
			for (var i = 0; i < this.length; i++) {
				if (this[i] === prop) return i;
			}
			return -1;
		};
		getElementsByClassName = function(className, context) {
			var elems = document.querySelectorAll ? context.querySelectorAll("." + className) : (function() {
				var all = context.getElementsByTagName("*"),
					elements = [],
					i = 0;
				for (; i < all.length; i++) {
					if (all[i].className && (" " + all[i].className + " ").indexOf(" " + className + " ") > -1 && indexOf.call(elements, all[i]) === -1) elements.push(all[i]);
				}
				return elements;
			})();
			return elems;
		};
		document.getElementsByClassName = function(className) {
			return getElementsByClassName(className, document);
		};
		try{
			if(Element) {
				Element.prototype.getElementsByClassName = function(className) {
					return getElementsByClassName(className, this);
				};
			}
		}catch(e){}
	}
	var json = Modernizr.json ? "JSON SUPPORT\n" : "JSON NOT SUPPORT\n",
		filereader = Modernizr.filereader ? "FILEREADER SUPPORT\n" : "FILEREADER NOT SUPPORT\n",
		localstorage = Modernizr.localstorage ? "LOCALSTORAGE SUPPORT\n" : "LOCALSTORAGE NOT SUPPORT\n",
		sessionstorage = Modernizr.sessionstorage ? "SESSIONSTORAGE SUPPORT\n" : "SESSIONSTORAGE NOT SUPPORT\n",
		str = json + filereader + localstorage + sessionstorage,
		wrappers = document.getElementsByClassName("wrapper");
	for(var i=0; i<wrappers.length; ++i){
		var elem = wrappers[i];
		while ( elem.firstChild ) {
			elem.removeChild( elem.firstChild );
		}
	}
	
	alert(str+"\nВаш браузер не поддерживает HTML5!!!\n\nУстановите браузер с поддержкой HTML5 и возвращайтесь!");
}
