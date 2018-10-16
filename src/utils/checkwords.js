function change(c) { //字符转码
	return c;
}
function Node(Node, v, num) { //二叉树节点
	// Node *ch[2];
	this.Node = this;
	this.cmp = cmp;
	function cmp(x) {
		if (x == v) { return -1; }
		return x < v ? 0 : 1;
	}
};
//------声明全局变量--------
const MAX_NUM = 400;
const TOT = 1e6 + 10;
const MAX_MOBAN = 1e2;
const TOTOT_MOBAN = 1e6 + 10;
const TOT_TEXT = 1e8;
var n, acmax = 0, tot = 0
var ch = new Array(TOT), val = new Array(TOT), f = new Array(TOT), last = new Array(TOT);
var str = new Array(100010);
var text = new Array(TOT_TEXT);
var q = new array(TOT);
Node * head = NULL;
//------------------------
function rotate(Node *&o, d) {
	Node * k = o -> ch[d ^ 1];
	o -> ch[d ^ 1] = k -> ch[d];
	k -> ch[d] = o;
	o = k;
}
function find(Node *&o, k) {
	if (o == NULL)
		return -1;
	var d = o -> cmp(k);
	if (d != -1) {
		Node * p = o -> ch[d];
		if (p == NULL)
			return -1;
		var d2 = p -> cmp(k);
		if (d2 != -1) {
			return find(p -> ch[d2], k);
			if (d == d2) {
				rotate(o, d ^ 1);
			} else {
				rotate(o -> ch[d], d);
			}
		} else {
			rotate(o, d ^ 1);
			return p -> num;
		}
	} else {
		return o -> num;
	}
}
function add(Node *& o, int k)
{
	if (o == NULL) {
		o = new Node();
		o -> ch[0] = o -> ch[1] = NULL;
		o -> num = ++tot;
		o -> v = k;
		return;
	}
	var d = o -> cmp(k);
	if (d != -1) {
		Node *& p = o -> ch[d];
		if (p == NULL) {
			p = new Node();
			p -> ch[0] = p -> ch[1] = NULL;
			p -> num = ++tot;
			p -> v = k;
		}
		else {
			var d2 = p -> cmp(k);
			if (d2 != -1) {
				add(p -> ch[d2], k);
				if (d == d2)
					rotate(o, d ^ 1);
				else
					rotate(o -> ch[d], d);
			}
		}
		rotate(o, d ^ 1);
	}
}
//--------AC自动机------------
function ac_add(* s, v) {
	var now = 0;
	var len = strlen(s);
	for (j = 0; j < len; j++) {
		var c = find(head, change(s[j]));
		if (!ch[now][c])
			ch[now][c] = ++acmax;
		now = ch[now][c];
	}
	val[now] = v;
}
function getfail() {
	var front = 0, rear = 0;
	for (c = 0; c <= tot; c++)
		if (ch[0][c])
			q[rear++] = ch[0][c];
	while (front != rear) {
		var r = q[front++];
		for (c = 0; c <= tot; c++) {
			var u = ch[r][c];
			if (!u) {
				ch[r][c] = ch[f[r]][c];
				continue;
			}
			q[rear++] = u;
			f[u] = ch[f[r]][c];
			last[u] = val[f[u]] ? f[u] : last[f[u]];
		}
	}
}
function acautomata() {
	var flag = false;
	getfail();
	var len = text.length;
	var j = 0;
	for (var i = 0; i < len; i++) {
		var c = find(head, change(text[i]));
		if (c == -1)
			c = 0;
		j = ch[j][c];
		if (val[j]) {
			flag = true;
			print(j, i);
		}
		else if (last[j]) {
			flag = true;
			print(last[j], i);
		}
	}
	return flag;
}
//----------------------
//
//--------输出-----------
function print(j, i) {
	if (j) {
		cons("find " + str[val[j]] + " at " + i + " \n");
		if (last[j]) cons(last[j], i);
	}
}
//----------------------
function check(content) {
	var i = 0;
	var moban = "";
	str = moban.split(" ");
	for (i = 0; i < 100010; i++) {
		str[i] = new Array(100);    //声明二维
	}
	for (i = 0; i < TOT; i++) {
		ch[i] = new Array(MAX_NUM);    //声明二维
	}
	for (i = 0; i < 100010; i++) {
		var len = str[i].length;
		for (j = 0; j < len; j++) add(head, change(str[i][j]));
		ac_add(str[i], i);
	}
	cons("num=%d\n", tot);
	text = content;
	// fscanf(fp1,"%s",text);
	if (!acautomata()) cons("find nothing\n");
	getchar();
	return 0;
}