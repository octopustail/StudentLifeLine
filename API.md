###StudentLifeLine

####API文档：

######1. 获取数据:
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






    


