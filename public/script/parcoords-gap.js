var init = function(){

    var data = [
        {
            "student_id": "2010001010003",
            "score_1s": 73,
            "score_2s": 67,
            "score_3s": 77,
            "score_4s": 74,
            "score_5s": 67,
            "score_6s": 73
        },
        {
            "student_id": "2010001010004",
            "score_1s": 77,
            "score_2s": 75,
            "score_3s": 86,
            "score_4s": 87,
            "score_5s": 82,
            "score_6s": 84
        },
        {
            "student_id": "2010001010005",
            "score_1s": 79,
            "score_2s": 73,
            "score_3s": 83,
            "score_4s": 81,
            "score_5s": 78,
            "score_6s": 81
        },
        {
            "student_id": "2010001010006",
            "score_1s": 79,
            "score_2s": 83,
            "score_3s": 86,
            "score_4s": 84,
            "score_5s": 65,
            "score_6s": 94
        },
        {
            "student_id": "2010001010007",
            "score_1s": 83,
            "score_2s": 73,
            "score_3s": 86,
            "score_4s": 91,
            "score_5s": 87,
            "score_6s": 84
        },
        {
            "student_id": "2010001010008",
            "score_1s": 80,
            "score_2s": 71,
            "score_3s": 76,
            "score_4s": 85,
            "score_5s": 75,
            "score_6s": 92
        },
        {
            "student_id": "2010001010009",
            "score_1s": 88,
            "score_2s": 77,
            "score_3s": 86,
            "score_4s": 80,
            "score_5s": 82,
            "score_6s": 75
        },
        {
            "student_id": "2010001010010",
            "score_1s": 60,
            "score_2s": 45,
            "score_3s": 36,
            "score_4s": 12,
            "score_5s": 62,
            "score_6s": 28
        },
        {
            "student_id": "2010001020001",
            "score_1s": 82,
            "score_2s": 0,
            "score_3s": 94,
            "score_4s": 91,
            "score_5s": 93,
            "score_6s": 94
        },
        {
            "student_id": "2010001020002",
            "score_1s": 84,
            "score_2s": 81,
            "score_3s": 91,
            "score_4s": 88,
            "score_5s": 88,
            "score_6s": 88
        },
        {
            "student_id": "2010001020003",
            "score_1s": 75,
            "score_2s": 62,
            "score_3s": 73,
            "score_4s": 79,
            "score_5s": 75,
            "score_6s": 84
        },
        {
            "student_id": "2010001020004",
            "score_1s": 84,
            "score_2s": 80,
            "score_3s": 89,
            "score_4s": 89,
            "score_5s": 79,
            "score_6s": 85
        },
        {
            "student_id": "2010001020005",
            "score_1s": 87,
            "score_2s": 83,
            "score_3s": 87,
            "score_4s": 90,
            "score_5s": 84,
            "score_6s": 88
        },
        {
            "student_id": "2010001020006",
            "score_1s": 80,
            "score_2s": 77,
            "score_3s": 87,
            "score_4s": 88,
            "score_5s": 82,
            "score_6s": 84
        },
        {
            "student_id": "2010001020007",
            "score_1s": 86,
            "score_2s": 85,
            "score_3s": 92,
            "score_4s": 90,
            "score_5s": 91,
            "score_6s": 86
        },
        {
            "student_id": "2010001020008",
            "score_1s": 82,
            "score_2s": 72,
            "score_3s": 84,
            "score_4s": 80,
            "score_5s": 81,
            "score_6s": 78
        },
        {
            "student_id": "2010001020009",
            "score_1s": 62,
            "score_2s": 69,
            "score_3s": 54,
            "score_4s": 48,
            "score_5s": 48,
            "score_6s": 60
        },
        {
            "student_id": "2010001030001",
            "score_1s": 87,
            "score_2s": 84,
            "score_3s": 90,
            "score_4s": 90,
            "score_5s": 81,
            "score_6s": 88
        },
        {
            "student_id": "2010001030002",
            "score_1s": 86,
            "score_2s": 81,
            "score_3s": 92,
            "score_4s": 91,
            "score_5s": 83,
            "score_6s": 86
        },
        {
            "student_id": "2010001030003",
            "score_1s": 82,
            "score_2s": 82,
            "score_3s": 87,
            "score_4s": 89,
            "score_5s": 81,
            "score_6s": 90
        },
        {
            "student_id": "2010001030004",
            "score_1s": 89,
            "score_2s": 80,
            "score_3s": 88,
            "score_4s": 90,
            "score_5s": 85,
            "score_6s": 81
        },
        {
            "student_id": "2010001030005",
            "score_1s": 89,
            "score_2s": 83,
            "score_3s": 87,
            "score_4s": 87,
            "score_5s": 82,
            "score_6s": 92
        },
        {
            "student_id": "2010001030006",
            "score_1s": 82,
            "score_2s": 82,
            "score_3s": 89,
            "score_4s": 91,
            "score_5s": 84,
            "score_6s": 89
        },
        {
            "student_id": "2010001030007",
            "score_1s": 86,
            "score_2s": 83,
            "score_3s": 84,
            "score_4s": 88,
            "score_5s": 85,
            "score_6s": 94
        },
        {
            "student_id": "2010001030008",
            "score_1s": 80,
            "score_2s": 71,
            "score_3s": 80,
            "score_4s": 85,
            "score_5s": 77,
            "score_6s": 81
        },
        {
            "student_id": "2010001030009",
            "score_1s": 82,
            "score_2s": 79,
            "score_3s": 81,
            "score_4s": 85,
            "score_5s": 64,
            "score_6s": 77
        },
        {
            "student_id": "2010001040001",
            "score_1s": 80,
            "score_2s": 74,
            "score_3s": 81,
            "score_4s": 82,
            "score_5s": 79,
            "score_6s": 87
        },
        {
            "student_id": "2010001040002",
            "score_1s": 85,
            "score_2s": 81,
            "score_3s": 89,
            "score_4s": 95,
            "score_5s": 86,
            "score_6s": 94
        },
        {
            "student_id": "2010001040003",
            "score_1s": 82,
            "score_2s": 75,
            "score_3s": 74,
            "score_4s": 80,
            "score_5s": 53,
            "score_6s": 62
        },
        {
            "student_id": "2010001040004",
            "score_1s": 87,
            "score_2s": 85,
            "score_3s": 88,
            "score_4s": 90,
            "score_5s": 84,
            "score_6s": 90
        },
        {
            "student_id": "2010001040005",
            "score_1s": 92,
            "score_2s": 85,
            "score_3s": 85,
            "score_4s": 91,
            "score_5s": 80,
            "score_6s": 81
        },
        {
            "student_id": "2010001040006",
            "score_1s": 81,
            "score_2s": 81,
            "score_3s": 82,
            "score_4s": 84,
            "score_5s": 74,
            "score_6s": 94
        },
        {
            "student_id": "2010001040007",
            "score_1s": 78,
            "score_2s": 74,
            "score_3s": 80,
            "score_4s": 79,
            "score_5s": 69,
            "score_6s": 84
        },
        {
            "student_id": "2010001040008",
            "score_1s": 82,
            "score_2s": 76,
            "score_3s": 85,
            "score_4s": 86,
            "score_5s": 83,
            "score_6s": 81
        },
        {
            "student_id": "2010001040009",
            "score_1s": 80,
            "score_2s": 73,
            "score_3s": 84,
            "score_4s": 89,
            "score_5s": 77,
            "score_6s": 79
        },
        {
            "student_id": "2010011010001",
            "score_1s": 79,
            "score_2s": 75,
            "score_3s": 77,
            "score_4s": 78,
            "score_5s": 76,
            "score_6s": 82
        },
        {
            "student_id": "2010011010002",
            "score_1s": 67,
            "score_2s": 69,
            "score_3s": 65,
            "score_4s": 70,
            "score_5s": 76,
            "score_6s": 77
        },
        {
            "student_id": "2010011010003",
            "score_1s": 84,
            "score_2s": 87,
            "score_3s": 89,
            "score_4s": 94,
            "score_5s": 90,
            "score_6s": 91
        },
        {
            "student_id": "2010011010004",
            "score_1s": 83,
            "score_2s": 89,
            "score_3s": 91,
            "score_4s": 93,
            "score_5s": 92,
            "score_6s": 90
        },
        {
            "student_id": "2010011010005",
            "score_1s": 81,
            "score_2s": 81,
            "score_3s": 86,
            "score_4s": 88,
            "score_5s": 77,
            "score_6s": 85
        },
        {
            "student_id": "2010011010006",
            "score_1s": 84,
            "score_2s": 86,
            "score_3s": 86,
            "score_4s": 85,
            "score_5s": 74,
            "score_6s": 76
        },
        {
            "student_id": "2010011010009",
            "score_1s": 83,
            "score_2s": 83,
            "score_3s": 85,
            "score_4s": 78,
            "score_5s": 54,
            "score_6s": 66
        },
        {
            "student_id": "2010011010010",
            "score_1s": 82,
            "score_2s": 83,
            "score_3s": 89,
            "score_4s": 87,
            "score_5s": 0,
            "score_6s": 0
        },
        {
            "student_id": "2010011010012",
            "score_1s": 89,
            "score_2s": 91,
            "score_3s": 90,
            "score_4s": 84,
            "score_5s": 74,
            "score_6s": 76
        },
        {
            "student_id": "2010011010013",
            "score_1s": 74,
            "score_2s": 62,
            "score_3s": 44,
            "score_4s": 55,
            "score_5s": 64,
            "score_6s": 74
        },
        {
            "student_id": "2010011010014",
            "score_1s": 81,
            "score_2s": 71,
            "score_3s": 59,
            "score_4s": 76,
            "score_5s": 66,
            "score_6s": 74
        },
        {
            "student_id": "2010011010015",
            "score_1s": 86,
            "score_2s": 89,
            "score_3s": 87,
            "score_4s": 88,
            "score_5s": 89,
            "score_6s": 85
        },
        {
            "student_id": "2010011010016",
            "score_1s": 68,
            "score_2s": 65,
            "score_3s": 58,
            "score_4s": 63,
            "score_5s": 65,
            "score_6s": 70
        },
        {
            "student_id": "2010011010018",
            "score_1s": 76,
            "score_2s": 72,
            "score_3s": 64,
            "score_4s": 67,
            "score_5s": 79,
            "score_6s": 76
        },
        {
            "student_id": "2010011010019",
            "score_1s": 77,
            "score_2s": 70,
            "score_3s": 70,
            "score_4s": 56,
            "score_5s": 67,
            "score_6s": 59
        },
        {
            "student_id": "2010011010020",
            "score_1s": 68,
            "score_2s": 76,
            "score_3s": 72,
            "score_4s": 74,
            "score_5s": 79,
            "score_6s": 70
        },
        {
            "student_id": "2010011010021",
            "score_1s": 80,
            "score_2s": 75,
            "score_3s": 66,
            "score_4s": 75,
            "score_5s": 67,
            "score_6s": 79
        },
        {
            "student_id": "2010011010022",
            "score_1s": 76,
            "score_2s": 82,
            "score_3s": 82,
            "score_4s": 87,
            "score_5s": 84,
            "score_6s": 78
        },
        {
            "student_id": "2010011010023",
            "score_1s": 80,
            "score_2s": 84,
            "score_3s": 85,
            "score_4s": 79,
            "score_5s": 79,
            "score_6s": 85
        },
        {
            "student_id": "2010011010024",
            "score_1s": 83,
            "score_2s": 77,
            "score_3s": 71,
            "score_4s": 78,
            "score_5s": 77,
            "score_6s": 70
        },
        {
            "student_id": "2010011010025",
            "score_1s": 86,
            "score_2s": 85,
            "score_3s": 90,
            "score_4s": 89,
            "score_5s": 88,
            "score_6s": 84
        },
        {
            "student_id": "2010011010026",
            "score_1s": 70,
            "score_2s": 37,
            "score_3s": 48,
            "score_4s": 62,
            "score_5s": 60,
            "score_6s": 65
        },
        {
            "student_id": "2010011010027",
            "score_1s": 77,
            "score_2s": 76,
            "score_3s": 77,
            "score_4s": 77,
            "score_5s": 70,
            "score_6s": 70
        },
        {
            "student_id": "2010011010028",
            "score_1s": 71,
            "score_2s": 75,
            "score_3s": 68,
            "score_4s": 80,
            "score_5s": 69,
            "score_6s": 73
        },
        {
            "student_id": "2010011010029",
            "score_1s": 77,
            "score_2s": 81,
            "score_3s": 83,
            "score_4s": 87,
            "score_5s": 74,
            "score_6s": 77
        },
        {
            "student_id": "2010011010030",
            "score_1s": 81,
            "score_2s": 85,
            "score_3s": 86,
            "score_4s": 85,
            "score_5s": 76,
            "score_6s": 83
        },
        {
            "student_id": "2010011010031",
            "score_1s": 70,
            "score_2s": 85,
            "score_3s": 81,
            "score_4s": 84,
            "score_5s": 72,
            "score_6s": 78
        },
        {
            "student_id": "2010011010032",
            "score_1s": 80,
            "score_2s": 82,
            "score_3s": 83,
            "score_4s": 85,
            "score_5s": 77,
            "score_6s": 85
        },
        {
            "student_id": "2010011010033",
            "score_1s": 82,
            "score_2s": 84,
            "score_3s": 85,
            "score_4s": 89,
            "score_5s": 75,
            "score_6s": 86
        },
        {
            "student_id": "2010011020001",
            "score_1s": 72,
            "score_2s": 70,
            "score_3s": 79,
            "score_4s": 83,
            "score_5s": 77,
            "score_6s": 85
        },
        {
            "student_id": "2010011020002",
            "score_1s": 84,
            "score_2s": 78,
            "score_3s": 81,
            "score_4s": 83,
            "score_5s": 76,
            "score_6s": 75
        },
        {
            "student_id": "2010011020003",
            "score_1s": 86,
            "score_2s": 91,
            "score_3s": 91,
            "score_4s": 89,
            "score_5s": 83,
            "score_6s": 81
        },
        {
            "student_id": "2010011020004",
            "score_1s": 81,
            "score_2s": 86,
            "score_3s": 83,
            "score_4s": 83,
            "score_5s": 83,
            "score_6s": 77
        },
        {
            "student_id": "2010011020005",
            "score_1s": 79,
            "score_2s": 75,
            "score_3s": 70,
            "score_4s": 64,
            "score_5s": 65,
            "score_6s": 74
        },
        {
            "student_id": "2010011020006",
            "score_1s": 76,
            "score_2s": 67,
            "score_3s": 66,
            "score_4s": 67,
            "score_5s": 59,
            "score_6s": 67
        },
        {
            "student_id": "2010011020007",
            "score_1s": 77,
            "score_2s": 76,
            "score_3s": 73,
            "score_4s": 76,
            "score_5s": 61,
            "score_6s": 77
        },
        {
            "student_id": "2010011020008",
            "score_1s": 61,
            "score_2s": 44,
            "score_3s": 30,
            "score_4s": 15,
            "score_5s": 57,
            "score_6s": 44
        },
        {
            "student_id": "2010011020009",
            "score_1s": 86,
            "score_2s": 91,
            "score_3s": 92,
            "score_4s": 89,
            "score_5s": 86,
            "score_6s": 88
        },
        {
            "student_id": "2010011020010",
            "score_1s": 73,
            "score_2s": 72,
            "score_3s": 74,
            "score_4s": 80,
            "score_5s": 72,
            "score_6s": 80
        },
        {
            "student_id": "2010011020011",
            "score_1s": 81,
            "score_2s": 85,
            "score_3s": 85,
            "score_4s": 86,
            "score_5s": 77,
            "score_6s": 80
        },
        {
            "student_id": "2010011020012",
            "score_1s": 70,
            "score_2s": 63,
            "score_3s": 59,
            "score_4s": 59,
            "score_5s": 54,
            "score_6s": 75
        },
        {
            "student_id": "2010011020013",
            "score_1s": 83,
            "score_2s": 85,
            "score_3s": 88,
            "score_4s": 90,
            "score_5s": 86,
            "score_6s": 90
        },
        {
            "student_id": "2010011020014",
            "score_1s": 81,
            "score_2s": 81,
            "score_3s": 86,
            "score_4s": 85,
            "score_5s": 0,
            "score_6s": 87
        },
        {
            "student_id": "2010011020015",
            "score_1s": 80,
            "score_2s": 83,
            "score_3s": 81,
            "score_4s": 73,
            "score_5s": 65,
            "score_6s": 80
        },
        {
            "student_id": "2010011020016",
            "score_1s": 73,
            "score_2s": 70,
            "score_3s": 80,
            "score_4s": 76,
            "score_5s": 68,
            "score_6s": 79
        },
        {
            "student_id": "2010011020017",
            "score_1s": 79,
            "score_2s": 85,
            "score_3s": 81,
            "score_4s": 81,
            "score_5s": 71,
            "score_6s": 79
        },
        {
            "student_id": "2010011020018",
            "score_1s": 80,
            "score_2s": 70,
            "score_3s": 73,
            "score_4s": 73,
            "score_5s": 64,
            "score_6s": 63
        },
        {
            "student_id": "2010011020019",
            "score_1s": 74,
            "score_2s": 79,
            "score_3s": 79,
            "score_4s": 75,
            "score_5s": 73,
            "score_6s": 79
        },
        {
            "student_id": "2010011020020",
            "score_1s": 69,
            "score_2s": 68,
            "score_3s": 56,
            "score_4s": 51,
            "score_5s": 51,
            "score_6s": 64
        },
        {
            "student_id": "2010011020021",
            "score_1s": 69,
            "score_2s": 69,
            "score_3s": 72,
            "score_4s": 81,
            "score_5s": 73,
            "score_6s": 81
        },
        {
            "student_id": "2010011020022",
            "score_1s": 82,
            "score_2s": 81,
            "score_3s": 80,
            "score_4s": 80,
            "score_5s": 70,
            "score_6s": 81
        },
        {
            "student_id": "2010011020023",
            "score_1s": 83,
            "score_2s": 86,
            "score_3s": 89,
            "score_4s": 86,
            "score_5s": 80,
            "score_6s": 85
        },
        {
            "student_id": "2010011020024",
            "score_1s": 73,
            "score_2s": 76,
            "score_3s": 74,
            "score_4s": 75,
            "score_5s": 68,
            "score_6s": 82
        },
        {
            "student_id": "2010011020025",
            "score_1s": 77,
            "score_2s": 79,
            "score_3s": 73,
            "score_4s": 78,
            "score_5s": 75,
            "score_6s": 79
        },
        {
            "student_id": "2010011020026",
            "score_1s": 86,
            "score_2s": 88,
            "score_3s": 87,
            "score_4s": 85,
            "score_5s": 81,
            "score_6s": 80
        },
        {
            "student_id": "2010011020027",
            "score_1s": 68,
            "score_2s": 75,
            "score_3s": 72,
            "score_4s": 69,
            "score_5s": 57,
            "score_6s": 70
        },
        {
            "student_id": "2010011020028",
            "score_1s": 79,
            "score_2s": 83,
            "score_3s": 83,
            "score_4s": 85,
            "score_5s": 76,
            "score_6s": 84
        },
        {
            "student_id": "2010011020029",
            "score_1s": 70,
            "score_2s": 70,
            "score_3s": 69,
            "score_4s": 67,
            "score_5s": 62,
            "score_6s": 73
        },
        {
            "student_id": "2010011020030",
            "score_1s": 69,
            "score_2s": 71,
            "score_3s": 61,
            "score_4s": 61,
            "score_5s": 59,
            "score_6s": 80
        },
        {
            "student_id": "2010011020031",
            "score_1s": 85,
            "score_2s": 84,
            "score_3s": 86,
            "score_4s": 84,
            "score_5s": 82,
            "score_6s": 89
        },
        {
            "student_id": "2010011020032",
            "score_1s": 87,
            "score_2s": 92,
            "score_3s": 91,
            "score_4s": 91,
            "score_5s": 82,
            "score_6s": 89
        },
        {
            "student_id": "2010011020033",
            "score_1s": 82,
            "score_2s": 77,
            "score_3s": 80,
            "score_4s": 85,
            "score_5s": 77,
            "score_6s": 81
        },
        {
            "student_id": "2010012010001",
            "score_1s": 89,
            "score_2s": 88,
            "score_3s": 90,
            "score_4s": 85,
            "score_5s": 84,
            "score_6s": 77
        },
        {
            "student_id": "2010012010002",
            "score_1s": 82,
            "score_2s": 88,
            "score_3s": 89,
            "score_4s": 85,
            "score_5s": 84,
            "score_6s": 76
        },
        {
            "student_id": "2010012010003",
            "score_1s": 87,
            "score_2s": 90,
            "score_3s": 83,
            "score_4s": 85,
            "score_5s": 81,
            "score_6s": 88
        }
    ]

    var pc = d3.parcoords()("#parcoord-gap");

    var range =pc.height() - pc.margin().top - pc.margin().bottom;

    var log = d3.scale.linear()
        .domain([0, 100])
        .range([range,1]);

    var dimensions = {
        score_1s:{
            yscale: log
        },
        score_2s:{
            yscale: log
        },
        score_3s:{
            yscale: log
        },
        score_4s:{
            yscale: log
        },
        score_5s:{
            yscale: log
        },
        score_6s:{
            yscale: log
        }
    };


    pc.data(data)
        .bundlingStrength(2) // set bundling strength
        .smoothness(.25)
        .bundleDimension("score_3s")
        // .dimensions(dimensions)
        .hideAxis(["student_id"])
        .showControlPoints(false)
        .composite('lighter')
        .alpha(.4)
        .color('#4ccb61')
        .mode("queue")
        .render()
        .brushMode("1D-axes")
        .reorderable()
        .interactive();

    pc.on('brush',function(d){
        console.log(d);
    });
};


var reloadData = function(data){


};

window.parcoods = {
    parcoodsGap:{
        init,
        reloadData
    }
};
