# CPU 사용률 확인  
> top -b nl | grep -Po '[0-9.] + id' | awk '{print 100-%1}'


# 메모리 확인  
> free



# 디스크 확인  
> df -h  
-h 깔끔하게 보기  



