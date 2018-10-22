function change(c) { //字符转码
	return c;
}
function Node(Node, v, num) { //二叉树节点
	ch[2];
	this.Node = this;
	this.cmp = cmp;
	function cmp(x) {
		if (x == v) { return -1; }
		return x < v ? 0 : 1;
	}
}
var Node = new Object;
Node.ch = new Array(2);
Node.v = 0;
Node.num = 0;
Node.cmp = function (x) {
	if (x == v) return -1;
	return x < v ? 0 : 1;
}
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
var head = 0;
//------------------------
function rotate(int& oo, d) {
	Node & o=tree[oo];
	int kk = o.ch[d ^ 1];
	Node & k=tree[kk];
	o.ch[d ^ 1] = k.ch[d];
	k.ch[d] = oo;
	oo = kk;
}
function find(Node *&o, k) {
	if (oo == 0) return -1;
	Node & o=tree[oo];
	var d = o.cmp(k);
	if (d != -1) {
		var p = o.ch[d];
		if (p == 0) return -1;
		var d2 = tree[p].cmp(k);
		if (d2 != -1) {
			return find(tree[p].ch[d2], k);
			if (d == d2) rotate(oo, d ^ 1); else rotate(o.ch[d], d);
		}
		else {
			rotate(oo, d ^ 1);
			return tree[p].num;
		}
	}
	else return o.num;
}
function add(int& oo, k) {
	if (oo == 0) {
		oo = ++node_max;
		Node & o=tree[oo];
		o.ch[0] = o.ch[1] = 0;
		o.num = ++tot;
		o.v = k;
		return;
	}
	Node & o=tree[oo];
	var d = o.cmp(k);
	if (d != -1) {
		int & pp = o.ch[d];
		if (pp == 0) {
			pp = ++node_max;
			Node & p=tree[pp];
			p.ch[0] = p.ch[1] = 0;
			p.num = ++tot;
			p.v = k;
		} else {
			Node & p=tree[pp];
			var d2 = p.cmp(k);
			if (d2 != -1) {
				add(p.ch[d2], k);
				if (d == d2)
					rotate(oo, d ^ 1);
				else
					rotate(o.ch[d], d);
			}
		}
		rotate(oo, d ^ 1);
	}
	return;
}
//--------AC自动机------------
function ac_add(s, v) {
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