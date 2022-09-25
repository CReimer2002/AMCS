
import AMil from "./AMil.js";
import DB from "./DB.js";
import Weather from "./Weather.js";
import Theatre from "./Caucasus.js";
import cfg from "./simConfig.js";
/*TO DO
    make functions for:
        real time area occupation calculation
            real time calculation of the impact a unit has on it's surrounding area
                real time calculations of a unit's strength and how it will impact a battle
                    calculation of the individual value of each soldier based on their equipment and capabilities
                        you need to quantify the benefit each and every person brings to the fight in battle, dependent on their skills, history, leadership, equipment, experience, support, etc. Perhaps rest levels should also be accounted for. 
                accounting for the presence of supporting elements such as artillery that are not in the immediate area but still provide support
        real time modification of the occupation of a sector
        real time battle simulation
*/
const functionHelpers = {
    squadComp:[
        "T_Crewman",
        "T_SL",
        "T_Grenadier",
        "T_Asst_Grenadier",
        "T_MG",
        "T_SR_Rifleman",
        "T_Rifleman",
        "T_MANPADS",
        "T_SVD",
        "S_Staffer",
        "S_Officer"
    ],
    ammoCrates:[
        "A_545x39mm_Crate",
        "A_762x54mm_Crate",
        "A_PG7V_Rocket_Crate",
        "A_RGD5_Crate",
        "A_GP25_Crate",
        "S_IRP_RationCrate",
        "S_DrinkingWaterContainer"
    ],
    testSquadComp:[
        [
            "25"
        ]
    ]
        
};
// TEXTIFYING FUNCTIONS // 


//// BASE SUPPLY CALCULATIONS //// 

function t_BaseSupplySquad(squad,ammoIndex){
    //calculates the personnel carried, vehicle carried and combined total supply of the specified index for a specified squad. 
    let sVicType = c_squadVehicleType(squad);
    console.log(sVicType);
    function squadCompCompressor(total,squadMember,index){
        let answer = total+squad.members[index]*DB.components.personnel[squadMember][sVicType].supplies[ammoIndex];
        return answer;
    }
    let squadTotal = functionHelpers.squadComp.reduce(squadCompCompressor,0);
    let vehicleTotal = (squad).vehicle.supplies[ammoIndex]*DB.components.supplies[functionHelpers.ammoCrates[ammoIndex]].roundsInCrate;
    let completeTotal = squadTotal+vehicleTotal;
    return [
        squadTotal,
        vehicleTotal,
        completeTotal
    ]
};
function t_BSSVehicle(squad){
    return [t_BaseSupplySquad(squad,0)[1],t_BaseSupplySquad(squad,1)[1],t_BaseSupplySquad(squad,2)[1],t_BaseSupplySquad(squad,3)[1],t_BaseSupplySquad(squad,4)[1],t_BaseSupplySquad(squad,5)[1],t_BaseSupplySquad(squad,6)[1]];  
};
function t_BSSPersonnel(squad){
    return [t_BaseSupplySquad(squad,0)[0],t_BaseSupplySquad(squad,1)[0],t_BaseSupplySquad(squad,2)[0],t_BaseSupplySquad(squad,3)[0],t_BaseSupplySquad(squad,4)[0],t_BaseSupplySquad(squad,5)[0],t_BaseSupplySquad(squad,6)[0]];
};
function t_BSSTotal(squad){
    return [t_BaseSupplySquad(squad,0)[2],t_BaseSupplySquad(squad,1)[2],t_BaseSupplySquad(squad,2)[2],t_BaseSupplySquad(squad,3)[2],t_BaseSupplySquad(squad,4)[2],t_BaseSupplySquad(squad,5)[2],t_BaseSupplySquad(squad,6)[2]];
};
function c_squadDBEntry(fSquad){
    /*
    the key function to calculating a squad's SQ_ database entry. 
    Encompasses numerous functions and combines them to output every line of data needed to populate the constant.
    */
    let sVicType = c_squadVehicleType(fSquad);
    let TroopCarriedSupplies = t_BSSPersonnel(fSquad);
    let vehicleCarriedSupplies = t_BSSVehicle(fSquad);
    let supplies = t_BSSTotal(fSquad);
    let sPH = t_squadSPHAllTypes(fSquad,sVicType);
    return[
        TroopCarriedSupplies,
        vehicleCarriedSupplies,
        supplies,
        sPH
    ]

};
function u_squadDBEntry(sq){
    console.log(sq.disc);
    let sVicType=c_squadVehicleType(sq);
    sq.TroopCarriedSupplies = t_BSSPersonnel(sq);
    sq.vehicleCarriedSupplies = t_BSSVehicle(sq);
    sq.supplies = t_BSSTotal(sq);
};
function u_allUComps(){//in progress, needs further updating and sorting of components
    //General logistics vehicles//
    u_squadDBEntry(DB.uComps.squads.SQ_LOGI_U_375);
    u_squadDBEntry(DB.uComps.squads.SQ_LOGI_U_4320);
    u_squadDBEntry(DB.uComps.squads.SQ_LOGI_ATZ5);
    u_squadDBEntry(DB.uComps.squads.SQ_LOGI_ATS5);
    u_squadDBEntry(DB.uComps.squads.SQ_LOGI_K_43101);

    
    //APCs//
    u_squadDBEntry(DB.uComps.squads.SQ_BTR80Infantry);
    u_squadDBEntry(DB.uComps.squads.SQ_BTR80Recon);
    u_squadDBEntry(DB.uComps.squads.SQ_BTR82Infantry);
    u_squadDBEntry(DB.uComps.squads.SQ_BTR82InfantryCompanyC2);
    u_squadDBEntry(DB.uComps.squads.SQ_TruckInfantry);
    u_squadDBEntry(DB.uComps.squads.SQ_TruckInfantryCompanyC2);
    u_squadDBEntry(DB.uComps.squads.SQ_TruckMANPADS);
    u_squadDBEntry(DB.uComps.squads.SQ_BTR80MANPADS);
    u_squadDBEntry(DB.uComps.squads.SQ_Sniper);
    u_squadDBEntry(DB.uComps.squads.SQ_CO_HQ_BTR);

    


    //IFVs//
    u_squadDBEntry(DB.uComps.squads.SQ_BMP1Infantry);
    u_squadDBEntry(DB.uComps.squads.SQ_BMP2Infantry);
    u_squadDBEntry(DB.uComps.squads.SQ_BMP2InfantryCompanyC2);
    u_squadDBEntry(DB.uComps.squads.SQ_BTRD);
    u_squadDBEntry(DB.uComps.squads.SQ_BMP2_PlatoonHQ);
    u_squadDBEntry(DB.uComps.squads.SQ_CO_HQ_BMP);

    //Tanks//
    u_squadDBEntry(DB.uComps.squads.SQ_T72);
    u_squadDBEntry(DB.uComps.squads.SQ_T72C2);
    u_squadDBEntry(DB.uComps.squads.SQ_T72B3);
    
    //Artillery//
    u_squadDBEntry(DB.uComps.squads.SQ_2S3);
    u_squadDBEntry(DB.uComps.squads.SQ_2S3M1);
    u_squadDBEntry(DB.uComps.squads.SQ_BM21);
    u_squadDBEntry(DB.uComps.squads.SQ_BM30);


    //Artillery ammunition carriers/transloaders//
    u_squadDBEntry(DB.uComps.squads.SQ_2S3_Resupply);
    u_squadDBEntry(DB.uComps.squads.SQ_9T234_BM30_Resupplier);
    u_squadDBEntry(DB.uComps.squads.SQ_9T254_BM21_Resupplier);
    //Artillery specific command systems//

    u_squadDBEntry(DB.uComps.squads.SQ_1K123);
    u_squadDBEntry(DB.uComps.squads.SQ_C2_1V14);
    u_squadDBEntry(DB.uComps.squads.SQ_C2_1V13);
    u_squadDBEntry(DB.uComps.squads.SQ_BAT_C2_1V18);

    //Artillery specific maintenance vehicles

    //Artillery counterbattery
    u_squadDBEntry(DB.uComps.squads.SQ_CB_1L219);

    u_squadDBEntry(DB.uComps.squads.SQ_C2_1V111);

    //SAMS//
    u_squadDBEntry(DB.uComps.squads.SQ_TELAR_9A310);
    u_squadDBEntry(DB.uComps.squads.SQ_TEL_9A39);
    u_squadDBEntry(DB.uComps.squads.SQ_TELAR_9K33);
    u_squadDBEntry(DB.uComps.squads.SQ_TELAR_9K330);

    //SAM ammunition carriers/transloaders//
    u_squadDBEntry(DB.uComps.squads.SQ_9T217_SA8_Resupplier);
    u_squadDBEntry(DB.uComps.squads.SQ_9T243_SA11_Resupplier);
    u_squadDBEntry(DB.uComps.squads.SQ_9T245_SA15_RoundCarrier);
    u_squadDBEntry(DB.uComps.squads.SQ_9T244_SA15_Resupplier);

    //SAM specific command systems//
    u_squadDBEntry(DB.uComps.squads.SQ_BAT_C2_9C470M1);
    u_squadDBEntry(DB.uComps.squads.SQ_C2_PPRU1);
    u_squadDBEntry(DB.uComps.squads.SQ_C3_9S737);

    //SAM specific radar systems//
    u_squadDBEntry(DB.uComps.squads.SQ_SR_9S18M1);

    //SAM specific maintenance vehicles//
    u_squadDBEntry(DB.uComps.squads.SQ_MAINT_9V887);
    u_squadDBEntry(DB.uComps.squads.SQ_MAINT_9V881);
    u_squadDBEntry(DB.uComps.squads.SQ_MAINT_9V883M1);
    u_squadDBEntry(DB.uComps.squads.SQ_MAINT_9V884M1);
    u_squadDBEntry(DB.uComps.squads.SQ_MAINT_9V95M1);
    u_squadDBEntry(DB.uComps.squads.SQ_MAINT_9F116);
    u_squadDBEntry(DB.uComps.squads.SQ_MAINT_AG3M1);


    //Combat engineering/maintenance vehicles//
    u_squadDBEntry(DB.uComps.squads.SQ_ENG_BAT_2);
    u_squadDBEntry(DB.uComps.squads.SQ_ENG_BREM_L);
    u_squadDBEntry(DB.uComps.squads.SQ_ENG_GMZ_3);
    u_squadDBEntry(DB.uComps.squads.SQ_Eng_UR_77);
    u_squadDBEntry(DB.uComps.squads.SQ_EOV_3521);
    u_squadDBEntry(DB.uComps.squads.SQ_ENG_REM_KL);
    u_squadDBEntry(DB.uComps.squads.SQ_ENG_MTO_UB1);


    //Troop hygiene, comfort, medical vehicles//
    u_squadDBEntry(DB.uComps.squads.SQ_M_U375);
    u_squadDBEntry(DB.uComps.squads.SQ_MAINT_PAK_200_M);
    u_squadDBEntry(DB.uComps.squads.SQ_MAINT_DDU_1);
    u_squadDBEntry(DB.uComps.squads.SQ_PKPB10);

    //Non-artillery/SAM command vehicles//
    u_squadDBEntry(DB.uComps.squads.SQ_C2_R149BM4A);
    u_squadDBEntry(DB.uComps.squads.SQ_BAT_C2_R145BM1);
    u_squadDBEntry(DB.uComps.squads.SQ_C2_U375A);
    u_squadDBEntry(DB.uComps.squads.SQ_C2_R142);

    //EW/COMMS//
    u_squadDBEntry(DB.uComps.squads.SQ_EW_1L222);
    u_squadDBEntry(DB.uComps.squads.SQ_EW_R330ZH);
    u_squadDBEntry(DB.uComps.squads.SQ_EW_RP377L);
    u_squadDBEntry(DB.uComps.squads.SQ_EW_MP32M1);

}
function t_BaseSupplySquadAllTypes(squad){
    let squadVehicleType = c_squadVehicleType(squad);
    console.log("Passed first step");
    console.log(squadVehicleType);
    let squadTotal = [t_BaseSupplySquad(squad,squadVehicleType,0)[0],t_BaseSupplySquad(squad,squadVehicleType,1)[0],t_BaseSupplySquad(squad,squadVehicleType,2)[0],t_BaseSupplySquad(squad,squadVehicleType,3)[0],t_BaseSupplySquad(squad,squadVehicleType,4)[0],t_BaseSupplySquad(squad,squadVehicleType,5)[0],t_BaseSupplySquad(squad,squadVehicleType,6)[0]];
    let vehicleTotal = [t_BaseSupplySquad(squad,squadVehicleType,0)[1],t_BaseSupplySquad(squad,squadVehicleType,1)[1],t_BaseSupplySquad(squad,squadVehicleType,2)[1],t_BaseSupplySquad(squad,squadVehicleType,3)[1],t_BaseSupplySquad(squad,squadVehicleType,4)[1],t_BaseSupplySquad(squad,squadVehicleType,5)[1],t_BaseSupplySquad(squad,squadVehicleType,6)[1]];
    let completeTotal = [t_BaseSupplySquad(squad,squadVehicleType,0)[2],t_BaseSupplySquad(squad,squadVehicleType,1)[2],t_BaseSupplySquad(squad,squadVehicleType,2)[2],t_BaseSupplySquad(squad,squadVehicleType,3)[2],t_BaseSupplySquad(squad,squadVehicleType,4)[2],t_BaseSupplySquad(squad,squadVehicleType,5)[2],t_BaseSupplySquad(squad,squadVehicleType,6)[2]];
    return [
        squadTotal,
        vehicleTotal,
        completeTotal
    ];
};
function t_BaseCarriedSuppliesSquad(fVehicle,fSquad,fSquadVehicleType){
    let supplyIndex1 = t_BaseSupplySquad(fVehicle,fSquad,fSquadVehicleType,0);
    let supplyIndex2 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,1);
    let supplyIndex3 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,2);
    let supplyIndex4 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,3);
    let supplyIndex5 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,4);
    let supplyIndex6 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,5);
    let supplyIndex7 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,6);
    return  supplyIndex1[0],supplyIndex2[0],supplyIndex3[0],supplyIndex4[0],supplyIndex5[0],supplyIndex6[0],supplyIndex7[0];
};
function t_BaseVehicleCarriedSuppliesSquad(fVehicle,fSquad,fSquadVehicleType){
    let supplyIndex1 = t_BaseSupplySquad(fVehicle,fSquad,fSquadVehicleType,0);
    let supplyIndex2 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,1);
    let supplyIndex3 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,2);
    let supplyIndex4 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,3);
    let supplyIndex5 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,4);
    let supplyIndex6 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,5);
    let supplyIndex7 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,6);
    return  supplyIndex1[1],supplyIndex2[1],supplyIndex3[1],supplyIndex4[1],supplyIndex5[1],supplyIndex6[1],supplyIndex7[1];
};
function t_BaseTotalSuppliesSquad(fVehicle,fSquad,fSquadVehicleType){ 
    let supplyIndex1 = t_BaseSupplySquad(fVehicle,fSquad,fSquadVehicleType,0);
    let supplyIndex2 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,1);
    let supplyIndex3 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,2);
    let supplyIndex4 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,3);
    let supplyIndex5 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,4);
    let supplyIndex6 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,5);
    let supplyIndex7 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,6);
    return  supplyIndex1[0],supplyIndex2[0],supplyIndex3[0],supplyIndex4[0],supplyIndex5[0],supplyIndex6[0],supplyIndex7[0];
};
function t_BaseAllSuppliesSquad(fVehicle,fSquad,fSquadVehicleType){
    let supplyIndex1 = t_BaseSupplySquad(fVehicle,fSquad,fSquadVehicleType,0);
    let supplyIndex2 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,1);
    let supplyIndex3 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,2);
    let supplyIndex4 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,3);
    let supplyIndex5 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,4);
    let supplyIndex6 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,5);
    let supplyIndex7 = t_BaseSupplySquad(fVehicle ,fSquad,fSquadVehicleType,6);
    let squadCarriedSupplies = [supplyIndex1[0],supplyIndex2[0],supplyIndex3[0],supplyIndex4[0],supplyIndex5[0],supplyIndex6[0],supplyIndex7[0]];
    let vehicleCarriedSupplies = [supplyIndex1[1],supplyIndex2[1],supplyIndex3[1],supplyIndex4[1],supplyIndex5[1],supplyIndex6[1],supplyIndex7[1]];
    let totalSupplies = [supplyIndex1[2],supplyIndex2[2],supplyIndex3[2],supplyIndex4[2],supplyIndex5[2],supplyIndex6[2],supplyIndex7[2]];
    return [
        squadCarriedSupplies,
        vehicleCarriedSupplies,
        totalSupplies,
    ]
};

