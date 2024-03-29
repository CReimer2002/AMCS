import cfg from "./simConfig.js";
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
const gComponents={
    calibers:{
        //light calibers
        c9x19:{
            name:"9x19mm",
            disc:"9mm",
            weight:.0264,
            bWeight:.018,
            supplyIndex:0,
            pen:0
        },
        c9x21:{
            name:"9x21mm",
            disc:"imitation 9mm used in the IMI pistol",
            weight:.0264,
            supplyIndex:0,
            bWeight:.016,
            pen:0
        },
        c9x18:{
            name:"9x18mm",
            disc:"soviet pistol round for PM",
            weight:.0242,
            bWeight:.013,
            supplyIndex:0,
            pen:0
        },
        c762x25:{
            name:"7.62x25mm",
            disc:"soviet pistol round for TT33",
            weight:.0242,
            supplyIndex:0,
            bWeight:.012,
            pen:0
        },
        //intermediate calibers
        c545x39:{
            name:"5.45x39mm",
            disc:"prolific intermediate ammunition found most notably in the AK-74 family",
            weight:.0271,//how much weight there is per round
            bWeight:.008,
            supplyIndex:1,
            pen:cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_545x39
        },
        c762x39:{
            name:"7.62x39mm",
            disc:"prolific heavier cartridge famous for it's use in AK-47 pattern rifles",
            weight:.0392,//how much weight there is per round
            bWeight:.017,
            supplyIndex:1,
            pen:cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_762x39
        },
        c556x45:{
            name:"5.56x45mm",
            disc:"intermediate cartride found in M-16 pattern rifles",
            weight:.0271,
            bWeight:.009,
            supplyIndex:1,
            pen:cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_556x45
        },
        c9x39:{
            name:"9x39mm",
            disc:"upnecked 7.62x39mm bullet",
            weight:.0396,
            bWeight:.0352,
            supplyIndex:1,
            pen:cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_556x45
        },

        //heavy calibers
        c762x54r:{
            name:"7.62x54mmr",
            disc:"heavy cartridge notably found in the M1981",
            weight:.059,//how much weight there is per round
            bWeight:.021,
            supplyIndex:2,
            pen:cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_762x54
        },
        c762x51:{
            name:"7.62x51mm",
            disc:"battle rifle cartridge notably found in the M14",
            weight:.0559,
            bWeight:.022,
            supplyIndex:2,
            pen:cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_762x51
        },
        c300:{
            name:".300 WSM",
            disc:"sniper rifle cartridge",
            bWeight:.022,
            weight:.0648,
            supplyIndex:2,
            pen:cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_300WM
        },
        c338:{
            name:".338 lapua",
            disc:"sniper rifle cartridge",
            weight:.0648,//guess rip from 300 wsm
            bWeight:.032,
            supplyIndex:2,
            pen:cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_338
        },
        c12_7:{
            name:"12.7mm",
            disc:"sniper rifle cartridge",
            weight:.24,//a guess because EVERYONE KNOWS HOW TO MEASURE DIAMETER BUT NOBODY THOUGHT TO USE A SCALE
            bWeight:.131,
            supplyIndex:2,
            pen:cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_12_7
        },
        c50bmg:{
            name:".50 BMG",
            disc:"sniper rifle cartridge",
            weight:.092,
            supplyIndex:2,
            pen:cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_50
        },
    },
    mags:{
        referenceMag:{
            name:"",//name of the mag
            disc:"",//disc of the mag
            caliber:"",//caliber of the weapon
            capacity:0,//number of rounds it can hold
            weight:0,//weight, pounds
            quality:5,
            hasSidePort:0,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_D60AR:{
            name:"Magpul PMAG 60 M4 Gen M3",//name of the mag
            disc:"Modern plastic AR 5.56 drum",//disc of the mag
            caliber:"5.56x45mm",//caliber of the weapon
            capacity:60,//number of rounds it can hold
            weight:1.281,//weight, pounds
            quality:5,
            hasSidePort:1,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_P40AR:{
            name:"Magpul PMAG 40 M4 Gen M3",//name of the mag
            disc:"Modern 40 round polymer mag",//disc of the mag
            caliber:"5.56x45mm",//caliber of the weapon
            capacity:40,//number of rounds it can hold
            weight:.39,//weight, pounds
            quality:5,
            hasSidePort:0,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_P30AR:{
            name:"Magpul PMAG 30 M4 Gen M3",//name of the mag
            disc:"Modern 40 round polymer mag with window",//disc of the mag
            caliber:"5.56x45mm",//caliber of the weapon
            capacity:30,//number of rounds it can hold
            weight:.297,//weight, pounds
            quality:5,
            hasSidePort:1,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_USGI30AR:{
            name:"USGI 30 magazine",//name of the mag
            disc:"Standard-issue US aluminum mag",//disc of the mag
            caliber:"5.56x45mm",//caliber of the weapon
            capacity:30,//number of rounds it can hold
            weight:.25,//weight, pounds
            quality:4.5,
            hasSidePort:1,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_AK74_30:{
            name:"Combloc AK-74 magazine",//name of the mag
            disc:"Standard-issue combloc mag",//disc of the mag
            caliber:"5.45x39mm",//caliber of the weapon
            capacity:30,//number of rounds it can hold
            weight:.5625,//weight, pounds
            quality:4.5,
            hasSidePort:0,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_RPK74M_45:{
            name:"Russian RPK-74M magazine",//name of the mag
            disc:"Standard-issue russian mag",//disc of the mag
            caliber:"5.45x39mm",//caliber of the weapon
            capacity:45,//number of rounds it can hold
            weight:.625,//weight, pounds
            quality:4.5,
            hasSidePort:0,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_RPK74_45:{
            name:"Russian RPK-74 magazine",//name of the mag
            disc:"Standard-issue bakelite combloc mag",//disc of the mag
            caliber:"5.45x39mm",//caliber of the weapon
            capacity:45,//number of rounds it can hold
            weight:.625,//weight, pounds
            quality:4.5,
            hasSidePort:0,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_AK74M_30:{
            name:"AK-74M magazine",//name of the mag
            disc:"Standard-issue russian mag",//disc of the mag
            caliber:"5.45x39mm",//caliber of the weapon
            capacity:30,//number of rounds it can hold
            weight:.51,//weight, pounds
            quality:4.5,
            hasSidePort:0,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_AK47_30_Early:{
            name:"AK-47 magazine, early issue",//name of the mag
            disc:"Standard-issue combloc mag",//disc of the mag
            caliber:"7.62x39mm",//caliber of the weapon
            capacity:30,//number of rounds it can hold
            weight:.95,//weight, pounds
            quality:4.4,
            hasSidePort:0,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_AK47_30_S:{
            name:"AK-47 magazine, steel",//name of the mag
            disc:"Standard-issue combloc mag, came after the early issue but before plastic",//disc of the mag
            caliber:"7.62x39mm",//caliber of the weapon
            capacity:30,//number of rounds it can hold
            weight:.73,//weight, pounds
            quality:4.4,
            hasSidePort:0,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_AK47_30_P:{
            name:"AK-47 magazine, plastic",//name of the mag
            disc:"Standard-issue combloc mag, came after the steel but before light alloy",//disc of the mag
            caliber:"7.62x39mm",//caliber of the weapon
            capacity:30,//number of rounds it can hold
            weight:.55,//weight, pounds
            quality:4.5,
            hasSidePort:0,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_AK47_30_LA:{
            name:"AK-47 magazine, light alloy",//name of the mag
            disc:"Latest-issue combloc mag",//disc of the mag
            caliber:"7.62x39mm",//caliber of the weapon
            capacity:30,//number of rounds it can hold
            weight:.37,//weight, pounds
            quality:4.5,
            hasSidePort:0,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_AK12_30:{
            name:"AK-47 magazine, light alloy",//name of the mag
            disc:"Latest-issue combloc mag",//disc of the mag
            caliber:"5.45x39mm",//caliber of the weapon
            capacity:30,//number of rounds it can hold
            weight:.425,//weight, pounds
            quality:5,
            hasSidePort:1,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_AK47_40_P:{
            name:"AK-47 40 round magazine, bakelite",//name of the mag
            disc:"Bakelite 40 rounder",//disc of the mag
            caliber:"7.62x39mm",//caliber of the weapon
            capacity:40,//number of rounds it can hold
            weight:.5625,//weight, pounds
            quality:5,
            hasSidePort:0,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_M9_15:{
            name:"M9 magazine",//name of the mag
            disc:"15 round classic mag for the 92FS",//disc of the mag
            caliber:"9x19mm",//caliber of the weapon
            capacity:15,//number of rounds it can hold
            weight:.238,//guess, the stats I could find were for guns with mags inserted but empty, and guns with mags inserted and full
            quality:5,
            hasSidePort:0,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_m17_M18_17:{
            name:"M17/18 magazine",//name of the mag
            disc:"17 round 9mm mag for the Sig Sauer pistol",//disc of the mag
            caliber:"9x19mm",//caliber of the weapon
            capacity:17,//number of rounds it can hold
            weight:.238,//guess, nobody fucking weighs their mags it seems
            quality:5,
            hasSidePort:0,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_HKG3_762_20_A:{
            name:"H&K G3 7.62x51mm 20 round magazine, alloy",//name of the mag
            disc:"note that the sim has multiple H&K variants",//disc of the mag
            caliber:"9x19mm",//caliber of the weapon
            capacity:17,//number of rounds it can hold
            weight:.238,//guess, nobody fucking weighs their mags it seems
            quality:5,
            hasSidePort:0,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_M240_50Sack:{
            name:"M240 bag",//name of the mag
            disc:"ammo sack",//disc of the mag
            caliber:"7.62x51mm",//caliber of the weapon
            capacity:50,//number of rounds it can hold
            weight:1,//guess, it's a bag but I also have to account for the links, which will add weight
            quality:4.5,
            hasSidePort:1,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_M249_100Sack:{
            name:"M249 100 round bag",//name of the mag
            disc:"balls",//disc of the mag
            caliber:"5.56x45mm",//caliber of the weapon
            capacity:100,//number of rounds it can hold
            weight:1,//guess, it's a bag but I also have to account for the links, which will add weight
            quality:4.5,
            hasSidePort:1,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_PKP_100Sack:{
            name:"PKP 100 round bag",//name of the mag
            disc:"balls",//disc of the mag
            caliber:"7.62x54mmr",//caliber of the weapon
            capacity:100,//number of rounds it can hold
            weight:1.5,//guess, it's a bag but I also have to account for the links, which will add weight
            quality:4.5,
            hasSidePort:1,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_SVD_10:{
            name:"SVD magazine, metal",//name of the mag
            disc:"unfortunately had to source the weight form tarkov.....",//disc of the mag
            caliber:"7.62x54mmr",//caliber of the weapon
            capacity:10,//number of rounds it can hold
            weight:.247,
            quality:4.5,
            hasSidePort:0,//whether it has a side viewing port. Very minor power bonus. 
        },
        m_M110A1_10:{
            name:"M110A1 magazine, plastic",//name of the mag
            disc:"the magazine comes in 10 and 20 round variants, this is the 10 round version",//disc of the mag
            caliber:"7.62x51mm",//caliber of the weapon
            capacity:10,//number of rounds it can hold
            weight:.243,
            quality:5,
            hasSidePort:1,//the whole thing is translucent
        },
        m_M110A1_20:{
            name:"M110A1 magazine, plastic",//name of the mag
            disc:"the magazine comes in 10 and 20 round variants, this is the 20 round version",//disc of the mag
            caliber:"7.62x51mm",//caliber of the weapon
            capacity:20,//number of rounds it can hold
            weight:.353,
            quality:5,
            hasSidePort:1,//the whole thing is translucent
        },


    },
    specialAmmunition:{
        sA_FGM148A_HEAT:{
            name:"FGM-148 round",
            disc:"Standard HEAT round for pre-javelin-F models, uses listed range for pre L-CLU models",
            serial:"",
            weight:35,
            range:2734,
            penRHA:760,
            explType:cfg.multipliers.personnel.weapons.explosives.expl_IMX101.tntMult,
            warheadWeight:19,//pounds TNT
            warHeadType:1,//1 HEAT, 2 HE, 3 HE/Frag, 4 pure kenetic
            useCase:[1,1,1,1,1,0,0,0],//static light positions, bunkers, unarmored vehicles, light vehicles, heavy vehicles, drones, helicopters, combat aircraft
            guidance:[0,0,0,1,0],//method of target tracking. 0 is manual, 1 is predicted impact point, 2 is wire guided, 3 is active homing IR, 4 is active homing TV,
            fireAndForget:1,
            softLaunch:1
        },
        sA_RPG7_PG7VL_HEAT:{
            name:"PG-7VL",
            disc:"standard HEAT rocket found with the RPG-7 series",
            serial:"",
            weight:5.7,
            range:750,
            penRHA:550,
            explType:cfg.multipliers.personnel.weapons.explosives.expl_OFKOL.tntMult,
            warheadWeight:1.61,
            warHeadType:1,//1 HEAT, 2 HE, 3 HE/Frag, 4 pure kenetic
            useCase:[1,1,1,1,0,0,0,0],//static light positions, bunkers, unarmored vehicles, medium vehicles, heavy vehicles, drones, helicopters, combat aircraft
            guidance:[1,0,0,0,0],//method of target tracking. 0 is no, 1 is predicted impact point, 2 is wire guided, 3 is active homing IR, 4 is active homing TV,
            fireAndForget:1,
            softLaunch:1
        },
        sA_RPG7_PG7VR_THEAT:{
            name:"PG-7VR",
            disc:"tandem charge HEAT for the RPG-7 series",
            serial:"",
            weight:9.9,
            range:350,
            penRHA:750,
            explType:cfg.multipliers.personnel.weapons.explosives.expl_OFKOL.tntMult,
            warheadWeight:3.153,
            warHeadType:1,//1 HEAT, 2 HE, 3 HE/Frag, 4 pure kenetic
            useCase:[1,1,1,1,1,0,0,0],//static light positions, bunkers, unarmored vehicles, medium vehicles, heavy vehicles, drones, helicopters, combat aircraft
            guidance:[1,0,0,0,0],//method of target tracking. 0 is no, 1 is predicted impact point, 2 is wire guided, 3 is active homing IR, 4 is active homing TV,5 is laser,
            fireAndForget:1,
            softLaunch:1
        },
        sA_RPG7_OG7V_FRAG:{
            name:"OG-7V",
            disc:"tandem charge HEAT for the RPG-7 series",
            serial:"",
            weight:4,
            range:750,
            penRHA:0,
            explType:cfg.multipliers.personnel.weapons.explosives.expl_OFKOL.tntMult,
            warheadWeight:.463,
            warHeadType:3,//1 HEAT, 2 HE, 3 HE/Frag, 4 pure kenetic
            useCase:[1,0,1,0,0,0,0,0],//static light positions, bunkers, unarmored vehicles, medium vehicles, heavy vehicles, drones, helicopters, combat aircraft
            guidance:[1,0,0,0,0],//method of target tracking. 0 is no, 1 is predicted impact point, 2 is wire guided, 3 is active homing IR, 4 is active homing TV,
            fireAndForget:1,
            softLaunch:1
        },
        sA_M136_HEAT:{
            name:"M136 AT4",
            disc:"standard HEAT AT4 rocket, note that the AT4 is single shot",
            serial:"",
            weight:14.8,
            range:328,
            penRHA:450,
            explType:cfg.multipliers.personnel.weapons.explosives.expl_Octol.tntMult,
            warheadWeight:.97,
            warHeadType:1,//1 HEAT, 2 HE, 3 HE/Frag, 4 pure kenetic
            useCase:[1,1,1,1,0,0,0,0],//static light positions, bunkers, unarmored vehicles, medium vehicles, heavy vehicles, drones, helicopters, combat aircraft
            guidance:[1,0,0,0,0],//method of target tracking. 0 is no, 1 is predicted impact point, 2 is wire guided, 3 is active homing IR, 4 is active homing TV,
            fireAndForget:1,
            softLaunch:0
        },
        sA_RPG26_HEAT:{
            name:"RPG-26",
            disc:"standard RPG-26 rocket",
            serial:"",
            weight:6.4,
            range:270,
            penRHA:440,
            explType:cfg.multipliers.personnel.weapons.explosives.expl_OFKOL.tntMult,
            warheadWeight:1,
            warHeadType:1,//1 HEAT, 2 HE, 3 HE/Frag, 4 pure kenetic
            useCase:[1,1,1,1,0,0,0,0],//static light positions, bunkers, unarmored vehicles, medium vehicles, heavy vehicles, drones, helicopters, combat aircraft
            guidance:[1,0,0,0,0],//method of target tracking. 0 is no, 1 is predicted impact point, 2 is wire guided, 3 is active homing IR, 4 is active homing TV,
            fireAndForget:1,
            softLaunch:0
        },
    },
    uBGLAmmunition:{
        uA_40mm:{
            name:"M433",
            disc:"High Explosive Dual Purpose round for western 40mm grenade launchers, namely the M203 and M320. Not used in the MK-19",
            weight:.5,
            lethalRadius:5.468,
            range:273,
        },
        uA_40mmRU:{
            name:"VOG-25",
            disc:"High Explosive round for eastern 40mm grenade launchers, namely the GP-25 pattern",
            weight:.55,
            lethalRadius:6.562,
            range:248.43,
        },
        
    }
};
const tComponents={//30 round 7.62 mag weighs 1.99 lbs
    names:{
        firstNames:[
            [//USA
                [//male
                    "John",
                    "John",
                    "Michael",
                    "Michael",
                    "Robert",

                    "Robert",
                    "David",
                    "David",
                    "David",
                    "James",



                    "James",
                    "James",
                    "William",
                    "William",
                    "Richard",

                    "Thomas",
                    "Thomas",
                    "Mark",
                    "Charles",
                    "Joseph",


                    "Paul",
                    "Daniel",
                    "Steven",
                    "Brian",
                    "Donald",

                    "Kevin",
                    "Gary",
                    "Scott",
                    "George",
                    "Edward",



                    "Kenneth",
                    "Jason",
                    "Ronald",
                    "Larry",
                    "Christopher",

                    "Jose",
                    "Anthony",
                    "Eric",
                    "Matthew",
                    "Stephen",



                    "Frank",
                    "Andrew",
                    "Timothy",
                    "Joe",
                    "Jerry",

                    "Peter",
                    "Jim",
                    "Patrick",
                    "Dennis",
                    "Jeff",

                    "Wesley",
                    "Lucas",
                    "Andrew",
                    "Andrii",
                    "Andre",

                    "Daniel",
                    "Darren",
                    "Fred",
                    "James",
                    "Juan",

                    "Derek",
                    "Kennet",
                    "Aaron",
                    "Alrikr",
                    "Koa",

                    "George",
                    "Dylan",
                    "Ross",
                    "Brian",
                    "Roberto",

                    "Dakota",
                    "Tristian",
                    "Alex",
                    "Sean",
                    "Clint",

                    "Max",
                    "Gage",
                    "Nick",
                    "Jackson",
                    "Sergei",

                    "Eytan",
                    "Adam",
                    "Luke",
                    "Andrs",
                    "Dan",

                    


                ],
                [//female
                    "Mary",
                    "Payton",
                    "Barbara",
                    "Grace",
                    "Annabelle",
                    "Sarah",
                    "Eliana",
                    "Lauren",
                    "Kelly",
                    "Emily",
                    "Naomi",
                    "Kristen",
                    "Sally",
                    "Bo-Ann",
                    "Lydia",
                ]
            ],
            [//Russia
                [//male
                    "Sergey",
                    "Sergey",
                    "Sergey",
                    "Sergey",
                    "Aleksandr",

                    "Aleksandr",
                    "Aleksandr",
                    "Andrey",
                    "Andrey",
                    "Dmitry",



                    "Dmitry",
                    "Vladimir",
                    "Vladimir",
                    "Aleksey",
                    "Aleksey",

                    "Maksim",
                    "Ivan",
                    "Evgeniy",
                    "Alexander",
                    "Nikolay",




                    "Mikhail",
                    "Denis",
                    "Roman",
                    "Pavel",
                    "Igor",

                    "Anton",
                    "Nikita",
                    "Oleg",
                    "Ilya",
                    "Viktor",



                    "Alexey",
                    "Konstantin",
                    "Artyom",
                    "Kirill",
                    "Yuriy",

                    "Dimitry",
                    "Ruslan",
                    "Vadim",
                    "Vitaliy",
                    "Artem",



                    "Evgeny",
                    "Danila",
                    "Danila",
                    "Danila",
                    "Stanislov",

                    "Egor",
                    "Vasily",
                    "Vladislav",
                    "Maxim",
                    "Artur"


                ],
                [//female
                    "Elena",
                    "Tatyana",
                    "Olga",
                    "Natalya",
                    "Ekaterina",
                    "Irina",
                    "Svetlana",
                    "Anastasiya",
                    "Anna",
                    "Elizaveta"
                ]
            ],
            [//Abkhazia
                [//male
                "Giorgi",
                "Giorgi",
                "Giorgi",
                "Davit",
                "Davit",
                "Irakli",
                "Irakli",
                "Zurab",
                "Levan",
                "Aleqsandre",/*


                */
                "Merab",
                "Tamaz",
                "Temur",
                "Tengiz",
                "Vakhtang",
                "Lasa",
                "Mamuka",
                "Gotsag",
                "Avtandil",
                "Givi",/*


                */
               "Guram",
               "Nugzar",
               "Shota",
               "Luka",
               "Nikoloz",
               "Vladimer",
               "Nodar",
               "Zaza",
               "Mikheil",
               "Revaz",/*

               */
              "Gela",
              "Badri",
              "Malkha",
              "Nika",
              "Otar",
              "Teimuraz",
              "Gia",
              "Roman",
              "Amiran",
              "Besik",


              "Koba",
              "Koba",
              "Salva",
              "Akaki",
              "Vaja",
              "Veliri",
              "Omar",
              "Sergo",
              "Luri",
              "Boris"



                ],
                [//female
                    "Nino",
                    "Nana",
                    "Tamar",
                    "Marina",
                    "Manana",
                    "Maia",
                    "Natela",
                    "Ana",
                    "Liana",
                    "Lali"
                ]
            ],
            [//Georgia
                [//male
                    "Giorgi",
                    "Giorgi",
                    "Giorgi",
                    "Giorgi",
                    "Davit",

                    "Davit",
                    "Aleqsandre",
                    "Aleqsandre",
                    "Irakli",
                    "Irakli",



                    "Zurab",
                    "Levan",
                    "Nikoloz",
                    "Mikheil",
                    "Gocha",

                    "Givi",
                    "Mamuka",
                    "Daviti",
                    "Lasa",
                    "Zaza",

                    
                    "Shota",
                    "Avtandil",
                    "Nika",
                    "Gela",
                    "Tamaz",

                    "Luka",
                    "Salva",
                    "Teimuraz",
                    "Guram",
                    "Nodar",


                    "Vladimer",
                    "Zurabi",
                    "Levani",
                    "Vaja",
                    "Tornike",

                    "Beqa",
                    "Ivane",
                    "Sergo",
                    "Vakhtang",
                    "Ilia",


                    "Gia",
                    "Tengiz",
                    "Amiran",
                    "Merab",
                    "Otar",


                    "Akaki",
                    "Badri",
                    "Koba",
                    "Paata",
                    "Nugzar"

                ],
                [//female
                    "Nino",
                    "Tamar",
                    "Mariam",
                    "Maia",
                    "Anna",
                    "Nana",
                    "Manana",
                    "Tamari",
                    "Marine",
                    "Marina"
                ]
            ],
            [//england
                [//male
                    "David",
                    "David",
                    "John",
                    "John",
                    "Michael",


                    "Paul",
                    "Andrew",
                    "Peter",
                    "James",
                    "Robert",


                    "Mark",
                    "Richard",
                    "Stephen",
                    "Christopher",
                    "Ian",

                    "Steven",
                    "Thomas",
                    "William",
                    "Alan",
                    "Anthony",


                    "Simon",
                    "Brian",
                    "Daniel",
                    "Martin",
                    "Matthew",

                    "Kevin",
                    "Philip",
                    "Gary",
                    "Colin",
                    "Graham",


                    "George",
                    "Neil",
                    "Keith",
                    "Lee",
                    "Jonathan",

                    "Stuart",
                    "Kenneth",
                    "Adam",
                    "Edward",
                    "Darren",

                    
                    "Jason",
                    "Raymond",
                    "Ronald",
                    "Joseph",
                    "Benjamin",

                    "Barry",
                    "Derek",
                    "Craig",
                    "Roger",
                    "Tony"
                ],
                [//female
                    "Susan",
                    "Margaret",
                    "Sarah",
                    "Patricia",
                    "Elizabeth",
                    "Mary",
                    "Julie",
                    "Christine",
                    "Helen"
                ]
            ],
            [
                [//male
                    "Mehmet",
                    "Mehmet",
                    "Mehmet",
                    "Mustafa",
                    "Mustafa",

                    "Ahmet",
                    "Ahmet",
                    "Ali",
                    "Ali",
                    "Hasan",


                    "Huseyin",
                    "Ibrahim",
                    "Murat",
                    "Ismail",
                    "Omer",

                    "Osman",
                    "Ramazan",
                    "Halil",
                    "Yusuf",
                    "Abdullah",


                    "Suleyman",
                    "Fatih",
                    "Mahmut",
                    "Recep",
                    "Hakan",

                    "Adem",
                    "Metin",
                    "Kemal",
                    "Kadir",
                    "Salih",


                    "Orhan",
                    "Serkan",
                    "Gokhan",
                    "Bayram",
                    "Ugur",

                    "Yunus",
                    "Ayhan",
                    "Muhammet",
                    "Emre",
                    "Yilmaz",


                    "Bekir",
                    "Musa",
                    "Erkan",
                    "Mesut",
                    "Bulent",

                    "Ercan",
                    "Sinan",
                    "Erol",
                    "Cemal",
                    "Cengiz"



                ],
                [//female
                    "Fatma",
                    "Ayse",
                    "Emine",
                    "Hatice",
                    "Zeynep",
                    "Elif",
                    "Meryem",
                    "Sultan",
                    "Ozlem",
                    "Hulya"
                ]
            ]
        ],
        lastNames:[
            [//USA
                "Kuenzi",
                "Reynolds",
                "Sebastian",
                "Bruneau",
                "Tilley",

                "Scovel",
                "Devereux",
                "Lord",
                "Wheatley",
                "Zylath",


                "Hanley",
                "Barazal",
                "Baltazar",
                "Patton",
                "Waters",

                "Mello",
                "Greeves",
                "Holley",
                "Wells",
                "Doyle",



                "Cyr",
                "Mueller",
                "Hanma",
                "Dawdy",
                "Parrish",

                "Marques",
                "Barquest",
                "Patterson",
                "Esquivel",
                "Wash",


                "Holmes",
                "Bat",
                "Murray",
                "Voth",
                "Holtz",
                
                "Wallison",
                "Fleming",
                "Sanzotera",
                "O'Meara",
                "Capwell",


                "Knife",
                "Buckeye",
                "Chine",
                "Meerts",
                "Chang",

                "Familiant",
                "Denk",
                "Kieurlik",
                "Vermillion",
                "Kondrath",

                
                "Mallum",
                "Howell",
                "Castillo",
                "McVeigh",
                "Jones",

                "Weaver",
                "Ostrowski",
                "Holsey",
                "Snowden",
                "Waterford",

                "Wesson",
                "Smith",
                "Mud",
                "Sanzotera",
                "Wallison",

                "Creevy",
                "Ferry",
                "Hopanchuk",
                "Stutz",
                "Duran",

                "Michel",
                "Apostolidis",
                "Wolk",
                "Sebastiani",
                "Bogach",

                "Nad",
                "Winston",
                "Ryan",
                "Mattox",
                "Roberts",

                "Cowles",
                "Chandonnet",
                "Gao",
                "Montgomery",
                "Willberg",

                "Vermillion",
                "Hope",
                "Thuenderecok",
                "Hauger",
                "Chang",

                "Simpson",
                "White",
                "Goodman",
                "Chops",
                "Knife",

                "Boon",
                "Briggs",
                "Legros",
                "Roy",
                "Tipton",

                "Hesse",
                "Pinkman",
                "Leupold",
                "Colt",
                "Fleming",

                "Girasimov",
                "Holmes",
                "Voth",
                "Mueller",
                "Stewart",

                "Bradley",
                "Sherman",
                "Panther",
                "Vickers",
                "Abrams",

                "Miltiades",
                "Agrippa",
                "Khan",
                "Drake",
                "West",

                "East",
                "North",
                "Cromwell",
                "Washington",
                "Lincoln",

                "Ford",
                "Truman",
                "Nixon",
                "Jackson",
                "Ney",

                "Botha",
                "Farragut",
                "Forrest",
                "Burke",
                "Ticonderoga",

                "Grant",
                "Lee",
                "Allenby",
                "Hindenburg",
                "Ataturk",

                "Ludendorff",
                "Monash",
                "Pershing",
                "Dowding",
                "Guderian",

                "Halsey",
                "LeMay",
                "Mannerheim",
                "Manstein",
                "Patton Jr.",

                "Slim",
                "Spruance",
                "Zhukov",
                "Dayan",
                "Moore",

                "Puller",
                "Ridgway",
                "Schwarzkopf",
                "Harris",
                "Roosevelt",

                "Wasserfall",
                "Charlet",
                "O'Sullivan",
                "Rader",
                "Hosenfeld",

                "Kugler",
                "Fry",
                "Sharp",
                "Elmes",
                "Friedman",

                "Wiesenthal",
                "Welles",
                "Sayer",
                "Greene",
                "Shapsis"

            ],
            [//Russia
                "Ivanov",
                "Petrov",
                "Sidorov",
                "Smirnoff",
                "Volkov",

                "Federov",
                "Popov",
                "Semenov",
                "Mikhailov",
                "Egorov",


                "Lenkov",
                "Vasiliev",
                "Meerts",
                "Chyorny",
                "Nikolaev",

                "Morozov",
                "Stepanov",
                "Novikov",
                "Koslov",
                "Pavlov",


                "Sokolov",
                "Lebedev",
                "Kuznetzov",
                "Putin",
                "Orlov",

                "Ovechkin",
                "Nikitin",
                "Preobrazhensky",
                "Golubev",
                "Familiant",


                "Pasternak",
                "Zaitsev",
                "Vinogradov",
                "Belyaev",
                "Agapov",
                

                "Antonov",
                "Angeloff",
                "Balabanov",
                "Turgenev",
                "Yahontov",



                "Abakumov",
                "Abdulov",
                "Abramov",
                "Agafonov",
                "Pepin",

                "Andreyev",
                "Arsenyev",
                "Belov",
                "Balakin",
                "Balakirev",
            ],
            [//Abkhazia
                "Rekhviashvili",
                "Maisuradze",
                "Kvaratskhelia",
                "Shonia",
                "Gogokhia",

                "Tsaldadze",
                "Kopalyan",
                "Qardava",
                "Metreveli",
                "Pipia",


                "Shengalia",
                "Todua",
                "Khurtsilava",
                "Qobalia",
                "Tsulaia",

                "Gogoryan",
                "Rukhaia",
                "Tchanturia",
                "Abshilava",
                "Gogoberishvili",


                "Danelia",
                "Natchkhebia",
                "Bendelyan",
                "Tsaava",
                "Berulava",

                "Saminava",
                "Gasvyan",
                "Jalaghonia",
                "Tsanava",
                "Gogia",


                "Tseladze",
                "Sajaia",
                "Gogua",
                "Jiqia",
                "Kholbaia",

                "Vekua",
                "Zarqua",
                "Tsurtsumia",
                "Akhalaila",
                "Lobjanidze",


                "Shamugia",
                "Miqava",
                "Papava",
                "Mushkudyan",
                "Kalandia",

                "Javjani",
                "Gabelia",
                "Kvitsyan",
                "Qarchava",
                "Kharaishvili",



                "Gabunia",
                "Svanidze",
                "Janashia",
                "Govejishvili",
                "Lomidze",

                "Melashvili",
                "Ugrekhelidze",
                "Karaeva",
                "Benidze",
                "Gagua"

            ],
            [//Georgia
                "Beridze",
                "Kapanadze",
                "Gelashvili",
                "Mamedov",
                "Maisuradze",
                
                "Giorgadze",
                "Tsiklauri",
                "Lomidze",
                "Mamedova",
                "Tskhoidze",


                "Nozadze",
                "Bolqvadze",
                "Chikhladze",
                "Khachishvili",
                "Aliev",

                "Abuladze",
                "Miqeladze",
                "Tabatadze",
                "Medolishvili",
                "Shengalia",


                "Gogoladze",
                "Diasamdize",
                "Abasi",
                "Dolidze",
                "Maraushvili",

                "Dzavasvhili",
                "Kvaratskhelia",
                "Alieva",
                "Dolidze",
                "Maraushvili",


                "Dzavashvili",
                "Kvaratskhelia",
                "Alieva",
                "Tsertsvadze",
                "Qavtaradze",

                "Qatamadze",
                "Dzneladze",
                "Metreveli",
                "Dumbadze",
                "Putkaradze",


                "Japaridze",
                "Barbaqadze",
                "Surmanidze",
                "Davitadze",
                "Samkharadze",

                "Kobakhia",
                "Meladze",
                "Chinchikadze",
                "Sikharulidze",
                "Tchelidze",


                "Modebadze",
                "Jintcharadze",
                "Dzanashvili",
                "Bairamov",
                "Lobjanidze",

                "Mumladze",
                "Kurtanidze",
                "Razmadze",
                "Todua",
                "Kiknadze",
            ],
        ],
        ranks:[
            [//USA
                [//army
                    [//rifleman
                        "Private",
                        "Private First Class",
                        "Private First Class",    
                        "Corporal",
                        "Private First Class"
                    ],
                    [//fire team leader
                        "Sergeant",
                    ],
                    [//squad leader
                        "Staff Sergeant",
                    ],
                    [//assistant platoon leader
                        "Sergeant First Class",
                    ],
                    [//platoon leader
                        "Lieutenant",
                    ],
                    [//assistant company leader
                        "First Sergeant",
                    ],
                    [//company leader
                        "Captain",
                    ],
                    [//assistant battalion leader
                        "Command Sergeant Major",
                    ],
                    [//battalion leader
                        "Lieutenant Colonel"
                    ],
                    [//assistant brigade leader
                        "Command Sergeant Major",
                    ],
                    [//brigade leader
                        "Colonel",
                    ],
                    [//assistant division leader
                        "Brigadier General",
                        "Brigadier General",
                        "Command Sergeant Major",
                    ],
                    [//division leader
                        "Major General",
                    ],
                    [//assistant corps leader
                        "Command Sergeant Major",
                    ],
                    [//corps leader
                        "Lieutenant General"
                    ],
                    [//wingmen
                        "Warrant Officer 1",
                        "Chief Warant Officer 2",
                        "Chief Warant Officer 2",
                        "Chief Warrant Officer 3"

                        
                    ],
                    [//leaders of 2-ship flights or command of a single multi crew aircraft, can progress further to get to 4-ship flight lead
                        "Chief Warrant Officer 3",
                    ],
                    [//squadron leadership
                        "Chief Warrant Officer 4"
                    ],
                    [//squadron commander
                        "Chief Warrant Officer 5"
                    ]
                    
                ],
                [//air force
                    [//rifleman//element
                        "Airman Basic",
                        "Airman",
                        "Airman",
                        "Airman First Class",
                        "Airman First Class",
    
                    ],
                    [//fire team leader//element leader
                        "Senior Airman",
                        "Senior Airman",
                        "Senior Airman",
                        "Senior Airman",
                        "Senior Airman",
                        "Staff Sergeant",
                        "Staff Sergeant",
                        "Staff Sergeant",
                        "Staff Sergeant",
                        "Tech Sergeant"
                    ],
                    [//squad leader//element leader
                        "Staff Sergeant"
                    ],
                    [//assistant platoon leader
                        "Master Sergeant",
                    ],
                    [//platoon leader// Flight
                        "2nd Lieutenant",
                        "1st Lieutenant",
                        "1st Lieutenant",
                        "2nd Lieutenant",
                        "Captain"
                    ],
                    [//assistant company leader
                        "Sergeant Major",
                        "Major",
                        "Senior Captain",
                        "Sergeant Major",
                    ],
                    [//company leader//squadron
                        "Major",
                        "Lieutenant Colonel",
                        "Lieutenant Colonel",
                        "Lieutenant Colonel"
                    ],
                    [//assistant battalion leader
                        "Colonel",
                        "Lieutenant Colonel",
                        "Lieutenant Colonel",
                    ],
                    [//battalion leader//wing
                        "Colonel",
                    ],
                    [//assistant brigade leader
                        "Colonel"
                    ],
                    [//brigade leader//numbered air force
                        "Major General",
                        "Lieutenant General",
                    ],
                    [//assistant division leader
                        "Lieutenant General",
                        "Major General"
                    ],
                    [//division leader//MAJCOM
                        "General"
                    ],
                    [//assistant corps leader
    
                    ],
                    [//corps leader
    
                    ],
                    [//wingmen
                        "Second Lieutenant",
                        "Second Lieutenant",
                        "First Lieutenant",
                        "First Lieutenant",
                        "First Lieutenant",
                        
                    ],
                    [//leaders of 2-ship flights or command of a single multi crew aircraft, can progress further to get to 4-ship flight lead
                        "Captain",
                        "Captain",
                        "Captain",
                        "Major",
                    ],
                    [//high level leadership
                        "Colonel",
                        "Colonel",
                        "Lieutenant Colonel"
                    ],
                    [//squadron commander
                        "Lieutenant Colonel"
                    ]
                    
                ],
                [//navy
                    [//rifleman//element
                        "Seaman Apprentice",
                        "Seaman",
                        "Seaman",
                        "Seaman",
    
                    ],
                    [//fire team leader//element leader
                        "Petty Officer Third Class"
                    ],
                    [//squad leader//element leader
                        "Petty Officer Second Class"
                    ],
                    [//assistant platoon leader
                        "Petty Officer First Class",
                    ],
                    [//platoon leader// Flight
                        "Ensign"
                    ],
                    [//assistant company leader
                        "Chief Petty Officer",
                        "Commander"//can also be a captain of a destroyer type ship
                    ],
                    [//company leader//captain of a cruiser or larger ship
                        "Captain"
                    ],
                    [//assistant battalion leader
      
                    ],
                    [//battalion leader//wing
                        "Lieutenant",
                    ],
                    [//assistant brigade leader
                        "Captain"
                    ],
                    [//brigade leader//numbered air force
                        "Rear Admiral Upper Half"
                    ],
                    [//assistant division leader   
                        "Vice Admiral",
                    ],
                    [//division leader//MAJCOM
                        "Admiral",
                    ],
                    [//assistant corps leader
    
                    ],
                    [//corps leader
    
                    ],
                    //each squadron should have roughly 1.5x as many pilots as aircraft, with anywhere from 8-20 aircraft being normal. 
                    [//wingmen
                        "Second Lieutenant",
                        "Second Lieutenant",
                        "First Lieutenant",
                        "First Lieutenant",
                        "First Lieutenant",
                        
                    ],
                    [//leaders of 2-ship flights or command of a single multi crew aircraft, can progress further to get to 4-ship flight lead
                        "Captain",
                        "Captain",
                        "Captain",
                        "Major",
                    ],
                    [//squadron leadership
                        "Colonel",
                        "Colonel",
                        "Lieutenant Colonel"
                    ],
                    [//squadron commander
                        "Lieutenant Colonel"
                    ]
                    
                ],
                [//marines
                    [//rifleman
                    "Private",
                    "Private First Class",
                    "Private First Class",    
                    "Lance Corporal",
                    "Lance Corporal",
                    "Private First Class",
                ],
                [//fire team leader
                    "Corporal",
                ],
                [//squad leader
                    "Sergeant",
                    "Sergeant",
                    "Sergeant",
                    "Corporal"
                ],
                [//assistant platoon leader
                    "Sergeant",
                    "Master Sergeant",
                    "Master Sergeant"
                ],
                [//platoon leader
                    "Staff Sergeant",
                    "Second Lieutenant",
                    "Second Lieutenant",
                    "Second Lieutenant",
                    "First Lieutenant"
                ],
                [//assistant company leader
                    "Gunnery Sergeant",
                    "Master Sergeant",
                    "First Lieutenant",
                ],
                [//company leader
                    "Captain",
                ],
                [//assistant battalion leader
                    "Sergeant Major",
                    "Master Gunnery Sergeant",
                ],
                [//battalion leader
                    "Lieutenant Colonel"
                ],
                [//assistant brigade leader
                    "Major",
                    "Sergeant Major",
                    "Command Sergeant Major",
                ],
                [//brigade leader
                    "Colonel",
                ],
                [//assistant division leader
                    "Brigadier General",
                    "Brigadier General",
                    "Command Sergeant Major",
                ],
                [//division leader
                    "Major General",
                ],
                [//assistant corps leader
                    "Command Sergeant Major",
                ],
                [//corps leader
                    "Lieutenant General"
                ],
                //each squadron should have roughly 1.5x as many pilots as aircraft, with anywhere from 8-20 aircraft being normal. 
                [//wingmen //all of this is directly copied from the USAF. I cannot discern if they are any different
                    "Second Lieutenant",
                    "Second Lieutenant",
                    "First Lieutenant",
                    "First Lieutenant",
                    "First Lieutenant",
                        
                ],
                [//leaders of 2-ship flights or command of a single multi crew aircraft, can progress further to get to 4-ship flight lead
                        "Captain",
                        "Captain",
                        "Captain",
                        "Major",
                ],
                [//senior leadership
                        "Colonel",
                        "Colonel",
                        "Lieutenant Colonel"
                ],
                [//squadron commander
                        "Lieutenant Colonel"
                ]
                ],
            ],
            [//Russia
                [//army
                    [//rifleman
                        "Private",
                        "Private First Class",
                        "Private First Class",    
                        "Private First Class"
                    ],
                    [//fire team leader
                        "Sergeant",
                        "Junior Sergeant"
                    ],
                    [//squad leader
                        "Staff Sergeant",
                        "First Sergeant"
                    ],
                    [//assistant platoon leader
                        "Junior Lieutenant"
                    ],
                    [//platoon leader
                        "Lieutenant",
                    ],
                    [//assistant company leader
                        "First Sergeant",
                    ],
                    [//company leader
                        "Captain",
                        "Senior Lieutenant",
                    ],
                    [//assistant battalion leader
                        "First Sergeant",
                    ],
                    [//battalion leader
                        "Lieutenant Colonel"
                    ],
                    [//assistant brigade leader
                        "Command Sergeant Major",
                    ],
                    [//brigade leader
                        "Colonel",
                    ],
                    [//assistant division leader
                        "Colonel Genmeral"
                    ],
                    [//division leader
                        "Colonel General",
                    ],
                    [//assistant corps leader
                        "Warrant Officer",
                    ],
                    [//corps leader
                        "Army General"
                    ],

                    [//wingmen
                        "Mladshiy Leytenant",
                        "Leytenant",
                        "Starshiy Leytenant",
                    ],
                    [//leaders of 2-ship flights or command of a single multi crew aircraft, can progress further to get to 4-ship flight lead
                        "Kapitan",
                        "Kapitan",
                        "Kapitan",
                        "Major"
                    ],
                    [
                        "Podpolkovnik"
                    ],
                    [//squadron commander
                        "Polkovnik"
                    ]
            
                ],
                [//air force
                    [//rifleman
                    "Private",
                    "Private First Class",
                    "Private First Class",    
                    "Private First Class"
                ],
                [//fire team leader
                    "Sergeant",
                    "Junior Sergeant"
                ],
                [//squad leader
                    "Staff Sergeant",
                    "First Sergeant"
                ],
                [//assistant platoon leader
                    "Junior Lieutenant"
                ],
                [//platoon leader
                    "Lieutenant",
                ],
                [//assistant company leader
                    "First Sergeant",
                ],
                [//company leader
                    "Captain",
                    "Senior Lieutenant",
                ],
                [//assistant battalion leader
                    "First Sergeant",
                ],
                [//battalion leader
                    "Lieutenant Colonel"
                ],
                [//assistant brigade leader
                    "Command Sergeant Major",
                ],
                [//brigade leader
                    "Colonel",
                ],
                [//assistant division leader
                    "Colonel Genmeral"
                ],
                [//division leader
                    "Colonel General",
                ],
                [//assistant corps leader
                    "Warrant Officer",
                ],
                [//corps leader
                    "Army General"
                ],

                    [//wingmen
                        "Mladshiy Leytenant",
                        "Leytenant",
                        "Starshiy Leytenant",
                    ],
                    [//leaders of 2-ship flights or command of a single multi crew aircraft, can progress further to get to 4-ship flight lead
                        "Kapitan",
                        "Kapitan",
                        "Kapitan",
                        "Major"
                    ],
                    [
                        "Podpolkovnik"
                    ],
                    [//squadron commander
                        "Polkovnik"
                    ]
                
                ],
                [//navy
                    [//rifleman
                        "Matros",
                        "Matros",
                        "Starshy Matros"
                    ],
                    [//fire team leader
                        "Starshy Matros"
                    ],
                    [//squad leader
                        "Starshina 2 Statji"
                    ],
                    [//assistant platoon leader
                        "Starshina 2 Statji"
                    ],
                    [//platoon leader
                        "Starshey Leytenant",
    
                    ],
                    [//assistant company leader
                        "Starshina 1 Statji",
                    ],
                    [//company leader
                        "Glavny Starshina",
                        "Mladshiy Leytenant",
                    ],
                    [//assistant battalion leader
                        "Glavny Starshina",
                    ],
                    [//battalion leader
                        "Kapitan-Leytenant"
                    ],
                    [//assistant brigade leader
                        "Glavny Starshina",
                    ],
                    [//brigade leader
                        "Kapitan 3-go ranga",
                    ],
                    [//assistant division leader
                        "Glavny korabelny starshina"
                    ],
                    [//division leader
                        "Kapitan 2-go ranga",
                    ],
                    [//assistant corps leader
                        "Warrant Officer",
                    ],
                    [//corps leader
                        "Army General"
                    ],

                        [//wingmen
                            "Mladshiy Leytenant",
                            "Leytenant",
                            "Starshiy Leytenant",
                        ],
                        [//leaders of 2-ship flights or command of a single multi crew aircraft, can progress further to get to 4-ship flight lead
                            "Kapitan",
                            "Kapitan",
                            "Kapitan",
                            "Major"
                        ],
                        [
                            "Podpolkovnik"
                        ],
                        [//squadron commander
                            "Polkovnik"
                        ]
                    
                ],
            ],
            [//Abkhazia
                [//army
                    [//rifleman
                    "Private",
                    "Private First Class",
                    "Private First Class",    
                    "Private First Class"
                ],
                [//fire team leader
                    "Sergeant",
                    "Junior Sergeant"
                ],
                [//squad leader
                    "Staff Sergeant",
                    "First Sergeant"
                ],
                [//assistant platoon leader
                    "Junior Lieutenant"
                ],
                [//platoon leader
                    "Lieutenant",
                ],
                [//assistant company leader
                    "First Sergeant",
                ],
                [//company leader
                    "Captain",
                    "Senior Lieutenant",
                ],
                [//assistant battalion leader
                    "First Sergeant",
                ],
                [//battalion leader
                    "Lieutenant Colonel"
                ],
                [//assistant brigade leader
                    "Command Sergeant Major",
                ],
                [//brigade leader
                    "Colonel",
                ],
                [//assistant division leader
                    "Colonel Genmeral"
                ],
                [//division leader
                    "Colonel General",
                ],
                [//assistant corps leader
                    "Warrant Officer",
                ],
                [//corps leader
                    "Army General"
                ],

                [//wingmen
                    "Mladshiy Leytenant",
                    "Leytenant",
                    "Starshiy Leytenant",
                ],
                [//leaders of 2-ship flights or command of a single multi crew aircraft, can progress further to get to 4-ship flight lead
                    "Kapitan",
                    "Kapitan",
                    "Kapitan",
                    "Major"
                ],
                [
                    "Podpolkovnik"
                ],
                [//squadron commander
                    "Polkovnik"
                ]
        
            ],
            [//air force
                [//rifleman
                "Private",
                "Private First Class",
                "Private First Class",    
                "Private First Class"
            ],
            [//fire team leader
                "Sergeant",
                "Junior Sergeant"
            ],
            [//squad leader
                "Staff Sergeant",
                "First Sergeant"
            ],
            [//assistant platoon leader
                "Junior Lieutenant"
            ],
            [//platoon leader
                "Lieutenant",
            ],
            [//assistant company leader
                "First Sergeant",
            ],
            [//company leader
                "Captain",
                "Senior Lieutenant",
            ],
            [//assistant battalion leader
                "First Sergeant",
            ],
            [//battalion leader
                "Lieutenant Colonel"
            ],
            [//assistant brigade leader
                "Command Sergeant Major",
            ],
            [//brigade leader
                "Colonel",
            ],
            [//assistant division leader
                "Colonel Genmeral"
            ],
            [//division leader
                "Colonel General",
            ],
            [//assistant corps leader
                "Warrant Officer",
            ],
            [//corps leader
                "Army General"
            ],

                [//wingmen
                    "Mladshiy Leytenant",
                    "Leytenant",
                    "Starshiy Leytenant",
                ],
                [//leaders of 2-ship flights or command of a single multi crew aircraft, can progress further to get to 4-ship flight lead
                    "Kapitan",
                    "Kapitan",
                    "Kapitan",
                    "Major"
                ],
                [
                    "Podpolkovnik"
                ],
                [//squadron commander
                    "Polkovnik"
                ]
            
            ],
            [//navy
                [//rifleman
                    "Matros",
                    "Matros",
                    "Starshy Matros"
                ],
                [//fire team leader
                    "Starshy Matros"
                ],
                [//squad leader
                    "Starshina 2 Statji"
                ],
                [//assistant platoon leader
                    "Starshina 2 Statji"
                ],
                [//platoon leader
                    "Starshey Leytenant",

                ],
                [//assistant company leader
                    "Starshina 1 Statji",
                ],
                [//company leader
                    "Glavny Starshina",
                    "Mladshiy Leytenant",
                ],
                [//assistant battalion leader
                    "Glavny Starshina",
                ],
                [//battalion leader
                    "Kapitan-Leytenant"
                ],
                [//assistant brigade leader
                    "Glavny Starshina",
                ],
                [//brigade leader
                    "Kapitan 3-go ranga",
                ],
                [//assistant division leader
                    "Glavny korabelny starshina"
                ],
                [//division leader
                    "Kapitan 2-go ranga",
                ],
                [//assistant corps leader
                    "Warrant Officer",
                ],
                [//corps leader
                    "Army General"
                ],

                    [//wingmen
                        "Mladshiy Leytenant",
                        "Leytenant",
                        "Starshiy Leytenant",
                    ],
                    [//leaders of 2-ship flights or command of a single multi crew aircraft, can progress further to get to 4-ship flight lead
                        "Kapitan",
                        "Kapitan",
                        "Kapitan",
                        "Major"
                    ],
                    [
                        "Podpolkovnik"
                    ],
                    [//squadron commander
                        "Polkovnik"
                    ]
                
            ],
            ],
            [//Georgia
                [//army
                    [//rifleman
                    "Private",
                    "Private First Class",
                    "Private First Class",    
                    "Corporal",
                    "Private First Class"
                ],
                [//fire team leader
                    "Sergeant",
                ],
                [//squad leader
                    "Staff Sergeant",
                ],
                [//assistant platoon leader
                    "Sergeant First Class",
                ],
                [//platoon leader
                    "Lieutenant",
                ],
                [//assistant company leader
                    "First Sergeant",
                ],
                [//company leader
                    "Captain",
                ],
                [//assistant battalion leader
                    "Command Sergeant Major",
                ],
                [//battalion leader
                    "Lieutenant Colonel"
                ],
                [//assistant brigade leader
                    "Command Sergeant Major",
                ],
                [//brigade leader
                    "Colonel",
                ],
                [//assistant division leader
                    "Brigadier General",
                    "Brigadier General",
                    "Command Sergeant Major",
                ],
                [//division leader
                    "Major General",
                ],
                [//assistant corps leader
                    "Command Sergeant Major",
                ],
                [//corps leader
                    "Lieutenant General"
                ],
                [//wingmen
                    "Warrant Officer 1",
                    "Chief Warant Officer 2",
                    "Chief Warant Officer 2",
                    "Chief Warrant Officer 3"

                    
                ],
                [//leaders of 2-ship flights or command of a single multi crew aircraft, can progress further to get to 4-ship flight lead
                    "Chief Warrant Officer 3",
                ],
                [//squadron leadership
                    "Chief Warrant Officer 4"
                ],
                [//squadron commander
                    "Chief Warrant Officer 5"
                ]
                
            ],
            [//air force
                [//rifleman//element
                    "Airman Basic",
                    "Airman",
                    "Airman",
                    "Airman First Class",
                    "Airman First Class",

                ],
                [//fire team leader//element leader
                    "Senior Airman",
                    "Senior Airman",
                    "Senior Airman",
                    "Senior Airman",
                    "Senior Airman",
                    "Staff Sergeant",
                    "Staff Sergeant",
                    "Staff Sergeant",
                    "Staff Sergeant",
                    "Tech Sergeant"
                ],
                [//squad leader//element leader
                    "Staff Sergeant"
                ],
                [//assistant platoon leader
                    "Master Sergeant",
                ],
                [//platoon leader// Flight
                    "2nd Lieutenant",
                    "1st Lieutenant",
                    "1st Lieutenant",
                    "2nd Lieutenant",
                    "Captain"
                ],
                [//assistant company leader
                    "Sergeant Major",
                    "Major",
                    "Senior Captain",
                    "Sergeant Major",
                ],
                [//company leader//squadron
                    "Major",
                    "Lieutenant Colonel",
                    "Lieutenant Colonel",
                    "Lieutenant Colonel"
                ],
                [//assistant battalion leader
                    "Colonel",
                    "Lieutenant Colonel",
                    "Lieutenant Colonel",
                ],
                [//battalion leader//wing
                    "Colonel",
                ],
                [//assistant brigade leader
                    "Colonel"
                ],
                [//brigade leader//numbered air force
                    "Major General",
                    "Lieutenant General",
                ],
                [//assistant division leader
                    "Lieutenant General",
                    "Major General"
                ],
                [//division leader//MAJCOM
                    "General"
                ],
                [//assistant corps leader

                ],
                [//corps leader

                ],
                [//wingmen
                    "Second Lieutenant",
                    "Second Lieutenant",
                    "First Lieutenant",
                    "First Lieutenant",
                    "First Lieutenant",
                    
                ],
                [//leaders of 2-ship flights or command of a single multi crew aircraft, can progress further to get to 4-ship flight lead
                    "Captain",
                    "Captain",
                    "Captain",
                    "Major",
                ],
                [//high level leadership
                    "Colonel",
                    "Colonel",
                    "Lieutenant Colonel"
                ],
                [//squadron commander
                    "Lieutenant Colonel"
                ]
                
            ],
            [//navy
                [//rifleman//element
                    "Seaman Apprentice",
                    "Seaman",
                    "Seaman",
                    "Seaman",

                ],
                [//fire team leader//element leader
                    "Petty Officer Third Class"
                ],
                [//squad leader//element leader
                    "Petty Officer Second Class"
                ],
                [//assistant platoon leader
                    "Petty Officer First Class",
                ],
                [//platoon leader// Flight
                    "Ensign"
                ],
                [//assistant company leader
                    "Chief Petty Officer",
                    "Commander"//can also be a captain of a destroyer type ship
                ],
                [//company leader//captain of a cruiser or larger ship
                    "Captain"
                ],
                [//assistant battalion leader
  
                ],
                [//battalion leader//wing
                    "Lieutenant",
                ],
                [//assistant brigade leader
                    "Captain"
                ],
                [//brigade leader//numbered air force
                    "Rear Admiral Upper Half"
                ],
                [//assistant division leader   
                    "Vice Admiral",
                ],
                [//division leader//MAJCOM
                    "Admiral",
                ],
                [//assistant corps leader

                ],
                [//corps leader

                ],
                //each squadron should have roughly 1.5x as many pilots as aircraft, with anywhere from 8-20 aircraft being normal. 
                [//wingmen
                    "Second Lieutenant",
                    "Second Lieutenant",
                    "First Lieutenant",
                    "First Lieutenant",
                    "First Lieutenant",
                    
                ],
                [//leaders of 2-ship flights or command of a single multi crew aircraft, can progress further to get to 4-ship flight lead
                    "Captain",
                    "Captain",
                    "Captain",
                    "Major",
                ],
                [//squadron leadership
                    "Colonel",
                    "Colonel",
                    "Lieutenant Colonel"
                ],
                [//squadron commander
                    "Lieutenant Colonel"
                ]
                
            ],
            [//marines
                [//rifleman
                "Private",
                "Private First Class",
                "Private First Class",    
                "Lance Corporal",
                "Lance Corporal",
                "Private First Class",
            ],
            [//fire team leader
                "Corporal",
            ],
            [//squad leader
                "Sergeant",
                "Sergeant",
                "Sergeant",
                "Corporal"
            ],
            [//assistant platoon leader
                "Sergeant",
                "Master Sergeant",
                "Master Sergeant"
            ],
            [//platoon leader
                "Staff Sergeant",
                "Second Lieutenant",
                "Second Lieutenant",
                "Second Lieutenant",
                "First Lieutenant"
            ],
            [//assistant company leader
                "Gunnery Sergeant",
                "Master Sergeant",
                "First Lieutenant",
            ],
            [//company leader
                "Captain",
            ],
            [//assistant battalion leader
                "Sergeant Major",
                "Master Gunnery Sergeant",
            ],
            [//battalion leader
                "Lieutenant Colonel"
            ],
            [//assistant brigade leader
                "Major",
                "Sergeant Major",
                "Command Sergeant Major",
            ],
            [//brigade leader
                "Colonel",
            ],
            [//assistant division leader
                "Brigadier General",
                "Brigadier General",
                "Command Sergeant Major",
            ],
            [//division leader
                "Major General",
            ],
            [//assistant corps leader
                "Command Sergeant Major",
            ],
            [//corps leader
                "Lieutenant General"
            ],
            //each squadron should have roughly 1.5x as many pilots as aircraft, with anywhere from 8-20 aircraft being normal. 
            [//wingmen //all of this is directly copied from the USAF. I cannot discern if they are any different
                "Second Lieutenant",
                "Second Lieutenant",
                "First Lieutenant",
                "First Lieutenant",
                "First Lieutenant",
                    
            ],
            [//leaders of 2-ship flights or command of a single multi crew aircraft, can progress further to get to 4-ship flight lead
                    "Captain",
                    "Captain",
                    "Captain",
                    "Major",
            ],
            [//senior leadership
                    "Colonel",
                    "Colonel",
                    "Lieutenant Colonel"
            ],
            [//squadron commander
                    "Lieutenant Colonel"
            ]
            ],
            ],
        ]

    },
    weapons:{
        firearms:{
            //submachine guns/carbines


            //assault rifles
            ar_M4A1:{
                name:"M4A1 Carbine",
                disc:"Extremely prolific 5.56x45 carbine, the A1 variant has 3-round burst replaced with full-auto while also being slightly heavier. As of 2019 all M4s in the US Army are this variant",
                weight:6.71,
                caliber:gComponents.calibers.c556x45,
                fireModes:[0,0,1,0,0,1],//muzzle or other manual loading, lever or bolt action, semi-auto, 2 round burst, 3 round burst, fully automatic. first option is to future proof it, the rest will help determine ammo consumption. 
                rateOfFire:825,//used if it is full-auto capable
                reloadTime:3.5,//how long it takes a decent soldier to reload the weapon. Experience may impact this. For single shot weapons this can account for differences in technology. 
                opticMountStyle:1,//0 means no optics, 1 means picatinny rail, 2 means ak-style, 3 means custom
                mounts:[1,1,1],//bottom, sides, top
                railStyle:1,
                suppressorMountStyle:1,//0 is non-suppressor compatible, 1 is AR-15 556 style, 2 is AK-74 545 style, 3 is AK-47 762 style, 4 is NATO 762 st
                shotDB:158.9,
                uBGLType:1,//0 means no ubgl, 1 means AR-15 style, 2 means AK-style
                length:29.75,//length, shortest possible without disassembly. Used to calculate CQB usefulness
                bLength:14.5,//barrel length
                MOA:4,
                eRange:550//yards
            },
            ar_M27IAR:{
                name:"Heckler & Koch M27 Infantry Automatic Rifle",
                disc:"Based on the H&K 416. The new workhorse of the USMC.",
                weight:7.9,
                caliber:gComponents.calibers.c556x45,
                fireModes:[0,0,1,0,0,1],//muzzle or other manual loading, lever or bolt action, semi-auto, 2 round burst, 3 round burst, fully automatic.
                rateOfFire:800,//used if it is full-auto capable
                reloadTime:3.5,//how long it takes a decent soldier to reload the weapon. Experience may impact this. For single shot weapons this can account for differences in technology. 
                opticMountStyle:1,//0 means no optics, 1 means picatinny rail, 2 means ak-style, 3 means custom
                mounts:[1,1,1],//bottom, sides, top
                suppressorMountStyle:1,
                shotDB:158.9,
                uBGLType:1,//0 means no ubgl, 1 means AR-15 style, 2 means AK-style
                length:33,//length, shortest possible without disassembly. Used to calculate CQB usefulness
                bLength:16.5,//barrel length
                MOA:2,
                eRange:656//yards
            },
            ar_AK74M:{
                name:"Izhmash AK-74M ",
                disc:"Standard service rifle of the Russian military, being replaced by the AK-12",
                serial:"6P34",
                weight:7.5,
                caliber:gComponents.calibers.c545x39,
                fireModes:[0,0,1,0,0,1],
                rateOfFire:625,
                reloadTime:3.5,
                shotDB:158.9,
                opticMountStyle:2,
                mounts:[0,0,0],
                suppressorMountStyle:2,
                uBGLType:2,
                length:27.6,
                bLength:16.3,
                MOA:3.5,
                eRange:550
            },
            //battle rifles


            //squad automatic weapons
            saw_RPK74M:{
                name:"RPK-74M",
                disc:"Standard SAW of the russian army",
                serial:"6P34",
                weight:11,
                caliber:gComponents.calibers.c545x39,
                fireModes:[0,0,1,0,0,1],
                rateOfFire:600,
                reloadTime:3.5,
                shotDB:158.9,
                opticMountStyle:2,
                mounts:[0,1,0],
                suppressorMountStyle:2,
                uBGLType:0,
                length:32.3,
                bLength:23.2,
                MOA:2.5,
                eRange:700//a little arbitrary here
            },
            lmg_M249PIP:{
                name:"M249 light machine gun, Product Improvement Program upgrade",
                disc:"Standard SAW of the US army. Offers reduced recoil, upper handguard, ergonomics and various utility modifications at the cost of added weight",
                serial:"M249PIP",
                weight:16.41,
                caliber:gComponents.calibers.c556x45,
                fireModes:[0,0,1,0,0,1],
                rateOfFire:700,
                reloadTime:12,
                shotDB:160,
                opticMountStyle:1,
                mounts:[1,1,0],
                suppressorMountStyle:1,
                uBGLType:0,
                length:40.75,
                bLength:18,
                MOA:12,//bruh
                eRange:765//a little arbitrary here
            },
            //designated marksmen rifles
            dmr_SVDM:{
                name:"SVDM Designated Marksman Rifle",
                disc:"Modernized variant of the SVD and in use with the Russian military since 2018",
                weight:9.902,
                caliber:gComponents.calibers.c762x54r,
                fireModes:[0,0,1,0,0,0],//muzzle or other manual loading, lever or bolt action, semi-auto, 2 round burst, 3 round burst, fully automatic. first option is to future proof it, the rest will help determine ammo consumption. 
                rateOfFire:60,//used if it is full-auto capable
                reloadTime:3.5,//how long it takes a decent soldier to reload the weapon. Experience may impact this. For single shot weapons this can account for differences in technology. 
                opticMountStyle:1,//0 means no optics, 1 means picatinny rail, 2 means ak-style, 3 means custom
                mounts:[1,1,0],//bottom, sides, top
                railStyle:1,
                suppressorMountStyle:5,//0 is non-suppressor compatible, 1 is AR-15 556 style, 2 is AK-74 545 style, 3 is AK-47 762 style, 4 is NATO 762 style, 5 is warpact 7.62x54mmr
                shotDB:162,
                uBGLType:0,//0 means no ubgl, 1 means AR-15 style, 2 means AK-style
                length:34.4,//length, shortest possible without disassembly. Used to calculate CQB usefulness
                bLength:21.7,//barrel length
                MOA:2,
                eRange:875//yards
            },
            dmr_M110A1:{
                name:"M110A1 SDMR",
                disc:"Standard US Army DMR",
                weight:9.15,
                caliber:gComponents.calibers.c762x51,
                fireModes:[0,0,1,0,0,0],//muzzle or other manual loading, lever or bolt action, semi-auto, 2 round burst, 3 round burst, fully automatic. first option is to future proof it, the rest will help determine ammo consumption. 
                rateOfFire:60,//used if it is full-auto capable
                reloadTime:3.5,//how long it takes a decent soldier to reload the weapon. Experience may impact this. For single shot weapons this can account for differences in technology. 
                opticMountStyle:1,//0 means no optics, 1 means picatinny rail, 2 means ak-style, 3 means custom
                mounts:[1,1,1],//bottom, sides, top
                railStyle:1,
                suppressorMountStyle:4,//0 is non-suppressor compatible, 1 is AR-15 556 style, 2 is AK-74 545 style, 3 is AK-47 762 style, 4 is NATO 762 style, 5 is warpact 7.62x54mmr
                shotDB:162,
                uBGLType:0,//0 means no ubgl, 1 means AR-15 style, 2 means AK-style
                length:35.39,//length, shortest possible without disassembly. Used to calculate CQB usefulness
                bLength:16.3,//barrel length
                MOA:1.5,
                eRange:875//yards
            },
            //light machine guns
            lmg_M240B:{
                name:"M240B Machine Gun",
                disc:"Main machine gun of the USMC, also used by the USN and USCG. Replaced by the M240L in US army service",
                weight:27.6,
                caliber:gComponents.calibers.c762x51,
                fireModes:[0,0,0,0,0,1],//muzzle or other manual loading, lever or bolt action, semi-auto, 2 round burst, 3 round burst, fully automatic. first option is to future proof it, the rest will help determine ammo consumption. 
                rateOfFire:700,//used if it is full-auto capable
                reloadTime:10,//how long it takes a decent soldier to reload the weapon. Experience may impact this. For single shot weapons this can account for differences in technology. 
                opticMountStyle:1,//0 means no optics, 1 means picatinny rail, 2 means ak-style, 3 means custom
                mounts:[1,1,1],//bottom, sides, top
                railStyle:1,
                suppressorMountStyle:4,//0 is non-suppressor compatible, 1 is AR-15 556 style, 2 is AK-74 545 style, 3 is AK-47 762 style, 4 is NATO 762 st
                shotDB:160,
                uBGLType:0,//0 means no ubgl, 1 means AR-15 style, 2 means AK-style
                length:49.7,//length, shortest possible without disassembly. Used to calculate CQB usefulness
                bLength:21.7,//barrel length
                MOA:1.5,
                eRange:1300//yards
            },
            lmg_PKP:{
                name:"PKP Pecheneg light machine gun",
                disc:"Main LMG of eastern countries",
                weight:27.6,
                caliber:gComponents.calibers.c762x54r,
                fireModes:[0,0,0,0,0,1],//muzzle or other manual loading, lever or bolt action, semi-auto, 2 round burst, 3 round burst, fully automatic. first option is to future proof it, the rest will help determine ammo consumption. 
                rateOfFire:700,//used if it is full-auto capable
                reloadTime:15,//how long it takes a decent soldier to reload the weapon. Experience may impact this. For single shot weapons this can account for differences in technology. 
                opticMountStyle:2,//0 means no optics, 1 means picatinny rail, 2 means ak-style, 3 means custom
                mounts:[1,0,0],//bottom, sides, top
                railStyle:2,
                suppressorMountStyle:5,//0 is non-suppressor compatible, 1 is AR-15 556 style, 2 is AK-74 545 style, 3 is AK-47 762 style, 4 is NATO 762 style, 5 is 7.62x54mmr
                shotDB:160,
                uBGLType:0,//0 means no ubgl, 1 means AR-15 style, 2 means AK-style
                length:47,//length, shortest possible without disassembly. Used to calculate CQB usefulness
                bLength:25.9,//barrel length
                MOA:2,
                eRange:1400//yards
            },

            //bolt snipers


            //heavy snipers/anti-materiel rifles







        },
        pistol:{
            W_M9:{
                name:"Beretta 92FS",
                weight:2.1375,
                length:8.5,
                bLength:4.9,
                caliber:gComponents.calibers.c9x19,
                eRange:55,//presuming no optic
                report:139                
            },
            W_M17:{
                name:"Sig Sauer M17",
                weight:1.8375,
                length:8,
                bLength:4.7,
                caliber:gComponents.calibers.c9x19,
                eRange:55,//presuming no optic
                report:140                
            },
            W_M18:{
                name:"Sig Sauer M18",
                weight:1.625,
                length:8.5,
                bLength:3.9,
                caliber:gComponents.calibers.c9x19,
                eRange:55,//presuming no optic
                report:142               
            },
            W_P226:{
                name:"Sig Sauer P226",
                weight:2,
                length:1.7,
                bLength:4.4,
                caliber:gComponents.calibers.c9x19,
                eRange:55,//presuming no optic
                report:140               
            },
            W_G17:{
                name:"Glock 17",
                weight:1.5,
                length:8.03,
                bLength:4.49,
                caliber:gComponents.calibers.c9x19,
                eRange:55,//presuming no optic
                report:139               
            },
            W_USP:{
                name:"Heckler & Koch USP",
                weight:1.65,
                length:7.6,
                bLength:4.25,
                caliber:gComponents.calibers.c9x19,
                eRange:55,//presuming no optic
                report:140               
            },
            W_J941:{
                name:"Jericho 941",
                weight:2,//guess
                length:8,
                bLength:4.43,
                caliber:gComponents.calibers.c9x19,
                eRange:55,//presuming no optic
                report:140               
            },
            W_MP443:{
                name:"MP-443 Grach",
                weight:2.125,
                length:7.8,
                bLength:4.4,
                caliber:gComponents.calibers.c9x19,
                eRange:55,
                report:140               
            },
            W_SR1:{
                name:"SR-1 Vektor",
                weight:2.09,
                length:7.7,
                bLength:4.4,
                caliber:gComponents.calibers.c9x21,
                eRange:55,
                report:140               
            },
            W_APS:{
                name:"Automatic Pistol Stechkin",
                weight:2.69,
                length:8.86,
                bLength:5.51,
                caliber:gComponents.calibers.c9x18,
                eRange:55,
                report:135               
            },
            W_PM:{
                name:"Pistol Makarov",
                weight:1.625,
                length:6.36,
                bLength:3.68,
                caliber:gComponents.calibers.c9x18,
                eRange:40,
                report:135               
            },
            W_GSh18:{
                name:"GSh-18",
                weight:1.3125,
                length:7.2,
                bLength:4.1,
                caliber:gComponents.calibers.c9x19,
                eRange:50,
                report:140               
            },
            W_TT33:{
                name:"TT-33",
                weight:1.881,//guessing this is loaded
                length:7.6,
                bLength:4.6,
                caliber:gComponents.calibers.c762x25,
                eRange:50,//presuming no optic
                report:138               
            },
            W_MEUSOC_Pistol:{
                name:"MEU(SOC) pistol",
                weight:2.2,//guess
                length:8.25,
                bLength:5.03,
                caliber:gComponents.calibers.c9x19,//yeah I know it's 45
                eRange:76.55,
                report:140               
            },
            W_FB_P83:{
                name:"FB P-83 Wanad",
                disc:"Polish service pistol, in limited use with their police and military, being replaced by the G19",
                weight:1.625,//guess
                length:6.5,
                bLength:3.5,
                caliber:gComponents.calibers.c9x18,
                eRange:27.34,
                report:140               
            },
            W_FB_VIS_100:{
                name:"FB VIS 100",
                disc:"Polish current issue service pistol",
                weight:1.531,
                length:7.8,
                bLength:4.3,
                caliber:gComponents.calibers.c9x19,
                eRange:27.34,
                report:140               
            },
            W_WIST_94:{
                name:"WIST-94",
                disc:"Polish service pistol",
                weight:1.625,
                length:7.5,
                bLength:4.5,
                caliber:gComponents.calibers.c9x19,
                eRange:27.34,
                report:140               
            },
            W_P99_RAD:{
                name:"Fabryka Broni Radom P99 RAD",
                disc:"Polish service pistol",
                weight:1.375,
                length:7.1,
                bLength:4,
                caliber:gComponents.calibers.c9x19,
                eRange:55,
                report:140               
            },
        },
        uBGL:{
                    /*
            Naming Convention is as follows:
            p = picatinny 
            ak = ak-pattern
        */
            ak_UBGL_GP25:{
                name:"GP-25 Kostyor",
                disc:"'Bonfire' underbarrel grenade launcher for AK pattern rifles",
                weight:3.31,
                mountStyle:2
            },
            p_UBGL_M320:{
                name:"M320 Grenade Launcher Module",
                disc:"replacement for the M203 in US service",
                weight:3.3,
                mountStyle:1
            },

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
            W_M203:{
                name:"M203",
                disc:"standard issue 40mm grenade launcher for NATO and partners",
                weight:3,
                eRange:437,                
            },
            W_M320:{
                name:"M320",
                disc:"upgraded 40mm grenade launcher for NATO and partners, supposed to replace the M203 ",
                weight:3.3,
                eRange:437,                
            },
        },
        RL:{
        /*
            Naming Convention is as follows:

        */
            RL_RPG7V2:{
                name:"RPG-7V2",
                disc:"extremely prolific russian rocket-propelled grenade launcher",
                isSingleShot:0,
                weight:13.9,
                opticMountStyle:3
            },
            RL_M136:{
                name:"M136",
                disc:"common single-shot recoilless anti-tank weapon of western forces",
                isSingleShot:1,
                weight:0,
                opticMountStyle:1
            },
            RL_RPG26:{
                name:"RPG-26 'Aglen",
                disc:"common single-shot rocket launcher of the former USSR",
                isSingleShot:1,
                weight:0,
                opticMountStyle:0
            },


            // MAN PORTABLE SURFACE TO AIR MISSILES

        },
        fGren:{
            G_RGD5:{
                type:0,//0 frag, 1 smoke, 2 flash, 3 AP mine, 4 AT mine
                name:"RGD-5 fragmentation grenade",
                disc:"Soviet anti-personnel fragmentation grenade first used in 1954, not sure if it is still used by russia today. Still used by Bulgaria, China and Georgia",
                thrownRange:43.7,//range it can typically be thrown, yards
                lethalRadius:3.28,//lethal radius, yards
                weight:.683,//weight, pounds
                pen:0,//armor penetration (if this an anti-tank grenade)
            },
            G_RGO:{
                type:0,
                name:"RGO fragmentation grenade",
                disc:"Soviet anti-personnel fragmentation grenade developed during the soviet-afghan war, currently used by Russia and Ukraine, among other countries.",
                thrownRange:35,//abstract guess. It's heavier than the RGD-5 grenade
                lethalRadius:15.31,
                weight:1.157,
                pen:0,
            },
            G_RGN:{
                type:0,
                name:"RGN fragmentation grenade",
                disc:"Soviet anti-personnel fragmentation grenade developed during the soviet-afghan war, currently used by Russia and Ukraine, among other countries.",
                thrownRange:45,
                lethalRadius:7.655,
                weight:.625,
                pen:0,
            },
            G_F1:{
                type:0,
                name:"F1 fragmentation grenade",
                disc:"Soviet anti-personnel fragmentation grenade developed during WW2",
                thrownRange:41.01,
                lethalRadius:21.872,
                weight:1.322,
                pen:0,
            },
            G_M67:{
                type:0,
                name:"M67 fragmentation grenade",
                disc:"US current-issue fragmentation grenade, used by Australia, Canada, Turkey, US, UA, various other nations. ",
                thrownRange:35.54,
                lethalRadius:5.468,
                weight:.875,
                pen:0,
            },
            G_RKG3:{
                type:0,
                name:"RKG-3 anti-tank grenade",
                disc:"Soviet anti-tank grenade encorporating a shaped charge, the very base model ",
                thrownRange:21.872,
                lethalRadius:2.2,
                weight:2.35,
                pen:125,
            },
            G_RKG3M:{
                type:0,
                name:"RKG-3M anti-tank grenade",
                disc:"Soviet anti-tank grenade encorporating a shaped charge, improved model",
                thrownRange:19,
                lethalRadius:2.2,
                weight:2.52,
                pen:165,
            },
            G_RKG3EM:{
                type:0,
                name:"RKG-3EM improved anti-tank grenade",
                disc:"Soviet anti-tank grenade encorporating a shaped charge, the final and best variant",
                thrownRange:15,//guess, it's going to be reduced due to how heavy the thing is
                lethalRadius:2.2,
                weight:3.74,
                pen:220,
            },
            G_RGZ89:{
                type:0,
                name:"RGZ-89 fragmentation grenade",
                disc:"Modern Polish frag grenade",
                thrownRange:36,
                lethalRadius:10,
                weight:.838,
                pen:0,
            },
            G_RGO88:{
                type:0,
                name:"RGO-88 fragmentation grenade",
                disc:"Modern Polish frag grenade",
                thrownRange:30,
                lethalRadius:5,
                weight:1.069,
                pen:0,
            },
        },
        stGren:{
            G_M84:{
                type:2,
                name:"M84 stun grenade",
                disc:"US current-issue stun grenade introduced in 1995. Used in room clearing when combatants and non-combatants are anticipated to be present. ",
                thrownRange:35.54,
                decibels:175,//how loud it is
                flash:7,//how much candela it produces
                weight:.825,
            },
        },
        smGren:{
            smG_M18:{
                type:1,
                name:"M18 smoke grenade",
                disc:"US current-issue smoke grenade since late 1943",
                thrownRange:38.27,
                duration:70,//how long it will produce smoke, in seconds
                weight:1.188
            },
            smG_RGD2:{
                type:1,
                name:"RGD-2 smoke grenade",
                disc:"Eastern current-issue smoke grenade",
                thrownRange:38.27,
                duration:90,//how long it will produce smoke, in seconds
                weight:1.188
            },
        },
        antiPersonMine:{
            APM_MON200:{
                type:3,
                name:"MON-200 anti-personnel mine",
                disc:"Soviet heavy antipersonnel mine introduced in the early 1960s, both command and victim operation possible",
                det:[1,0,1,1,1,1],//pressure, magnetic, seismic, command (wire), command (signal), tripwire
                lethalRange:150,//guess, no data
                isMetalDetectable:1,//can it be metal detected
                canBeLCd:1,//can it be detonated by line charge
                weight:55.11,
                sdTimer:99,
            },
            APM_MON100:{
                type:3,
                name:"MON-100 anti-personnel mine",
                disc:"Soviet heavy antipersonnel mine introduced in the early 1960s, both command and victim operation possible",
                det:[1,0,1,1,1,1],
                lethalRange:109.361,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:11.023,
                sdTimer:99
            },
            APM_MON90:{
                type:3,
                name:"MON-90 claymore-style anti-personnel mine",
                disc:"Soviet heavy antipersonnel mine introduced in the early 1960s, both command and victim operation possible, claymore type",
                det:[1,0,1,1,1,1],
                lethalRange:98.425,
                isMetalDetectable:0,
                canBeLCd:1,
                weight:26.675,
                sdTimer:99
            },
            APM_POM3:{
                type:3,
                name:"POM-3 mass-deployed seismically detonated self destructing bounding anti-personnel mine",
                disc:"Modern russian AP mine that is meant to be launched by machines, either from the air or the ground. Deploys itself and self destructs after 8-24 hours",
                det:[0,0,1,0,0,0],
                lethalRange:17.497,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:7.054,
                sdTimer:24
            },
            APM_OZM3:{
                type:3,
                name:"OZM-3 bounding tripwire-activated anti-personnel mine",
                disc:"Soviet bounding anti-personnel mine that is typically tripwire activated. Introduced in 1964 it has an easily detectible metal body and will be readily dealt with by being run over with a tracked vehicle",
                det:[1,0,0,1,0,1],
                lethalRange:10.93,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:7.054,
                sdTimer:99
            },
            APM_OZM72:{
                type:3,
                name:"OZM-72 bounding anti-personnel mine",
                disc:"Soviet bounding anti-personnel mine that is typically tripwire activated",
                det:[1,0,0,1,0,1],
                lethalRange:27.340,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:11,
                sdTimer:99
            },
            APM_POMZ2M:{
                type:3,
                name:"POMZ-2m",
                disc:"Soviet stake mounted anti-personnel fragmentation mine, modernized variant of POMZ. Usually issued in a set of 8 mines.",
                det:[1,0,0,0,0,1],
                lethalRange:4.374,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:3.968,
                sdTimer:99
            },
            APM_PMN:{
                type:3,
                name:"PMN light anti-personnel mine",
                disc:"prolific Soviet anti-personnel mine, designed to damage and possibly kill the individual who steps on it. Highly dangerous.",
                det:[1,0,0,0,0,0],
                lethalRange:2,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:1.322,
                sdTimer:99
            },
            APM_PMN2:{
                type:3,
                name:"PMN-2 light anti-personnel mine",
                disc:"modernized version of the PMN mine, blast resistand and made of plastic.",
                det:[1,0,0,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal), tripwire
                lethalRange:3,
                isMetalDetectable:1,
                canBeLCd:0,
                weight:.925,
                sdTimer:99
            },
            APM_M18A2:{
                type:3,
                name:"M18A2 'Claymore' directional anti-personnel mine",
                disc:"prolific and well known US-made directional, typically command-detonated mine, normally issued in crates of 6",
                det:[1,0,0,1,0,1],//pressure, magnetic, seismic, command (wire), command (signal),
                lethalRange:110,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:3.5,
                sdTimer:99,
            },
            APM_M16A1:{
                type:3,
                name:"M16A1 bounding anti-personnel mine",
                disc:"US-made improvement of the WW2 german S-mine",
                det:[1,0,0,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                lethalRange:14.763,//guess, about half the casualty range
                isMetalDetectable:1,
                canBeLCd:1,
                weight:9.083,
                sdTimer:99
            },
            APM_PFM1:{
                type:3,
                name:"PFM-1 scatterable anti-personnel mine",
                disc:"lightweight, extremely dangerous scatterable landmine deployed only by machines and essentially undefusable. Comes in cassettes of 36 (KSF-1.05) or 72 (KSF-1). Large quantities used by Russia and potentially Ukraine. Can also be deployed by mortar (PKM), remote machine mining (UMZ), helicopters (VSM-1 mine system, up to 8352 mines at a time), MLRS, or airplanes",
                det:[1,0,0,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                lethalRange:1,//guess, about half the casualty range
                isMetalDetectable:1,
                canBeLCd:1,
                weight:.175,
                sdTimer:99
            },
            APM_PFM1:{
                type:3,
                name:"PFM-1S scatterable self-liquidating anti-personnel mine",
                disc:"lightweight, extremely dangerous scatterable landmine deployed only by machines and essentially undefusable. Comes in cassettes of 36 (KSF-1.05) or 72 (KSF-1). Large quantities used by Russia and potentially Ukraine. Can also be deployed by mortar (PKM), remote machine mining (UMZ), helicopters (VSM-1 mine system, up to 8352 mines at a time), MLRS, or airplanes",
                det:[1,0,0,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                lethalRange:1,//guess, about half the casualty range
                isMetalDetectable:1,
                canBeLCd:1,
                weight:.175,
                sdTimer:35
            },
            APM_POM1:{
                type:3,
                name:"POM-1 scatterable anti-personnel tripwire mine",
                disc:"lightweight,auto-tripwire-deploying machine scattered anti-personnel mine introduced by Russia in 1962. Deployed from helicopters and automatic dispensers",
                det:[1,0,0,0,0,1],//pressure, magnetic, seismic, command (wire), command (signal),
                lethalRange:4.374,//guess, about half the casualty range
                isMetalDetectable:1,
                canBeLCd:1,
                weight:1.653,
                sdTimer:99
            },
            APM_POM2:{
                type:3,
                name:"POM-2 scatterable anti-personnel tripwire mine",
                disc:"lightweight,auto-tripwire-deploying machine scattered anti-personnel mine introduced by Russia in 1962. Deployed from helicopters and automatic dispensers",
                det:[1,0,0,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                lethalRange:10,//guess, about half the casualty range
                isMetalDetectable:1,
                canBeLCd:1,
                weight:3.527,
                sdTimer:25,
            },
            APM_POM1S:{
                type:3,
                name:"POM-1S scatterable auto-destructing anti-personnel tripwire mine",
                disc:"lightweight,auto-tripwire-deploying machine scattered anti-personnel mine introduced by Russia in 1962. Deployed from helicopters and automatic dispensers. The S-variant self destructs (at least it's supposed to).",
                det:[1,0,0,0,0,1],//pressure, magnetic, seismic, command (wire), command (signal),
                lethalRange:4.374,//guess, about half the casualty range
                isMetalDetectable:1,
                canBeLCd:1,
                weight:1.653,
                sdTimer:48,//guess
            },
            APM_KSF1:{
                type:3,
                name:"72 PFM-1 scatterable mines in a cassette",
                disc:"lightweight, extremely dangerous scatterable landmine deployed only by machines and essentially undefusable. Comes in cassettes of 36 (KSF-1.05) or 72 (KSF-1). Large quantities used by Russia and potentially Ukraine",
                det:[1,0,0,0,0,1],//pressure, magnetic, seismic, command (wire), command (signal),
                lethalRange:30,//guess, about half the casualty range
                isMetalDetectable:1,
                canBeLCd:1,
                weight:20,
                sdTimer:99,
            },
            APM_M67:{
                type:3,
                name:"M67 anti-personnel mine",
                disc:"lightweight,auto-tripwire-deploying machine scattered anti-personnel mine deployed via the M692 155mm artillery shells",
                det:[1,0,0,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                lethalRange:2,//guess, about half the casualty range
                isMetalDetectable:1,
                canBeLCd:1,
                weight:1.19,
                sdTimer:4,
            },
            APM_M72:{
                type:3,
                name:"M67 anti-personnel mine",
                disc:"lightweight,auto-tripwire-deploying machine scattered anti-personnel mine deployed via the M731 155mm artillery shell",
                det:[1,0,0,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                lethalRange:2,//guess, about half the casualty range
                isMetalDetectable:1,
                canBeLCd:1,
                weight:1.19,
                sdTimer:48,
            },
        },
        antiTankMine:{
            ATM_M15:{
                type:4,
                name:"M15 anti-tank blast mine",
                disc:"US-made anti-tank blast mine, most suitable for vehicles with less armor than tanks. When used against tanks it will reliably break tracks but not necessarily do anything else. Still in use by the US though the M19 is available and superior",
                explType:1,//1 blast, 2 shaped charge
                explTNT:27.94,//how much TNT it has in it, used if the mine is purely a blast mine.
                det:[1,1,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                antiVehicle:3,//1 trucks, 2 armored trucks, 3 APC/IFV, 4 tank
                doubleImpulse:1,//is it capable of being double impulse
                isMetalDetectable:1,//can it be metal-detected
                canBeLCd:1,//can it be line-charged
                weight:31.526,//total weight, pounds
                sdTimer:99,//time to self destruct, hours. 99 is used to indicate that it does not self destruct
            },
            ATM_M21:{
                type:4,
                name:"M21 anti-tank shaped charge mine",
                disc:"US-made anti-tank shaped-charge mine",
                explType:2,//1 blast, 2 shaped charge
                explTNT:76,//if explType is 2 (indicative of a shaped charge mine), this will be the mm of RHA it can pen.
                det:[1,1,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                antiVehicle:4,//1 trucks, 2 armored trucks, 3 APC/IFV, 4 tank
                doubleImpulse:0,//is it capable of being double impulse
                isMetalDetectable:1,//can it be metal-detected
                canBeLCd:1,//can it be line-charged
                weight:17.262,//total weight, pounds,
                sdTimer:99,
            },
            ATM_M19:{
                type:4,
                name:"M15 anti-tank blast mine",
                disc:"US-made anti-tank blast mine, most suitable for vehicles with less armor than tanks. When used against tanks it will reliably break tracks but not necessarily do anything else. ",
                explType:1,
                explTNT:30.191,
                det:[1,1,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                antiVehicle:4,//1 trucks, 2 armored trucks, 3 APC/IFV, 4 tank
                doubleImpulse:1,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:31.526,
                sdTimer:99,
            },
            ATM_TM46:{
                type:4,
                name:"TM-46 anti-tank mine",
                disc:"early Soviet anti-tank blast mine, very easy to detect with a metal detector. Largely replaced by the TM-62",
                explType:1,
                explTNT:12.566,
                det:[1,0,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                antiVehicle:3,//1 trucks, 2 armored trucks, 3 APC/IFV, 4 tank
                doubleImpulse:0,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:18.959,
                sdTimer:99,
            },
            ATM_TM62M:{
                type:4,
                name:"TM-62M anti-tank blast mine",
                disc:"Modern Soviet/Russian anti-tank blast mine, the M variant has a metal casing.",
                explType:1,
                explTNT:17,
                det:[1,0,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                antiVehicle:4,//1 trucks, 2 armored trucks, 3 APC/IFV, 4 tank
                doubleImpulse:0,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:21,
                sdTimer:99,
            },
            ATM_TM62P:{
                type:4,
                name:"TM-62P anti-tank blast mine",
                disc:"Modern Soviet/Russian anti-tank blast mine, the P variant is a minimum-metal mine with a plastic casing. This variant is also magnetic fusable.",
                explType:1,
                explTNT:17,
                det:[1,1,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                antiVehicle:4,//1 trucks, 2 armored trucks, 3 APC/IFV, 4 tank
                doubleImpulse:0,
                isMetalDetectable:0,
                canBeLCd:1,
                weight:21,
                sdTimer:99,
            },
            ATM_TM89:{
                type:4,
                name:"TM-89 anti-tank shaped-charge mine",
                disc:"Modern Soviet/Russian anti-tank blast mine, the P variant is a minimum-metal mine with a plastic casing. This variant is also magnetic fusable.",
                explType:2,//shaped charge
                explTNT:100,
                det:[1,1,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                antiVehicle:4,//1 trucks, 2 armored trucks, 3 APC/IFV, 4 tank
                doubleImpulse:0,
                isMetalDetectable:0,
                canBeLCd:1,
                weight:25.353,
                sdTimer:99,
            },
            ATM_PTM3:{
                type:4,
                name:"PTM-3 scatterable shaped charge AT mine",
                disc:"Soviet MLRS/Heli/Minelayer deployed anti-tank mine",
                explType:2,//shaped charge
                explTNT:4,
                det:[0,1,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                antiVehicle:4,//1 trucks, 2 armored trucks, 3 APC/IFV, 4 tank
                doubleImpulse:0,
                isMetalDetectable:0,
                canBeLCd:1,
                weight:10.8,
                sdTimer:99,
            },
            ATM_PTM1:{
                type:4,
                name:"PTM-1 scatterable blast AT mine",
                disc:"Soviet MLRS/Heli/Minelayer deployed anti-tank blast mine, mass deployed by MLRS, (BM21/27/30) or helicopters",
                explType:1,
                explTNT:3.225,
                det:[1,0,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                antiVehicle:4,//1 trucks, 2 armored trucks, 3 APC/IFV, 4 tank
                doubleImpulse:0,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:3.527,
                sdTimer:99,
            },
            ATM_AT2:{
                type:4,
                name:"AT-2 scatterable Anti-Tank Mine",
                disc:"German advanced self-destructing AT mine, most notably used in the MLRS M28 rocket",
                explType:2,
                explTNT:3.225,
                det:[1,1,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                antiVehicle:4,//1 trucks, 2 armored trucks, 3 APC/IFV, 4 tank
                doubleImpulse:0,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:4.894,
                sdTimer:96,
            },
            ATM_MPP_B_Wierzba:{
                type:4,
                name:"MPP-B Wierzba Anti-Tank Mine",
                disc:"Polish fiberglass minimum metal anti-tank blast mine",
                explType:1,
                explTNT:17.857,
                det:[1,1,0,0,0],//pressure, magnetic, seismic, command (wire), command (signal),
                antiVehicle:4,//1 trucks, 2 armored trucks, 3 APC/IFV, 4 tank
                doubleImpulse:0,
                isMetalDetectable:0,
                canBeLCd:1,
                weight:21.384,
                sdTimer:99,
            },
        },
        explCharge:{
            EC_quarterLbC4:{
                type:5,//explosive charge
                name:"1/4 pound brick of C-4 plastic explosive",
                disc:"NATO/US plastic explosive",
                explType:1,
                explTNT:.32,
                det:[0,0,0,1,1],//pressure, magnetic, seismic, command (wire), command (signal),
                antiVehicle:1,//1 trucks, 2 armored trucks, 3 APC/IFV, 4 tank
                doubleImpulse:0,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:.25
            }, 
            EC_halfLbC4:{
                type:5,//explosive charge
                name:"1/2 pound brick of C-4 plastic explosive",
                disc:"NATO/US plastic explosive",
                explType:1,
                explTNT:.64,
                det:[0,0,0,1,1],//pressure, magnetic, seismic, command (wire), command (signal),
                antiVehicle:1,//1 trucks, 2 armored trucks, 3 APC/IFV, 4 tank
                doubleImpulse:0,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:.5
            },
            EC_1LbC4:{
                type:5,//explosive charge
                name:"1/2 pound brick of C-4 plastic explosive",
                disc:"NATO/US plastic explosive",
                explType:1,
                explTNT:1.28,
                det:[0,0,0,1,1],//pressure, magnetic, seismic, command (wire), command (signal),
                antiVehicle:1,//1 trucks, 2 armored trucks, 3 APC/IFV, 4 tank
                doubleImpulse:0,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:1
            },
            EC_M112:{
                type:5,//explosive charge
                name:"M112 1.25lb C-4 brick",
                disc:"NATO/US plastic explosive in standard packaging format",
                explType:1,
                explTNT:1.6,
                det:[0,0,0,1,1],//pressure, magnetic, seismic, command (wire), command (signal),
                antiVehicle:1,//1 trucks, 2 armored trucks, 3 APC/IFV, 4 tank
                doubleImpulse:0,
                isMetalDetectable:1,
                canBeLCd:1,
                weight:1.25
            },                    
        }
    },
    optics:{
        /*
            Naming Convention is as follows:
            po = picatinny optic
            ako = ak-pattern optic
            rlo = rocket launcher optic (typically proprietary)
            prd = picatinny non-magnifying
            akrd = ak-pattern non-magnifying
        */
        //picatinny rail
        po_TA11RCO_ACOG:{
            name:"TA11 ACOG",//the text name of the scope
            disc:"ubiquitous magnified day sight for 5.56 rifles",
            mag:3.5,//magnification x
            obj:35,
            weight:.875,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
            mountStyle:1,
        },
        po_C79:{
            name:"Elcan C79",//the text name of the scope
            disc:"frequently found on light machine guns, especially the M249 and  M240",
            mag:3.4,//magnification x
            obj:28,
            weight:1.521,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
            mountStyle:1,
        },
        po_TANGO6T:{
            name:"S&W TANGO6T",//the text name of the scope
            disc:"riflescope used by the USMC M40A5",
            mag:6,
            obj:24,
            mountStyle:1,
            weight:1.5,//guessing that the rings weigh .12 pounds
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        prd_M68_CCO:{
            name:"Aimpoint CompM4 M68 Close Combat Optic",//the text name of the scope
            disc:"non-magnified red dot found frequently on the rifles of western troops",
            mag:0,
            obj:30,
            mountStyle:1,
            weight:.738,//guessing that the rings weigh .12 pounds
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },

        //ak-pattern
        ako_1P78:{
            name:"1P78-1 Kashtan",//the text name of the scope
            disc:"standard modernized rifle scope of the russian military, optimized for AK-74 pattern rifles",
            mag:2.8,//magnification x
            obj:25,//objective diameter, mm
            weight:1.1,//weight, pounds, with mount if applicable and possible
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR
            mountStyle:2
        },
        ako_PSO1M2:{
            name:"PSO-1M2 ",//the text name of the scope
            disc:"Zenit standard modernized rifle scope of the russian military, modernized and used for mounting on the SVD-M ",
            mag:4,//magnification x
            obj:24,//objective diameter, mm
            weight:1.55,//weight, pounds.
            mountStyle:1,
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR
        },

        //rocket launcher, typically proprietary
        rlo_PGO7:{
            name:"PGO-7",//the text name of the scope
            disc:"Standard magnified optic for the RPG-7 series",
            mag:2.7,//magnification x
            obj:27,//this is a guess
            weight:1.36,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
            mountStyle:3
        },
        
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
            name:"TA31 ACOG",//the text name of the scope
            disc:"ubiquitous magnified day sight for 5.56 rifles",
            mag:4,//magnification x
            obj:32,
            weight:.9875,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_TA11RCO_ACOG:{
            name:"TA11 ACOG",//the text name of the scope
            disc:"ubiquitous magnified day sight for 5.56 rifles",
            mag:3.5,//magnification x
            obj:35,
            weight:.875,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_CLU_Standard:{
            name:"FGM-148 Command Launch Unit",//the text name of the scope
            disc:"targeting component for the FGM-148 Javelin",
            mag:12,//magnification x
            obj:40,//this is a guess
            weight:14,//weight, pounds.
            NVG:4,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_CLU_Improved:{
            name:"FGM-148 Lightweight Command Launch Unit",//the text name of the scope
            disc:"upgraded targeting component for the FGM-148 Javelin, also usable with the stinger for advanced effectiveness against drones",
            mag:12,//magnification x
            obj:40,//this is a guess
            weight:8.4,//weight, pounds.
            NVG:4,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_PGO7:{
            name:"PGO-7",//the text name of the scope
            disc:"Standard magnified optic for the RPG-7 series",
            mag:2.7,//magnification x
            obj:27,//this is a guess
            weight:1.36,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_RIM93RMP:{
            name:"RIM-93 RMP",//the text name of the scope
            disc:"RMP block optic for the RIM-93 Stinger C+ variants",
            mag:4,//magnification x
            obj:30,//this is a guess
            weight:0,//integrated with the rest of the system (excluding the launcher) so this is zero
            NVG:4,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_RIM93RMP:{
            name:"RIM-93 RMP",//the text name of the scope
            disc:"RMP block optic for the RIM-93 Stinger C+ variants",
            mag:4.5,//magnification x
            obj:30,//this is a guess
            weight:0,//integrated with the rest of the system (excluding the launcher) so this is zero
            NVG:4,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_NLAW:{
            name:"",//the text name of the scope
            disc:"Integrated optic for the NLAW rocket launcher",
            mag:2.5,//magnification x
            obj:30,//this is a guess
            weight:0,//integrated with the rest of the system (excluding the launcher) so this is zero
            NVG:2,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_ANPVS17AB:{
            name:"AN/PVS-17 A/B",//the text name of the scope
            disc:"compact, lightweight night vision weapon sight used on M16 series rifles by US spec ops and USMC",
            mag:2.25,
            obj:30,//guess
            weight:2,
            NVG:3,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_ANPVS17C:{
            name:"AN/PVS-17 C",//the text name of the scope
            disc:"compact, lightweight night vision weapon sight used on M249 and M240 series LMGs by US spec ops and USMC",
            mag:4.5,
            obj:30,//guess
            weight:3,
            NVG:3,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_N_ATACR:{
            name:"Nightforce Advanced Tactical Rifle Scope",//the text name of the scope
            disc:"riflescope used by the USMC MK 17 Mod 3",
            mag:16,
            obj:42,//guess
            weight:.9,//guessing that the rings weigh .12 pounds
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_M8541:{
            name:"M8541 SSDS",//the text name of the scope
            disc:"riflescope used by the USMC M40A5",
            mag:8,
            obj:36,//guess
            weight:1,//guessing that the rings weigh .12 pounds
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_L_MK4:{
            name:"Leupold Mark 4 LRT M3",//the text name of the scope
            disc:"Advanced new scope possibly replacing the ACOG in USMC frontline service",
            mag:10,
            obj:40,
            weight:.92,//guessing that the rings weigh .15 pounds
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_V_RZRGen2:{
            name:"Vortex Razor HD Gen II",//the text name of the scope
            disc:"Advanced scope found in use on USMC Force Recon rifles",
            mag:6,
            obj:24,
            weight:1.5,//1.344, rounded to 1.5 for scope rings
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
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
        o_MicroT2:{
            name:"Aimpoint Micro T-2",//the text name of the scope
            disc:"modern american red dot rifle optic for picatinny rails",
            mag:1,//magnification x
            obj:40,//this is a guess
            weight:.288,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_SU231A:{
            name:"EOTech EXPS3-2 SU-231A/PEQ 68",//the text name of the scope
            disc:"modern american red dot rifle optic for picatinny rails",
            mag:1,//magnification x
            obj:50,//this is a guess
            weight:.7,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_SU231:{
            name:"EOTech SU-231",//the text name of the scope
            disc:"modern american holographic sight, discontinued in favor of the SU-231A",
            mag:1,//magnification x
            obj:50,//this is a guess
            weight:.743,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        },
        o_MARS:{
            name:"ITL Multi purpose Aiming Reflex Sight",//the text name of the scope
            disc:"modern american red dot rifle optic for picatinny rails, with a combined red dot and laser sight",
            mag:1.2,//IRL it is 1 but the incorporated IR laser should be factored
            obj:25,
            weight:.95,//weight, pounds.
            NVG:0,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR 
        }
    },
    suppressors:{
        s_PBS1:{
            name:"PBS-1",
            disc:"Rifle suppressor for AK-47 pattern rifles",
            length:7.9,
            weight:1,
            mountStyle:3,
            reportReduction:15//db that the gunshot will be with the suppressor fitted
        },
        s_PBS4:{
            name:"PBS-4",
            disc:"Rifle suppressor for AK-74 pattern rifles",
            length:7.9,//length and width copied from the PBS-1 due to lack of data
            weight:1,
            mountStyle:2,
            reportReduction:15//db reduction
        },
        s_MSX240:{
            name:"Maxim Defense MSX-240",
            disc:"Suppressor for the M240",
            length:10,
            weight:1,
            mountStyle:4,
            reportReduction:24//db reduction
        },
        s_KACNT4:{
            name:"KAC NT4",
            disc:"Rifle Suppressor issued to USMC infantrymen for their M4 and M27 rifles",
            length:6.5,//length and width copied from the PBS-1 due to lack of data
            weight:1.375,
            mountStyle:1,
            reportReduction:30//db reduction
        }
    },
    foreGrips:{
        /*
            Naming Conventions
            p = picatinny
            ak = ak
            pr = proprietary 

            mg = mini-grip
            fg = foregrip, mid or full-size grip
            fgbp = foregrip bipod
            bp = bipod
        */
        p_fgbp_GPS02:{
            name:"GPS-02 grip-bipod",
            disc:"common attachment for western rifles",
            type:5,//1 is dong style, 2 is mid grip, 3 is full grip, 4 is bipod, 5 is combined bipod full grip
            weight:1.5,//guess, looked on 3 different websites and nobody was saying.    
            mountStyle:1,
        },
        p_bp_HL:{
            name:"Harris S-L Bipod",
            disc:"high end bipod used on US military DMR and snipers",
            type:4,//1 is dong style, 2 is mid grip, 3 is full grip, 4 is bipod, 5 is combined bipod full grip
            weight:.938,//guess, looked on 3 different websites and nobody was saying.    
            mountStyle:1,
        },
        pr_bp_HL:{
            name:"PKP Pechneg Bipod",
            disc:"standard issue PKP bipod",
            type:4,//1 is dong style, 2 is mid grip, 3 is full grip, 4 is bipod, 5 is combined bipod full grip
            weight:1,//guess, looked on 3 different websites and nobody was saying.    
            mountStyle:2,
        },
        ak_bp_HL:{
            name:"RPK-74",
            disc:"standard issue RPK bipod",
            type:4,//1 is dong style, 2 is mid grip, 3 is full grip, 4 is bipod, 5 is combined bipod full grip
            weight:0,//guess, looked on 3 different websites and nobody was saying.    
            mountStyle:2,
        },



        fg_S1:{
            name:"S1 Bipod",
            disc:"Soviet bipod for SVD rifles, not to be confused with the one on the SVDM. Fairly rudimentary, likely proprietary to the SVD",
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
        },
        fg_GPS02:{
            name:"GPS-02 grip-bipod",
            disc:"common attachment for western rifles",
            type:5,//1 is dong style, 2 is mid grip, 3 is full grip, 4 is bipod, 5 is combined bipod full grip
            weight:1.5,//guess, looked on 3 different websites and nobody was saying.    
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
        ra_ANPEQ15:{
            name:"AN/PEQ-15 IR/visual laser and IR illuminator",
            disc:"Widely used in the US military, though the USMC is/has replaced it with the AN/PEQ-16",
            features:[0,1,1,1],
            weight:.469,         
        },
        ra_ANPEQ16:{
            name:"AN/PEQ-16 IR/visual laser and IR illuminator",
            disc:"Top-of-the laser/illuminator, found on many USMC rifles",
            features:[0,1,1,1],
            weight:.562,         
        },

    },
    vests:{
        v_6B45L_W:{
            name:"6B45L body armor vest",
            disc:"Light variant of the newer russian body armor sets, used by high speeders, tankers, snipers, officers and medics in the RGF and hypothetical AGF. EMR pattern.",
            NIJ:"II",
            mass:12,//made up, no known spec
            sideProtect:1,
            quality:5,
            camo:1,//0 winter, 1 woodland/forest, 2 desert,3 tropical
        },
        v_6B45M_W:{
            name:"6B45M body armor vest", 
            disc:"Medium variant of the newer russian body armor sets, used by frontline troops of the RGF and hypothetical AGF. EMR Pattern",
            NIJ:"III",
            mass:16.5,
            sideProtect:1,
            quality:5,
            camo:1
        },
        v_6B45H_W:{
            name:"6B45H body armor vest", 
            disc:"Heavy variant of the newer russian body armor sets, used by frontline troops of the RGF and hypothetical AGF. EMR Pattern",
            NIJ:"IV",
            mass:33,
            sideProtect:1,
            quality:5,
            camo:1
        },
        v_6B23_W:{
            name:"6B23 body armor vest", 
            disc:"Pre-Ratnik standard vest for Russian infantry. EMR Pattern",
            NIJ:"III",
            mass:17,
            sideProtect:0,
            quality:4.5,
            camo:1
        },
        v_6B517:{
            name:"Russian 6B5-17 vest produced in 1991 and used by KGB and FSB operatives in Chechnya and Yugoslavia", 
            NIJ:"III",
            mass:26,
        },
        v_Defender2_W:{
            name:"FORT DEFENDER-2 body armor vest ", 
            disc:"Post-Chechnya vest ubiquitous in Russia, many SF users.",
            NIJ:"III",
            mass:26.45,
            sideProtect:0,
            quality:4.5,
            camo:1
        },
        v_MTV_MK1_NoPlates_W:{
            name:"Modular Tactical Vest MK-I", 
            disc:"Georgian standard issue modular tactical vest, green",
            NIJ:"IIIA",
            mass:7.71,
            sideProtect:1,
            quality:5,
            camo:1
        },
        v_MTV_MK1_WPlates_W:{
            name:"Modular Tactical Vest MK-I with added plates", 
            disc:"Georgian standard issue modular tactical vest with added plates, green",
            NIJ:"IV",
            mass:18.73,
            sideProtect:0,
            quality:5,
            camo:1
        },
        v_MTV_MK2_WPlates_W:{
            name:"Modular Tactical Vest MK-II with added plates", 
            disc:"Georgian standard issue modular tactical vest with added plates, green",
            NIJ:"IV",
            mass:18.51,
            sideProtect:1,
            quality:5,
            camo:1
        },
        v_SPCS_W:{
            name:"Soldier Plate Carrier System", 
            disc:"Being replaced by the MSV",
            NIJ:"IV",//guess
            mass:25,
            sideProtect:1,
            quality:5,
            camo:1
        },
        v_IOTV_W:{
            name:"Improved Outer Tactical Vest", 
            disc:"Older US army vest, good protection but so heavy that some troops almost consider wearing it a liability",
            NIJ:"IV",//guess
            mass:31,
            sideProtect:1,
            quality:4.75,
            camo:1
        },
        v_MSV:{
            name:"Modular Scalable Vest", 
            disc:"most advanced body armor available to the US army",
            NIJ:"IV",//guess
            mass:25,
            sideProtect:1,
            quality:5,
            camo:1
        },
        v_MTV:{
            name:"Modular Tactical Vest", 
            disc:"Standard issue ballistic vest for the USMC since 2006",
            NIJ:"IV",//guess
            mass:30,
            sideProtect:1,
            quality:5,
            camo:1
        },


    },
    helmets:{
        h_6B47_W:{
            name:"6B47 combat helmet",
            disc:"standard ballistic helmet of the RGF and AGF",
            opticMount:1,
            canMount:1,
            NIJ:"IIA",
            mass:2.64,
            cut:0,//full helmet, high cut, 
            camo:1,
            quality:5,
        },
        h_SSh68:{
            name:"SSh-68 steel helmet",
            disc:"combloc steel combat helmet",
            opticMount:0,
            canMount:0,
            NIJ:"IIA",
            mass:3.3,
            cut:0,//full helmet, high cut, 
            camo:1,
            quality:4,
        },
        h_DHMKI_W:{
            name:"DH MK-I combat helmet",
            disc:"Georgian standard issue ballistic helmet of the Georgian Defense Forces, early variant with no nod or can mounts",
            opticMount:0,
            canMount:0,
            NIJ:"IIIA",
            mass:2.75,
            cut:0,
            camo:1,
            quality:4.75,
        },
        h_DHMKII_W:{
            name:"DH MK-II combat helmet",
            disc:"Georgian produced standard issue ballistic helmet of the Georgian Defense Forces, modern variant with NOD and Can mounts",
            opticMount:1,
            canMount:1,
            NIJ:"IIIA",
            mass:2.8,
            cut:0,
            camo:1,
            quality:5,
        },
        h_DHMKIII_W:{
            name:"DH MK-III combat helmet",
            disc:"Georgian produced Special Forces helmet of the Georgian Defense Forces, modern variant with NOD and Can mounts",
            opticMount:1,
            canMount:1,
            NIJ:"IIIA",
            mass:2.85,
            cut:1,
            camo:1,
            quality:5,
        },
        h_IHPS_W:{
            name:"Integrated Head Protection System",
            disc:"newest available combat helmet for US personnel",
            opticMount:1,
            canMount:1,
            NIJ:"IIIA",
            mass:3,
            cut:1,
            camo:1,
            quality:5,
        },
        h_FASTRF1_W:{
            name:"Ops-Core Future Assault Shell Technology Helmet RF1",
            disc:"advanced high cut combat helmet used by US special forces, heavy variant",
            opticMount:1,
            canMount:1,
            NIJ:"III",
            mass:3.5,
            cut:1,
            camo:1,
            quality:5,
        },
        h_FASTRXR_W:{
            name:"Ops-Core Future Assault Shell Technology Helmet XR",
            disc:"advanced high cut combat helmet used by US special forces, heavy variant",
            opticMount:1,
            canMount:1,
            NIJ:"IIIA",
            mass:3,
            cut:1,
            camo:1,
            quality:5,
        },
        h_ACH_W:{
            name:"Advanced Combat Helmet",
            disc:"standard issue combat helmet of the US Army, to be replaced by the IHPS",
            opticMount:1,
            canMount:1,
            NIJ:"IIIA",//guess
            mass:3.5,//guess
            cut:0,
            camo:1,
            quality:4.75,
        },
        h_LWH_W:{
            name:"Lightweight Helmet",
            disc:"standard issue low-risk combat helmet of the USMC and USN, front line units may have access to the ECH",
            opticMount:0,
            canMount:0,
            NIJ:"IIIA",//guess
            mass:3.2,
            cut:0,
            camo:1,
            quality:4.6,
        },
        h_ECH_W:{
            name:"Enhanced Combat Helmet",
            disc:"issued to front line USMC personnel, this is a late variant with high cut and mounts",
            opticMount:1,
            canMount:1,
            NIJ:"III",//guess
            mass:3.3,
            cut:1,
            camo:1,
            quality:5,
        },
        h_PASGT:{
            name:"PASGT helmet",
            disc:"legacy combat helmet formerly used by the US military as well as georgia",
            opticMount:0,
            canMount:0,
            NIJ:"IIIA",
            mass:3.4,
            cut:0,
            camo:1,
            quality:4
        },
    },
    helmetOptics:{
        o_1PN138:{
            name:"1PN138 night vision monocle, part of the russian Ratnik system",
            type:2,//0 is magnifier only, 1 is NVG Gen 1, 2 is NVG Gen 2, 3 is NVG Gen 3, 4 is IR
            mag:1,
            lType:1,//1 is monocle, 2 is binoc, etc. 
            gen:2,
            weight:2,
            eDist:240//yards, gotten from alibaba..made in china..just guessing here.
        },
        o_1PN139:{
            name:"1PN139 thermal night vision monocle, part of the russian Ratnik system",
            mag:1,
            type:4,
            lType:1,//1 is monocle, 2 is binoc, etc. 
            gen:3,
            weight:2,
            eDist:240//yards, gotten from alibaba..made in china..just guessing here.
        },
        o_1PN140:{
            name:"1PN140 thermal night vision monocle, part of the russian Ratnik system",
            mag:1,
            type:4,
            lType:1,//1 is monocle, 2 is binoc, etc. 
            gen:3,//really just guessing here
            weight:2,
            eDist:260//I have no idea
        },
        o_1PN140:{
            name:"1PN141 night vision monocle, part of the russian Ratnik system",
            mag:1,
            type:2,
            lType:1,//1 is monocle, 2 is binoc, etc. 
            gen:3,//really just guessing here
            weight:2,
            eDist:260//I have no idea
        },
        o_NVMT2X24:{
            name:"Sibir NVMT 2x24 Gen 1 NVM",//the text name of the scope
            mag:2,
            type:1,
            lType:1,//1 is monocle, 2 is binoc, etc. 
            gen:1,//really just guessing here
            weight:2,
            eDist:260//I have no idea
        },
        o_BPCVRClassic:{
            name:"BPC VR Veber Classic conventional binoculars",//the text name of the scope
            mag:16,
            type:0,
            lType:2,//1 is monocle, 2 is binoc, etc. 
            gen:1,//really just guessing here
            weight:2,
            eDist:260//I have no idea
        },
        o_BPCVROmega:{
            name:"BPC Veber Omega conventional binoculars",//the text name of the scope
            mag:16,
            type:0,
            lType:2,//1 is monocle, 2 is binoc, etc. 
            gen:1,//really just guessing here
            weight:2,
            eDist:260//I have no idea
        },
        o_ANPVS14:{
            name:"AN/PVS-14 3rd gen NVM",//the text name of the scope
            mag:1,
            type:3,
            lType:1,//1 is monocle, 2 is binoc, etc. 
            gen:.774,//really just guessing here
            eDist:328//I have no idea
        },
        o_ANPVS7:{
            name:"AN/PVS-14 3rd gen NVM",//the text name of the scope
            mag:1,
            type:3,
            lType:2,//1 is monocle, 2 is binoc, etc. 
            gen:3,//really just guessing here
            weight:1.5,
            eDist:246//I have no idea
        }

    },
    uniforms:{
        u_6SH122_Ratnik:{
            name:"6SH122 'Ratnik' BDU",
            disc:"Standard issue Russian battle dress uniform",
            bugProtection:0,
            camo:1,//0 is winter, 1 is forest, 2 is desert
            climate:1,//0 is sub-freezing, 1 is moderate, 2 is hot
            thermalMasking:1,//does it have IR camo?
            wearLevel:0,
            cleanLevel:1,
            weight:2,//guess
            flameResist:1
        },
        u_6B15_Cowboy:{
            name:"6B15 'Cowboy' Tanker Uniform",
            disc:"Standard issue Russian tanker uniform",
            bugProtection:0,
            camo:1,//0 is winter, 1 is forest, 2 is desert
            climate:1,//0 is sub-freezing, 1 is moderate, 2 is hot
            thermalMasking:1,//does it have IR camo?
            wearLevel:0,
            cleanLevel:1,
            weight:2,//guess
            flameResist:1
        },
        u_ACU_OCP:{
            name:"Army Combat Uniform, OCP print",
            disc:"Standard issue US Army Combat uniform",
            bugProtection:1,
            camo:1,//0 is winter, 1 is forest, 2 is desert
            climate:1,//0 is sub-freezing, 1 is moderate, 2 is hot
            thermalMasking:1,//does it have IR camo?
            wearLevel:0,
            cleanLevel:1,
            weight:2,//guess
            flameResist:1
        },
        u_MCCUU_W:{
            name:"Marine Corps Combat Utility Uniform, Woodland Print",
            disc:"Standard uniform of USMC personnel",
            bugProtection:1,
            camo:1,//0 is winter, 1 is forest, 2 is desert
            climate:1,//0 is sub-freezing, 1 is moderate, 2 is hot
            thermalMasking:1,//does it have IR camo?
            wearLevel:0,
            cleanLevel:1,
            weight:2,//guess
            flameResist:1
        },
        u_MCCUU_D:{
            name:"Marine Corps Combat Utility Uniform, Desert Print",
            disc:"Standard uniform of USMC personnel",
            bugProtection:1,
            camo:2,//0 is winter, 1 is forest, 2 is desert
            climate:1,//0 is sub-freezing, 1 is moderate, 2 is hot
            thermalMasking:1,//does it have IR camo?
            wearLevel:0,
            cleanLevel:1,
            weight:2,//guess
            flameResist:1
        },
        u_civ_light:{
            name:"Civilian clothes",
            disc:"Standard uniform of civilians everywhere",
            bugProtection:0,
            camo:3,//0 is winter, 1 is forest, 2 is desert
            climate:1,//0 is sub-freezing, 1 is moderate, 2 is hot
            thermalMasking:0,//does it have IR camo?
            wearLevel:0,
            cleanLevel:1,
            weight:2,//guess
            flameResist:0
        },
    },
    headSets:{
        hs_GSSH01:{
            name:"GSSH-01-01 6M2-1 active earpro cans w/headset",
            disc:"part of the ratnik kit",
            earProType:5,//1 is basic earplugs, 2 is cans with passive protection, 3 is passive cans with comms link, 4 is active cans, 5 is active cans with comm link
            weight:.66
        },
        hs_ComTacIII:{
            name:"Peltor ComTac III Active Earpro headset w/ mic and enhanced hearing",
            disc:"long time standard issue headset for US forces",
            earProType:5,//1 is basic earplugs, 2 is cans with passive protection, 3 is passive cans with comms link, 4 is active cans, 5 is active cans with comm link
            weight:1.1
        },
        hs_ComTacVI:{
            name:"Peltor Comtac VI Active Earpro headset w/ mic and enhanced hearing",
            disc:"gucci headset, similar to the Comtac III but lighter, top of the line and in use with well paid western personnel and special forces",
            earProType:5,//1 is basic earplugs, 2 is cans with passive protection, 3 is passive cans with comms link, 4 is active cans, 5 is active cans with comm link
            weight:.86
        },
        hs_earplugs:{
            name:"basic earplugs",
            disc:"for infantry everywhere who want to save their hearing",
            earProType:1,//1 is basic earplugs, 2 is cans with passive protection, 3 is passive cans with comms link, 4 is active cans, 5 is active cans with comm link
            weight:.1
        }
    },
    pRadios:{
        pr_R16801UME:{
            name:"R-168-0.1U(M)E VHF handheld radio set",
            disc:"VHF handheld radio set for platoon, squad and individual level comms. VHF and non-digital",
            range:.75,//miles, effective
            minRange:45,//mhz
            encryption:0,//0 none, 1 basic, 2 advanced (features like rapid frequency hopping)
            maxRange:56,
            weight:3,
            SINCGARS:0,
            HAVEQUICKII:0,
            Satcom:0,
            MILSTD188:0,
            TETRA:0,
            freqHop:0
        },
        mpr_R1685UN1E:{
            name:"R-168-5U(1)E russian VHF manpack radio set",
            disc:"Manpack/Vehicular radio station with frequency hopping VHF capabilities",
            range:12.42,//miles, effective
            minRange:45,//mhz
            encryption:1,//0 none, 1 basic, 2 advanced
            maxRange:56,
            weight:5.952,
            SINCGARS:0,
            HAVEQUICKII:0,
            Satcom:1,
            MILSTD188:0,
            TETRA:1,
            freqHop:1
        },
        mpr_R1685KNE:{
            name:"R-168-5KNE russian HF manpack radio set",
            disc:"Manpack/Vehicular radio station with frequency hopping HF capabilities",
            range:15,//miles, effective
            minRange:1.5,//mhz
            encryption:1,//0 none, 1 basic, 2 advanced
            maxRange:29.9999,
            weight:6.6,
            SINCGARS:0,
            HAVEQUICKII:0,
            Satcom:1,
            MILSTD188:0,
            TETRA:1,
            freqHop:1
        },
        pr_R187P1E:{
            name:"R-187-P1E AZART VHF and VHF digital, dual channel, frequency hopping, sattelite handheld radio set",
            disc:"Part of the Ratnik kit and a massive upgrade over the R-168",
            range:12.42,//miles, effective
            minRange:27,//mhz
            encryption:2,//0 none, 1 basic, 2 advanced
            maxRange:530,
            weight:1.1,
            SINCGARS:0,
            HAVEQUICKII:0,
            Satcom:1,
            MILSTD188:0,
            TETRA:1,
            freqHop:1
        },
        mpr_ANPRC113:{
            name:"AN/PRC-113 manpack portable VHF/UHF frequency hopping encrypted radio",
            disc:"Common western manpack radio, found in US, RAF, RAAF and Georgian use",
            range:10,//miles, effective
            encryption:2,
            minRange:116,//mhz, for this radio it operates in 116-149.975 and 225 to 399.975.
            maxRange:399,
            weight:16.7,
            SINCGARS:0,
            HAVEQUICKII:1,
            Satcom:1,
            MILSTD188:1,
            TETRA:0,
            freqHop:1
        },
        mpr_ANPRC117G:{
            name:"AN/PRC-117G manpack portable VHF/UHF frequency hopping encrypted radio",
            disc:"Common western manpack radio, found in US, RAF, RAAF and Georgian use. ",
            range:1000,//miles, effective
            encryption:2,
            minRange:30,//mhz
            maxRange:2000,
            weight:8.6,
            SINCGARS:1,
            HAVEQUICKII:1,
            Satcom:1,
            MILSTD188:1,
            TETRA:0,
            freqHop:1
        },
        pr_ANPRC148:{
            name:"AN/PRC-148 handheld portable AM/FM frequency hopping encrypted radio",
            disc:"American advanced handheld multiband tactical radio",
            range:20,//miles, effective
            encryption:2,
            minRange:30,//mhz
            maxRange:512,
            weight:1.91,
            SINCGARS:1,
            HAVEQUICKII:1,
            Satcom:0,
            MILSTD188:0,
            TETRA:0,
            freqHop:1
        },
        mpr_ANPRC150:{
            name:"AN/PRC-150 manpac VHF/UHF radio",
            disc:"American advanced handheld multiband tactical radio",
            range:20,//miles, effective
            encryption:2,
            minRange:30,//mhz
            maxRange:512,
            weight:14,
            SINCGARS:0,
            HAVEQUICKII:0,
            Satcom:0,
            MILSTD188:1,
            TETRA:0,
            freqHop:0
        },
        pr_ANPRC152:{
            name:"AN/PRC-152 multiband handheld combat net radio",
            disc:"American advanced handheld multiband tactical radio used by USN EOD, the US Army and the USMC, also used by USAF, can be used by FACs",
            range:20,//miles, effective
            encryption:2,
            minRange:30,//mhz
            maxRange:512,
            weight:2.7,
            SINCGARS:1,
            HAVEQUICKII:1,
            Satcom:1,
            MILSTD188:1,
            TETRA:0,
            freqHop:1

        },
        pr_MR3000P:{
            name:"MR3000P handheld portable AM/FM frequency hopping encrypted radio",
            disc:"American advanced VHF tactical radio",
            range:20,//miles, effective
            encryption:1,
            minRange:25,//mhz
            maxRange:146,
            weight:2,
            SINCGARS:0,
            HAVEQUICKII:0,
            Satcom:0,
            MILSTD188:0,
            TETRA:0,
            freqHop:0

        },
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
            mTape:0,
            weight:.6,

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
            mTape:0,
            weight:.9,
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
            mTape:1,
            weight:3,
        },
        iFAK_II:{
            name:"An advanced IFAK issued beginning in 2014 for the US army. Also a possible candidate for Georgian forces and perhaps elite RU/Abkhaz commandos. Adds extra TQ, chest seal",
            tieOffTQ:0,
            CATorSWAT_TQ:2,
            wPackGauze:2,
            sCWA:1,//
            nAK:1,
            PressDressAndBdg:1,
            shears:0,
            gloves:4,
            blanket:0,
            litter:0,
            splint:0,
            meds:0,
            bbKit:1,
            mTape:1,
            weight:3.25//guess, no data
        }
    },
    canteens:{
        GI_MOLLE:{
            name:"3l hydration carrier",
            disc:"standard issue backpack-style water bladder for western troops",
            capacity:.792,//gallons
            weight:7.113,//weight, full
        },
        USSR_Canteen:{
            name:"Soviet water canteen",
            disc:"standard issue backpack-style water bladder for western troops",
            capacity:.211,//gallons
            weight:1.9,//weight, full
        },
        DisposableWaterBottle:{
            name:"16.9 fluid ounce water bottle",
            disc:"for the unprofessional or very thirsty soldier",
            capacity:.132,
            weight:1.25
        }

    },
    backpacks:{
        referenceBackpack:{
            name:"",//basic name of the backpack
            disc:"",//description such as general purpose, who uses it, etc.
            weight:0,//pounds, empty
            camo:1,//0 is winter, 1 is woodland, 2 is desert, 3 is jungle
            quality:5,//0-5, impacts morale       
        },
        ap_MOLLE2_W:{
            name:"MOLLE II 3 Day Assault Pack",
            disc:"standard issue US army backpack",
            weight:4,
            camo:1,
            quality:5,  
        },
        ap_6SH117_W:{
            name:"6SH117 patrol backpack",
            disc:"standard issue modern Russian patrol backpack, EMR",
            weight:5.5,
            camo:1,
            quality:5,  
        },
        rs_RKSht30_W:{
            name:"RK-ShT-30 3 day pack",
            disc:"Part of the 6B46 Ratnik combat set, issued to Russian soldiers.",
            weight:3.196,
            camo:1,
            quality:5,  
        },
        rs_6SH118_W:{
            name:"6SH118 rucksack",
            disc:"standard issue modern Russian Ratnik heavy pack, EMR",
            weight:7.716,
            camo:1,
            quality:5,  
        },
        rs_MOLLE2_W:{
            name:"MOLLE II rucksack",
            disc:"standard issue US army rucksack, for use on marches and not necessarily in frontline combat",
            weight:9.5,
            camo:1,
            quality:5,  
        },
        rs_USMC_FILBE_W:{
            name:"USMC FILBE rucksack",
            disc:"standard issue USMC rucksack, for use on the march, not necessarily in frontline combat",
            weight:9,
            camo:1,
            quality:4.5,//consumer reviews cite problems with it's load bearing apparatus, especially at the waist
        },
        lp_HighEnd_12Hr_W:{
            name:"5.11 RUSH12 2.0 light pack",
            disc:"Consumer high-end light backpack used by soldiers with an extra focus on quality, as well as GrEy MeN everywhere",
            weight:3.15,
            camo:1,
            quality:5,  
        },
        ap_HighEnd_24Hr_W:{
            name:"5.11 RUSH24 2.0 assault backpack",
            disc:"Consumer high-end assault backpack used by soldiers with an extra focus on quality, as well as GrEy MeN everywhere",
            weight:3.84,
            camo:1,
            quality:5,  
        },
       ap_HighEnd_72Hr_W:{
            name:"5.11 RUSH72 2.0 assault backpack",
            disc:"Consumer high-end 3-day bag used by soldiers with an extra focus on quality, as well as GrEy MeN everywhere",
            weight:5.291,
            camo:1,
            quality:5,  
        },
        rs_HighEnd_72Hr_W:{
            name:"5.11 RUSH100 2.0 rucksack",
            disc:"Consumer high-end rucksack used by soldiers with an extra focus on quality, as well as GrEy MeN everywhere",
            weight:5.732,
            camo:1,
            quality:5,  
        },
    },
    loadBearingVests:{//maybe add this later
        referenceLoadBearingVest:{
            name:"",//name of the bag
            disc:"",//description
            weight:0,//pounds
            quality:0,
            camo:0,//0 winter, 1 woodland, 2 desert, 3 tropical
            wearLevel:0
        },
        lbv_6Sh116_W:{
            name:"6Sh116 load bearing vest",
            disc:"modern load bearing vest from the Russian Ratnik kit",
            weight:3,//guess
            quality:5,
            camo:1,
            wearLevel:0
        },
        lbv_6Sh116_W:{
            name:"6Sh116 load bearing vest",
            disc:"modern load bearing vest from the Russian Ratnik kit",
            weight:3,//guess
            quality:5,
            camo:1,
            wearLevel:0
        }
    },
    sleepingBags:{
        referenceSleepingBag:{
            name:"",//name of the bag
            disc:"",//description
            weight:0,//pounds
            quality:0,
            camo:0,
            cleanLevel:0,
            wearLevel:0,
            tempMin:0,//minimum temperature the user should be comfortable. There is no max as if it gets too hot, the soldier can simply sleep on top of it or not use it at all.
        },
        sb_Ratnik_W:{
            name:"Ratnik Standard sleeping bag",//name of the bag
            disc:"Not much known about this one",//description
            weight:3.306,//pounds
            quality:5,
            camo:1,
            cleanLevel:1,
            wearLevel:0,
            tempMin:5//
        },
        sb_ruArmyStd_W:{
            name:"Russian Army Sleeping Bag",//name of the bag
            disc:"Not much known about this one, it's presumably pre-ratnik",//description
            weight:6.614,//pounds
            quality:5,
            camo:1,
            cleanLevel:1,
            wearLevel:0,
            tempMin:-2//
        },
        sb_MSS_W:{
            name:"Modular Sleeping System",//name of the bag
            disc:"Standard issue US military heavy sleeping bag",//description
            weight:9.5,//pounds
            quality:5,
            camo:1,
            cleanLevel:1,
            wearLevel:0,
            tempMin:-30//
        },
        sb_MSS_P_W:{
            name:"Modular Sleeping System, Patrol",//name of the bag
            disc:"Standard issue US military sleeping bag, subcomponent of the MSS for more moderate environments",//description
            weight:3,//pounds
            quality:5,
            camo:1,
            cleanLevel:1,
            wearLevel:0,
            tempMin:30//
        },
    },
    tents:{
        referenceTent:{
            name:"",//name of the tent
            disc:"",//description
            weight:0,//pounds
            camo:0,//0 winter, 1 woodland, 2 desert, 3 tropical
        },
        t_6SH120:{
            name:"6SH120 Ratnik Universal Shelter",//name of the tent
            disc:"Simple universal shelter issued with the ratnik kit",//description
            weight:6.5,//pounds
            camo:1,//0 winter, 1 woodland, 2 desert, 3 tropical
        },
        t_UICST:{
            name:"Universal Improved Combat Shelter Tent",//name of the tent
            disc:"US Army current issue personal shelter",//description
            weight:6.5,//pounds
            camo:1,//0 winter, 1 woodland, 2 desert, 3 tropical
        },
    },
    supplies:{
        rations:{
            r_2020_ChiliMac_MRE:{
                name:"2020 Chili and Macaroni MRE",
                disc:"Commonly considered one of the best MREs in existence, comes with chili mac, pound cake, jalapeno cheddar cheese crackers, beef snacks, candy, beverage powder, red pepper spice, condiments.",
                expirationYear:2026,
                kCal:1250,
                troopRating:5,
                quality:5,
                weight:1.35,
                includesHeater:1
            },
            r_2020_CheeseTortellini_MRE:{
                name:"2020 Cheese Tortellini MRE",
                disc:"Commonly considered one of the best MREs in existence, comes with cheese tortellini, dessert powder, peanut butter crackers, nuts and raisins, beverage powder, hot sauce",
                expirationYear:2026,
                kCal:1250,
                troopRating:5,
                quality:5,
                weight:1.35,
                includesHeater:1
            },
            r_2020_BeefStew_MRE:{
                name:"2020 Beef Stew MRE",
                disc:"Beef stew, fudge brownie, peanut butter, multigrain snack bread, jelly, pretzels, beverage powder, hot sauce",
                expirationYear:2026,
                kCal:1250,
                troopRating:4.5,
                quality:5,
                weight:2.82,
                includesHeater:1
            },
            r_2020_IRP:{
                name:"2020 full-day IRP",
                disc:"Russian military ration, 1 has enough food for 24 hours if you can actually ingest it",
                expirationYear:2026,
                kCal:4790,
                troopRating:4,
                quality:4,
                weight:4.6,
                includesHeater:0
            },
        }
    }
};
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
        artyshell:{//shells for standard artillery.
            /* Note that range is ommitted; range can vary based on platform, and there are many more platforms capable of firing the same caliber of shell than there are MRLs that use common calibers. As such, effective range for artillery pieces will be decided based on the vehicle, not the round. */
            as_2K25:{
                type:5,//1 is cannon shell, 2 is autocannon shell, 3 is ATGM round, 4 is HMG round, 5 is artillery shell, 6 is arty rocket
                guidance:[1,1,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"2K25 Krasnopol 152mm artillery shell",
                disc:"Soviet Artillery shell with active endgame laser homing capability. Cannot be used by 2S19. India reports it to be of dubious quality and prefers the NATO Excalibur",
                payload:1,//1 HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical
                payloadDevice:0,//used if the payload is something the DB includes. For example, launching a rocket full of AT mines into a zone should add those mines to the zone. 
                warheadExplTNT:19.058,//used for simple HE weapons. In russian warheads, as in NATO rounds unless otherwise noted, filler will be assumed to be of comp-b capability.
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:110,               
            },
            as_152EOF:{
                type:5,
                guidance:[1,0,0,0,0,0,0],
                name:"152-EOF 152mm artillery shell",
                disc:"Czech Standard HE-Frag round, notably used with the Dana SPG",
                payload:1,
                payloadDevice:0,
                warheadExplTNT:15,//this is a complete guess. I have no data.
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:96,               
            },
            as_152EOFD:{
                type:5,
                guidance:[1,0,0,0,0,0,0],
                name:"152-EOFd 152mm artillery shell",
                disc:"Czech Long-Range HE-Frag round, notably used with the Dana SPG",
                payload:1,
                payloadDevice:0,
                warheadExplTNT:15.5,//this is a complete guess. I have no data.
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:96,               
            },
            as_OF32:{
                type:5,
                guidance:[1,0,0,0,0,0,0],
                name:"OF-32 152mm artillery shell",
                disc:"Standard HE-Frag round",
                payload:1,
                payloadDevice:0,
                warheadExplTNT:13.22,
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:97,               
            },
            as_JN546:{
                type:5,
                guidance:[1,0,0,0,0,0,0],
                name:"JN-546 152mm artillery shell",
                disc:"Bulgarian HE shell",
                payload:1,
                payloadDevice:0,
                warheadExplTNT:14.33,
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:132.277,               
            },
            as_G530:{
                type:5,
                guidance:[1,0,0,0,0,0,0],
                name:"OF-32 152mm artillery shell",
                disc:"Concrete-Piercing round",
                payload:1,
                payloadDevice:0,
                warheadExplTNT:11.243,
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:88.184,               
            },
            as_3OF69M:{
                type:5,
                guidance:[1,1,0,0,0,0,0],
                name:"3OF-69M 122mm artillery shell",
                disc:"HE-Frag round with endgame laser homing",
                payload:1,
                payloadDevice:0,
                warheadExplTNT:12.125,
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:61.729,               
            },
            as_D462:{
                type:5,
                guidance:[1,0,0,0,0,0,0],
                name:"D-462 122mm artillery shell",
                disc:"Smoke round",
                payload:2,
                payloadDevice:0,
                warheadExplTNT:8.928,
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:49.163,               
            },
            as_2K25M:{
                type:5,
                guidance:[1,1,0,1,0,0,0],
                name:"2K25M Krasnopol-M 152mm artillery shell",
                disc:"Russian Artillery shell with active endgame laser homing capability and GPS. Shorter and can be used by the 2S19 as well as others",
                payload:1,
                payloadDevice:0,
                warheadExplTNT:32.252,
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:119,               
            },
            as_3OF56:{
                type:5,
                guidance:[1,0,0,0,0,0,0],
                name:"3OF-56 122mm artillery shell",
                disc:"Improved Soviet Frag-HE shell",
                payload:1,
                payloadDevice:0,
                warheadExplTNT:8.928,
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:47.972,               
            },
            as_OF642:{
                type:5,
                guidance:[1,0,0,0,0,0,0],
                name:"OF-642 122mm artillery shell",
                disc:"Soviet basic FRAG-HE shell",
                payload:1,
                payloadDevice:0,
                warheadExplTNT:8.101,
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:47.972,               
            },
            as_M982:{
                type:5,
                guidance:[1,0,1,0,1,0,0],
                name:"M982 Increment 1A-2 Excalibur 155mm artillery shell",
                disc:"US GPS and INS guided artillery shell, resistant to GPS jamming with extended range",
                payload:1,
                payloadDevice:0,
                warheadExplTNT:64.5,
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:106,               
            },
            as_M982A1S:{
                type:5,
                guidance:[1,1,1,0,1,0,0],
                name:"M982A1S Increment 1BS Excalibur 155mm artillery shell",
                disc:"US GPS, Laser and INS guided artillery shell, resistant to GPS jamming with extended range",
                payload:1,
                payloadDevice:0,
                warheadExplTNT:64.5,
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:106,               
            },
            as_M982A2:{
                type:5,
                guidance:[1,1,1,0,1,0,0],
                name:"M982A2 Increment 2 Excalibur 155mm artillery shell",
                disc:"US GPS, Laser and INS guided artillery shell, resistant to GPS jamming with extended range",
                payload:1,
                payloadDevice:0,
                warheadExplTNT:64.5,
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:106,               
            },
            as_M549A1:{
                type:5,
                guidance:[1,0,0,0,0,0,0],
                name:"M549A1 High-Explosive Rocket Assisted 155mm artillery shell",
                disc:"US standard high explosive artillery projectile, has an increased range over other shells",
                payload:1,
                payloadDevice:0,
                warheadExplTNT:15,//actually filled with TNT
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:103,               
            },
            as_M692:{
                type:5,
                guidance:[1,0,0,0,0,0,0],
                name:"M692 ADAM 155mm artillery shell",
                disc:"US Area Denial Munition that scatters 36 M67 self-destructing (48hr) anti-personnel mines",
                payload:5,
                payloadDevice:[tComponents.weapons.antiPersonMine.APM_M67,36],
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:102.955,               
            },
            as_M731:{
                type:5,
                guidance:[1,0,0,0,0,0,0],
                name:"M731 ADAM 155mm artillery shell",
                disc:"US Area Denial Munition that scatters 36 M72 self-destructing (4hr) anti-personnel mines",
                payload:5,
                payloadDevice:[tComponents.weapons.antiPersonMine.APM_M72,36],
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:102.955,               
            },
            as_M712:{
                type:5,
                guidance:[1,1,0,0,0,0,0],
                name:"M712 Copperhead 155mm artillery shell",
                disc:"US Laser-guided HE round",
                payload:1,
                payloadDevice:0,
                warheadExplTNT:19.618,//14.75lbs of comp-b
                fireableIDs:[],
                transportableIDs:[],
                weight:137.6,               
            },
            as_M795:{
                type:5,
                guidance:[1,0,0,0,0,0,0],
                name:"M795 HE 155mm artillery shell",
                disc:"US standard high explosive artillery projectile",
                payload:1,
                payloadDevice:0,
                warheadExplTNT:23.8,//actually filled with TNT, not comp-b, according to wikipedia. The USMC uses IMX-101, which is equivelant but apparently less sensitive
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:103,               
            },
            
        },
        artyrocket:{//rockets for rocket artillery pieces. Data is much the same except for the addition of range stats
            ar_9M55K:{
                type:6,//1 is cannon shell, 2 is autocannon shell, 3 is ATGM round, 4 is HMG round, 5 is artillery shell, 6 is arty rocket
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"9M55K 300mm anti-personnel-cluster-munition-dispensing unguided rocket",
                disc:"300mm unguided rocket fired originally from the 9K58 BM-30 'Smerch' MRL",
                range:43.495,
                payload:3,//1 HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical
                payloadDevice:0,//used if the payload is something the DB includes. For example, launching a rocket full of AT mines into a zone should add those mines to the zone. 
                warheadExplTNT:0,//used for simple HE weapons
                fireableIDs:[],//what vehicles can fire the munition
                transportableIDs:[],//what vehicles can carry the munition
                weight:1763.698,
            },
            ar_9M55K1:{
                type:6,
                guidance:[1,0,0,0,0,1,0],
                name:"9M55K1 300mm self-guided anti-tank cluster-munition-dispensing unguided rocket",
                disc:"300mm unguided (but with smart submunitions) rocket fired originally from the 9K58 BM-30 'Smerch' MRL",
                range:43.495,
                payload:4,
                payloadDevice:0,
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:1763.698,
            },
            ar_9M55K4:{
                type:6,
                guidance:[1,0,0,0,0,0,0],
                name:"9M55K4 300mm rocket round",
                disc:"AT-minelet dispenser, presumably using PTM-3 shaped charge mines. Deploys 25 with one rocket.",
                range:43.495,
                payload:6,
                payloadDevice:[tComponents.weapons.antiTankMine.ATM_PTM3,25],
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:1763.698,
            },
            ar_9M55K5:{
                type:6,
                guidance:[1,0,0,0,0,0,0],
                name:"9M55K5 300mm rocket round",
                disc:"HEAT/HE (presumably cluster) munition rocket, dispensing 646 submunitions each with 120mm of pen",
                range:43.495,
                payload:4,
                payloadDevice:0,
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:1763.698,
            },
            ar_9M55K6:{
                type:6,
                guidance:[1,0,0,0,0,1,0],
                name:"9M55K6 300mm rocket round",
                disc:"Anti-tank auto-targeting cluster munition dispenser, uses 5 9N268 smart submunitions",
                range:43.495,
                payload:4,
                payloadDevice:0,
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:1763.698,
            },
            ar_9M55K7:{
                type:6,
                guidance:[1,0,0,0,0,1,0],
                name:"9M55K7 300mm rocket round",
                disc:"Anti-tank auto-targeting cluster munition dispenser, carries 20 submunitions of unknown type",
                range:43.495,
                payload:4,
                payloadDevice:0,
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:1763.698,
            },
            ar_9M55F:{
                type:6,
                guidance:[1,0,0,0,0,0,0],
                name:"9M55F 300mm rocket round",
                disc:"HE/Frag munition rocket, I will treat this as an HE rocket",
                range:43.495,
                payload:1,
                payloadDevice:0,
                warheadExplTNT:600,//this is a guess, I am not sure what explosive it is filled with and how it compares to TNT
                fireableIDs:[],
                transportableIDs:[],
                weight:1763.698,
            },
            ar_9M55C:{
                type:6,
                guidance:[1,0,0,0,0,0,0],
                name:"9M55C 300mm rocket round",
                disc:"Thermobaric rocket",
                range:43.495,
                payload:8,
                payloadDevice:0,
                warheadExplTNT:900,//this is a guess, I am not sure what explosive it is filled with and how it compares to TNT. Further abstracting it, I am multiplying it's payload by 1.5 because it is thermobaric.
                fireableIDs:[],
                transportableIDs:[],
                weight:1763.698,
            },
            ar_9M528:{
                type:6,
                guidance:[1,0,0,0,0,0,0],
                name:"9M528 300mm rocket round",
                disc:"HE-Fragmentation",
                range:55.923,
                payload:1,
                payloadDevice:0,
                warheadExplTNT:600,//this is a guess, I am not sure what explosive it is filled with and how it compares to TNT. 
                fireableIDs:[],
                transportableIDs:[],
                weight:1796,
            },
            ar_9M532:{
                type:6,
                guidance:[1,0,0,0,0,1,0],
                name:"9M532 300mm rocket round",
                disc:"Anti-tank auto-targeting cluster munition dispenser, carries 20 9N282 submunitions",
                range:43.495,
                payload:4,
                payloadDevice:0,
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:1763.698,
            },
            ar_9M534:{
                type:6,
                guidance:[1,0,0,0,0,0,0],
                name:"9M534 300mm rocket round",
                disc:"UAV delivery system, ostensibly using the T-90 UAV, which has 20 min loiter time. ",
                range:55.923,
                payload:7,
                payloadDevice:0,
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:1796,
            },
            ar_9M542:{
                type:6,
                guidance:[1,0,0,1,1,0,0],
                name:"9M542 300mm rocket round",
                disc:"HE/Frag PGM with inertial, GLONASS guidance",
                range:74.564,
                payload:1,
                payloadDevice:0,
                warheadExplTNT:350,
                fireableIDs:[],
                transportableIDs:[],
                weight:1796,
            },
            ar_R624:{
                type:6,
                guidance:[1,0,1,1,1,0,0],//this round is produced by Ukraine and has GPS guidance. I am going to give it both GPS and GLONASS to allow for the possibility of russian production
                name:"R624 300mm rocket round",
                disc:"HE/Frag PGM with inertial, GPS and GLONASS guidance",
                range:43.495,
                payload:1,
                payloadDevice:0,
                warheadExplTNT:575,
                fireableIDs:[],
                transportableIDs:[],
                weight:1796,
            },
            ar_R624M:{
                type:6,
                guidance:[1,0,1,1,1,0,0],//this round is produced by Ukraine and has GPS guidance. I am going to give it both GPS and GLONASS to allow for the possibility of russian production
                name:"R624M 300mm rocket round",
                disc:"HE/Frag PGM with inertial, GPS and GLONASS guidance. Possibly the best rocket in even hypothetical russian inventory",
                range:80.778,//damn son
                payload:1,
                payloadDevice:0,
                warheadExplTNT:425,
                fireableIDs:[],
                transportableIDs:[],
                weight:1796,
            },
            ar_9M27F:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"9M27F 220mm rocket round",
                disc:"HE/Frag dumb rocket",
                range:21.7,
                payload:1, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical
                payloadDevice:0,
                warheadExplTNT:250,
                fireableIDs:[],
                transportableIDs:[],
                weight:620,
            },
            ar_9M27K1:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"9M27K1 220mm rocket round",
                disc:"anti-tank cluster bomb dispenser",
                range:21.7,
                payload:4,
                payloadDevice:0,
                warheadExplTNT:250,
                fireableIDs:[],
                transportableIDs:[],
                weight:600,
            },
            ar_9M27K2:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"9M27K2 220mm rocket round",
                disc:"dispenses 24 PTM-1 anti-tank mines",
                range:21.7,
                payload:6,
                payloadDevice:[tComponents.weapons.antiTankMine.ATM_PTM1,24],
                warheadExplTNT:250,
                fireableIDs:[],
                transportableIDs:[],
                weight:600,
            },
            ar_9M27K3:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"9M27K3 220mm rocket round",
                disc:"dispenses 312 PFM-1 anti-personnel mines",
                range:21.1,
                payload:5,
                payloadDevice:[tComponents.weapons.antiPersonMine.APM_PFM1,312],//that's a lot of mines
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:600,
            },
            ar_9M59:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"9M59 220mm rocket round",
                disc:"dispenses 9 PTM-3 anti-tank mines",
                range:21.75,
                payload:6,
                payloadDevice:[tComponents.weapons.antiTankMine.ATM_PTM3,9],
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:600,
            },
            ar_9M22U:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"9M22U 122mm rocket round",
                disc:"HE/Frag dumb rocket",
                range:12.66,
                payload:1, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical
                payloadDevice:0,
                warheadExplTNT:50,
                fireableIDs:[],
                transportableIDs:[],
                weight:147,
            },
            ar_9M28F:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"9M28F 122mm rocket round",
                disc:"HE/Frag dumb rocket",
                range:9.3,
                payload:1, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical
                payloadDevice:0,
                warheadExplTNT:55,
                fireableIDs:[],
                transportableIDs:[],
                weight:125,
            },
            ar_9M28K:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"9M28K 122mm rocket round",
                disc:"Anti-Tank mines, not clear what kind but I am going to guess PTM-3, of which it can carry 5",
                range:8.3,
                payload:6, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical
                payloadDevice:[tComponents.weapons.antiTankMine.ATM_PTM3,5],
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:127,
            },
            ar_9M43:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"9M43 122mm rocket round",
                disc:"smoke",
                range:12,
                payload:2, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical
                payloadDevice:0,
                warheadExplTNT:45,
                fireableIDs:[],
                transportableIDs:[],
                weight:146,
            },
            ar_9M217:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"9M217 122mm rocket round",
                disc:"Anti-Tank cluster munition dispenser",
                range:19,
                payload:4, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical
                payloadDevice:0,
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:150,
            },
            ar_9M218:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"9M218 122mm rocket round",
                disc:"HEAT cluster munition dispenser",
                range:19,
                payload:4, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical
                payloadDevice:0,
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:150,
            },
            ar_9M519:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"9M519 122mm rocket round",
                disc:"deploys an R-032 1.5-120mhz jammer that stays active for 60 minutes",
                range:11.5,
                payload:11, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical,11 jammer
                payloadDevice:0,
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:150,
            },
            ar_9M521:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"9M521 122mm rocket round",
                disc:"Frag/HE rocket, a more modern version with increased range",
                range:25,
                payload:1, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical,11 jammer
                payloadDevice:0,
                warheadExplTNT:55,
                fireableIDs:[],
                transportableIDs:[],
                weight:146,
            },
            ar_9M22S:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"9M22S 122mm rocket round",
                disc:"Incendiary rocket",
                range:12.36,
                payload:1, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical,11 jammer
                payloadDevice:0,
                warheadExplTNT:39,
                fireableIDs:[],
                transportableIDs:[],
                weight:146,
            },
            ar_3M16:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"3M16 122mm rocket round",
                disc:"Anti-Personnel mine dispenser with 5 POM-2 mines",
                range:9.36,
                payload:5, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical,11 jammer
                payloadDevice:[tComponents.weapons.antiPersonMine.APM_POM2,5],
                warheadExplTNT:39,
                fireableIDs:[],
                transportableIDs:[],
                weight:117,
            },
            ar_M28:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"M28 227mm rocket",
                disc:"Anti-Tank mine dispensing roud with a total of 28 AT-2 mines",
                range:24.854,
                payload:5, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical,11 jammer
                payloadDevice:[tComponents.weapons.antiTankMine.ATM_AT2,28],
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:567.69,//nice
            },
            ar_M26A1:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"M26A1 227mm rocket",
                disc:"General purpose cluster-munition dispensing rocket, dispenses 518 M85/M77 cluster munitions. No longer in use and actively being destroyed as of 22",
                range:28.272,
                payload:3, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical,11 jammer
                payloadDevice:[,],
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:652.568,
            },
            ar_M26:{
                type:6,
                guidance:[1,0,0,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"M26 227mm rocket",
                disc:"General purpose cluster-munition dispensing rocket, dispenses 518 M85/M77 cluster munitions, no longer in use as of 22",
                range:19.635,
                payload:3, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical,11 jammer
                payloadDevice:[,],
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:674.614,
            },
            ar_M30:{
                type:6,
                guidance:[1,0,1,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"M30 227mm rocket",
                disc:"First major innovation over the M26, the M30 GMLRS combines US rocket artillery with GPS-guided precision capability, deploys 404 cluster munitions. No longer in use as of 2019",
                range:41.942,
                payload:3, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical,11 jammer
                payloadDevice:[,],
                warheadExplTNT:0,
                fireableIDs:[],
                transportableIDs:[],
                weight:674.614,//guess, no data
            },
            ar_M31:{
                type:6,
                guidance:[1,0,1,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"M31 227mm rocket",
                disc:"US General purpose unitary explosive GMRLS rocket",
                range:41.942,
                payload:1, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical,11 jammer
                payloadDevice:[,],
                warheadExplTNT:67.439,
                fireableIDs:[],
                transportableIDs:[],
                weight:674.614,
            },
            ar_M31A1:{
                type:6,
                guidance:[1,0,1,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"M31A1 227mm rocket",
                disc:"US General purpose unitary explosive GMRLS rocket, improved version with allegedly improved range",
                range:55.923,
                payload:1, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical,11 jammer
                payloadDevice:[,],
                warheadExplTNT:67.439,
                fireableIDs:[],
                transportableIDs:[],
                weight:674.614,
            },
            ar_M31A2:{
                type:6,
                guidance:[1,0,1,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"M31A2 227mm rocket",
                disc:"US General purpose unitary explosive GMRLS rocket, improved version with allegedly improved range",
                range:56,//guess, giving it a slight buff because I know of no other reason why it's better
                payload:1, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical,11 jammer
                payloadDevice:[,],
                warheadExplTNT:67.439,
                fireableIDs:[],
                transportableIDs:[],
                weight:674.614,
            },
            ar_M48:{
                type:6,
                guidance:[1,0,1,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"M48 MGM-140 ATACMS QRU",
                disc:"US quasi-ballistic MLRS-launched missile",
                range:186,//guess, giving it a slight buff because I know of no other reason why it's better
                payload:1, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical,11 jammer
                payloadDevice:[,],
                warheadExplTNT:665,
                fireableIDs:[],
                transportableIDs:[],
                weight:674.614,
            },
            ar_M57:{
                type:6,
                guidance:[1,0,1,0,0,0,0],//dumb, dumb+final laser guidance, GPS guidance, GLONASS, INS guidance, target finding, MIL
                name:"M48 MGM-140 ATACMS TAMCS 2000",
                disc:"US quasi-ballistic MLRS-launched missile",
                range:186,//guess, giving it a slight buff because I know of no other reason why it's better
                payload:1, //HE, 2 Smoke, 3 anti-personnel cluster, 4 anti-tank cluster, 5 anti-p mines, 6 anti-T mines, 7 drone, 8 thermobaric, 9 bunker busting, 10 chemical,11 jammer
                payloadDevice:[,],
                warheadExplTNT:665,
                fireableIDs:[],
                transportableIDs:[],
                weight:674.614,
            },
        }


    }


};
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
        SPA_9P140:{
            name:"9P140 (BM-27) 'Uragan'",
            disc:"Soviet 220mm MRL with a variety of warheads. Heavier than the BM-21 but less so than the BM-30.",
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
        US:{
            army:{
                infantry:{
                    inf_11B_LAT:{
                        name:0,
                        ID:[0,0,0],//country, branch, rank index. This reads as Abkhazia, Ground Forces, rifleman/crewman/basic soldier. Used in random name generation amongst possibly other things. The 4th digit is the squad ID. 
                        primary:{//primary weapon, must be a firearm
                            name:tComponents.weapons.firearms.ar_M4A1,
                            optic:tComponents.optics.prd_M68_CCO,
                            suppressor:0,
                            mag:gComponents.mags.m_USGI30AR,
                            ammunition:[gComponents.calibers.c556x45,210],
                            uBGL:0,
                            uBGLAmmunition:[0,0],
                            railAccessory:tComponents.railAccessories.ra_ANPEQ16,
                            gripMod:tComponents.foreGrips.p_fgbp_GPS02,
                            weight:0,
                        },
                        secondary:{//secondary weapon, must be a firearm
                            name:0,
                            optic:0,
                            suppressor:0,
                            mag:gComponents.mags.m_M249_100Sack,
                            ammunition:[gComponents.calibers.c556x45,100],
                            uBGL:0,
                            uBGLAmmunition:0,
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        special:{//special weapon, a standalone rocket launcher
                            name:tComponents.weapons.RL.RL_M136,
                            optic:0,
                            gripMod:0,
                            weight:0,
                            GPRound:[gComponents.specialAmmunition.sA_M136_HEAT,1],
                            APRound:[0,0],
                            HeavyRound:[0,0],
                            SmokeRound:[0,0],
                        },
                        explosives:{
                            explosive1:[tComponents.weapons.fGren.G_M67,1],//name of explosive, quantity of explosive
                            explosive2:[0,0],
                            explosive3:[0,0],
                        },
                        mines:{
                            mine1:0,
                            mine2:0,
                            mine3:0,
                        },
                        kit:{
                            bArmor:tComponents.vests.v_MSV,
                            nods:0,
                            earPro:tComponents.headSets.hs_ComTacIII,
                            squadComms:tComponents.pRadios.pr_MR3000P,
                            radio:0,
                            uniform:tComponents.uniforms.u_ACU_OCP,
                            IFAK:tComponents.iFAKs.iFAK_II,
                            canteen:tComponents.canteens.GI_MOLLE,           
                            helmet:tComponents.helmets.h_ECH_W,
                            backpack:tComponents.backpacks.ap_MOLLE2_W,
                            tent:0,       
                            sleepingBag:tComponents.sleepingBags.sb_MSS_W,
                            supplies:{
                                ration1:[tComponents.supplies.rations.r_2020_ChiliMac_MRE,4],
                                ration2:[0,0],
                                ration3:[0,0],
                                waterContainer1:[0,0],
                                waterContainer2:[0,0],
                            }    
                        },
                        buffs:{
                            rMealBuff:1,
                            rWaterBuff:1,
                            rHotMealBuff:1,
                            rHotShowerBuff:1,
                            rReserveTimeBuff:1,
                        },
                        status:{
                            currentActivity:4,
                            activityLevel:2,    
                            inVehicle:0,
                            inCombatType:0,
                            stress:1,
                            totalKitWeight:0,
                            effectivness:1,
                            calorieBalance:0,
                            waterBalance:0,
                            morale:1,
                            fatigue:0,
                            willToFight:{
                                totalWillToFight:0,
                                capabilities:{
                                    competence:[
                                        5,//sustainability
                                        5,//sufficiency
                                        5,//skills
                                        5//relevance
                                    ],
                                    quality:[
                                        5,//adaptability
                                        5,//education
                                        5,//fitness
                                        5,//psych traits
                                        5,//resilience
                                        5,//social skills
                                    ],
                                },
                                motivations:{
                                    desperation:5,
                                    revenge:5,
                                    ideology:5,
                                    identity:[
                                        5,//organization
                                        5,//personal
                                        5,//unit
                                        5,//state
                                        5,//social
                                        5//society
                                    ]
                                }
                            },
                            hActiveSinceLRest:[
                                0,//basic metabolic rate
                                0,//sedentary, little to no exercise
                                0,//light activity
                                0,//moderate activity
                                0,//active,
                                0,//very active
                                0,//extremely active 
                            ],
                            hoursCombatExperience:0,
                            hoursJobExperience:0,
                            leadership:{//factors considered if they are in a squad leadership position
                                leadershipLevel:0,
                                hasBeenInit:0,
                                attributes:{
                                    character:[
                                        5,//morality
                                        5,//empathy
                                        5,//warrior ethos
                                        5//discipline
                                    ],
                                    presence:[
                                        5,//military and professional bearing
                                        5,//fitness
                                        5,//confidence
                                        5//resilience
                                    ],
                                    intellect:[
                                        5, //mental agility
                                        5,//sound judgement
                                        5,//innovation
                                        5,//interpersonal tact
                                        5//expertise
                                    ]
    
                                },
                                competencies:{
                                    leads:[
                                        5,
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    develops:[
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    achieves:15
                                }
    
                            },
                            points:{//different point values contributed to the total lethality of the squad
                                AP:0,//anti-personnel
                                AV:0,//anti-vehicle
                                AA:0,//anti-air
                            },
                            specialty:"11B",
                            hostSqID:[0,0],
                        },
                    },
                    inf_11B_FTL:{
                        name:0,
                        ID:[0,0,1],//country, branch, rank index. This reads as Abkhazia, Ground Forces, rifleman/crewman/basic soldier. Used in random name generation amongst possibly other things.
                        primary:{//primary weapon, must be a firearm
                            name:tComponents.weapons.firearms.ar_M4A1,
                            optic:tComponents.optics.po_TA11RCO_ACOG,
                            suppressor:0,
                            mag:gComponents.mags.m_USGI30AR,
                            ammunition:[gComponents.calibers.c556x45,210],
                            uBGL:0,
                            uBGLAmmunition:[0,0],
                            railAccessory:tComponents.railAccessories.ra_ANPEQ16,
                            gripMod:tComponents.foreGrips.p_fgbp_GPS02,
                            weight:0,
                        },
                        secondary:{//secondary weapon, must be a firearm
                            name:0,
                            optic:0,
                            suppressor:0,
                            mag:0,
                            ammunition:[0,0],
                            uBGL:0,
                            uBGLAmmunition:0,
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        special:{//special weapon, a standalone rocket launcher
                            name:0,
                            optic:0,
                            gripMod:0,
                            weight:0,
                            GPRound:[0,0],
                            APRound:[0,0],
                            HeavyRound:[0,0],
                            SmokeRound:[0,0],
                        },
                        explosives:{
                            explosive1:[tComponents.weapons.fGren.G_M67,1],//name of explosive, quantity of explosive
                            explosive2:[0,0],
                            explosive3:[0,0],
                        },
                        mines:{
                            mine1:0,
                            mine2:0,
                            mine3:0,
                        },
                        kit:{
                            bArmor:tComponents.vests.v_MSV,
                            nods:0,
                            earPro:tComponents.headSets.hs_ComTacIII,
                            squadComms:tComponents.pRadios.pr_MR3000P,
                            radio:0,
                            uniform:tComponents.uniforms.u_ACU_OCP,
                            IFAK:tComponents.iFAKs.iFAK_II,
                            canteen:tComponents.canteens.GI_MOLLE,           
                            helmet:tComponents.helmets.h_ECH_W,
                            backpack:tComponents.backpacks.ap_MOLLE2_W,
                            tent:0,       
                            sleepingBag:tComponents.sleepingBags.sb_MSS_W,
                            supplies:{
                                ration1:[tComponents.supplies.rations.r_2020_ChiliMac_MRE,4],
                                ration2:[0,0],
                                ration3:[0,0],
                                waterContainer1:[0,0],
                                waterContainer2:[0,0],
                            }    
                        },
                        buffs:{
                            rMealBuff:1,
                            rWaterBuff:1,
                            rHotMealBuff:1,
                            rHotShowerBuff:1,
                            rReserveTimeBuff:1,
                        },
                        status:{
                            currentActivity:4,
                            activityLevel:2,    
                            inVehicle:0,
                            inCombatType:0,
                            stress:1,
                            totalKitWeight:0,
                            effectivness:1,
                            calorieBalance:0,
                            waterBalance:0,
                            morale:1,
                            fatigue:0,
                            willToFight:{
                                totalWillToFight:0,
                                capabilities:{
                                    competence:[
                                        5,//sustainability
                                        5,//sufficiency
                                        5,//skills
                                        5//relevance
                                    ],
                                    quality:[
                                        5,//adaptability
                                        5,//education
                                        5,//fitness
                                        5,//psych traits
                                        5,//resilience
                                        5,//social skills
                                    ],
                                },
                                motivations:{
                                    desperation:5,
                                    revenge:5,
                                    ideology:5,
                                    identity:[
                                        5,//organization
                                        5,//personal
                                        5,//unit
                                        5,//state
                                        5,//social
                                        5//society
                                    ]
                                }
                            },
                            hActiveSinceLRest:[
                                0,//basic metabolic rate
                                0,//sedentary, little to no exercise
                                0,//light activity
                                0,//moderate activity
                                0,//active,
                                0,//very active
                                0,//extremely active 
                            ],
                            hoursCombatExperience:0,
                            hoursJobExperience:0,
                            leadership:{//factors considered if they are in a squad leadership position
                                leadershipLevel:0,
                                hasBeenInit:0,
                                attributes:{
                                    character:[
                                        5,//morality
                                        5,//empathy
                                        5,//warrior ethos
                                        5//discipline
                                    ],
                                    presence:[
                                        5,//military and professional bearing
                                        5,//fitness
                                        5,//confidence
                                        5//resilience
                                    ],
                                    intellect:[
                                        5, //mental agility
                                        5,//sound judgement
                                        5,//innovation
                                        5,//interpersonal tact
                                        5//expertise
                                    ]
    
                                },
                                competencies:{
                                    leads:[
                                        5,
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    develops:[
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                }
    
                            },
                            points:{//different point values contributed to the total lethality of the squad
                                AP:0,//anti-personnel
                                AV:0,//anti-vehicle
                                AA:0,//anti-air
                            },
                            specialty:"11B",
                            hostSqID:[0,0],

                        },
                    },
                    inf_11B_Gren:{
                        name:0,
                        ID:[0,0,0],//country, branch, rank index. This reads as Abkhazia, Ground Forces, rifleman/crewman/basic soldier. Used in random name generation amongst possibly other things.
                        primary:{//primary weapon, must be a firearm
                            name:tComponents.weapons.firearms.ar_M4A1,
                            optic:tComponents.optics.po_TA11RCO_ACOG,
                            suppressor:0,
                            mag:gComponents.mags.m_USGI30AR,
                            ammunition:[gComponents.calibers.c556x45,210],
                            uBGL:tComponents.weapons.uBGL.p_UBGL_M320,
                            uBGLAmmunition:[gComponents.uBGLAmmunition.uA_40mm,5],
                            railAccessory:tComponents.railAccessories.ra_ANPEQ16,
                            gripMod:0,
                            weight:0,
                        },
                        secondary:{//secondary weapon, must be a firearm
                            name:0,
                            optic:0,
                            suppressor:0,
                            mag:0,
                            ammunition:[0,0],
                            uBGL:0,
                            uBGLAmmunition:0,
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        special:{//special weapon, a standalone rocket launcher
                            name:0,
                            optic:0,
                            gripMod:0,
                            weight:0,
                            GPRound:[0,0],
                            APRound:[0,0],
                            HeavyRound:[0,0],
                            SmokeRound:[0,0],
                        },
                        explosives:{
                            explosive1:[tComponents.weapons.fGren.G_M67,1],//name of explosive, quantity of explosive
                            explosive2:[0,0],
                            explosive3:[0,0],
                        },
                        mines:{
                            mine1:0,
                            mine2:0,
                            mine3:0,
                        },
                        kit:{
                            bArmor:tComponents.vests.v_MSV,
                            nods:0,
                            earPro:tComponents.headSets.hs_ComTacIII,
                            squadComms:tComponents.pRadios.pr_MR3000P,
                            radio:0,
                            uniform:tComponents.uniforms.u_ACU_OCP,
                            IFAK:tComponents.iFAKs.iFAK_II,
                            canteen:tComponents.canteens.GI_MOLLE,           
                            helmet:tComponents.helmets.h_ECH_W,
                            backpack:tComponents.backpacks.ap_MOLLE2_W,
                            tent:0,       
                            sleepingBag:tComponents.sleepingBags.sb_MSS_W,
                            supplies:{
                                ration1:[tComponents.supplies.rations.r_2020_ChiliMac_MRE,4],
                                ration2:[0,0],
                                ration3:[0,0],
                                waterContainer1:[0,0],
                                waterContainer2:[0,0],
                            }    
                        },
                        buffs:{
                            rMealBuff:1,
                            rWaterBuff:1,
                            rHotMealBuff:1,
                            rHotShowerBuff:1,
                            rReserveTimeBuff:1,
                        },
                        status:{
                            currentActivity:4,
                            activityLevel:2,    
                            inVehicle:0,
                            inCombatType:0,
                            stress:1,
                            totalKitWeight:0,
                            effectivness:1,
                            calorieBalance:0,
                            waterBalance:0,
                            morale:1,
                            fatigue:0,
                            willToFight:{
                                totalWillToFight:0,
                                capabilities:{
                                    competence:[
                                        5,//sustainability
                                        5,//sufficiency
                                        5,//skills
                                        5//relevance
                                    ],
                                    quality:[
                                        5,//adaptability
                                        5,//education
                                        5,//fitness
                                        5,//psych traits
                                        5,//resilience
                                        5,//social skills
                                    ],
                                },
                                motivations:{
                                    desperation:5,
                                    revenge:5,
                                    ideology:5,
                                    identity:[
                                        5,//organization
                                        5,//personal
                                        5,//unit
                                        5,//state
                                        5,//social
                                        5//society
                                    ]
                                }
                            },
                            hActiveSinceLRest:[
                                0,//basic metabolic rate
                                0,//sedentary, little to no exercise
                                0,//light activity
                                0,//moderate activity
                                0,//active,
                                0,//very active
                                0,//extremely active 
                            ],
                            hoursCombatExperience:0,
                            hoursJobExperience:0,
                            leadership:{//factors considered if they are in a squad leadership position
                                leadershipLevel:0,
                                hasBeenInit:0,
                                attributes:{
                                    character:[
                                        5,//morality
                                        5,//empathy
                                        5,//warrior ethos
                                        5//discipline
                                    ],
                                    presence:[
                                        5,//military and professional bearing
                                        5,//fitness
                                        5,//confidence
                                        5//resilience
                                    ],
                                    intellect:[
                                        5, //mental agility
                                        5,//sound judgement
                                        5,//innovation
                                        5,//interpersonal tact
                                        5//expertise
                                    ]
    
                                },
                                competencies:{
                                    leads:[
                                        5,
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    develops:[
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                }
    
                            },
                            points:{//different point values contributed to the total lethality of the squad
                                AP:0,//anti-personnel
                                AV:0,//anti-vehicle
                                AA:0,//anti-air
                            },
                            specialty:"11B",
                            hostSqID:[0,0],
                        },
                    },
                    inf_11BC_M249:{
                        name:0,
                        ID:[0,0,0],//country, branch, rank index. This reads as Abkhazia, Ground Forces, rifleman/crewman/basic soldier. Used in random name generation amongst possibly other things.
                        primary:{//primary weapon, must be a firearm
                            name:tComponents.weapons.firearms.lmg_M249PIP,
                            optic:tComponents.optics.po_C79,
                            suppressor:0,
                            mag:gComponents.mags.m_M249_100Sack,
                            ammunition:[gComponents.calibers.c556x45,300],
                            uBGL:0,
                            uBGLAmmunition:[0,0],
                            railAccessory:tComponents.railAccessories.ra_ANPEQ16,
                            gripMod:0,
                            weight:0,
                        },
                        secondary:{//secondary weapon, must be a firearm
                            name:0,
                            optic:0,
                            suppressor:0,
                            mag:0,
                            ammunition:[0,0],
                            uBGL:0,
                            uBGLAmmunition:0,
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        special:{//special weapon, a standalone rocket launcher
                            name:0,
                            optic:0,
                            gripMod:0,
                            weight:0,
                            GPRound:[0,0],
                            APRound:[0,0],
                            HeavyRound:[0,0],
                            SmokeRound:[0,0],
                        },
                        explosives:{
                            explosive1:[tComponents.weapons.fGren.G_M67,1],//name of explosive, quantity of explosive
                            explosive2:[0,0],
                            explosive3:[0,0],
                        },
                        mines:{
                            mine1:0,
                            mine2:0,
                            mine3:0,
                        },
                        kit:{
                            bArmor:tComponents.vests.v_MSV,
                            nods:0,
                            earPro:tComponents.headSets.hs_ComTacIII,
                            squadComms:tComponents.pRadios.pr_MR3000P,
                            radio:0,
                            uniform:tComponents.uniforms.u_ACU_OCP,
                            IFAK:tComponents.iFAKs.iFAK_II,
                            canteen:tComponents.canteens.GI_MOLLE,           
                            helmet:tComponents.helmets.h_ECH_W,
                            backpack:tComponents.backpacks.ap_MOLLE2_W,
                            tent:0,       
                            sleepingBag:tComponents.sleepingBags.sb_MSS_W,
                            supplies:{
                                ration1:[tComponents.supplies.rations.r_2020_ChiliMac_MRE,4],
                                ration2:[0,0],
                                ration3:[0,0],
                                waterContainer1:[0,0],
                                waterContainer2:[0,0],
                            }    
                        },
                        buffs:{
                            rMealBuff:1,
                            rWaterBuff:1,
                            rHotMealBuff:1,
                            rHotShowerBuff:1,
                            rReserveTimeBuff:1,
                        },
                        status:{
                            currentActivity:4,
                            activityLevel:2,    
                            inVehicle:0,
                            inCombatType:0,
                            stress:1,
                            totalKitWeight:0,
                            effectivness:1,
                            calorieBalance:0,
                            waterBalance:0,
                            morale:1,
                            fatigue:0,
                            willToFight:{
                                totalWillToFight:0,
                                capabilities:{
                                    competence:[
                                        5,//sustainability
                                        5,//sufficiency
                                        5,//skills
                                        5//relevance
                                    ],
                                    quality:[
                                        5,//adaptability
                                        5,//education
                                        5,//fitness
                                        5,//psych traits
                                        5,//resilience
                                        5,//social skills
                                    ],
                                },
                                motivations:{
                                    desperation:5,
                                    revenge:5,
                                    ideology:5,
                                    identity:[
                                        5,//organization
                                        5,//personal
                                        5,//unit
                                        5,//state
                                        5,//social
                                        5//society
                                    ]
                                }
                            },
                            hActiveSinceLRest:[
                                0,//basic metabolic rate
                                0,//sedentary, little to no exercise
                                0,//light activity
                                0,//moderate activity
                                0,//active,
                                0,//very active
                                0,//extremely active 
                            ],
                            hoursCombatExperience:0,
                            hoursJobExperience:0,
                            leadership:{//factors considered if they are in a squad leadership position
                                leadershipLevel:0,
                                hasBeenInit:0,
                                attributes:{
                                    character:[
                                        5,//morality
                                        5,//empathy
                                        5,//warrior ethos
                                        5//discipline
                                    ],
                                    presence:[
                                        5,//military and professional bearing
                                        5,//fitness
                                        5,//confidence
                                        5//resilience
                                    ],
                                    intellect:[
                                        5, //mental agility
                                        5,//sound judgement
                                        5,//innovation
                                        5,//interpersonal tact
                                        5//expertise
                                    ]
    
                                },
                                competencies:{
                                    leads:[
                                        5,
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    develops:[
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    achieves:15
                                }
    
                            },
                            points:{//different point values contributed to the total lethality of the squad
                                AP:0,//anti-personnel
                                AV:0,//anti-vehicle
                                AA:0,//anti-air
                            },
                            specialty:"11BC",
                            hostSqID:[0,0],
                        },
                    },
                    inf_11Z_SL:{
                        name:0,
                        ID:[0,0,2],//country, branch, rank index. This reads as Abkhazia, Ground Forces, rifleman/crewman/basic soldier. Used in random name generation amongst possibly other things.
                        primary:{//primary weapon, must be a firearm
                            name:tComponents.weapons.firearms.ar_M4A1,
                            optic:tComponents.optics.po_TA11RCO_ACOG,
                            suppressor:0,
                            mag:gComponents.mags.m_USGI30AR,
                            ammunition:[gComponents.calibers.c556x45,210],
                            uBGL:0,
                            uBGLAmmunition:[0,0],
                            railAccessory:tComponents.railAccessories.ra_ANPEQ16,
                            gripMod:tComponents.foreGrips.p_fgbp_GPS02,
                            weight:0,
                        },
                        secondary:{//secondary weapon, must be a firearm
                            name:0,
                            optic:0,
                            suppressor:0,
                            mag:0,
                            ammunition:[0,0],
                            uBGL:0,
                            uBGLAmmunition:0,
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        special:{//special weapon, a standalone rocket launcher
                            name:0,
                            optic:0,
                            gripMod:0,
                            weight:0,
                            GPRound:[0,0],
                            APRound:[0,0],
                            HeavyRound:[0,0],
                            SmokeRound:[0,0],
                        },
                        explosives:{
                            explosive1:[tComponents.weapons.fGren.G_M67,1],//name of explosive, quantity of explosive
                            explosive2:[0,0],
                            explosive3:[0,0],
                        },
                        mines:{
                            mine1:0,
                            mine2:0,
                            mine3:0,
                        },
                        kit:{
                            bArmor:tComponents.vests.v_MSV,
                            nods:0,
                            earPro:tComponents.headSets.hs_ComTacIII,
                            squadComms:tComponents.pRadios.pr_MR3000P,
                            radio:0,
                            uniform:tComponents.uniforms.u_ACU_OCP, 
                            IFAK:tComponents.iFAKs.iFAK_II,
                            canteen:tComponents.canteens.GI_MOLLE,           
                            helmet:tComponents.helmets.h_ECH_W,
                            backpack:tComponents.backpacks.ap_MOLLE2_W,
                            tent:0,       
                            sleepingBag:tComponents.sleepingBags.sb_MSS_W,
                            supplies:{
                                ration1:[tComponents.supplies.rations.r_2020_ChiliMac_MRE,4],
                                ration2:[0,0],
                                ration3:[0,0],
                                waterContainer1:[0,0],
                                waterContainer2:[0,0],
                            }    
                        },
                        buffs:{
                            rMealBuff:1,
                            rWaterBuff:1,
                            rHotMealBuff:1,
                            rHotShowerBuff:1,
                            rReserveTimeBuff:1,
                        },
                        status:{
                            currentActivity:4,
                            activityLevel:2,    
                            inVehicle:0,
                            inCombatType:0,
                            stress:1,
                            totalKitWeight:0,
                            effectivness:1,
                            calorieBalance:0,
                            waterBalance:0,
                            morale:1,
                            fatigue:0,
                            willToFight:{
                                totalWillToFight:0,
                                capabilities:{
                                    competence:[
                                        5,//sustainability
                                        5,//sufficiency
                                        5,//skills
                                        5//relevance
                                    ],
                                    quality:[
                                        5,//adaptability
                                        5,//education
                                        5,//fitness
                                        5,//psych traits
                                        5,//resilience
                                        5,//social skills
                                    ],
                                },
                                motivations:{
                                    desperation:5,
                                    revenge:5,
                                    ideology:5,
                                    identity:[
                                        5,//organization
                                        5,//personal
                                        5,//unit
                                        5,//state
                                        5,//social
                                        5//society
                                    ]
                                }
                            },
                            hActiveSinceLRest:[
                                0,//basic metabolic rate
                                0,//sedentary, little to no exercise
                                0,//light activity
                                0,//moderate activity
                                0,//active,
                                0,//very active
                                0,//extremely active 
                            ],
                            hoursCombatExperience:0,
                            hoursJobExperience:0,
                            leadership:{//factors considered if they are in a squad leadership position
                                leadershipLevel:0,
                                hasBeenInit:0,
                                attributes:{
                                    character:[
                                        5,//morality
                                        5,//empathy
                                        5,//warrior ethos
                                        5//discipline
                                    ],
                                    presence:[
                                        5.5,  //military and professional bearing
                                        8,    //fitness
                                        6,    //confidence
                                        6     //resilience
                                    ],
                                    intellect:[
                                        5.25,//mental agility
                                        5,   //sound judgement
                                        5,   //innovation
                                        5,   //interpersonal tact
                                        2.5  //expertise
                                    ]
    
                                },
                                competencies:{
                                    leads:[
                                        5,  //leads others
                                        5,  //builds trust
                                        5,  //extends influence beyond chain of command
                                        5,  //leads by example
                                        5   //communications skills
                                    ],
                                    develops:[
                                        5, //creates positive environment
                                        5, //prepares self
                                        5, //develops others
                                        5  //stewards profession
                                    ],
                                    achieves:15
                                }
    
                            },
                            points:{//different point values contributed to the total lethality of the squad
                                AP:0,//anti-personnel
                                AV:0,//anti-vehicle
                                AA:0,//anti-air
                            },
                            specialty:"11Z",
                            hostSqID:[0,0],
                        },
                    },
                },
                support:{
                },
                crew:{

                }
            }

        },
        Abkhazia:{
            army:{
                infantry:{
                    inf_11B_base:{
                        name:0,
                        ID:[2,0,0],//country, branch, rank index. This reads as Abkhazia, Ground Forces, rifleman/crewman/basic soldier. Used in random name generation amongst possibly other things.
                        primary:{//primary weapon, must be a firearm
                            name:tComponents.weapons.firearms.ar_AK74M,
                            optic:tComponents.optics.ako_1P78,
                            suppressor:0,
                            mag:gComponents.mags.m_AK74M_30,
                            ammunition:[gComponents.calibers.c545x39,210],
                            uBGL:0,
                            uBGLAmmunition:[0,0],
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        secondary:{//secondary weapon, must be a firearm
                            name:0,
                            optic:0,
                            suppressor:0,
                            mag:0,
                            ammunition:[0,0],
                            uBGL:0,
                            uBGLAmmunition:0,
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        special:{//special weapon, a standalone rocket launcher
                            name:0,
                            optic:0,
                            gripMod:0,
                            weight:0,
                            GPRound:[0,0],
                            APRound:[0,0],
                            HeavyRound:[0,0],
                            SmokeRound:[0,0],
                        },
                        explosives:{
                            explosive1:[tComponents.weapons.fGren.G_RGD5,2],//name of explosive, quantity of explosive
                            explosive2:[0,0],
                            explosive3:[0,0],
                        },
                        mines:{
                            mine1:0,
                            mine2:0,
                            mine3:0,
                        },
                        kit:{
                            bArmor:tComponents.vests.v_6B45M_W,
                            nods:0,
                            earPro:tComponents.headSets.hs_GSSH01,
                            squadComms:tComponents.pRadios.pr_R187P1E,
                            radio:0,
                            uniform:tComponents.uniforms.u_6SH122_Ratnik,
                            IFAK:tComponents.iFAKs.iFAK_Generic_1,
                            canteen:tComponents.canteens.USSR_Canteen,           
                            helmet:tComponents.helmets.h_6B47_W,
                            backpack:tComponents.backpacks.ap_6SH117_W,
                            tent:0,       
                            sleepingBag:tComponents.sleepingBags.sb_Ratnik_W,
                            supplies:{
                                ration1:[tComponents.supplies.rations.r_2020_IRP,3],
                                ration2:[0,0],
                                ration3:[0,0],
                                waterContainer1:[0,0],
                                waterContainer2:[0,0],
                            }    
                        },
                        buffs:{
                            rMealBuff:1,
                            rWaterBuff:1,
                            rHotMealBuff:1,
                            rHotShowerBuff:1,
                            rReserveTimeBuff:1,
                        },
                        status:{
                            currentActivity:4,
                            activityLevel:2,    
                            inVehicle:0,
                            inCombatType:0,
                            stress:1,
                            totalKitWeight:0,
                            effectivness:1,
                            calorieBalance:0,
                            waterBalance:0,
                            morale:1,
                            fatigue:0,
                            willToFight:{
                                totalWillToFight:0,
                                capabilities:{
                                    competence:[
                                        5,//sustainability
                                        5,//sufficiency
                                        5,//skills
                                        5//relevance
                                    ],
                                    quality:[
                                        5,//adaptability
                                        5,//education
                                        5,//fitness
                                        5,//psych traits
                                        5,//resilience
                                        5,//social skills
                                    ],
                                },
                                motivations:{
                                    desperation:5,
                                    revenge:5,
                                    ideology:5,
                                    identity:[
                                        5,//organization
                                        5,//personal
                                        5,//unit
                                        5,//state
                                        5,//social
                                        5//society
                                    ]
                                }
                            },
                            hActiveSinceLRest:[
                                0,//basic metabolic rate
                                0,//sedentary, little to no exercise
                                0,//light activity
                                0,//moderate activity
                                0,//active,
                                0,//very active
                                0,//extremely active 
                            ],
                            hoursCombatExperience:0,
                            hoursJobExperience:0,
                            leadership:{//factors considered if they are in a squad leadership position
                                leadershipLevel:0,
                                hasBeenInit:0,
                                attributes:{
                                    character:[
                                        5,//morality
                                        5,//empathy
                                        5,//warrior ethos
                                        5//discipline
                                    ],
                                    presence:[
                                        5,//military and professional bearing
                                        5,//fitness
                                        5,//confidence
                                        5//resilience
                                    ],
                                    intellect:[
                                        5, //mental agility
                                        5,//sound judgement
                                        5,//innovation
                                        5,//interpersonal tact
                                        5//expertise
                                    ]
    
                                },
                                competencies:{
                                    leads:[
                                        5,
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    develops:[
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    achieves:15
                                }
    
                            },
                            points:{//different point values contributed to the total lethality of the squad
                                AP:0,//anti-personnel
                                AV:0,//anti-vehicle
                                AA:0,//anti-air
                            },
                            specialty:"11B",
                            hostSqID:[0,0],
                        },
                    },
                    inf_11B_uBGL:{
                        name:0,
                        ID:[2,0,0],//country, branch, rank index. This reads as Abkhazia, Ground Forces, rifleman/crewman/basic soldier. Used in random name generation amongst possibly other things.
                        primary:{//primary weapon, must be a firearm
                            name:tComponents.weapons.firearms.ar_AK74M,
                            optic:tComponents.optics.ako_1P78,
                            suppressor:0,
                            mag:gComponents.mags.m_AK74M_30,
                            ammunition:[gComponents.calibers.c545x39,210],
                            uBGL:tComponents.weapons.uBGL.ak_UBGL_GP25,
                            uBGLAmmunition:[gComponents.uBGLAmmunition.uA_40mmRU,5],
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        secondary:{//secondary weapon, must be a firearm
                            name:0,
                            optic:0,
                            suppressor:0,
                            mag:0,
                            ammunition:[0,0],
                            uBGL:0,
                            uBGLAmmunition:0,
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        special:{//special weapon, a standalone rocket launcher
                            name:0,
                            optic:0,
                            gripMod:0,
                            weight:0,
                            GPRound:[0,0],
                            APRound:[0,0],
                            HeavyRound:[0,0],
                            SmokeRound:[0,0],
                        },
                        explosives:{
                            explosive1:[tComponents.weapons.fGren.G_RGD5,2],//name of explosive, quantity of explosive
                            explosive2:[0,0],
                            explosive3:[0,0],
                        },
                        mines:{
                            mine1:0,
                            mine2:0,
                            mine3:0,
                        },
                        kit:{
                            bArmor:tComponents.vests.v_6B45M_W,
                            nods:0,
                            earPro:tComponents.headSets.hs_GSSH01,
                            squadComms:tComponents.pRadios.pr_R187P1E,
                            radio:0,
                            uniform:tComponents.uniforms.u_6SH122_Ratnik,
                            IFAK:tComponents.iFAKs.iFAK_Generic_1,
                            canteen:tComponents.canteens.USSR_Canteen,           
                            helmet:tComponents.helmets.h_6B47_W,
                            backpack:tComponents.backpacks.ap_6SH117_W,
                            tent:0,       
                            sleepingBag:tComponents.sleepingBags.sb_Ratnik_W,
                            supplies:{
                                ration1:[tComponents.supplies.rations.r_2020_IRP,3],
                                ration2:[0,0],
                                ration3:[0,0],
                                waterContainer1:[0,0],
                                waterContainer2:[0,0],
                            }    
                        },
                        buffs:{
                            rMealBuff:1,
                            rWaterBuff:1,
                            rHotMealBuff:1,
                            rHotShowerBuff:1,
                            rReserveTimeBuff:1,
                        },
                        status:{
                            currentActivity:4,
                            activityLevel:2,    
                            inVehicle:0,
                            inCombatType:0,
                            stress:1,
                            totalKitWeight:0,
                            effectivness:1,
                            calorieBalance:0,
                            waterBalance:0,
                            morale:1,
                            fatigue:0,
                            willToFight:{
                                totalWillToFight:0,
                                capabilities:{
                                    competence:[
                                        5,//sustainability
                                        5,//sufficiency
                                        5,//skills
                                        5//relevance
                                    ],
                                    quality:[
                                        5,//adaptability
                                        5,//education
                                        5,//fitness
                                        5,//psych traits
                                        5,//resilience
                                        5,//social skills
                                    ],
                                },
                                motivations:{
                                    desperation:5,
                                    revenge:5,
                                    ideology:5,
                                    identity:[
                                        5,//organization
                                        5,//personal
                                        5,//unit
                                        5,//state
                                        5,//social
                                        5//society
                                    ]
                                }
                            },
                            hActiveSinceLRest:[
                                0,//basic metabolic rate
                                0,//sedentary, little to no exercise
                                0,//light activity
                                0,//moderate activity
                                0,//active,
                                0,//very active
                                0,//extremely active 
                            ],
                            hoursCombatExperience:0,
                            hoursJobExperience:0,
                            leadership:{//factors considered if they are in a squad leadership position
                                leadershipLevel:0,
                                hasBeenInit:0,
                                attributes:{
                                    character:[
                                        5,//morality
                                        5,//empathy
                                        5,//warrior ethos
                                        5//discipline
                                    ],
                                    presence:[
                                        5,//military and professional bearing
                                        5,//fitness
                                        5,//confidence
                                        5//resilience
                                    ],
                                    intellect:[
                                        5, //mental agility
                                        5,//sound judgement
                                        5,//innovation
                                        5,//interpersonal tact
                                        5//expertise
                                    ]
    
                                },
                                competencies:{
                                    leads:[
                                        5,
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    develops:[
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                }
    
                            },
                            points:{//different point values contributed to the total lethality of the squad
                                AP:0,//anti-personnel
                                AV:0,//anti-vehicle
                                AA:0,//anti-air
                            },
                            specialty:"11B",
                            hostSqID:[0,0],
                        },
                    },
                    inf_11B_grenAsst:{
                        name:0,
                        ID:[2,0,0],//country, branch, rank index. This reads as Abkhazia, Ground Forces, rifleman/crewman/basic soldier. Used in random name generation amongst possibly other things.
                        primary:{//primary weapon, must be a firearm
                            name:tComponents.weapons.firearms.ar_AK74M,
                            optic:tComponents.optics.ako_1P78,
                            suppressor:0,
                            mag:gComponents.mags.m_AK74M_30,
                            ammunition:[gComponents.calibers.c545x39,120],
                            uBGL:0,
                            uBGLAmmunition:[0,0],
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        secondary:{//secondary weapon, must be a firearm
                            name:0,
                            optic:0,
                            suppressor:0,
                            mag:0,
                            ammunition:[0,0],
                            uBGL:0,
                            uBGLAmmunition:0,
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        special:{//special weapon, a standalone rocket launcher
                            name:0,
                            optic:0,
                            gripMod:0,
                            weight:0,
                            GPRound:[gComponents.specialAmmunition.sA_RPG7_PG7VL_HEAT,2],
                            APRound:[0,0],
                            HeavyRound:[gComponents.specialAmmunition.sA_RPG7_PG7VR_THEAT,1],
                            SmokeRound:[0,0],
                        },
                        explosives:{
                            explosive1:[tComponents.weapons.fGren.G_RGD5,2],//name of explosive, quantity of explosive
                            explosive2:[0,0],
                            explosive3:[0,0],
                        },
                        mines:{
                            mine1:0,
                            mine2:0,
                            mine3:0,
                        },
                        kit:{
                            bArmor:tComponents.vests.v_6B45M_W,
                            nods:0,
                            earPro:tComponents.headSets.hs_GSSH01,
                            squadComms:tComponents.pRadios.pr_R187P1E,
                            radio:0,
                            uniform:tComponents.uniforms.u_6SH122_Ratnik,
                            IFAK:tComponents.iFAKs.iFAK_Generic_1,
                            canteen:tComponents.canteens.USSR_Canteen,           
                            helmet:tComponents.helmets.h_6B47_W,
                            backpack:tComponents.backpacks.ap_6SH117_W,
                            tent:0,       
                            sleepingBag:tComponents.sleepingBags.sb_Ratnik_W,
                            supplies:{
                                ration1:[tComponents.supplies.rations.r_2020_IRP,3],
                                ration2:[0,0],
                                ration3:[0,0],
                                waterContainer1:[0,0],
                                waterContainer2:[0,0],
                            }    
                        },
                        buffs:{
                            rMealBuff:1,
                            rWaterBuff:1,
                            rHotMealBuff:1,
                            rHotShowerBuff:1,
                            rReserveTimeBuff:1,
                        },
                        status:{
                            currentActivity:4,
                            activityLevel:2,    
                            inVehicle:0,
                            inCombatType:0,
                            stress:1,
                            totalKitWeight:0,
                            effectivness:1,
                            calorieBalance:0,
                            waterBalance:0,
                            morale:1,
                            fatigue:0,
                            willToFight:{
                                totalWillToFight:0,
                                capabilities:{
                                    competence:[
                                        5,//sustainability
                                        5,//sufficiency
                                        5,//skills
                                        5//relevance
                                    ],
                                    quality:[
                                        5,//adaptability
                                        5,//education
                                        5,//fitness
                                        5,//psych traits
                                        5,//resilience
                                        5,//social skills
                                    ],
                                },
                                motivations:{
                                    desperation:5,
                                    revenge:5,
                                    ideology:5,
                                    identity:[
                                        5,//organization
                                        5,//personal
                                        5,//unit
                                        5,//state
                                        5,//social
                                        5//society
                                    ]
                                }
                            },
                            hActiveSinceLRest:[
                                0,//basic metabolic rate
                                0,//sedentary, little to no exercise
                                0,//light activity
                                0,//moderate activity
                                0,//active,
                                0,//very active
                                0,//extremely active 
                            ],
                            hoursCombatExperience:0,
                            hoursJobExperience:0,
                            leadership:{//factors considered if they are in a squad leadership position
                                leadershipLevel:0,
                                hasBeenInit:0,
                                attributes:{
                                    character:[
                                        5,//morality
                                        5,//empathy
                                        5,//warrior ethos
                                        5//discipline
                                    ],
                                    presence:[
                                        5,//military and professional bearing
                                        5,//fitness
                                        5,//confidence
                                        5//resilience
                                    ],
                                    intellect:[
                                        5, //mental agility
                                        5,//sound judgement
                                        5,//innovation
                                        5,//interpersonal tact
                                        5//expertise
                                    ]
    
                                },
                                competencies:{
                                    leads:[
                                        5,
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    develops:[
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                }
    
                            },
                            points:{//different point values contributed to the total lethality of the squad
                                AP:0,//anti-personnel
                                AV:0,//anti-vehicle
                                AA:0,//anti-air
                            },
                            specialty:"11B",
                            hostSqID:[0,0],
                        },
                    },
                    inf_11B_gren_RPG7:{
                        name:0,
                        ID:[2,0,0],//country, branch, rank index. This reads as Abkhazia, Ground Forces, rifleman/crewman/basic soldier. Used in random name generation amongst possibly other things.
                        primary:{//primary weapon, must be a firearm
                            name:tComponents.weapons.firearms.ar_AK74M,
                            optic:tComponents.optics.ako_1P78,
                            suppressor:0,
                            mag:gComponents.mags.m_AK74M_30,
                            ammunition:[gComponents.calibers.c545x39,90],
                            uBGL:0,
                            uBGLAmmunition:[0,0],
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        secondary:{//secondary weapon, must be a firearm
                            name:0,
                            optic:0,
                            suppressor:0,
                            mag:0,
                            ammunition:[0,0],
                            uBGL:0,
                            uBGLAmmunition:0,
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        special:{//special weapon, a standalone rocket launcher
                            name:tComponents.weapons.RL.RL_RPG7V2,
                            optic:tComponents.optics.rlo_PGO7,
                            gripMod:0,
                            weight:0,
                            GPRound:[gComponents.specialAmmunition.sA_RPG7_PG7VL_HEAT,1],
                            APRound:[0,0],
                            HeavyRound:[gComponents.specialAmmunition.sA_RPG7_PG7VR_THEAT,1],
                            SmokeRound:[0,0],
                        },
                        explosives:{
                            explosive1:[0,0],//name of explosive, quantity of explosive
                            explosive2:[0,0],
                            explosive3:[0,0],
                        },
                        mines:{
                            mine1:0,
                            mine2:0,
                            mine3:0,
                        },
                        kit:{
                            bArmor:tComponents.vests.v_6B45L_W,
                            nods:0,
                            earPro:tComponents.headSets.hs_GSSH01,
                            squadComms:tComponents.pRadios.pr_R187P1E,
                            radio:0,
                            uniform:tComponents.uniforms.u_6SH122_Ratnik,
                            IFAK:tComponents.iFAKs.iFAK_Generic_1,
                            canteen:tComponents.canteens.USSR_Canteen,           
                            helmet:tComponents.helmets.h_6B47_W,
                            backpack:tComponents.backpacks.ap_6SH117_W,
                            tent:0,       
                            sleepingBag:tComponents.sleepingBags.sb_Ratnik_W,
                            supplies:{
                                ration1:[tComponents.supplies.rations.r_2020_IRP,3],
                                ration2:[0,0],
                                ration3:[0,0],
                                waterContainer1:[0,0],
                                waterContainer2:[0,0],
                            }    
                        },
                        buffs:{
                            rMealBuff:1,
                            rWaterBuff:1,
                            rHotMealBuff:1,
                            rHotShowerBuff:1,
                            rReserveTimeBuff:1,
                        },
                        status:{
                            currentActivity:4,
                            activityLevel:2,    
                            inVehicle:0,
                            inCombatType:0,
                            stress:1,
                            totalKitWeight:0,
                            effectivness:1,
                            calorieBalance:0,
                            waterBalance:0,
                            morale:1,
                            fatigue:0,
                            willToFight:{
                                totalWillToFight:0,
                                capabilities:{
                                    competence:[
                                        5,//sustainability
                                        5,//sufficiency
                                        5,//skills
                                        5//relevance
                                    ],
                                    quality:[
                                        5,//adaptability
                                        5,//education
                                        5,//fitness
                                        5,//psych traits
                                        5,//resilience
                                        5,//social skills
                                    ],
                                },
                                motivations:{
                                    desperation:5,
                                    revenge:5,
                                    ideology:5,
                                    identity:[
                                        5,//organization
                                        5,//personal
                                        5,//unit
                                        5,//state
                                        5,//social
                                        5//society
                                    ]
                                }
                            },
                            hActiveSinceLRest:[
                                0,//basic metabolic rate
                                0,//sedentary, little to no exercise
                                0,//light activity
                                0,//moderate activity
                                0,//active,
                                0,//very active
                                0,//extremely active 
                            ],
                            hoursCombatExperience:0,
                            hoursJobExperience:0,
                            leadership:{//factors considered if they are in a squad leadership position
                                leadershipLevel:0,
                                hasBeenInit:0,
                                attributes:{
                                    character:[
                                        5,//morality
                                        5,//empathy
                                        5,//warrior ethos
                                        5//discipline
                                    ],
                                    presence:[
                                        5,//military and professional bearing
                                        5,//fitness
                                        5,//confidence
                                        5//resilience
                                    ],
                                    intellect:[
                                        5, //mental agility
                                        5,//sound judgement
                                        5,//innovation
                                        5,//interpersonal tact
                                        5//expertise
                                    ]
    
                                },
                                competencies:{
                                    leads:[
                                        5,
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    develops:[
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    achieves:15
                                }
    
                            },
                            points:{//different point values contributed to the total lethality of the squad
                                AP:0,//anti-personnel
                                AV:0,//anti-vehicle
                                AA:0,//anti-air
                            },
                            specialty:"11B",
                            hostSqID:[0,0],
                        },
                    },
                    inf_11BC_RPK74M:{
                        name:0,
                        ID:[2,0,0],//country, branch, rank index. This reads as Abkhazia, Ground Forces, rifleman/crewman/basic soldier. Used in random name generation amongst possibly other things.
                        primary:{//primary weapon, must be a firearm
                            name:tComponents.weapons.firearms.saw_RPK74M,
                            optic:tComponents.optics.ako_1P78,
                            suppressor:0,
                            mag:gComponents.mags.m_RPK74M_45,
                            ammunition:[gComponents.calibers.c545x39,180],
                            uBGL:0,
                            uBGLAmmunition:[0,0],
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        secondary:{//secondary weapon, must be a firearm
                            name:0,
                            optic:0,
                            suppressor:0,
                            mag:0,
                            ammunition:[0,0],
                            uBGL:0,
                            uBGLAmmunition:0,
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        special:{//special weapon, a standalone rocket launcher
                            name:0,
                            optic:0,
                            gripMod:0,
                            weight:0,
                            GPRound:[0,0],
                            APRound:[0,0],
                            HeavyRound:[0,0],
                            SmokeRound:[0,0],
                        },
                        explosives:{
                            explosive1:[tComponents.weapons.fGren.G_RGD5,1],//name of explosive, quantity of explosive
                            explosive2:[0,0],
                            explosive3:[0,0],
                        },
                        mines:{
                            mine1:0,
                            mine2:0,
                            mine3:0,
                        },
                        kit:{
                            bArmor:tComponents.vests.v_6B45M_W,
                            nods:0,
                            earPro:tComponents.headSets.hs_GSSH01,
                            squadComms:tComponents.pRadios.pr_R187P1E,
                            radio:0,
                            uniform:tComponents.uniforms.u_6SH122_Ratnik,
                            IFAK:tComponents.iFAKs.iFAK_Generic_1,
                            canteen:tComponents.canteens.USSR_Canteen,           
                            helmet:tComponents.helmets.h_6B47_W,
                            backpack:tComponents.backpacks.ap_6SH117_W,
                            tent:0,       
                            sleepingBag:tComponents.sleepingBags.sb_Ratnik_W,
                            supplies:{
                                ration1:[tComponents.supplies.rations.r_2020_IRP,3],
                                ration2:[0,0],
                                ration3:[0,0],
                                waterContainer1:[0,0],
                                waterContainer2:[0,0],
                            }    
                        },
                        buffs:{
                            rMealBuff:1,
                            rWaterBuff:1,
                            rHotMealBuff:1,
                            rHotShowerBuff:1,
                            rReserveTimeBuff:1,
                        },
                        status:{
                            currentActivity:4,
                            activityLevel:2,    
                            inVehicle:0,
                            inCombatType:0,
                            stress:1,
                            totalKitWeight:0,
                            effectivness:1,
                            calorieBalance:0,
                            waterBalance:0,
                            morale:1,
                            fatigue:0,
                            willToFight:{
                                totalWillToFight:0,
                                capabilities:{
                                    competence:[
                                        5,//sustainability
                                        5,//sufficiency
                                        5,//skills
                                        5//relevance
                                    ],
                                    quality:[
                                        5,//adaptability
                                        5,//education
                                        5,//fitness
                                        5,//psych traits
                                        5,//resilience
                                        5,//social skills
                                    ],
                                },
                                motivations:{
                                    desperation:5,
                                    revenge:5,
                                    ideology:5,
                                    identity:[
                                        5,//organization
                                        5,//personal
                                        5,//unit
                                        5,//state
                                        5,//social
                                        5//society
                                    ]
                                }
                            },
                            hActiveSinceLRest:[
                                0,//basic metabolic rate
                                0,//sedentary, little to no exercise
                                0,//light activity
                                0,//moderate activity
                                0,//active,
                                0,//very active
                                0,//extremely active 
                            ],
                            hoursCombatExperience:0,
                            hoursJobExperience:0,
                            leadership:{//factors considered if they are in a squad leadership position
                                leadershipLevel:0,
                                hasBeenInit:0,
                                attributes:{
                                    character:[
                                        5,//morality
                                        5,//empathy
                                        5,//warrior ethos
                                        5//discipline
                                    ],
                                    presence:[
                                        5,//military and professional bearing
                                        5,//fitness
                                        5,//confidence
                                        5//resilience
                                    ],
                                    intellect:[
                                        5, //mental agility
                                        5,//sound judgement
                                        5,//innovation
                                        5,//interpersonal tact
                                        5//expertise
                                    ]
    
                                },
                                competencies:{
                                    leads:[
                                        5,
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    develops:[
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                }
    
                            },
                            points:{//different point values contributed to the total lethality of the squad
                                AP:0,//anti-personnel
                                AV:0,//anti-vehicle
                                AA:0,//anti-air
                            },
                            specialty:"11BC",
                            hostSqID:[0,0],
                        },
                    },
                    inf_11B_FTL:{
                        name:0,
                        ID:[2,0,1],//country, branch, rank index. This reads as Abkhazia, Ground Forces, rifleman/crewman/basic soldier. Used in random name generation amongst possibly other things.
                        primary:{//primary weapon, must be a firearm
                            name:tComponents.weapons.firearms.ar_AK74M,
                            optic:tComponents.optics.ako_1P78,
                            suppressor:0,
                            mag:gComponents.mags.m_AK74M_30,
                            ammunition:[gComponents.calibers.c545x39,210],
                            uBGL:0,
                            uBGLAmmunition:[0,0],
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        secondary:{//secondary weapon, must be a firearm
                            name:0,
                            optic:0,
                            suppressor:0,
                            mag:0,
                            ammunition:[0,0],
                            uBGL:0,
                            uBGLAmmunition:0,
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        special:{//special weapon, a standalone rocket launcher
                            name:0,
                            optic:0,
                            gripMod:0,
                            weight:0,
                            GPRound:[0,0],
                            APRound:[0,0],
                            HeavyRound:[0,0],
                            SmokeRound:[0,0],
                        },
                        explosives:{
                            explosive1:[tComponents.weapons.fGren.G_RGD5,2],//name of explosive, quantity of explosive
                            explosive2:[0,0],
                            explosive3:[0,0],
                        },
                        mines:{
                            mine1:0,
                            mine2:0,
                            mine3:0,
                        },
                        kit:{
                            bArmor:tComponents.vests.v_6B45M_W,
                            nods:0,
                            earPro:tComponents.headSets.hs_GSSH01,
                            squadComms:tComponents.pRadios.pr_R187P1E,
                            radio:0,
                            uniform:tComponents.uniforms.u_6SH122_Ratnik,
                            IFAK:tComponents.iFAKs.iFAK_Generic_1,
                            canteen:tComponents.canteens.USSR_Canteen,           
                            helmet:tComponents.helmets.h_6B47_W,
                            backpack:tComponents.backpacks.ap_6SH117_W,
                            tent:0,       
                            sleepingBag:tComponents.sleepingBags.sb_Ratnik_W,
                            supplies:{
                                ration1:[tComponents.supplies.rations.r_2020_IRP,3],
                                ration2:[0,0],
                                ration3:[0,0],
                                waterContainer1:[0,0],
                                waterContainer2:[0,0],
                            }    
                        },
                        buffs:{
                            rMealBuff:1,
                            rWaterBuff:1,
                            rHotMealBuff:1,
                            rHotShowerBuff:1,
                            rReserveTimeBuff:1,
                        },
                        status:{
                            currentActivity:4,
                            activityLevel:2,    
                            inVehicle:0,
                            inCombatType:0,
                            stress:1,
                            totalKitWeight:0,
                            effectivness:1,
                            calorieBalance:0,
                            waterBalance:0,
                            morale:1,
                            fatigue:0,
                            willToFight:{
                                totalWillToFight:0,
                                capabilities:{
                                    competence:[
                                        5,//sustainability
                                        5,//sufficiency
                                        5,//skills
                                        5//relevance
                                    ],
                                    quality:[
                                        5,//adaptability
                                        5,//education
                                        5,//fitness
                                        5,//psych traits
                                        5,//resilience
                                        5,//social skills
                                    ],
                                },
                                motivations:{
                                    desperation:5,
                                    revenge:5,
                                    ideology:5,
                                    identity:[
                                        5,//organization
                                        5,//personal
                                        5,//unit
                                        5,//state
                                        5,//social
                                        5//society
                                    ]
                                }
                            },
                            hActiveSinceLRest:[
                                0,//basic metabolic rate
                                0,//sedentary, little to no exercise
                                0,//light activity
                                0,//moderate activity
                                0,//active,
                                0,//very active
                                0,//extremely active 
                            ],
                            hoursCombatExperience:0,
                            hoursJobExperience:0,
                            leadership:{//factors considered if they are in a squad leadership position
                                hasBeenInit:0,
                                leadershipLevel:0,
                                attributes:{
                                    character:[
                                        5,//morality
                                        5,//empathy
                                        5,//warrior ethos
                                        5//discipline
                                    ],
                                    presence:[
                                        5,//military and professional bearing
                                        5,//fitness
                                        5,//confidence
                                        5//resilience
                                    ],
                                    intellect:[
                                        5, //mental agility
                                        5,//sound judgement
                                        5,//innovation
                                        5,//interpersonal tact
                                        5//expertise
                                    ]
    
                                },
                                competencies:{
                                    leads:[
                                        5,
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    develops:[
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                }
    
                            },
                            points:{//different point values contributed to the total lethality of the squad
                                AP:0,//anti-personnel
                                AV:0,//anti-vehicle
                                AA:0,//anti-air
                            },
                            specialty:"11B",
                            hostSqID:[0,0],
                        },
                    },
                    inf_11Z_Base:{
                        name:0,
                        ID:[2,0,2],//country, branch, rank index. This reads as Abkhazia, Ground Forces, rifleman/crewman/basic soldier. Used in random name generation amongst possibly other things.
                        primary:{//primary weapon, must be a firearm
                            name:tComponents.weapons.firearms.ar_AK74M,
                            optic:tComponents.optics.ako_1P78,
                            suppressor:0,
                            mag:gComponents.mags.m_AK74M_30,
                            ammunition:[gComponents.calibers.c545x39,210],
                            uBGL:0,
                            uBGLAmmunition:[0,0],
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        secondary:{//secondary weapon, must be a firearm
                            name:0,
                            optic:0,
                            suppressor:0,
                            mag:0,
                            ammunition:[0,0],
                            uBGL:0,
                            uBGLAmmunition:0,
                            railAccessory:0,
                            gripMod:0,
                            weight:0,
                        },
                        special:{//special weapon, a standalone rocket launcher
                            name:0,
                            optic:0,
                            gripMod:0,
                            weight:0,
                            GPRound:[0,0],
                            APRound:[0,0],
                            HeavyRound:[0,0],
                            SmokeRound:[0,0],
                        },
                        explosives:{
                            explosive1:[tComponents.weapons.fGren.G_RGD5,2],//name of explosive, quantity of explosive
                            explosive2:[0,0],
                            explosive3:[0,0],
                        },
                        mines:{
                            mine1:0,
                            mine2:0,
                            mine3:0,
                        },
                        kit:{
                            bArmor:tComponents.vests.v_6B45M_W,
                            nods:0,
                            earPro:tComponents.headSets.hs_GSSH01,
                            squadComms:tComponents.pRadios.pr_R187P1E,
                            radio:0,
                            uniform:tComponents.uniforms.u_6SH122_Ratnik,
                            IFAK:tComponents.iFAKs.iFAK_Generic_1,
                            canteen:tComponents.canteens.USSR_Canteen,           
                            helmet:tComponents.helmets.h_6B47_W,
                            backpack:tComponents.backpacks.ap_6SH117_W,
                            tent:0,       
                            sleepingBag:tComponents.sleepingBags.sb_Ratnik_W,
                            supplies:{
                                ration1:[tComponents.supplies.rations.r_2020_IRP,3],
                                ration2:[0,0],
                                ration3:[0,0],
                                waterContainer1:[0,0],
                                waterContainer2:[0,0],
                            }    
                        },
                        buffs:{
                            rMealBuff:1,
                            rWaterBuff:1,
                            rHotMealBuff:1,
                            rHotShowerBuff:1,
                            rReserveTimeBuff:1,
                        },
                        status:{
                            currentActivity:4,
                            activityLevel:2,    
                            inVehicle:0,
                            inCombatType:0,
                            stress:1,
                            totalKitWeight:0,
                            effectivness:1,
                            calorieBalance:0,
                            waterBalance:0,
                            morale:1,
                            fatigue:0,
                            willToFight:{
                                totalWillToFight:0,
                                capabilities:{
                                    competence:[
                                        5,//sustainability
                                        5,//sufficiency
                                        5,//skills
                                        5//relevance
                                    ],
                                    quality:[
                                        5,//adaptability
                                        5,//education
                                        5,//fitness
                                        5,//psych traits
                                        5,//resilience
                                        5,//social skills
                                    ],
                                },
                                motivations:{
                                    desperation:5,
                                    revenge:5,
                                    ideology:5,
                                    identity:[
                                        5,//organization
                                        5,//personal
                                        5,//unit
                                        5,//state
                                        5,//social
                                        5//society
                                    ]
                                }
                            },
                            hActiveSinceLRest:[
                                0,//basic metabolic rate
                                0,//sedentary, little to no exercise
                                0,//light activity
                                0,//moderate activity
                                0,//active,
                                0,//very active
                                0,//extremely active 
                            ],
                            hoursCombatExperience:0,
                            hoursJobExperience:0,
                            leadership:{//factors considered if they are in a squad leadership position
                                leadershipLevel:0,
                                hasBeenInit:0,
                                attributes:{
                                    character:[
                                        5,//morality
                                        5,//empathy
                                        5,//warrior ethos
                                        5//discipline
                                    ],
                                    presence:[
                                        5,//military and professional bearing
                                        5,//fitness
                                        5,//confidence
                                        5//resilience
                                    ],
                                    intellect:[
                                        5, //mental agility
                                        5,//sound judgement
                                        5,//innovation
                                        5,//interpersonal tact
                                        5//expertise
                                    ]
    
                                },
                                competencies:{
                                    leads:[
                                        5,
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    develops:[
                                        5,
                                        5,
                                        5,
                                        5
                                    ],
                                    achieves:15
                                }
    
                            },
                            points:{//different point values contributed to the total lethality of the squad
                                AP:0,//anti-personnel
                                AV:0,//anti-vehicle
                                AA:0,//anti-air
                            },
                            specialty:"11B",
                            hostSqID:[0,0],
                        },
                    },
                },
                support:{

                },
                crew:{
                }
            },
            airForce:{

            },
            navy:{

            },
            marines:{
                
            }
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

    INFANTRY
    11A: Infantry Officer
    11B: Infantryman
    11BA: Rifleman (added for sim purposes)
    11BB: Grenadier (added for sim purposes)
    11BC: LMG (added for sim purposes)
    11BD: Marksman (added for sim purposes)
    11BE: Anti-tank specialist (added for sim purposes)
    11C: Mines, Nav, Comms, supervisor or member of mortar squad, section or plt
    11D: Recon specialist
    11DA: Recon Rifleman (A)
    11DB: Recon Grenadier (A)
    11DC: Recon LMG (A)
    11DD: Recon Marksman (A)
    11M: Fighting vehicle infantryman
    11Z: Infantry senior sergeant
    12A: Combat engineer squad leader, armorr leadership
    12B: Sapper
    18A: special forces officer
    18B: SF heavy weapons/ CE
    18C: SF CE
    18D: SF Medic
    18E: SFComms
    18F: SF Intel and Ops
    18Z: SF SL
    31A: MP officer
    31B: MP
    1Z151: Pararescue
    1Z2X1: Combat control
    1Z351: TACP
    1Z451: Special recon

    ARMOR
    11E: Armor crewman
    19A: Armor general
    19B: Armor
    19C: Cavalry officer
    19D: Cav scout, operates and maintains scout vehicles
    19DA: Cav scout rifleman (added for sim)
    19DB: Cav scout grenadier (added for sim)
    19DC: Cav Scout LMG (added)
    19DD: Cav Scout Marksman (added)
    19G: Recon vehicle crewman
    19H: Recon vehicle driver
    19J: M48-M60 crewman
    19F: Tank driver
    19K: Armor crewman, M1
    19Z: Armor SL
    45K: Tank turret repairman
    45P: Light tank turret repair
    45T: IFV turret repair
    91A: Tank repair
    91H: Tracked vehicle repair
    91M: IFV repair
    91S: APC repair
    91K: Armament repair
    63A: M1 Abrams tank system maintainer
    63C: Army track vehicle mechanic
    63E: MBT recovery and maint
    63N: Supe and maintainer of M60A1/A3 tanks
    63M: BFV system maintainer
    63T: General IFV repair


    CONSTRUCTION/COMBAT ENGINEERING 
    12C: Bridge builder, leader or staff of army recon unit
    12D: Diver
    12H: Construction engineering supervisor
    12M: Firefighter
    12N: Horiz construction engineer, most prominently a roadbuilder
    12P: Power plant engineer
    12Q: Power line distribution specialist
    12T: Surveyor and mapmaker
    12W: Carpentry and masonry
    12Y: Geospatial engineer (map analyst, intel)
    12Z: CE SL
    51B: Carpenter
    51D: Mason
    51K: Plumber
    51R: Electrician
    91W: Metal worker
    52C: Power pack specialist
    57G: ditch digger, minor road repair, loading/unloading equipment, policing buildings and area
    91C: Utility equipment repair
    91D: Generator type equipment repair
    91E: Trades specialist
    91L: Construction equip repair


    ARTILLERY
    13A: Field Artillery General
    13B: Cannon crewmember
    13D: Field Artillery Automated Tactical Data System Specialist
    13F: Fire Support Specialist, analyzes and process target data
    13M: MRL crewmember
    13P: MRL FDC man
    13R: Arty counterbattery radar operator
    13T: Field artillery surveyor/meteorological crewmember
    13Y: Field Artillery Senior Sergeant
    13Z: Field artillery SL
    17C: FIeld artillery target aquisition specialist
    45D: SPG repair
    45G: FCG repair
    91P: Arty repair
    94P: MLRS repair
    63D: Field recovery and repair of cannon artillery

    AIR DEFENSE
    14A: Air Defense Artillery Officer
    14B: Shorad specialist, either commander or member
    14D: Hawk Missile System Specialist
    16D: Hawk missile crewmember
    16E: Hawk fire control crewmember
    16F: Light ADA crewmember
    16S: MANPADS operator
    14E: Fire Control Operator for SAM
    14G: Plans and manages air defense ops
    14H: EWR operator
    14J: EWR operator/maintainer
    14S: SAM crewmember
    14T: TEL operator
    14Z: SAM SL
    22K: Hawk missile and launcher repairer
    23R: Hawk missile system mechanic
    23S: Hawk pulse radar repairer
    23T: Hawk continuous wave radar repairer
    24H: Hawk fire control repairer
    27P: SPAAG radar repair
    27T: Avenger system repairer
    27X: Patrior system repairer
    290A: EW tech
    29A: EW officer
    29E: EW specialist
    29E: EW specialist
    94S: Heavy SAM repair
    94T: Light SAM repair

    AVIATION
    15a: Aviation General
    15B: Aircraft powerplant repair
    15D: A/C Powertrain repair
    15F: A/C electrician
    15G: A/C structural repair
    15H: A/C pneudralics repairer
    15H: A/C pneumatics/hydraulics repair
    15P: Planner for non-combat airborne ops
    15Q: ATC
    15R: Apache or equivalent repair
    15S: Kiowa repair
    15T: UH-60 repair
    15U: CH-47 repair
    67Y: AH-1 repairer
    15W: UAV operator
    15Z: Av Maint SL
    45J: Aircraft armament repair
    45L: Artillery repair
    45M: Aircraft armament subsystem repair
    152B: Kiowa scout
    152D: Kiowa pilot (general scout pilot)
    152D: OH-6 pilot (general light heli pilot)
    152F: Apache or comparable pilot
    152G: Apache or comparable flight assistant/planner
    153A: Rotary wing pilot, unspecific
    153B: UH1 or comparable pilot
    153D: UH60 or comparable pilot
    153E: MH60 or comparable pilot
    154C: CH-47D pilot
    154E: MH-47 pilot
    154F: CH-47F pilot
    155E: C-12 pilot
    11BX: Bomber pilot
    11FX: Fighter pilot
    11GX: Generalist pilot
    11HX: Rescue pilot
    11KX: Trainer pilot
    11MX: Mobility pilot
    12UX: RPA pilot
    13BX: Air Battle Manager
    13MX: Airfield ops
    1C751: Airfield management
    1C853: Radar, airfield and weather
    1C051: Airfield management
    1C052: Aviation resource management
    1C151: ATC
    94D: ATC repair
    1A151: Flight engineer 
    1A241: Loadmaster

    LOGISTICS
    88H: Management and inventory of supply
    88M: Truck driver and manager
    88N: Logistics coordinator
    88P: Railway equipment repair
    88T: Road and trail repair
    88U: Train guy
    88Z: Transportation leader and coordinator
    55Z: Supervise and carry out ammunition packaging and rigging loads
    57H: Cargo unloader, both simple and with equipment
    92A: Warehouse inventory management
    92F: Fuel supply specialist
    92W: Water specialist
    92Y: Supply coordinator
    92Z: Supply boss
    64C: Motor transport operator
    90A: Logistics officer

    REPAIR
    91B: Wheeled vehicle repair
    63B: wheeled vehicle recovery and repair
    63W: Onsite repair
    91B: Supe and maint/recovery of wheeled vehicles, officer

    SUPPORT
    45B: Small arms repairer
    51F: Pipeline specialist
    51N: Water supply specialist
    55A: Munitions handler apprentice
    55B: Munitions handler for conventional, guided missile, large rockets and other munitions
    55X: Munitions inspector
    56M: Chaplain
    89A: Ammo stock control and accounting
    89B: Ammo management, prep, storage
    89D: EOD
    91A: Munitions officer
    91F: Small arms and artillery repair
    42A: HR
    57E: Laundry, shower and delousing equipment
    92G: Cook
    92M: Dead people handler
    92R: Para rigger
    92S: Sewer and clothes washer


    MEDICAL
    60A: Army operational medicine supervisor
    62A: Army ER doc
    62B: Battlefield doc
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



    C2/COMMS
    140A: C2 systems operator
    05B: Tactical level radio operator
    05E: FM radio comms specialist
    25B: General IT specialist
    25C: Radio operator/maintainer
    25Q: Radio operator, maintainer, setterupper,etc.
    25S: Satcom specialist
    25U: comms specialist/commint
    25X: Chief signal NCO
    25Z: Visual Information Ops Chief
    59A: Army strategic policy and planning officer
    14FX: Information ops
    14NX: Intel
    15AX: Op Research
    15WX: Weather officer
    1C351: C2 ops
    1C551: C2 BM
    1N851: Targeting analyst


    INTEL
    35F: Intel analyst
    35G: Imagry analyst
    35L: Counterintelligence
    35M: HUMINT
    35N: SIGINT
    35F: Special electronics devices repairer
    35P: Crypto linguist
    35Q: Cyberwarfare
    35S: SIGINT collector
    35T: intel system maintainer
    35V: SIGINT PL
    35X: Intel SL
    35Y: Counterintelligence, HUMINT SL
    35Z: SIGINT PL














































 










    91G: Fire controlrepair

    91J: QM and Chem equip rpr





    91X: Maint supervisor
    91Z: Maint PL






    94A: ATGM repair

    94E: comms repair
    94L: Avionics comms repair
    94M: Radar repair


    94X: Senior SAM maintanier
    94Z: Electronic maint boss


    AFSCS
















    */
];
const testGComponents={

};
const testComponents={
    tComponents:{
        weapons:{
            assaultRifles:{
            },
            dMR:{
            },
            uBGL:{

            },
            RL:{
                FGM148:{
                    name:"FGM-148 Javelin heavy antitank guided missile launcher",
                    disc:"reloadable top-attack advanced ATGML",
                    isSingleShot:0,
                    weight:0,
                },
                RL_RPG7V2:{
                    name:"RPG-7V2",
                    disc:"extremely prolific russian rocket-propelled grenade launcher",
                    isSingleShot:0,
                    weight:13.9,
                },
    
                // MAN PORTABLE SURFACE TO AIR MISSILES
                RL_FIM92J:{
                    name:"FIM-92J Stinger RMP Block I+",
                    disc:"Standard US IR MANPAD with EOL upgrade",
                    isSingleShot:0,
                    guidance:3,//method of target tracking. 0 is manual, 1 is predicted impact point, 2 is wire guided, 3 is smart. 
                    useCase:[0,0,0,0,0,1,1,1],//static light positions, bunkers, unarmored vehicles, light vehicles, heavy vehicles, drones, helicopters, combat aircraft
                    aquisition:2,//naked eye, heat seeking, other (in this case it has UV and IR which makes it very effective against countermeasures)
                    weight:10,//lbs
                    warheadWeight:2.25,
                    roundWeight:24,
                    pen:150,//mm rha    
                    eRange:4250//yards
                },
                RL_SA18:{
                    name:"SA-18 Igla",
                    disc:"1983 variant of the SA-16 Gimlet short range MANPAD",
                    isSingleShot:1,
                    guidance:3,//method of target tracking. 0 is manual, 1 is predicted impact point, 2 is wire guided, 3 is smart. 
                    useCase:[0,0,0,0,0,1,1,1],//static light positions, bunkers, unarmored vehicles, light vehicles, heavy vehicles, drones, helicopters, combat aircraft
                    aquisition:2,//naked eye, heat seeking, other (in this case it has UV and IR which makes it very effective against countermeasures)
                    weight:39.46,//lbs
                    warheadWeight:3.74,
                    roundWeight:0,
                    pen:150,//mm rha    
                    eRange:5650//yards
                },
    
    
            },
        },
        optics:{
        },
        foreGrips:{
        },
        suppressors:{
        },
        supplies:{
        }
    },
}
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
        personnel:{
            inf_11Z_SL:{
                name:0,
                ID:[0,0,2],//country, branch, rank index. This reads as Abkhazia, Ground Forces, rifleman/crewman/basic soldier. Used in random name generation amongst possibly other things.
                primary:{//primary weapon, must be a firearm
                    name:tComponents.weapons.firearms.ar_M4A1,//the weapon object
                    optic:tComponents.optics.po_TA11RCO_ACOG,//optic, suppressor,rail accessory, gripMod and uBGL are all attachments that will impact the capability of the firearm.
                    suppressor:0,
                    mag:gComponents.mags.m_USGI30AR,//mag and ammunition are primarily there to calculate weight addition
                    ammunition:[gComponents.calibers.c556x45,210],
                    uBGL:0,
                    uBGLAmmunition:[0,0],
                    railAccessory:tComponents.railAccessories.ra_ANPEQ16,
                    gripMod:tComponents.foreGrips.p_fgbp_GPS02,
                    weight:0,//weight of the firearm with a loaded mag, all of it's attachments, a loaded uBGL if applicable, and correct for it's ammunition. Gets added into the total kit weight of the soldier
                },
                secondary:{//secondary weapon, must be a firearm
                    name:0,
                    optic:0,
                    suppressor:0,
                    mag:0,
                    ammunition:[0,0],
                    uBGL:0,
                    uBGLAmmunition:0,
                    railAccessory:0,
                    gripMod:0,
                    weight:0,
                },
                special:{//special weapon, a standalone rocket launcher
                    name:0,
                    optic:0,
                    gripMod:0,
                    weight:0,
                    GPRound:[0,0],//the different rounds used for various purposes. 
                    APRound:[0,0],
                    HeavyRound:[0,0],
                    SmokeRound:[0,0],
                },
                explosives:{
                    explosive1:[tComponents.weapons.fGren.G_M67,1],//name of explosive, quantity of explosive
                    explosive2:[0,0],
                    explosive3:[0,0],
                },
                mines:{
                    mine1:0,
                    mine2:0,
                    mine3:0,
                },
                kit:{
                    bArmor:tComponents.vests.v_MSV,
                    nods:0,
                    earPro:tComponents.headSets.hs_ComTacIII,
                    squadComms:tComponents.pRadios.pr_MR3000P,
                    radio:0,
                    uniform:tComponents.uniforms.u_ACU_OCP, 
                    IFAK:tComponents.iFAKs.iFAK_II,
                    canteen:tComponents.canteens.GI_MOLLE,           
                    helmet:tComponents.helmets.h_ECH_W,
                    backpack:tComponents.backpacks.ap_MOLLE2_W,
                    tent:0,       
                    sleepingBag:tComponents.sleepingBags.sb_MSS_W,
                    supplies:{
                        ration1:[tComponents.supplies.rations.r_2020_ChiliMac_MRE,4],
                        ration2:[0,0],
                        ration3:[0,0],
                        waterContainer1:[0,0],
                        waterContainer2:[0,0],
                    }    
                },
                buffs:{
                    rMealBuff:1,//various factors that can improve or hurt morale depending on their presence or lack therof.
                    rWaterBuff:1,
                    rHotMealBuff:1,
                    rHotShowerBuff:1,
                    rReserveTimeBuff:1,
                },
                status:{
                    currentActivity:4,//0 is in active combat, 1 is standing guard, 2 is patrol, 3 is relaxing (downtime in general;could be eating, sleeping, doing weapon maintenance, etc.), 4 is in reserve 
                    activityLevel:2,//various intensities of activity. These include, in order, BMR, sedentary, light, moderate, active, very active, extremely active.     
                    inVehicle:0,//in vehicle yes/no.
                    inCombatType:0,//various combat types, refer to cfg.multipliers.personnel.experience.hCEPHVariousCombatModes for the detailed list. These can determine experience gain, among other things
                    stress:1,
                    totalKitWeight:0,//every item they have logged on them.
                    effectivness:1,
                    calorieBalance:0,//like a bank balance the calorie balance determines whether the soldier has a surplus or a deficit of calories.
                    waterBalance:0,//same as above.
                    morale:1,
                    fatigue:0,//fatigue of the soldier
                    willToFight:{
                        totalWillToFight:0,
                        capabilities:{
                            competence:[
                                5,//sustainability
                                5,//sufficiency
                                5,//skills
                                5//relevance
                            ],
                            quality:[
                                5,//adaptability
                                5,//education
                                5,//fitness
                                5,//psych traits
                                5,//resilience
                                5,//social skills
                            ],
                        },
                        motivations:{
                            desperation:5,
                            revenge:5,
                            ideology:5,
                            identity:[
                                5,//organization
                                5,//personal
                                5,//unit
                                5,//state
                                5,//social
                                5//society
                            ]
                        }
                    },
                    hActiveSinceLRest:[
                        0,//basic metabolic rate
                        0,//sedentary, little to no exercise
                        0,//light activity
                        0,//moderate activity
                        0,//active,
                        0,//very active
                        0,//extremely active 
                    ],
                    hoursCombatExperience:0,
                    hoursJobExperience:0,
                    leadership:{//factors considered if they are in a squad leadership position
                        hasBeenInit:0,
                        attributes:{
                            character:[
                                5,//morality
                                5,//empathy
                                5,//warrior ethos
                                5//discipline
                            ],
                            presence:[
                                5.5,  //military and professional bearing
                                8,    //fitness
                                6,    //confidence
                                6     //resilience
                            ],
                            intellect:[
                                5.25,//mental agility
                                5,   //sound judgement
                                5,   //innovation
                                5,   //interpersonal tact
                                2.5  //expertise
                            ]

                        },
                        competencies:{
                            leads:[
                                5,  //leads others
                                5,  //builds trust
                                5,  //extends influence beyond chain of command
                                5,  //leads by example
                                5   //communications skills
                            ],
                            develops:[
                                5, //creates positive environment
                                5, //prepares self
                                5, //develops others
                                5  //stewards profession
                            ],
                            achieves:15
                        }

                    },
                    points:{//different point values contributed to the total lethality of the squad
                        AP:0,//anti-personnel
                        AV:0,//anti-vehicle
                        AA:0,//anti-air
                    },
                    specialty:"11Z",
                    hostSqID:[0,0],//old ID, new ID. Used to keep track of how long they have been with their unit.
                },
            },
        },
    },

};
const testUnits={
    blueCo:{
        name:"1st company, 2nd battalion, 504th infantry regiment, 1st Infantry BCT, 82nd Airborne Divison, US Army",
        platoon1:{
            name:"1st Platoon",
            squad1:{
                name:"1st squad",
                ID:0,
                members:[
                    [structuredClone(components.personnel.US.army.infantry.inf_11Z_SL),0,0,0],//leadership
                    [structuredClone(components.personnel.US.army.infantry.inf_11B_FTL),structuredClone(components.personnel.US.army.infantry.inf_11B_FTL),0,0],//senior rifleman/ftl/asl
                    [structuredClone(components.personnel.US.army.infantry.inf_11B_Gren),structuredClone(components.personnel.US.army.infantry.inf_11B_Gren),0,0],//grenadier/engineer/heavy weapons
                    [structuredClone(components.personnel.US.army.infantry.inf_11BC_M249),structuredClone(components.personnel.US.army.infantry.inf_11BC_M249),0,0],//machine gunner
                    [0,0,0,0],//assistant machine gunner/assistant grenadier/ammunition carrier
                    [structuredClone(components.personnel.US.army.infantry.inf_11B_LAT),structuredClone(components.personnel.US.army.infantry.inf_11B_LAT),0,0],//rifleman
                    [0,0,0,0],//sniper
                    [0,0,0,0],//MANPADS
                    [0,0,0,0],//Staff person
                    [0,0,0,0],//Officer
                    //omitting crew, they will be their own thing
                ],
                points:{
                    AP:0,
                    AV:0,
                    AA:0
                },
                supply:{
                    neededSupplies:[
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                    ],
                    
                }
            },
        },
    },  
    redCo:{
        name:"12th Motorized Infantry Company",
        platoon1:{
            name:"1st Platoon",
            squad1:{
                name:"1st squad",
                members:[
                    [structuredClone(components.personnel.Abkhazia.army.infantry.inf_11Z_Base),0,0,0],//leadership
                    [structuredClone(components.personnel.Abkhazia.army.infantry.inf_11B_FTL),structuredClone(components.personnel.Abkhazia.army.infantry.inf_11B_FTL),0,0],//senior rifleman/ftl/asl
                    [structuredClone(components.personnel.Abkhazia.army.infantry.inf_11B_gren_RPG7),0,0,0],//grenadier/engineer/heavy weapons
                    [structuredClone(components.personnel.Abkhazia.army.infantry.inf_11BC_RPK74M),structuredClone(components.personnel.Abkhazia.army.infantry.inf_11BC_RPK74M),0,0],//machine gunner
                    [structuredClone(components.personnel.Abkhazia.army.infantry.inf_11B_grenAsst),0,0,0],//assistant machine gunner/assistant grenadier/ammunition carrier
                    [structuredClone(components.personnel.Abkhazia.army.infantry.inf_11B_base),structuredClone(components.personnel.Abkhazia.army.infantry.inf_11B_base),0,0],//rifleman
                    [0,0,0,0],//sniper
                    [0,0,0,0],//MANPADS
                    [0,0,0,0],//Staff person
                    [0,0,0,0],//Officer
                ],
                points:{
                    AP:0,
                    AV:0,
                    AA:0
                },
            },
        },
    }, 
};
export default {components,uComps,largeUComps,BTGComps,SAMSystemComps,vComponents,tComponents,MOSCodes,testItems,testGComponents,testComponents,testUnits,gComponents};