# -*- coding: utf-8 -*-
"""
Created on Wed Oct 28 10:25:55 2020

@author: Administrator
"""

from bs4 import BeautifulSoup
import requests
import re
import csv


def get_schlist():
    global lss
    lss=[]
    url="http://zsxx.e21.cn/xkkmcx/school.html"
    x=requests.get(url)
    x.encoding='GB2312'
    soup = BeautifulSoup(x.text,'html.parser')
    ls=soup.find_all("td",class_="bb",width="119px")
    for i in ls:
        lss.append(i.text)
    return lss   

def get_km(lss):
 global jg
 jg=[]
 url="http://zsxx.e21.cn/xkkmcx/schdetail.php"
 #表头
 h={
   "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "Accept-Encoding":"gzip, deflate",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "max-age=0",
    "Connection": "keep-alive",
    "Content-Length": "8",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "zsxx.e21.cn",
    "Origin": "http://zsxx.e21.cn",
    "Referer": "http://zsxx.e21.cn/xkkmcx/school.html",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36"
    }

 lss1=lss.copy()
 t_head=['学校代码', '层次', '专业(类)名称', '首选科目', '再选科目及选考要求', '类中所含专业及代码', '招考方向']

 for i in range(len(lss)+1):
    print("there are "+str(len(lss))+" school,now it is"+str(i)+"doing!!")
    try:
        dm=lss.pop(0)
    except:
        break
    pdate={"dm":"%s"%dm}
   # print (pdate)
    d=requests.post(url,data=pdate,headers=h)
    if d.status_code==200:#网站获取失败把id追加到列表中去，后续再post
        #print(d)
        d.encoding='GB2312'
        soup=BeautifulSoup(d.text,'html.parser')
        mcdm=soup.li.text[5:]+str(dm)
        t1=soup.table.text.replace("\n","x")
        t2=re.split("x{3,}",t1)[1:-1]
        for i0 in t2:#把学校代码写入每行第一列
            i1=re.split("x+",i0)
            i1[0]=mcdm
            #print(i1)
            jg.append(i1)
        #获取table并构建表格
    else :
        lss.append(dm)
        continue
        #print(mcdm)
       
def main():
    get_schlist()
    while len(lss)>0:
        get_km(lss)
    with open("jg.csv",'w',newline='') as f:
        csv_write=csv.writer(f)
        csv_head=["学校代码", "层次", "专业(类)名称", "首选科目", "再选科目及选考要求", "类中所含专业及代码", "招考方向"]
        csv_write.writerow(csv_head)
        csv_write.writerows(jg)
        
    
if __name__ == "__main__":
    # execute only if run as a script
    main()

        
        
        
    