// VALUE CALCULATIONS //
/*
function vc_opticBuff(mag,sightPic,weight,terrain){
    return (((mag+(sightPic*.1))-weight)*terrain);
}
*/

function vc_rifle(person,terrain,giveReport){
    /*
        attempts to quantify the offensive value of a standard firearm, based on it's weight, length, effective range, attachments, ammunition availability , environment of use, time of use and weather of use. 
    */
    let priValue=0;
    let priRange=0;
    let priWeight=0;
    let priLength=0;
    let priLowLightCapabilities=0;
    let priShotLoudness=0;
    let priName="no primary";
    let uBGLName=", no uBGL";
    let railMountName=", no rail-mounted accessory ";
    let gripModName=", no grip mod";
    let suppressorName=", no suppressor ";
    let opticName=" and no optic";
    let bD2OM=0;
    let bD2OP=0;
    let bD2OW=0;
    let bD2SDBR=0;
    let bD2SW=0;
    let bD2SL=0;
    let bD2UBGW=0;
    let bD2UBGL=0;
    let bD2RMWL=0;
    let bD2RMCL=0;
    let bD2RMIRF=0;
    let bD2RMIRL=0;
    let bD2RMAW=0;
    let bD2GM=0;
    let bD2GW=0;
    let AntiVehiclePoints=0;
    if(person!=0){
        if(person.pri!=0){
            if((person.pri.caliber=="5.45x39mm")||(person.pri.caliber == "5.56x45mm")||(person.pri.caliber=="7.62x39mm")||(person.pri.caliber=="9x19mm")||(person.pri.caliber==".45")||(person.pri.caliber=="9mm")){
                if(person.supplies[0]>30){
                    if(person.pri.caliber=="5.45x39mm"){
                        AntiVehiclePoints=(cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_545x39*cfg.multipliers.personnel.weapons.general.AVPointsPerMMRHAPen);
                    }else if(person.pri.caliber=="5.56x45mm"){
                        AntiVehiclePoints=(cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_556x45*cfg.multipliers.personnel.weapons.general.AVPointsPerMMRHAPen);
                    }else if(person.pri.caliber=="7.62x39mm"){
                        AntiVehiclePoints=(cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_762x39*cfg.multipliers.personnel.weapons.general.AVPointsPerMMRHAPen);
                    }else{
                        AntiVehiclePoints=0;
                    }
                    priRange=person.pri.eRange;
                    priWeight=person.pri.weight;
                    priLength=person.pri.length;     
                    priShotLoudness=person.pri.report; 
                    priName=("a "+person.pri.name);
                    if(person.suppressor!=0){//suppressors
                    bD2SW=person.suppressor.weight;
                    priWeight+=bD2SW;
                    bD2SDBR=person.suppressor.reportReduction;
                    priShotLoudness-=bD2SDBR;
                    bD2SL=person.suppressor.length;
                    priLength+=bD2SL
                    suppressorName=(" with a "+person.suppressor.name+" suppressor");
                    };
                    if(person.uBGL!=0){//underbarrel grenade launchers
                        bD2UBGW=person.uBGL.weight;
                        priWeight+=bD2UBGW;
                        uBGLName=(", a "+person.uBGL.name+" underbarrel grenade launcher");
                        if(person.supplies[4]>0){
                            bD2UBGL=(person.uBGL.eRange*cfg.multipliers.personnel.weapons.guns.gRangeBByUBGLYardage);
                            priRange+=bD2UBGL;
                        }
                    };
                    if(person.railAccessory!=0){//rail mounted lights, lasers, both IR and visual
                    railMountName=(", a "+person.railAccessory.name+" rail mounted accessory");
                    if(person.railAccessory.features[0]!=0){
                        bD2RMWL=cfg.multipliers.personnel.weapons.guns.gVBBWhiteLight;
                        priValue+=bD2RMWL;
                    };
                    if(person.railAccessory.features[1]!=0){
                        bD2RMCL=cfg.multipliers.personnel.weapons.guns.gVBBLaser;
                        priValue+=bD2RMCL;
                    };
                    if(person.railAccessory.features[2]!=0){
                        bD2RMIRF=cfg.multipliers.personnel.weapons.guns.gVBBIRLight;
                        priValue+=bD2RMIRF;
                    }
                    if(person.railAccessory.features[3]!=0){
                        bD2RMIRL=cfg.multipliers.personnel.weapons.guns.gVBBIRLaser;
                        priValue+=bD2RMIRL;     
                    }
                    bD2RMAW=person.railAccessory.weight;
                    priWeight+=bD2RMAW;
                    };
                    if(person.gripMod!=0){//grips, bipods
                        gripModName=(", a "+person.gripMod.name+" ");
                        bD2GM=cfg.multipliers.personnel.weapons.guns.gRangeBByGripType[person.gripMod.type];
                        priRange+=bD2GM;
                        bD2GW=person.gripMod.weight;
                        priWeight+=bD2GW;
                    }
                    if(person.priOptic!=0){//optics
                        if(person.priOptic.mag>1){
                            bD2OM=((person.priOptic.mag-1)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticMag);//buff Due 2 Optic Magnification
                            priRange+=bD2OM;                    
                        };
                        if(runtimeVariables.time.time<runtimeVariables.date.sunRise||runtimeVariables.time.time>runtimeVariables.date.sunSet){//is it night time?
                            let RifleOpticNods = 0;//comparing the rifle sights and any helmet mounted optics (including binocs) to see which one has the best night vision capability.
                            let HelmetOpticNods = 0;
                            if(person.priOptic!=0){
                                if(person.priOptic.NVG==0){
                                    RifleOpticNods=60
                                }else if(person.priOptic.NVG>0&&person.priOptic.NVG<4){
                                    RifleOpticNods=(cfg.multipliers.personnel.weapons.guns.gRangeByOpticNODAtNight[person.priOptic.NVG]*cfg.multipliers.personnel.weapons.guns.sightVsHelmetNods);
                                }else if(Person.priOptic.NVG==5){
                                    RifleOpticNods=priRange*(cfg.multipliers.personnel.weapons.guns.thermalSightRangeBuff*cfg.multipliers.personnel.weapons.guns.sightVsHelmetNods);
                                };                            
                            };
                            if(person.nods!=0){
                                if(person.nods.type==0){
                                    HelmetOpticNods=70;
                                }else if(person.nods.type>0){
                                    HelmetOpticNods=cfg.multipliers.personnel.weapons.guns.gRangeByOpticNODAtNight[person.nods.type];
                                }else if(person.nods.type==5){
                                    HelmetOpticNods=priRange*cfg.multipliers.personnel.weapons.guns.thermalSightRangeBuff;
                                };
                            };
                            if(HelmetOpticNods>RifleOpticNods){
                                priRange=HelmetOpticNods;
    
                            }else{
                                priRange=RifleOpticNods;
                            };
                            opticName=(" and a "+person.priOptic.name+" optic");
                            bD2OP=(person.priOptic.obj*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticPic);
                            bD2OW=person.priOptic.weight;
                            priRange+=bD2OP
                            priWeight+=bD2OW;
                        }else{
                            bD2OW=person.priOptic.weight;
                            priWeight+=bD2OW;
                            priLowLightCapabilities=person.priOptic.NVG;
                            opticName=(" and a "+person.priOptic.name+" optic");                        
                        }
                    };
                    priValue+=((cfg.multipliers.personnel.weapons.guns.gLoudnessThreshold-priShotLoudness)*cfg.multipliers.personnel.weapons.guns.gBuffByLDb);
                    
                };                
            }else{
                if(person.supplies[1]>20){
                    if(person.pri.caliber=="7.62x51mm"){
                        AntiVehiclePoints=(cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_762x51*cfg.multipliers.personnel.weapons.general.AVPointsPerMMRHAPen);
                    }else if(person.pri.caliber=="7.62x54mmr"){
                        AntiVehiclePoints=(cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_762x54*cfg.multipliers.personnel.weapons.general.AVPointsPerMMRHAPen);
                    }else if(person.pri.caliber=="12.7mm"){
                        AntiVehiclePoints=(cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_12_7*cfg.multipliers.personnel.weapons.general.AVPointsPerMMRHAPen);
                    }else if(person.pri.caliber==".300"){
                        AntiVehiclePoints=(cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_300WM*cfg.multipliers.personnel.weapons.general.AVPointsPerMMRHAPen);
                    }else if(person.pri.caliber==".338"){
                        AntiVehiclePoints=(cfg.multipliers.personnel.weapons.general.caliberRHAPenValues.c_338*cfg.multipliers.personnel.weapons.general.AVPointsPerMMRHAPen);
                    }else{
                        AntiVehiclePoints=0;
                    }
                    priRange=person.pri.eRange;
                    priWeight=person.pri.weight;
                    priLength=person.pri.length;     
                    priShotLoudness=person.pri.report; 
                    priName=("a "+person.pri.name);
                    if(person.suppressor!=0){//suppressors
                    bD2SW=person.suppressor.weight;
                    priWeight+=bD2SW;
                    bD2SDBR=person.suppressor.reportReduction;
                    priShotLoudness-=bD2SDBR;
                    bD2SL=person.suppressor.length;
                    priLength+=bD2SL
                    suppressorName=(" with a "+person.suppressor.name+" suppressor");
                    };
                    if(person.uBGL!=0){//underbarrel grenade launchers
                        bD2UBGW=person.uBGL.weight;
                        priWeight+=bD2UBGW;
                        uBGLName=(", a "+person.uBGL.name+" underbarrel grenade launcher");
                        if(person.supplies[4]>0){
                            bD2UBGL=(person.uBGL.eRange*cfg.multipliers.personnel.weapons.guns.gRangeBByUBGLYardage);
                            priRange+=bD2UBGL;
                        }
                    };
                    if(person.railAccessory!=0){//rail mounted lights, lasers, both IR and visual
                    railMountName=(", a "+person.railAccessory.name+" rail mounted accessory");
                    if(person.railAccessory.features[0]!=0){
                        bD2RMWL=cfg.multipliers.personnel.weapons.guns.gVBBWhiteLight;
                        priValue+=bD2RMWL;
                    };
                    if(person.railAccessory.features[1]!=0){
                        bD2RMCL=cfg.multipliers.personnel.weapons.guns.gVBBLaser;
                        priValue+=bD2RMCL;
                    };
                    if(person.railAccessory.features[2]!=0){
                        bD2RMIRF=cfg.multipliers.personnel.weapons.guns.gVBBIRLight;
                        priValue+=bD2RMIRF;
                    }
                    if(person.railAccessory.features[3]!=0){
                        bD2RMIRL=cfg.multipliers.personnel.weapons.guns.gVBBIRLaser;
                        priValue+=bD2RMIRL;     
                    }
                    bD2RMAW=person.railAccessory.weight;
                    priWeight+=bD2RMAW;
                    };
                    if(person.gripMod!=0){//grips, bipods
                        gripModName=(", a "+person.gripMod.name+" ");
                        bD2GM=cfg.multipliers.personnel.weapons.guns.gRangeBByGripType[person.gripMod.type];
                        priRange+=bD2GM;
                        bD2GW=person.gripMod.weight;
                        priWeight+=bD2GW;
                    }
                    if(person.priOptic!=0){//optics
                        if(person.priOptic.mag>1){
                            bD2OM=((person.priOptic.mag-1)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticMag);//buff Due 2 Optic Magnification
                            priRange+=bD2OM;                    
                        };
                        if(runtimeVariables.time.time<runtimeVariables.date.sunRise||runtimeVariables.time.time>runtimeVariables.date.sunSet){//is it night time?
                            let RifleOpticNods = 0;//comparing the rifle sights and any helmet mounted optics (including binocs) to see which one has the best night vision capability.
                            let HelmetOpticNods = 0;
                            if(person.priOptic!=0){
                                if(person.priOptic.NVG==0){
                                    RifleOpticNods=60
                                }else if(person.priOptic.NVG>0&&person.priOptic.NVG<4){
                                    RifleOpticNods=(cfg.multipliers.personnel.weapons.guns.gRangeByOpticNODAtNight[person.priOptic.NVG]*cfg.multipliers.personnel.weapons.guns.sightVsHelmetNods);
                                }else if(Person.priOptic.NVG==5){
                                    RifleOpticNods=priRange*(cfg.multipliers.personnel.weapons.guns.thermalSightRangeBuff*cfg.multipliers.personnel.weapons.guns.sightVsHelmetNods);
                                };                            
                            };
                            if(person.nods!=0){
                                if(person.nods.type==0){
                                    HelmetOpticNods=70;
                                }else if(person.nods.type>0){
                                    HelmetOpticNods=cfg.multipliers.personnel.weapons.guns.gRangeByOpticNODAtNight[person.nods.type];
                                }else if(person.nods.type==5){
                                    HelmetOpticNods=priRange*cfg.multipliers.personnel.weapons.guns.thermalSightRangeBuff;
                                };
                            };
                            if(HelmetOpticNods>RifleOpticNods){
                                priRange=HelmetOpticNods;
    
                            }else{
                                priRange=RifleOpticNods;
                            };
                            opticName=(" and a "+person.priOptic.name+" optic");
                            bD2OP=(person.priOptic.obj*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticPic);
                            bD2OW=person.priOptic.weight;
                            priRange+=bD2OP
                            priWeight+=bD2OW;
                        }else{
                            if(person.nods!=0){
                                if(person.nods.type==4){
                                    priRange*=cfg.multipliers.personnel.weapons.guns.thermalSightRangeBuff;
                                }else if(person.nods.type==0){
                                    priRange*=(person.nods.mag*.20);
                                }
                            }if(person.priOptic!=0){
                                if(person.priOptic.NVG==4){
                                    priRange*=(cfg.multipliers.personnel.weapons.guns.thermalSightRangeBuff*cfg.multipliers.personnel.weapons.guns.sightVsHelmetNods);
                                }
                            }
                            bD2OW=person.priOptic.weight;
                            priWeight+=bD2OW;
                            priLowLightCapabilities=person.priOptic.NVG;
                            opticName=(" and a "+person.priOptic.name+" optic");                        
                        }
                    };
                    priValue+=((cfg.multipliers.personnel.weapons.guns.gLoudnessThreshold-priShotLoudness)*cfg.multipliers.personnel.weapons.guns.gBuffByLDb);
                    priValue+=(priRange*cfg.multipliers.personnel.weapons.guns.gBuffByYByTType[terrain[4]]);
                    
                };                
            }
            priValue-=(priLength*cfg.multipliers.personnel.weapons.guns.gLengthDBuffByTType[terrain[4]]);
            priValue-=(cfg.multipliers.personnel.weapons.guns.gDBuffByLb*priWeight);

        };
    };
    if(giveReport==1){
        return("this soldier is equipped with "+priName+suppressorName+uBGLName+railMountName+gripModName+opticName+"\n Their primary weapon's total weight is "+priWeight+" and it's total length is "+priLength+" inches. It's shot volume is "+priShotLoudness+"\n It's calculated value is "+priValue+"\n STAT BREAKDOWN BELOW: \n Stat additions for an optic are +"+bD2OM+" effective range y due to scope magnification, +"+bD2OP+" effective range yards due to scope picture, +"+bD2OW+" overall weight.\n Stat additions for a suppressor are -"+bD2SDBR+" decibels  gunshot noise, +"+bD2SW+" lbs weapon weight, +"+bD2SL+" inches overall length \n Stat additions for an underbarrel grenade launcher are +"+bD2UBGW+" pounds overall weight, +"+bD2UBGL+" range yard points \n Stat additions for rail accessory are "+bD2RMWL+" points overall value for a white light, "+bD2RMCL+" points weapon value for a conventional laser, "+bD2RMIRF+" points weapon value for an IR flashlight, "+bD2RMIRL+" points weapon value for an IR laser and "+bD2RMAW+" pounds weapon weight \n Stat additions for a grip mod are "+bD2GM+" yards effective range and "+bD2GW+" pounds overall weapon weight ");
    };
    if(giveReport==0){
        return [priValue,priWeight,priLowLightCapabilities,AntiVehiclePoints];
    };
};

