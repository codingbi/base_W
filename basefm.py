# -*- coding: utf-8 -*-
"""
Created on Fri Oct 30 16:50:19 2020

@author: Administrator
"""

from bs4 import BeautifulSoup
import re
import requests
import pandas
from tkinter import *
import csv
import numpy
import pdfplumber


def get_url(url):
    global f
    f=requests.get(url)
    f.encoding='GB2312'
    return f
    
def post_url(url):
    global f
    head={" ":" ",}#提交信息的头信息，通过工具network查看header的完整信息，按照词典格式改写，得到request header 和 form 达特
    pdate={" ":" "}
    f=requests.post(url,headers=head,data)
    f.encoding='GB2312'
    
def soup_date(f):
    s=BeautifulSoup(f.text,'html.parser')
    soup.p# 标签名称
    soup.p('dr',class_='')#子标签名称，类别名称，获取内容，.text,得到文本内容
    re.findall("\d+",f.text)#正则表达式分析html内容
    soup.find_all('dr',class_='dr')#soup 获取全部内容
def get_words():#输入类型消息框，获取要搜索的关键字
    t=Tk()
    v=StringVar() #绑定变量
    Label(t,text="请输入要搜索的关键字：").pack(side="left")#显示标签内容
    txt=Entry(t,textvariable=v).pack()#获取输入信息
    Button(t,text="确定",command=t.destroy).pack(side="bottom")#按钮
    t.mainloop()#显示弹出框
    w=v.get()#接收录入信息
    return w
def tocsv()：:
    with open("jg.csv",'w',newline='') as f:#.csv文件会自动新建并覆盖，newline避免空行，w,w
        csv_write=csv.writer(f)
        csv_head=["学校代码", "层次", "专业(类)名称", "首选科目", "再选科目及选考要求", "类中所含专业及代码", "招考方向"]
        csv_write.writerow(csv_head)#写一行，写表头
        csv_write.writerows(jg)#写多行
def do_excel():
    pandas.DataFrame()
    
def main():

    
if __name__ == "__main__":#以脚本运行
    # execute only if run as a script
    main()

    
        
    
    
