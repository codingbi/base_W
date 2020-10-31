#访问网页通用代码框架

import requests

def geturl(url):
    try:
        r=requests.get(url)
        r.raise_for_status()#判断网页是否获取成功
        r.encoding=r.apparent_encoding
        return(r)
    except:
        return('访问错误')

if _name_=="_main_":
    url="http://www.baidu.com"
    print(geturl(url).text)
    print(geturl(url).text)