function vc_rocketLauncher(){

};

function vc_individual(individual){
    
}
function vc_tank(company,squad){//WIP, before continuing I should really quantify the value of an individual soldier.
    /*  returns a quantitative value of a tank's current offensive and defensive capabilities, accurate to present time. 
        Capabilities are anti-armor, anti-personnel.
    */
   let crewEffectiveness = 0;
   if(squad.vehicle.type==1){//check if this is actually a tank before trying to calculate stuff about it.
    crewEffectiveness=(mu_tallyPersonnelInCat(squad.personnelProfiles[0]/squad.vehicle.crew))//
   }

};
// SUPPLIES PER HOUR CALCULATIONS //
function t_SuppliesPerHourSoldier(a545phc,a762phc,apg7phc,argd5phc,agp25phc){
    let sPHC=[a545phc,a762phc,apg7phc,argd5phc,agp25phc,.04166,.16];
    let sPHOF=[a545phc*.1,a762phc*.1,apg7phc*.1,argd5phc*.1,agp25phc*.1,.04166,.1458];
    let sPHIR=[a545phc*.0025,a762phc*.0025,apg7phc*.0025,argd5phc*0,agp25phc*.0025,.04166,.116];
    let sPHP=[a545phc*.02,a762phc*.02,apg7phc*.02,argd5phc*.02,agp25phc*.02,.04166,.135];
    return{
        sPHC,
        sPHOF,
        sPHIR,
        sPHP
    }
};
function t_SPHICSquad(squad,squadVehicleType,ammoIndex){
    function squadCompCompressor(total,squadMember,index){
    
        return total+squad.members[index]*DB.components.personnel[squadMember][squadVehicleType].suppliesPerHourCombat[ammoIndex];
    }
    let sPHC = functionHelpers.squadComp.reduce(squadCompCompressor,0);
    return sPHC;   
};
function tallySPHSquad(squad,ammoIndex,combatType){
    let squadVehicleType = c_squadVehicleType(squad);
    function squadCompCompressor(total,squadMember,index){
        return total+squad.members[index]*DB.components.personnel[squadMember][squadVehicleType][combatType][ammoIndex];
    }
    return  functionHelpers.squadComp.reduce(squadCompCompressor,0);
};
function t_vehicleSPHOneType(fSquad,combatType){
    return fSquad.vehicle[combatType];
};
function t_vehicleSPHAllTypes(fSquad){
    let vSPHC = t_squadSPHOneType(fSquad,"vSuppliesPerHourCombat");
    let vSPHOF = t_vehicleSPHOneType(fSquad,"vSuppliesPerHourOnFront");
    let vSPHIR = t_vehicleSPHOneType(fSquad,"vSuppliesPerHourInReserve");
    let vSPHP = t_squadSPHOneType(fSquad,"vSuppliesPerHourPolicing");
    return [
        vSPHC,
        vSPHOF,
        vSPHIR,
        vSPHP
    ]
};
function t_squadSPHOneType(fSquad,combatType){
    /*
    let i0=tallySPHSquad(fSquad,0,combatType)
    let i1=tallySPHSquad(fSquad,1,combatType)
    let i2=tallySPHSquad(fSquad,2,combatType)ZZZ
    let i3=tallySPHSquad(fSquad,3,combatType)
    let i4=tallySPHSquad(fSquad,4,combatType)
    let i5=tallySPHSquad(fSquad,5,combatType)
    let i6=tallySPHSquad(fSquad,6,combatType)
    console.log(i6,combatType)
    */
    //return[i0,i1,i2,i3,i4,i5,i6]
    return [0,1,2,3,4,5,6].map(function(x){
        return tallySPHSquad(fSquad,x,combatType);
    })
};
function t_squadSPHAllTypes(fSquad){
    let sPHC = t_squadSPHOneType(fSquad,"suppliesPerHourCombat");
    let sPHOF = t_squadSPHOneType(fSquad,"suppliesPerHourOnFront");
    let sPHIR = t_squadSPHOneType(fSquad,"suppliesPerHourInReserve");
    let sPHP = t_squadSPHOneType(fSquad,"suppliesPerHourPolicing");
    return{
        sPHC,
        sPHOF,
        sPHIR,
        sPHP,
    };
};
function t_squadSPHAllTypesWVehicle(fSquad,fSquadVehicleType){
    let sPHC = t_squadSPHOneType(fSquad,fSquadVehicleType,"suppliesPerHourCombat");
    let sPHOF = t_squadSPHOneType(fSquad,fSquadVehicleType,"suppliesPerHourOnFront");
    let sPHIR = t_squadSPHOneType(fSquad,fSquadVehicleType,"suppliesPerHourInReserve");
    let sPHP = t_squadSPHOneType(fSquad,fSquadVehicleType,"suppliesPerHourPolicing");
    let vSPHC = t_vehicleSPHOneType(fSquad,"vSuppliesPerHourCombat");
    let vSPHOF = t_vehicleSPHOneType(fSquad,"vSuppliesPerHourOnFront");
    let vSPHIR = t_vehicleSPHOneType(fSquad,"vSuppliesPerHourInReserve");
    let vSPHP = t_vehicleSPHOneType(fSquad,"vSuppliesPerHourPolicing");
    return [
        sPHC,
        sPHOF,
        sPHIR,
        sPHP,
        vSPHC,
        vSPHOF,
        vSPHIR,
        vSPHP
    ]
    //return fSquad.vehicle.vSuppliesPerHourCombat
};
function c_waterPH(company,squadIndex,weather){
    //water calculation component of c_infSPHSitu
    let status = company.status;
    let wPH = 0;
    let baseWPSnums = [
        0,
        .16,
        .1458,
        .116,
        .135
    ];
    let baseWPTpercents = [
        .8,
        .9,
        1.05,
        .95,
        1.05,
        .95,
        1,
        .7,
        1.05,
        .8,
        .75
    ]
    wPH = baseWPSnums[status];
    wPH = wPH*baseWPTpercents[squadIndex];
    if((weather.time>=900&&weather.time<=1100)||(weather.time>=1600&&weather.time<=2000)){
        wPH=wPH*.9;

    }else if(weather.time>=1101&&weather.time<=1559){
        wPH=wPH*1.1;
    }else{
        wPH=wPH*.75;
    }
    if(weather.windSpd>=5){
        wPH=wPH*(1-((weather.windSpd-5)*.01));
    }
    if(weather.temp>=68){
        wPH=(wPH*(1-(68-weather.temp)*.0025));
    }else{
        wPH=(wPH*(1+(weather.temp-68)*.005));

    }
    return wPH;
};
function c_rifleAmmoPH(company,squad,squadindex){
    //rifle ammunition calculation subcomponent of c_infSPHSitu
    let status = company.status;
    let rifleAPH = 0;
    let rifleAPHArray = [
        180,
        80,
        80,
        110,
        0,
        110,
        120,
        60,
        0,
        .3,
        .3
    ];
    let rifleAPHPercents=[
        0,
        1,
        .1,
        .0025,
        .02
    ];
    let vicClassPercents=[
        0,
        1,
        .85,
        .75
    ];
    rifleAPH = rifleAPHArray[squadindex];
    if(squad.hasVehicle==1){
        rifleAPH=rifleAPH*vicClassPercents[company.type]
    }
    rifleAPH = rifleAPH*rifleAPHPercents[status]
    return rifleAPH
};
function c_MGAmmoPH(company,squad,squadindex){
    //machine gun and sniper ammo calculation subfunction for c_infSPHSitu
    let status = company.status;
    let MGAPH = 0;
    let MGAPHArray = [
        0,
        0,
        0,
        0,
        800,
        0,
        0,
        0,
        60,
        0,
        0
    ];
    let MGAPHPercents=[
        0,
        1,
        .1,
        .0025,
        .02
    ];
    let vicClassPercents=[
        0,
        1,
        .85,
        .75
    ];
    MGAPH = MGAPHArray[squadindex];
    if(squad.hasVehicle==1){
        MGAPH=MGAPH*vicClassPercents[company.type];
    }
    MGAPH = MGAPH*MGAPHPercents[status];
    return MGAPH;
};
function c_PG7AmmoPH(company,squad,squadindex){
    //RPG ammo subcalculation of c_infSPHSitu
    let status = company.status;
    let PG7APH = 0;
    let PG7APHArray = [
        0,
        0,
        5.5,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ];
    let PG7APHPercents=[
        0,
        1,
        .05,
        .00125,
        .01
    ];
    let vicClassPercents=[
        0,
        1,
        .95,
        .85
    ];
    PG7APH = PG7APHArray[squadindex];
    if(squad.hasVehicle==1){
        PG7APH=PG7APH*vicClassPercents[company.type];
    }
    PG7APH = PG7APH*PG7APHPercents[status];
    return PG7APH;
};
function c_GrenAmmoPH(company,squad,squadindex){
    //grenade subcomponent calculation c_infSPHSitu
    let status = company.status;
    let GAPH = 0;
    let GAPHArray = [
        .75,
        .25,
        .3,
        4,
        1,
        3,
        4,
        2,
        1,
        0,
        0
    ];
    let GAPHPercents=[
        0,
        1,
        .05,
        .00125,
        .01
    ];
    let vicClassPercents=[
        0,
        1,
        .8,
        .6
    ];
    GAPH = GAPHArray[squadindex];
    if(squad.hasVehicle==1){
        GAPH=GAPH*vicClassPercents[company.type];
    }
    GAPH = GAPH*GAPHPercents[status];
    return GAPH;
};
function c_GPAmmoPH(company,squad,squadindex){
    //underbarrel grenade launcher subcomponent of c_infSPHSitu
    let status = company.status;
    let GPAPH = 0;
    let GPAPHArray = [
        [0,0,0,0],
        [0,6,6,6],
        [0,0,0,0],
        [0,0,0,7],
        [0,0,0,0],
        [0,10,0,10],
        [0,0,0,6],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    let GPAPHPercents=[
        0,
        1,
        .05,
        .00125,
        .01
    ];
    let vicClassPercents=[
        0,
        1,
        .825,
        .725
    ];
    GPAPH = GPAPHArray[squadindex][company.type];
    if(squad.hasVehicle==1){
        GPAPH=GPAPH*vicClassPercents[company.type];
    }
    GPAPH = GPAPH*GPAPHPercents[status];
    return GPAPH;
};
function c_infSPHOneIndex(fCo,fSq,fSqIndex,fWthr){
    //designed to calculate the supplies per hour expidenture rate for a category of soldier in the simulation's runtime.
    //takes a specific company, a squad from that company, a squad index of that squad (not a specific soldier just a class of one), and the current weather array item. The weather temperature is taken into account for the water usage calculation.
    return [ 
        (c_rifleAmmoPH(fCo,fSq,fSqIndex)*g_sqPersonsByIndex(fSq,fSqIndex)),
        (c_MGAmmoPH(fCo,fSq,fSqIndex)*g_sqPersonsByIndex(fSq,fSqIndex)),
        (c_PG7AmmoPH(fCo,fSq,fSqIndex)*g_sqPersonsByIndex(fSq,fSqIndex)),
        (c_GrenAmmoPH(fCo,fSq,fSqIndex)*g_sqPersonsByIndex(fSq,fSqIndex)),
        (c_GPAmmoPH(fCo,fSq,fSqIndex)*g_sqPersonsByIndex(fSq,fSqIndex)),
        (.0416*g_sqPersonsByIndex(fSq,fSqIndex)),
        (c_waterPH(fCo,fSqIndex,fWthr)*g_sqPersonsByIndex(fSq,fSqIndex))
    ]
};
function c_infSPHOneSquad(fCo,fSq,fWthr){
    let a = c_infSPHOneIndex(fCo,fSq,0,fWthr);
    let b = c_infSPHOneIndex(fCo,fSq,1,fWthr);
    let c = c_infSPHOneIndex(fCo,fSq,2,fWthr);
    let d = c_infSPHOneIndex(fCo,fSq,3,fWthr);
    let e = c_infSPHOneIndex(fCo,fSq,4,fWthr);
    let f = c_infSPHOneIndex(fCo,fSq,5,fWthr);
    let g = c_infSPHOneIndex(fCo,fSq,6,fWthr);
    let h = c_infSPHOneIndex(fCo,fSq,7,fWthr);
    let i = c_infSPHOneIndex(fCo,fSq,8,fWthr);
    let j = c_infSPHOneIndex(fCo,fSq,9,fWthr);
    let k = c_infSPHOneIndex(fCo,fSq,10,fWthr);
    fSq.personnelSPHByIndex=[
        a,b,c,d,e,f,g,h,i,j,k
    ];
};
function s_supplyExpendOneMan(fSq,fSqIndex,fPerson,fTime){
    //calculates the supply expenditure for one man in a squad based on time passed and then subtracts it from their supply count

    let sToRemove0 = fSq.personnelSPHByIndex[fSqIndex][0]*fTime;
    let sToRemove1 = fSq.personnelSPHByIndex[fSqIndex][1]*fTime;
    let sToRemove2 = fSq.personnelSPHByIndex[fSqIndex][2]*fTime;
    let sToRemove3 = fSq.personnelSPHByIndex[fSqIndex][3]*fTime;
    let sToRemove4 = fSq.personnelSPHByIndex[fSqIndex][4]*fTime;
    let sToRemove5 = fSq.personnelSPHByIndex[fSqIndex][5]*fTime;
    let sToRemove6 = fSq.personnelSPHByIndex[fSqIndex][6]*fTime;

    fSq.supplies[0]-=sToRemove0;
    fSq.supplies[1]-=sToRemove1;
    fSq.supplies[2]-=sToRemove2;
    fSq.supplies[3]-=sToRemove3;
    fSq.supplies[4]-=sToRemove4;
    fSq.supplies[5]-=sToRemove5;
    fSq.supplies[6]-=sToRemove6;

    fPerson[0]-=sToRemove0;
    fPerson[1]-=sToRemove1;
    fPerson[2]-=sToRemove2;
    fPerson[3]-=sToRemove3;
    fPerson[4]-=sToRemove4;
    fPerson[5]-=sToRemove5;
    fPerson[6]-=sToRemove6;

};


// RESUPPLY HANDLERS //
function ss_TELReplenFrmRssplr(fCo,fSq){//handles resupply of launchers of all kinds from their resuppliers in runtime.
    if(fCo.uCata==4){
        if(fCo.uType==0){//2S3 self-propelled guns from their ammunition trucks
            if(fSq.sTemplate=DB.uComps.squads.SQ_2S3){
                if(fSq.rounds<(DB.uComps.squads.SQ_2S3.vehicle.roundsCarried)*.5){
                    if(fCo.platoon3.squad1.rounds>0){
                        if(fCo.platoon3.squad1.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon3.squad1.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon3.squad1.rounds;
                            fCo.platoon3.squad1.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon3.squad1,2,0);                        
                    }else if(fCo.platoon3.squad2.rounds>0){
                        if(fCo.platoon3.squad2.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon3.squad2.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon3.squad2.rounds;
                            fCo.platoon3.squad2.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon3.squad2,2,0);                        
                    }else if(fCo.platoon3.squad3.rounds>0){
                        if(fCo.platoon3.squad3.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon3.squad3.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon3.squad3.rounds;
                            fCo.platoon3.squad3.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon3.squad3,2,0);                        
                    }else if(fCo.platoon4.squad1.rounds>0){
                        if(fCo.platoon4.squad1.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon4.squad1.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon4.squad1.rounds;
                            fCo.platoon4.squad1.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon4.squad1,2,0);                        
                    }else if(fCo.platoon4.squad2.rounds>0){
                        if(fCo.platoon4.squad2.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon4.squad2.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon4.squad2.rounds;
                            fCo.platoon4.squad2.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon4.squad2,2,0);                        
                    }else if(fCo.platoon4.squad3.rounds>0){
                        if(fCo.platoon4.squad3.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon4.squad3.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon4.squad3.rounds;
                            fCo.platoon4.squad3.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon4.squad3,2,0);                        
                    }
                }
            }
        }else if(fCo.uType==1){//BM-21 medium rocket launchers from their ammunition trucks(STILL NEEDS WORK)
            if(fSq.sTemplate=DB.uComps.squads.SQ_BM21){
                if(fSq.rounds<(DB.uComps.squads.SQ_BM21.vehicle.roundsCarried)*.5){
                    if(fCo.platoon3.squad1.rounds>0){
                        if(fCo.platoon3.squad1.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon3.squad1.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon3.squad1.rounds;
                            fCo.platoon3.squad1.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon3.squad1,2,0);                        
                    }else if(fCo.platoon3.squad2.rounds>0){
                        if(fCo.platoon3.squad2.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon3.squad2.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon3.squad2.rounds;
                            fCo.platoon3.squad2.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon3.squad2,2,0);                        
                    }else if(fCo.platoon3.squad3.rounds>0){
                        if(fCo.platoon3.squad3.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon3.squad3.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon3.squad3.rounds;
                            fCo.platoon3.squad3.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon3.squad3,2,0);                        
                    }else if(fCo.platoon4.squad1.rounds>0){
                        if(fCo.platoon4.squad1.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon4.squad1.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon4.squad1.rounds;
                            fCo.platoon4.squad1.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon4.squad1,2,0);                        
                    }else if(fCo.platoon4.squad2.rounds>0){
                        if(fCo.platoon4.squad2.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon4.squad2.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon4.squad2.rounds;
                            fCo.platoon4.squad2.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon4.squad2,2,0);                        
                    }else if(fCo.platoon4.squad3.rounds>0){
                        if(fCo.platoon4.squad3.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon4.squad3.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon4.squad3.rounds;
                            fCo.platoon4.squad3.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon4.squad3,2,0);                        
                    }
                }
                
            }                
        }else if(fCo.uType==2){//BM-30 heavy rocket launchers from their resuppliers
            if(fSq.sTemplate=DB.uComps.squads.SQ_BM30){
                if(fSq.rounds<(DB.uComps.squads.SQ_BM30.vehicle.roundsCarried)*.5){
                    if(fCo.platoon3.squad1.rounds>0){
                        if(fCo.platoon3.squad1.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon3.squad1.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon3.squad1.rounds;
                            fCo.platoon3.squad1.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon3.squad1,2,0);
                    }else if(fCo.platoon3.squad2.rounds>0){
                        if(fCo.platoon3.squad2.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon3.squad2.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon3.squad2.rounds;
                            fCo.platoon3.squad2.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon3.squad2,2,0);
                    }else if(fCo.platoon3.squad3.rounds>0){
                        if(fCo.platoon3.squad3.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon3.squad3.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon3.squad3.rounds;
                            fCo.platoon3.squad2.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon3.squad3,2,0);
                    }else if(fCo.platoon4.squad1.rounds>=0){
                        if(fCo.platoon4.squad1.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon4.squad1.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon4.squad1.rounds;
                            fCo.platoon4.squad1.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon4.squad1,2,0);
                    }else if(fCo.platoon4.squad2.rounds>=0){
                        if(fCo.platoon4.squad2.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon4.squad2.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon4.squad2.rounds;
                            fCo.platoon4.squad2.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon4.squad2,2,0);
                    }else if(fCo.platoon4.squad3.rounds>=0){
                        if(fCo.platoon4.squad3.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon4.squad3.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                            
                        }else{
                            fSq.rounds+=fCo.platoon4.squad3.rounds;
                            fCo.platoon4.squad3.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon4.squad3,2,0);
                    }
                }
            }
        }else if(fCo.uType==3){//SA-8  (STILL NEEDS WORK)

        
        }else if(fCo.uType==4){//SA-15 TELARs from their resuppliers
            if(fSq.sTemplate=DB.uComps.squads.SQ_TELAR_9K330){
                if(fSq.rounds<(DB.uComps.squads.SQ_TELAR_9K330.vehicle.roundsCarried)*.5){
                    if(fCo.platoon1.squad3.rounds>0){
                        if(fCo.platoon1.squad3.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon1.squad3.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                           
                        }else{
                            fSq.rounds+=fCo.platoon1.squad3.rounds;
                            fCo.platoon1.squad3.rounds=0;
                        }
                        ss_expendFuelOneVic(fCo.platoon1.squad3,2,0); 
                    }else if(fCo.platoon2.squad3.rounds>0){
                        if(fCo.platoon2.squad3.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon2.squad3.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;                           
                        }else{
                            fSq.rounds+=fCo.platoon2.squad3.rounds;
                            fCo.platoon2.squad3.rounds=0;
                        }
                        ss_expendFuelOneVic(fCo.platoon2.squad3,2,0); 
                    }
                }
            }else if(fSq.sTemplate=DB.uComps.squads.SQ_9T244_SA15_Resupplier){
                if(fSq.rounds<(DB.uComps.squads.SQ_9T244_SA15_Resupplier.vehicle.roundsCarried)*.5){
                    if(fCo.platoon3.squad1.rounds>0){
                        if(fCo.platoon3.squad1.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon3.squad1.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;
                        }else{
                            fSq.rounds+=fCo.platoon3.squad1.rounds;
                            fCo.platoon3.squad1.rounds=0;
                        }
                        ss_expendFuelOneVic(fCo.platoon3.squad1,2,0);
                    }
                }
            }
        }else if(fCo.uType==5){//SA-11 TELARs from their TELs in turn from their resuppliers
            if(fSq.sTemplate=DB.uComps.squads.SQ_TELAR_9A310){
                if(fSq.rounds<(DB.uComps.squads.SQ_TELAR_9K330.vehicle.roundsCarried)*.5){
                    if(fCo.platoon1.squad2.rounds>0){
                        if(fCo.platoon1.squad2.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon1.squad2.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;
                        }else{
                            fSq.rounds+=fCo.platoon1.squad2.rounds;
                            fCo.platoon1.squad2.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon1.squad2,2,0);
                    }else if(fCo.platoon2.squad2.rounds>0){
                        if(fCo.platoon2.squad2.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon2.squad2.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;
                        }else{
                            fSq.rounds+=fCo.platoon2.squad2.rounds;
                            fCo.platoon2.squad2.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon2.squad2,2,0);
                    }else if(fCo.platoon3.squad2.rounds>0){
                        if(fCo.platoon3.squad2.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon3.squad2.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;
                        }else{
                            fSq.rounds+=fCo.platoon3.squad2.rounds;
                            fCo.platoon3.squad2.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon3.squad2);
                    }else if(fCo.platoon4.squad2.rounds>0){
                        if(fCo.platoon4.squad2.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon4.squad2.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;
                        }else{
                            fSq.rounds+=fCo.platoon4.squad2.rounds;
                            fCo.platoon4.squad2.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon4.squad2,2,0);
                    }
                }
            }else if(fSq.sTemplate=DB.uComps.squads.SQ_TEL_9A39){
                if(fSq.rounds<(DB.uComps.squads.SQ_TEL_9A39.vehicle.roundsCarried)*.5){
                    if(fCo.platoon5.squad1.rounds>0){
                        if(fCo.platoon5.squad1.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon5.squad1.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;
                        }else{
                            fSq.rounds+=fCo.platoon5.squad1.rounds;
                            fCo.platoon5.squad1.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon5.squad1,2,0);

                    }else if(fCo.platoon5.squad2.rounds>0){
                        if(fCo.platoon5.squad2.rounds>=(fSq.vehicle.roundsCarried-fSq.rounds)){
                            fCo.platoon5.squad2.rounds-=(fSq.vehicle.roundsCarried-fSq.rounds);
                            fSq.rounds=fSq.vehicle.roundsCarried;
                        }else{
                            fSq.rounds+=fCo.platoon5.squad2.rounds;
                            fCo.platoon5.squad2.rounds=0;
                        };
                        ss_expendFuelOneVic(fCo.platoon5.squad2,2,0);

                    }
                }
            }
        }
    }
}
function ss_RssplrRplnshFrmCoDpt(co,sq){
    if(co.uCata==4){
        if(co.uType==0){//2s3 ammunition trucks from the company depot

        }else if(co.uType==1){//BM-21 ammunition trucks from the source or perhaps the company depot, unknown.

        }else if(co.uType==2){//BM-30 resupply trucks from either BTG forward base or the regimental HQ milbase. The rockets are so big that they will not fit on GP cargo trucks and it is unclear how they are transported IRL. 
        }else if(co.uType==3){//SA-8 resupply trucks from unknown location. TBD as the SA-8 section is not up yet.
        }else if(co.uType==4){//SA-15 round carriers from the company depot or perhaps the BTG FOB. 
        }else if(co.uType==5){//SA-11 round carriers (not the transloaders)from the BTG FOB or regimental HQ. 

        }
    }
}
function s_ReplenishFromVicHandlerOneSIndex(fCo,fSq,fPerson,sIndex){
    let vicType=fCo.type;
    if(fSq.hasVehicle==1){
        if(fPerson[sIndex]<=(DB.components.personnel[functionHelpers.squadComp[fPerson]][vicType].supplies[sIndex])*65){
            fSq.vehicleCarriedSupplies[0]-=((DB.components.personnel[functionHelpers.squadComp[fPerson]][vicType].supplies[sIndex])-fPerson[sIndex]);
            fPerson[sIndex]=DB.components.personnel[functionHelpers.squadComp[fPerson]][vicType].supplies[sIndex];
        };        
    };
};
function s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fPerson){
    s_ReplenishFromVicHandlerOneSIndex(fCo,fSq,fPerson,0);
    s_ReplenishFromVicHandlerOneSIndex(fCo,fSq,fPerson,1);
    s_ReplenishFromVicHandlerOneSIndex(fCo,fSq,fPerson,2);
    s_ReplenishFromVicHandlerOneSIndex(fCo,fSq,fPerson,3);
    s_ReplenishFromVicHandlerOneSIndex(fCo,fSq,fPerson,4);
    s_ReplenishFromVicHandlerOneSIndex(fCo,fSq,fPerson,5);
    s_ReplenishFromVicHandlerOneSIndex(fCo,fSq,fPerson,6);
};
function s_RplnshFrmVicHndlrOneSq(fCo,fSq){
    if(fSq.name != 0){
        if(fSq.personnelProfiles[0][0]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[0][0]);
        };
        if(fSq.personnelProfiles[0][1]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[0][1]);
        };
        if(fSq.personnelProfiles[0][2]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[0][2]);
        };
        if(fSq.personnelProfiles[0][3]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[0][3]);
        };
        if(fSq.personnelProfiles[1][0]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[1][0]);
        };
        if(fSq.personnelProfiles[1][1]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[1][1]);
        };
        if(fSq.personnelProfiles[1][2]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[1][2]);
        };
        if(fSq.personnelProfiles[1][3]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[1][3]);
        };
        if(fSq.personnelProfiles[2][0]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[2][0]);
        };
        if(fSq.personnelProfiles[2][1]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[2][1]);
        };
        if(fSq.personnelProfiles[2][2]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[2][2]);
        };
        if(fSq.personnelProfiles[2][3]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[2][3]);
        };
        if(fSq.personnelProfiles[3][0]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[3][0]);
        };
        if(fSq.personnelProfiles[3][1]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[3][1]);
        };
        if(fSq.personnelProfiles[3][2]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[3][2]);
        };
        if(fSq.personnelProfiles[3][3]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[3][3]);
        };
        if(fSq.personnelProfiles[4][0]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[4][0]);
        };
        if(fSq.personnelProfiles[4][1]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[4][1]);
        };
        if(fSq.personnelProfiles[4][2]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[4][2]);
        };
        if(fSq.personnelProfiles[4][3]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[4][3]);
        };
        if(fSq.personnelProfiles[5][0]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[5][0]);
        };
        if(fSq.personnelProfiles[5][1]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[5][1]);
        };
        if(fSq.personnelProfiles[5][2]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[5][2]);
        };
        if(fSq.personnelProfiles[5][3]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[5][3]);
        };
        if(fSq.personnelProfiles[6][0]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[6][0]);
        };
        if(fSq.personnelProfiles[6][1]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[6][1]);
        };
        if(fSq.personnelProfiles[6][2]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[6][2]);
        };
        if(fSq.personnelProfiles[6][3]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[6][3]);
        };
        if(fSq.personnelProfiles[7][0]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[7][0]);
        };
        if(fSq.personnelProfiles[7][1]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[7][1]);
        };
        if(fSq.personnelProfiles[7][2]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[7][2]);
        };
        if(fSq.personnelProfiles[7][3]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[7][3]);
        };
        if(fSq.personnelProfiles[8][0]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[8][0]);
        };
        if(fSq.personnelProfiles[8][1]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[8][1]);
        };
        if(fSq.personnelProfiles[8][2]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[8][2]);
        };
        if(fSq.personnelProfiles[8][3]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[8][3]);
        };
        if(fSq.personnelProfiles[9][0]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[9][0]);
        };
        if(fSq.personnelProfiles[9][1]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[9][1]);
        };
        if(fSq.personnelProfiles[9][2]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[9][2]);
        };
        if(fSq.personnelProfiles[9][3]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[9][3]);
        };
        if(fSq.personnelProfiles[10][0]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[10][0]);
        };
        if(fSq.personnelProfiles[10][1]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[10][1]);
        };
        if(fSq.personnelProfiles[10][2]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[10][2]);
        };
        if(fSq.personnelProfiles[10][3]!=0){
        s_ReplenishFromVicHandlerOnePerson(fCo,fSq,fSq.personnelSPHByIndex[10][3]);
        };
    }
};
function s_RplnshFrmVicHndlrPlt(fCo,fPlt){
    s_RplnshFrmVicHndlrOneSq(fCo,fPlt.squad1);
    s_RplnshFrmVicHndlrOneSq(fCo,fPlt.squad2);
    s_RplnshFrmVicHndlrOneSq(fCo,fPlt.squad3);
};
function s_RplnshFrmVicHndlrCo(fCo){
    /*
        this function is a bit more complicated than most of the previous handlers. It needs to determine what catagory of 'company' it's being fed, and it then needs to determine what TYPE of company of that catagory it's being fed. 
        This needs to happen because if it doesn't the different number of squads for various 'companies' will either mess up the calculation by being ommitted or they will break the simulation entirely by trying to calculate supplies for 
        squads that don't exist. 
    */
    if(fCo.uCata==0){//handles the HQ of the BTG
        if(fCo.uType==0){
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad2);
        }else{
            console.log(fCo.name+"'s uType ("+fCo.uType+") cannot be handled by s_RplnshFrmVicHndlrCo because it is not a recognized HQ uType")
        }
    }else if(fCo.uCata==1){//handles frontline combat companies
        if(fCo.uType==0||fCo.uType==1||fCo.uType==2||fCo.uType==3||fCo.uType==4||fCo.uType==5||fCo.uType==6||fCo.uType==7){//truck,BTR-80,BTR-80 enhanced,BTR-82,BMP-1,BMP-2,T-72B,T-72B3
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.HQ.squad1);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon1);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon2);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon3);
        }else{
            console.log(fCo.name+"'s uType ("+fCo.uType+") cannot be handled by s_RplnshFrmVhicHndlrCo because it is not a recognized combat company uType");
        }
    }else if(fCo.uCata==2){//handles specialized secondary combat 'companies'
        if(fCo.uType==0||fCo.uType==1||fCo.uType==4){//if the 'company' is a BTR MANPADS platoon, a Truck MANPADS platoon or a Recon platoon
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon1);
        }else if(fCo.uType==3){//if the 'company' is a sniper platoon
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad2);
        }else if(fCo.uType==5){//ATGM platoon
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.HQ.squad1);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon1);
        }else if(fCo.uType==6){//Engineering platoon
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon1);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon2);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon3.squad1);
        }else{
            console.log(fCo.name+"'s uType ("+fCo.uType+") cannot be handled by s_RplnshFrmVhicHndlrCo because it is not a recognized secondary combat unit uType");
        }
    }else if(fCo.uCata==3){//handles support companies
        if(fCo.uType==0){//comms platoon
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon1);
            s_RplnshFrmVicHndlrOneSq(fCo.fCo.platoon2.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo.fCo.platoon2.squad2);
        }else if(fCo.uType==1){//medical
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad2);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad3);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad4);
        }else if(fCo.uType==2){//standard logistics unit
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad2);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad3);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad4);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad5);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad6);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad7);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad8);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon2);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon3.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon3.squad2);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon4.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon4.squad2);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon4.squad3);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon4.squad4);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon5.squad1);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon6);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon7.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon7.squad2);
        }else{
            console.log(fCo.name+"'s uType ("+fCo.uType+") cannot be handled by s_RplnshFrmVhicHndlrCo because it is not a recognized support unit uType");
        }
    }else if(fCo.uCata==4){//handles fire support companies
        if(fCo.uType==0){//2S3 battery
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.HQ.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.HQ.squad2);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon1);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon2);
        }else if(fCo.uType==1){//BM21
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.HQ.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.HQ.squad2);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon1);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon2);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon3);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon4);
        }else if(fCo.uType==2){//BM30
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.HQ.squad1);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon1);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon2);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon3);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon4);
        }else if(fCo.uType==3){//SA-8 battery. 
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.HQ.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad2);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad3);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad4);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon2.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon2.squad2);            
        }else if(fCo.uType==4){//SA-15 battery
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.HQ.squad1);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon1);
            s_RplnshFrmVicHndlrPlt(fCo,fCo.platoon2);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon3.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon3.squad2);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon3.squad3);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon3.squad4);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon3.squad5);
        }else if(fCo.uType==5){//SA-11 battery
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.HQ.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon1.squad2);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon2.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon2.squad2);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon3.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon3.squad2);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon4.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon4.squad2);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon5.squad1);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon5.squad2);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon5.squad3);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon5.squad4);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon5.squad5);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon5.squad6);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon5.squad7);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon5.squad8);
            s_RplnshFrmVicHndlrOneSq(fCo,fCo.platoon5.squad9);
        }
    }
}
function rs_RSpplyVicCarSuppOneIndex(fCo,fSq,sIndex){
    if(fSq.vehicleCarriedSupplies[sIndex]<=((fSq.sTemplate.vehicleCarriedSupplies[sIndex])*.75)&&fCo.supplies[sIndex]>=((fSq.sTemplate.vehicleCarriedSupplies[sIndex])-fSq.vehicleCarriedSupplies[sIndex])){
        fCo.outPost.supplies[sIndex]-=((fSq.sTemplate.vehicleCarriedSupplies[sIndex])-fSq.vehicleCarriedSupplies[sIndex]);
        fSq.vehicleCarriedSupplies[sIndex]=fSq.sTemplate.vehicleCarriedSupplies[sIndex];
    }
}
function rs_RSpplyVicVSuppOneIndex(fCo,fSq,sIndex){
    if(fSq.vSupplies[sIndex]<=((fSq.sTemplate.vSupplies[sIndex])*.75)&&fCo.supplies[sIndex]>=((fSq.sTemplate.vSupplies[sIndex])-fSq.vSupplies[sIndex])){
        fCo.outPost.supplies[sIndex]-=((fSq.sTemplate.vSupplies[sIndex])-fSq.vSupplies[sIndex]);
        fSq.vSupplies[sIndex]=fSq.sTemplate.vSupplies[sIndex];
    }
}
function s_VicRplenFrmCoDpt1Indx(fCo,fSq,sIndex){
    let vicType=fCo.type;
    if(fSq.hasVehicle){
        if(fSq.vehicleCarriedSupplies[sIndex]<=((fSq.sTemplate.vehicleCarriedSupplies[sIndex])*.2)&&fCo.supplies[sIndex]>=((fSq.sTemplate.vehicleCarriedSupplies[sIndex])-fSq.vehicleCarriedSupplies[sIndex])){
            console.log("needs resupply");
            fCo.outPost.supplies[sIndex]-=((fSq.sTemplate.vehicleCarriedSupplies[sIndex])-fSq.vehicleCarriedSupplies[sIndex]);
            fSq.vehicleCarriedSupplies[sIndex]=fSq.sTemplate.vehicleCarriedSupplies[sIndex];
            fSq.hasVehicle=2;
            fSq.vicTimeTillBack=1;
            rs_RSpplyVicCarSuppOneIndex(fCo,fSq,0);
            rs_RSpplyVicCarSuppOneIndex(fCo,fSq,1);
            rs_RSpplyVicCarSuppOneIndex(fCo,fSq,2);
            rs_RSpplyVicCarSuppOneIndex(fCo,fSq,3);
            rs_RSpplyVicCarSuppOneIndex(fCo,fSq,4);
            rs_RSpplyVicCarSuppOneIndex(fCo,fSq,5);
            rs_RSpplyVicCarSuppOneIndex(fCo,fSq,6);
            if(fSq.vehicleGas<(fSq.sTemplate.vehicle.fuelCap*.9)&&fCo.outPost.fuel>=(fSq.sTemplate.vehicle.fuelCap-fSq.vehicleGas)){
                fCo.outPost.fuel-=(fSq.sTemplate.vehicle.fuelCap-fSq.vehicleGas);
                fSq.vehicleGas=fSq.sTemplate.vehicle.fuelCap;
            }
            rs_RSpplyVicVSuppOneIndex(fCo,fSq,0);
            rs_RSpplyVicVSuppOneIndex(fCo,fSq,1);
            rs_RSpplyVicVSuppOneIndex(fCo,fSq,2);
            rs_RSpplyVicVSuppOneIndex(fCo,fSq,3);
            rs_RSpplyVicVSuppOneIndex(fCo,fSq,4);
            rs_RSpplyVicVSuppOneIndex(fCo,fSq,5);
            rs_RSpplyVicVSuppOneIndex(fCo,fSq,6);
            rs_RSpplyVicVSuppOneIndex(fCo,fSq,7);
            fSq.vehicleGas-=(fSq.vehicle.fuelBurn[0]*4);
        }else{
            console.log("doesn't need resupply");
        }        
    }

}
function rs_oneSqVic(fCo,fSq){
    let oldVS=fSq.vSupplies;
    let oldVCS=fSq.vehicleCarriedSupplies;
    rs_RSpplyVicCarSuppOneIndex(fCo,fSq,0);
    rs_RSpplyVicCarSuppOneIndex(fCo,fSq,1);
    rs_RSpplyVicCarSuppOneIndex(fCo,fSq,2);
    rs_RSpplyVicCarSuppOneIndex(fCo,fSq,3);
    rs_RSpplyVicCarSuppOneIndex(fCo,fSq,4);
    rs_RSpplyVicCarSuppOneIndex(fCo,fSq,5);
    rs_RSpplyVicCarSuppOneIndex(fCo,fSq,6);
    rs_RSpplyVicVSuppOneIndex(fCo,fSq,0);
    rs_RSpplyVicVSuppOneIndex(fCo,fSq,1);
    rs_RSpplyVicVSuppOneIndex(fCo,fSq,2);
    rs_RSpplyVicVSuppOneIndex(fCo,fSq,3);
    rs_RSpplyVicVSuppOneIndex(fCo,fSq,4);
    rs_RSpplyVicVSuppOneIndex(fCo,fSq,5);
    rs_RSpplyVicVSuppOneIndex(fCo,fSq,6);
    rs_RSpplyVicVSuppOneIndex(fCo,fSq,7);
    if(fSq.vehicleGas<(fSq.sTemplate.vehicle.fuelCap*.9)&&fCo.outPost.fuel>=(fSq.sTemplate.vehicle.fuelCap-fSq.vehicleGas)){
        fCo.outPost.fuel-=(fSq.sTemplate.vehicle.fuelCap-fSq.vehicleGas);
        fSq.vehicleGas=fSq.sTemplate.vehicle.fuelCap;
    }
    let newVS=fSq.vSupplies;
    let newVCS=fSq.vehicleCarriedSupplies;
    if(oldVS!=newVS||oldVCS!=newVCS){
        fSq.vehicleGas-=(fSq.vehicle.fuelBurn[0]*5);
        fSq.hasVehicle=2;
        fSq.vicTimeTillBack=2;
    }
}
function ss_countdownTillVicBack(fSq){
    if(fSq.hasVehicle==2){
        if(fSq.vicTimeTillBack>0){
            fSq.vicTimeTillBack-=(1/cfg.general.refreshRate);
            if(fSq.vicTimeTillBack<=0){
                fSq.hasVehicle=1;
                fSq.vicTimeTillBack=0;
            };
            
        };
    };
}


