import requests
import re

path='D:\pics'
url='https://cl.gmyt.icu/thread0806.php?fid=16'
q='https://cl.gmyt.icu/'
r=requests.get(url)
urls=re.findall('htm_data/1912/16/.*\.html',r.text)
u=list(set(urls))

u1=q+u[0]
r1=requests.get(u1)


rr=re.findall('https://www\..*?\.jpg',r1.text)
rr1=list(set(rr))
for i in range(len(rr1)):
    pa=path+str(i)+'.jpg'
    pp=requests.get(rr1[i])
    pp.status_code
    with open(pa,'wb')as f:
        f.write(pp.content)
