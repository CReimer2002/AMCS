import time from "./weather.js";
let general={
    refreshRate:1,//how many times per hour the sim will create a complete dataset. 1 will mean the sim will refresh at an hourly rate. 2 will be every 30 minutes. 3 will be every 20. etc.
    refreshNumber:0,//how many times the sim has refreshed. 
};
let environment ={
    timeZone:4,//time + or - UTC, used to calculate sunset/sunrise times which are in turn used to control the employment of troops, movements of supplies, and calculations for unit capabilities in real time, not sure if I will use this.
    startDate:time.GE_9_3_21_600.d0,//how many days including and after january 1st the simulation is to start
    startTime:time.GE_9_3_21_600.d0.h730,//the hour and minute the sim is supposed to start. Unsure if this is to be used.
    clearDayVis:6.21//how far, in miles, the sim treat a perfect day's visibilty being. Sources of visibility must not factor in the position of the sun. This impacts effective ranges of most weapons. 
};
let multipliers = {
    personnel:{
        medical:{//the value, in points, of various IFAK contents. The presence of a CAT TQ in an IFAK will be more useful than medical shears, yet both will add tangible benefits to a soldier's survivability when wounded. 
            tieOffTQ:4,
            CATorSWAT_TQ:10,
            wPackGauze:2,
            sCWA:3,
            nAK:3,
            PressDressAndBdg:2.5,
            shears:1,
            gloves:.5,
            blanket:.75,
            litter:.1,
            splint:.2,
            meds:3,
            bbKit:2,
            mTape:1
        },
        weapons:{
            guns:{
                gLengthDBuffByTType:[//how much every inch will of total length will reduce a gun's power in various terrains
                    0,    // grassland with very little cover
                    .8,  // rural with few buildings
                    .9,  // rural with  buildings
                    .4,  // vineyards/tall fields/farmland
                    .95,  // forest, dense
                    1, // industrial facility
                    .7,  // airfield
                    .75,  // military base
                    1,   // urban area with many houses
                    1.25,  // highly developed city
                    .85  // rural with buildings and lots of forest                
                ],
                gRangeByOpticNODAtNight:[//how much a weapons range will be set to at night time with various night vision optics
                    60,//naked eye
                    100,//gen 1 nods with IR illuminator. Night vision, but to other night vision users it is painfully obvious where you are.
                    200,//gen 2 nods without IR illuminators and with a clearer picture. Not quite as good as daytime but still much better than previous options
                    400//gen 3 nods, best non-thermal nods on the market.
                       //thermal nods are not on this list but are represented in the code. best possible option, able to see through fog and are a huge force multiplier.
                ],
                eByEyepieceType:[//how much the number of tubes on the NOD impacts it's effectiveness
                    0,
                    .8,
                    1,
                    1.1,
                    1.2
                ],
                sightVsHelmetNods:.85,// what percent effective rifle optics are compared to helmet mounted nods of the same type.
                thermalSightRangeBuff:1.25,// what multiplier will be applied to the effective range of whichever lucky bastard has thermal nods in his kit. 
                gBuffByYByTType:[//how much an effective range  multiplies the combat effectiveness of a weapon, per yard, by terrain type. This can be thought of as the probability of engagements occuring at ranges that such capability would be useful in those terrains. 
                    .1,    // grassland with very little cover
                    .08,  // rural with few buildings
                    .07,  // rural with  buildings
                    .04,  // vineyards/tall fields/farmland
                    0,  // forest, dense
                    .03, // industrial facility
                    .05,  // airfield
                    .045,  // military base
                    .03,   // urban area with many houses
                    .015,  // highly developed city
                    .01  // rural with buildings and lots of forest      
                ],
                gDBuffByLb:.1,//how much every lb of rifle weight is multiplied by to create a total to be subtracted from a weapon's combat effectiveness
                gLoudnessThreshold:165,//the sound decibels below which a gun will start gaining points for being quiet
                gBuffByLDb:.025,//how much every decibel less than the threshold will add to the soldier's combat effectiveness
                gRangeBuffByOpticMag:25,//how much the effective range is boosted by each x of magnification more than 1 of an optic
                gRangeBuffByOpticPic:.3,//how much the effective range is boosted by each mm of sight picture
                gRangeBByUBGLYardage:.5,//how much every yard of a uBGL's effective range is multiplied to be added to the primary weapon's range stat. Only factored in if the soldier has more than 0 uBGL rounds on them
                gRangeBByGripType:[//effective range buff by type of grip, if any
                    0,//none
                    5,//dong style
                    7.5,//half grip
                    10,//full grip
                    100,//bipod
                    120//grip+bipod
                ],
                gVBBWhiteLight:.25,//how much is added to the overall value of a weapon due to it having a weapon mounted conventional flashlight
                gVBBIRLight:.25,//how much is added to the overall value of a weapon due to it having a weapon mounted IR flashlight
                gVBBLaser:.25,//how much is added to the overall value of a weapon due to it having a conventional laser
                gVBBIRLaser:.25,//how much is added to the overall value of weapon due to it having an IR laser

            },
            general:{
                AVPointsPerMMRHAPen:1,//how many Antivehicle points is given to a firearm per MM of RHA it can pen
                caliberRHAPenValues:{//how many mm of RHA each caliber can pierce, used to calculate lethality against vehicles
                    c_545x39:6,//no source, guessing
                    c_762x39:9,//no source, guessing
                    c_556x45:9.525,//M855 ball
                    c_762x51:18,//M993 AP
                    c_50:25,//SLAP round, estimated
                    c_338:19,//estimated, no source
                    c_762x54:19,//estimated, no source
                    c_12_7:19,//estimated, no source
                    c_300WM:19,//estimated, no source
                }
            }

        },
        experience:{
            buffPerHourCombatExperience:.05,
            combatExperiencePerHourInCombat:1,
            combatExperiencePerHourOnFront:.25,
            combatExperiencePerHourPolicing:.1,
            nonCombatJobExperiencePerHourActive:.025,
        },
        health:{
            hoursSleepInPast48Buff:.075,
            hoursSinceLastRestDebuff:.1,//how much every hour over 14 since last rest will deduct from a soldier's morale, effectiveness and energy.
            recentShowerBuff:1,
            recentLaundryBuff:1,
            recentReserveBuff:1,
            recentMealBuff:4,
            recentWaterBuff:5
        }
    },
};
let nationalities = {
    percentageInfWomenByService:[
        [//USA
            .135,//US Army
            .209,//US Air Force
            .16,//Navy
            .063//Marines
        ],
        [//Russia
            .04,
            .1,
            .05,
            .01
        ],
        [//Abkhazia
            .04,
            .1,
            .05,
            .01
        ],
        [//Georgia
            .025,
            .04,
            .025,
            .01
        ],
    ]
}

export default {general,unitPower,environment,multipliers,nationalities};