// INJURY OR DEATH CHANCE CALCULATIONS

function t_soldierIOrDProbability(primary,secondary,numGrenadesOver2,numRounds,vicType){
    let cDI = [15,.25,.05,.1];
    let cDIWV = [15,.25,.05,.1];
    let cD = [7.5,.125,.025,.05];
    let cDWV = [7.5,.125,.025,.05];
    var percentageBuff=1
    if(primary=="AK74"){
        percentageBuff=1;
    }else if(primary=="PKM"){
        percentageBuff-=.1;
    }else{
        percentageBuff-=.25;
    }
    if(secondary=="GP25"){
        percentageBuff-=.05;
    }else if(secondary=="RPG7"){
        percentageBuff-=.07;
    }else if(secondary=="SA18"){
        percentageBuff-=.35;
    }else{
        
    }
    if(vicType==1){
        percentageBuff-=0;
    }else if(vicType==2){
        percentageBuff-=.15;
    }else if(vicType==3){
        percentageBuff-=.25;
    }else if(vicType==4){
        percentageBuff-=.4;
    }else{

    }
    percentageBuff-=(numGrenadesOver2*.01);
    if(numRounds>90){
        percentageBuff-=(((numRounds-90)/30)*.02);
    }
    console.log(percentageBuff)
    let newCdi=[15*(percentageBuff+.1),.25*(percentageBuff+.1),.05*(percentageBuff+.1),.1*(percentageBuff+.1)];
    let newcDIWV=[15*percentageBuff,.25*percentageBuff,.05*percentageBuff,.1*percentageBuff];
    let newcD =[7.5*(percentageBuff+.1),.125*(percentageBuff+.1),.025*(percentageBuff+.1),.05*(percentageBuff+.1)];
    let newcDWV=[7.5*percentageBuff,.125*percentageBuff,.025*percentageBuff,.05*percentageBuff];
    return[
        newCdi,
        newcDIWV,
        newcD,
        newcDWV
    ]
};
function c_chanceOfIorD(squad,personnelIndex,personNumber,combatType,IorD){
    let profile=squad.personnelProfiles[personnelIndex][personNumber]
    console.log(profile)
    let sType=c_squadVehicleType(squad)
    let chance=100                                            //the chance starts at 100.
    if(squad.hasVehicle==1){                                                                        //checks if the squad vehicle is present. If it is present the individual squad member's risk declines at a rate dependent on the type of vehicle they have. 
        if(sType==1){
            chance -=15;                                                                                                 //Travelling in an unarmored canvas truck offers little protection but much more maneuverability
            console.log("chance has been reduced to "+chance+" because the soldier is in a squad with access to a truck");
        }else if(sType==2){
            chance -=25;                                                                                              //An APC offers more tangible protection, some supporting firepower and also some intimidation. 
            console.log("chance has been reduced to "+chance+" because the soldier is in a squad with access to a BTR");
        }else if(sType==3){
            chance -=35;                                                                                                  //An IFV offers both protection and heavy firepower, being a very intimidating presence. 
            console.log("chance has been reduced to "+chance+" because the soldier is in a squad with access to a BMP");
        }else if(sType==4){
            chance -=70;                                                                                                   //Being in a tank crew means that you have the luxury of being immune to shell fragments and bullets. Very beneficial.
            console.log("chance has been reduced to "+chance+" because the soldier is in a squad that operates a tank");
        }   
    }
    if(squad.personnelProfiles[1][0] != 0){                                                                              //checks if the squad has an active SL. If there is one the mortality rate will be reduced.
        chance-=30;
        console.log("chance has been reduced to "+chance+" because the soldier is in a squad with an SL");
    }
    if(squad.personnelProfiles[5][0] != 0){                                                                             //checks if the squad has an active ASL. If there is one the mortality rate will be reduced, less so than an active SL.
        chance-=15;
        console.log("chance has been reduced to "+chance+" because the soldier is in a squad with an ASL");
    }
    if(squad.personnelProfiles[2][0] != 0){                                                                             //checks if the squad has an active Grenadier. A grenadier offers fire support and thus decreases the squad's chance of dying. 
        if(sType == 1){                                                                                                 //having a grenadier is most crucial for the truck squads as they have no native anti-tank capability for their vehicle. 
            chance -=9;
            console.log("chance has been reduced to "+chance+" because the soldier is in a squad with Grenadier");
        }else if(sType == 2){
            chance -=9;
            console.log("chance has been reduced to "+chance+" because the soldier is in a squad with an Grenadier");
        }
        else if(sType ==3){
            chance -=9;
            console.log("chance has been reduced to "+chance+" because the soldier is in a squad with an Grenadier");
        }
    }
    if(squad.personnelProfiles[4][0] != 0){                                              //checks if the squad has an active MG. A machine gunner offers suppression which can be critical for the squad's defense. Same role as an APC so it has less of an impact.
        if(sType == 1){
            chance -=8;
            console.log("chance has been reduced to "+chance+" because the soldier is in a squad with an MG");
        }else if(sType ==2){
            chance -=8;
            console.log("chance has been reduced to "+chance+" because the soldier is in a squad with an MG");
        }else{
            chance -=8;
            console.log("chance has been reduced to "+chance+" because the soldier is in a squad with an MG");
        }
    }
    if(squad.personnelProfiles[7][0] != 0 || squad.personnelProfiles[7][1] != 0){                                         //checks if the squad has an active MANPADs troop. Having one offers protection from some air attacks. 
        chance-=7.5;
        console.log("chance has been reduced to "+chance+" because the soldier is in a squad with a MANPADS troop");
    }
    if(squad.personnelProfiles[8][0] != 0 || squad.personnelProfiles[8][1] != 0){                                         // checks if the squad has marksmen.
        chance-=10;
        console.log("chance has been reduced to "+chance+" because the soldier is in a squad with a Marksman troop");
    }
    if(squad.personnelProfiles[personnelIndex][personNumber][0]>=91){
        chance-=((profile[0]-90)*.033);
        console.log("chance has been reduced to "+chance+" because the soldier has more than 90 rounds for his AK");
    }
    if(profile[1]>=200){
        chance-=((profile[1]-200)*.01);
        console.log("chance has been reduced to "+chance+" because the soldier has more than 200 rounds for his MG");
    }
    if(profile[2]>=1){
        chance-=((profile[2]-1)*1);
        console.log("chance has been reduced to "+chance+" because the soldier has more than 1 round for his RPG");
    }
    if(profile[3]>=2){
        chance-=((profile[3]-2)*.5);
        console.log("chance has been reduced to "+chance+" because the soldier has more than 2 grenades");
    }
    if(profile[4]>=1){
        chance-=((profile[4]-1)*1);
        console.log("chance has been reduced to "+chance+" because the soldier has a GP25 UBGL at his disposal");
    }
    if(profile[5]>=1){
        chance-=((profile[5]-1)*.5)
        console.log("chance has been reduced to "+chance+" because the soldier has food he can eat")
    }
    if(profile[6]>=.01){
        chance-=((profile[6]-.01)*.01)
        console.log("chance has been reduced to "+chance+" because the soldier has water he can drink")
    }
    if(combatType==1){
        chance=chance
    }else if(combatType==2){
        chance=(chance*.25)
    }else if(combatType==3){ 
        chance=(chance*.025)
    }else{
        chance=(chance*.1)
    }
    if(IorD==2){
        chance==(chance*.25)
    }
    return chance
};
function c_IorDOnePerson(fCo,fSq,fSqIndex,fSqPerson,fWthr,IorD){
    //designed to calculate and return the chance of injury or death for an individual person in a specific squad. 
    if(fSqPerson==0){
        return 0;
    };
    let mByRole=[
        .001,
        .8,
        .9,
        .85,
        .7,
        .85,
        .87,
        .7,
        .5,
        .9,
        .99,
    ];
    let mByCType=[
        0,
        1,
        .2,
        .05,
        .1
    ];
    let mByCloudCover=[
        0,
        1,
        1,
        .98,
        .96,
        .94,
        .92,
        .9,
        .88
    ];
    let mByTimeOfDay=[
        .6,
        .61,
        .62,
        .63,
        .64,
        .65,
        .68,
        .75,
        .8,
        .85,
        .9,
        .95,
        1,
        1,
        1,
        1,
        1,
        1,
        .95,
        9,
        .85,
        .8,
        .6,
        .6,
    ];
    let mByLocationTypeD=[
        1.1,
        .7,
        .5,
        .6,
        .5,
        .6,
        .8,
        .7,
        .6,
        .55
    ];
    let mByLocationTypeO=[
        1.1,
        1.2,
        1.3,
        1.1,
        1.4,
        1.6,
        1.2,
        1.7,
        1.8,
        2
    ];
    let mByTimeSpentInLocationTypeD=[
        2,
        1.95,
        1.925,
        1.9,
        1.875,
        1.85,
        1.825,
        1.8,
        1.775,
        1.75,
        1.725,
        1.7,
        1.675,
        1.65,
        1.625,
        1.6,
        1.675,
        1.55,
        1.525,
        1.5,
        1.475,
        1.45,
        1.425,
        1.4,
        1.375,
        1.35,
        1.325,
        1.3,
        1.275,
        1.25,
        1.225,
        1.2,
        1.175,
        1.15,
        1.125,
        1.1,
        1.075,
        1.05,
        1.025,
        1,
        .975,
        .95,
        .925,
        .9
    ];
    let mByVehicleType=[
        1,
        .95,
        .8,
        .7,
    ];
    let mByArtySupport=[
        1.05,
        .95,
        .9,
        .85
    ];
    let mByIorD=[
        1, //death
        .45 //injury
    ];
    let cIorD=mByRole[fSqIndex];
    cIorD*=mByCType[fCo.status];
    if(fSq.hasVehicle==1){
        cIorD*=mByVehicleType[fCo.type];
        console.log("chance reduced to "+cIorD+" because the person has  direct access to vehicle support");
    };
    cIorD*=mByCloudCover[fWthr.cloudCover];
    console.log("after calculating for cloud cover the chance is "+cIorD)
    if(fCo.status==1){
        if(fCo.AoD==1){
            cIorD*=mByLocationTypeD[fCo.locationType];
            cIorD*=mByTimeSpentInLocationTypeD[fCo.locationType];
            console.log("chance reduced to "+cIorD+" because the person is in a company tasked with defense and they have terrain advantages");
        }else{
            cIorD*=mByLocationTypeO[fCo.locationType];
        }
    }
    cIorD*mByArtySupport[fCo.hasArtillerySupport]
    console.log("chance reduced to "+cIorD+" because the person has  artillery support");
    if(fSq.personnelProfiles[1][0]!=0){
        cIorD*=.8
        console.log("chance reduced to "+cIorD+" because the person is in a squad led by a professional squad leader");
    }
    if(fSq.personnelProfiles[2][0] != 0){
        cIorD*=.9;
        console.log("chance reduced to "+cIorD+" because the person is in a squad that has a machine gunner");
    }
    if(fSq.personnelProfiles[4][0] != 0){
        cIorD*=.95;
        console.log("chance reduced to "+cIorD+" because the person is in a squad that has a machine gunner for support");
    }
    if(fSq.personnelProfiles[8][0] != 0){
        cIorD*=.8;
        console.log("chance reduced to "+cIorD+" because the person is in a squad with sniper support");
    }
    if(fSq.personnelProfiles[7][0] != 0){

        cIorD*=.9;
        console.log("chance reduced to "+cIorD+" because the person is in a squad that has access to MANPADS");
    }
    cIorD*=mByIorD[IorD];
    console.log(cIorD);
    fSq.chanceIorDbyPersonnel[fSqIndex][fSqPerson][IorD]=cIorD;
};
function c_MoraleOnePerson(fBatt,fCo,fSq,fSqIndex,fSqPerson,fWthr){
    
}
function c_IorDOneIndex(fCo,fSq,fSqIndex,fWthr){
    //uses c_IorDOnePerson several times to generate the Injury or Death stats for a squad's profile in runtime.
    c_IorDOnePerson(fCo,fSq,fSqIndex,0,fWthr,0);
    c_IorDOnePerson(fCo,fSq,fSqIndex,0,fWthr,1);
    c_IorDOnePerson(fCo,fSq,fSqIndex,1,fWthr,0);
    c_IorDOnePerson(fCo,fSq,fSqIndex,1,fWthr,1);
    c_IorDOnePerson(fCo,fSq,fSqIndex,2,fWthr,0);
    c_IorDOnePerson(fCo,fSq,fSqIndex,2,fWthr,1);
    c_IorDOnePerson(fCo,fSq,fSqIndex,3,fWthr,0);
    c_IorDOnePerson(fCo,fSq,fSqIndex,3,fWthr,1);
};
function c_IorDOneSquad(fCo,fSq,fWthr){
    //uses CIorDOneIndex several times to update the Injury or Death stats for an entire squad's profile. 
    c_IorDOneIndex(fCo,fSq,0,fWthr);
    c_IorDOneIndex(fCo,fSq,1,fWthr);
    c_IorDOneIndex(fCo,fSq,2,fWthr);
    c_IorDOneIndex(fCo,fSq,3,fWthr);
    c_IorDOneIndex(fCo,fSq,4,fWthr);
    c_IorDOneIndex(fCo,fSq,5,fWthr);
    c_IorDOneIndex(fCo,fSq,6,fWthr);
    c_IorDOneIndex(fCo,fSq,7,fWthr);
    c_IorDOneIndex(fCo,fSq,8,fWthr);
    c_IorDOneIndex(fCo,fSq,9,fWthr);
    c_IorDOneIndex(fCo,fSq,10,fWthr);
};
function c_chanceOfIorDOneMan(squadComp,sVicType,index){

};
function sss_chanceIorDOneSoldier(fBranch,fArmy,fBrigade,fBatt,fCo,fPlt,fSq,fPerson,fWthr){//a subfunction for calculating the injury or death chances of a soldier in a particular squad, platoon, company, battalion, brigade, army and branch in a specific country at a specific time and weather

};

