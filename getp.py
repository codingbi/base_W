import re
import requests

r=requests.get('https://cl.gmyt.icu/htm_data/1912/16/3741042.html')
rr=re.findall('https://www.*\.jpg?',r.text)
r.text
for i in range(len(rr)):
    di=str('D:\pics\11'+str(i)+'1.jpg')
    pi=requests.get(rr[i])
    with open(di,'wb') as f:
        f.write(pi.content)
