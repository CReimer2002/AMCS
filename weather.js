/*

    [
        600,                      local time in 24 hour format
        1,                        day of the invasion
        30.06,                    inHg 
        [8,9],                    cloud cover 0-8 (clear through overcast)(altitude in thousands of cloud base)
        0,                        precipitation 0-4. 0 none, 1 very light, 2 moderate, 3 heavy, 4 thunderstorm
        37.4,                     temp in f
        2.49                      visibility in miles
        [7.78,2]                  [wind in kts,dir 1 for N, 2 NE, 3 E, 4 SE, 5 S, 6 SW, 7 W, 8 NW]
    ],
*/
let GE_9_3_21_600= {//in this instance the invasion starts on march 9, 2021 at 600. Chosen due to the poor weather that day and the following day's projected rainfall which will benefit entrenched forces but harm movements of counterattacking US forces. 
    d0:{
        sunRise:642,
        sunSet:1819,
        h600:{
            time:600,
            temp:39,
            pressure:30.18,
            windSpd:9.72,
            windDr:1,
            vis:6.21,
            cloudCover:6,
            cloudAlt:3,
            precip:1
        },
        h630:{
            time:630,
            temp:39,
            pressure:30.18,
            windSpd:0,
            windDr:1,
            vis:6.21,
            cloudCover:6,
            cloudAlt:3,
            precip:1
        },
        h700:{
            time:700,
            temp:39.2,
            pressure:30.18,
            windSpd:5.83,
            windDr:0,
            vis:6.21,
            cloudCover:6,
            cloudAlt:3,
            precip:1
        },
        h730:{
            time:730,
            temp:39.2,
            pressure:30.18,
            windSpd:7.78,
            windDr:2,
            vis:6.21,
            cloudCover:6,
            cloudAlt:2,
            precip:1
        }
    },
};

export default {GE_9_3_21_600}