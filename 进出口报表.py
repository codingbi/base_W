import pandas as pd
import numpy as np
from pandas import DataFrame,Series
pd.set_option('display.max_columns',500)
pd.set_option('display.max_rows',100000)
 


#把原始表格读入
ncdm=pd.read_excel('C:/Users\Administrator\Desktop\东风进出口项目资料1/NC信用代码.xls')
ncbb=pd.read_excel('C:/Users\Administrator\Desktop\东风进出口项目资料1\应收NC.xls',
                   header=None,skiprows=10,skipfooter=3)
ocdm=pd.read_excel('C:/Users\Administrator\Desktop\东风进出口项目资料1/Oracle应收账款客商统一社会信用代码整理.xls')
ocbb=pd.read_excel('C:/Users\Administrator\Desktop\东风进出口项目资料1\应收账款报表Oracle.xlsx',
                   header=None,skiprows=12)
#提取表格中期初期末数据，并强制转换成字符格式
nc1=ncbb[[3,8,19]]
nc1.rename(columns={3:'客商编码', 8:"期初余额",19:'期末余额'},inplace=True)
nc1=nc1.astype(str)
nc1.客商编码=nc1['客商编码'].str.strip()

#提取表格中客商编码和18位信用代码

nc2=ncdm[['KUNNR','18位社会信用代码']]
nc2.rename(columns={'KUNNR':'客商编码'},inplace=True)
nc2.客商编码=nc2.客商编码.str.strip()


#以客商编码合并两个表，形成所需nc报表
nc3=pd.merge(nc1,nc2,how='inner',on='客商编码')


oc1=ocdm[['单位代码','往来单位名称','18位信用代码证号']]
#取oracle每一行，然后把18位代码和nc数据匹配，填入oralcel中,oracle表只有期初期末两个数
l=len(oc1)-1
i=0
oc1['期初余额']=' '
oc1['期末余额']=' '

while i<l+1:
    nb=str(oc1.iloc[int(i),2])
    nc4=nc3[nc3['18位社会信用代码']==nb]
   
    if len(nc4)>0:
        w1=np.nansum(np.array(nc4['期初余额']))
        w2=np.nansum(np.array(nc4['期末余额']))
        if w1!='nan':
            oc1.iloc[int(i),3]=w1
        if w2!='nan':
            oc1.iloc[int(i),4]=w2
     
    i=i+1

print(oc1)
        
   
       
    
        

    






