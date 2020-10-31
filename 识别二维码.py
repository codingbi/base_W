# -*- coding: utf-8 -*-
"""
Created on Tue Sep 22 15:37:09 2020

@author: Administrator
"""

import pyzbar.pyzbar as pyzbar
from PIL import Image,ImageEnhance
from PIL import ImageFile
ImageFile.LOAD_TRUNCATED_IMAGES = True

import os

im='zbar1 - 副本.jpg'
img=Image.open(im)
#img = ImageEnhance.Brightness(img).enhance(2.0)#增加亮度

#img = ImageEnhance.Sharpness(img).enhance(17.0)#锐利化

#img = ImageEnhance.Contrast(img).enhance(4.0)#增加对比度

#img = img.convert('L')#灰度化

img.show()
img.close()
barcodes=pyzbar.decode(img)
print(barcodes)
for barcode in barcodes:
    barcodeData = barcode.data.decode("utf-8")
    print(barcodeData)