// LOCATIONS AND PROXIMITY 

function s_checkProximityCompany(company1,company2){
    if(company1.long[0]<=company2.long[0]+2 && company.long[0]>=company2.long[0]-2){
        if(company1.long[1]<=company2.long[0]+6 && company.long[1]>=company2.long[0]-6){
            company1.status=2;
            company2.status=2;
            if(company1.long[1]<=company2.long[1]+3 && company.long[0]>=company2.long[0]-3){
                company1.status=1;
                company2.status=1;
            }
        }
    }else{
        company1.status=3;
        company2.status=3;
    }
};
function s_checkProximityLocation(company,location){
    //long string of ifs that checks a company's proximity to a specified location. 
    let isInProximity = 0;
    let proximityPriority = 3;
    if(company.long[0]<=location.long[0]+location.area[0] && company.long[0]>=location.long[0]-location.area[0]){
        if(company.lat[0]<=location.lat[0]+location.area[0] && company.lat[0]>=location.lat[0]-location.area[0]){
            if(location.area[1]!=0||location.area[2]!=0){
                if(company.long[1]<=location.long[1]+location.area[1] && company.long[1]>=location.long[1]-location.area[1]){
                    if(company.lat[1]<=location.lat[1]+location.area[1] && company.lat[1]>=location.lat[1]-location.area[1]){            
                        if(location.area[2]!=0){
                            if(company.long[2]<=location.long[2]+location.area[2] && company.long[2]>=location.long[2]-location.area[2]){
                                if(company.lat[2]<=location.lat[2]+location.area[2] && company.lat[2]>=location.lat[2]-location.area[2]){
                                    isInProximity=1;
                                    proximityPriority=location.priority;
                                }
                            }
                        }else{
                            isInProximity = 1;
                            proximityPriority=location.priority;
                        }
                    }
                }  
            }else{
                isInProximity = 1;
                proximityPriority=location.priority;
            }
        }
    }
    return [
        isInProximity,
        proximityPriority
    ]
};


