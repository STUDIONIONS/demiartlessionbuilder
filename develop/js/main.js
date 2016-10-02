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