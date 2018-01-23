
###数据库说明

#####连接信息:
```
用户名: root
host: localhost
密码:
    Macbook Pro数据库: visvisvis
    Mac Pro数据库: vis
数据库: Student_Consumption
```

#####连接方法:

> mysql -hlocalhost -u root -p


输入密码进入

> show databases;
> use Student_Consumption
> show tables;

#####表名说明:

| 数据库表名                  | 表内容说明                  |
| ---------------------------| ---------------------------- |
| Student_Consumption        | 数据库的原始消费数据            |
| gpa_rank                   | 同学的每个学期的GPA排名和相邻学期突变数据      |
| lib_times                  | 图书馆次数多学期的排名|
| meal_times                 | 去食堂消费的次数和真实熵的数据|
| shower_times               | 洗澡消费的次数和真实熵的数据|
| student_info               | 学生的年级和专业信息|
| temp                       | 临时数据,和Student_Consumption类似|
| water_times                | 打水消费的次数数据 |


#####表字段说明:

| 数据库表名                  | 字段                |
| ---------------------------| ---------------------------- |
| Student_Consumption        | 数据库的原始消费数据            |
| gpa_rank                   | 同学的每个学期的GPA排名和相邻学期突变数据      |
| lib_times                  | 图书馆次数多学期的排名|
| meal_times                 | 去食堂消费的次数和真实熵的数据|
| shower_times               | 洗澡消费的次数和真实熵的数据|
| student_info               | 学生的年级和专业信息|
| temp                       | 临时数据,和Student_Consumption类似|
| water_times                | 打水消费的次数数据 |

Student_Consumption:

| 数据库表名      | 字段                |  例子        |
| --------------| ------------ | ------------ |
| student_id    | 学生的id信息  | 2903301014 |
| date          | 记录日期 | 2010-03-23 |
| time          | 具体的时间 | 17:57:41 |
| type          | 消费地点 | library |
| location      | 具体的地点| library |
| cost          | 消费金额| 0 |
| balance       | 卡上余额| NULL |
这里是图书馆,说明是进入了图书馆,所以只是刷卡进入,所以卡上消费0,也不会显示卡上余额;


gpa_rank:

| 数据库表名      | 字段                |  例子        |
| --------------| ------------ | ------------ |
| student_id    | 学生的id信息  | 2903301014 |
| rank_1s       | 第一学期的成绩排名 | 0.916667 |
| rank_2s       | 第二学期的成绩排名 | 0.888889 |
| rankGap21     | 第二学期和第一学期的成绩排名差 | -0.0277778 |
| rankGap32     | 第三学期和第二学期的成绩排名差| -0.0555556 |
其他的rank_3s和rankGap43以此类推;

lib_times:

| 数据库表名      | 字段                |  例子        |
| --------------| ------------ | ------------ |
| student_id    | 学生的id信息  | 2903301014 |
| lib_times_1s  | 第一学期去图书馆次数的排名 | 0.777778 |

meal_times:

| 数据库表名      | 字段                |  例子        |
| --------------| ------------ | ------------ |
| student_id    | 学生的id信息  | 2903301014 |
| meal_times_1s | 第一学期的次数排名 | 0.777778 |
| meal_ae_1s    | 第一学期的真实熵排名| 0.777778 |
| num1s         | 第一学期的次数 | 172 |
| ae1s          | 第一学期的真实熵 | 2.32992 |

shower_times:

| 数据库表名      | 字段                |  例子        |
| --------------| ------------ | ------------ |
| student_id    | 学生的id信息  | 2903301014 |
| shower_times_1s | 第一学期的次数排名 | 0.777778 |
| shower_ae_1s    | 第一学期的真实熵排名| 0.777778 |
| num1s         | 第一学期的次数 | 172 |
| ae1s          | 第一学期的真实熵 | 2.32992 |

student_info:
| 数据库表名      | 字段                |  例子        |
| --------------| ------------ | ------------ |
| student_id    | 学生的id信息  | 2903301014 |
| grade         | 年级信息 | 2009 |
| major         | 专业信息    | 1 |

water_times:

| 数据库表名      | 字段                |  例子        |
| --------------| ------------ | ------------ |
| student_id    | 学生的id信息  | 2903301014 |
| water_times_1s| 第一学期的次数排名 | 2009 |