function ll_compareDecimalCoords(coords1,coords2,area){
    if(coords1>=(coords2-area)&&coords1<=(coords2+area)){
        return 1;
    }else{
        return 0;
    };
};
function ll_checkIfAtLoc(fCo,loc){
    if(ll_compareDecimalCoords(fCo.y,loc[1],loc[3])){
        if(ll_compareDecimalCoords(fCo.x,loc[2],loc[3])){
            return 1;
        }
    }else{
        return 0;
    }

};  
function ll_getLocCo(fCo){
    let locPriority=5;
    let locationName="no location found"
    Theatre.MapFeatures.forEach(
        function checkAllLocations(location){
            if(ll_checkIfAtLoc(fCo,location)){
                if(location[5]<locPriority){
                    locPriority=location[5];
                    locationName=location[0];
                }    
            }
        }
    );
    fCo.locString=locationName;
    if(fCo.locString=="The Baltics"){
        console.log("the coords "+fCo.y+" "+fCo.x+" do not have a detailed enough location for them and thus their movements will be undetailed or break the sim")
    }
}

// TRAVEL
function ss_expendFuelOneVic(fSq,milesTraveled,CCorOR){ 
    fSq.vehicleGas-=(fSq.vehicle.fuelBurn[CCorOR]*milesTraveled);
};
function cf_chkPntAffectsRoute(route){
    //takes a route specified in the param and then looks through all chokepoints to find if
    //any of them are along the route and are damaged or destroyed.
    //if any are and a detour is available, the detour's distance is added.
    //if any are and are destroyed but can be repaired, the chokepoint starts to modify the left for them to be repaired.
    let affectsRoute=0;
    let routePasseable=1;
    while(affectsRoute==0){
        Theatre.ChokePoints.forEach(
            function checkAllArraysInChokepointIndex1(chokepoint){
                chokepoint[1].forEach(
                    function checkIfChokepointArray1PosHasBothNames(chokepointIndex){
                        if((chokepointIndex[0]==route[0]||chokepointIndex[1]==route[0])&&(chokepointIndex[0]==route[1]||chokepointIndex[1]==route[1])){
                            if(chokepoint[4]!=0){
                                affectsRoute=1;
                                console.log("a chokepoint affects the route between "+route[0]+" and "+route[1])
                                if(chokepoint[4]!=0&&chokepoint[4]!=3){
                                    if(chokepoint[6]>chokepoint[3]){
                                        console.log(route[2]);
                                        route[2]-=chokepoint[5];
                                        console.log(route[2]);
                                        routePasseable=1;
                                        affectsRoute=0;
                                        chokepoint[4]=0;
                                        chokepoint[6]=0;
                                    }
                                }
                                if(chokepoint[4]==1&&chokepoint[6]!=0){
                                    chokepoint[6]+=(1/cfg.general.refreshRate);
                                    console.log(chokepoint[0]+" is being repaired and has "+(chokepoint[3]-chokepoint[6])+" hours left to go before it is serviceable")
                                }else if(chokepoint[4]==1&&chokepoint[6]==0){
                                    console.log(route[2]);
                                    route[2]+=chokepoint[5];
                                    console.log(route[2]);
                                    chokepoint[6]+=(1/cfg.general.refreshRate);
                                }else if(chokepoint[4]==2){
                                    routePasseable=0;
                                    chokepoint[6]+=(1/cfg.general.refreshRate);
                                }else if(chokepoint[4]==3){
                                    routePasseable=0;
                                }else if(chokepoint[4]==0){
                                    routePasseable=1;
                                }else{
                                    console.log(chokepoint[0]+" has a damage state that cf_chkPntAffectsRoute is not programmed to handle")
                                }
                                
                            }
                        }
                    }   
                )
            }
        )        
    
    
    
    };
    return[affectsRoute,routePasseable]
};
function cf_chokePointHavingLocName(point,chokepoint){
    let hasPoint = 0;
    for(let i = 0; i < ((chokepoint[1].length)-1); i++){
        if(chokepoint[1][i][0]==point||chokepoint[1][i][1]==point){
            hasPoint = 1;
            console.log(hasPoint+" the location is mentioned");
        }
    }
};
function cf_relevantChokePoints(pointA,pointB,chokepoint){

};
function tt_checkForRelevantChokepoints(pointA,pointB){
    let routeIsUsable = 1;
    let milesAddedToRoute = 0;

}
function cf_destOrDamChokePoints(pointA,pointB){
    /*
        checks if the route between point A and point B has any chokepoints relevant to it, and if so, if they are damaged, and if so, whether they can be repaired and if so, (lol) when they will become available. 
    */
    let routeIsUsable = 1;
    let milesAddedToRoute = 0;
    for(let i = 0; i < ((Theatre.ChokePoints.length)-1); i++){
        if((Theatre.ChokePoints[i][0]==pointA||Theatre.ChokePoints[i][0]==pointB)&&(Theatre.ChokePoints[i][1]==pointA||Theatre.ChokePoints[i][1]==pointB)){
            if(Theatre.ChokePoints[i][2]!=0){//is the chokepoint damaged in a way that will impact travel?
                //if(theatre.ChokePoints[i][])

            }
        }
    }
};
function ss_travelOneVic(squad,pointA,pointB){

}

