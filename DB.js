
 /*
    Estimated 
 
 
    ////  DATA PROFILES //// 

            // VEHICLE TYPES //

                1: Tank
                2: IFV
                3: APC
                4: Scout vehicle
                5: Command Vehicle/Ambulance
                6: Cargo Truck, standard
                7: Cargo Truck, ammunition
                8: Cargo Truck, Fuel
                9: Light Vehicle
                10: Self Propelled Artillery
                11: Standalone SAM system
                12: Self Propelled Radar
                13: Self Propelled SAM Launcher
                14: Engineering vehicle

            // PROPOSED NEW VEHICLE TYPES //

                1: Tank
                2: IFV
                3: APC
                4: Scout vehicle
                5: troop transport truck
                6: //extra spaces for more types if they are needed
                7:
                8:
                9:
                10:
                11: cargo truck
                12: fuel truck
                13: water truck
                14: maintenance vehicle
                15: recovery vehicle
                16: combat earthmover
                17: 


            // WEATHER PROFILES //

                weather impacts a number of things on the battlefield for each side. The affects of weather on the battlefield should not be left unaccounted for.

                600_1:[                   time and date
                    presAlt:29.92         affects fixed wing takeoff distance, rate of climb and landing distance.
                    cloudCover:0-8        affects the operation of high altitude ISR assets, visual targeting of jet aircraft, visibility of missile launches, affectiveness of MANPADS, visibility of troops on the ground. 0 is clear, 8 is complete cover.
                    precip:0-4            affects the movements of ground units cross-country, the visibility of all parties except for radar systems, the operation of drones and especially helicopters.   
                    temp: number (c)      affects the water usage rate of personnel. 
                    vis:number (m)        affects visibility of drones, some ISR platforms, personnel, some vehicles, MANPADS, helicopters, CAS aircraft, artillery spotters and snipers. 
                    wind:[speed,dir]      affects the visiblity of 
                ]
            // VEHICLE DATA ORGANIZATIONS //

                An example vehicle, in this case a BMP-2, is shown below with a detailed layout breakdown. 

                        IFV_BMP2 : {                                                             Class name, prefix (Infantry Fighting Vehicle in this case) followed by technical type         
                        type:2,                                                               Type of vehicle it is, in this case 2 (IFV). Refer to previous list.
                        mass:15.8,                                                               Mass in Tons.
                        crew:2,                                                                     How many dedicated (non-infantry) crew members per vehicle. 
                        troopcapacity:7,                                                         How many troops the vehicle can carry internally
                        supplies:[2,2,1,1,1,3,3],                                             The quantity of supplies the vehicle carries for it's troops and crew. Ordered 545, 762, RPG-7 rounds, Grenades, underbarrel grenade launcher rounds, food, water(Gal)
                        vSupplies:[340,160,0,0,4,1000,0,0],                                      The quantity of supplies the vehicle carries for itself. Ordered AP(antipersonnel) autocannon rounds, AT (Anti Tank) autocannon rounds, AP tank rounds, AT tank rounds,
                                                                                                    ATGM rounds, Light Machine Gun Rounds, Heavy machine gun rounds, ultra heavy (not autocannon but close) machine gun rounds.
                        vSuppliesPerHourCombat:[160,30,0,0,2,50,0,0],                            supplies per hour in combat for that vehicle, following the order established above, when in combat 
                        vSuppliesPerHourOnFront:[15,3,0,0,.05,10,0,0],                              supplies per hour same as above but on the front
                        vSuppliesPerHourInReserve:[2,0,0,0,0,0,0,0],                             supplies per hour same as above but in reserve
                        vSuppliesPerHourPolicing:[1,0,0,0,0,2,0,0],                                 supplies per hour when policing
                        armorLevel:[2.8,3.8],                                                    the armor level of the vehicle, ordered hull, turret
                        fuelcap:122,                                                                how much fuel the vehicle carries in gallons
                        maxSpeed:[28,40],                                                        maximum speed in miles per hour cross country, on road
                        gunaccuracy:3,                                                              the accuracy of the main armament
                        reloadtime:1,                                                            the amount of time it takes to reload the main gun in seconds
                        reloadtimeATGM:40,                                                          the amount of time it takes to reload the ATGM in seconds
                        canreloadATGMunderFire:1,                                                whether or not it can reload it's ATGM while in combat
                        maxRange:[4000,1500,4400],                                                  the maximum range in yards of the vehicle's AP, AT, ATGM
                        power:[5,3.5],                                                           the power of the main weapon
                        hasflir:1,                                                                  whether the vehicle comes equipped with a FLIR camera
                        haslaser:0,                                                              whether the vehicle has a laser
                        hasTurretMG:0,                                                              whether the vehicle has an additional machine gun on the roof
                        TurretMGIsRemote:0,                                                      self explanatory
                        canFloat:0,                                                                 whether the vehicle is amphibeous
                        SA:4,                                                                    the situational awareness of the vehicle
                        profile:[2,.5],                                                             the profile of the vehicle heads on then dug in.
                        opRange:[310,370],                                                       how many miles the vehicle can travel in miles cross country, on road
                        fuelBurn:[.39,.32,.1],                                                      the vehicle's fuel burn rate for cross country, on road, and idle, per mile
                        catastrophicLossOnPen:.5,                                                the chance of the vehicle suffering a catastrophic explosion when penetrated by any round. Important because such an explosion will typically maim or kill all the crew.
                        urbanSurvivability:4.5,                                                     how well the vehicle fares in urban combat. Out of 5.
                },


            // PERSONNEL DATA ORGANIZATION //

                An example personnel profile, in this case a rifleman, is shown below with a detailed layout breakdown. 
                T_Rifleman:{
                    1:{                                                                             the type of vehicle the squad will be working with. 1 is truck or extreme light armor, 2 is an APC and 3 is an IFV. 
                        value:2.8,                                                              How valuable that troop is to a squad
                        primary:"W_AK74",                                                           the primary weapon of that trooper.
                        supplies:[210,0,0,4,0,3,.2],                                            The supplies the troop carries, ordered Ordered 545, 762, RPG-7 rounds, Grenades, underbarrel grenade launcher rounds, food, water(Gal)
                        suppliesPerHourCombat:[120,0,0,3,0,.04166,.16],                             supplies per hour in various scenarios, uses the format above
                        suppliesPerHourOnFront:[12,0,0,.015,0,.04166,.1458],
                        suppliesPerHourInReserve:[.3,0,0,0,0,.04166,.116],
                        suppliesPerHourPolicing:[2.4,0,0,.03,0,.04166,.135],
                        moraleImpactOutOfAction:-5,                                             what morale loss the squad will incur should the soldier be put out of action
                        effectivenessImpactOutOfAction:-5,                                          how much the effectiveness of the squad will suffer should the soldier be put out of action
                        cDI:[.2,.001,.0001,.001],                                               chance of debilitating injury without the squad's vehicle (per hour) in various scenarios ordered in combat, on front, in reserve and policing
                        cDIWV:[.2,.001,.0001,.001],                                                 chance of debilitating injury with the squad's vehicle
                        cD:[.05,.00025,.000025,.00025],                                         chance of outright and immediate death without the vehicle
                        cDWV:[.05,.00025,.000025,.00025],                                           chance of outright and immediate death with the vehicle
            },


            // SQUAD DATA ORGANIZATION //

                An example squad profile, in this case for a BTR-82 squad, is shown below with a detailed layout breakdown.
                
                SQ_BTR82Infantry:{
                    members:[2,1,1,1,1,1,3,0,0],                                           the number and composition of the members of the squad. %
                    vehicle:components.vehicles.APC_BTR82,                                      the vehicle the squad rides around in/crews. 
                    TroopCarriedSupplies:[1860,600,8,24,10,18,3.6],                        The number and composition of the squad's troop carried supplies. Replenished from the vehicles stores which in turn are replenished from external sources. 
                    vehicleCarriedSupplies:[6480,1760,6,20,20,28,20],                           ordered 545, 762, RPG, Grenade, GP25, rations, gallons of water
                    supplies:[8340,2360,14,44,30,46,23.6],
                    sPHC:[631,680,4.675,17.419,5.1,.416,1.6],                              the supplies used per hour in combat
                    sPHOF:[63.099,68,.467,1.159,.51,.416,1.458],                               supplies used per hour on the front
                    sPHIR:[1.576,1.7,.011,0,.137,.639,1.4],                                supplies used per hour in reserve
                    sPHP:[12.620,13.6,.093,.245,.102,.416,1.35]                                 supplies used per hour when policing
                },

    //// METHODOLOGIES ////

        this simulation's supply usage rates are partially based on factual sources but mostly based on numbers the author thought to be appropriate. An example of this ballpark estimation is the ammunition expidentures and casualty rates of infantrymen
        and how those rates are affected by the presence and type of a supporting squad vehicle. No hard data exists on the impacts of a squad having direct vehicle support but it seems logical that having or not having an APC supporting a squad in action
        would definitely have an impact on that squad's lethality and casualty rates. It can also engage at longer ranges than they can and thus have a dampening effect on the ammunition expidentures of said squad. This database and simulation attempts to account for those factors. 

        // WATER USAGE CALCULATIONS //

            base water usage calculation is 5.5 gallons per day, minimum is 3.5 gallons per day. This total is affected by the conditions in which the soldiers find themselves. As a standard the resulting value will be:
            110% when in combat = 3.85 per day or .16 per hour
            100% when on the front = 3.5 per day or .1458 per hour
            80% when in reserve = 2.8 per day or .116 per hour
            90% when policing = 3.15 per day or .135 per hour
            working with the minimum value as some water will be scrounged by troops on the ground
            
        // AMMUNITION USAGE CALCULATIONS //
     
           rounds usage calculation is somewhat arbitrary but is also affected by the vehicle the troop is assigned to. Better vehicles will have a heavier weight on the engagement and that means fewer rounds fired by the grunts. This is especially true for policing operations as the sight of a squad with a BMP-2 is much more intimidating to a civilian than a bunch of soldiers in an unarmored canvas-topped truck. Such a presence has the potential to make engagements never happen in the first place. 
           rounds used are 
           100% for trucks
           85% for BTRs
           75% for BMPs

           in terms of types of combat the rounds usage count is calculated 
            100% for when in combat
            10% when on the front    (5% for grenades)
            .25% when in reserve     (0% grenades)
            2% when policing         (1% for grenades)

            for death and injury calculations the following  debuffs will be present:
                Weapons
                    0% for AK74 primary
                    10% for PKM primary
                    25% for SVD primary
                    5% for being issued an underbarrel grenade launcher
                    7% for being issued an RPG as a secondary
                    1% for every grenade over 2
                    2% for every 30 rounds issued over 90 for a soldier equipped with an AK74m

                Transportation
                    0% for being assigned to a truck squad
                    15% for being assigned to a BTR squad
                    25% for being assigned to a BMP squad
                    -10% (a real debuff as it makes them more likely to die) for being assigned any vehicle but not actually having it.

                baseline debilitating injury chance stats are:
                    15% per hour when in combat 
                    0.25% per hour when on the front
                    0.05% when in reserve  
                    0.1% when policing
                
                baseline death chance stats are:
                    7.5% chance per hour when in combat
                    0.125% per hour when on the front
                    0.025% per hour when in reserve
                    0.05% per hour when policing

                
                


*/
const testItems={
    components:{
        vehicles:{
            MBT_T72B3 : {
                disc:"Test of a possible new system for modeling armored vehicle stats",
                type:1,//tank 
                isCombatVehicle:1,
                mass:45,//tons
                crew:3,//how many it takes to perform the vehicle's function. Different than troop capacity, or for IFVs, carried squad size.
                //primaryWeapon:vComponents.cannons.c_24A6M5,
                //ATGM:vComponents.atgm.atgm_9M119,
                priWeapSup:[20,10,9,6],//APFSDS, HEAT, HE, ATGM. More generally can be used as pure Anti-Tank, multipurpose, HE/frag, ATGM
                priWeapSPH:[0,0,0,0],
                //coax:vComponents.mg.mg_PKT,
                coaxWeapSup:[0,2000,0,0],//machine gun rounds carried, considered pure anti-tank, multipurpose, HE/frag, ATGM. For almost all vehicles this will just be multipurpose but I am including this for futureproofing in case vehicles like the BMP-3 get added. 
                coaxWeapSPH:[0,0,0,0],
                //tertiaryWeapon:vComponents.hmg.hmg_NSV,
                tertiaryWeapSup:[300],
                tertiaryWeapSPH:[0],
                //FCS:vComponents.FCS.s_1A40_4,
                hasSmokeScreen:1,//can it produce a smoke screen? may be too simplistic, possible update later
                hullArmor:[950,440,500],//against HEAT, KE, shaped charges. when dug in only the stats for the turret will be used.
                turretArmor:[950,440,500],
                supplies:[1,0,0,0,0,2,3],
                fuelcap:320,//how much fuel can be carried in gallons.
                maxSpeed:[23.75,28.5],//max speed in mph, both offroad and on-road.
                reloadtime:6.5,//reload time in seconds, in this case for the autoloader.
                reloadtimeManual:10,
                maxRange:[4500,3000,4374],
                canFloat:1,
                profile:86.167,//maybe too subjective
                catastrophicLossOnPen:.75,
                fuelBurn:[1.71,1.04,.5],//good as-is
                opRange:[162,270],//good as-is  
            },           
        },
        weapons:{

        }
    },


} ;
const vComponents={
    cannons:{
        c_24A6M5:{
            rpm:8,//rounds per minute in optimal conditions
            rpm_m:2,//rounds per minute, loaded manually (assuming the tank is an autoloader and manual loading is secondary, if man is pri, rpm will always be used)
            barrelLife:1200,//rounds
            maxRangeAntiTank:9842,//feet
        }
    },
    autoCannons:{

    },
    atgm:{
        atgm_9M119:{
            name:"9M119 'Svir' (AT-11 'sniper') laser guided, beam riding ATGM fired from the main gun of T-72s",
            range:13123,//max range in feet
            pen:750//mm of RHA it will pen
        }
    },
    mg:{
        mg_PKT:{
            name:"7.62mm coaxial machine gun often used as a coaxial machine gun on tanks",
            caliber:1,
            guidance:3,
            range:4921,
        }
    },
    hmg:{
        hmg_NSV:{
            name:"12.5mm heavy machine gun often seen as an aa-mount on tanks like the T-72B",
            caliber:2,//1 is rifle type ammo, 2 is roughly 50, 3 is above 50 (like 14.5mm)
            guidance:0,//0 is manual with exposed operator, 1 is manual with operator in a semi-exposed turret, 2 is with remote turret (think CROWS), 3 is directly slaved to the main gun or just is the primary armament
            range:4921,
        }
    },
    ERA:{
        era_kontakt_5:{

        }
    },
    FCS:{
        s_1A40_4:{
            name:"the 1A40-4 FCS is a modern, computerized FCS with thermal, ir and day sights, stabilization and gyrocompasses, most notably used on the T-72B3 tank",
            gOptics:3,//0 is iron sights, 1 is day sights only, 2 is day sights with floodlight IR NVGs, 3 is day sights+thermal night sights.
            cOptics:3,
            stabilized:1,
            range:[16404,3280]//day, night affective sight ranges
        }        
    },
    optics:{
    },
    communications:{
    },
    navSys:{

    },
    SASys:{

    },
    commSys:{
        radio:{
            r_R173:{
                name:"R-173, standard analog VHF radio for russian tanks",
                signalRange:12,//miles
                freqRangeMin:30,//minimum frequency
                freqRangeMax:79.9,//maximum frequency
                secure:0//can radio transmissions be encrypted?
            },
            r_R168_25VE:{
                name:"R-168-25VE tactical vehicle-mounted VHF radio",
                signalRange:21,
                freqRangeMin:30,
                freqRangeMax:107,
                secure:1
            }
        },
    },
    Ammunition:{
        cannon:{
            c_3VBM23:{
                name:"Svinets-2, used in the 24A6M5 gun for the T-72B3, among others",
                type:1,//1 is APFSDS, 2 is HEAT, 3 is HE
                weight:24.25,//projectile weight, pounds
                pen:500,//mm RHA at max range, being a little generous here.
                range:9842
            },
            c_125mmHE:{
                name:"generic HE round used by the 24A6 gun, specs from the T-72B3's 2A46M5 gun",
                type:3,//1 is APFSDS, 2 is HEAT, 3 is HE
                weight:72.75,//round weight, pounds
                pen:250,//big guess as it's not listed anywhere. APFSDS is obv preferred.
                range:16404
            },
            c_3VBK27:{
                name:"start, a HEAT round used in the T-72B3, among others",
                type:2,
                weight:44.13,
                pen:500,
                range:9842
            }
        },
        autocannon:{

        },
        atgm:{
            m_9K120:{
                name:"Svir, an ATGM launched from the main gun barrel of T-72 series tanks",
                guidance:1,//1 is laser
                range:13123,
                weight:61.72//this is almost certainly wrong and just the weight of the warhead
            }
        },
        hmg:{
        },
        artyshell:{

        },
        artyrocket:{

        }


    }


};
const tComponents={//30 round 7.62 mag weighs 1.99 lbs
    weapons:{
        rifle:{
            //assault rifles
            W_AK47:{
                name:"AK-47 assault rifle",
                weight:9.69,
                length:35,
                bLength:16.3,
                caliber:"7.62x39mm",
                eRange:383,
                report:140
            },
            W_AKM:{
                name:"AKM assault rifle",
                weight:9.27,
                length:34.6,
                bLength:16.3,
                caliber:"7.62x39mm",
                eRange:383,
                report:140
            },
            W_AKMS:{
                name:"AKMS assault rifle with folding stock",
                weight:9.69,
                length:25.8,
                bLength:16.3,
                caliber:"7.62x39mm",
                eRange:383,
                report:140
            },
            W_AK103:{
                name:"AK-103 modernized assault rifle",
                weight:9.89,
                length:27.8,
                bLength:16.3,
                caliber:"7.62x39mm",
                eRange:550,
                report:140
            },
            W_AK74:{
                name:"AK-74 assault rifle",
                weight:7.31,//pounds, with loaded mag
                length:37.1,//inches, tip to butt (hehe)
                bLength:16.3,//barrel length, inches
                caliber:"5.45x39mm",
                eRange:550,//effective range, yards, point target.
                report:140
            },
            W_AK74M:{
                name:"AK-74M assault rifle",
                weight:8.01,
                length:27.6,//though the length is technically the same as the vanilla AK-74 with the stock extended, when needed the folded stock means the gun can be much shorter, so the folded length is used here.
                bLength:16.3,
                caliber:"5.45x39mm",
                eRange:575,
                report:140
            },
            W_AK74Z:{
                name:"AK-74M assault rifle with Zenitco upfit for receiving foregrips and laser mods",
                weight:9.31,
                length:27.6,
                bLength:16.3,
                caliber:"5.45x39mm",
                eRange:575,
                report:140
            },
            W_AK12:{
                name:"AK-12 assault rifle",
                weight:9.71,
                length:27.1,
                bLength:16.3,
                caliber:"5.45x39mm",
                eRange:481,
                report:140
            },
            W_M4A1:{
                name:"M4A1 assault rifle",
                weight:7.75,
                length:29.75,
                bLength:14.5,
                caliber:"5.56x45mm",
                eRange:550,
                report:160                
            },
            W_HKG3:{
                name:"H&K G3 assault rifle",
                weight:10,
                length:40.4,
                bLength:17.7,
                caliber:"7.62x51mm",
                eRange:437,//presuming no optic
                report:164                
            },
            W_HK33A3:{
                name:"H&K 33A3 assault rifle",
                weight:10,
                length:37,
                bLength:13.1,
                caliber:"5.56x45mm",
                eRange:437,//presuming no optic
                report:160                
            },
            //carbines
            W_AK74SU:{
                name:"AK-74SU",
                weight:7.99,
                length:19.3,
                bLength:8.1,
                caliber:"5.45x39mm",
                eRange:380,
                report:143
            },

            //machine guns
            W_PK:{
                name:"PK medium machine gun",
                weight:23.84,
                length:47.4,
                bLength:23.8,
                caliber:"7.62x54mmr",
                eRange:1094,
                report:150
            },
            W_M240B:{
                name:"M240B GPMG",
                weight:29,
                length:49.7,
                bLength:21.7,
                caliber:"7.62x51mm",
                eRange:1200,
                report:160
            },
            W_M240G:{
                name:"M240G GPMG",
                weight:27,
                length:49.7,
                bLength:21.7,
                caliber:"7.62x51mm",
                eRange:1200,
                report:160
            },
            W_M249:{
                name:"M249 SAW",
                weight:22,
                length:40.75,
                bLength:21,
                caliber:"5.56x45mm",
                eRange:866,
                report:160
            },
            W_FN_Minimi:{
                name:"FN Minimi SAW",
                weight:19.7,
                length:40.9,
                bLength:18.3,
                caliber:"5.56x45mm",
                eRange:866,
                report:160
            },
            W_IWI_Negev_NG5:{
                name:"IWI Negev SAW",
                weight:19,
                length:31.889,
                bLength:18,
                caliber:"5.56x45mm",
                eRange:874,
                report:158
            },
            W_PKP:{
                name:"PKP medium machine gun",
                weight:22,//no bipod
                length:47,
                bLength:25.9,
                caliber:"7.62x54mmr",
                eRange:1640,
                report:149
            },
            W_RPK:{
                name:"RPK light machine gun",
                weight:14.79,//with 75 round mag
                length:40.9,
                bLength:23.2,
                caliber:"7.62x39mm",
                eRange:1093,
                report:143//guess, slightly reducing it's report because it has a longer barrel than the AK-47            
            },
            W_RPKS:{
                name:"RPKS light machine gun with folding stock",
                weight:15.19,//with 75 round mag
                length:32.3,
                bLength:23.2,
                caliber:"7.62x39mm",
                eRange:1093,
                report:143//guess, slightly reducing it's report because it has a longer barrel than the AK-47            
            },
            W_RPK74:{
                name:"RPK-74 light machine gun",
                weight:12,//pounds, with loaded 45 round mag, according to my guess.
                length:41.7,//inches, tip to butt (hehe)
                bLength:23.2,//barrel length, inches
                caliber:"5.45x39mm",
                eRange:850,//effective range, yards, point target.,
                report:138
            },
            W_RPKS74:{
                name:"RPK-74 light machine gun with folding stock",
                weight:12.7,//pounds, with loaded 45 round mag, according to my guess.
                length:33.3,//inches, tip to butt (hehe)
                bLength:23.2,//barrel length, inches
                caliber:"5.45x39mm",
                eRange:850,//effective range, yards, point target.,
                report:138
            },
            W_RPK74M:{
                name:"RPK-74M modernized light machine gun with picatinny rails and a folding stock",
                weight:12.7,//pounds, with loaded 45 round mag, according to my guess.
                length:33.3,//inches, tip to butt (hehe)
                bLength:23.2,//barrel length, inches
                caliber:"5.45x39mm",
                eRange:860,//effective range, yards, point target.,
                report:138
            },
            W_RPK16:{
                name:"RPK-16 modern light machine gun with scope mount and folding stock",
                weight:13.23,
                length:33.3,
                bLength:21.7,
                caliber:"5.45x39mm",
                eRange:870,
                report:137
            },

            //DMR
            W_SKS:{
                name:"SKS semi-automatic rifle",
                weight:8.5,
                length:40,
                bLength:20,
                caliber:"7.62x39mm",
                eRange:440,//this is presuming someone actually put an optic on it
                report:145
            },
            W_M14:{
                name:"M14 semi automatic rifle",
                weight:10.7,
                length:44.3,
                bLength:22,
                caliber:"7.62x51mm",
                eRange:500,//presuming no optic
                report:164                
            },
            W_SVD:{
                name:"SVD DMR",
                weight:9.25,//this is a guesstimate. Wikipedia stats say it weighs 9.48 with a scope and an unloaded mag. Reference weight I need is scopeless w/loaded mag..
                length:48.2,
                bLength:24.4,
                caliber:"7.62x54mmr",
                eRange:875,
                report:150//guess, I know that it's a big, very loud round
            },
            W_SVDM:{
                name:"SVD-M modernized DMR",
                weight:11,
                length:34.4,
                bLength:21.7,
                caliber:"7.62x54mmr",
                eRange:875,
                report:151
            },
            W_M110SASS:{
                name:"M110 Semi Automatic Sniper System",
                weight:15,
                length:40.51,
                bLength:20,
                caliber:"7.62x51mm",
                eRange:875,
                report:162
            },
            W_M110A1:{
                name:"M110 Compact Semi Automatic Sniper System",
                weight:10,
                length:35.39,
                bLength:16.3,
                caliber:"7.62x51mm",
                eRange:875,
                report:165
            },
            W_M2010ESR:{
                name:"M2010 Enhanced Sniper Rifle",
                weight:14,
                length:46.5,
                bLength:24,
                caliber:".300",
                eRange:1312,
                report:160
            },
            W_RMSR:{
                name:"Remington Modular Sniper Rifle",
                weight:15,
                length:36,
                bLength:20,
                caliber:".338 lapua magnum",
                eRange:1312,
                report:160
            }, 
            
            //snipers
            W_M1891_30_S:{
                name:"M-1891/30 soviet Optics Ready rifle",
                weight:8.8,
                length:48.8,
                bLength:29,
                caliber:"7.62x54mmr",
                eRange:900,//this is presuming someone actually put an optic on it
                report:150
            },
            W_SV98:{
                name:"SV-98 sniper rifle",
                weight:12.8,
                length:47.24,
                bLength:25.59,
                caliber:"7.62x54mmr",
                eRange:1094,//this is presuming someone actually put an optic on it
                report:150
            },
            W_R700:{
                name:"Remington 700 sniper rifle",
                weight:9.5,
                length:41.5,
                bLength:26,
                caliber:"7.62x51mm",
                eRange:700,//this is presuming someone actually put an optic on it
                report:160
            },
            W_AWM:{
                name:"Accuracy International Arctic Warfare sniper rifle",
                weight:15,
                length:46.5,
                bLength:26,
                caliber:"7.62x51mm",
                eRange:870,//this is presuming someone actually put an optic on it
                report:160
            },
            W_M82:{
                name:"Barret M82",
                weight:32.7,
                length:57,
                bLength:29,
                caliber:"12.7mm",
                eRange:1969,//0_0\\
                report:165
            },
            W_S_TRG:{
                name:"Sako TRG sniper rifle",
                weight:12.5,
                length:45.28,
                bLength:25.98,
                caliber:"7.62x51mm",
                eRange:875,//0_0\\
                report:162.75
            },
            W_M24A1:{
                name:"M24 sniper rifle",
                weight:14,
                length:43,
                bLength:24,
                caliber:"7.62x51mm",
                eRange:875,//0_0\\
                report:163
            },
            W_BT_APR308:{
                name:"B&T APR",
                weight:16.5,
                length:44.8,
                bLength:24,
                caliber:"7.62x51mm",
                eRange:1094,
                report:163
            },
            W_VSSM:{
                name:"VSSM light sniper rifle",
                weight:6.5,
                length:24.2,
                bLength:7.9,
                caliber:"9x39mm",
                eRange:464,
                report:130
            },
            W_ASVAL:{
                name:"VSSM light sniper rifle",
                weight:6.25,
                length:24.2,
                bLength:7.9,
                caliber:"9x39mm",
                eRange:464,
                report:130
            },
            W_ZM93_BA:{
                name:"Zastava M93 Black Arrow sniper rifle",
                weight:40,
                length:65.748,
                bLength:39.37,
                caliber:"12.7mm",
                eRange:3280,//bruhhhhh
                report:165
            },
            W_MMTAC50:{
                name:"McMillan TAC-50 sniper rifle",
                weight:30,
                length:57,
                bLength:29,
                caliber:".50",
                eRange:1970,
                report:165
            },
            

            //sub machine guns
            W_MPSD:{
                name:"H&K MP5SD suppressed submachine gun",
                weight:7,
                length:27,
                bLength:8.9,
                caliber:"9x19mm",
                eRange:218,
                report:130
            },            
        },
        MG:{
            W_DSHK:{

            },
            W_NSV:{

            },
            W_PK:{

            },
            W_PKP:{

            },
            W_KORD:{
    
            },
        },
        pistol:{

        },
        uBGL:{
            W_GP25:{
                name:"GP-25 Kostyor",
                disc:"'Bonfire' underbarrel grenade launcher for AK pattern rifles",
                weight:3.31,
                eRange:430,
            },
            W_GP30:{
                name:"GP-30 Obuvka",
                disc:"'Footwear' underbarrel grenade launcher for AK pattern rifles",
                weight:2.9,
                eRange:435,                
            },
            W_GP34:{
                name:"GP-34",
                disc:"latest Russian issue underbarrel grenade launcher for AK pattern rifles",
                weight:3.1,
                eRange:440,                
            },
        },
        RL:{
            RL_M72A7:{
                name:"M72A7 Light Antitank Weapon",
                disc:"Light, general purpose single-shot rocket launcher for use against light vehicles and structures",
                isSingleShot:1,
                weight:7.9,//lbs
                warheadWeight:2,//lbs explosive (estimated for the LAW)
                pen:150,//mm rha    
                eRange:240//yards
            },
            RL_M3MAAWS:{
                name:"Carl Gustaf M3 recoilless rifle",
                disc:"multipurpose reloadable recoilless rifle with a vast variety of available rounds",
                isSingleShot:0,
                weight:22,
                warheadWeight:6.5,
                pen:500,    
                eRange:546//yards
            },
            FGM148:{
                name:"FGM-148 Javelin heavy antitank guided missile launcher",
                disc:"reloadable top-attack advanced ATGML",
                isSingleShot:0,
                weight:14,
                warheadWeight:35,
                pen:760,    
                eRange:4374//yards
            },
            RPG26:{
                name:"RPG-26 Aglen",
                disc:"light single shot anti-tank rocket launcher",
                isSingleShot:1,
                weight:6.4,
                warheadWeight:4,
                pen:440,    
                eRange:273.4//yards
            },
            RPG26:{
                name:"RPG-26 Aglen",
                disc:"light single shot anti-tank rocket launcher",
                isSingleShot:1,
                weight:6.4,
                warheadWeight:4,
                pen:440,    
                eRange:273.4//yards
            },
            RPG7V2:{
                name:"RPG-7V2 rocket launcher",
                disc:"extremely common rocket launcher with a variety of warheads",
                isSingleShot:0,
                weight:15.4,
                warheadWeight:10,
                pen:550,    
                eRange:360//yards
            },
            RPG22:{
                name:"RPG-22 Netto",
                disc:"extremely common rocket launcher with a variety of warheads",
                isSingleShot:0,
                weight:4.172,
                warheadWeight:2,
                pen:400,    
                eRange:218.72//yards
            },
            AT4HEAT:{
                name:"AT4 HEAT single shot rocket launcher",
                disc:"",
                isSingleShot:1,
                weight:13,
                warheadWeight:.97,
                pen:450,    
                eRange:328//yards
            },
            M141BDM:{
                name:"M141 Bunker Defeat Munition",
                disc:"disposable, single-shot shoulder-fired rocket launcher designed to defeat hardened structures",
                isSingleShot:1,
                weight:13.7,
                warheadWeight:2,
                pen:500,    
                eRange:1093//yards
            },

        },
        fGren:{
            W_RGD5:{

            },
            W_F1:{

            }
        },
        sGren:{

        },

        MANPAD:{
            W_SA18:{

            },            
        }
    },
    optics:{
        //magnifiying scopes
        o_1P78:{
            name:"1P78-1 Kashtan",//the text name of the scope
            disc:"standard modernized rifle scope of the russian military, optimized for AK-74 pattern rifles",
            mag:2.8,//magnification x
            obj:25,//objective diameter, mm
            weight:1.1,//weight, pounds, with mount if applicable and possible
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR
        },
        o_PSO1:{
            name:"PSO-1 ",//the text name of the scope
            disc:"Zenit standard modernized rifle scope of the russian military, optimized for AK-74 pattern rifles",
            mag:4,//magnification x
            obj:24,//objective diameter, mm
            weight:1.55,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR
        },
        o_1PN51:{
            name:"1PN51",//the text name of the scope
            disc:"Soviet passive NV scope for AK pattern rifles",
            mag:3.46,//magnification x
            obj:25,//objective diameter, mm
            weight:4.629,//weight, pounds.
            NVG:2,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR
        },        
        o_PiladePV:{
            name:"KOM Pilade PV",//the text name of the scope
            disc:"modern high magnification rusian scope for AK, SVD, SKS and Mosin rifles",
            mag:7,//magnification x
            obj:25,//objective diameter, mm
            weight:3,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR
        },
        o_Pilade10x:{
            name:"KOM Pilade 10x",//the text name of the scope
            disc:"modern high magnification rusian scope for SVD, Mosin rifles",
            mag:10,//magnification x
            obj:42,//objective diameter, mm
            weight:2,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR
        },
        o_PSO_Tgr:{
            name:"PSO Tigr",//the text name of the scope
            disc:"Russian modern PSO high magnification scope for AK, SVD",
            mag:9,//magnification x
            obj:24,//this is a guess
            weight:1.5,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR            
        },
        o_NSXDM:{
            name:"NS-XDM",//the text name of the scope
            disc:"Russian Gen 1 night vision rifle scope w/ IR illuminator",
            mag:2.5,//magnification x
            obj:30,//this is a guess
            weight:2.1,//weight, pounds.
            NVG:1,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR
        },
        o_TA31RCO_ACOG:{
            name:"ACOG",//the text name of the scope
            disc:"ubiquitous magnified day sight for 5.56 rifles",
            mag:4,//magnification x
            obj:32,//this is a guess
            weight:.656,//weight, pounds.
            NVG:1,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        

        //red dots
        o_1S03:{
            name:"Kobra 1S-03",//the text name of the scope
            disc:"modern russian standard red-dot-type sight for AK and SVD pattern rifles",
            mag:1,//magnification x
            obj:32,//objective diameter, mm
            weight:.9,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR
        },
        o_PK01VS:{
            name:"PK-01 VS",//the text name of the scope
            disc:"modern russian standard red-dot-type sight for AK and SVD pattern rifles",
            mag:1,//magnification x
            obj:30,//objective diameter, mm
            weight:1,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR            
        },
        o_PKAS:{
            name:"Zenit PK-AS",//the text name of the scope
            disc:"Advanced variant of the PKS-01 red dot, for AK,SKS and SVD pattern rifles",
            mag:1,//magnification x
            obj:40,//objective diameter, mm
            weight:1,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR            
        },
        o_CompM4:{
            name:"Aimpoint CompM4",//the text name of the scope
            disc:"modern american red dot rifle optic for picatinny rails",
            mag:1,//magnification x
            obj:40,//this is a guess
            weight:.737,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_MARS:{
            name:"ITL Multi purpose Aiming Reflex Sight",//the text name of the scope
            disc:"modern american red dot rifle optic for picatinny rails, with a combined red dot and laser sight",
            mag:1.2,//IRL it is 1 but the incorporated IR laser should be factored
            obj:25,
            weight:.95,//weight, pounds.
            NVG:10,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        }
    },
    suppressors:{
        s_PBS1:{
            name:"PBS-1",
            disc:"Rifle suppressor for AK-47 pattern rifles",
            length:7.9,
            weight:1,
            reportReduction:15//db that the gunshot will be with the suppressor fitted
        },
        s_PBS4:{
            name:"PBS-4",
            disc:"Rifle suppressor for AK-74 pattern rifles",
            length:7.9,//length and width copied from the PBS-1 due to lack of data
            weight:1,
            reportReduction:15//db reduction
        }
    },
    foreGrips:{
        fg_S1:{
            name:"S1 Bipod",
            disc:"Soviet bipod for SVD rifles, not to be confused with the ones on the SVDM's one. Fairly rudimentary, likely proprietary to the SVD",
            type:4,//1 is dong style, 2 is mid grip, 3 is full grip, 4 is bipod, 5 is combined bipod full grip
            weight:1.28,         
        },
        fg_Zhuk2:{
            name:"Zenitco Zhuk-2 Bipod",
            disc:"aftermarket adjustable bipod for rifles with Zenitco furniture",
            type:4,
            weight:.573,
        },
        fg_RPKBipod:{
            name:"RPK bipod",
            disc:"standard issue bipod that comes with the RPK",
            type:4,//1 is dong style, 2 is mid grip, 3 is full grip, 4 is bipod, 5 is combined bipod full grip
            weight:0,              
        },
        fg_RK2L:{
            name:"Zenitco RK-2L front grip",
            disc:"full length foregrip compatible with combloc rifles that have Zenitco furniture",
            type:3,//1 is dong style, 2 is mid grip, 3 is full grip, 4 is bipod, 5 is combined bipod full grip
            weight:.31,         
        },
        fg_RK0L:{
            name:"Zenitco RK-0L front grip",
            disc:"mini foregrip compatible with combloc rifles that have Zenitco furniture",
            type:2,//1 is dong style, 2 is mid grip, 3 is full grip, 4 is bipod, 5 is combined bipod full grip
            weight:.176,         
        },
        fg_RK6:{
            name:"Zenitco RK-6 front grip",
            disc:"dong style foregrip compatible with rifles that have picatinny rails",
            type:1,//1 is dong style, 2 is mid grip, 3 is full grip, 4 is bipod, 5 is combined bipod full grip
            weight:.22,         
        },
        fg_MPFG:{
            name:"ASKPAK mini forward grip",
            disc:"russian aftermarket foregrip for rifles with Picatinny rails",
            type:2,//1 is dong style, 2 is mid grip, 3 is full grip, 4 is bipod, 5 is combined bipod full grip
            weight:.11,         
        },
        fg_dong:{
            name:"wooden dong grip",
            disc:"aftermarket swap-out wooden dong grip for AK-pattern rifles",
            type:1,//1 is dong style, 2 is mid grip, 3 is full grip, 4 is bipod, 5 is combined bipod full grip
            weight:.022,    
        },
        fg_PKP_Bipod:{
            name:"PKP bipod",
            disc:"standard bipod for the PKP",
            type:4,//1 is dong style, 2 is mid grip, 3 is full grip, 4 is bipod, 5 is combined bipod full grip
            weight:1,    
        }
    },
    railAccessories:{
        ra_Klesch1L:{
            name:"Klesh-1+Laser ",
            disc:"Russian rail mounted combined white flashlight and conventional laser",
            features:[1,1,0,0],//the capabilities of the attachment, ordered conventional light, conventional laser, IR light, IR laser
            weight:.35,         
        },
        ra_Perst2:{
            name:"PERST-2 combined IR/visual laser/flashlight ",
            disc:"advanced combined lighting device for mounting on zenitco or picatinny rails",
            features:[1,1,1,1],
            weight:.771,         
        },
        ra_ANPEQ2:{
            name:"AN/PEQ-2 combined IR laser/flashlight ",
            disc:"common issue IR lighting device for western militaries",
            features:[0,0,1,1],
            weight:.6,         
        },

    },
    vests:{
        v_6B45L:{
            name:"Russian 6B45 vest, light variant. Used by specops, tankers, snipers, officers and medics in the RGF and AGF. Info sourced from armyrecognition", 
            NIJ:"II",
            mass:12,//made up, no known spec
        },
        v_6B45M:{
            name:"Russian 6B45 vest, medium variant. used by all types of frontline troops in the RGF and AGF. Info sourced from armyrecognition", 
            NIJ:"III",
            mass:16.5
        },
        v_6B45H:{
            name:"Russian 6B45 vest, light variant. Used by specops, tankers, snipers, officers and medics in the RGF and AGF. Info sourced from armyrecognition", 
            NIJ:"IV",
            mass:33,
        },
        v_6B517:{
            name:"Russian 6B5-17 vest produced in 1991 and used by KGB and FSB operatives in Chechnya and Yugoslavia", 
            NIJ:"III",
            mass:26,
        },
        v_Defender2:{
            name:"FORT DEFENDER-2 vest ", 
            NIJ:"III",
            mass:26.45,
        },

    },
    helmets:{
        h_6B47:{
            name:"6B47 combat helmet, standard helmet for the RGF and AGF",
            NIJ:"IIA",
            mass:2.64,
        }
    },
    helmetOptics:{
        o_1PN138:{
            name:"1PN138 night vision monocle, part of the russian Ratnik system",
            type:2,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR
            mag:1,
            lType:1,//1 is monocle, 2 is binoc, etc. 
            gen:2,
            eDist:240//yards, gotten from alibaba..made in china..just guessing here.
        },
        o_1PN139:{
            name:"1PN139 thermal night vision monocle, part of the russian Ratnik system",
            mag:1,
            type:4,
            lType:1,//1 is monocle, 2 is binoc, etc. 
            gen:3,
            eDist:240//yards, gotten from alibaba..made in china..just guessing here.
        },
        o_1PN140:{
            name:"1PN140 thermal night vision monocle, part of the russian Ratnik system",
            mag:1,
            type:4,
            lType:1,//1 is monocle, 2 is binoc, etc. 
            gen:3,//really just guessing here
            eDist:260//I have no idea
        },
        o_1PN140:{
            name:"1PN141 night vision monocle, part of the russian Ratnik system",
            mag:1,
            type:2,
            lType:1,//1 is monocle, 2 is binoc, etc. 
            gen:3,//really just guessing here
            eDist:260//I have no idea
        },
        o_NVMT2X24:{
            name:"Sibir NVMT 2x24 Gen 1 NVM",//the text name of the scope
            mag:2,
            type:1,
            lType:1,//1 is monocle, 2 is binoc, etc. 
            gen:1,//really just guessing here
            eDist:260//I have no idea
        },
        o_BPCVRClassic:{
            name:"BPC VR Veber Classic conventional binoculars",//the text name of the scope
            mag:16,
            type:0,
            lType:2,//1 is monocle, 2 is binoc, etc. 
            gen:1,//really just guessing here
            eDist:260//I have no idea
        },
        o_BPCVROmega:{
            name:"BPC Veber Omega conventional binoculars",//the text name of the scope
            mag:16,
            type:0,
            lType:2,//1 is monocle, 2 is binoc, etc. 
            gen:1,//really just guessing here
            eDist:260//I have no idea
        },
        o_ANPVS14:{
            name:"AN/PVS-14 3rd gen NVM",//the text name of the scope
            mag:1,
            type:3,
            lType:1,//1 is monocle, 2 is binoc, etc. 
            gen:3,//really just guessing here
            eDist:328//I have no idea
        },
        o_ANPVS7:{
            name:"AN/PVS-14 3rd gen NVM",//the text name of the scope
            mag:1,
            type:3,
            lType:2,//1 is monocle, 2 is binoc, etc. 
            gen:3,//really just guessing here
            eDist:246//I have no idea
        }

    },
    uniforms:{
        u_ratnik:{
            name:"Ratnik uniform, one of the most modern uniforms in existence, offering both protection and camo",
            camo:2,//0 is color camo only, 1 is color+thermal, 2 is color+thermal+bug repellant
            quality:5,//the quality of the gear. Older gear will be worse typically. 
        },
    },
    headSets:{
        hs_GSSH01:{
            name:"GSSH-01-01 6M2-1 active earpro cans w/headset, part of the ratnik kit",
            earProType:5,//1 is basic earplugs, 2 is cans with passive protection, 3 is passive cans with comms link, 4 is active cans, 5 is active cans with comm link
            weight:.66
        }
    },
    pRadios:{
        pr_R16801UME:{
            name:"R-168-0.1U(M)E VHF handheld radio set for platoon, squad and individual level comms. VHF and non-digital",
            range:.75,//miles, effective
            transTypes:[1,0,1,1,0,0,1],//vhf,uhf,analog clear,analog cypher,digital,digital advanced, tone call
            minRange:45,//mhz
            maxRange:56
        },
        pr_R187P1E:{
            name:"R-187-P1E AZART VHF and VHF digital, dual channel, frequency hopping, sattelite handheld radio set. Part of the Ratnik kit and a massive upgrade over the R-168",
            range:12.42,//miles, effective
            transTypes:[1,1,1,1,1,1,1],//vhf,uhf,analog clear,analog cypher,digital,digital advanced, tone call
            minRange:27,//mhz
            maxRange:530
        }
    },
    iFAKs:{
        iFAK_RU_1:{
            name:"Unknown brand, shit-tier russian first aid kit with tie-off TQ and some bandages, as seen in ukraine",
            tieOffTQ:1,//old fashioned tie off TQ
            CATorSWAT_TQ:0,//high quality CAT or SWAT TQs
            wPackGauze:1,//gauze for wound packing
            sCWA:0,//something specifically for addressing sucking chest wounds.
            nAK:0,//nasopharyngeal airway kit, for opening an airway through the nose
            PressDressAndBdg:1,//pressure dressing and bandages
            shears:0,//medical shears, safer and easy to access
            gloves:0,//reduce chances of infection 
            blanket:0,//delays shock onset and hypothermia
            litter:0,//quick deployment stretcher to get your buddies out. Most kits won't contain this
            splint:0,//handy for securing limbs
            meds:0,//specialty meds, specialty item
            bbKit:0,//booboo kit, important for avoiding infections in minor wounds.
            mTape:0

        },
        iFAK_Generic_1:{
            name:"generic IFAK based off of the 2003 Iraq invasion standard-issue US issue model, something a russian or abkhazian soldier would optimistically have on their person if they learned their lesson from 2014. Added a booboo kit",
            tieOffTQ:0,
            CATorSWAT_TQ:1,
            wPackGauze:2,
            sCWA:0,
            nAK:1,
            PressDressAndBdg:1,
            shears:0,
            gloves:4,
            blanket:0,
            litter:0,
            splint:0,
            meds:0,
            bbKit:1,
            mTape:0
        },
        iFAK_Improved:{
            name:"A middle ground between the 2003 US army standard issue and the IFAK II of the 2010+ era, good candidate for issue to georgian forces",
            tieOffTQ:0,
            CATorSWAT_TQ:1,
            wPackGauze:2,
            nAK:1,
            PressDressAndBdg:1,
            shears:0,
            gloves:4,
            blanket:0,
            litter:0,
            splint:0,
            meds:0,
            bbKit:1,
            mTape:1
        },
        iFAK_II:{
            name:"An advanced IFAK issued beginning in 2014 for the US army. Also a possible candidate for Georgian forces and perhaps elite RU/Abkhaz commandos. Adds extra TQ, chest seal",
            tieOffTQ:0,
            CATorSWAT_TQ:2,
            wPackGauze:2,
            sCWA:1,
            nAK:1,
            PressDressAndBdg:1,
            shears:0,
            gloves:4,
            blanket:0,
            litter:0,
            splint:0,
            meds:0,
            bbKit:1,
            mTape:1
        }
    }
}
const components={
    vehicles:{

    //general logistics vehicles//
        Truck_ATZ5_Fueler : { //refueler on Ural 4320 chassis.
            type:8,
            mass:15.7,
            crew:1,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,1,2],
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:1320.86,//big because it's a refueler, other ural 4320s will have 80gal fuel tanks
            maxSpeed:[20,52],
            maxspeedOR:52,
            maxspeedCC:20,
            canFloat:0,
            profile:1.5,
            catastrophicLossOnPen:.95,
            fuelBurn:[.16,.149,.1],
            opRange:[8225,8864],//lol
            urbanSurvivability:.2,
        },
        Truck_ATS5_Water:{// water carrier
            type:6,
            mass:15.7,
            crew:1,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,1,250],
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[20,52],
            maxspeedOR:52,
            maxspeedCC:20,
            canFloat:0,
            profile:1.5,
            catastrophicLossOnPen:.95,
            fuelBurn:[.16,.149,.1],
            opRange:[8225,8864],//lol
            urbanSurvivability:.2, 
        },
        Truck_Ural375_Standard:{
            type:6,
            mass:14.5,
            crew:1,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,2],
            troopcapacity:1,
            cargoBayTroopCapacity:12,
            bodyArmorLevel:.5,
            fuelcap:95.1,
            maxSpeed:[30.6,47.2],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.3139,.204,.15],
            maxCargoWeight:[4.409,5.29],
            opRange:[302.91,466.02],
            urbanSurvivability:.25,            
        },
        Truck_Ural4320_Standard:{
            type:6,
            mass:13,
            crew:1,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,2],
            cargoBayTroopCapacity:12,
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[31,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1765,.114,.1],
            maxCargoWeight:[6,8],
            opRange:[403.8,621.37],
            urbanSurvivability:.25,
        },
        Truck_Kamaz4310_Standard:{
            type:6,
            mass:14.5,
            crew:1,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,2],
            troopcapacity:2,
            cargoBayTroopCapacity:12,
            bodyArmorLevel:.5,
            fuelcap:66.04,
            maxSpeed:[30.6,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1635,.1062,.15],
            maxCargoWeight:[4.5,6],
            opRange:[403.89,621.37],
            urbanSurvivability:.25,
        },
        Truck_Gaz_66_Standard:{
            type:6,
            mass:3.79,
            crew:1,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,2],
            troopcapacity:2,
            cargoBayTroopCapacity:12,
            bodyArmorLevel:.5,
            fuelcap:55.5,
            maxSpeed:[30.6,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.157,.102,.1],
            maxCargoWeight:[4.5,6],
            opRange:[353,543.7],
            urbanSurvivability:.25,            
        },



    //APCs//
        APC_BTR80:{
            type:3,
            mass:15.0,
            crew:3,
            troopcapacity:7,
            supplies:[3,2,1,1,1,3,5],
            vSupplies:[0,0,0,0,0,1000,0,2000],
            vSuppliesPerHourCombat:[0,0,0,0,0,50,0,300],
            vSuppliesPerHourOnFront:[0,0,0,0,0,10,0,10],
            vSuppliesPerHourInReserve:[0,0,0,0,0,0,0,2],
            vSuppliesPerHourPolicing:[0,0,0,0,0,2,0,3],
            armorLevel:[2,2],
            fuelcap:79.25,
            maxSpeed:[25,40],
            gunaccuracy:3,
            reloadtime:.5,
            //roundsInTurret:[1500,500],
            maxRange:[1640,1640],
            power:[3.25,2],
            hasflir:0,
            haslaser:0,
            canFloat:1,
            SA:3,
            profile:76.777,
            catastrophicLossOnPen:.2,
            fuelBurn:[.28,.18,.1],
            opRange:[282,434],
            urbanSurvivability:3
        },
        APC_BTR82:{
            type:3,
            mass:15.9,
            crew:2,
            troopcapacity:8,
            supplies:[3,2,1,1,1,3,5],
            vSupplies:[200,100,0,0,0,1000,0,0],
            vSuppliesPerHourCombat:[180,40,0,0,0,50,0,0],
            vSuppliesPerHourOnFront:[15,3,0,0,0,10,0,0],
            vSuppliesPerHourInReserve:[2,0,0,0,0,0,0,0],
            vSuppliesPerHourPolicing:[1,0,0,0,0,2,0,0],
            armorLevel:[2.2,2.2],
            fuelcap:79.25,
            maxSpeed:[25,40],
            gunaccuracy:3,
            reloadtime:.5,
            //roundsInTurret:[200,100],
            maxRange:[3937,3500],
            power:[5,3.5],
            hasflir:1,
            haslaser:0,
            canFloat:1,
            SA:3.5,
            profile:88.9,
            catastrophicLossOnPen:.18,
            fuelBurn:[.28,.18,.1],
            opRange:[282,434],
            urbanSurvivability:3.8,
        },
        APC_MTLB : {
            type:3,
            mass:13.1,
            crew:2,
            troopcapacity:11,
            supplies:[2,2,1,1,1,3,4],
            vSupplies:[0,0,0,0,0,2000,0,0],
            vSuppliesPerHourCombat:[0,0,0,0,0,200,0,0],
            vSuppliesPerHourOnFront:[0,0,0,0,0,15,0,0],
            vSuppliesPerHourInReserve:[0,0,0,0,0,1,0,0],
            vSuppliesPerHourPolicing:[0,0,0,0,0,3,0,0],
            armorLevel:[1.5,1.5],
            fuelcap:122,
            maxSpeed:[25,38],
            gunaccuracy:3,
            reloadtime:.5,
            roundsCarried:[2500,0],
            roundsInTurret:[2500,0],
            maxRange:[1093,0],
            power:[1.25,1],
            hasflir:0,
            haslaser:0,
            canFloat:1,
            SA:2.5,
            profile:57.405,
            catastrophicLossOnPen:.15,
            fuelBurn:[.39,.32,.1],
            opRange:[310,370],
            urbanSurvivability:2,
        },
        APC_BTR80K:{
            type:5,
            mass:15.0,
            crew:3,
            troopcapacity:7,
            supplies:[3,2,1,1,1,3,5],
            vSupplies:[0,0,0,0,0,0,0,2000],
            vSuppliesPerHourCombat:[0,0,0,0,0,0,0,300],
            vSuppliesPerHourOnFront:[0,0,0,0,0,0,0,10],
            vSuppliesPerHourInReserve:[0,0,0,0,0,0,0,2],
            vSuppliesPerHourPolicing:[0,0,0,0,0,0,0,3],
            armorLevel:[2,2],
            fuelcap:79.25,
            maxSpeed:[25,40],
            gunaccuracy:3,
            reloadtime:.5,
            //roundsInTurret:[1500,500],
            maxRange:[1640,1640],
            power:[3.25,2],
            hasflir:0,
            haslaser:0,
            canFloat:1,
            SA:3,
            profile:76.777,
            catastrophicLossOnPen:.2,
            fuelBurn:[.28,.18,.1],
            opRange:[282,434],
            urbanSurvivability:3            
        },
        Truck_Ural4320_TroopCarrier:{//Ural 4320 equipped with supplies for a truck squad
            type:6,
            mass:13,
            crew:1,
            cargoBayTroopCapacity:12,
            troopcapacity:2,
            supplies:[3,2,1,1,2,3,4],
            vSupplies:[0,0,0,0,0,0,0,0],
            vSuppliesPerHourCombat:[0,0,0,0,0,0,0,0],
            vSuppliesPerHourOnFront:[0,0,0,0,0,0,0,0],
            vSuppliesPerHourInReserve:[0,0,0,0,0,0,0,0],
            vSuppliesPerHourPolicing:[0,0,0,0,0,0,0,0],
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[31,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1765,.114,.1],
            maxCargoWeight:[6,8],
            opRange:[403.8,621.37],
            urbanSurvivability:.25,
        },



    //IFVs//
        IFV_BMP1 : {
            type:2,
            mass:14.5,
            crew:3,
            troopcapacity:7,
            supplies:[2,2,1,1,3,3,6],
            vSupplies:[0,0,20,10,4,1000,0,0],
            vSuppliesPerHourCombat:[0,0,8,2,2,175,0,0],
            vSuppliesPerHourOnFront:[0,0,1,.025,.05,10,0,0],
            vSuppliesPerHourInReserve:[0,0,0,0,0,0,0,0],
            vSuppliesPerHourPolicing:[0,0,.05,0,0,2,1,0],
            armorLevel:[2.5,3.5],
            fuelcap:122,
            maxSpeed:[28,40],
            gunaccuracy:2.5,
            reloadtime:7,
            reloadtimeATGM:40,
            canreloadATGMunderFire:1,
            roundsInTurret:[10,5,4],
            maxRange:[550,550,3280],
            power:[2,3.25],
            hasflir:0,
            haslaser:0,
            hasTurretMG:1,
            TurretMGIsRemote:1,
            canFloat:1,
            SA:2.5,
            profile:68,
            catastrophicLossOnPen:.6,
            fuelBurn:[.39,.32,.1],
            opRange:[310,370],
            urbanSurvivability:2,            
        },
        IFV_BMP1K2 : {
            type:5,
            mass:14.5,
            crew:2,
            troopcapacity:7,
            supplies:[2,2,1,1,3,3,6],
            vSupplies:[0,0,20,10,4,1000,0,0],
            vSuppliesPerHourCombat:[0,0,8,2,2,175,0,0],
            vSuppliesPerHourOnFront:[0,0,1,.025,.05,10,0,0],
            vSuppliesPerHourInReserve:[0,0,0,0,0,0,0,0],
            vSuppliesPerHourPolicing:[0,0,.05,0,0,2,1,0],
            armorLevel:[2.5,3.5],
            fuelcap:122,
            maxSpeed:[28,40],
            gunaccuracy:2.5,
            reloadtime:7,
            reloadtimeATGM:40,
            canreloadATGMunderFire:1,
            roundsInTurret:[10,5,4],
            maxRange:[550,550,3280],
            power:[2,3.25],
            hasflir:0,
            haslaser:0,
            hasTurretMG:1,
            TurretMGIsRemote:1,
            canFloat:1,
            SA:2.5,
            profile:68,
            catastrophicLossOnPen:.6,
            fuelBurn:[.39,.32,.1],
            opRange:[310,370],
            urbanSurvivability:2,            
        },
        IFV_BMP2 : {
            type:2,
            mass:15.8,
            crew:2,//technically 3, but the infantry SL doubles as a gunner
            troopcapacity:7,
            supplies:[2,2,1,1,1,3,6],
            vSupplies:[340,160,0,0,4,1000,0,0],
            vSuppliesPerHourCombat:[160,30,0,0,2,50,0,0],
            vSuppliesPerHourOnFront:[15,3,0,0,.05,10,0,0],
            vSuppliesPerHourInReserve:[2,0,0,0,0,0,0,0],
            vSuppliesPerHourPolicing:[1,0,0,0,0,2,0,0],
            armorLevel:[2.8,3.8],
            fuelcap:122,
            maxSpeed:[28,40],
            gunaccuracy:3,
            reloadtime:1,
            reloadtimeATGM:40,
            canreloadATGMunderFire:1,
            roundsCarried:[340,160,4],
            roundsInTurret:[340,160,4],
            maxRange:[4000,1500,4400],
            power:[5,3.5],
            hasflir:1,
            haslaser:0,
            hasTurretMG:0,
            TurretMGIsRemote:0,
            canFloat:0,
            SA:4,
            profile:75.54,
            opRange:[310,370],
            fuelBurn:[.39,.32,.1],
            catastrophicLossOnPen:.5,
            urbanSurvivability:4.5,            
        },
        IFV_M2A2 : {
            type:2,
            mass:30.4,
            crew:3,
            troopcapacity:6,
            vSupplies:[0,0,0,0,0,0,0,0],
            armorLevel:[3.25,3.25],
            maxSpeed:[35,25],
            fuelcap:155,
            gunaccuracy:3,
            reloadtime:1,
            reloadtimeATGM:40,
            canreloadATGMunderFire:0,
            roundsCarried:[340,160,2],
            roundsInTurret:[150,150,4],
            maxRange:[4000,3280,4374],
            power:[4.5,3.5],
            hasflir:1,
            haslaser:1,
            canFloat:0,
            SA:4.25,
            profile:[3.5,1],
            catastrophicLossOnPen:.2,
            fuelBurn:[1.03,.0625,.1],
            opRange:[149.6,248],
            urbanSurvivability:4,
        },
        IFV_BTR_RD : {
            type:2,
            mass:9.038,
            crew:1,
            troopcapacity:13,
            supplies:[1,2,0,0,0,2,3],
            vSupplies:[0,0,0,0,4,1000,0,0],
            vSuppliesPerHourCombat:[0,0,0,0,5,50,0,200],
            vSuppliesPerHourOnFront:[0,0,0,0,.05,10,0,10],
            vSuppliesPerHourInReserve:[0,0,0,0,0,0,0,0],
            vSuppliesPerHourPolicing:[0,0,0,0,0,0,0,0],
            armorLevel:[1.8,1.8],
            fuelcap:73.96,
            maxSpeed:[24.636,37.903],
            gunaccuracy:4.8,
            reloadtime:0,
            reloadtimeATGM:40,
            canreloadATGMunderFire:1,
            //roundsInTurret:[0,0,1],
            maxRange:[1640,1640],
            power:[0,3.5],
            hasflir:0,
            haslaser:0,
            canFloat:1,
            SA:1.5,
            profile:53.642,
            fuelBurn:[.28,.18,.1],
            catastrophicLossOnPen:.2,
            opRange:[282,434],
            urbanSurvivability:3,
        },
        IFV_BMP2K : {
            type:5,
            mass:15.8,
            crew:3,//Unlike the standard BMP2, the BMP-2K has a dedicated gunner. 
            troopcapacity:7,
            supplies:[2,2,1,1,1,3,6],
            vSupplies:[340,160,0,0,4,1000,0,0],
            vSuppliesPerHourCombat:[160,30,0,0,2,50,0,0],
            vSuppliesPerHourOnFront:[15,3,0,0,.05,10,0,0],
            vSuppliesPerHourInReserve:[2,0,0,0,0,0,0,0],
            vSuppliesPerHourPolicing:[1,0,0,0,0,2,0,0],
            armorLevel:[2.8,3.8],
            fuelcap:122,
            maxSpeed:[28,40],
            gunaccuracy:3,
            reloadtime:1,
            reloadtimeATGM:40,
            canreloadATGMunderFire:1,
            roundsCarried:[340,160,4],
            roundsInTurret:[340,160,4],
            maxRange:[4000,1500,4400],
            power:[5,3.5],
            hasflir:1,
            haslaser:0,
            hasTurretMG:0,
            TurretMGIsRemote:0,
            canFloat:0,
            SA:4,
            profile:75.54,
            opRange:[310,370],
            fuelBurn:[.39,.32,.1],
            catastrophicLossOnPen:.5,
            urbanSurvivability:4.5,            
        },
 



    //MBTs//
        MBT_T72B : {
            disc:"Older MBT, main tank of the russian, abkhazian and georgian army",
            type:1,
            mass:44.5,
            crew:3,
            supplies:[1,2,0,0,0,2,2],
            vSupplies:[0,0,15,20,10,1000,200,0],
            vSuppliesPerHourCombat:[0,0,10,3,2,150,50,0],
            vSuppliesPerHourOnFront:[0,0,1,.5,.05,10,2,0],
            vSuppliesPerHourInReserve:[0,0,0,0,0,0,5,0],
            vSuppliesPerHourPolicing:[.05,0,0,0,0,2,1,0],
            armorLevel:[3,4],
            fuelcap:320,
            speed:[25,30],
            gunaccuracy:3,
            reloadtime:7,
            reloadtimeManual:10,
//            roundsInTurret:[5,13,4], saving because this might be useful later.
            maxRange:[4374,2296,4374],
            power:[5,4],
            hasflir:0,
            haslaser:1,
            hasTurretMG:1,
            TurretMGIsRemote:0,
            canFloat:1,
            SA:3,
            profile:86.167,
            catastrophicLossOnPen:.8,
            fuelBurn:[1.8,1.1,.5],
            opRange:[170,290],
            urbanSurvivability:3.5,
        },
        MBT_T72B3 : {
            disc:"Updated variant of the T-72, used primarily by Russia but with some given to Abkhazia",
            type:1,
            mass:45,
            crew:3,
            supplies:[1,0,0,0,0,2,3],
            vSupplies:[0,0,15,20,10,1000,200,0],
            vSuppliesPerHourCombat:[0,0,10,3,2,150,50,0],
            vSuppliesPerHourOnFront:[0,0,1,.5,.05,10,2,0],
            vSuppliesPerHourInReserve:[0,0,0,0,0,0,5,0],
            vSuppliesPerHourPolicing:[.05,0,0,0,0,2,1,0],
            armorLevel:[3.5,4.5],
            fuelcap:320,
            maxSpeed:[23.75,28.5],
            gunaccuracy:3,
            reloadtime:6.5,
            reloadtimeManual:10,
         // roundsInTurret:[5,13,4],
            maxRange:[4500,3000,4374],
            power:[5,4.5],
            hasflir:1,
            haslaser:1,
            hasTurretMG:1,
            TurretMGIsRemote:0,
            canFloat:1,
            SA:4,
            profile:86.167,
            catastrophicLossOnPen:.75,
            fuelBurn:[1.71,1.04,.5],
            opRange:[162,270],
            urbanSurvivability:4,            
        },
        MBT_T72B3TestUpdate : {
            name:"T-72B3 Obr. 2016 MBT",
            disc:"Test of a possible new system for modeling armored vehicle stats",
            type:1,//tank 
            mass:45,//tons
            crew:3,//how many it takes to perform the vehicle's function. Different than troop capacity, or for IFVs, carried squad size.
            primaryWeapon:vComponents.cannons.c_24A6M5,
            primaryWeaponAmmunition:{
                antiTank:[vComponents.Ammunition.cannon.c_3VBM23,10],
                GP:[vComponents.Ammunition.cannon.c_3VBK27,10],
                HE:[vComponents.Ammunition.cannon.c_125mmHE,5],
            },
            atgm:vComponents.atgm.atgm_9M119,
            atgmAmmo:[vComponents.Ammunition.atgm.m_9K120,4],
            comms:{
                pri:vComponents.commSys.radio.r_R173,
                sec:vComponents.commSys.radio.r_R168_25VE,
            },
            coax:vComponents.mg.mg_PKT,
            supplies:[1,0,0,0,0,2,3],
            vSupplies:[0,0,15,20,10,1000,200,0],
            armor:[0,0,0,0],//mm front, back, sides top. Replacement candidate for armorlevel.
            armorLevel:[3.5,4.5],//too simplistic, these values are made up with no real basis. Hopefully will make these deprecated. 
            fuelcap:320,//how much fuel can be carried in gallons.
            maxSpeed:[23.75,28.5],//max speed in mph, both offroad and on-road.
            gunaccuracy:3,//too simplistic, need to change this
            reloadtime:6.5,//reload time in seconds, in this case for the autoloader.
            reloadtimeManual:10,
            power:[0,0,0],//anti-armor, anti-infantry, anti-air
            casualtyChance:0,
            effectiveRange:[0,0,0],//vehicles, personnel, air targets
            canFloat:1,
            profile:86.167,//maybe too subjective
            catastrophicLossOnPen:.75,
            fuelBurn:[1.71,1.04,.5],//good as-is
            opRange:[162,270],//good as-is         
        },
        MBT_M1A2 : {
            desc:"The M1A2 is a variant of the M1 Abrams, the primary MBT of the US",
            type:1,
            mass:64.6,
            crew:4,
            vSupplies:[0,0,15,20,0,1000,200,0],
            vSuppliesPerHourCombat:[0,0,10,3,2,150,50,0],
            vSuppliesPerHourOnFront:[0,0,1,.5,.05,10,2,0],
            vSuppliesPerHourInReserve:[0,0,0,0,0,0,5,0],
            vSuppliesPerHourPolicing:[.05,0,0,0,0,2,1,0],
            armorLevel:[3,4],
            fuelcap:504,
            maxSpeed:[30,45],
            gunaccuracy:3,
            reloadtime:7,
            roundsCarried:[15,20,0],
            roundsInTurret:[5,13,0],
            maxRange:[4400,3000,0],
            power:[5,5],
            hasflir:1,
            haslaser:1,
            hasTurretMG:1,
            TurretMGIsRemote:1,
            canFloat:1,
            SA:4.5,
            profile:[5,3],
            catastrophicLossOnPen:.2,
            fuelBurn:[5.04,1.9,1.0],
            opRange:[100,265],
            urbanSurvivability:4.5,            
        },



    //Artillery//
        SPA_BM21:{
            type:10,
            mass:15.1,
            crew:3,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,1,0,2,4],
            troopcapacity:0,
            bodyArmorLevel:.5,
            fuelcap:95,
            maxSpeed:[20,45],
            canFloat:0,
            roundsCarried:40,
            profile:1.5,
            catastrophicLossOnPen:.85,
            fuelBurn:[.2,.17,.1],
            opRange:[475,558],
            urbanSurvivability:.5,            
        },
        SPA_9A52:{
            type:10,
            mass:48.17,
            crew:4,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,3,4],
            troopcapacity:0,
            bodyArmorLevel:.5,
            fuelcap:219,
            maxSpeed:[20,45],
            canFloat:0,
            roundsCarried:12,
            loadReplenishTime:36,
            profile:100,
            catastrophicLossOnPen:.2,
            fuelBurn:[.608,.395,.1],
            opRange:[343,528],
            urbanSurvivability:.5,          
        },
        SPA_2S3:{
            type:10,
            mass:30.64,
            crew:4,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,1,0,3,4],
            troopcapacity:0,
            bodyArmorLevel:1.5,
            fuelcap:219.2,
            maxSpeed:[19.63,30.2],
            canFloat:0,
            roundsCarried:40,
            profile:2.5,
            catastrophicLossOnPen:.85,
            fuelBurn:[1.085,.7,.2],
            opRange:[201.89,310.6],
            urbanSurvivability:1,
        },
        SPA_2S3M1:{
            disc:"the 2S3M1 is an incremental upgrade the 2S3 platform and is the version the abkhaz forces use. It adds an improved gunsight and rocket-assisted laser-guided rounds with longer range.",
            type:10,
            mass:30.64,
            crew:4,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,1,0,3,4],
            troopcapacity:0,
            bodyArmorLevel:1.5,
            fuelcap:219.2,
            maxSpeed:[19.63,30.2],
            canFloat:0,
            roundsCarried:40,
            profile:2.5,
            catastrophicLossOnPen:.85,
            fuelBurn:[1.085,.7,.2],
            opRange:[201.89,310.6],
            urbanSurvivability:1,
        },

    //Artillery Counterbattery Systems//
        CB_1L219 : {
            type:5,
            mass:12.12,
            crew:4,
            supplies:[1,0,0,0,0,3,4],
            vSupplies:[0,0,0,0,0,2000,0,0],
            vSuppliesPerHourCombat:[0,0,0,0,0,200,0,0],
            vSuppliesPerHourOnFront:[0,0,0,0,0,15,0,0],
            vSuppliesPerHourInReserve:[0,0,0,0,0,1,0,0],
            vSuppliesPerHourPolicing:[0,0,0,0,0,3,0,0],
            armorLevel:[1.5,1.5],
            fuelcap:122,
            maxSpeed:[25,38],
            gunaccuracy:3,
            reloadtime:.5,
            roundsCarried:[2500,0],
            roundsInTurret:[2500,0],
            maxRange:[1093,0],
            power:[1.25,1],
            hasflir:0,
            haslaser:0,
            canFloat:1,
            SA:2.5,
            profile:57.405,
            catastrophicLossOnPen:.15,
            fuelBurn:[.39,.32,.1],
            opRange:[310,370],
            urbanSurvivability:2,
        },

    //Artillery ammunition carriers/transloaders//
        Truck_9T254_BM21GradResupplier:{//reload carrier for the BM-21 grad. 
            type:7,
            mass:15.1,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,3],
            troopcapacity:1,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[20,45],
            canFloat:0,
            roundsCarried:72,
            profile:1.5,
            catastrophicLossOnPen:.85,
            fuelBurn:[.14,.12,.1],
            opRange:[509,594],
            urbanSurvivability:.2,
        },
        Truck_2S3_RoundCarrier:{
            type:7,
            mass:15.1,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[20,45],
            canFloat:0,
            roundsCarried:40,
            profile:1.5,
            catastrophicLossOnPen:.6,
            fuelBurn:[.14,.12,.1],
            opRange:[509,594],
            urbanSurvivability:.2,            
        },
        Truck_9T234_2_BM30SmerchResupplier:{//Carries 12 rockets (1 full salvo) of BM-30 rockets. Identical spec to the BM-30.
            type:10,
            mass:48.17,
            crew:4,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,4,6],
            troopcapacity:0,
            bodyArmorLevel:.5,
            fuelcap:208.69,
            maxSpeed:[20,45],
            canFloat:0,
            roundsCarried:12,
            loadReplenishTime:36,
            profile:100,
            catastrophicLossOnPen:.2,
            fuelBurn:[.608,.395,.1],
            opRange:[343,528],
            urbanSurvivability:.5,            
        },



        //Artillery specific command systems//
        C2_1V13:{ //Artillery command and Recon vic on MTLB-U chassis
            type:5,
            mass:15.7,
            crew:6,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,1,0,0,3,5],
            bodyArmorLevel:1.5,
            fuelcap:122,
            maxSpeed:[25,38],
            canFloat:1,
            SA:2.5,
            profile:2,
            catastrophicLossOnPen:.15,
            fuelBurn:[.39,.32,.1],
            opRange:[310.68,370],
            urbanSurvivability:2,            
        },
        C2_1V14:{ //Command and Control vehicle on MTLB-U chassis
            type:5,
            mass:15.7,
            crew:5,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,1,0,3,5],
            bodyArmorLevel:1.5,
            fuelcap:122,
            maxSpeed:[25,38],
            canFloat:1,
            SA:2.5,
            profile:2,
            catastrophicLossOnPen:.15,
            fuelBurn:[.39,.32,.1],
            opRange:[310.68,370],
            urbanSurvivability:2,            
        },
        C2_1V111:{ //Command and control on Zil-131 chassis
            type:5,
            mass:6.7,
            crew:5,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,3,5],
            bodyArmorLevel:1,
            fuelcap:89.818,
            maxSpeed:[21.74,49.7],
            canFloat:0,
            SA:3.5,
            profile:2.5,
            catastrophicLossOnPen:.05,
            fuelBurn:[.2616,.17,.1],
            opRange:[343.3,528.165],
            urbanSurvivability:1,           
        },
        C2_1K123:{//Command and control vehicle specific to the 9A52 HMRL complex. Based on the Kamaz 4310. 
            type:5,
            mass:14.5,
            crew:5,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,3],
            bodyArmorLevel:.5,
            fuelcap:66.04,
            maxSpeed:[30.6,47.2],
            canFloat:0,
            profile:2.5,
            catastrophicLossOnPen:.05,
            fuelBurn:[.1635,.1062,.15],
            opRange:[403.89,621.37],
            urbanSurvivability:.1,            
        },
        C2_1V18:{// Command and control vehicle on BTR-60PB chassis
            type:5,
            mass:10.1,
            crew:6,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,1,0,0,3,5],
            bodyArmorLevel:1.5,
            fuelcap:79.25,
            maxSpeed:[32.31,49.709],
            canFloat:1,
            profile:2,
            catastrophicLossOnPen:.05,
            fuelBurn:[.392,.255,.15],
            opRange:[201.94,310.685],
            opRangeCC:201.94,
            opRangeOR:310.685,
            urbanSurvivability:2.5,            
        },
    //Artillery specific maintenance vehicles



    //SAMS//
        TELAR_9A310:{//SA-11 launcher with built in tracking radar, specifically part of the 'BUK-M1' complex. Note, this is the version immediately preceding the upgrade to the SA-17 
            type:13,
            weight:34,
            crew:4,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,3,5],
            armorLevel:1.5,
            canFloat:0,
            fuelcap:66,
            maxSpeed:[26.5,40.3],
            roundsCarried:4,
            profile:132.89,
            catastrophicLossOnPen:.3,  
            fuelBurn:[.328,.212,.1],
            opRange:[201.5,310],     
        },  
        TEL_9A39:{//SA-11 launcher/reloader with 4+4 rounds
            type:13,
            weight:34.5,
            crew:4,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,3,4],
            armorLevel:1.5,
            canFloat:0,
            fuelcap:66,
            maxSpeed:[26.5,40.3],
            roundsCarried:8,
            profile:132.89,
            catastrophicLossOnPen:.3,  
            fuelBurn:[.328,.212,.1],
            opRange:[201.5,310],                
        },
        TELAR_9K33:{//SA-8 'Osa' short-to-medium range standalone SAM system. Predecessor to the SA-15 'Gauntlet' and used in rear line units for air defense.
            type:11,
            weight:19.29,
            crew:5,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,4,5],
            armorLevel:1.25,
            canFloat:1,
            fuelcap:92.46,
            maxSpeed:[6.2,40],
            roundsCarried:6,
            profile:125.664,
            catastrophicLossOnPen:.1,  
            fuelBurn:[.46,.298,.1],
            opRange:[201,310],      
        },
        TELAR_9K330:{//SA-15 'Gauntlet' short-to-medium range standalone SAM system. Used in heavier more elite front line units for defense against aircraft and missiles. Much more powerful in every way than the SA-8
            type:11,
            weight:32,
            crew:3,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,3,4],
            armorLevel:1.5,
            canFloat:0,
            fuelcap:91.35,
            maxSpeed:[25,40],
            roundsCarried:8,
            profile:137.733,
            catastrophicLossOnPen:.3,  
            fuelBurn:[.39,.32,.1],
            opRange:[234.25,360.39],   
        },



    //SAM ammunition carriers/transloaders//
        Truck_9T217_SA8OsaResupplier:{//copied from SA8 due to lack of data
            type:7,
            weight:19.29,
            crew:5,
            supplies:[1,2,0,0,0,2,4],
            vSupplies:[0,0,0,0,0,0,0,0],
            armorLevel:1.25,
            canFloat:1,
            fuelcap:115.57,
            maxSpeed:[6.2,40],
            roundsCarried:12,
            profile:125.664,
            catastrophicLossOnPen:.1,  
            fuelBurn:[.327,.213,.1],
            opRange:[251.55,387.5],      
        },
        Truck_9T243_SA11BukResupplier:{//missile reload carrier for the SA-11. Based on KRAZ-260 chassis.
            type:7,
            mass:15.1,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[20,45],
            canFloat:0,
            roundsCarried:6,
            profile:1.5,
            catastrophicLossOnPen:.85,
            fuelBurn:[.2,.13,.1],
            opRange:[343.2,528],
            urbanSurvivability:.2,
        },
        Truck_9T244_SA15TorResupplier:{//round transporter for the SA-15.It carries rounds and has the capability to load the SA-15 with them via it's built-in crane. 
            type:7,
            mass:15.1,
            crew:1,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[20,45],
            canFloat:0,
            roundsCarried:8,
            profile:1.5,
            catastrophicLossOnPen:.6,
            fuelBurn:[.14,.12,.1],
            opRange:[509,594],
            urbanSurvivability:.2,
        },
        Truck_9T245_SA15TorRoundCarrier:{//round transporter for the SA-15. Unlike the 9T244 it lacks a crane and simply carries the rounds. Visually indistinguishable from a regular Ural 4320.
            type:7,
            mass:15.1,
            crew:1,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[20,45],
            canFloat:0,
            roundsCarried:16,
            profile:1.5,
            catastrophicLossOnPen:.6,
            fuelBurn:[.14,.12,.1],
            opRange:[509,594],
            urbanSurvivability:.2,
        },



    //SAM specific command systems//
        C2_9C470M1:{// C2 vehicle for SA-11 Buk missile batteries
            type:5,
            weight:30.86,
            crew:5,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,4,5],
            armorLevel:1.5,
            canFloat:0,
            fuelcap:66,
            maxSpeed:[26.5,40.3],
            roundsCarried:4,
            profile:132.89,
            catastrophicLossOnPen:.3,  
            fuelBurn:[.328,.212,.1],
            opRange:[201.5,310],     
        },
        C2_PPRU_1:{
            type:5,
            mass:17.1,
            crew:4,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,4,5],
            troopcapacity:11,
            armorLevel:[1.5,1.5],
            fuelcap:122,
            maxSpeed:[25,38],
            canFloat:1,
            profile:58.43,
            catastrophicLossOnPen:.15,
            fuelBurn:[.39,.32,.1],
            opRange:[310,370],
            urbanSurvivability:2,
        },
        C3_9S737:{//9S737 'Ranzhir' MTLB-based early variant, designed for C3 of early SA-13,15,17, and 19 SAM systems.
            type:5,
            mass:17.1,
            crew:5,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,4,5],
            troopcapacity:11,
            armorLevel:[1.5,1.5],
            fuelcap:122,
            maxSpeed:[25,38],
            canFloat:1,
            profile:58.43,
            catastrophicLossOnPen:.15,
            fuelBurn:[.39,.32,.1],
            opRange:[310,370],
            urbanSurvivability:2,
        },



    //SAM specific radar systems//
        SR_9S18M1:{
            type:12,
            weight:34,
            crew:3,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,3,4],
            armorLevel:1.5,
            canFloat:0,
            fuelcap:66,
            maxSpeed:[26.5,40.3],
            roundsCarried:0,
            profile:132.89,
            catastrophicLossOnPen:.3,  
            fuelBurn:[.328,.212,.1],
            opRange:[201.5,310],     
        },        



    //SAM specific maintenance vehicles//
        Truck_9V887:{//engineering repair/test station for the SA-15, based on the Ural-43203 chassis
            type:5,
            mass:13,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            cargoBayTroopCapacity:0,
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[31,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1765,.114,.1],
            maxCargoWeight:[6,8],
            opRange:[403.8,621.37],
            urbanSurvivability:.25,            
        },
        Truck_9F116:{//missile preparation/assembly station for the SA-15, based on the Ural-43203 chassis
            type:5,
            mass:13,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            cargoBayTroopCapacity:0,
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[31,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1765,.114,.1],
            maxCargoWeight:[6,8],
            opRange:[403.8,621.37],
            urbanSurvivability:.25         
        },
        Truck_AG3M1:{//Engineering repair station for the SA-15, based on the Ural-43203 chassis
            type:5,
            mass:13,
            crew:2,
            supplies:[1,0,0,0,0,2,4],
            vSupplies:[0,0,0,0,0,0,0,0],
            cargoBayTroopCapacity:0,
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[31,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1765,.114,.1],
            maxCargoWeight:[6,8],
            opRange:[403.8,621.37],
            urbanSurvivability:.25            
        },
        Truck_9V881:{//9V881 Engineering Repair/Test station, based on the Ural-43203 chassis
            type:5,
            mass:13,
            crew:2,
            supplies:[1,0,0,0,0,2,4],
            vSupplies:[0,0,0,0,0,0,0,0],
            cargoBayTroopCapacity:0,
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[31,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1765,.114,.1],
            maxCargoWeight:[6,8],
            opRange:[403.8,621.37],
            urbanSurvivability:.25            
        },
        Truck_9T31M1:{//Self propelled crane used by SA/11 batteries and based on the ural-375 chassis
            type:5,
            mass:14.5,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,3],
            troopcapacity:2,
            cargoBayTroopCapacity:0,
            bodyArmorLevel:.5,
            fuelcap:95.1,
            maxSpeed:[30.6,47.2],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.3139,.204,.15],
            maxCargoWeight:[4.409,5.29],
            opRange:[302.91,466.02],
            urbanSurvivability:.25,            
        },
        Truck_9T456:{//equipment repair/test station for the SA-11, based on the ural 43203 chassis
            type:5,
            mass:13,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            cargoBayTroopCapacity:0,
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[31,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1765,.114,.1],
            maxCargoWeight:[6,8],
            opRange:[403.8,621.37],
            urbanSurvivability:.25            
        },
        Truck_9V883M1:{//equipment repair station for the sa-11, based on the ural 43203 chassis
            type:5,
            mass:13,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            cargoBayTroopCapacity:0,
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[31,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1765,.114,.1],
            maxCargoWeight:[6,8],
            opRange:[403.8,621.37],
            urbanSurvivability:.25            
        },
        Truck_9V884M1:{//equipment repair station for the sa-11, based on the ural 43203 chassis
            type:5,
            mass:13,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            cargoBayTroopCapacity:0,
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[31,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1765,.114,.1],
            maxCargoWeight:[6,8],
            opRange:[403.8,621.37],
            urbanSurvivability:.25            
        },
        Truck_9V894M1:{//equipment repair station for the sa-11, based on the ural 43203 chassis
            type:5,
            mass:13,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            cargoBayTroopCapacity:0,
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[31,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1765,.114,.1],
            maxCargoWeight:[6,8],
            opRange:[403.8,621.37],
            urbanSurvivability:.25            
        },
        Truck_9V894M1:{//equipment repair station for the sa-11, based on the ural 43203 chassis
            type:5,
            mass:13,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            cargoBayTroopCapacity:0,
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[31,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1765,.114,.1],
            maxCargoWeight:[6,8],
            opRange:[403.8,621.37],
            urbanSurvivability:.25            
        },
        Truck_9V95M1:{ //mobile automatic test station for the sa-11, based on zil-131 chassis
            type:5,
            mass:6.7,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            bodyArmorLevel:1,
            fuelcap:89.818,
            maxSpeed:[21.74,49.7],
            canFloat:0,
            SA:3.5,
            profile:2.5,
            catastrophicLossOnPen:.05,
            fuelBurn:[.2616,.17,.1],
            opRange:[343.3,528.165],
            urbanSurvivability:1,           
        },



        /*
        Capabilities are ordered minelayer, mineclearer, trenchdigger,excavator, combat recovery vehicle

        */
    //Combat engineering/maintenance vehicles//
        Truck_MTO_UB1:{//Mobile maintenance vehicle. 
            type:6,
            mass:14.5,
            crew:3,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,2],
            troopcapacity:3,
            cargoBayTroopCapacity:0,
            bodyArmorLevel:.5,
            fuelcap:66.04,
            maxSpeed:[30.6,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1635,.1062,.15],
            maxCargoWeight:[4.5,6],
            opRange:[403.89,621.37],
            urbanSurvivability:.25,
        },
        Eng_BAT_2:{// Crane and combat bulldozer combo on T-64 chassis
            type:14,
            mass:43.761,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            troopcapacity:8,
            Capabilities:[0,0,1,1,0],
            speedBuryingMines:3.728,
            mineCapacity:0,
            mineReplenishTime:0,
            minefieldLength:0,
            bodyArmorLevel:3.5,
            fuelcap:195.487,
            maxSpeed:[21.747,37.592],
            canFloat:0,
            profile:3.4,
            catastrophicLossOnPen:.35,
            fuelBurn:[.629,.629,.2],
            opRange:[310.685,310.685],
            urbanSurvivability:3            
        },
        Eng_BREM_L:{//crane and combat bulldozer combo on BMP-3 chassis
            type:14,
            mass:43.761,
            crew:3,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            troopcapacity:0,
            Capabilities:[0,0,1,1,0],
            speedBuryingMines:3.728,
            mineCapacity:0,
            mineReplenishTime:0,
            minefieldLength:0,
            bodyArmorLevel:3,
            fuelcap:122,
            maxSpeed:[28,45],
            canFloat:0,
            profile:3.4,
            catastrophicLossOnPen:.2,
            fuelBurn:[.327,.327,.2],
            opRange:[372,372],
            urbanSurvivability:2.5              
        },
        Eng_GMZ_3:{//minelayer
            type:14,
            mass:28.5,
            crew:3,
            supplies:[1,2,0,0,0,2,4],
            vSupplies:[0,0,0,0,0,0,0,0,],
            troopcapacity:0,
            Capabilities:[1,0,0,0,0],
            speedBuryingMines:3.728,
            mineCapacity:208,
            mineReplenishTime:18,
            minefieldLength:1.242,
            bodyArmorLevel:1.5,
            fuelcap:219.2,
            maxSpeed:[40,40],
            canFloat:0,
            profile:2.5,
            catastrophicLossOnPen:.25,
            fuelBurn:[1.175,.705,.4],
            opRange:[186.41,310.685],
            urbanSurvivability:1,
        },
        Eng_UR_77:{ //Mineclearer on 2S1 chassis
            type:14,
            mass:17.08,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            troopcapacity:0,
            Capabilities:[0,1,0,0,0],
            speedBuryingMines:0,
            mineCapacity:0,
            mineReplenishTime:0,
            minefieldLength:0,
            bodyArmorLevel:1.5,
            fuelcap:145.294,
            maxSpeed:[18.4,37.28],
            canFloat:1,
            profile:2.5,
            catastrophicLossOnPen:.25,
            fuelBurn:[.7794,.4676,.2],
            opRange:[186.41,310.685],
            urbanSurvivability:1,
        },
        Eng_EOV_3521:{ //Excavator on Ural 4320 chassis
            type:14,
            mass:13,
            crew:2,
            supplies:[1,0,0,0,0,2,4],
            vSupplies:[0,0,0,0,0,0,0,0],
            troopcapacity:0,
            Capabilities:[0,0,1,1,0],
            speedBuryingMines:0,
            mineCapacity:0,
            mineReplenishTime:0,
            minefieldLength:0,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[31,52.81],
            canFloat:0,
            profile:2.5,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1765,.114,.1],
            opRange:[403.8,621.37],
            urbanSurvivability:.25
        },
        Eng_REM_KL:{ //crane/maintenance vehicle
            type:14,
            mass:13,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            troopcapacity:0,
            Capabilities:[0,0,1,1,0],
            speedBuryingMines:0,
            mineCapacity:0,
            mineReplenishTime:0,
            minefieldLength:0,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[31,52.81],
            canFloat:0,
            profile:2.5,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1765,.114,.1],
            opRange:[403.8,621.37],
            urbanSurvivability:.25            
        }, 


    //Troop hygiene, comfort, medical vehicles//
        Truck_PKPB10:{ //Laundry truck
            type:5,
            mass:14.5,
            crew:3,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,2],
            bodyArmorLevel:.5,
            fuelcap:95.1,
            maxSpeed:[30.6,47.2],
            canFloat:0,
            profile:2.5,
            catastrophicLossOnPen:.05,
            fuelBurn:[.3139,.204,.15],
            opRange:[302.91,466.02],
            urbanSurvivability:.1,
        },
        Truck_PAK_200M:{//Mobile kitchen. Extra crewman for the trailer the vehicle normally pulls. 
            type:6,
            mass:14.5,
            crew:4,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,2],
            troopcapacity:2,
            cargoBayTroopCapacity:0,
            bodyArmorLevel:.5,
            fuelcap:66.04,
            maxSpeed:[30.6,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1635,.1062,.15],
            maxCargoWeight:[4.5,6],
            opRange:[403.89,621.37],
            urbanSurvivability:.25,
        },
        Truck_DDU_1:{//Mobile shower system. Includes a trailer. 
            type:6,
            mass:14.5,
            crew:1,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,2],
            troopcapacity:2,
            cargoBayTroopCapacity:0,
            bodyArmorLevel:.5,
            fuelcap:66.04,
            maxSpeed:[30.6,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1635,.1062,.15],
            maxCargoWeight:[4.5,6],
            opRange:[403.89,621.37],
            urbanSurvivability:.25,
        },
        M_Ural375A:{ //Medical vehicle on Ural 375 chassis, direct copy of the C2 variant
            type:5,
            mass:14.5,
            crew:6,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,4,6],
            bodyArmorLevel:.5,
            fuelcap:95.1,
            maxSpeed:[30.6,47.2],
            canFloat:0,
            profile:2.5,
            catastrophicLossOnPen:.05,
            fuelBurn:[.3139,.204,.15],
            opRange:[302.91,466.02],
            urbanSurvivability:.1,
        },


    //Non-artillery/SAM command vehicles//
        C2_Ural375A:{ //Command and control on Ural 375 chassis
            type:5,
            mass:14.5,
            crew:5,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,3,3],
            bodyArmorLevel:.5,
            fuelcap:95.1,
            maxSpeed:[30.6,47.2],
            canFloat:0,
            profile:2.5,
            catastrophicLossOnPen:.05,
            fuelBurn:[.3139,.204,.15],
            opRange:[302.91,466.02],
            urbanSurvivability:.1,
        },
        C2_R145BM1:{ //Another C2 vic on BTR 60 chassis, direct copy. No apparent dedication to a specific sys
            type:5,
            mass:10.1,
            crew:6,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,1,0,0,4,5],
            bodyArmorLevel:1.5,
            fuelcap:79.25,
            maxSpeed:[32.31,49.709],
            canFloat:1,
            profile:2,
            catastrophicLossOnPen:.05,
            fuelBurn:[.392,.255,.15],
            opRange:[201.94,310.685],
            urbanSurvivability:2.5,            
        },
        C2_R142:{//Division, brigade and battalion level general C2 vehicle based on the Gaz-66
            type:5,
            mass:3.79,
            crew:1,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,2],
            troopcapacity:2,
            cargoBayTroopCapacity:12,
            bodyArmorLevel:.5,
            fuelcap:55.5,
            maxSpeed:[30.6,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.157,.102,.1],
            maxCargoWeight:[4.5,6],
            opRange:[353,543.7],
            urbanSurvivability:.25,   
        },
        C2_R149:{
            type:5,
            mass:15.0,
            crew:2,
            troopcapacity:7,
            supplies:[3,2,1,1,1,3,5],
            vSupplies:[0,0,0,0,0,0,0,2000],
            vSuppliesPerHourCombat:[0,0,0,0,0,0,0,300],
            vSuppliesPerHourOnFront:[0,0,0,0,0,0,0,10],
            vSuppliesPerHourInReserve:[0,0,0,0,0,0,0,2],
            vSuppliesPerHourPolicing:[0,0,0,0,0,0,0,3],
            armorLevel:[2,2],
            fuelcap:79.25,
            maxSpeed:[25,40],
            gunaccuracy:3,
            reloadtime:.5,
            //roundsInTurret:[1500,500],
            maxRange:[1640,1640],
            power:[3.25,2],
            hasflir:0,
            haslaser:0,
            canFloat:1,
            SA:3,
            profile:76.777,
            catastrophicLossOnPen:.2,
            fuelBurn:[.28,.18,.1],
            opRange:[282,434],
            urbanSurvivability:3                  
        },


    //Electronic Warfare vehicles/Systems//
        EW_RP377L:{//searches for, locates sources of, and jams VHF/UHF radio comms.
            type:3,
            mass:3.79,
            crew:3,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            troopcapacity:2,
            cargoBayTroopCapacity:12,
            bodyArmorLevel:.5,
            fuelcap:55.5,
            maxSpeed:[30.6,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.157,.102,.1],
            maxCargoWeight:[4.5,6],
            opRange:[353,543.7],
            urbanSurvivability:.25,     
        },
        EW_R330ZH:{//Detects, analyzes, tracks and jams sat and cell phone comms, also affective against drones
            type:5,
            mass:4,
            crew:3,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            troopcapacity:2,
            cargoBayTroopCapacity:12,
            bodyArmorLevel:.5,
            fuelcap:66.04,
            maxSpeed:[30.6,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1635,.1062,.15],
            maxCargoWeight:[4.5,6],
            opRange:[403.89,621.37],
            urbanSurvivability:.25,            
        },
        EW_1L222:{//passive ELINT system dedicated to locating and jamming airborne radars (including FCR) and datalinks for weapons
            type:5,
            mass:4,
            crew:4,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,3,5],
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:66.04,
            maxSpeed:[30.6,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1635,.1062,.15],
            maxCargoWeight:[4.5,6],
            opRange:[403.89,621.37],
            urbanSurvivability:.25,   
        },
        EW_MP32M1:{//Drone command vehicle for the Orlan-10 drone system. Actually uses the Kamaz 43114 chassis w/ a van body according to missilery, rn uses kamaz 43101 stats. 
            type:5,
            mass:13,
            crew:4,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            troopcapacity:4,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[31,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1765,.114,.1],
            maxCargoWeight:[6,8],
            opRange:[403.8,621.37],
            urbanSurvivability:.25,
        },
        EW_Orln10Ln:{//Drone launch and transport vehicle for the Orlan-10 vehicle, just a Kamaz 43101 because I have zero data
            type:5,
            mass:13,
            crew:2,
            vSupplies:[0,0,0,0,0,0,0,0],
            supplies:[1,0,0,0,0,2,4],
            troopcapacity:2,
            bodyArmorLevel:.5,
            fuelcap:71.3,
            maxSpeed:[31,52.81],
            canFloat:0,
            profile:1.8,
            catastrophicLossOnPen:.15,
            fuelBurn:[.1765,.114,.1],
            maxCargoWeight:[6,8],
            opRange:[403.8,621.37],
            urbanSurvivability:.25,
        },



        N_NULLVEHICLE:{
            type:0,
            mass:0,
            crew:0,
            vSupplies:[0,0,0,0,0,0,0,0],
            troopcapacity:0,
            supplies:0,
            armorLevel:0,
            fuelcap:0,
            maxSpeed:0,
            gunaccuracy:0,
            reloadtime:0,
            reloadtimeATGM:40,
            canreloadATGMunderFire:0,
            roundsCarried:[0,0,0],
            roundsInTurret:[0,0,0],
            maxRange:[0,0],
            power:[0,0],
            hasflir:0,
            haslaser:0,
            canFloat:0,
            SA:0,
            profile:[0,0],
            fuelBurn:[0,0,0],
            catastrophicLossOnPen:0,
            opRange:[0,0],
            urbanSurvivability:0,
        }


    },
    /*

PERSONNEL PROFILES
T : Troop
O : Officer
C : Crewman
P : Pilot
V : Vehicle driver



*/
    personnel:{
        T_Rifleman:{
            1:{
                value:2.8,
                primary:"W_AK74",
                primaryOptic:"1P78",
                supplies:[210,0,0,4,0,3,.4],
                suppliesPerHourCombat:[120,0,0,3,0,.04166,.16],
                suppliesPerHourOnFront:[12,0,0,.015,0,.04166,.1458],
                suppliesPerHourInReserve:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[2.4,0,0,.03,0,.04166,.135],
                moraleImpactOutOfAction:-5,
                effectivenessImpactOutOfAction:-5,
                cDI:[11.25,.1875,.0375,.0750],
                cDIWV:[9.75,.162,.032,.065],
                cD:[5.625,.0937,.0187,.0375],
                cDWV:[4.975,.0812,.0162,.0325],
            },
            2:{
                value:3.3,
                primary:"W_AK74",
                primaryOptic:"1P78",
                supplies:[210,0,0,3,0,3,.4],
                suppliesPerHourCombat:[102,0,0,2.55,0,.04166,.16],
                suppliesPerHourOnFront:[10.2,0,0,.1275,0,.04166,.1458],
                suppliesPerHourInReserve:[.255,0,0,0,0,0.04166,.116],
                suppliesPerHourPolicing:[2.04,0,0,.03,0,.04166,.135],
                moraleImpactOutOfAction:-5,
                effectivenessImpactOutOfAction:-5,
                cDI:[12.6,.21,.042,.084],
                cDIWV:[11.1,.185,.037,.074],
                cD:[6.3,.105,.021,.042],
                cDWV:[5.55,.0925,.0185,.037],
            },
            3:{
                value:3.2,
                primary:"W_AK74",
                primaryOptic:"1P78",
                supplies:[270,0,0,2,10,1,.2],
                suppliesPerHourCombat:[100,0,0,.5,4.5,.04166,.16],
                suppliesPerHourOnFront:[10,0,0,.015,.45,.04166,.1458],
                suppliesPerHourInReserve:[.25,0,0,0,.009,.04166,.116],
                suppliesPerHourPolicing:[.3,0,0,.005,.09,.04166,.135],
                secondary:"W_GP25",
                moraleImpactOutOfAction:-5,
                effectivenessImpactOutOfAction:-5,
                cDI:[10.2,.169,.033,.067], 
                cDIWV:[8.7,.145,.0289,.0579], 
                cD:[5.1,.0849,.0169,.0339],
                cDWV:[4.35,.0725,.0144,.0289],
            },
            4:{//this is a test module, the only one so far with an index of 4. It is used in cdist.reg1.btg1.co1.p1.s1.pProfiles[0]   
                /*
                    the purposed of this refactor is to optimize and upgrade all of the profiles. The goalposts of the sim have moved far beyond what was initially intended and thus there are a number of deprecated features to the code. For example,
                    sPH numbers are not useful at all because they are now to be calculated in runtime, as are cDI figures and potentially the value the soldier brings. Before the sim only took the supplies of each person...now they will take the entire dataset.
                    comparison between other units is only as difficult as looking above or below. This is a candidate profile to be used in place of Type 1 SLs. 



                */
                //this particular SL has some very gucci gear, with a load of ratnik kit at his disposal.
                value:0,//before this was an arbitrary value that was probably going to stay constant through runtime. Now it will be calculated every time the sim refreshes. 
                lethality:[0,0,0],//lethality against personnel/light vehicles, armored vehicles, airborne vehicles
                cC:[0,0,0,0],//chance of injury, death, desertion or suicide. Also to be calculated in runtime.
                pri:tComponents.weapons.rifle.W_SVD,//keeping this, it is currently presumed that soldiers will keep what they are initially issued.
                priEffectiveRange:0,
                secEffectiveRange:0,
                priCombinedWeight:0,
                secCombinedWeight:0,
                nightEffectiveRange:0,
                priOptic:tComponents.optics.o_PSO1,//new. Accounting for optics allows for more accurate simulation of battle and the capabilities of each soldier. It will also allow the sim to actually model the impact of better equipment amongst a force.  
                suppressor:tComponents.suppressors.s_PBS1,//increases lethality (harder to ID shot location), decreases casualty rates for the same reason, increases morale 
                uBGL:0,
                railAccessory:0,//rail mounted lights such as flashlights, lasers both IR and regular, IR floodbeams
                gripMod:tComponents.foreGrips.fg_S1,//bipods, dongs, etc.
                supplies:[270,270,0,2,10,1,.2],//keeping this but it will be modified in runtime.
                tSupplies:[0,200,0,2,10,1,.2],//this will serve as a reference for what the soldier should have to retain their baseline capabilities. 
                sPH:[0,0,0,0,0,0,0],//reducing 4 arrays of data down to one, this should save some space. sPH will be calculated in runtime. 
                sec:0,//secondary already existed but now is linked directly
                bArmor:tComponents.vests.v_6B45M,//body armor is now calculated for each soldier. Better body armor means lower rates of all casualties (even disertion, good kit improves morale!)
                nods:tComponents.helmetOptics.o_1PN139,//new, nods will now provide various increases to lethality and reductions in casualty rates
                earPro:tComponents.headSets.hs_GSSH01,//new, increases lethality in cqb, buffs morale, and reduces casualty rates
                comms:tComponents.pRadios.pr_R187P1E,//new, buffs morale, reduces casualty rates depending on type along with the presence of enemy commint and ew assets. 
                uniform:tComponents.uniforms.u_ratnik,//new, affects casualty rates and morale
                IFAK:tComponents.iFAKs.iFAK_Generic_1,//new, affects all casualty rates to widely varying levels, along with a slight buff to morale. 
                morale:100,//getting rid of morale cost as that will be calculated in runtime. With this as a stat it can be modified on an individual level and potentially impact casualty chances. 
                hCExperience:0,//adding this, with veterancy soldiers can become battlehardened and this will increase lethality while decreasing casualty rates. 
                hSLMeal:0,//adding this, this can impact other things in the dataset. May only become a factor if the soldier has no food.
                hSLDrink:0,//adding this for the same reason as above.
                hRIL48:18,//adding this for the same reason as above.
                hMBuff:1,//this may not be used but if it is it will allow for the modeling of the positive impacts of a trip to the rear area mess to a soldier's morale. 1 indicates that their last meal was a hot one. It will decrease with time after
                sBuff:1,//similar to the above, only it accounts for the recency of a hot shower. 
                lBuff:1,//buff received for having recently gotten clothes washed or replaced.
                iRBuff:1,//buff received for having spent time in reserve recently.
            }
        },
        T_SR_Rifleman:{
            1:{
                value:4.8,
                primary:"W_AK74",
                supplies:[210,0,0,4,10,4,.4],
                suppliesPerHourCombat:[110,0,0,4,10,.04166,.16],
                suppliesPerHourOnFront:[11,0,0,.2,1,.04166,.1458],
                suppliesPerHourInReserve:[.275,0,0,0,.025,.04166,.116],
                suppliesPerHourPolicing:[2.2,0,0,.04,.2,.04166,.135],
                cDI:[14.25,.237,.047,.095],
                cDIWV:[12.75,.2125,.0425,.085],
                cD:[7.125,.118,.023,.047],
                cDWV:[6.375,.106,.021,.042],
                secondary:"W_GP25",
                moraleImpactOutOfAction:-7,
                effectivenessImpactOutOfAction:-7,
            },
            2:{
                value:3.8,
                primary:"W_AK74",
                supplies:[270,0,0,4,0,2,.4],
                suppliesPerHourCombat:[93.5,0,0,4,0,.04166,.16],
                suppliesPerHourOnFront:[9.35,0,0,.2,0,.04166,.1458],
                suppliesPerHourInReserve:[.233,0,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[1.87,0,0,.04,0,.04166,.135],
                cDI:[12.149,.202,.040,.081],
                cDIWV:[10.649,.177,.035,.071],
                cD:[6.074,.101,.020,.040],
                cDWV:[5.324,.088,.017,.035],
                secondary:0,
                moraleImpactOutOfAction:-7,
                effectivenessImpactOutOfAction:-7,
            },
            3:{
                value:3.5,
                issuedPrimary:"W_AK74",
                supplies:[270,0,0,2,10,1,.2],
                suppliesPerHourCombat:[82.5,0,0,3,7.5,.04166,.16],
                suppliesPerHourOnFront:[8.25,0,0,.15,.75,.04166,.1458],
                suppliesPerHourInReserve:[.206,0,0,0,.01875,.04166,.116],
                suppliesPerHourPolicing:[1.65,0,0,.03,.15,.04166,.135],
                cDI:[10.2,.169,.033,.067],
                cDIWV:[8.7,.145,.028,.057],
                cD:[5.1,.084,.016,.033],
                cDWV:[4.35,.072,.014,.028],
                issuedSecondary:"W_GP25",
                moraleImpactOutOfAction:-7,
                effectivenessImpactOutOfAction:-7, 
            },
        },
        T_Asst_Grenadier:{
            1:{
                value:3.3,
                primary:"W_AK74",
                supplies:[120,0,0,4,0,3,.4],
                suppliesPerHourCombat:[110,0,0,4,0,.04166,.16],
                suppliesPerHourOnFront:[11,0,0,.4,0,.04166,.1458],
                suppliesPerHourInReserve:[.275,0,0,.004,0,0.04166,.116],
                suppliesPerHourPolicing:[2.2,0,0,.08,0,.04166,.135],
                cDI:[14.399,.24,.048,.096],
                cDIWV:[12.9,.215,.043,.086],
                cD:[7.199,.12,.024,.048],
                cDWV:[6.45,.107,.021,.043],
                secondary:0,
                moraleImpactOutOfAction:-5.5,
                effectivenessImpactOutOfAction:-6,     
            },
            2:{
                value:3.25,
                primary:"W_AK74",
                supplies:[120,0,0,3,0,2,.4],
                suppliesPerHourCombat:[93.5,0,0,3.4,0,.04166,.16],
                suppliesPerHourOnFront:[9.35,0,0,.34,0,.04166,.1458],
                suppliesPerHourInReserve:[.23375,0,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[1.87,0,0,.068,0,.04166,.135],
                cDI:[13.799,.229,.046,.092],
                cDIWV:[12.299,.205,.041,.082],
                cD:[6.899,.114,.023,.046],
                cDWV:[6.149,.102,.020,.041],
                secondary:0,
                moraleImpactOutOfAction:-5.5,
                effectivenessImpactOutOfAction:-6,
            },
            3:{
                value:3.2,
                primary:"W_AK74",
                supplies:[90,0,0,4,10,1,.2],
                suppliesPerHourCombat:[82.5,0,0,3,7,.04166,.16],
                suppliesPerHourOnFront:[8.25,0,0,.3,.7,.04166,.1458],
                suppliesPerHourInReserve:[.206,0,0,0,.00175,.04166,.116],
                suppliesPerHourPolicing:[1.65,0,0,0.06,0.15,.04166,.135],
                cDI:[11.7,.194,.039,.078],
                cDIWV:[10.2,.169,.033,.067],
                cD:[5.85,.097,.019,.039],
                cDWV:[5.1,.084,.016,.033],
                secondary:"W_GP25",
                moraleImpactOutOfAction:-5.5,
                effectivenessImpactOutOfAction:-6,
            },
        },
        T_Grenadier:{
            1:{
                value:5,
                primary:"W_AK74",
                supplies:[210,0,8,1,0,2,.4],
                suppliesPerHourCombat:[80,0,5.5,.3,0,.04166,.16],
                suppliesPerHourOnFront:[8,0,.55,.03,0,.04166,.1458],
                suppliesPerHourInReserve:[.2,0,.01375,0,0,.04166,.116],
                suppliesPerHourPolicing:[1.6,0,.11,.006,0,.04166,.135],
                cDI:[14.25,.237,.047,.095],
                cDIWV:[12.75,.212,.042,.085],
                cD:[7.125,.118,.023,.047],
                cDWV:[6.375,.106,.021,.042],
                secondary:"W_RPG7",
                moraleImpactOutOfAction:-7,
                effectivenessImpactOutOfAction:-7,    
            },
            2:{
                value:5,
                primary:"W_AK74",
                supplies:[210,0,8,1,0,2,.4],
                suppliesPerHourCombat:[68,0,4.675,.3,0,.04166,.16],
                suppliesPerHourOnFront:[6.8,0,.4675,.03,0,.04166,.1458],
                suppliesPerHourInReserve:[.17,0,.01168,0,0,.04166,.116],
                suppliesPerHourPolicing:[1.36,0,.0935,.006,0,.04166,.135],
                cDI:[11.999,.199,.04,.08],
                cDIWV:[10.5,.175,.034,.069],
                cD:[5.999,.099,.02,.04],
                cDWV:[5.25,.087,.017,.034],
                secondary:"W_RPG7",
                moraleImpactOutOfAction:-7,
                effectivenessImpactOutOfAction:-7,
            },
            3:{
                value:4,
                primary:"W_AK74",
                supplies:[210,0,8,1,0,1,.2],
                suppliesPerHourCombat:[60,0,4.125,.2249,0,.04166,.16],
                suppliesPerHourOnFront:[6,0,.4125,.02249,0,.04166,.1458],
                suppliesPerHourInReserve:[.15,0,.0103,0,0,.04166,.116],
                suppliesPerHourPolicing:[1.2,0,.0825,.004498,0,.04166,.135],
                cDI:[10.5,.175,.034,.069],
                cDIWV:[9,.15,.03,.06],
                cD:[5.25,.087,.017,.034],
                cDWV:[4.5,.075,.015,.03],
                secondary:"W_RPG7",
                moraleImpactOutOfAction:-7,
                effectivenessImpactOutOfAction:-7,   
            }
        },
        T_MG:{
            1:{
                value:4.5,
                primary:"W_PK",
                supplies:[0,800,0,1,0,2,.4],
                suppliesPerHourCombat:[0,800,0,2,0,.04166,.16],
                suppliesPerHourOnFront:[0,80,0,.2,0,.04166,.1458],
                suppliesPerHourInReserve:[0,2,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[0,16,0,.04,0,.04166,.135],
                cDI:[7.899,.131,.026,.052],
                cDIWV:[6.399,.106,.213,.042],
                cD:[3.949,.065,.013,.026],
                cDWV:[3.19,.053,.010,.021],
                issuedSecondary:0,
                moraleImpactOutOfAction:-6.8,
                effectivenessImpactOutOfAction:-6.8,        
            },
            2:{
                value:4.5,
                issuedPrimary:"W_PK",
                supplies:[0,600,0,1,0,2,.2],
                suppliesPerHourCombat:[0,680,0,1.7,0,.04166,.16],
                suppliesPerHourOnFront:[0,68,0,.17,0,.04166,.1458],
                suppliesPerHourInReserve:[0,1.7,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[0,13.6,0,.034,0,.04166,.135],
                cDI:[7.65,.127,.025,.051],
                cDIWV:[6.149,.102,.020,.041],
                cD:[3.825,.063,.012,.025],
                cDWV:[3.07,.051,.010,.020],
                secondary:0,
                moraleImpactOutOfAction:-6.8,
                effectivenessImpactOutOfAction:-6.8,
            },
            3:{
                value:4.5,
                primary:"W_PK",
                supplies:[0,400,0,1,0,2,.4],
                suppliesPerHourCombat:[0,600,0,1.5,0,.04166,.16],
                suppliesPerHourOnFront:[0,60,0,.15,0,.04166,.1458],
                suppliesPerHourInReserve:[0,1.5,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[0,12,0,.03,0,.04166,.135],
                cDI:[8.15,.135,.027,.054],
                cDIWV:[6.65,.110,.022,.044],
                cD:[4.074,.067,.013,.027],
                cDWV:[3.325,.055,.011,.022],
                secondary:0,
                moraleImpactOutOfAction:-6.8,
                effectivenessImpactOutOfAction:-6.8,
            },
        },
        T_SL:{
            1:{
                value:0,//before this was an arbitrary value that was probably going to stay constant through runtime. Now it will be calculated every time the sim refreshes. 
                lethality:[0,0,0],//lethality against personnel/light vehicles, armored vehicles, airborne vehicles
                cC:[0,0,0,0],//chance of injury, death, desertion or suicide. Also to be calculated in runtime.
                pri:tComponents.weapons.rifle.W_AK74M,//keeping this, it is currently presumed that soldiers will keep what they are initially issued.
                priEffectiveRange:0,
                secEffectiveRange:0,
                priCombinedWeight:0,
                secCombinedWeight:0,
                nightEffectiveRange:0,
                priOptic:tComponents.optics.o_1P78,//new. Accounting for optics allows for more accurate simulation of battle and the capabilities of each soldier. It will also allow the sim to actually model the impact of better equipment amongst a force.  
                suppressor:0,//increases lethality (harder to ID shot location), decreases casualty rates for the same reason, increases morale 
                uBGL:tComponents.weapons.uBGL.W_GP30,
                railAccessory:tComponents.railAccessories.ra_Klesch1L,//rail mounted lights such as flashlights, lasers both IR and regular, IR floodbeams
                gripMod:0,//bipods, dongs, etc.
                supplies:[270,0,0,2,10,1,.2],//keeping this but it will be modified in runtime.
                tSupplies:[270,0,0,2,10,1,.2],//this will serve as a reference for what the soldier should have to retain their baseline capabilities. 
                sPH:[0,0,0,0,0,0,0],//reducing 4 arrays of data down to one, this should save some space. sPH will be calculated in runtime. 
                sec:tComponents.weapons.uBGL.W_GP34,//secondary already existed but now is linked directly
                bArmor:tComponents.vests.v_6B45M,//body armor is now calculated for each soldier. Better body armor means lower rates of all casualties (even disertion, good kit improves morale!)
                nods:tComponents.helmetOptics.o_1PN138,//new, nods will now provide various increases to lethality and reductions in casualty rates
                earPro:tComponents.headSets.hs_GSSH01,//new, increases lethality in cqb, buffs morale, and reduces casualty rates
                comms:tComponents.pRadios.pr_R187P1E,//new, buffs morale, reduces casualty rates depending on type along with the presence of enemy commint and ew assets. 
                uniform:tComponents.uniforms.u_ratnik,//new, affects casualty rates and morale
                IFAK:tComponents.iFAKs.iFAK_Generic_1,//new, affects all casualty rates to widely varying levels, along with a slight buff to morale. 
                morale:100,//getting rid of morale cost as that will be calculated in runtime. With this as a stat it can be modified on an individual level and potentially impact casualty chances. 
                hCExperience:0,//adding this, with veterancy soldiers can become battlehardened and this will increase lethality while decreasing casualty rates. 
                hSLMeal:0,//adding this, this can impact other things in the dataset. May only become a factor if the soldier has no food.
                hSLDrink:0,//adding this for the same reason as above.
                hRIL48:18,//adding this for the same reason as above.
                hMBuff:1,//this may not be used but if it is it will allow for the modeling of the positive impacts of a trip to the rear area mess to a soldier's morale. 1 indicates that their last meal was a hot one. It will decrease with time after
                sBuff:1,//similar to the above, only it accounts for the recency of a hot shower. 
                lBuff:1,//buff received for having recently gotten clothes washed or replaced.
                iRBuff:1,//buff received for having spent time in reserve recently.

            },
            2:{
                value:8,
                primary:"W_AK74",
                supplies:[270,0,0,2,10,2,.4],
                suppliesPerHourCombat:[68,0,0,.17,5.1,.04166,.16],
                suppliesPerHourOnFront:[6.8,0,0,.017,.51,.04166,.1458],
                suppliesPerHourInReserve:[.17,0,0,0,.01275,.04166,.116],
                suppliesPerHourPolicing:[1.36,0,0,.003,.102,.04166,.135],
                cDI:[11.7,.194,.039,.078],
                cDIWV:[10.2,.169,.033,.067],
                cD:[5.85,.097,.019,.039],
                cDWV:[5.1,.084,.016,.033],
                secondary:"W_GP25",
                moraleImpactOutOfAction:-12,
                effectivenessImpactOutOfAction:-12,
            },
            3:{
                value:8,
                primary:"W_AK74",
                supplies:[270,0,0,2,10,1,.2],
                suppliesPerHourCombat:[60,0,0,.125,4.5,.04166,.16],
                suppliesPerHourOnFront:[6,0,0,.0125,.45,.04166,.1458],
                suppliesPerHourInReserve:[.15,0,0,0,.01125,.04166,.116],
                suppliesPerHourPolicing:[1.2,0,0,.0025,.09,.04166,.135],
                cDI:[10.2,.169,.033,.067],
                cDIWV:[8.7,.145,.028,.057],
                cD:[5.1,.084,.016,.033],
                cDWV:[4.35,.0725,.0144,.028],
                secondary:"W_GP25",
                moraleImpactOutOfAction:-12,
                effectivenessImpactOutOfAction:-12,
            },
            4:{//this is a test module, the only one so far with an index of 4. It is used in cdist.reg1.btg1.co1.p1.s1.pProfiles[0]   
                /*
                    the purposed of this refactor is to optimize and upgrade all of the profiles. The goalposts of the sim have moved far beyond what was initially intended and thus there are a number of deprecated features to the code. For example,
                    sPH numbers are not useful at all because they are now to be calculated in runtime, as are cDI figures and potentially the value the soldier brings. Before the sim only took the supplies of each person...now they will take the entire dataset.
                    comparison between other units is only as difficult as looking above or below. This is a candidate profile to be used in place of Type 1 SLs. 



                */
                //this particular SL has some very gucci gear, with a load of ratnik kit at his disposal.
                value:0,//before this was an arbitrary value that was probably going to stay constant through runtime. Now it will be calculated every time the sim refreshes. 
                lethality:[0,0,0],//lethality against personnel/light vehicles, armored vehicles, airborne vehicles
                cC:[0,0,0,0],//chance of injury, death, desertion or suicide. Also to be calculated in runtime.
                pri:tComponents.weapons.rifle.W_AK74M,//keeping this, it is currently presumed that soldiers will keep what they are initially issued.
                priEffectiveRange:0,
                secEffectiveRange:0,
                priCombinedWeight:0,
                secCombinedWeight:0,
                nightEffectiveRange:0,
                priOptic:tComponents.optics.o_1P78,//new. Accounting for optics allows for more accurate simulation of battle and the capabilities of each soldier. It will also allow the sim to actually model the impact of better equipment amongst a force.  
                suppressor:0,//increases lethality (harder to ID shot location), decreases casualty rates for the same reason, increases morale 
                uBGL:tComponents.weapons.uBGL.W_GP34,
                railAccessory:tComponents.railAccessories.ra_Klesch1L,//rail mounted lights such as flashlights, lasers both IR and regular, IR floodbeams
                gripMod:0,//bipods, dongs, etc.
                supplies:[270,0,0,2,10,1,.2],//keeping this but it will be modified in runtime.
                tSupplies:[270,0,0,2,10,1,.2],//this will serve as a reference for what the soldier should have to retain their baseline capabilities. 
                sPH:[0,0,0,0,0,0,0],//reducing 4 arrays of data down to one, this should save some space. sPH will be calculated in runtime. 
                sec:tComponents.weapons.uBGL.W_GP34,//secondary already existed but now is linked directly
                bArmor:tComponents.vests.v_6B45M,//body armor is now calculated for each soldier. Better body armor means lower rates of all casualties (even disertion, good kit improves morale!)
                nods:tComponents.helmetOptics.o_1PN138,//new, nods will now provide various increases to lethality and reductions in casualty rates
                earPro:tComponents.headSets.hs_GSSH01,//new, increases lethality in cqb, buffs morale, and reduces casualty rates
                comms:tComponents.pRadios.pr_R187P1E,//new, buffs morale, reduces casualty rates depending on type along with the presence of enemy commint and ew assets. 
                uniform:tComponents.uniforms.u_ratnik,//new, affects casualty rates and morale
                IFAK:tComponents.iFAKs.iFAK_Generic_1,//new, affects all casualty rates to widely varying levels, along with a slight buff to morale. 
                morale:100,//getting rid of morale cost as that will be calculated in runtime. With this as a stat it can be modified on an individual level and potentially impact casualty chances. 
                hCExperience:0,//adding this, with veterancy soldiers can become battlehardened and this will increase lethality while decreasing casualty rates. 
                hSLMeal:0,//adding this, this can impact other things in the dataset. May only become a factor if the soldier has no food.
                hSLDrink:0,//adding this for the same reason as above.
                hRIL48:18,//adding this for the same reason as above.
                hMBuff:1,//this may not be used but if it is it will allow for the modeling of the positive impacts of a trip to the rear area mess to a soldier's morale. 1 indicates that their last meal was a hot one. It will decrease with time after
                sBuff:1,//similar to the above, only it accounts for the recency of a hot shower. 
                lBuff:1,//buff received for having recently gotten clothes washed or replaced.
                iRBuff:1,//buff received for having spent time in reserve recently.

            },
        },
        T_Crewman:{
            1:{
                value:2.8,
                primary:"W_AK74",
                supplies:[180,0,0,2,0,3,1],
                suppliesPerHourCombat:[30,0,0,.75,0,.04166,.16],
                suppliesPerHourOnFront:[3,0,0,.075,0,.04166,.1458],
                suppliesPerHourInReserve:[0.075,0,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[.6,0,0,.015,0,.04166,.135],
                cDI:[9.6,.16,.032,.064],
                cDIWV:[8.10,.135,.027,.054],
                cD:[4.8,.08,.016,.032],
                cDWV:[4.05,.067,.0135,.027],
                moraleImpactOutOfAction:-5,
                effectivenessImpactOutOfAction:-5,
            },
            2:{
                value:8,
                primary:"W__AKS74U",
                supplies:[90,0,0,0,0,1,1],
                suppliesPerHourCombat:[1,0,0,.1,0,.04166,.16],
                suppliesPerHourOnFront:[.1,0,0,.01,0,.04166,.1458],
                suppliesPerHourInReserve:[.0025,0,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[.02,0,0,.002,0,.04166,.135],
                cDI:[10.5,.175,.034,.069],
                cDIWV:[9,.15,.03,.06],
                cD:[5.25,.087,.017,.034],
                cDWV:[4.5,.075,.015,.03],
                secondary:0,
                moraleImpactOutOfAction:-20,
                effectivenessImpactOutOfAction:-30,
            },
            3:{
                value:8,
                primary:"W__AKS74U",
                supplies:[90,0,0,0,0,1,1],
                suppliesPerHourCombat:[1,0,0,.1,0,.04166,.16],
                suppliesPerHourOnFront:[.1,0,0,.01,0,.04166,.1458],
                suppliesPerHourInReserve:[.0025,0,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[.02,0,0,.002,0,.04166,.135],
                cDI:[10.5,.175,.034,.069],
                cDIWV:[9,.15,.03,.06],
                cD:[5.25,.087,.017,.034],
                cDWV:[4.5,.075,.015,.03],
                secondary:0,
                moraleImpactOutOfAction:-20,
                effectivenessImpactOutOfAction:-25,
            },
            4:{
                value:0,//before this was an arbitrary value that was probably going to stay constant through runtime. Now it will be calculated every time the sim refreshes. 
                lethality:[0,0,0],//lethality against personnel/light vehicles, armored vehicles, airborne vehicles
                cC:[0,0,0,0],//chance of injury, death, desertion or suicide. Also to be calculated in runtime.
                pri:tComponents.weapons.rifle.W_AK74SU,//keeping this, it is currently presumed that soldiers will keep what they are initially issued.
                priEffectiveRange:0,
                secEffectiveRange:0,
                priCombinedWeight:0,
                secCombinedWeight:0,
                nightEffectiveRange:0,
                priOptic:0,//new. Accounting for optics allows for more accurate simulation of battle and the capabilities of each soldier. It will also allow the sim to actually model the impact of better equipment amongst a force.  
                suppressor:0,//increases lethality (harder to ID shot location), decreases casualty rates for the same reason, increases morale 
                uBGL:0,
                railAccessory:0,//rail mounted lights such as flashlights, lasers both IR and regular, IR floodbeams
                gripMod:0,//bipods, dongs, etc.
                supplies:[270,0,0,2,10,1,.2],//keeping this but it will be modified in runtime.
                tSupplies:[270,0,0,2,10,1,.2],//this will serve as a reference for what the soldier should have to retain their baseline capabilities. 
                sPH:[0,0,0,0,0,0,0],//reducing 4 arrays of data down to one, this should save some space. sPH will be calculated in runtime. 
                sec:0,//secondary already existed but now is linked directly
                bArmor:tComponents.vests.v_6B45L,//body armor is now calculated for each soldier. Better body armor means lower rates of all casualties (even disertion, good kit improves morale!)
                nods:0,//new, nods will now provide various increases to lethality and reductions in casualty rates
                earPro:tComponents.headSets.hs_GSSH01,//new, increases lethality in cqb, buffs morale, and reduces casualty rates
                comms:tComponents.pRadios.pr_R187P1E,//new, buffs morale, reduces casualty rates depending on type along with the presence of enemy commint and ew assets. 
                uniform:tComponents.uniforms.u_ratnik,//new, affects casualty rates and morale
                IFAK:tComponents.iFAKs.iFAK_Generic_1,//new, affects all casualty rates to widely varying levels, along with a slight buff to morale. 
                morale:100,//getting rid of morale cost as that will be calculated in runtime. With this as a stat it can be modified on an individual level and potentially impact casualty chances. 
                training:{//0: none, 1: crash course, 2: boot, 3 is boot+special training in the topic
                    armoredVehicle:3,
                    basicInfantry:2,
                    leadership:3,

                },
                hCExperience:0,//adding this, with veterancy soldiers can become battlehardened and this will increase lethality while decreasing casualty rates. 
                hSLMeal:0,//adding this, this can impact other things in the dataset. May only become a factor if the soldier has no food.
                hSLDrink:0,//adding this for the same reason as above.
                hRIL48:18,//adding this for the same reason as above.
                hMBuff:1,//this may not be used but if it is it will allow for the modeling of the positive impacts of a trip to the rear area mess to a soldier's morale. 1 indicates that their last meal was a hot one. It will decrease with time after
                sBuff:1,//similar to the above, only it accounts for the recency of a hot shower. 
                lBuff:1,//buff received for having recently gotten clothes washed or replaced.
                iRBuff:1,//buff received for having spent time in reserve recently.

            },
            AA_Tank_Cmdr_Trained_Green:{
                value:0,//before this was an arbitrary value that was probably going to stay constant through runtime. Now it will be calculated every time the sim refreshes. 
                lethality:[0,0,0],//lethality against personnel/light vehicles, armored vehicles, airborne vehicles
                cC:[0,0,0,0],//chance of injury, death, desertion or suicide. Also to be calculated in runtime.
                pri:tComponents.weapons.rifle.W_AK74SU,//keeping this, it is currently presumed that soldiers will keep what they are initially issued.
                priEffectiveRange:0,
                secEffectiveRange:0,
                priCombinedWeight:0,
                secCombinedWeight:0,
                nightEffectiveRange:0,
                priOptic:0,//new. Accounting for optics allows for more accurate simulation of battle and the capabilities of each soldier. It will also allow the sim to actually model the impact of better equipment amongst a force.  
                suppressor:0,//increases lethality (harder to ID shot location), decreases casualty rates for the same reason, increases morale 
                uBGL:0,
                railAccessory:0,//rail mounted lights such as flashlights, lasers both IR and regular, IR floodbeams
                gripMod:0,//bipods, dongs, etc.
                supplies:[270,0,0,2,10,1,.2],//keeping this but it will be modified in runtime.
                tSupplies:[270,0,0,2,10,1,.2],//this will serve as a reference for what the soldier should have to retain their baseline capabilities. 
                sPH:[0,0,0,0,0,0,0],//reducing 4 arrays of data down to one, this should save some space. sPH will be calculated in runtime. 
                sec:0,//secondary already existed but now is linked directly
                bArmor:tComponents.vests.v_6B45L,//body armor is now calculated for each soldier. Better body armor means lower rates of all casualties (even disertion, good kit improves morale!)
                nods:0,//new, nods will now provide various increases to lethality and reductions in casualty rates
                earPro:tComponents.headSets.hs_GSSH01,//new, increases lethality in cqb, buffs morale, and reduces casualty rates
                comms:tComponents.pRadios.pr_R187P1E,//new, buffs morale, reduces casualty rates depending on type along with the presence of enemy commint and ew assets. 
                uniform:tComponents.uniforms.u_ratnik,//new, affects casualty rates and morale
                IFAK:tComponents.iFAKs.iFAK_Generic_1,//new, affects all casualty rates to widely varying levels, along with a slight buff to morale. 
                morale:1,//getting rid of morale cost as that will be calculated in runtime. With this as a stat it can be modified on an individual level and potentially impact casualty chances. 
                specialty:"19Z",//MOS, yes I am using that and not AFSC. The USAF doesn't have tank crews. 
                hCExperience:0,//adding this, with veterancy soldiers can become battlehardened and this will increase lethality while decreasing casualty rates. 
                hSLMeal:0,//adding this, this can impact other things in the dataset. May only become a factor if the soldier has no food.
                hSLDrink:0,//adding this for the same reason as above.
                hRIL48:18,//adding this for the same reason as above.
                hMBuff:1,//this may not be used but if it is it will allow for the modeling of the positive impacts of a trip to the rear area mess to a soldier's morale. 1 indicates that their last meal was a hot one. It will decrease with time after
                sBuff:1,//similar to the above, only it accounts for the recency of a hot shower. 
                lBuff:1,//buff received for having recently gotten clothes washed or replaced.
                iRBuff:1,//buff received for having spent time in reserve recently.

            },
        },
        T_MANPADS:{
            1:{
                value:5,
                primary:"W_AK74",
                supplies:[90,0,0,3,0,3,.4],
                suppliesPerHourCombat:[110,0,0,2,0,.04166,.16],
                suppliesPerHourOnFront:[11,0,0,.2,0,.04166,.1458],
                suppliesPerHourInReserve:[.275,0,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[2.2,0,0,.04,0,.04166,.135],
                cDI:[11.1,.185,.037,.074],
                cDIWV:[9.6,.16,.032,.064],
                cD:[5.55,.092,.018,.037],
                cDWV:[4.8,.08,.016,.032],
                secondary:"W_SA18",
                secondaryWeaponStats:[.05,.01,.0015,.001],
                moraleImpactOutOfAction:-5.5,
                effectivenessImpactOutOfAction:-5,     
            },
            2:{
                value:5.5,
                primary:"W_AK74",
                supplies:[120,0,0,4,0,2,.4],
                suppliesPerHourCombat:[93.5,0,0,1.7,0,.04166,.16],
                suppliesPerHourOnFront:[9.35,0,0,.17,0,.04166,.1458],
                suppliesPerHourInReserve:[.23375,0,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[1.87,0,0,.034,0,.04166,.135], 
                cDI:[8.39,.139,.027,.055],
                cDIWV:[6.899,.114,.023,.046],
                cD:[4.199,.069,.013,.027],
                cDWV:[3.449,.057,.011,.023],
                secondary:"W_SA18",
                moraleImpactOutOfAction:-5.5,
                effectivenessImpactOutOfAction:-6,
            },
            3:{
                value:5.8,
                primary:"W_AK74",
                supplies:[120,0,0,3,0,1,.4],
                suppliesPerHourCombat:[82.5,0,0,1.5,0,.04166,.16],
                suppliesPerHourOnFront:[8.25,0,0,.15,0,.04166,.1458],
                suppliesPerHourInReserve:[.206,0,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[1.65,0,0,.03,0,.04166,.135],
                cDI:[7.05,.0117,.023,.047],
                cDIWV:[5.55,.092,.018,.037],
                cD:[3.525,.058,.011,.023],
                cDWV:[2.775,.046,.009,.018],
                secondary:"W_SA18",
                moraleImpactOutOfAction:-5.5,
                effectivenessImpactOutOfAction:-6,
            },
        },
        T_SVD:{
            1:{
                value:7,
                primary:"W_SVD",
                supplies:[0,120,0,2,0,4,.6],
                suppliesPerHourCombat:[0,60,0,1,0,.04166,.16],
                suppliesPerHourOnFront:[0,6,0,.1,0,.04166,.1458],
                suppliesPerHourInReserve:[0,.15,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[0,1.2,0,.02,0,.04166,.135],
                cDI:[12.45,.207,.041,.083],
                cDIWV:[10.95,.182,.036,.073],
                cD:[6.225,.103,.020,.041],
                cDWV:[5.47,.091,.018,.036],
                secondary:0,
                moraleImpactOutOfAction:-4,
                effectivenessImpactOutOfAction:-6
            },
            2:{
                value:7,
                primary:"W_SVD",
                supplies:[0,120,0,2,0,4,.6],
                suppliesPerHourCombat:[0,60,0,1,0,.04166,.16],
                suppliesPerHourOnFront:[0,6,0,.1,0,.04166,.1458],
                suppliesPerHourInReserve:[0,.15,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[0,1.2,0,.02,0,.04166,.135],
                cDI:[12.45,.207,.041,.083],
                cDIWV:[10.95,.182,.036,.073],
                cD:[6.225,.103,.020,.041],
                cDWV:[5.47,.091,.018,.036],
                secondary:0,
                moraleImpactOutOfAction:-4,
                effectivenessImpactOutOfAction:-6
            },
            3:{
                value:7,
                primary:"W_SVD",
                supplies:[0,120,0,2,0,4,.6],
                suppliesPerHourCombat:[0,60,0,1,0,.04166,.16],
                suppliesPerHourOnFront:[0,6,0,.1,0,.04166,.1458],
                suppliesPerHourInReserve:[0,.15,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[0,1.2,0,.02,0,.04166,.135],
                cDI:[12.45,.207,.041,.083],
                cDIWV:[10.95,.182,.036,.073],
                cD:[6.225,.103,.020,.041],
                cDWV:[5.47,.091,.018,.036],
                secondary:0,
                moraleImpactOutOfAction:-4,
                effectivenessImpactOutOfAction:-6
            }
        },
        S_Staffer:{
            1:{
                value:60,
                primary:"W_AKS74U",
                supplies:[60,0,0,0,0,8,4],
                suppliesPerHourCombat:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourOnFront:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourInReserve:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[.3,0,0,0,0,.04166,.116],
                moraleImpactOutOfAction:-4,
                effectivenessImpactOutOfImpact:-30        
            },     
            2:{
                value:60,
                primary:"W_AKS74U",
                supplies:[60,0,0,0,0,8,4],
                suppliesPerHourCombat:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourOnFront:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourInReserve:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[.3,0,0,0,0,.04166,.116],
                moraleImpactOutOfAction:-4,
                effectivenessImpactOutOfImpact:-30        
            },   
            3:{
                value:60,
                primary:"W_AKS74U",
                supplies:[60,0,0,0,0,8,4],
                suppliesPerHourCombat:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourOnFront:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourInReserve:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[.3,0,0,0,0,.04166,.116],
                moraleImpactOutOfAction:-4,
                effectivenessImpactOutOfImpact:-30        
            },  
        },
        S_Officer:{
            1:{
                value:60,
                primary:"W_AKS74U",
                supplies:[60,0,0,0,0,8,4],
                suppliesPerHourCombat:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourOnFront:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourInReserve:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[.3,0,0,0,0,.04166,.116],
                moraleImpactOutOfAction:-4,
                effectivenessImpactOutOfImpact:-30        
            },     
            2:{
                value:60,
                primary:"W_AKS74U",
                supplies:[60,0,0,0,0,8,4],
                suppliesPerHourCombat:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourOnFront:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourInReserve:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[.3,0,0,0,0,.04166,.116],
                moraleImpactOutOfAction:-4,
                effectivenessImpactOutOfImpact:-30        
            },   
            3:{
                value:60,
                primary:"W_AKS74U",
                supplies:[60,0,0,0,0,8,4],
                suppliesPerHourCombat:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourOnFront:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourInReserve:[.3,0,0,0,0,.04166,.116],
                suppliesPerHourPolicing:[.3,0,0,0,0,.04166,.116],
                moraleImpactOutOfAction:-4,
                effectivenessImpactOutOfImpact:-30        
            },       
        }
        
    },
    supplies:{
        A_545x39mm_Crate:{
            roundsInCrate:2160,
            weight:64,
            dimensions:[19.5,14,6],
        },
        A_762x54mm_Crate:{
            roundsInCrate:880,
            weight:58,
            dimensions:[19.5,14,6],
        },
        A_127x108mm_Crate:{
            roundsInCrate:170,
            weight:59.524,
            dimensions:[18.3,13.7,5.8],
        },
        A_PG7V_Rocket_Crate:{
            roundsInCrate:6,
            weight:110,
            dimensions:[42.5,20.5,11.5],
        },
        A_RGD5_Crate:{
            roundsInCrate:20,
            weight:25.4,
            dimensions:[18.5,13.3,5.5]
        },
        A_GP25_Crate:{
            roundsInCrate:20,
            weight:25.4,
            dimensions:[18.5,13.3,5.5]
        },
        S_IRP_Ration:{
            roundsInCrate:1,
            weight:4.6,
            dimensions:[10.39,7.48,4.02],
        },
        S_IRP_RationCrate:{
            roundsInCrate:7,
            weight:32.3,
            dimensions:[10.45,7.5,28.2],
        },
        S_DrinkingWaterContainer:{// container for water, roundsincrate refers to gallons
            roundsInCrate:5,
            dimensions:[18.8,13.7,6.8],
            weight:45.965,
        }

    },
};
const uComps = { //not used for much in runtime. Mostly used as a reference for filling out the AMil database.                      WHERE DRONES? ABKHAZ FORCES NEED OFFENSIVE DRONE CAPABILITY! 
    /* 
    Squad Comps are ordered Crewmen, SL, Gren, Asst. Gren, MG, Senior Rifle, Rifle, MANPADS,Snipers
    platoon comps are ordered truck, bmp1, bmp2, btr80, btr82
    company comps are ordered truck,bmp1, bmp2, btr80,btr82
    */

    squads:{
        //General logistics//
        SQ_LOGI_K_43101:{ //truck 'squad' driving the modern and widely used Kamaz 43101 cargo truck.
            disc:"A logistics unit comprised of 2 men and a Kamaz 43101 truck",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_Kamaz4310_Standard,
            TroopCarriedSupplies:[360,0,0,4,0,6,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,10],
            supplies:[2520,0,0,4,0,27,12],
            sPHC:[60,0,0,1.5,0,.083,.32],
            sPHOF:[6,0,0,.15,0,.083,.291],
            sPHIR:[.15,0,0,0,0,.083,.291],
            sPHP:[1.2,0,0,.03,0,.083,.27],        
        },       
        SQ_LOGI_U_375:{ //truck 'squad' driving the old, but not obsolete, Ural 375 truck
            disc:"A logistics unit comprised of 2 men and a Ural 375 truck",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_Ural375_Standard,
            TroopCarriedSupplies:[360,0,0,4,0,6,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,10],
            supplies:[2520,0,0,4,0,27,12],
            sPHC:[60,0,0,1.5,0,.083,.32],
            sPHOF:[6,0,0,.15,0,.083,.291],
            sPHIR:[.15,0,0,0,0,.083,.232],
            sPHP:[1.2,0,0,.03,0,.083,.27],        
        },
        SQ_LOGI_U_4320:{ //truck 'squad' driving the relatively old ural 4320 standard cargo truck. 
            disc:"A logistics unit comprised of 2 men and a Ural 4320 truck",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_Ural4320_Standard,
            TroopCarriedSupplies:[360,0,0,4,0,6,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,10],
            supplies:[2520,0,0,4,0,27,12],
            sPHC:[60,0,0,1.5,0,.083,.32],
            sPHOF:[6,0,0,.15,0,.083,.291],
            sPHIR:[.15,0,0,0,0,.083,.291],
            sPHP:[1.2,0,0,.03,0,.083,.27],        
        },
        SQ_LOGI_ATZ5:{ //truck 'squad' driving the ATZ-5 refueler, based on the ural 4320 truck. Backbone of the Abkhazian fuel resupply effort. 
            disc:"A logistics unit comprised of 1 man and an ATZ-5 fuel transport truck",
            members:[1,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_ATZ5_Fueler,
            TroopCarriedSupplies:[360,0,0,4,0,6,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,10],
            supplies:[2520,0,0,4,0,20,12],
            sPHC:[60,0,0,1.5,0,.083,.32],
            sPHOF:[6,0,0,.15,0,.083,.291],
            sPHIR:[.15,0,0,0,0,.083,.232],
            sPHP:[1.2,0,0,.03,0,.083,.27],                  
        },
        SQ_LOGI_ATS5:{
            disc:"A logistics unit comprised of 2 men and an ATS-5 water truck",
            members:[1,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_ATS5_Water,
            TroopCarriedSupplies:[360,0,0,4,0,6,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,7,1250],
            supplies:[2520,0,0,4,0,13,1252],
            sPHC:[60,0,0,1.5,0,.083,.32],
            sPHOF:[6,0,0,.15,0,.083,.291],
            sPHIR:[.15,0,0,0,0,.083,.232],
            sPHP:[1.2,0,0,.03,0,.083,.27],                  
        },


        //APCs//
        SQ_TruckInfantry:{
            disc:"A basic but well rounded infantry squad that rides in a Ural 4320 general purpose truck. Unconstrained by the size limits of an armored vehicle, this squad has a lot of man and firepower along with supplies aplenty",
            members:[1,1,1,1,1,1,3,0,0,0,0],
            vehicle:components.vehicles.Truck_Ural4320_TroopCarrier,
            vehicleRations:components.vehicles.Truck_Ural4320_TroopCarrier.supplies[5]*components.supplies.S_IRP_RationCrate.roundsInCrate,
            TroopCarriedSupplies:[1620,800,8,26,20,26,4.2],
            vehicleCarriedSupplies:[6480,1760,6,20,40,28,20],
            supplies:[8100,2560,14,46,60,54,24.2],
            sPHC:[770,800,5.5,20.3,16,.37,1.44],
            sPHOF:[77,80,.55,.975,1.6,.374,1.31],
            sPHIR:[1.924,2,.013,.004,.04,.374,1.044],
            sPHP:[15.399,16,.11,.276,.32,.374,1.215]

        },
        SQ_TruckInfantryCompanyC2:{
            disc:"The headquarters squad of a company of Abkhaz truck infantry",
            members:[1,1,1,1,1,1,3,0,0,2,1],
            vehicle:components.vehicles.Truck_Ural4320_TroopCarrier,
            vehicleRations:components.vehicles.Truck_Ural4320_TroopCarrier.supplies[5]*components.supplies.S_IRP_RationCrate.roundsInCrate,
            TroopCarriedSupplies:[1800,800,8,26,20,50,16.2],
            vehicleCarriedSupplies:[6480,1760,6,20,40,28,20],
            supplies:[8280,2560,14,46,60,78,36.2],

        },
        SQ_BTR80Infantry:{
            disc:"An infantry squad transported in a BTR-80 APC",
            members:[3,1,1,1,1,1,2,0,0,0,0],
            vehicle:components.vehicles.APC_BTR80,
            TroopCarriedSupplies:[1560,600,8,17,10,19,5.6],
            vehicleCarriedSupplies:[6480,1760,6,20,20,21,25],
            supplies:[8040,2360,14,37,30,40,30.6],
            sPHC:[530,680,4.675,14.97,5.1,.416,1.6],
            sPHOF:[53,68,.467,1.042,.51,.4166,1.458],
            sPHIR:[1.324,1.7,.011,0,.012,.4166,1.16],
            sPHP:[10.6,13.6,.093,.217,.102,.416,1.35],
        },
        SQ_BTR80Recon:{
            disc:"A special, heavily armed and highly mobile squad that is designed to operate on their own for several days and execute special missions, possibly behind enemy lines",
            members:[3,1,2,2,0,0,0,1,1,0,0],
            vehicle:components.vehicles.APC_BTR80,
            TroopCarriedSupplies:[1320,120,16,16,10,19,6],
            vehicleCarriedSupplies:[6480,1760,6,20,20,21,25],
            supplies:[7800,1880,22,36,30,40,31],
            sPHC:[530,680,4.675,14.97,5.1,.416,1.6],
            sPHOF:[53,68,.467,1.042,.51,.4166,1.458],
            sPHIR:[1.324,1.7,.011,0,.012,.4166,1.16],
            sPHP:[10.6,13.6,.093,.217,.102,.416,1.35],
        },
        SQ_BTR82Infantry:{
            disc:"An abkhaz infanty squad transported in the modernized BTR-82A APC",
            members:[2,1,1,1,1,1,3,0,0,0,0],
            vehicle:components.vehicles.APC_BTR82,
            TroopCarriedSupplies:[1680,600,8,20,10,21,5],
            vehicleCarriedSupplies:[6480,1760,6,20,20,28,25],
            supplies:[8160,2360,14,40,30,49,30],
            sPHC:[631,680,4.675,17.419,5.1,.416,1.6],
            sPHOF:[63.099,68,.467,1.159,.51,.416,1.458],
            sPHIR:[1.576,1.7,.011,0,.012,.416,1.16],
            sPHP:[12.620,13.6,.093,.245,.102,.416,1.35]
        },
        SQ_TruckMANPADS:{
            disc:"truck-mounted infantry squad that carries 2 MANPADs operators",
            members:[1,1,1,1,1,1,1,2,0,0,0],
            vehicle:components.vehicles.Truck_Ural4320_TroopCarrier,
            TroopCarriedSupplies:[1380,800,8,24,20,26,4.2],
            vehicleCarriedSupplies:[6480,1760,6,20,40,21,20],
            supplies:[7860,2560,14,44,60,47,24.2],
            sPHC:[750,800,5.5,18.3,16,.374,1.440],
            sPHOF:[75,80,.55,1.345,1.6,.374,1.312],
            sPHIR:[1.875,2,.013,.004,.04,.374,1.04],
            sPHP:[15,16,.11,.296,.32,.374,1.215],       
        },
        SQ_BTR80MANPADS:{
            disc:"BTR-80-equipped squad that has two MANPADs operators",
            members:[3,1,0,0,1,1,1,2,0,0,0],
            vehicle:components.vehicles.APC_BTR80,
            TroopCarriedSupplies:[1260,600,0,18,10,16,5.2],
            vehicleCarriedSupplies:[6480,1760,6,20,20,21,25],
            supplies:[7740,2360,6,38,30,37,30.2],
            sPHC:[620,800,0,15.5,16,.374,1.44],
            sPHOF:[45.349,68,0,.884,.51,.374,1.312],
            sPHIR:[1.55,2,0,0,.04,.374,1.04],
            sPHP:[12.4,16,0,.24,.32,.374,1.215],
        },
        SQ_Sniper:{
            disc:"Truck mounted squad specializing in long range warfare against other infantry on front lines or in defensive positions",
            members:[1,1,0,0,0,1,2,1,4,0,0],
            vehicle:components.vehicles.Truck_Ural4320_TroopCarrier,
            TroopCarriedSupplies:[9,480,0,27,20,35,5.4],//0 is supposed to be 1170
            vehicleCarriedSupplies:[6480,1760,6,20,40,21,6],// 6 is supposed to be 20
            supplies:[7650,2240,6,3,60,56,25.4],// 3 is supposed to be 47
            sPHC:[570,240,0,17,16,.4166,1.6],
            sPHOF:[57,24,0,.93,1.6,.416,1.458],
            sPHIR:[1.424,.6,0,0,.04,.4166,1.3],
            sPHP:[11.399,4.8,0,.24,.32,.416,1.35]
        },


        //IFVs//
        SQ_BMP1Infantry:{
            disc:"BMP-1 with supporting infantry squad",
            members:[3,1,1,1,1,1,2,0,0,0,0],
            vehicle:components.vehicles.IFV_BMP1,
            TroopCarriedSupplies:[1650,400,8,14,50,11,4.6],
            vehicleCarriedSupplies:[4320,1760,6,20,60,21,30],
            supplies:[5970,2160,14,34,110,32,34.6],
        },
        SQ_BMP2Infantry:{
            disc:"BMP-2 with supporting infantry squad",
            members:[3,1,1,1,1,1,1,0,0,0,0],
            vehicle:components.vehicles.IFV_BMP2, 
            TroopCarriedSupplies:[1380,400,8,12,40,10,4.4],
            vehicleCarriedSupplies:[4320,1760,6,20,20,21,30],
            supplies:[5730,2160,14,32,60,31,34.4],
        },
        SQ_BTRD:{
            disc:"BTR-D vehicle with mounted Kornet launcher. Despite being an IFV it has no infantry support",
            members:[3,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.IFV_BTR_RD,
            TroopCarriedSupplies:[270,0,0,0,0,3,3],
            vehicleCarriedSupplies:[2160,1760,0,0,0,14,15],
            supplies:[2430,1760,0,0,0,17,18],
            sPHC:[3,0,0,.3,0,.124,.48],
            sPHOF:[.3,0,0,.03,0,.124,.437],
            sPHIR:[.007,0,0,0,0,.124,.348],
            sPHP:[.06,0,0,.006,0,.124,.405],
        },
        

        //Tanks//
        SQ_T72:{
            disc:"T-72B operated by 3 men",
            members:[3,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.MBT_T72B,
            TroopCarriedSupplies:[270,0,0,0,0,3,3],
            vehicleCarriedSupplies:[2160,1760,0,0,0,14,5],
            supplies:[2430,1760,0,0,0,17,8],
            sPHC:[3,0,0,.3,0,.124,.48],
            sPHOF:[.3,0,0,.03,0,.124,.437],
            sPHIR:[.007,0,0,0,0,.124,.348],
            sPHP:[.06,0,0,.006,0,.124,.405],
        },
        SQ_T72C2:{
            disc:"T-72B with extra comms equipment and crewed by 2 men and an officer. Used to lead T-72 tank companies",
            members:[2,0,0,0,0,0,0,0,0,0,1],
            vehicle:components.vehicles.MBT_T72B,
            TroopCarriedSupplies:[270,0,0,0,0,3,3],
            vehicleCarriedSupplies:[2160,1760,0,0,0,14,5],
            supplies:[2430,1760,0,0,0,17,8],
            sPHC:[3,0,0,.3,0,.124,.48],
            sPHOF:[.3,0,0,.03,0,.124,.437],
            sPHIR:[.007,0,0,0,0,.124,.348],
            sPHP:[.06,0,0,.006,0,.124,.405],
        },
        SQ_T72B3:{  
            disc:"T-72B3 (upgraded T- 72B) with 3 crewmen",
            members:[3,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.MBT_T72B3,
            TroopCarriedSupplies:[270,0,0,0,0,3,3],
            vehicleCarriedSupplies:[2160,1760,0,0,0,14,15],
            supplies:[2430,1760,0,0,0,17,18],
            sPHC:[3,0,0,.3,0,.124,.48],
            sPHOF:[.3,0,0,.03,0,.124,.437],
            sPHIR:[.007,0,0,0,0,.124,.348],
            sPHP:[.06,0,0,.006,0,.124,.405],
        },

        //Artillery//
        SQ_2S3:{
            disc:"2S3 Akatsya 152mm self-propelled howitzer with 4 crewmen",
            members:[4,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.SPA_2S3,
            TroopCarriedSupplies:[360,0,0,0,0,4,4],
            vehicleCarriedSupplies:[2160,0,0,20,0,28,20],
            supplies:[2520,0,0,20,0,32,24],
            sPHC:[4,0,0,.4,0,.166,.64],
            sPHOF:[.4,0,0,.04,0,.166,.5832],
            sPHIR:[.01,0,0,0,0,.166,.464],
            sPHP:[.08,0,0,.008,0,.166,.54],            
        },
        SQ_2S3M1:{
            disc:"2S3M1 improved Akatsya 152mm self-propelled howitzer with 4 crewmen",
            members:[4,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.SPA_2S3M1,
            TroopCarriedSupplies:[360,0,0,0,0,4,4],
            vehicleCarriedSupplies:[2160,0,0,20,0,28,20],
            supplies:[2520,0,0,20,0,32,24],
            sPHC:[4,0,0,.4,0,.166,.64],
            sPHOF:[.4,0,0,.04,0,.166,.5832],
            sPHIR:[.01,0,0,0,0,.166,.464],
            sPHP:[.08,0,0,.008,0,.166,.54],            
        },
        SQ_BM21:{
            disc:"BM-21 Grad 122mm MRL with 3 men",
            members:[3,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.SPA_BM21,
            TroopCarriedSupplies:[270,0,0,6,0,3,3],
            vehicleCarriedSupplies:[2160,0,0,20,0,28,20],
            supplies:[2430,0,0,20,0,31,23],
            sPHC:[3,0,0,.3,0,.124,.48],
            sPHOF:[.3,0,0,.03,0,.124,.437],
            sPHIR:[.0075,0,0,0,0,.124,.348],
            sPHP:[.06,0,0,.006,0,.124,.405],    
        },
        SQ_BM30:{
            disc:"BM-30 Smerch 300mm HMRL with a 4 man crew. The backbone of Abkhaz and Russian precision firepower",
            members:[4,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.SPA_9A52,
            TroopCarriedSupplies:[270,0,0,6,0,3,3],
            vehicleCarriedSupplies:[2160,0,0,20,0,28,20],
            supplies:[2430,0,0,20,0,31,23],
            sPHC:[3,0,0,.3,0,.124,.48],
            sPHOF:[.3,0,0,.03,0,.124,.437],
            sPHIR:[.0075,0,0,0,0,.124,.348],
            sPHP:[.06,0,0,.006,0,.124,.405],    
        },

        //Artillery Counterbattery//
        SQ_CB_1L219:{
            members:[1,0,0,0,0,0,0,0,0,2,0],//last two are staffer, officer
            disc:"Zoopark-1 1L219 counterbattery radar",
            vehicle:components.vehicles.CB_1L219,
            TroopCarriedSupplies:[540,0,0,2,0,51,25],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,20],
            supplies:[2700,0,0,2,0,72,45],
            sPHC:[31.8,0,0,.75,0,.291,.856],
            sPHOF:[4.8,0,0,.075,0,.291,.841],
            sPHIR:[1.875,0,0,0,0,.291,.812],
            sPHP:[2.4,0,0,.015,0,.291,.831],        
        },   
        //Artillery ammunition carriers/transloaders// 
        SQ_2S3_Resupply:{
            disc:"Generic cargo truck carrying extra rounds for the 2S3 Akatsya howitzer. 2 man crew",
            members:[2,0,0,0,0,0,0,0,0,0,0],            
            vehicle:components.vehicles.Truck_2S3_RoundCarrier,
            TroopCarriedSupplies:[360,0,0,4,0,6,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,28,20],
            supplies:[2520,0,0,4,0,34,22],
            sPHC:[60,0,0,1.5,0,.083,.32],
            sPHOF:[6,0,0,.15,.083,.291],
            sPHIR:[.15,0,0,0,0,.083,.232],
            sPHP:[1.2,0,0,.03,0,.083,.27],    
        },
        SQ_9T254_BM21_Resupplier:{
            disc:"9T254 round carrier/transloader for the BM-21 grad",
            members:[2,0,0,0,0,0,0,0,0,0,0],            
            vehicle:components.vehicles.Truck_9T254_BM21GradResupplier,
            TroopCarriedSupplies:[360,0,0,4,0,6,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,28,15],
            supplies:[2520,0,0,0,0,34,17],
            sPHC:[60,0,0,1.5,0,.083,.32],
            sPHOF:[6,0,0,.15,0,.083,.291],
            sPHIR:[.15,0,0,0,0,.083,.232],
            sPHP:[1.2,0,0,.03,0,.083,.27],   
        },
        SQ_9T234_BM30_Resupplier:{
            disc:"9T234 round carrier/translader for the BM-30 smerch",
            members:[4,0,0,0,0,0,0,0,0,0,0],            
            vehicle:components.vehicles.Truck_9T234_2_BM30SmerchResupplier,
            TroopCarriedSupplies:[360,0,0,0,0,4,4],
            vehicleCarriedSupplies:[2160,0,0,0,0,42,30],
            supplies:[2520,0,0,0,0,46,34],
            sPHC:[4,0,0,.4,0,.166,.64],
            sPHOF:[.4,0,0,.04,0,.166,.583],
            sPHIR:[.01,0,0,0,0,.166,.464],
            sPHP:[.08,0,0,.008,0,.166,.54],                
        },


        //Artillery specific command systems//
        SQ_1K123:{//command vehicle for the 9A52
            disc:"1K123 command vehicle specialized for controlling BM-30 smerch batteries",
            members:[1,0,0,0,0,0,0,0,0,3,1],//last two are staffer, officer
            vehicle:components.vehicles.C2_1K123,
            TroopCarriedSupplies:[540,0,0,2,0,51,25],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,20],
            supplies:[2700,0,0,2,0,72,45],
            sPHC:[31.8,0,0,.75,0,.291,.856],
            sPHOF:[4.8,0,0,.075,0,.291,.841],
            sPHIR:[1.875,0,0,0,0,.291,.812],
            sPHP:[2.4,0,0,.015,0,.291,.831],
        },
        SQ_BAT_C2_1V18:{
            disc:"1V18 command vehicle with crew, used for control of BM-21 Grad batteries, possibly other groups",
            members:[2,0,0,0,0,0,0,0,0,3,1],
            vehicle:components.vehicles.C2_1V18,
            TroopCarriedSupplies:[600,0,0,4,0,38,18],
            vehicleCarriedSupplies:[2160,0,6,0,0,28,20],
            supplies:[2760,0,6,4,0,66,38],
            sPHC:[61.199,0,0,1.5,0,.249,.784],
            sPHOF:[7.2,0,0,.15,0,.249,.755],
            sPHIR:[1.349,0,0,0,0,.249,.696],
            sPHP:[2.399,0,0,.03,0,.249,.734],
        },
        SQ_C2_1V14:{
            disc:"1V14 MTLB-based C2 vehicle for artillery batteries",
            members:[2,0,0,0,0,0,0,0,0,2,1],
            vehicle:components.vehicles.C2_1V14,
            TroopCarriedSupplies:[540,0,0,4,0,30,14],
            vehicleCarriedSupplies:[2160,0,0,20,0,21,25],
            supplies:[2700,0,0,24,0,51,39],
            sPHC:[60.9,0,0,1.5,0,.2083,.668],
            sPHOF:[6.899,0,0,.15,0,.2083,.639],
            sPHIR:[1.05,0,0,0,0,.2083,.58],
            sPHP:[2.099,0,0,.03,0,.2083,.618],
        },
        SQ_C2_1V13:{
            disc:"1v13 MTLB-based command and recon, FDC functions explicitly for motorized howitzer batteries ",
            members:[2,0,0,0,0,0,0,0,0,3,1],
            vehicle:components.vehicles.C2_1V13,
            TroopCarriedSupplies:[600,0,0,4,0,38,18],
            vehicleCarriedSupplies:[2160,0,6,0,0,28,20],
            supplies:[2760,0,6,4,0,66,38],
            sPHC:[61.199,0,0,1.5,0,.249,.784],
            sPHOF:[7.2,0,0,.15,0,.249,.755],
            sPHIR:[1.34,0,0,0,0,.249,.696],
            sPHP:[2.399,0,0,.03,0,.249,.734],
        },
        SQ_C2_1V111:{// generic command and control staff group, driving the older Zil-131-based 1V111 Command and Control vehicle. Most notably present as the HQ of a BTG's logistics company. 
            disc:"generic 1V111 Zil-based command squad",
            members:[2,0,0,0,0,0,0,0,0,2,1],
            vehicle:components.vehicles.C2_1V111,
            TroopCarriedSupplies:[540,0,0,4,0,30,14],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,25],
            supplies:[2700,0,0,4,0,51,39],
            sPHC:[60.9,0,0,1.5,0,.208,.688],
            sPHOF:[6.899,0,0,.15,0,.208,.639],
            sPHIR:[1.05,0,0,0,0,.208,.580],
            sPHP:[2.099,0,0,.03,0,.208,.618],            
        },


        //Artillery specific maintenance vehicles


        //SAMS//
        SQ_TELAR_9A310:{
            disc:"9A310 Transport Erector Launcher and Radar for the SA11",
            members:[4,0,0,0,0,0,0,0,0,0,0],            
            vehicle:components.vehicles.TELAR_9A310,
            TroopCarriedSupplies:[360,0,0,0,0,4,4],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,25],
            supplies:[2520,0,0,0,0,25,29],
            sPHC:[4,0,0,.4,0,.166,.64],
            sPHOF:[.4,0,0,.04,0,.166,.583],
            sPHIR:[.01,0,0,0,0,.166,.464],
            sPHP:[.08,0,0,.008,0,.166,.54],             
        },
        SQ_TEL_9A39:{
            disc:"9A39 TEL and reloader for the SA-11",
            members:[4,0,0,0,0,0,0,0,0,0,0],            
            vehicle:components.vehicles.TEL_9A39,
            TroopCarriedSupplies:[360,0,0,0,0,4,4],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,20],
            supplies:[2520,0,0,0,0,25,24],
            sPHC:[4,0,0,.4,0,.166,.64],
            sPHOF:[.4,0,0,.04,0,.166,.583],
            sPHIR:[.01,0,0,0,0,.166,.464],
            sPHP:[.08,0,0,.008,0,.166,.54],   
        },
        SQ_TELAR_9K33:{
            disc:"9K33 SA-8 standalone SAM system",
            members:[5,0,0,0,0,0,0,0,0,0,0],            
            vehicle:components.vehicles.TELAR_9K33,
            TroopCarriedSupplies:[450,0,0,0,0,5,5],
            vehicleCarriedSupplies:[2160,0,0,0,0,28,20],
            supplies:[2610,0,0,0,0,33,25],
            sPHC:[5,0,0,.5,0,.208,.8],
            sPHOF:[.5,0,0,.05,0,.208,.729],
            sPHIR:[.012,0,0,0,0,.208,.58],
            sPHP:[.1,0,0,.01,0,.208,.675],              
        },
        SQ_TELAR_9K330:{
            disc:"9K330 SA-15 standalone SAM system",
            members:[3,0,0,0,0,0,0,0,0,0,0],            
            vehicle:components.vehicles.TELAR_9K330,
            TroopCarriedSupplies:[270,0,0,0,0,3,3],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,20],
            supplies:[2430,0,0,0,0,24,23],
            sPHC:[3,0,0,.3,0,.124,.48],
            sPHOF:[.3,0,0,.03,0,.124,.437],
            sPHIR:[.007,0,0,0,0,.124,.348],
            sPHP:[.06,0,0,.006,0,.124,.405],         
        },

        //SAM ammunition carriers/transloaders//
        SQ_9T217_SA8_Resupplier:{
            disc:"9T217 amphibious round transloader for the SA-8",
            members:[3,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_9T217_SA8OsaResupplier,
            TroopCarriedSupplies:[540,0,0,6,0,9,3],
            vehicleCarriedSupplies:[2160,1760,0,0,0,14,10],
            supplies:[2700,1760,0,6,0,23,13],
            sPHC:[90,0,0,2.25,0,.124,.48],
            sPHOF:[9,0,0,.224,0,.124,.437],
            sPHIR:[.224,0,0,0,0,.124,.348],
            sPHP:[1.79,0,0,.045,0,.124,.405],           
        },
        SQ_9T243_SA11_Resupplier:{
            disc:"9T243 transloader for the SA-11",
            members:[2,0,0,0,0,0,0,0,0,0,0],            
            vehicle:components.vehicles.Truck_9T243_SA11BukResupplier,
            TroopCarriedSupplies:[360,0,0,4,0,6,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,28,10],
            supplies:[2520,0,0,4,0,34,12],
            sPHC:[60,0,0,1.5,0,.083,.32],
            sPHOF:[6,0,0,.15,.083,.291],
            sPHIR:[.15,0,0,0,0,.083,.232],
            sPHP:[1.2,0,0,.03,0,.083,.27],   
        },
        SQ_9T245_SA15_RoundCarrier:{
            disc:"9T245 round carrier for the SA-15. Cannot transfer missiles on it's own, instead relying on the 9T244",
            members:[1,0,0,0,0,0,0,0,0,0,0],            
            vehicle:components.vehicles.Truck_9T245_SA15TorRoundCarrier,
            TroopCarriedSupplies:[360,0,0,4,0,6,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,28,20],
            supplies:[2520,0,0,4,0,34,22],
            sPHC:[60,0,0,1.5,0,.083,.32],
            sPHOF:[6,0,0,.15,.083,.291],
            sPHIR:[.15,0,0,0,0,.083,.232],
            sPHP:[1.2,0,0,.03,0,.083,.27],         
        },
        SQ_9T244_SA15_Resupplier:{
            disc:"9T244 transloader for the SA-15",
            members:[2,0,0,0,0,0,0,0,0,0,0],            
            vehicle:components.vehicles.Truck_9T244_SA15TorResupplier,
            TroopCarriedSupplies:[360,0,0,4,0,6,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,28,20],
            supplies:[2520,0,0,4,0,34,22],
            sPHC:[60,0,0,1.5,0,.083,.32],
            sPHOF:[6,0,0,.15,.083,.291],
            sPHIR:[.15,0,0,0,0,.083,.232],
            sPHP:[1.2,0,0,.03,0,.083,.27],         
        },

        //SAM specific command systems//
        SQ_BAT_C2_9C470M1:{
            disc:"9C470M1 C2 vehicle specific to the SA-11 'Buk' SAM system",
            members:[2,0,0,0,0,0,0,0,0,2,1],
            vehicle:components.vehicles.C2_9C470M1,
            TroopCarriedSupplies:[540,0,0,4,0,30,14,],
            vehicleCarriedSupplies:[2160,0,0,0,0,28,25,],
            supplies:[2700,0,0,4,0,58,39],
            sPHC:[60.9,0,0,1.5,0,.208,.668],
            sPHOF:[6.89,0,0,.15,0,.208,.639],
            sPHIR:[1.05,0,0,0,0,.2083,.580],
            sPHP:[2.09,0,0,.03,0,.2083,.618],
        },
        SQ_C2_PPRU1:{
            disc:"PPRU1 command and control vehicle for an SA-15 battery",
            members:[1,0,0,0,0,0,0,0,0,2,1],
            vehicle:components.vehicles.C2_PPRU_1,
            TroopCarriedSupplies:[360,0,0,2,0,27,13],
            vehicleCarriedSupplies:[2160,0,0,0,0,28,25],
            supplies:[2520,0,0,2,0,55,38],
            sPHC:[30.9,0,0,.75,0,.166,.508],
            sPHOF:[3.9,0,0,.075,0,.166,.493],
            sPHIR:[.974,0,0,0,0,.166,.464],
            sPHP:[1.5,0,0,.015,0,.166,.483], 
        },
        SQ_C3_9S737:{
            disc:"9S737 command,control and comms vehicle for SA-13,15,17 and 19 SAM batteries.",
            members:[1,0,0,0,0,0,0,0,0,3,1],
            vehicle:components.vehicles.C2_PPRU_1,
            TroopCarriedSupplies:[360,0,0,2,0,27,13],
            vehicleCarriedSupplies:[2160,0,0,0,0,28,25],
            supplies:[2520,0,0,2,0,55,38],
            sPHC:[30.9,0,0,.75,0,.166,.508],
            sPHOF:[3.9,0,0,.075,0,.166,.493],
            sPHIR:[.974,0,0,0,0,.166,.464],
            sPHP:[1.5,0,0,.015,0,.166,.483], 
        },

        //SAM specific radar systems//
        SQ_SR_9S18M1:{
            disc:"9S18M1 'Snow Drift' SA-11 search radar",
            members:[3,0,0,0,0,0,0,0,0,0,0],            
            vehicle:components.vehicles.SR_9S18M1,
            TroopCarriedSupplies:[270,0,0,0,0,3,3],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,20],
            supplies:[2430,0,0,0,0,24,23],
            sPHC:[3,0,0,.3,0,.124,.48],
            sPHOF:[.3,0,0,.03,0,.124,.437],
            sPHIR:[.007,0,0,0,0,.124,.348],
            sPHP:[.06,0,0,.006,0,.124,.405],            
        },

        //SAM specific maintenance vehicles//
        SQ_MAINT_9V887:{
            disc:"9V887",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_9V887,
            TroopCarriedSupplies:[180,0,0,0,0,2,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,20],
            supplies:[2340,0,0,0,0,16,22],
            sPHC:[2,0,0,.2,0,.083,.32],
            sPHOF:[.2,0,0,.02,0,.083,.291],
            sPHIR:[.005,0,0,0,0,.083,.23],
            sPHP:[.04,0,0,.004,0,.083,.27],          
        },
        SQ_MAINT_9V881:{
            disc:"9V881",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_9V881,
            TroopCarriedSupplies:[180,0,0,0,0,2,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,20],
            supplies:[2340,0,0,0,0,16,22],
            sPHC:[2,0,0,.2,0,.083,.32],
            sPHOF:[.2,0,0,.02,0,.083,.291],
            sPHIR:[.005,0,0,0,0,.083,.23],
            sPHP:[.04,0,0,.004,0,.083,.27],          
        },
        SQ_MAINT_9V883M1:{
            disc:"9V883M1",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_9V883M1,
            TroopCarriedSupplies:[180,0,0,0,0,2,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,20],
            supplies:[2340,0,0,0,0,16,22],
            sPHC:[2,0,0,.2,0,.083,.32],
            sPHOF:[.2,0,0,.02,0,.083,.291],
            sPHIR:[.005,0,0,0,0,.083,.23],
            sPHP:[.04,0,0,.004,0,.083,.27],          
        },
        SQ_MAINT_9V884M1:{
            disc:"9V884M1",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_9V884M1,
            TroopCarriedSupplies:[180,0,0,0,0,2,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,20],
            supplies:[2340,0,0,0,0,16,22],
            sPHC:[2,0,0,.2,0,.083,.32],
            sPHOF:[.2,0,0,.02,0,.083,.291],
            sPHIR:[.005,0,0,0,0,.083,.23],
            sPHP:[.04,0,0,.004,0,.083,.27],          
        },
        SQ_MAINT_9V894M1:{
            disc:"9V894M1",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_9V894M1,
            TroopCarriedSupplies:[180,0,0,0,0,2,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,20],
            supplies:[2340,0,0,0,0,16,22],
            sPHC:[2,0,0,.2,0,.083,.32],
            sPHOF:[.2,0,0,.02,0,.083,.291],
            sPHIR:[.005,0,0,0,0,.083,.23],
            sPHP:[.04,0,0,.004,0,.083,.27],          
        },
        SQ_MAINT_9V95M1:{
            disc:"9V95M1",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_9V95M1,
            TroopCarriedSupplies:[180,0,0,0,0,2,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,20],
            supplies:[2340,0,0,0,0,16,22],
            sPHC:[2,0,0,.2,0,.083,.32],
            sPHOF:[.2,0,0,.02,0,.083,.291],
            sPHIR:[.005,0,0,0,0,.083,.23],
            sPHP:[.04,0,0,.004,0,.083,.27],          
        },
        SQ_MAINT_9F116:{
            disc:"9F116",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_9F116,
            TroopCarriedSupplies:[180,0,0,0,0,2,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,20],
            supplies:[2340,0,0,0,0,16,22],
            sPHC:[2,0,0,.2,0,.083,.32],
            sPHOF:[.2,0,0,.02,0,.083,.291],
            sPHIR:[.005,0,0,0,0,.083,.23],
            sPHP:[.04,0,0,.004,0,.083,.27],          
        },
        SQ_MAINT_AG3M1:{
            disc:"AG3M1",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_AG3M1,
            TroopCarriedSupplies:[180,0,0,0,0,2,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,20],
            supplies:[2340,0,0,0,0,16,22],
            sPHC:[2,0,0,.2,0,.083,.32],
            sPHOF:[.2,0,0,.02,0,.083,.291],
            sPHIR:[.005,0,0,0,0,.083,.23],
            sPHP:[.04,0,0,.004,0,.083,.27],          
        },
        SQ_MAINT_9V887M2K:{
            disc:"9V887M2K",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_9V887,
            TroopCarriedSupplies:[180,0,0,0,0,2,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,20],
            supplies:[2340,0,0,0,0,16,22],
            sPHC:[2,0,0,.2,0,.083,.32],
            sPHOF:[.2,0,0,.02,0,.083,.291],
            sPHIR:[.005,0,0,0,0,.083,.23],
            sPHP:[.04,0,0,.004,0,.083,.27],          
        },
        SQ_MAINT_9T31M1:{
            disc:"9T31M1",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_9T31M1,
            TroopCarriedSupplies:[180,0,0,0,0,2,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,20],
            supplies:[2340,0,0,0,0,16,22],
            sPHC:[2,0,0,.2,0,.083,.32],
            sPHOF:[.2,0,0,.02,0,.083,.291],
            sPHIR:[.005,0,0,0,0,.083,.23],
            sPHP:[.04,0,0,.004,0,.083,.27],          
        },

        //Combat engineering/maintenance vehicles//
        SQ_ENG_BAT_2:{
            disc:"BAT-2 earthmoving and CE vehicle",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Eng_BAT_2,
            TroopCarriedSupplies:[180,0,0,0,0,2,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,20],
            supplies:[2340,0,0,0,0,16,22],
            sPHC:[2,0,0,.2,0,.083,.32],
            sPHOF:[.2,0,0,.02,0,.083,.291],
            sPHIR:[.005,0,0,0,0,.083,.232],
            sPHP:[.04,0,0,.004,0,.083,.27],
        },
        SQ_ENG_BREM_L:{
            disc:"BREM-L combat recovery vehicle",
            members:[3,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Eng_BREM_L,
            TroopCarriedSupplies:[180,0,0,0,0,2,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,20],
            supplies:[2340,0,0,0,0,16,22],
            sPHC:[3,0,0,.3,0,.124,.48],
            sPHOF:[.3,0,0,.03,0,.124,.437],
            sPHIR:[.007,0,0,0,0,.124,.348],
            sPHP:[.06,0,0,.006,0,.124,.405],
        },
        SQ_ENG_GMZ_3:{
            disc:"GMZ-3 minelayer squad",
            members:[3,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Eng_GMZ_3,
            TroopCarriedSupplies:[270,0,0,0,0,3,3],
            vehicleCarriedSupplies:[2160,1760,0,0,0,14,15],
            supplies:[2430,1760,0,0,0,17,18],
            sPHC:[3,0,0,.3,0,.124,.48],
            sPHOF:[.3,0,0,.03,0,.124,.437],
            sPHIR:[.007,0,0,0,0,.124,.348],
            sPHP:[.06,0,0,.006,0,.124,.405],
        },     
        SQ_Eng_UR_77:{
            disc:"UR-77 line charge mine-clearer vehicle",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Eng_UR_77,
            TroopCarriedSupplies:[180,0,0,0,0,2,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,20],
            supplies:[2340,0,0,0,0,16,22],
            sPHC:[2,0,0,.2,0,.083,.32],
            sPHOF:[.2,0,0,.02,0,.083,.291],
            sPHIR:[.005,0,0,0,0,.083,.232],
            sPHP:[.04,0,0,.004,0,.083,.27],
        },
        SQ_EOV_3521:{
            disc:"EOV-3521 excavator squad",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Eng_EOV_3521,
            TroopCarriedSupplies:[180,0,0,0,0,2,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,20],
            supplies:[2340,0,0,0,0,16,22],
            sPHC:[2,0,0,.2,0,.083,.32],
            sPHOF:[.2,0,0,.02,0,.083,.291],
            sPHIR:[.005,0,0,0,0,.083,.23],
            sPHP:[.04,0,0,.004,0,.083,.27],       
        },
        SQ_ENG_REM_KL:{
            disc:"REM-KL wheeled maintenance recovery vehicle",
            members:[2,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Eng_REM_KL,
            TroopCarriedSupplies:[180,0,0,0,0,2,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,14,20],
            supplies:[2340,0,0,0,0,16,22],
            sPHC:[2,0,0,.2,0,.083,.32],
            sPHOF:[.2,0,0,.02,0,.083,.291],
            sPHIR:[.005,0,0,0,0,.083,.23],
            sPHP:[.04,0,0,.004,0,.083,.27],       
        },
        SQ_ENG_MTO_UB1:{
            disc:"MTO-UB1 general maintenance vehicle",
            members:[3,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_PAK_200M,
            TroopCarriedSupplies:[360,0,0,4,0,6,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,10],
            supplies:[2520,0,0,4,0,27,12],
            sPHC:[60,0,0,1.5,0,.083,.32],
            sPHOF:[6,0,0,.15,0,.083,.291],
            sPHIR:[.15,0,0,0,0,.083,.291],
            sPHP:[1.2,0,0,.03,0,.083,.27],             
        },

        //Troop hygiene, comfort, medical vehicles//
        SQ_M_U375:{
            disc:"M-U375 military ambulance squad",
            members:[1,0,0,0,0,0,0,0,0,5,0],
            vehicle:components.vehicles.M_Ural375A,
            TroopCarriedSupplies:[480,0,0,2,0,43,21],
            vehicleCarriedSupplies:[2160,0,0,0,0,35,30],
            supplies:[2640,0,0,2,0,78,51],
            sPHC:[31.5,0,0,.75,0,.249,.740],
            sPHOF:[4.5,0,0,.075,0,.249,.725],
            sPHIR:[1.575,0,0,0,0,.249,.696],
            sPHP:[2.1,0,0,.015,0,.249,.715],     
        },
        SQ_MAINT_PAK_200_M:{ 
            disc:"Pak-200M mobile kitchen",
            members:[4,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_PAK_200M,
            TroopCarriedSupplies:[360,0,0,4,0,6,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,10],
            supplies:[2520,0,0,4,0,27,12],
            sPHC:[60,0,0,1.5,0,.083,.32],
            sPHOF:[6,0,0,.15,0,.083,.291],
            sPHIR:[.15,0,0,0,0,.083,.291],
            sPHP:[1.2,0,0,.03,0,.083,.27],        
        },
        SQ_MAINT_DDU_1:{
            disc:"DDU-1 shower complex",
            members:[1,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_DDU_1,
            TroopCarriedSupplies:[360,0,0,4,0,6,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,10],
            supplies:[2520,0,0,4,0,27,12],
            sPHC:[60,0,0,1.5,0,.083,.32],
            sPHOF:[6,0,0,.15,0,.083,.291],
            sPHIR:[.15,0,0,0,0,.083,.291],
            sPHP:[1.2,0,0,.03,0,.083,.27],        
        },
        SQ_PKPB10:{
            disc:"PKPB10 laundry complex",
            members:[3,0,0,0,0,0,0,0,0,0,0],
            vehicle:components.vehicles.Truck_PKPB10,
            TroopCarriedSupplies:[360,0,0,4,0,6,2],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,10],
            supplies:[2520,0,0,4,0,27,12],
            sPHC:[60,0,0,1.5,0,.083,.32],
            sPHOF:[6,0,0,.15,0,.083,.291],
            sPHIR:[.15,0,0,0,0,.083,.291],
            sPHP:[1.2,0,0,.03,0,.083,.27],             
        },

        //Non-artillery/SAM command vehicles//
        SQ_BMP2InfantryCompanyC2:{
            disc:"C2 squad for BMP-2 companies, equipped with the BMP-2K command variant",
            members:[3,0,0,0,0,0,0,1,0,1,1],
            vehicle:components.vehicles.IFV_BMP2K, 
            TroopCarriedSupplies:[1020,0,8,7,20,30,15.6],
            vehicleCarriedSupplies:[4320,1760,6,20,20,21,30],
            supplies:[5340,1760,14,27,40,51,45.6],
            sPHC:[388,600,4.125,8.649,23.5,.374,1.44],
            sPHOF:[38.8,60,.4125,.679,2.35,.374,1.312],
            sPHIR:[.969,1.5,.0103,0,.040,.374,1.044],
            sPHP:[6.06,12,.082,.137,.48,.374,1.215],
        },
        SQ_BMP1InfantryCompanyC2:{
            disc:"C2 squad for BMP-1 companies, equipped with the BMP-1K command variant",
            members:[2,0,0,0,0,0,0,1,0,1,1],
            vehicle:components.vehicles.IFV_BMP1K2, 
            TroopCarriedSupplies:[1020,0,8,7,20,30,15.6],
            vehicleCarriedSupplies:[4320,1760,6,20,20,21,30],
            supplies:[5340,1760,14,27,40,51,45.6],
            sPHC:[388,600,4.125,8.649,23.5,.374,1.44],
            sPHOF:[38.8,60,.4125,.679,2.35,.374,1.312],
            sPHIR:[.969,1.5,.0103,0,.040,.374,1.044],
            sPHP:[6.06,12,.082,.137,.48,.374,1.215],
        },
        SQ_BTR80CompanyC2:{
            disc:"BTR-80K-equipped C2 squad for BTR-80 companies",
            members:[3,0,0,0,0,0,0,1,0,1,1],
            vehicle:components.vehicles.APC_BTR80K,
            TroopCarriedSupplies:[1230,600,8,11,10,36,15.8],
            vehicleCarriedSupplies:[6480,1760,6,20,20,21,25],
            supplies:[7710,2360,14,31,30,57,40.8],
            sPHC:[631,680,4.675,17.419,5.1,.416,1.6],
            sPHOF:[63.099,68,.467,1.159,.51,.416,1.458],
            sPHIR:[1.576,1.7,.011,0,.012,.416,1.16],
            sPHP:[12.620,13.6,.093,.245,.102,.416,1.35]
        },
        SQ_BTR82InfantryCompanyC2:{
            disc:"BTR-80K-equipped C2 squad for BTR-82 companies",
            members:[3,0,0,0,0,0,0,1,0,1,1],
            vehicle:components.vehicles.APC_BTR80K,
            TroopCarriedSupplies:[1230,600,8,11,10,36,15.8],
            vehicleCarriedSupplies:[6480,1760,6,20,20,21,25],
            supplies:[7710,2360,14,31,30,57,40.8],
            sPHC:[631,680,4.675,17.419,5.1,.416,1.6],
            sPHOF:[63.099,68,.467,1.159,.51,.416,1.458],
            sPHIR:[1.576,1.7,.011,0,.012,.416,1.16],
            sPHP:[12.620,13.6,.093,.245,.102,.416,1.35]
        },
        SQ_BMP2_PlatoonHQ:{
            disc:"BMP-2 platoon HQ squad",
            members:[2,0,0,0,1,0,2,1,0,1,1],
            vehicle:components.vehicles.IFV_BMP2,
            TroopCarriedSupplies:[960,400,0,8,20,23,11.2],
            vehicleCarriedSupplies:[4320,1760,6,20,20,21,30],
            supplies:[5280,2160,6,28,40,44,41.2],
            sPHC:[285.1,600,0,4.2,9,.333,1.192],
            sPHOF:[29.05,60,0,.35,.9,.333,1.106],
            sPHIR:[1.311,1.5,0,0,0,.333,.928],
            sPHP:[2.889,12,0,.074,.18,.333,1.042],
        },
        SQ_C2_R149BM4A:{ 
            disc:"R149BM4A, second half of a BTG's high headquarters.",
            members:[1,0,0,0,0,0,0,1,0,2,1],//last two are staffer, officer
            vehicle:components.vehicles.C2_R149,
            TroopCarriedSupplies:[540,0,0,2,0,51,25],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,20],
            supplies:[2700,0,0,2,0,72,45],
            sPHC:[31.8,0,0,.75,0,.291,.856],
            sPHOF:[4.8,0,0,.075,0,.291,.841],
            sPHIR:[1.875,0,0,0,0,.291,.812],
            sPHP:[2.4,0,0,.015,0,.291,.831],
        },
        SQ_C2_R142:{ //first half of a BTG's HQ
            disc:"R142 C2 squad for a BTG",
            members:[1,0,0,0,0,0,0,1,0,2,1],//last two are staffer, officer
            vehicle:components.vehicles.C2_R142,
            TroopCarriedSupplies:[540,0,0,2,0,51,25],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,20],
            supplies:[2700,0,0,2,0,72,45],
            sPHC:[31.8,0,0,.75,0,.291,.856],
            sPHOF:[4.8,0,0,.075,0,.291,.841],
            sPHIR:[1.875,0,0,0,0,.291,.812],
            sPHP:[2.4,0,0,.015,0,.291,.831],
        },
        SQ_R142:{ //Generic comms vehicle
            disc:"R142 generic multipurpose C2 squad",
            members:[1,0,0,0,0,0,0,1,0,3,0],//last two are staffer, officer
            vehicle:components.vehicles.C2_R142,
            TroopCarriedSupplies:[540,0,0,2,0,51,25],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,20],
            supplies:[2700,0,0,2,0,72,45],
            sPHC:[31.8,0,0,.75,0,.291,.856],
            sPHOF:[4.8,0,0,.075,0,.291,.841],
            sPHIR:[1.875,0,0,0,0,.291,.812],
            sPHP:[2.4,0,0,.015,0,.291,.831],
        },
        SQ_BAT_C2_R145BM1:{
            disc:"SAM command and control unit deployed with SA-15 and possibly SA-8 batteries. Equipped with the R145BM1",
            members:[2,0,0,0,0,0,0,0,0,3,1],
            vehicle:components.vehicles.C2_R145BM1,
            TroopCarriedSupplies:[600,0,0,4,0,38,18],
            vehicleCarriedSupplies:[2160,0,6,0,0,28,20],
            supplies:[2760,0,6,4,0,66,38],
            sPHC:[61.19,0,0,1,5,0,.249,.784],
            sPHOF:[7.2,0,0,.15,0,.249,.755],
            sPHIR:[1.349,0,0,0,0,.249,.696],
            sPHP:[2.39,0,0,.03,0,.249,.734],
        },
        SQ_CO_HQ_BTR:{ 
            members:[3,0,0,0,0,0,0,1,0,1,1],
            disc:"the headquarters of a BTR-80, enhanced BTR-80 or BTR 82 motorized rifle company, equipped with the BTR-80K command vehicle",
            vehicle:components.vehicles.APC_BTR80K,
            TroopCarriedSupplies:[1050,0,0,9,0,43,19.2],
            vehicleCarriedSupplies:[6480,1760,6,20,20,21,25],
            supplies:[7530,1760,6,29,20,64,44.],
            sPHC:[309.2,0,0,7.85,0,.374,1.264],
            sPHOF:[31.999,0,0,.4025,0,.374,1.193],
            sPHIR:[1.97,0,0,0,0,.374,1.044],
            sPHP:[7.36,0,0,.094,0,.3749,1.139],
        },
        SQ_CO_HQ_BMP:{ 
            disc:"the headquarters of a BMP-2 company. Equipped with the special command BMP-2K variant",
            members:[3,0,0,0,0,0,3,0,0,3,1],
            vehicle:components.vehicles.IFV_BMP2K,
            TroopCarriedSupplies:[1320,0,0,6,30,38,19.6],
            vehicleCarriedSupplies:[4320,1760,6,20,20,21,30],
            supplies:[5640,1760,6,26,50,59,49.6],
            sPHC:[304.2,0,0,1.8,13.5,.416,1.424],
            sPHOF:[31.5,0,0,.075,1.35,.416,1.338],
            sPHIR:[1.957,0,0,0,.026,.416,1.274],
            sPHP:[2.159,0,0,.020,.27,.416,1.274],
        },
        SQ_C2_U375A:{// generic command and control staff group, driving the Ural 375 truck-based command and control vehicle. Ubiquitous, with many present throughout any BTG.
            disc:"C2 squad in a Ural-375A command vehicle. ",
            members:[2,0,0,0,0,0,0,0,0,2,1],
            vehicle:components.vehicles.C2_Ural375A,
            TroopCarriedSupplies:[540,0,0,4,0,30,14],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,20],
            supplies:[2700,0,0,4,0,51,34],
            sPHC:[60.9,0,0,1.5,0,.208,.688],
            sPHOF:[6.899,0,0,.15,0,.208,.639],
            sPHIR:[1.05,0,0,0,0,.208,.58],
            sPHP:[2.099,0,0,.03,0,.208,.618],            
        },


        //EW squads
        SQ_EW_RP377L:{
            members:[1,0,0,0,0,0,0,0,0,2,0],//last two are staffer, officer
            disc:"RP377L EW sq",
            vehicle:components.vehicles.EW_RP377L,
            TroopCarriedSupplies:[540,0,0,2,0,51,25],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,20],
            supplies:[2700,0,0,2,0,72,45],
            sPHC:[31.8,0,0,.75,0,.291,.856],
            sPHOF:[4.8,0,0,.075,0,.291,.841],
            sPHIR:[1.875,0,0,0,0,.291,.812],
            sPHP:[2.4,0,0,.015,0,.291,.831],            
        },
        SQ_EW_R330ZH:{
            members:[1,0,0,0,0,0,0,0,0,2,0],//last two are staffer, officer
            disc:"R330ZH EW squad",
            vehicle:components.vehicles.EW_R330ZH,
            TroopCarriedSupplies:[540,0,0,2,0,51,25],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,20],
            supplies:[2700,0,0,2,0,72,45],
            sPHC:[31.8,0,0,.75,0,.291,.856],
            sPHOF:[4.8,0,0,.075,0,.291,.841],
            sPHIR:[1.875,0,0,0,0,.291,.812],
            sPHP:[2.4,0,0,.015,0,.291,.831],            
        },
        SQ_EW_1L222:{
            members:[1,0,0,0,0,0,0,0,0,2,0],//last two are staffer, officer
            disc:"1L222 Electronic Warfare squad",
            vehicle:components.vehicles.EW_1L222,
            TroopCarriedSupplies:[540,0,0,2,0,51,25],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,20],
            supplies:[2700,0,0,2,0,72,45],
            sPHC:[31.8,0,0,.75,0,.291,.856],
            sPHOF:[4.8,0,0,.075,0,.291,.841],
            sPHIR:[1.875,0,0,0,0,.291,.812],
            sPHP:[2.4,0,0,.015,0,.291,.831],            
        },
        SQ_EW_MP32M1:{
            members:[0,0,0,0,0,0,0,0,0,4,0],//last two are staffer, officer
            disc:"Orlan-10 Drone Command Squad",
            vehicle:components.vehicles.EW_MP32M1,
            TroopCarriedSupplies:[540,0,0,2,0,51,25],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,20],
            supplies:[2700,0,0,2,0,72,45],
            sPHC:[31.8,0,0,.75,0,.291,.856],
            sPHOF:[4.8,0,0,.075,0,.291,.841],
            sPHIR:[1.875,0,0,0,0,.291,.812],
            sPHP:[2.4,0,0,.015,0,.291,.831],                
        },
        SQ_EW_Orln10Ln:{
            members:[0,0,0,0,0,0,0,0,0,4,0],//last two are staffer, officer
            disc:"Orlan-10 Drone Launch and Transport Sq",
            vehicle:components.vehicles.EW_Orln10Ln,
            TroopCarriedSupplies:[540,0,0,2,0,51,25],
            vehicleCarriedSupplies:[2160,0,0,0,0,21,20],
            supplies:[2700,0,0,2,0,72,45],
            sPHC:[31.8,0,0,.75,0,.291,.856],
            sPHOF:[4.8,0,0,.075,0,.291,.841],
            sPHIR:[1.875,0,0,0,0,.291,.812],
            sPHP:[2.4,0,0,.015,0,.291,.831],        
        }

    }
};
const largeUComps={
    /*
    platoon comps are ordered truck, bmp1, bmp2, btr80, btr82,T72,T72B3
    */
    platoons:{ 
        PLT_TruckInfantry:{
            comp:[3,0,0,0,0,],
        },
        PLT_BTR80:{
            comp:[0,0,0,3,0,],
        },
        PLT_BTR82:{
            comp:[0,0,0,0,3,],
        },
        PLT_BMP1:{
            comp:[0,3,0,0,0,],
        },
        PLT_BMP2:{
            comp:[0,0,3,0,0,],
        }
    },
    companies:{ //company level formations. Order is truck inf, btr80 inf, btr82 inf, bmp1 inf, bmp2 inf,T72,T72B3
        CO_TruckInfantry:{
            comp:[3,0,0,0,0,0,0],
        },
        CO_BTR80Infantry:{
            comp:[0,3,0,0,0,0,0],
        },
        CO_BTR80Infantry_Enhanced:{
            comp:[0,2,1,0,0,0,0],
        },
        CO_BTR82Infantry:{
            comp:[0,0,3,0,0,0,0],
        },
        CO_BMP1Infantry:{
            comp:[0,0,0,3,0,0,0],
        },
        CO_BMP2Infantry:{
            comp:[0,0,0,0,3,0,0],
        },
        CO_T72:{
            comp:[0,0,0,0,0,3,0]
        },
        CO_T72B3:{
            comp:[0,0,0,0,0,0,3],
        }
    },
    batteries:{//Batteries are fire support units, either SAMs, Artillery or Minelayer. 
        BTY_2S3:{//Battery of 2S3 Howitzers
            type:18,
            commandVehicle:components.vehicles.C2_1V14,
            secondaryCommandVehicle:components.vehicles.C2_1V13,
            vehicle1:[components.vehicles.SPA_2S3,6],
            vehicle2:[components.vehicles.N_NULLVEHICLE,0],
            vehicle3:[components.vehicles.N_NULLVEHICLE,0],
            vehicle4:[components.vehicles.N_NULLVEHICLE,0],
            vehicle5:[components.vehicles.N_NULLVEHICLE,0],
        },
        BTY_BM21:{//BM-21 'Grad' rocket battery
            type:18,
            commandVehicle:components.vehicles.C2_1V14,
            secondaryCommandVehicle:components.vehicles.C2_1V13,
            vehicle1:[components.vehicles.SPA_BM21,6],
            vehicle2:[components.vehicles.Truck_9T254_BM21GradResupplier,6],
            vehicle3:[components.vehicles.N_NULLVEHICLE,0],
            vehicle4:[components.vehicles.N_NULLVEHICLE,0],
            vehicle5:[components.vehicles.N_NULLVEHICLE,0],
        },
        BTY_9A52:{
            type:18,
            commandVehicle:components.vehicles.C2_1V14,
            secondaryCommandVehicle:components.vehicles.C2_1V13,
            vehicle1:[components.vehicles.SPA_9A52,6],
            vehicle2:[components.vehicles.Truck_9T234_2_BM30SmerchResupplier,6],
            vehicle3:[components.vehicles.N_NULLVEHICLE,0],
            vehicle4:[components.vehicles.N_NULLVEHICLE,0],
            vehicle5:[components.vehicles.N_NULLVEHICLE,0],

        },
        BTY_SA15:{//SA-15 'Tor' short-to-medium range radar guided surface-to-air missile battery
            type:19,
            commandVehicle:components.vehicles.C2_R145BM1,
            secondaryCommandVehicle:components.vehicles.C2_R145BM1,
            vehicle1:[components.vehicles.TELAR_9K330,4],
            vehicle2:[components.vehicles.Truck_9T245_SA15TorResupplier,4],
            vehicle3:[components.vehicles.N_NULLVEHICLE,0],
            vehicle4:[components.vehicles.N_NULLVEHICLE,0],
            vehicle5:[components.vehicles.N_NULLVEHICLE,0],
        },
        BTY_SA8:{//SA-8 'Osa' short-to-medium range radar-guided surface-to-air missile battery, predecessor to the SA-15
            type:19,
            commandVehicle:components.vehicles.C2_PPRU_1,
            secondaryCommandVehicle:0,
            vehicle1:[components.vehicles.TELAR_9K33,4],
            vehicle2:[components.vehicles.Truck_9T217_SA8OsaResupplier,2],
            vehicle3:[components.vehicles.N_NULLVEHICLE,0],
            vehicle4:[components.vehicles.N_NULLVEHICLE,0],
            vehicle5:[components.vehicles.N_NULLVEHICLE,0],
        },
        BTY_SA11:{//SA-11 'Buk-M1' medium-to-long range radar-guided surface-to-air missile battery
            type:19,
            commandVehicle:components.vehicles.C2_9C470M1,
            secondaryCommandVehicle:components.vehicles.SR_9S18M1,
            vehicle1:[components.vehicles.TELAR_9A310,6],
            vehicle2:[components.vehicles.TEL_9A39,3],
            vehicle3:[components.vehicles.Truck_9T243_SA11BukResupplier,2],
            vehicle4:[components.vehicles.Truck_Ural4320_Standard,4],//various testing and repair stations (9V883M1 MTO 1,2,3 and 9V881M1-2/9T456), represented by ural 4320s. Not enough is known about them to classify them as anything else. 
            vehicle5:[components.vehicles.C2_1V111,1],//substitute for 9V95M1 mobile power and testing station
        }
    },
    specialUnits:{
        SU_BTR80MANPADSPlatoon:{
            numTypes:[0,0,1,0],
            squadType1:[uComps.squads.SQ_BTR80MANPADS,3],
        },
        SU_TruckMANPADSPlatoon:{
            numTypes:[0,0,1,0],
            squadType1:[uComps.squads.SQ_TruckMANPADS,3],
        },
        SU_SniperPlatoon:{
            numTypes:[0,0,1,0],
            squadType1:[uComps.squads.SQ_Sniper,2],
        },
        SU_ReconPlatoon:{
            numTypes:[1,0,1,0],
            commandVehicle:components.vehicles.C2_1V14,
            squadType1:[uComps.squads.SQ_BTR80Infantry,2],
        },
        SU_CommsPlatoon:{
            numTypes:[1,1,0,1],
            commandVehicle:components.vehicles.C2_1V14,
            secondaryCommandVehicle:components.vehicles.C2_1V14,
            sVehicle1:[components.vehicles.C2_Ural375A,3],
        },
        SU_ATGMPlatoon:{
            numTypes:[1,1,0,1],
            commandVehicle:components.vehicles.C2_1V14,
            secondaryCommandVehicle:components.vehicles.APC_BTR80,
            sVehicle1:[components.vehicles.IFV_BTR_RD,3],
        },
        SU_EngiPlatoon:{
            numTypes:[0,0,0,4],
            sVehicle1:[components.vehicles.Eng_BAT_2,2],
            sVehicle2:[components.vehicles.Eng_GMZ_3,3],
            sVehicle3:[components.vehicles.Eng_EOV_3521,1],
            sVehicle5:[components.vehicles.Eng_UR_77,1],
        },
        SU_MedicalPlatoon:{
            numTypes:[0,0,0,4],
            commandVehicle:0,
            secondaryCommandVehicle:0,
            sVehicle1:[components.vehicles.M_Ural375A,4],
        },
        SU_LogisticsDetatchment:{ 
            /*
            the newly redesigned MTO platoon encompasses logistics, maintenance, cooking, laundry and showers all in one comprehensive unit. This is based on information from 'The Russian Way Of War' and is a significant departure from what is displayed on the graphic that has been seemingly mindlessly copied around the internet. Engineering functions are still performed by a unique group however.
            */

            numTypes:[1,0,0,3],
            commandVehicle:components.vehicles.C2_Ural375A,
            sVehicle1:[components.vehicles.Truck_Kamaz4310_Standard,8],
            sVehicle2:[components.vehicles.Truck_ATZ5_Fueler,3],
            sVehicle3:[components.vehicles.Truck_ATS5_Water,3],
            sVehicle4:[components.vehicles.Eng_BREM_L,3],
            sVehicle5:[components.vehicles.Eng_REM_KL,2],
            sVehicle6:[components.vehicles.Truck_MTO_UB1,1],
            sVehicle7:[components.vehicles.Truck_PAK_200M,3],
            sVehicle8:[components.vehicles.Truck_PKPB_10,1],
            sVehicle9:[components.vehicles.Truck_DDU_1,1]
        },
        SU_LogisticsDetatchmentHeavy:{ 
            /*
            the newly redesigned MTO platoon encompasses logistics, maintenance, cooking, laundry and showers all in one comprehensive unit. This is based on information from 'The Russian Way Of War' and is a significant departure from what is displayed on the graphic that has been seemingly mindlessly copied around the internet. Engineering functions are still performed by a unique group however.
            */

            numTypes:[1,0,0,3],
            commandVehicle:components.vehicles.C2_Ural375A,
            sVehicle1:[components.vehicles.Truck_Kamaz4310_Standard,10],
            sVehicle2:[components.vehicles.Truck_ATZ5_Fueler,3],
            sVehicle3:[components.vehicles.Truck_ATS5_Water,3],
            sVehicle4:[components.vehicles.Eng_BREM_L,3],
            sVehicle5:[components.vehicles.Eng_REM_KL,3],
            sVehicle6:[components.vehicles.Truck_MTO_UB1,2],
            sVehicle7:[components.vehicles.Truck_PAK_200M,3],
            sVehicle8:[components.vehicles.Truck_PKPB_10,1],
            sVehicle9:[components.vehicles.Truck_DDU_1,1]
        },
        SU_BTG_HQ:{
            numTypes:[1,1,0,1],
            commandVehicle:components.vehicles.C2_Ural375A,
            secondaryCommandVehicle:components.vehicles.C2_1V14,
            sVehicle1:[components.vehicles.C2_1V14,2],
        }
    },
};
const BTGComps={//compositions of BTGs
    /*
    BTGs have the following compositions:
    headquartersElement
    frontlineUnits:firstunit,quant,secondunit,quant,3rdunit,quant,4thUnit,quant
    additionalUnits:firstunit,quant,secondunit,quant,3rdunit,quant,4thunit, quant,5thunit,quant,6thunit,quant,7thunit,quant
    supportUnits:firstunit,quant,secondunit,quant,3rdunit,quant,4thunit,quant,5thunit,quant
    */
    BTG_Territorial:{
        //Infantry/Armor light but extremely support-heavy, the territorial defence BTG should be kept out of pitched battles, instead using it's assets to secure rear areas and provide long range strategic cover for advancing units with it's BM-30 and SA-11 batteries. 
        //Despite being very lightly equipped for pitched battles agaisnt other ground troops, the BTG is very well equipped for air defense and will help secure the area over the advancing units.
        HQ:largeUComps.specialUnits.SU_BTG_HQ,
        //Compositions are numbers of  truck, btr80, btr80Enhanced, BTR82, BMP1, BMP2, T72, T72B3
        frontlineUnits:[1,1,0,0,0,0,0,0],
        //Composition are numbers of truckMANPADs, BTR80MANPADs, sniper, recon, ATGM
        additionalCombatUnits:[1,0,0,0,0],
        //Composition is numbers of comms, engineering, medical, logistics
        supportUnits:[1,1,1,1],
        //Composition is numbers of 2S3, BM21, BM30, SA8, SA15, SA11
        fireSupportUnits:[1,0,1,0,1,1],
    },
    BTG_MotorizedInfantry:{
        //Full sized, very mobile but lightly armored BTG best used to entrench and hold a defensive position after it is taken. Will suffer if it is used to attack a position. It also lacks rocket artillery.
        HQ:largeUComps.specialUnits.SU_BTG_HQ,
        frontlineUnits:[3,0,1,0,0,0,0,0],
        additionalCombatUnits:[1,0,1,1,1],
        supportUnits:[1,1,1,1],
        fireSupportUnits:[1,0,0,1,0,0],
    },
    BTG_MechanizedInfantry:{
        //Full sized, fairly mobile, well rounded BTG that can be used for attack or defense and is probably the best choice for urban combat. 
        //It is the optimum force to counter an enemy attack, reinforce an existing position, or to secure a city. 
        HQ:largeUComps.specialUnits.SU_BTG_HQ,
        frontlineUnits:[0,0,0,1,0,2,1,0],
        additionalCombatUnits:[0,1,1,1,0],
        supportUnits:[1,1,2,1],
        fireSupportUnits:[1,1,0,0,1,0],
    },
    BTG_HeavyAssault:{
        //Heavy, not very mobile but very hard hitting BTG designed to smash the enemy in a heavy artillery barrage and then crush what's left under tank treads. 
        //Poor ability to execute operations against infantry, also not optimal for holding a long line
        HQ:largeUComps.specialUnits.SU_BTG_HQ,
        frontlineUnits:[0,0,0,0,0,2,0,2],
        additionalCombatUnits:[0,1,0,1,0],
        supportUnits:[1,2,2,1],
        fireSupportUnits:[1,2,0,0,0,0],
    },
};
const SAMSystemComps={
    SA10B:{
        /*
            The SA-10B (Specifically the S-300PS) is the most potent medium range SAM system available to Abkhazia (Their SA-5 complex is delegated to killing distant, large aircraft). It is also perhaps the most complex.
                Mobility as configured in DCS:
                    Stow entire system: 1 hour
                    Deploy entire system: 2 hours 
                Description:
                    The S-300 PS is probably the single most threatening medium range SAM at Abkhazia's disposal, though it's actually fairly old, being introduced in 1985. The PS variant is the homebuilt original from which the S300PMU upgraded export variant
                        was derived. Despite being very powerful against fighters and missiles it is severely hamstrung by modern standards due to it's mast mounted radars and relatively early TEL datalinks that force launchers to remain close to their tracking
                        radar. With such hampered mobility and a large footprint it would be unwise to emplace a system anywhere near the front line lest putting it at risk for artillery strikes. It also comes with a large logistical footprint that would create a daunting logistics problem should it be forward deployed. It's role is thus to cover wide swathes of rear-area airspace and prevent attacks from stealth aircraft. Front line air defense is best left to SA-8s, 11s and 15s. 

            System Components:

                76N6 Clam Shell Low Altitude Aquisition Radar
                    Description:
                        Specialized low altitude aquisition radar designed to detect and automatically transmit data on low-altitude targets, particularly cruise missiles, to the fire control systems of the master SAM HQ. 
                            Very resistant to jamming and countermeasures. Trailer mounted and thus not very mobile. S-Band. 
                    Stow Time: 60 minutes
                    Deploy Time: 120 minutes

                5N63 Flap Lid A Engagement Radar
                    Description: 
                        Engagement and tracking radar used to guide missiles to their targets. Trailer mounted and thus not very mobile. Controlled by a crew in an adjacent truck according to ausairpower.
                    Stow Time:60 minutes
                    Deploy Time:120 minutes
                    
                ST-68U Tin Shield Aquisition Radar
                    Description:
                        Early aquisition radar operating in the S-Band designed for general purpose aquisition. Superceded by the Cheese Board. In practice will appear with a secondary vehicle, pictured to be a trailer, that houses electronics and operator 
                            consoles.
                    Stow Time:60 minutes
                    Deploy Time: 120 minutes

                64N6E Big Bird Aquisition Rada
                    Description: 
                        Modern aquisition radar operating on the 2ghz band. Frequency hopping and hard to jam. 
                    Stow Time: 5 minutes
                    Deploy Time: 5 minutes
                
                
                5P85S TEL
                    Description:
                        "Smart" TEL with 4 rounds and distinguishable by it's cabin aft of the main truck personnel compartment. Houses the datalink and control logic for the SP85D TELs under it's control. Standard deployment is 1 SP85S with 2 SP85D. 
                            Must be located within 100 meters of the Flap Lid controlling it, thus not very flexible. One of the 2 TEL options available for the S300 in DCS. Operates autonomously when set up.
                    Stow Time: 5 minutes
                    Deploy Time: 5 minutes
                
                5P85D TEL
                    Description: "Dumb" TEL with 4 rounds and distinguishable by the lack of a bulky electronics cabin. Slaved to the SP85S and cannot function without one. Must be located close to the TEL it is slaved to. Operates autonomously when set up.
                Stow Time: 5 minutes
                Deploy Time: 5 minutes
        */
    },
    SA11:{
        /*
            The SA-11 (Specifically the 9K317M1) is a tracked, highly mobile lower-medium range radar guided SAM system.
                Mobility as configured in DCS:
                    Stow entire system: 5 minutes
                    Deploy entire system: 5 minutes
                Description:
                    When compared to the SA-10, the SA-11 offers lower performance and shorter range against all targets and poor performance against missiles. It also lacks
                        the on-road speed the SA-10 offers. There are, however, a number of advantages it offers over the SA-10 that make it very attractive for Abkhazia. The 
                        first and biggest is that the entire system can very rapidly be stowed or set up. The second is the impeccable off-road mobility offered by the 
                        all-tracked main elements, offering the system a means to rapidly move in any direction, without the limitation of being constrained to roads or even
                        fields. The third is that, unlike the SA-10, half or more of the TELs are actually TELARS with their own tracking capability. This eliminates the 
                        need to move a seperate tracking radar around and also offers a high level of redundancy. The fourth is that all of the main elements of the system
                        are self propelled, eliminating the need for seperate tractors. This cuts down on the need for seperate vehicles and reduces the logistical and visual 
                        footprint of the system and perhaps most importantly, increases the possibility that the system will be able to move undetected. 

                    All of these factors combined make the SA-11 Abkhazia's ideal option for defending their rear areas from blufor air attack. As a general practice, the 
                        system will emplace and camoflauge itself far enough behind friendly lines that it will not likely be immediately detected. It will then wait, not utilizing it's search or tracking radars and instead passively receiving data from search radars further back. When an enemy aircraft is detected on course to the the site's area of responsibilty, the rear area tracking radar operators inform the SA-11 site and it starts the final setup. The ideal result of this is that the enemy aircraft will come well within the maximum engagement range of the SA-11 before being painted by it's radars and then being engaged. By then it will likely be too late for the enemy aircraft and they will be engaged and destroyed. Once the engagement is completed the SA-11 will immediately pack up and move to a new location. 
                        
            System Components:

                9S470M1 Command Post
                    Description:
                        Master command vehicle used to coordinate all subordinate vehicles. 
                             
                    Stow Time: 5
                    Deploy Time: 5

                9S18M1 Snow Drift aquisition radar
                    Description: 
                        Master search radar for the SA-11 complex
                    Stow Time:5 minutes
                    Deploy Time:5 minutes
                    
                9S35 Fire Dome TELAR
                    Description:
                        Combined TEL and Tracking radar 
                    Stow Time: 5 minutes
                    Deploy Time: 5 minutes

                9A39M1 TEL and Transloader
                    Description:
                        TEL that doubles as an ammunition carrier and transloader, carrying 4 fireable and 4 transferrable rounds. Slaved to a TELAR. 
                    Stow Time: 5 minutes
                    Deploy Time: 5 minutes

        */
    },
    SA15:{
       /*
            The SA-15 (Specifically the 9A331) is a tracked, highly mobile short range radar guided SAM system.
                Mobility as configured in DCS:
                    Stow entire system: 5 minutes
                    Deploy entire system: 5 minutes
                Description:
                    Unlike the SA10 or SA11, which are dedicated to area defense, the SA-15 as the abkhazians use it is dedicated to protecting larger SAM systems from enemy aircraft and munitions.
                        With a fairly small footprint, the SA15 complex consists of 4 TELARs and 1 command vehicle (actually an MTLB) in addition to support elements.

                    For this purpose there will typically be 2 or more TELARs assigned to defend a site directly, with other TELARs assigned in slightly different positions covering possible ingress/egress routes. 
                        
            System Components:

                9A331 TELAR
                    Description
                        All-in-one TELAR of the system
                
                9S737 Ranzhir BMC
                    Description
                        Self propelled MTLB control vehicle.

        */
    },
};
const MOSCodes=[
    /*
    11B: Infantryman
    11C: Mines, Nav, Comms
    11Z: Infantry squad leadership

    12A: Combat engineer squad leader
    12B: Sapper
    12C: Bridge builder
    12D: Diver
    12H: Construction engineering supervisor
    12M: Firefighter
    12N: Horiz construction engineer, most prominently a roadbuilder
    12P: Power plant engineer
    12Q: Power line distribution specialist
    12T: Surveyor and mapmaker
    12W: Carpentry and masonry
    12Y:    Geospatial engineer (map analyst, intel)
    12Z: CE SL

    13B: Cannon crewmember
    13D: Field Artillery Automated Tactical Data System Specialist
    13F: Fire Support Specialist, analyzes and process target data
    13M: MRL crewmember
    13P: MRL FDC man
    13R: Arty counterbattery radar operator
    13T: Field artillery surveyor/meteorological crewmember
    13Z: Field artillery SL

    14E: Fire Control Operator for SAM
    14G: Plans and manages air defense ops
    14H: EWR operator
    14J: EWR operator/maintainer
    14S: SAM crewmember
    14T: TEL operator
    14Z: SAM SL

    15B: Aircraft powerplant repair
    15D: A/C Powertrain repair
    15E: UAV repair
    15F: A/C electrician
    15G: A/C Structural repair
    15H: A/C pneumatics/hydraulics repair
    15P: Planner for non-combat airborne ops
    15W: UAV operator
    15Z: Av Maint SL

    18B: SF heavy weapons/ CE
    18C: SF CE
    18D: SF Medic
    18E: SFComms
    18F: SF Intel and Ops
    18Z: SF SL

    19D: Cav scout, operates and maintains scout vehicles
    19K: Armor crewman
    19Z: Armor SL

    25B: General IT specialist
    25C: Radio operator/maintainer
    25Q: Radio operator, maintainer, setterupper,etc.
    25S: Satcom specialist
    25U: comms specialist/commint
    25X: Chief signal NCO
    25Z: Visual Information Ops Chief

    29E: EW specialist

    35F: Intel analyst
    35G: Imagry analyst
    35L: Counterintelligence
    35M: HUMINT
    35N: SIGINT
    35P: Crypto linguist
    35Q: Cyberwarfare
    35S: SIGINT collector
    35T: intel system maintainer
    35V: SIGINT PL
    35X: Intel SL
    35Y: Counterintelligence, HUMINT SL
    35Z: SIGINT PL

    42A: HR

    56M: Chaplain

    68B: Orthopedic
    68C: Nursing
    68D OR specialist
    68E: Dental
    68F: Physical therapy
    68G: Patient admin
    68H: Optical Lab specialist
    68J: Medical equipment and supply
    68M: Nutrition
    68N: Cardio
    68P: Radiology
    68U: Ear, nose, throat
    68V: Resperatory
    68W: MEDIC

    88H: Management and inventory of supply
    88M: Truck driver and manager
    88N: Logistics coordinator
    88P: Railway equipment repair
    88T: Road and trail repair
    88U: Train guy
    88Z: Transportation leader and coordinator

    89A: Ammo stock control and accounting
    89B: Ammo management, prep, storage
    89D: EOD

    91A: Tank repair
    91B: Wheeled vehicle repair
    91C: Utility equipment repair
    91D: Generator type equipment repair
    91E: Trades specialist
    91F: Small arms and artillery repair
    91G: Fire controlrepair
    91H: Tracked vehicle repair
    91J: QM and Chem equip rpr
    91K: Armament repair
    91L: Construction equip repair
    91M: IFV repair
    91P: Arty repair
    91S: APC repair
    91X: Maint supervisor
    91Z: Maint PL

    92A: Warehouse inventory management
    92F: Fuel supply specialist
    92G: Cook
    92M: Dead people handler
    92R: Para rigger
    92S: Sewer and clothes washer
    92W: Water specialist
    92Y: Supply coordinator
    92Z: Supply boss

    94A: ATGM repair
    94D: ATC repair
    94E: comms repair
    94L: Avionics comms repair
    94M: Radar repair
    94P: MLRS repair
    94S: Heavy SAM repair
    94T: Light SAM repair
    94X: Senior SAM maintanier
    94Z: Electronic maint boss


    AFSCS
    1A151: Flight engineer 
    1A241: Loadmaster

    1C051: Airfield management
    1C052: Aviation resource management
    1C151: ATC
    1C351: C2 ops
    1C551: C2 BM
    1C751: Airfield management
    1C853: Radar, airfield and weather
    1N851: Targeting analyst

    1Z151: Pararescue
    1Z2X1: Combat control
    1Z351: TACP
    1Z451: Special recon

    11BX: Bomber pilot
    11FX: Fighter pilot
    11GX: Generalist pilot
    11HX: Rescue pilot
    11KX: Trainer pilot
    11MX: Mobility pilot
    12UX: RPA pilot
    13BX: Air Battle Manager
    13MX: Airfield ops
    14FX: Information ops
    14NX: Intel
    15AX: Op Research
    15WX: Weather officer

    */
];
export default {components,uComps,largeUComps,BTGComps,testItems,SAMSystemComps,vComponents,tComponents,MOSCodes};