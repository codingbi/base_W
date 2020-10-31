
n=['M意大利面', 'M墨鱼汁意面', 'M恒大兴安葵花籽油 1.8L', 'M恒大兴安葵花籽油 5L']
s=(",").join(n)
print(type(s))
s2=s.replace(',', '\r\n')
print(s2)

n=['12.0','13.0','14.0']
n==[str(x) for x in n]
s=(",").join(n)
print(type(s))
s2=s.replace(',', '\r\n')
print(s2)