// MISCELLANIOUS UTILITY

function c_squadVehicleType(squad){
    let vicType=0
        //simple but widely used function that obtains the vehicle type of a squad. Used several times in the calculation of squad database entries. 
        if(squad.vehicle.type==6||squad.vehicle.type==5||squad.vehicle.type==8||squad.vehicle.type==7){
            vicType=1;
        }else if(squad.vehicle.type==3){
            vicType=2;
        }else if(squad.vehicle.type==2||squad.vehicle.type==10||squad.vehicle.type==11||squad.vehicle.type==12||squad.vehicle.type==13||squad.vehicle.type==1||squad.vehicle.type==14){
            vicType=3;
        }else{
            console.log("c_squadVehicleType can't handle the input vehicle type")
        };       
    return vicType
};
function c_randomChanceEvaluator(chance){
    let randomChance = (Math.random()*100)
    if(randomChance>10 &&  randomChance<=(chance+10)){
        return 1
    }else{
        return 0
    } 
};
function q_squadHasSL(squad){
    if(squad.members[1]>=1){
        return 1
    }else{
        return 0
    }
};
function v_squadDBEntry(squad){
    let failMsg = "squad database entry invalid due to ";
    const checkTypes = {
        members:11,
        TroopCarriedSupplies:7,
        vehicleCarriedSupplies:7,
        supplies:7,
        sPHC:7,
        sPHOF:7,
        sPHIR:7,
        sPHP:7
    };
    Object.fromEntries(checkTypes).forEach( //turns checktypes into an array
        function([type,length]){             // runs the below function on each item in the array with one param consisting of an array with 2 parts, the name of the key (ex. members) and the value, (ex. 11)
            if(squad[type].length != length){ //checks for the length matching up with the specified value
                console.log(failMsg+" "+type+" being "+squad[type].length+" instead of "+length); //returns a failure message if it doesn't
            }
        }
    );
    /*
    if(squad.members.length != 11){
        console.log(failMsg+"members being "+squad.members.length+" instead of 11")
    }else if(squad.TroopCarriedSupplies.length != 7){
        console.log(failMsg+" TroopCarriedSupplies being "+squad.TroopCarriedSupplies.length+" instead of 7")
    }else if(squad.vehicleCarriedSupplies.length != 7){
        console.log(failMsg+"vehicleCarriedSupplies being "+squad.vehicleCarriedSupplies.length+" instead of 7")
    }else if(squad.supplies.length != 7){
        console.log(failMsg+"supplies being "+squad.supplies.length+" instead of 7")       
    }else if(squad.sPHC.length != 7){
        console.log(failMsg+"sPHC being "+squad.sPHC.length+" instead of 7")               
    }else if(squad.sPHOF.length != 7){
        console.log(failMsg+"sPHOF being "+squad.sPHOF.length+" instead of 7")       
    }else if(squad.sPHIR.length !=7){
        console.log(failMsg+"sPHIR being "+squad.sPHIR.length+" instead of 7")
    }else if(squad.sPHP.length !=7){
        console.log(failMsg+"sPHP being "+squad.sPHP.length+" instead of 7")
    */
    if(squad.vehicleCarriedSupplies[6]!= squad.vehicle.supplies[6]*DB.components.supplies.S_DrinkingWaterContainer.roundsInCrate){
        console.log(failMsg+"the water in gallons not being multiplied correctly by the value of the drinking container water contents");
    };
};
function v_personnelDBEntry(squad){
    let failMsg = "squad database entry invalid due to ";
    const checkTypes = {
        suppliesPerHourCombat:7,
        suppliesPerHourOnFront:7,
        suppliesPerHourInReserve:7,
        suppliesPerHourPolicing:7,
        cDI:4,
        cDIWV:4,
        cD:4,
        cDWV:4
    };
    Object.fromEntries(checkTypes).forEach( //turns checktypes into an array
        function([type,length]){             // runs the below function on each item in the array with one param consisting of an array with 2 parts, the name of the key (ex. members) and the value, (ex. 11)
            if(squad[type].length != length){ //checks for the length matching up with the specified value
                console.log(failMsg+" "+type+" being "+squad[type].length+" instead of "+length); //returns a failure message if it doesn't
            }
        }
    );
};
function g_sqPersonsByIndex(squad,squadIndex){
    let numPersonnel=0;
    if(squad.personnelProfiles[squadIndex][0]!=0){
        numPersonnel++;
    }
    if(squad.personnelProfiles[squadIndex][1]!=0){
        numPersonnel++;
    }
    if(squad.personnelProfiles[squadIndex][2]!=0){
        numPersonnel++;
    }
    if(squad.personnelProfiles[squadIndex][3]!=0){
        numPersonnel++;
    }
    return numPersonnel;
};
function c_sqSPHRuntime(fSq){
    //packages the combined sph of all indexes in a squad to one array with the totals. 
    let a = fSq.personnelSPHByIndex[0][0]+fSq.personnelSPHByIndex[1][0]+fSq.personnelSPHByIndex[2][0]+fSq.personnelSPHByIndex[3][0]+fSq.personnelSPHByIndex[4][0]+fSq.personnelSPHByIndex[5][0]+fSq.personnelSPHByIndex[6][0]+fSq.personnelSPHByIndex[7][0]+fSq.personnelSPHByIndex[8][0]+fSq.personnelSPHByIndex[9][0]+fSq.personnelSPHByIndex[10][0]+fSq.personnelSPHByIndex[11][0];
    let b = fSq.personnelSPHByIndex[0][1]+fSq.personnelSPHByIndex[1][1]+fSq.personnelSPHByIndex[2][1]+fSq.personnelSPHByIndex[3][1]+fSq.personnelSPHByIndex[4][1]+fSq.personnelSPHByIndex[5][1]+fSq.personnelSPHByIndex[6][1]+fSq.personnelSPHByIndex[7][1]+fSq.personnelSPHByIndex[8][1]+fSq.personnelSPHByIndex[9][1]+fSq.personnelSPHByIndex[10][1]+fSq.personnelSPHByIndex[11][1];
    let c = fSq.personnelSPHByIndex[0][2]+fSq.personnelSPHByIndex[1][2]+fSq.personnelSPHByIndex[2][2]+fSq.personnelSPHByIndex[3][2]+fSq.personnelSPHByIndex[4][2]+fSq.personnelSPHByIndex[5][2]+fSq.personnelSPHByIndex[6][2]+fSq.personnelSPHByIndex[7][2]+fSq.personnelSPHByIndex[8][2]+fSq.personnelSPHByIndex[9][2]+fSq.personnelSPHByIndex[10][2]+fSq.personnelSPHByIndex[11][2];
    let d = fSq.personnelSPHByIndex[0][3]+fSq.personnelSPHByIndex[1][3]+fSq.personnelSPHByIndex[2][3]+fSq.personnelSPHByIndex[3][3]+fSq.personnelSPHByIndex[4][3]+fSq.personnelSPHByIndex[5][3]+fSq.personnelSPHByIndex[6][3]+fSq.personnelSPHByIndex[7][3]+fSq.personnelSPHByIndex[8][3]+fSq.personnelSPHByIndex[9][3]+fSq.personnelSPHByIndex[10][3]+fSq.personnelSPHByIndex[11][3];
    let e = fSq.personnelSPHByIndex[0][4]+fSq.personnelSPHByIndex[1][4]+fSq.personnelSPHByIndex[2][4]+fSq.personnelSPHByIndex[3][4]+fSq.personnelSPHByIndex[4][4]+fSq.personnelSPHByIndex[5][4]+fSq.personnelSPHByIndex[6][4]+fSq.personnelSPHByIndex[7][4]+fSq.personnelSPHByIndex[8][4]+fSq.personnelSPHByIndex[9][4]+fSq.personnelSPHByIndex[10][4]+fSq.personnelSPHByIndex[11][4];
    let f = fSq.personnelSPHByIndex[0][5]+fSq.personnelSPHByIndex[1][5]+fSq.personnelSPHByIndex[2][5]+fSq.personnelSPHByIndex[3][5]+fSq.personnelSPHByIndex[4][5]+fSq.personnelSPHByIndex[5][5]+fSq.personnelSPHByIndex[6][5]+fSq.personnelSPHByIndex[7][5]+fSq.personnelSPHByIndex[8][5]+fSq.personnelSPHByIndex[9][5]+fSq.personnelSPHByIndex[10][5]+fSq.personnelSPHByIndex[11][5];
    let g = fSq.personnelSPHByIndex[0][6]+fSq.personnelSPHByIndex[1][6]+fSq.personnelSPHByIndex[2][6]+fSq.personnelSPHByIndex[3][6]+fSq.personnelSPHByIndex[4][6]+fSq.personnelSPHByIndex[5][6]+fSq.personnelSPHByIndex[6][6]+fSq.personnelSPHByIndex[7][6]+fSq.personnelSPHByIndex[8][6]+fSq.personnelSPHByIndex[9][6]+fSq.personnelSPHByIndex[10][6]+fSq.personnelSPHByIndex[11][6];
    return [a,b,c,d,e,f,g];
};
function s_updateSquadProfile(fCo,fSq,fWthr){
    c_IorDOneSquad(fCo,fSq,fWthr);
    c_infSPHOneSquad(fCo,fSq,fWthr);
};
function u_countMenPerBTG(BTG){
    let APCs = 0;
    let IFVs = 0;
    let MBTs = 0;
    let SPAs = 0;
    let MRLs = 0;
    let cargoTrucks = 0;
    let fuelTrucks = 0;
    let waterTrucks = 0;
    let infantry = 0;
    let crewmen = 0;
    let pogues = 0;
    if(BTG.type==1){
        BTG.HQ.platoon1.squad1.personnelProfiles[0].forEach(
            function addupCrewmen(crewman){
                if(crewman!=0){
                    crewmen++;
                }
            }
        );
        BTG.HQ.platoon1.squad1.personnelProfiles[1].forEach(
            function addupCrewmen(sl){
                if(sl!=0){
                    infantry++;
                }
            }
        );
    }
};
function mu_tallyPersonnelInCat(squadPersonnelCat){
    let personnel = 0;
    squadPersonnelCat.forEach(
        function addupCrewmen(crewman){
            if(crewman!=0){
                personnel++;
            }
        }
    );
    return personnel;    
}

