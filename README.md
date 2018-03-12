# StudentLifeLine


###Node Script
1. `npx webpack` or `npm run build` to build src to public folder;
2. `npm run dev` to use webpack-dev-server to build development server with Hot Module Replacement
3. `npm run start` to run a Express server

###Use Mysql Databases

```
mysqld start
mysql.server start    # 1. 启动
mysql.server stop     # 2. 停止
mysql.server restart  # 3. 重启
```
当你安装过 MySQL 并没有找到 mysql.server 命令，那这时你需要找到安装目录中的 mysql.server 命令工具了，如 sudo /usr/local/mysql/support-files/mysql.server start

选取的用户列表：
top 100 student :
2902111025,2905403025,2907306007,2907305007,2901312033,2905101033,2902108024,2905402035,2904301031,2905401015,2905102033,2923102030,2901307007,2901101011,2909101004,2902108028,2902105004,2903003004,2907306028,2902113020,2906305011,2907305025,2903005008,2901311010,2902106030,2923103017,2907104026,2902109029,2903005018,2902101024,2903103018,2906303007,2908003024,2901309036,2903001022,2902001002,2902111016,2908001022,2903004002,2904202016,2908008005,2903305016,2904202026,2905103026,2923103009,2902107030,2902108007,2902301023,2903004001,2907105025,2907303003,2905101020,2901311029,2902001005,2902110017,2906306008,2902113021,2902112026,2902110013,2904201005,2901201002,2902112011,2901312022,2908403003,2905301021,2903005009,2905404026,2902107008,2902109030,2902108023,2908004019,2908007035,2903102011,2903103002,2904102020,2903102008,2908402017,2901309020,2907304009,2907201027,2902109024,2901305004,2904202015,2905201012,2908002028,2903004018,2902104003,2901203033,2901301026,2905201023,2904302004,2906305031,2903203002,2902109016,2908401031,2901303021,2909101008,2907104004,2903101026,2902103025

bottom 100 student :
2907304024,2909202022,2910102002,2903303006,2913103007,2923105015,2902112025,2923105019,2906005026,2923105018,2904101001,2901309005,2923102001,2908401015,2901203026,2906002031,2901201005,2912602004,2907305010,2910201021,2907102015,2904102012,2907101010,2923105007,2912601008,2907201015,2902113019,2908202013,2906004015,2903201030,2903402022,2907102024,2906001026,2906003032,2904101017,2906004031,2907102023,2923105002,2906007023,2902103023,2906304008,2903302025,2910101002,2905102016,2905201011,2907201018,2904102028,2903304017,2907102020,2905404021,2907301030,2901203023,2909201011,2906302013,2912602029,2909102013,2907301022,2905404009,2901201028,2901201010,2909201017,2907305024,2904102016,2923105006,2909103011,2923103026,2910101012,2911103027,2906301005,2903304022,2909202029,2905103003,2902302016,2905302001,2911101026,2907303016,2906003018,2907306024,2907305029,2911103030,2905403013,2912801014,2912602003,2905402027,2912601027,2903402020,2906007004,2906003012,2903002026,2910101003,2906003014,2904102015,2903402019,2903102024,2912702007,2903202023,2905404008,2911101025,2902302022,2908005020

//真实熵很高的人
select student_id,ae1s,num1s from meal_times  where student_id like "29%" and num1s > 30 order by ae1s ASC limit 1,100;

// lib top 100
 2902101025,2907301006,2908401010,2902002009,2901312003,2902113029,2902108028,2908003022,2902105022,2902112004,2901101016,2902001019,2902301026,2907201032,2901201017,2911103024,2902106003,2907301015,2909101021,2901306019,2902004022,2901305016,2907103020,2902108019,2902502028,2901102003,2902002008,2908007007,2907102024,2907306027,2902102006,2911101035,2908001027,2907105015,2902105034,2909202011,2901312001,2901306034,2901306001,2908402013,2903402026,2907301028,2902502021,2904102026,2901101014,2907301018,2901310014,2902003019,2902004003,2902501010,2901307027,2902106033,2910101007,2907103018,2908401008,2908008030,2902004005,2907302020,2902004009,2901307036,2901311023,2905403036,2902107002,2907103025,2902113002,2905104031,2901203023,2905401005,2911103007,2907106004,2907101025,2909201012,2908002028,2901101023,2903401004,2907103009,2901203024,2910102023,2902112008,2903202035,2901305017,2907302025,2902112022,2901308001,2907101018,2909201010,2909101026,2902004002,2902104003,2901305015,2909102018,2902001023,2901310013,2901308012,2902003014,2902002021,2908001004,2902103001,2902101016,2901304031
// lib bottom100
 2902002001,2902301006,2902001026,2901302005,2901303026,2901302035,2901308006,2901302030,2910202032,2901202020,2908001003,2909103012,2902002034,2901301013,2902109023,2909103024,2901310001,2901309031,2901203019,2905202029,2910202004,2901308025,2908008026,2900101013,2901310019,2907304029,2902004018,2905202027,2905301026,2907102012,2909201015,2901101032,2910201018,2910201033,2902501014,2907104018,2901303034,2909103021,2907105011,2910201025,2910102034,2910102031,2901312014,2911101021,2910201030,2901311027,2903304027,2902001014,2901203018,2907103011,2902502015,2901303015,2909103018,2901301019,2903003032,2909201022,2908403027,2907102004,2907106024,2907101020,2910202024,2901201002,2908403019,2909202029,2909101017,2905404035,2901302034,2903201032,2901311019,2902003010,2902003030,2907101022,2901102013,2902113037,2910201020,2901312007,2902105021,2901312016,2911101028,2901312034,2909201013,2902107024,2907304030,2902101030,2908005018,2909101030,2901302032,2902112015,2910101002,2905302026,2910101031,2905302029,2901312027,2902103025,2909201026,2909202016,2902110014,2910202034,2903001033,2910202033


