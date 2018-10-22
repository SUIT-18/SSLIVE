var mobans = new Array();
$(document).ready(function () {
	var url = "src/utils/keywords";
	$.ajax({
		url: url,
		success: function (data) {
			mobans = data.split("\n");
		},
	});
});
function check(content) {
	cons("发送的内容：" + content);
	content = content.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*||||\-|\_|\+|\=|\||\\||||\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "");
	cons("去除符号后：" + content);
	var i = 0;
	for (i in mobans) {
		if (mobans[i] != "") {
			str = mobans[i] + "";
			if (content.search(str) > -1) {
				cons("敏感词：" + str);
				return true;
			}
		}
	}
}