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
                    .1,  // rural with few buildings .8
                    .125,  // rural with  buildings .9
                    .13,  // vineyards/tall fields/farmland 
                    .135,  // forest, dense 
                    .127, // industrial facility
                    .12,  // airfield
                    .13,  // military base
                    .135,   // urban area with many houses
                    .16,  // highly developed city
                    .135  // rural with buildings and lots of forest                
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
                    .01,  // forest, dense
                    .03, // industrial facility
                    .05,  // airfield
                    .045,  // military base
                    .03,   // urban area with many houses
                    .015,  // highly developed city
                    .01  // rural with buildings and lots of forest      
                ],
                gDBuffByLb:.15,//how much every lb of rifle weight is multiplied by to create a total to be subtracted from a weapon's combat effectiveness
                gLoudnessThreshold:165,//the sound decibels below which a gun will start gaining points for being quiet
                gBuffByLDb:.025,//how much every decibel less than the threshold will add to the soldier's combat effectiveness
                gRangeBuffByOpticMag:40,//how much the effective range is boosted by each x of magnification more than 1 of an optic
                gRangeBuffByOpticPic:1,//how much the effective range is boosted by each mm of sight picture
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
                APBBMOALowerThan5:2,//how much ever MOA lower than 5 will increase the weapon's antipersonnel points
                APLMGBBFireRate:.005,//how much each rpm will increase an LMG's antipersonnel points
                APBBRoundWeight:20,//how much every lb of round weight contributes to an LMG's suppressive qualities
                APBBMagSize:.015
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
                },
                APPointsByLbTnT:1,
                APPointsByYdRng:.05,
                softLaunchBuff:5,
                fireAndForgetBuff:3.5,
                smartMunitionBuff:10,
                AVPointsByMMPen:.2,
                AVPointsByYdRange:.05,
                APPointsDBBDecibel:.02,
                visionNoNodsOrOpticAtNight:100,
                visionNoNodsOrOpticDaytime:500,
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
                gr_APPBYardThrowable:.25
            },
            explosives:{
               expl_OFKOL:{
                name:"OFKOL",
                disc:"Russian HMX explosive",
                tntMult:1.7,
               },
               expl_CompB:{
                name:"Composition B",
                disc:"Western explosive mixture of RDX and TNT very popular from early ww2 to the 1950s, being replaced by IMX-101",
                tntMult:1.33,
               },
               expl_IMX101:{
                name:"IMX-101",
                disc:"insensitive high explosive composite mixture designed to replace TNT, starting in 2011 for artillery and large caliber munitions",
                tntMult:1,
               },   
               expl_CompH6:{
                name:"Composition H-6",
                disc:"castable western explosive notably used in underwater munitions",
                tntMult:1.35,
               },
               expl_ANFO:{
                name:"Ammonium Nitrate",
                disc:"crude fertilizer explosive",
                tntMult:.32,
               },
               expl_Octol:{
                name:"Octol",
                disc:"mix of HMX and TNT, used typically in shaped charges and other munitions, more expensive than comp b and cyclotol.",
                tntMult:1.54,
               },
            },
            rLSpecific:{
                softLaunchBBTerrain:[
                    0,//grassland or otherwise no cover
                    .03,//rural with few buildings
                    .05,//rural with buildings
                    .02,//vineyards/tall fields/farmland
                    .01,//forest,dense,
                    .055,//industrial facility
                    .05,//airfield
                    .06,//military base
                    .09,//urban area with many houses
                    .15,//highly developed city
                    .04//rural area with buildings and lots of forest
                ],
                warHeadTypePowerByTerrain:[
                    //[HEAT, HE, HE/Frag, pure kenetic]
                    [.9,1,1.1,.85],//grassland or otherwise no cover
                    [.95,1,1.05,.9],//rural with few buildings
                    [1.05,1.025,1.05,.95],//rural with buildings
                    [.95,1.025,1.05,.98],//vineyards//tall fields//farmland
                    [1,1.05,1.1,1],//forest, dense
                    [1.12,1.025,1.1,1],//industrial facility
                    [1,1.1,1.1,1],//airfield
                    [1.2,1.1,.95,1],//military base
                    [1.15,1.1,1.05,1],//urban area with many houses
                    [1.25,1.1,1.15,1],//highly developed city
                    [.98,1.005,1.1,.95],//rural area with buildings and lots of forest
                ],
                rLAAPBBYard:.25,
            }
        },
        experience:{
            hCEPHVariousCombatModes:[
                .8,//on the front in a dug in position, light contact against infantry
                .85,//on the front in a dug in position, light contact against infantry/artillery
                1,//on the front in a dug in position, contact against infantry
                .4,//on the front in a dug in position, contact against infantry with vehicle or artillery support
                .5,//on the front in a dug in position, under heavy attack
                .6,//defending against ambush or suprise attack
                .7,//on recon patrol, low risk
                .8,//on patrol, medium risk
                .9,//on patrol, high risk
                1,//attacking a position on foot,
                1,//attacking a position in a vehicle
            ],
            APPMBHourCombatExperience:.0003,
            AVPMBHourCombatExperience:.0004,
            AAPMBHourCombatExperience:.0005
        },
        health:{
            hoursSleepInPast48Buff:.075,
            hoursSinceLastRestDebuff:.1,//how much every hour over 14 since last rest will deduct from a soldier's morale, effectiveness and energy.
            recentShowerBuff:1,
            showerBuffDecay:48,//how many hours it takes for each buff to go from one to zero
            recentLaundryBuff:1,
            laundryBuffDecay:48,
            recentReserveBuff:1,
            reserveBuffDecay:96,
            recentMealBuff:4,
            mealBuffDecay:5,
            recentHotMealBuff:5,
            recentHotMealBuffDecay:12,
            recentWaterBuff:5,
            waterBuffDecay:1,
            sleepHoursCancelPercentRelaxing:.1,
            sleepHoursCancelPercentReserve:.125,
            weaponPointsDebuffByFatigue:.6

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
            },
            kitWeightMultWhenWet:1.05,
            kitWeightMultImpactByTerrain:[
                1,
                .95,
                .7,
                .95,
                .75,
                .2,
                .35,
                .15,
                .275,
                .2,
                .25
            ]
        },
        expenditures:{
            caloriesPerHour:[//stats for a 5'10 175lb 21 y/o male 
                    175.208,//basic metabolic rate
                    90.25,//sedentary, little to no exercise
                    103.416,//light activity
                    110.166,//moderate activity
                    116.583,//active,
                    131,//very active
                    142.916,//extremely active
            ],
            caloriesStressModifier:[
                1,//low stress, in reserve
                1.01,//low stress, near the front
                1.05,//moderate stress, on the front but relatively safe
                1.1,//stressed, under bombardment, feeling unsafe
                1.15,//stressed, under attack stationary,
                1.175,//heavy stress, intense defensive battle,
                1.185,//heavy stress, on the offensive
            ],
            kitImpactPerActivity:[
                .1,//low stress, in reserve
                .12,//low stress, near the front
                .15,//moderate stress, on the front but relatively safe
                .2,//stressed, under bombardment, feeling unsafe
                .3,//stressed, under attack stationary,
                .5,//heavy stress, intense defensive battle,
                1,//heavy stress, on the offensive
            ],
            caloriesAddedPerLbKit:8,
            galWaterPerHour:[//stats for a 5'10 175lb 21 y/o male 
            .028,//no activity
            .029,//sedentary
            .032,//light activity
            .033,//general activity
            .035,//moderate activity
            .039,//heavy activity
            .040,//extreme activity
            ],
            kitImpactByTerrain:[
                1,
                1.025,
                1.05,
                1.01,
                1.075,
                1.08,
                1,
                1.05,
                1.1,
                1.125,,
                1.025
            ],
            fatigueByActivity:[
                .045,//BMR
                .05,//sedentary, little to no exercise
                .075,//light activity
                .1,//moderate activity
                .15,//active
                .2,//very active
                .3,//extremely active
            ],
            gWPHTempAbove65:.0001,
            gWPHKit:.001,
            cPHTempOver70:.025,
        },
        willToFight:{
            capabilities:{
                competence:{
                    sustainability:.001,
                    sufficiency:.001,
                    skills:.002,
                    relevance:.004
                },
                quality:{
                    adaptability:.003,
                    education:.0025,
                    fitness:.03,
                    pyschTraits:.025,
                    resilience:.01,
                    socialSkills:.005,
                },
            },
            motivations:{
                desperation:.05,
                revenge:.01,
                ideology:.015,
                identity:{
                    organizational:.01,
                    personal:.015,
                    unit:.02,
                    state:.01,
                    social:.005,
                    societal:.011
                }
            },
        },
        sLeadership:{
            //these multipliers will be used to influence the output of offensive values in a squad based on the traits of their leader. Deviations from the set mean of each stat will add or subtract a multiplier of each category, summed up to create a 
            //total multiplier that impacts the entire squad's offensive firepower. Not all values are yet being accounted for and individual and leadership morale will probably be handled differently.
            presence:{
                milAndProfBearing:.001,
                fitness:.00025,
                confidence:.002,
                resilience:.001,
            },
            intellect:{
                mentalAgility:.002,
                judgement:.003,
                innovation:.004,
                tact:.002,
                expertise:.05
            },
            leads:{
                leadsOthers:.02,
                buildsTrust:.009,
                influence:.004,
                leadsByExample:.01,
                communicationSkills:.009
            },
            develops:{
                createsPositiveEnvironment:.007,
                preparesSelf:.006,
                devsOthers:.0098,
                stewardsProfession:.006,
            },
            expertisePerHourInCombat:.06,
            pointsBuffByHourInCombat:.00025,
            staticPointDebuffNoLeadership:-.3
        }
    },
    units:{
        squads:{
            leadershipValueWeights:{
                character:{
                    morality:10,
                    empathy:5,
                    ethos:5,
                    discipline:5
                },
                presence:{
                    bearing:10,
                    fitness:10,
                    confidence:10,
                    resilience:10,
                },
                intellect:{
                    mentalAgility:10,
                    judgment:10,
                    innovation:10,
                    interPersonalTact:10,
                    expertise:10,
                },
                competencies:{
                    leads:{
                        leadsOthers:10,
                        buildsTrust:10,
                        influence:10,
                        leadsByExample:10,
                        communicates:10,
                    },
                    develops:{
                        createsPositiveEnvironment:10,
                        preparesSelf:10,
                        devsOthers:10,
                        stewardsProfession:10
                    }
                },
                achieves:20
            }
        }
    }
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
};
let countries = {//profiles of countries and how they influence soldier's will to fight. Developed from a RAND Corp module
    USA:{
        state:{
            culture:{
                civMilRelations:{
                    appropriateness:4.5,
                    functionality:4.5,
                },
                integrity:{
                    trust:4,
                    corruption:.5,
                }
            },
            capabilities:{
                strategy:{
                    clarity:4,
                    effectiveness:4.5
                },
                support:{
                    sufficiency:4,
                    timeliness:4,
                },
                leadership:{
                    character:4.5,
                    confidence:3
                }
            },          
        },
        society:{
            culture:{
                Identity:{
                    ethnicity:1,
                    history:4,
                    ideology:5
                },
                Integrity:{
                    corruption:.5,
                    trust:4
                }
            },
            capabilities:{
                support:{
                    consistency:5,
                    efficiency:4.5
                }
            }
        }
    }
}

export default {general,environment,multipliers,nationalities,countries};