// FUNCTIONS AFFECTING THE PLAYER //
function c_SAMSysSkillLvl(SAMBat){
    let SAMSkill=1.5;
    if(SAMBat.uType==5){
        if(SAMBat.HQ.squad1.hasVehicle!=0){
            SAMSkill+=.75;
        };
        if(SAMBat.platoon5.squad4.hasVehicle!=0){
            SAMSkill+=.35;
        };
        if(SAMBat.platoon5.squad4.hasVehicle!=0){
            SAMSkill+=.25;
        };
        if(SAMBat.platoon5.squad5.hasVehicle!=0){
            SAMSkill+=.25;
        };
        if(SAMBat.platoon5.squad6.hasVehicle!=0){
            SAMSkill+=.25;
        };
        if(SAMBat.platoon5.squad7.hasVehicle!=0){
            SAMSkill+=.25;
        };
        if(SAMBat.platoon5.squad8.hasVehicle!=0){
            SAMSkill+=.25;
        };
        if(SAMBat.platoon5.squad9.hasVehicle!=0){
            SAMSkill+=.3;
        };
    }else if(SAMBat.uType==4){
        if(SAMBat.HQ.squad1.hasVehicle!=0){
            SAMSkill+=1;
        };
        if(SAMBat.platoon3.squad2.hasVehicle!=0){
            SAMSkill+=.5;
        };
        if(SAMBat.platoon3.squad3.hasVehicle!=0){
            SAMSkill+=.25;
        };
        if(SAMBat.platoon3.squad4.hasVehicle!=0){
            SAMSkill+=.5;
        };
        if(SAMBat.platoon3.squad5.hasVehicle!=0){
            SAMSkill+=.25
        }
    }else{
        console.log(SAMBat.uType+" is not currently a uType that c_SAMSysSkillLvl can handle")
    }
    if(SAMSkill < 2){
        SAMBat.skill="average";
    }
    if(SAMSkill>=2){
        SAMBat.skill="good";
    };
    if(SAMBat>=3){
        SAMBat.skill="high";
    };
    if(SAMBat>=4){
        SAMBat.skill="excellent";
    }

}
//// FUNCTIONS TO BE EXECUTED IN RUNTIME
let runtimeVariables ={
    date:cfg.environment.startDate,
    time:cfg.environment.startTime,    
};
//ak74 w bipod and suppressor is 9.21
//ak74 w/o bipod and suppressor is 10.254
//ak74 w/o bipod and suppressor is 54.529
//SVD w bipod suppressor is 64
//SVD w bipod, suppressor and thermal nods is 82