meal top 100
// 2903305015,2902102028,2901203013,2902109028,2908403017,2905105015,2903202004,2902102024,2907106015,2903004023,2903402003,2908006006,2905401005,2908004007,2902107019,2904203003,2901308019,2908008003,2901311028,2903004013,2903004027,2908401031,2907305021,2903001011,2907102009,2907303008,2908403006,2905401022,2903002004,2908006005,2908008001,2908202026,2908001034,2910201002,2905403001,2903004011,2904203016,2907302021,2907301013,2901306006,2908002033,2902107017,2907302009,2905302030,2903402015,2904302008,2909101029,2905105014,2908001032,2907301028,2903201010,2905104011,2908001027,2907101012,2902108028,2901101011,2910201001,2908006030,2904201022,2901301016,2901307034,2903302024,2905404019,2905302025,2909103030,2908006028,2903305019,2908403021,2904302021,2908002014,2905102006,2904201015,2910201012,2910102009,2901311016,2902501020,2907106002,2908402013,2905202025,2902110015,2908403028,2908004022,2902501015,2908008019,2905404020,2903304015,2907201006,2910201004,2902106036,2907106001,2901101031,2903003002,2902103035,2907101023,2908403007,2902001005,2903203014,2904102005,2903305018,2901306002

meal bottom 100
// 2910202032,2901310034,2905103033,2903001026,2901201005,2901306036,2909102015,2904203022,2908201026,2911103022,2904203019,2901303034,2902112036,2901301037,2907106010,2902302027,2904203021,2901201028,2903401010,2905402027,2901302021,2901201013,2904204028,2911101022,2902101021,2911102034,2909102021,2905103030,2903303006,2901202001,2904302029,2907305029,2904204027,2910101002,2905103032,2901202020,2901304033,2903102028,2905102017,2902101033,2902101034,2905404025,2907305026,2910202023,2903301012,2905104032,2905201005,2905404009,2903101031,2902101037,2903301028,2901303036,2904101013,2903201019,2905202003,2903201005,2902110010,2905101023,2905102016,2910101006,2905301026,2907101029,2902106002,2901308033,2903303026,2909202028,2911102030,2903101004,2905401012,2902003032,2903402010,2911101031,2903301015,2901301038,2909102013,2902004029,2902501025,2902001031,2905302001,2902106001,2903003032,2902003022,2909202023,2901303037,2905402023,2907305002,2904301030,2905403033,2910101008,2901312036,2904301025,2905104008,2902108023,2902106006,2905103014,2903301007,2905104031,2910101012,2907301022,2907305018


//
select student_id,lib_times_1s from lib_times  where student_id like "29%" and lib_times_1s > 0 order by lib_times_1s ASC limit 1,100;

lib_times_1 top 100;

2901304005,2908008006,2906002014,2902105032,2901301033,2906302019,2907303030,2907104012,2903005012,2905104007,2923103029,2902108010,2901312021,2905401032,2905402001,2903305014,2908008033,2902003019,2906002021,2904203007,2902108011,2901310013,2901202032,2903202006,2913101016,2906304002,2911103007,2908008005,2903101018,2902111031,2908402013,2901305015,2909103019,2907301009,2907103018,2903005008,2905103027,2906007012,2923102013,2902101024,2901301037,2903301017,2908005007,2908002003,2906303007,2906303015,2906303001,2910102008,2902003031,2902101009,2910202032,2901304027,2912601030,2901102003,2904102008,2905301027,2900101008,2906005003,2905201030,2906005008,2906006025,2904301006,2906005033,2906003034,2902301023,2906006011,2904203018,2912701026,2907301006,2902109022,2902501023,2907103001,2908201004,2903402012,2901307026,2909202010,2903002004,2905104001,2923105020,2923105021,2901201001,2903203022,2913101023,2913104017,2902110035,2901304033,2911102004,2905401036,2903304008,2908007001,2903102008,2902113021,2908403007,2901304015,2909101029,2902004018,2907306025,2907104023,2902108002,2903001009


select student_id,lib_times_1s from lib_times  where student_id like "29%" and lib_times_1s > 0 order by lib_times_1s DESC limit 1,100;

bottom_lib_times_1s

2905403015,2907201021,2905403011,2905403013,2905403008,2905403009,2904203020,2907105012,2907105016,2905404007,2907102024,2902501016,2907201002,2907106017,2904202028,2904204012,2905404020,2905404012,2905402013,2907102022,2907105020,2903001005,2905103005,2902501014,2905404008,2904204009,2904201019,2901303026,2903001013,2902002022,2907105019,2907101020,2905103003,2905301014,2910201006,2901305009,2901305018,2901307010,2903203016,2907106024,2905402027,2905404013,2903002009,2903002021,2907201015,2902502012,2905104015,2905104010,2910102003,2901202011,2901101016,2902003015,2902001019,2904201021,2904203019,2903203006,2901301006,2901303023,2901310034,2901310006,2901306034,2903101022,2903101014,2907104019,2907104010,2905302010,2905104017,2910201008,2909202029,2900102008,2902302025,2902002018,2903003025,2903004010,2903202017,2905104012,2901308029,2901308026,2901307034,2901304026,2910102025,2903103012,2907106013,2907103007,2902003032,2901202010,2901201009,2903402024,2907305003,2905301015,2904102022,2903203018,2910202007,2903005019,2903002020,2911103025,2901312004,2901301028,2901312005,2901301019



