import time from "./weather.js";
let general={
    refreshRate:1,//how many times per hour the sim will create a complete dataset. 1 will mean the sim will refresh at an hourly rate. 2 will be every 30 minutes. 3 will be every 20. etc.
    refreshNumber:0,//how many times the sim has refreshed. 
};
let environment ={
    timeZone:4,//time + or - UTC, used to calculate sunset/sunrise times which are in turn used to control the employment of troops, movements of supplies, and calculations for unit capabilities in real time, not sure if I will use this.
    startDate:time.GE_9_3_21_600.d0,//how many days including and after january 1st the simulation is to start
    startTime:time.GE_9_3_21_600.d0.h730,//the hour and minute the sim is supposed to start. Unsure if this is to be used.
    clearDayVis:6.21,//how far, in miles, the sim treat a perfect day's visibilty being. Sources of visibility must not factor in the position of the sun. This impacts effective ranges of most weapons. 
    bugsNoFactorTemp:50,//at what temperature (F) pesky bugs like mosquitos no longer function
    bugsLowFactorTemp:60,//at what temperature (F) mosquitos become noticeably less of a concern
};
let multipliers = {
    personnel:{
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
            },
            grenades:{
                gr_BBThrownYardBTerrain:[//how much every throwable yard under 50 decreases the grenade's power in various environments. This can also be considered a question of how much throwable distance is a factor.
                .5,    // grassland with very little cover
                .4,  // rural with few buildings
                .35,  // rural with  buildings
                .425,  // vineyards/tall fields/farmland
                .3,  // forest, dense
                .2, // industrial facility
                .6,  // airfield
                .425,  // military base
                .275,   // urban area with many houses
                .2,  // highly developed city
                .325  // rural with buildings and lots of forest                
                ],
                gr_BBLethalRadiusBTerrain:[//how much every yard of lethal radius increases a grenade's power by terrain type
                2,    // grassland with very little cover
                1.9,  // rural with few buildings
                1.85,  // rural with  buildings
                1.95,  // vineyards/tall fields/farmland
                1.8,  // forest, dense
                1.75, // industrial facility
                1.7,  // airfield
                1.7,  // military base
                1.8,   // urban area with many houses
                2.1,  // highly developed city
                1.9  // rural with buildings and lots of forest                
                ],
                gr_AVPBMMRHAPen:[//how much every mm of RHA pen ups a grenade's antivehicle points by terrain type. I am approaching this by asking myself how likely one would be able to get close enough to a vehicle to use one of these against it, particularly an armored vehicle. 
                .4,    // grassland with very little cover
                .45,  // rural with few buildings
                .6,  // rural with  buildings
                .55,  // vineyards/tall fields/farmland
                .9,  // forest, dense. Lots of cover for infantry and their munitions.
                .7, // industrial facility
                .35,  // airfield
                .375,  // military base
                .65,   // urban area with many houses
                1,  // highly developed city. Don't send your tanks into cities!!
                .95  // rural with buildings and lots of forest                
                ],
                gr_AVPBYardThrowable:.5,//how many anti-vehicle points each throwable yard will add, will only be factored if the grenade actually has a reasonable pen value
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
        },
        kit:{
            uniform:{
                mU_DBBHasNoBugProtect:.3,//if it is warm enough for bugs and the climate has bugs, this debuff will be applied to the morale of soldiers whose uniforms do not have bug treatment.
                mU_BBHasFLIRCamo:.2,
                mU_BBUIsClean:.5,
                mU_BBUIsLowWear:.75,
                mU_DBBHavingDesertUInWoodland:.5,
                mU_DBBHavingWoodlandInWinter:.15,     
                mU_DBBHavingModGearInColdWeather:.4,        
                mU_DBBHavingColdGearInModWeather:.2,
                mu_DBBHavingHotGearInColdWeather:.6,
                mU_DBBHavingColdGearInHotWeather:.55,
                mU_DBBHavingHotGearInModWeather:.3,
                mU_BBFlameResist:.1,
                pU_PBBHavingRightCamo:2.5,
                pU_PBBHavingAlmostRightCamo:1,
                pU_PBBHavingFLIRCamo:2,
            },
            vest:{
                mV_MoralePowerMultiplier:.5,//uses the power buffs for body armor level, multiplied by this to get the morale benefits
                pV_LevelI:2,//how much combat power each level of body armor adds
                pV_LevelIIA:2.5,
                pV_LevelII:3,
                pV_LevelIIIA:3.5,
                pV_LevelIII:4,
                pV_LevelIV:5,
                pV_BBHasSideProtection:1.15,//multiplier for having side armor
                mV_BBHavingRightCamo:1.5,//morale bonuses for having right or almost right camo
                pV_BBHavingRightCamo:1,
                pV_BBHavingAlmostRightCamo:.6,
                mV_BBHavingAlmostRightCamo:1.25,
                mV_QualityMultiplier:.7//morale multiplier for a vest's quality level, 5 is a great vest.
            },
            helmet:{
                mH_MoralePowerMultiplier:.7,
                pH_LevelI:1,
                pH_LevelIIA:2,
                pH_LevelII:2.5,
                pH_LevelIIIA:3,
                pH_LevelIII:3.25,
                pH_LevelIV:3.5,
                pH_BBHavingRightCamo:1,
                pH_BBHavingAlmostRightCamo:.8,
                mV_BBHavingRightCamo:.8,
                mV_BBHavingAlmostRightCamo:.6,
                mH_QualityMultiplier:.85
            },
            IFAK:{
                iM_BBHTieOffTQ:.2,
                iM_BBHCATorSWATTQ:.5,
                iM_BBHwPackGauze:.15,
                iM_BBHsCWA:.1,//chest wound seal
                iM_BBHnAK:.1,//nasopharyngeal airway
                iM_BBHPressDressAndBdg:.15,
                iM_BBHShears:.11,
                iM_BBHGloves:.08,
                iM_BBHBlanket:.08,
                iM_BBHLitter:.07,
                iM_BBHSplint:.05,
                iM_BBHMeds:.1,
                iM_BBHBBKit:.15,
                iM_BBHmTape:.1
            },
            backpack:{
                mB_BBHavingRightCamo:.75,
                mB_BBHavingAlmostRightCamo:.5,
                pB_BBHavingRightCamo:.5,
                pB_BBHavingAlmostRightCamo:.35,
                mB_QualityMultiplier:.3,
            },
            tent:{
                mT_BBHavingRightCamo:.2,
                mT_BBHavingAlmostRightCamo:.1,
            },
            sleepingBag:{
                mSB_BBHavingRightCamo:.2,
                mSB_BBHavingAlmostRightCamo:.1,
                mSB_QualityMultiplier:.1,
                mSB_CleanLevelMultiplier:.05,
                mSB_DBBWearLevel:.05,
                mSB_DBBTempBelowMin:.05
            }

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

export default {general,environment,multipliers,nationalities};
