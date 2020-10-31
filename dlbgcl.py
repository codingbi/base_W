# -*- coding: utf-8 -*-
"""
Created on Mon Oct 12 17:20:06 2020

@author: Administrator
"""

import pandas as pd
import datetime
import numpy as np
import matplotlib.pyplot as plt
import xlsxwriter
import os


plt.rcParams['font.sans-serif']=['SimHei']
plt.rcParams['axes.unicode_minus'] = False
plt.gcf().subplots_adjust(bottom=0.15)



def dl_zlbg(path,filename,sheet,head):
    names=locals()#空白表格初始化
    for i in range(1,13) :#空白表格初始化
         names['dlybg%s'%i]=pd.DataFrame()
    dlybg13=pd.DataFrame()
    dlybg14=pd.DataFrame()
    dlybg15=pd.DataFrame()
    dlybg16=pd.DataFrame()
    dl0 = pd.read_excel(path+filename,sheet_name=sheet,header=head,dtype='str')
    dqy = datetime.datetime.now().month
    dqn = datetime.datetime.now().year
    bgcd=len(dl0)
        #原始表格数据处理
    for i in range(1,bgcd):
        bgrq=dl0["日期"][i]#读取日期字段
        if len(bgrq)<11:
            mont=bgrq.split('/')[1]
        else:
            mont=bgrq.split('-')[1]   #日期字段拆分出年月日字符串
        if str(mont).startswith('0'):
            yf=str(mont)[1]
        else:
            yf=mont
        for j in range(1 , 13):
            if int(yf) == j :
                names['dlybg%s'%j]=names['dlybg%s'%j].append(dl0.iloc[i],ignore_index=True)
    #单月数据统计
    writer=pd.ExcelWriter(path+"hz"+sheet+".xlsx")
    for m in range(1,13):
         names['dlybg%s'%m].to_excel(writer,str(m)+'月')
    #区间汇总统计
    if dqy>3:
       for i in range(1,4):
           dlybg13=dlybg13.append(names['dlybg%s'%(dqy-i)],ignore_index=True)
    if dqy>6:
        for i in range(2,7):
             dlybg16=dlybg16.append(names['dlybg%s'%i],ignore_index=True)
    
        for i in range(6,int(dqy)):
             dlybg14=dlybg14.append(names['dlybg%s'%i],ignore_index=True)        
    
    for i in range(1,int(dqy-1)):
        dlybg15=dlybg15.append(names['dlybg%s'%i],ignore_index=True)
        
    dlybg15.to_excel(writer,'全年')
    dlybg13.to_excel(writer,'近三个月')
    dlybg16.to_excel(writer,'上半年')
    dlybg14.to_excel(writer,'下半年至今')
    writer.save()

def show_bar(path,nw): ##plot 可视化图标后保存为本地图片
    df=pd.ExcelFile('hz'+nw+'.xlsx')
    f = xlsxwriter.Workbook('质量分析'+nw+'.xlsx')
    for i in df.sheet_names:
        x=pd.read_excel('hz'+nw+'.xlsx',sheet_name=i,dtype='str')
        worksheet=f.add_worksheet(i)
        if len(x)>0:
            n=0
            for m in ["反馈环节","责任部门","问题分类"]:
                x1=x[m].value_counts()
                if len(x1)!=0 :
                  x2=x1.plot.bar(title=m+i)
                else:
                    continue
                pic=x2.get_figure()
                pic.savefig(m+i+'.png',dpi=100,figsize=(8, 14))
                worksheet.write_column('A'+str(1+n*40),x1)
                worksheet.insert_image('A'+str(4+n*40),m+i+'.png')
                n=n+1
    f.close()
    
def bm_bar(path,file):#部门分析图
    df=pd.ExcelFile('hz'+file+'.xlsx') 
    f = xlsxwriter.Workbook('规格质量分析'+file+'.xlsx')
    for i in df.sheet_names:
        x=pd.read_excel('hz'+file+'.xlsx',sheet_name=i,dtype='str')
        worksheet=f.add_worksheet(i)
        if len(x)>0:
            x1=x[["规格型号","责任部门","反馈环节","问题分类"]].groupby("规格型号").count()
            x2=x1.plot.bar(title=file+i)
        else:
            continue
        pic=x2.get_figure()
        pic.savefig(file+i+'.png',dpi=100,figsize=(14,14))
        worksheet.insert_image('A2',file+i+'.png')
    f.close()
            
def image_del (path):#图片批量插入表格
    filelist=os.listdir(path)
    for i in filelist:
        if '.png' in i :
            os.remove(path+i)
    
    
def bmfx (path):#部门表格柴扉你
    df_n=pd.read_excel("大力电工质量信息反馈统计表V1.0-20200308.xlsx",sheet_names='内部',header=2,dtype='str')
    df_w=pd.read_excel("大力电工质量信息反馈统计表V1.0-20200308.xlsx",sheet_names='外部',header=2,dtype='str')
    df=pd.concat([df_n,df_w],ignore_index=True)
    bm=["财务仓库","计划部","技术部","生产部","研发部","其它"]
    for i in bm :
        dfw=df[df["责任部门"]==i]
        dfw.to_excel(i+'.xlsx',sheet_name=i)
                
   
    
def main():
    dllastyear = pd.DataFrame()#上年数据表格
    path="D:\\I-RPA\\python程序\\dl\\"
    filename="大力电工质量信息反馈统计表V1.0-20200308.xlsx"
    dl_zlbg(path,filename,sheet="内部",head=2)
    dl_zlbg(path,filename,sheet="外部",head=2)
    bmfx(path)
    for ii in ["财务仓库","计划部","技术部","生产部","研发部","其它"]:
        dl_zlbg(path,ii+'.xlsx',sheet=ii,head=0)
    for i in ["内部","外部"]:#月度质量分析
        show_bar(path,i)
    for iii in ["财务仓库","计划部","技术部","生产部","研发部","其它"]:#部分质量分析
        bm_bar(path,iii)
    

    

    
if __name__ == '__main__':
    main()
    path='D:\\I-RPA\\python程序\\dl\\'
    for i in ["财务仓库","计划部","技术部","生产部","研发部","其它"]:
        os.remove(path+i+'.xlsx')
    image_del(path)
    
    




              
        
        
    
    
