# -*- coding: utf-8 -*-
"""
Created on Mon Oct 26 13:10:10 2020

@author: Administrator
"""

from tkinter import *
import requests
from bs4 import BeautifulSoup
import re
import time
import pandas

global w
global tb

tb=pandas.DataFrame(columns=['ID','内容','日期','评论','转发','点赞'])

def get_words():#获取要搜索的关键字
    t=Tk()
    v=StringVar()
    Label(t,text="请输入要搜索的关键字：").pack(side="left")
    txt=Entry(t,textvariable=v).pack()
    Button(t,text="确定",command=t.destroy).pack(side="bottom")
    t.mainloop()
    w=v.get()
    return w
    
def grab_date(word):#抓取数据
    global njj
    njj=pandas.DataFrame()
    url = "https://s.weibo.com/weibo?q=%s&Refer=SWeibo_box"%w
    r=requests.get(url)
    soup = BeautifulSoup(r.text,'html.parser')
    pl=soup.find_all(mid=re.compile("\d+"))
    for i in pl:
        n=i.find_all('p')
        wz=n[0].text
        wz=re.sub("\s","",wz)[:-1]
        nmid=n[0]['nick-name']
        wz1=n[1].text
        t=re.findall("\d+月\d+日 \d+:\d+",wz1)
        if len(t)==0:
            t="time is today!"
        else:
            t=t[0]
        zf=re.findall("转发 \d+",i.text)
        if len(zf)==0:
            zf=0
        else:
            zf=re.findall("\d+",zf[0])[0]
        pl=re.findall("评论 \d+",i.text)
        if len(pl)==0:
            pl=0
        else:
            pl=re.findall("\d+",pl[0])[0]
        dz=i.find_all('em')[-1].text
        nj=pandas.DataFrame({'ID':nmid,'内容':wz,'日期':t,'评论':zf,'转发':pl,'点赞':dz},index=[1])
        njj=njj.append(nj,ignore_index=True)
    return njj
        
        
        
       

   
get_words()
grab_date(w)
njj.to_excel("1.xlsx")
    



