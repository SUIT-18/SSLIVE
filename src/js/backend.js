$(document).ready(function() {
	$(".swiper-tab div").css("line-height", $(".swiper-tab div").height() + "px");
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'horizontal'
	})
	mySwiper.on("slideChange", function() {
		$(".swiper-tab").find("div").removeClass("selectedtab");
		$(".swiper-tab").find("div").eq(mySwiper.activeIndex).addClass("selectedtab");
	});
	$(".swiper-tab div").click(function() {
		mySwiper.slideTo($(".swiper-tab div").index(this));
	});
	RefreshPicLive();
	setTimeout(function() {
		$(".contents").animate({
			height: $(".contents").contents().find("#swiper").height()
		});
	}, 1000);
});

//图文直播模块JS代码

createReader = function(file, whenReady) {
	var reader = new FileReader;
	reader.onload = function(evt) {
		var image = new Image();
		image.onload = function() {
			var width = this.width;
			var height = this.height;
			if (whenReady) whenReady(width, height);
		};
		image.src = evt.target.result;
	};
	reader.readAsDataURL(file);
}

function GetInfo(index, img) {
	var file = document.getElementById('p' + index);
	createReader(file.files[0], function(w, h) {
		if (index == 0) {
			$("#p1w").val(w);
			$("#p1h").val(h);
		} else {
			$("#p2w").val(w);
			$("#p2h").val(h);
		}
	});
}

function change() {
	$("#count").text($("#text").val().length);
}

function upload() {
	$.ajax({
		url: "src/console/piclive.php",
		method: "POST",
		data: {
			pw: $("#pw").val()
		},
		success: function(data) {
			if (data == "success") {
				var p1 = document.getElementById("p0").files[0]
				var p2 = document.getElementById("p1").files[0]
				var text = $("#text").val();
				if (p1 != null && p2 != null && text != "") {
					var formFile = new FormData();
					formFile.append("img1", p1); //加入文件对象
					formFile.append("img2", p2); //加入文件对象
					formFile.append("text", text);
					formFile.append("img1w", $("#p1w").val());
					formFile.append("img1h", $("#p1h").val());
					formFile.append("img2w", $("#p2w").val());
					formFile.append("img2h", $("#p2h").val());
					$.ajax({
						url: "src/console/piclive.php",
						method: "POST",
						processData: false,
						contentType: false,
						data: formFile,
						success: function(data) {
							alert(data);
						}
					})
				} else {
					alert("请填完内容再提交");
				}
			} else {
				alert(data);
			}
		}
	});
}
var PicLive = {};

function RefreshPicLive() {
	$.ajax({
		url: "src/piclive/piclive.json",
		dataType: "json",
		success: function(data) {
			PicLive = data;
			PicLive.Img1 = "src/piclive/" + PicLive.Img1;
			PicLive.Img2 = "src/piclive/" + PicLive.Img2;
			$(".livetext").html(data.text);
			$("#liveimg1").attr("src", PicLive.Img1);
			$("#liveimg2").attr("src", PicLive.Img2);
		}
	});
}

//节目单控制模块代码

function lastprog() {
	$.ajax({
		url: "src/console/programlist.php",
		method: "POST",
		data: {
			cmd: "last"
		},
		success: function(data) {
			alert(data);
		}
	})
}
function nextprog() {
	$.ajax({
		url: "src/console/programlist.php",
		method: "POST",
		data: {
			cmd: "next"
		},
		success: function(data) {
			alert(data);
		}
	})
}
