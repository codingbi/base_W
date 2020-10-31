import tkinter as tk
import tkinter.filedialog
import os
import random
fpdir=''
def dirc():
    global fpdir
    fpdir=tkinter.filedialog.askdirectory()
    var.set('发票文件所在路径是:\n'+str(fpdir))
    print(fpdir)
    return fpdir
#获取下载后的发票所在路径
window=tk.Tk()
window.title=('设定发票文件路径')
window.geometry('400x400')
var=tk.StringVar()
but=tk.Button(text='请选择发票文件所在文件夹',width=20,height=4,command=dirc)
but.pack()
l=tk.Label(textvar=var,font=('Arial',10),bg='blue',width=30,height=6)
l.pack()
butt=tk.Button(text='确定',width=20,height=4,command=window.destroy)
butt.pack()

#发票文件解压缩
import rarfile
path="D:\I-RPA\客户资料\etc发票\新建 Microsoft Office Word 2007 文档.rar"
rf=rarfile.RarFile(path)
rf.extractall("D:\I-RPA\客户资料\etc发票\1")
