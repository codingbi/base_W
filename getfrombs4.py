import re
import os
import xlwt
import xlrd
import requests
from bs4 import BeautifulSoup
import pandas as pd

    
bg=pd.read_excel('D:\\pics\\下载网页.xlsx')
m=bg.shape[0]-1
ps=bg.iloc[m]
zurl='https://cl.gmyt.icu/thread0806.php?fid=16&search=&page=6'
try:
     zr=requests.get(zurl)
except:
     print('lianjiecaoshi')
zd=re.findall('htm_data/1912/16/.*?\.html',zr.text)
zdd=list(set(zd))
i=bg.图片序号.values[-1]
for ui in zdd:
     if ui in bg.网页.values:
         continue
     else:
         url='https://cl.gmyt.icu/'+ui
         try:
            r =requests.get(url)
         except:
            print('yemianbukai')
            continue
         demo=r.text
         soup=BeautifulSoup(demo,'html.parser')
   
         for link in soup.find_all('img'):
         
             if link.get('data-src') is None:
                print('wutu')
                continue
             else:
              try:
                   pic=requests.get(link.get('data-src'))
              except:
                   print('tupbkai')
                   continue
              with open(str("D:\\pics\\11\\"+str(i)+'.jpg'),'wb') as f:
                   print('downloading pic '+str(i)+'from '+str(link.get('data-src')))
                   f.write(pic.content)
                   i=i+1
                   
     bg.loc[m+1]=[ui,i]
     m=m+1
     bg.to_excel('D:\\pics\\下载网页.xlsx',index=False)


     



     



