import time from "./weather.js";
let general={
    refreshRate:1,//how many times per hour the sim will create a complete dataset. 1 will mean the sim will refresh at an hourly rate. 2 will be every 30 minutes. 3 will be every 20. etc.
    refreshNumber:0,//how many times the sim has refreshed. 
};
let unitPower = {
    riflePowerByTerrain:{//how much power each primary contributes to a soldier's capability in battle.
        /*
            0: grassland with very little cover
            1: rural with few buildings
            2: rural area with buildings
            3: vineyards/tall fields/farmland
            4: forest, dense
            5: industrial facility
            6: airfield
            7: military base
            8: urban area with many houses
            9: highly developed city
            10: rural with buildings and lots of forest
        */
        ak74:10,//stats for different environments, reference above. Factors like the presence and type of optic, barrel length (relevant in cqb and vehicles), effective range, AP capability, etc. will be taken into account.
        ak47:12,
        rpk74:15,
        pkm:20,
        svd:20,
        m4:10,
        m16:11,
        m249:15,
        m240:19,

    },
    opticBonusByTerrain:[//how much the presence of an optic will positively impact a rifle's capabilities in the field, in various terrains. base values at long range determined by (magnification+(optic picture*.1)-optic weight. 
        1.2,//grassland with very little cover
        1,//rural with few buildings
        .9,//rural area with buildings
        .7,//vineyards/tall fields/farmland
        .3,//forest, dense
        .6,//industrial facility
        1.1,//airfield
        .8,//military base
        .4,//urban area with many houses
        .7,//highly developed city
        .5//rural with buildings and lots of forest
    ],

};
let environment ={
    timeZone:4,//time + or - UTC, used to calculate sunset/sunrise times which are in turn used to control the employment of troops, movements of supplies, and calculations for unit capabilities in real time, not sure if I will use this.
    startDate:time.GE_9_3_21_600.d0,//how many days including and after january 1st the simulation is to start
    startTime:time.GE_9_3_21_600.d0.h730,//the hour and minute the sim is supposed to start. Unsure if this is to be used.
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
                gLengthDBuffByTType:[//how much a gun's contribution to the fight will be negatively affected by it's TOTAL length in various terrains. The more instances of confined space combat there are in an environment, the more the length will be a detriment.
                    0,    // grassland with very little cover
                    .05,  // rural with few buildings
                    .15,  // rural with  buildings
                    .05,  // vineyards/tall fields/farmland
                    .05,  // forest, dense
                    .075, // industrial facility
                    .025,  // airfield
                    .06,  // military base
                    .2,   // urban area with many houses
                    .25,  // highly developed city
                    .075  // rural with buildings and lots of forest                
                ],
                gRangeByOpticNODAtNight:[//how much a weapons range will be set to at night time with various night vision optics
                    60,//naked eye
                    100,//gen 1 nods with IR illuminator. Night vision, but to other night vision users it is painfully obvious where you are.
                    200,//gen 2 nods without IR illuminators and with a clearer picture. Not quite as good as daytime but still much better than previous options
                    400//gen 3 nods, best non-thermal nods on the market.
                       //thermal nods are not on this list but are represented in the code. best possible option, able to see through fog and are a huge force multiplier.
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

export default {general,unitPower,environment,multipliers};
