###StudentLifeLine

####API文档：

######1. 获取消费数据:
    简要描述：从Mysql中获得数据
    请求URL：localhost:3000/data
    请求方式：GET
    例子： localhost:3000/data?table=meal_times&column=student_id,meal_ae_1s&pageSize=10000
    参数：
    
| 参数名  | 是否必须 | 默认值 | 说明 | 例子 |
| ------ | ------- | --- | ---- | --- |
| table  | 是 | '' | 默认查询数据库表名 | 'meal_times' |
| column  | 是 | '' | 查询栏的名称 | 'student_id','meal_ae_1s'| 
| currPage  | 否 | 1  | 获取数据起点  | 1|
| pageSize  | 否 | 50 | 获取每次数据的数量 | 100 |
| database  | 否 | 'StudentsCardData' | 默认查询数据库名称  | 'StudentsCardData' |

######2. 获取日历次数数据:
    简要描述：从Mysql中获得数据
    请求URL：localhost:3000/calendar
    请求方式：GET
    例子： localhost:3000/calendar?year=2009&term=2
    参数：
    
| 参数名  | 是否必须 | 默认值 | 说明 | 例子 |
| ------ | ------- | --- | ---- | --- |
| year  | 否 | '2009' | 查询的年份 | '2009'-'2015' |
| term  | 否 | '2' | 查询的是上半年还是下半年 | '1','2'| 








    


