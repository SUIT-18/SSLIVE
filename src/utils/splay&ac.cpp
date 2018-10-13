#pragma GCC optimize (3)
#include<cstdio>
#include<cstring>
#include<queue>
using namespace std;
const int MAX_NUM=400;//不同字符总数*2 
const int TOT=1e6+10;//模板总长*2
const int MAX_MOBAN=1e2;//最长模版长度*2
const int TOTOT_MOBAN=1e6+10;//模版总数 
const int TOT_TEXT=1e8;//文本长度 *2
//映射字符splay tree
int change(char c){ //字符转换编码函数 
	return c;
}
struct Node{
	Node *ch[2];
	int v,num;
	int cmp(int x) const{
		if (x==v) return -1;
		return x<v ? 0 : 1;
	}
};
int n,acmax=0,tot=0,ch[TOT][MAX_NUM],val[TOT],f[TOT],last[TOT];
char str[TOTOT_MOBAN][MAX_MOBAN],text[TOT_TEXT];
int q[TOT];//代替stl <queue> 
Node* head=NULL;
void rotate(Node* &o,int d){//left 0 right 1  d^1=1-d
	Node* k=o->ch[d^1]; o->ch[d^1]=k->ch[d]; k->ch[d]=o; o=k;
}
int find(Node* &o,int k){
	if (o==NULL) return -1;
	int d=o->cmp(k);
	if (d!=-1){
		Node* p=o->ch[d];
		if (p==NULL) return -1;
		int d2=p->cmp(k);
		if (d2!=-1){
			return find(p->ch[d2],k);
			if (d==d2) rotate(o,d^1);else rotate(o->ch[d],d);
		}else{
			rotate(o,d^1);
			return p->num;
		}
	}else 
	return o->num;
}
void add(Node* &o,int k){
	if (o==NULL){
		o=new Node();
		o->ch[0]=o->ch[1]=NULL;
		o->num=++tot;
		o->v=k;
		return;
	}
	int d=o->cmp(k);
	if (d!=-1){
		Node* &p=o->ch[d];
		if (p==NULL){
			p=new Node();
			p->ch[0]=p->ch[1]=NULL;
			p->num=++tot;
			p->v=k;
		}else{
			int d2=p->cmp(k);
			if (d2!=-1){
				add(p->ch[d2],k);
				if (d==d2) rotate(o,d^1);else rotate(o->ch[d],d);
			}
		}
		rotate(o,d^1);
	}
	return;
}
void ac_add(char* s,int v){
	int now=0;
	int len=strlen(s);
	for (int j=0;j<len;j++){
		int c=find(head,change(s[j]));
		if (!ch[now][c])ch[now][c]=++acmax;
		now=ch[now][c];
	}
	val[now]=v;
}
void getfail(){
	//数组代替stl<queue> 
	//queue<int>q;
	int front=0,rear=0;
	//for (int c=0;c<=tot;c++)if (ch[0][c]) q.push(ch[0][c]);
	for (int c=0;c<=tot;c++)if (ch[0][c]) q[rear++]=ch[0][c];
	//while (!q.empty()){
	while (front!=rear){
		//int r=q.front();
		//q.pop();
		int r=q[front++];
		for (int c=0;c<=tot;c++){
			int u=ch[r][c];
			if (!u){
				ch[r][c]=ch[f[r]][c];
				continue;
			}
			//q.push(u);
			q[rear++]=u;
			f[u]=ch[f[r]][c];
			last[u]=val[f[u]]?f[u]:last[f[u]];
		}
	}
}
void print(int j,int i){
	if (j){
		printf("find %s at %d\n",str[val[j]],i);
		if (last[j]) print(last[j],i);
	}
}
int acautomata(){
	bool flag=false;
	getfail();
	int len=strlen(text);
	int j=0;
	for (int i=0;i<len;i++){
		int c=find(head,change(text[i]));
		if (c==-1) c=0;
		j=ch[j][c];
		if (val[j]) {
			flag=true;
			print(j,i);
		}else if (last[j]){
			flag=true;
			print(last[j],i);
		}
	}
	return flag;
}
int main(){
	FILE * fp0=fopen("muban.txt","r");
	FILE * fp1=fopen("wenben.txt","r");
	int i=0;
	while (fscanf(fp0,"%s",str[++i])!=EOF){
		int len=strlen(str[i]);
		for (int j=0;j<len;j++) add(head,change(str[i][j]));
		ac_add(str[i],i);
	}
	printf("num=%d\n",tot);//查看模板不同字符个数 
	fscanf(fp1,"%s",text);
	if (!acautomata())printf("find nothing\n");
	getchar();	
	return 0;
}
