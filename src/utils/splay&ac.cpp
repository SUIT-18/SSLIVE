#pragma GCC optimize(3)
#include <cstdio>
#include <cstring>
#include <queue>
using namespace std;
const int MAX_NUM = 400;		  
const int TOT = 1e6 + 10;		 
const int MAX_MOBAN = 1e2;		
const int TOTOT_MOBAN = 1e6;
const int TOT_TEXT = 1e8;		 
int change(char c){ 
	return c;
}
struct Node{
	int ch[2];
	int v, num;
	int cmp(int x) const{
		if (x == v)return -1;
		return x < v ? 0 : 1;
	}
}tree[MAX_NUM];
int n,acmax=0,tot=0,ch[TOT][MAX_NUM],val[TOT],f[TOT],last[TOT],node_max=0,moban_count=0;
char str[1000010][100],text[TOT_TEXT];
int q[TOT];
int head=0;
void rotate(int& oo, int d){
	Node& o=tree[oo];
	int kk=o.ch[d^1];
	Node& k=tree[kk];
	o.ch[d^1]=k.ch[d];
	k.ch[d]=oo;
	oo=kk;
}
int find(int& oo, int k){
	if (oo == 0)
		return -1;
	Node &o=tree[oo];
	int d = o.cmp(k);
	if (d != -1){
		int p = o.ch[d];
		if (p == 0)return -1;
		int d2 = tree[p].cmp(k);
		if (d2 != -1){
			return find(tree[p].ch[d2], k);
			if (d == d2)rotate(oo, d ^ 1);else rotate(o.ch[d], d);
		}
		else{
			rotate(oo, d ^ 1);
			return tree[p].num;
		}
	}
	else return o.num;
}
void add(int& oo, int k)
{
	if (oo == 0){
		oo = ++node_max;
		Node& o=tree[oo];
		o.ch[0] = o.ch[1] = 0;
		o.num = ++tot;
		o.v = k;
		return;
	}
	Node& o=tree[oo];
	int d = o.cmp(k);
	if (d != -1){
		int& pp = o.ch[d];
		if (pp == 0){
			pp = ++node_max;
			Node& p=tree[pp];
			p.ch[0] = p.ch[1] = 0;
			p.num = ++tot;
			p.v = k;
		}else{ 
			Node& p=tree[pp];
			int d2 = p.cmp(k);
			if (d2 != -1)
			{
				add(p.ch[d2], k);
				if (d == d2)
					rotate(oo, d ^ 1);
				else
					rotate(o.ch[d], d);
			}
		}
		rotate(oo, d^1);
	}
	return;
}
void ac_add(char *s, int v)
{
	int now = 0;
	int len = strlen(s);
	for (int j = 0; j < len; j++)
	{
		int c = find(head, change(s[j]));
		if (!ch[now][c])
			ch[now][c] = ++acmax;
		now = ch[now][c];
	}
	val[now] = v;
}
void getfail()
{
	int front = 0, rear = 0;
	for (int c = 0; c <= tot; c++)if (ch[0][c])q[rear++] = ch[0][c];
	while (front != rear)
	{
		int r = q[front++];
		for (int c = 0; c <= tot; c++)
		{
			int u = ch[r][c];
			if (!u)
			{
				ch[r][c] = ch[f[r]][c];
				continue;
			}
			q[rear++] = u;
			f[u] = ch[f[r]][c];
			last[u] = val[f[u]] ? f[u] : last[f[u]];
		}
	}
}
void print(int j, int i)
{
	if (j)
	{
		printf("find %s at %d\n", str[val[j]], i);
		if (last[j])
			print(last[j], i);
	}
}
int acautomata(char *T)
{
	bool flag = false;
	int len = strlen(T);
	int j = 0;
	for (int i = 0; i < len; i++)
	{
		int c = find(head, change(T[i]));
		if (c == -1)
			c = 0;
		j = ch[j][c];
		if (val[j])
		{
			flag = true;
			print(j, i);
		}
		else if (last[j])
		{
			flag = true;
			print(last[j], i);
		}
	}
	return flag;
}
void input(char *s){
	int len=strlen(s);
	int l=-1,r=-1;
	for (int i=0;i<len;++i){
		if (s[i]!=' '&&s[i]!='\n') {
			++r;
			add(head,change(s[i]));
		}else{
			memcpy(str[++moban_count],s+l+1,sizeof(char)*(r-l)); //copy (r-l) letters (s[l+1] ~ s[r]) into str[moban_count].
			// printf("%s\n",str[moban_count]);  //to see if the moban is cut correctly. delete it if needed.
			ac_add(str[moban_count],moban_count);
			l=r=i;
		}
	}
	if (l!=r) memcpy(str[++moban_count],s+l+1,sizeof(char)*(r-l));
	printf("%s\n",str[moban_count]);//to see if the moban is cut correctly. delete it if needed.
}
int main()
{
	char moban[]="abc def bbb ccc hsdlakfh sfasd";
	input(moban);
	getfail();
	// printf("num=%d\n",tot);  //to see how many different letters are there in moban. delete it if needed.
	while (true) {  //delete or change 'while' to modify the times needed
		scanf("%s",text);
		if (!acautomata(text))printf("find nothing\n");	//input 'text' into function 'acautomata'
	}
	getchar();
	return 0;
}
