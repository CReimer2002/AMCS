
import AMil from "./AMil.js";
import DB from "./DB.js";
import Weather from "./Weather.js";
import Theatre from "./Caucasus.js";
import cfg from "./simConfig.js";
import simConfig from "./simConfig.js";
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
let runtimeVariables ={
    date:cfg.environment.startDate,
    time:1200,
    recentRain:1,
    //time:cfg.environment.startTime,
    refreshNumber:cfg.general.refreshNumber,
    currentWeather:cfg.environment.startTime,    
};
function vc_railAccessory(person,terrain,wepIndx){//determine the value of a rail accessory
    let subWeight=0;
    let subPower=0;
    let subCumeYards=0;
    if(wepIndx==0){//primary
        if((person.primary.railAccessory!=0)&&((person.primary.mounts[1]==1)||(person.primary.mounts[2]==1))){//rail mounted accessory handler 
            subWeight+=person.primary.railAccessory.weight;
            if(mu_isNight()&&person.kit.nods!=0){//if it is night time and the person has NODS
                if((person.kit.nods.type>0)&&(person.kit.nods.type<4)){//if the person has night vision and can use IR lights
                    if(person.primary.railAccessory.features[2]!=0){
                        subPower+=cfg.multipliers.personnel.weapons.guns.gVBBIRLight;                            
                    }
                    if(person.primary.railAccessory.features[3]!=0){
                        subPower+=cfg.multipliers.personnel.weapons.guns.gVBBIRLaser;                                   
                    }
                }
            }else if((mu_isNight())){//it is night time but they don't have Nods or they have thermals, in which case they don't need lights
                if(person.primary.railAccessory.features[0]!=0){
                    subPower+=cfg.multipliers.personnel.weapons.guns.gVBBWhiteLight;                             
                }
                if(person.primary.railAccessory.features[1]!=0){
                    subPower+=cfg.multipliers.personnel.weapons.guns.gVBBLaser;                                  
                }
            }        
        };
    }else if(wepIndx==1){//secondary
        if((person.secondary.railAccessory!=0)&&((person.secondary.mounts[1]==1)||(person.secondary.mounts[2]==1))){//rail mounted accessory handler 
            subWeight+=person.secondary.railAccessory.weight;
            if(mu_isNight()&&person.kit.nods!=0){//if it is night time and the person has NODS
                if((person.kit.nods.type>0)&&(person.kit.nods.type<4)){//if the person has night vision and can use IR lights
                    if(person.secondary.railAccessory.features[2]!=0){
                        subPower+=cfg.multipliers.personnel.weapons.guns.gVBBIRLight;                            
                    }
                    if(person.secondary.railAccessory.features[3]!=0){
                        subPower+=cfg.multipliers.personnel.weapons.guns.gVBBIRLaser;                                   
                    }
                }
            }else if((mu_isNight())){//it is night time but they don't have Nods or they have thermals, in which case they don't need lights
                if(person.secondary.railAccessory.features[0]!=0){
                    subPower+=cfg.multipliers.personnel.weapons.guns.gVBBWhiteLight;                             
                }
                if(person.secondary.railAccessory.features[1]!=0){
                    subPower+=cfg.multipliers.personnel.weapons.guns.gVBBLaser;                                  
                }
            }        
        };
    }
    return{
        totalWeight:subWeight,
        totalPower:subPower,
        totalYards:subCumeYards
    };
};
function vc_uBGL(person,terrain,wepIndex){
    let weaponWeight=0;
    let restAmmoWeight=0;
    let subAPPoints=0;
    let subAVPoints=0;
    if(wepIndex==0){
        if(person.primary.uBGL!=0){//check for presence of a uBGL
            weaponWeight+=person.primary.uBGL.weight;
            if(person.primary.uBGLAmmunition[1]!=0){
                weaponWeight+=person.primary.uBGLAmmunition[0].weight;
                restAmmoWeight=(person.primary.uBGLAmmunition[0].weight*(person.primary.uBGLAmmunition[1]-1));
                subAPPoints+=(person.primary.uBGLAmmunition[0].lethalRadius*cfg.multipliers.personnel.weapons.grenades.gr_BBLethalRadiusBTerrain[terrain[5]]);
                subAPPoints+=(person.primary.uBGLAmmunition[0].range*cfg.multipliers.personnel.weapons.grenades.gr_APPBYardThrowable);
            };
        };
    }else if(wepIndex==1){
        if(person.secondary.uBGL!=0){//check for presence of a uBGL
            weaponWeight+=person.secondary.uBGL.weight;
            if(person.secondary.uBGLAmmunition[1]!=0){
                weaponWeight+=person.secondary.uBGLAmmunition[0].weight;
                restAmmoWeight=(person.secondary.uBGLAmmunition[0].weight*(person.secondary.uBGLAmmunition[1]-1));
                subAPPoints+=(person.secondary.uBGLAmmunition[0].lethalRadius*cfg.multipliers.personnel.weapons.grenades.gr_BBLethalRadiusBTerrain[terrain[5]]);
                subAPPoints+=(person.secondary.uBGLAmmunition[0].range*cfg.multipliers.personnel.weapons.grenades.gr_APPBYardThrowable);
            };
        };
    }
    return{
        uBGLWeight:weaponWeight,
        otherAmmoWeight:restAmmoWeight,
        totalAVPoints:subAVPoints,
        totalAPPoints:subAPPoints
    }
}
function vc_gripMod(person,terrain,wepIndex){//determine the value of a grip mod
    let subWeight=0;
    let subCumeYards=0;
    let subPower=0;   
    if(wepIndex==0){
        if(person.primary.gripMod!=0){
            if(person.primary.gripMod.mountStyle==person.primary.name.railStyle){
                subWeight+=person.primary.gripMod.weight;
                subCumeYards+=cfg.multipliers.personnel.weapons.guns.gRangeBByGripType[person.primary.gripMod.type];                         
            } 
        };
    }else if(wepIndex==1){
        if(person.secondary.gripMod!=0){
            if(person.secondary.gripMod.mountStyle==person.secondary.name.railStyle){
                subWeight+=person.secondary.gripMod.weight;
                subCumeYards+=cfg.multipliers.personnel.weapons.guns.gRangeBByGripType[person.secondary.gripMod.type];                         
            } 
        };   
    }else if(wepIndex==2){
        if(person.special.gripMod!=0){
            if(person.special.gripMod.mountStyle==person.special.name.railStyle){
                subWeight+=person.special.gripMod.weight;
                subCumeYards+=cfg.multipliers.personnel.weapons.guns.gRangeBByGripType[person.special.gripMod.type];                         
            } 
        };   
    }
    return{
        totalWeight:subWeight,
        totalPower:subPower,
        totalYards:subCumeYards
    };
};
function vc_suppressor(person,terrain,wepIndex,subShotVolume){
    let subWeight=0;
    let subCumeYards=0;
    let subPower=0;         
    let subLength=0;
    let newShotVolume = subShotVolume
    if(wepIndex==0){
        if(person.primary.suppressor!=0){//module that handles suppressors
            if(person.primary.suppressor.mountStyle==person.primary.name.suppressorMountStyle){
                subLength+=person.primary.suppressor.length;
                subWeight+=person.primary.suppressor.weight;
                newShotVolume-=(person.primary.suppressor.reportReduction);                
            }else{
                console.log(person.name+" has an incompatible suppressor on their "+person.primary.name.name);
            }

        };
    }else if(wepIndex==1){
        if(person.secondary.suppressor!=0){//module that handles suppressors
            if(person.secondary.suppressor.mountStyle==person.secondary.name.suppressorMountStyle){
                subLength+=person.secondary.suppressor.length;
                subWeight+=person.secondary.suppressor.weight;
                newShotVolume-=(person.secondary.suppressor.reportReduction);
            }else{
                console.log(person.name+" has an incompatible suppressor on their "+person.secondary.name.name);
            }
        };
    }
    return{
        totalWeight:subWeight,
        totalPower:subPower,
        totalYards:subCumeYards,
        totalLength:subLength,
        totalShotVolume:newShotVolume
    };
};
function vsc_NightSightHandler(time,person,subYardRange,weaponIndex){
    let newYardRange=subYardRange;
    if(mu_isNight(time)){
        if(weaponIndex==0){
            if(person.kit.nods.type>=person.primary.optic.NVG){
                if(person.kit.nods.type<4){
                    newYardRange=cfg.multipliers.personnel.weapons.guns.gRangeByOpticNODAtNight[person.kit.nods.type];
                }else{
                    newYardRange*=(cfg.multipliers.personnel.weapons.guns.thermalSightRangeBuff)
                }
                newYardRange*=cfg.multipliers.personnel.weapons.guns.eByEyepieceType[person.kit.nods.lType];
            }else{
                if(person.primary.optic.NVG<4){//if the optic isn't thermal
                    newYardRange=(cfg.multipliers.personnel.weapons.guns.gRangeByOpticNODAtNight[person.primary.optic.NVG])
                    newYardRange+=((person.primary.optic.mag-1)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticMag);
                    newYardRange+=((person.primary.optic.obj-20)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticPic);                            
                }else{//it's thermal so it gets a buff instead of a set decreased range
                    newYardRange*=(cfg.multipliers.personnel.weapons.guns.thermalSightRangeBuff*cfg.multipliers.personnel.weapons.guns.eByEyepieceType[1]);
                    newYardRange+=((person.primary.optic.mag-1)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticMag);
                    newYardRange+=((person.primary.optic.obj-20)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticPic);
                }
            }
        }else if(weaponIndex==1){
            if(person.kit.nods.type>=person.secondary.optic.NVG){
                if(person.kit.nods.type<4){
                    newYardRange=cfg.multipliers.personnel.weapons.guns.gRangeByOpticNODAtNight[person.kit.nods.type];
                }else{
                    newYardRange*=(cfg.multipliers.personnel.weapons.guns.thermalSightRangeBuff)
                }
                newYardRange*=cfg.multipliers.personnel.weapons.guns.eByEyepieceType[person.kit.nods.lType];
            }else{
                if(person.secondary.optic.NVG<4){//if the optic isn't thermal
                    newYardRange=(cfg.multipliers.personnel.weapons.guns.gRangeByOpticNODAtNight[person.secondary.optic.NVG])
                    newYardRange+=((person.secondary.optic.mag-1)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticMag);
                    newYardRange+=((person.secondary.optic.obj-20)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticPic);                            
                }else{//it's thermal so it gets a buff instead of a set decreased range
                    newYardRange*=(cfg.multipliers.personnel.weapons.guns.thermalSightRangeBuff*cfg.multipliers.personnel.weapons.guns.eByEyepieceType[1]);
                    newYardRange+=((person.secondary.optic.mag-1)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticMag);
                    newYardRange+=((person.secondary.optic.obj-20)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticPic);
                }
            }
        }else if(weaponIndex==2){
            if(person.kit.nods.type>=person.special.optic.NVG){
                if(person.kit.nods.type<4){
                    newYardRange=cfg.multipliers.personnel.weapons.guns.gRangeByOpticNODAtNight[person.kit.nods.type];
                }else{
                    newYardRange*=(cfg.multipliers.personnel.weapons.guns.thermalSightRangeBuff)
                }
                newYardRange*=cfg.multipliers.personnel.weapons.guns.eByEyepieceType[person.kit.nods.lType];
            }else{
                if(person.special.optic.NVG<4){//if the optic isn't thermal
                    newYardRange=(cfg.multipliers.personnel.weapons.guns.gRangeByOpticNODAtNight[person.special.optic.NVG])
                    newYardRange+=((person.special.optic.mag-1)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticMag);
                    newYardRange+=((person.special.optic.obj-20)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticPic);                            
                }else{//it's thermal so it gets a buff instead of a set decreased range
                    newYardRange*=(cfg.multipliers.personnel.weapons.guns.thermalSightRangeBuff*cfg.multipliers.personnel.weapons.guns.eByEyepieceType[1]);
                    newYardRange+=((person.special.optic.mag-1)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticMag);
                    newYardRange+=((person.special.optic.obj-20)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticPic);
                }
            }
        }
    }else{
        if(weaponIndex==0){
            newYardRange+=((person.primary.optic.mag-1)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticMag);
            newYardRange+=((person.primary.optic.obj-20)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticPic);
        }else if(weaponIndex==1){
            newYardRange+=((person.secondary.optic.mag-1)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticMag);
            newYardRange+=((person.secondary.optic.obj-20)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticPic);
        }else if(weaponIndex==2){
            newYardRange+=((person.special.optic.mag-1)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticMag);
            newYardRange+=((person.special.optic.obj-20)*cfg.multipliers.personnel.weapons.guns.gRangeBuffByOpticPic);
        };
    }
    return{
        newYardage:newYardRange,
    };
};
function vssc_HelmetEvaluator(person,subYardage){
    if(person.kit.helmet!=0){
        if(person.kit.helmet.opticMount==1){
            subYardage*=1.25;
        }
    }
    return{
        newYardage:subYardage
    }
}
function vsc_NoSightHandler(time,person,subYardRange){
   let subSubYardage=subYardRange;
   if(mu_isNight(time)){
        if(person.kit.nods!=0){
            if(person.kit.nods.type<4){
                subSubYardage=cfg.multipliers.personnel.weapons.guns.gRangeByOpticNODAtNight[person.kit.nods.type];
                console.log("because the person has nods and they aren't thermal, the new yardage is "+subSubYardage);
            }else{
                subSubYardage*=(cfg.multipliers.personnel.weapons.guns.thermalSightRangeBuff)
                console.log("because the person has nods and they are thermal, the new yardage is "+subSubYardage);
            }
            subSubYardage*=cfg.multipliers.personnel.weapons.guns.eByEyepieceType[person.kit.nods.lType];
            console.log("because of the nod lense type, the new yardage is "+subSubYardage);
            subSubYardage=vssc_HelmetEvaluator(person,subSubYardage).newYardage;
            console.log("after helmet evaluator the yardage is "+subSubYardage);
        }else{
            subSubYardage=cfg.multipliers.personnel.weapons.general.visionNoNodsOrOpticAtNight;
            console.log("because the person has no nods, the new yardage is "+subSubYardage);
        }
    }
    return{
        finalYardRange:subSubYardage
    }
}
function vc_weaponOptic(time,person,weapType,yardRange){
    let opticWeight=0;
    let newYardRange=yardRange;
    if(weapType==0){//primary
        if((person.primary.name!=0)&&(person.primary.optic!=0)){
            if(person.primary.optic.mountStyle==person.primary.name.opticMountStyle){
                newYardRange=(vsc_NightSightHandler(time,person,newYardRange,0).newYardage);
                opticWeight=person.primary.optic.weight;
            };     
        }else if((person.primary.name!=0)&&(person.primary.optic==0)){
            newYardRange=(vsc_NoSightHandler(time,person,newYardRange).finalYardRange)
        }
    }else if(weapType==1){//secondary
        if((person.secondary.name!=0)&&(person.secondary.optic!=0)){
            if(person.secondary.optic.mountStyle==person.secondary.name.opticMountStyle){
                newYardRange=(vsc_NightSightHandler(time,person,newYardRange,1).newYardage);
                opticWeight=person.secondary.optic.weight;                  
            }               
        }else if((person.secondary.name!=0)&&(person.secondary.optic==0)){
            newYardRange=(vsc_NoSightHandler(time,person,newYardRange).finalYardRange)
        }
    }else if(weapType==2){//specialty
        if((person.special.name!=0)&&(person.special.optic!=0)){
            if(person.special.optic.mountStyle==person.special.name.opticMountStyle){
                newYardRange=(vsc_NightSightHandler(time,person,newYardRange,2).newYardage);
                opticWeight=person.special.optic.weight;                
            }          
        }else if((person.special.name!=0)&&(person.special.optic==0)){
            newYardRange=(vsc_NoSightHandler(time,person,newYardRange).finalYardRange)
        }
    }else{
        console.log("vc_weaponOptic is being fed the value "+weapType+", a weapType it was not designed to handle")
    }
    newYardRange*=(cfg.environment.clearDayVis/runtimeVariables.currentWeather.vis);//finally, check the visibility and see if all that optic zoom can actually be useful
    return{
        finalYardRange:newYardRange,
        addedWeight:opticWeight
    };
        
};
function vc_lmgSuitability(person,terrain,wepIndex,subYardage){
    let APPointsBonus=0;
    if((person.status.specialty=="11BC")||(person.status.specialty=="18B")){//if they are an automatic rifleman, this is a sim-side MOS and not real.
        /* As I need to tell a computer how an LMG works, it's usage as a machine gun will be based on the 
            MOS of the person using it, which is flawed, IK. It's utility as a SAW or MG will only be considered
            if the person using it is a machine gunnner. I am including terrain in the params in case I later decide
            to expand on this module. 
        */
        if(wepIndex==0){
            if(person.primary.ammunition[1]>90){//they need a lot of ammunition if they will be trying to suppress
                APPointsBonus+=(person.primary.name.rateOfFire*cfg.multipliers.personnel.weapons.guns.APLMGBBFireRate);
                console.log(APPointsBonus+" added for LMG with fire rate");
                APPointsBonus+=(person.primary.name.caliber.bWeight*cfg.multipliers.personnel.weapons.guns.APBBRoundWeight);
                console.log(APPointsBonus+" added for LMG with bullet weight");
                APPointsBonus+=(person.primary.mag.capacity*cfg.multipliers.personnel.weapons.guns.APBBMagSize);
                console.log(APPointsBonus+" added for LMG with mag cap");
            }
        }else if(wepIndex==1){
            if(person.secondary.ammunition[1]>90){//they need a lot of ammunition if they will be trying to suppress
                APPointsBonus+=(person.secondary.name.rateOfFire*cfg.multipliers.personnel.weapons.guns.APLMGBBFireRate);
                console.log(APPointsBonus+" added for LMG with fire rate");
                APPointsBonus+=(person.secondary.name.caliber.bWeight*cfg.multipliers.personnel.weapons.guns.APBBRoundWeight);
                console.log(APPointsBonus+" added for LMG with bullet weight");
                APPointsBonus+=(person.secondary.mag.capacity*cfg.multipliers.personnel.weapons.guns.APBBMagSize);
                console.log(APPointsBonus+" added for LMG with mag cap");
            }
        };

    }
    return{
        totalAAPoints:0,
        totalAVPoints:0,
        totalAPPoints:APPointsBonus
    }
};
function vc_primary(time,terrain,person){
    let Weight = 0;
    let AAPoints = 0;
    let AVPoints = 0;
    let APPoints = 0;
    let Length=0;
    let Yardage=0;
    let Pen=0;
    let ShotVolume=0;
    if(person.primary.name!=0){
        Weight+=person.primary.name.weight;
        Length+=person.primary.name.length;
        Weight+=(vc_uBGL(person,terrain,0).uBGLWeight);//add up attachment weights first, regardless of whether or not they have ammo
        Weight+=(vc_railAccessory(person,terrain,0).totalWeight);
        Weight+=(vc_gripMod(person,terrain,0).totalWeight);
        Weight+=(vc_suppressor(person,terrain,0).totalWeight);
        Weight+=(vc_weaponOptic(time,person,0,Yardage).addedWeight);
        if(person.primary.ammunition[0]==person.primary.name.caliber){//check for ammunition compatibility
            Weight+=(person.primary.mag.weight);//add ammunition weight if it matches
            Weight+=(person.primary.name.caliber.weight*person.primary.mag.capacity);
                if(person.primary.ammunition[1]>30){//make sure they have plenty of ammo, if they do, then finally start adding up bonuses
                    Pen+=person.primary.name.caliber.pen;
                    Yardage+=person.primary.name.eRange;
                    ShotVolume=person.primary.name.shotDB;
                    AAPoints+=(vc_railAccessory(person,terrain,0).totalPower);
                    Yardage+=(vc_railAccessory(person,terrain,0).totalYards);
                    APPoints+=(vc_uBGL(person,terrain,0).totalAPPoints);
                    AVPoints+=(vc_uBGL(person,terrain,0).totalAVPoints);
                    APPoints+=(vc_gripMod(person,terrain,0).totalPower);
                    Yardage+=(vc_gripMod(person,terrain,0).totalYards);
                    APPoints+=(vc_suppressor(person,terrain,0,ShotVolume).totalPower);
                    Yardage+=(vc_suppressor(person,terrain,0,ShotVolume).totalYards);
                    Length+=(vc_suppressor(person,terrain,0,ShotVolume).totalLength);
                    ShotVolume=(vc_suppressor(person,terrain,0,ShotVolume).totalShotVolume);
                    Yardage=(vc_weaponOptic(time,person,0,Yardage).finalYardRange);
                    APPoints+=(Yardage*cfg.multipliers.personnel.weapons.guns.gBuffByYByTType[terrain[5]]);
                    if(person.primary.name.MOA<5){
                        APPoints+=((5-person.primary.name.MOA)*cfg.multipliers.personnel.weapons.guns.APBBMOALowerThan5);
                    };
                    APPoints+=(vc_lmgSuitability(person,terrain,0,Yardage).totalAPPoints);
                    APPoints-=(Weight*cfg.multipliers.personnel.weapons.guns.gDBuffByLb);
                    Weight+=(person.primary.name.caliber.weight*(person.primary.ammunition[1]-person.primary.mag.capacity));//it matters how much the ammo weighs but the rounds not in the mag don't affect the weapon's weight. 
                    Weight+=(person.primary.mag.weight*(person.primary.ammunition[1]/person.primary.mag.capacity));//add up the weight of all the mags too
                    APPoints-=(Length*cfg.multipliers.personnel.weapons.guns.gLengthDBuffByTType[terrain[5]]);
                    AVPoints+=(Pen*cfg.multipliers.personnel.weapons.general.AVPointsByMMPen);
                    APPoints-=(ShotVolume*cfg.multipliers.personnel.weapons.general.APPointsDBBDecibel);
                };
        }
    }

    return{
        totalWeight:Weight,
        totalAAPoints:AAPoints,
        totalAVPoints:AVPoints,
        totalAPPoints:APPoints
    }
};
function vc_secondary(time,terrain,person){
    let Weight = 0;
    let AAPoints = 0;
    let AVPoints = 0;
    let APPoints = 0;
    let Length=0;
    let Yardage=0;
    let Pen=0;
    let ShotVolume=0;
    if(person.secondary.name!=0){
        Weight+=person.secondary.name.weight;
        Length+=person.secondary.name.length;
        Weight+=(vc_uBGL(person,terrain,1).uBGLWeight);//add up attachment weights first, regardless of whether or not they have ammo
        Weight+=(vc_railAccessory(person,terrain,1).totalWeight);
        Weight+=(vc_gripMod(person,terrain,1).totalWeight);
        Weight+=(vc_suppressor(person,terrain,1).totalWeight);
        Weight+=(vc_weaponOptic(time,person,1,Yardage).addedWeight);
        if(person.secondary.ammunition[0]==person.secondary.name.caliber){//check for ammunition compatibility
            Weight+=(person.secondary.mag.weight);//add ammunition weight if it matches
            Weight+=(person.secondary.name.caliber.weight*person.primary.mag.capacity);
                if(person.secondary.ammunition[1]>30){//make sure they have plenty of ammo, if they do, then finally start adding up bonuses
                    Pen+=person.secondary.name.caliber.pen;
                    Yardage+=person.secondary.name.eRange;
                    ShotVolume=person.secondary.name.shotDB;
                    AAPoints+=(vc_railAccessory(person,terrain,1).totalPower);
                    Yardage+=(vc_railAccessory(person,terrain,1).totalYards);
                    APPoints+=(vc_uBGL(person,terrain,1).totalAPPoints);
                    AVPoints+=(vc_uBGL(person,terrain,1).totalAVPoints);
                    APPoints+=(vc_gripMod(person,terrain,1).totalPower);
                    Yardage+=(vc_gripMod(person,terrain,1).totalYards);
                    APPoints+=(vc_suppressor(person,terrain,1,ShotVolume).totalPower);
                    Yardage+=(vc_suppressor(person,terrain,1,ShotVolume).totalYards);
                    Length+=(vc_suppressor(person,terrain,1,ShotVolume).totalLength);
                    ShotVolume=(vc_suppressor(person,terrain,1,ShotVolume).totalShotVolume);
                    Yardage=(vc_weaponOptic(time,person,1,Yardage).finalYardRange);
                    APPoints+=(Yardage*cfg.multipliers.personnel.weapons.guns.gBuffByYByTType[terrain[5]]);
                    if(person.secondary.name.MOA<5){
                        APPoints+=((5-person.secondary.name.MOA)*cfg.multipliers.personnel.weapons.guns.APBBMOALowerThan5);
                    };
                    APPoints+=(vc_lmgSuitability(person,terrain,1,Yardage).totalAPPoints);
                    APPoints-=(Weight*cfg.multipliers.personnel.weapons.guns.gDBuffByLb);
                    Weight+=(person.secondary.name.caliber.weight*(person.secondary.ammunition[1]-person.secondary.mag.capacity));//it matters how much the ammo weighs but the rounds not in the mag don't affect the weapon's weight. 
                    Weight+=(person.secondary.mag.weight*(person.secondary.ammunition[1]/person.secondary.mag.capacity));//add up the weight of all the mags too
                    APPoints-=(Length*cfg.multipliers.personnel.weapons.guns.gLengthDBuffByTType[terrain[5]]);
                    AVPoints+=(Pen*cfg.multipliers.personnel.weapons.general.AVPointsByMMPen);
                    APPoints-=(ShotVolume*cfg.multipliers.personnel.weapons.general.APPointsDBBDecibel);
                };
        }
    }else if(person.secondary.ammunition[1]>0){//they may be carrying ammo for someone else and it should be factored into their total kit weight
        Weight+=(person.secondary.ammunition[0].weight*(person.secondary.ammunition[1]));//all rounds are counted because they are just carrying ammo for someone else
        Weight+=(person.secondary.mag.weight*(person.secondary.ammunition[1]/person.secondary.mag.capacity));//add up the weight of all the mags too
    }

    return{
        totalWeight:Weight,
        totalAAPoints:AAPoints,
        totalAVPoints:AVPoints,
        totalAPPoints:APPoints
    }
};
function vc_explosive(terrain,pExplosive,debugBool){//determine the added value a specific explosive (non-mine) brings to the fight. Mines will be handled separately. 
    let APPoints=0;
    let Power=0;
    let Pen=0;
    let Weight=0;
    let ThrownRange=0;
    /* Grenade
    */
    if(pExplosive[1]!=0){//do they actually have grenades in their inventory?
        if(pExplosive[0].type==0){//frag grenade
            if(debugBool==1){
                console.log("Frag grenade detected");
            }

            ThrownRange=pExplosive[0].thrownRange;
            Pen=pExplosive[0].pen;
            
            Weight=pExplosive[0].weight;//not actually a factor in weapon performance as we have the thrown range already. Just used to tally up the soldier's kit weight
            if(Pen!=0){//is it an anti-tank grenade?
                APPoints+=(Pen*cfg.multipliers.personnel.weapons.grenades.gr_AVPBYardThrowable);
                APPoints+=(Pen*cfg.multipliers.personnel.weapons.grenades.gr_AVPBMMRHAPen[terrain[5]]);
            }
            Power-=((50-ThrownRange)*cfg.multipliers.personnel.weapons.grenades.gr_BBThrownYardBTerrain[terrain[5]]);
            Power+=((pExplosive[0].lethalRadius)*cfg.multipliers.personnel.weapons.grenades.gr_BBLethalRadiusBTerrain[terrain[5]]);

        }else if(pExplosive[0].type==1){//smoke grenade
            if(debugBool==1){
                console.log("smoke grenade detected");
            }
            ThrownRange=pExplosive[0].thrownRange;
            Weight=pExplosive[0].weight;
            Power-=((50-ThrownRange)*cfg.multipliers.personnel.weapons.grenades.gr_BBThrownYardBTerrain[terrain[5]]);
            Power+=(((pExplosive[0].duration/60)*cfg.multipliers.personnel.weapons.grenades.gr_BBLethalRadiusBTerrain[terrain[5]]));      
        }else if(pExplosive[0].type==2){//kind of arbitrary, flash grenade's aren't that useful for most situations
            if(debugBool==1){
                console.log("Stun grenade detected");
            }
            ThrownRange=pExplosive[0].thrownRange;
            Weight=pExplosive[0].weight;
            Power-=((50-ThrownRange)*cfg.multipliers.personnel.weapons.grenades.gr_BBThrownYardBTerrain[terrain[5]]);
            Power+=(((pExplosive[0].decibels/75)*cfg.multipliers.personnel.weapons.grenades.gr_BBLethalRadiusBTerrain[terrain[5]]));
            Power+=(pExplosive[0].flash*.1)               
        }
        Weight=pExplosive[0].weight*pExplosive[1];
    }
    return{
        totalWeight:Weight,
        totalPower:Power,
        antiVehiclePoints:APPoints,
    }
};
function vc_antiPersonnelRound(person,terrain,round){//calculate value of a an antipersonnel round against personnel
    let yardage = round.range;
    let subAPPower = 0;
    let explosive = (round.warheadWeight*round.explType);
    yardage = vc_weaponOpticV2(person,2,yardage)[0];
    subAPPower=(yardage*cfg.multipliers.personnel.weapons.general.APPointsByYdRng);
    subAPPower+=(explosive*cfg.multipliers.personnel.weapons.general.APPointsByLbTnT);
    subAPPower+=(round.softLaunch*cfg.multipliers.personnel.weapons.general.softLaunchBuff);
    subAPPower+=(round.fireAndForget*cfg.multipliers.personnel.weapons.general.fireAndForgetBuff);
    subAPPower+=(round.guidance[1]*(cfg.multipliers.personnel.weapons.general.smartMunitionBuff*.5));
    subAPPower+=(round.guidance[2]*(cfg.multipliers.personnel.weapons.general.smartMunitionBuff*.6));
    subAPPower+=(round.guidance[3]*(cfg.multipliers.personnel.weapons.general.smartMunitionBuff));
    subAPPower+=(round.guidance[1]*(cfg.multipliers.personnel.weapons.general.smartMunitionBuff*1.1));
    subAPPower+=(round.guidance[1]*(cfg.multipliers.personnel.weapons.general.smartMunitionBuff*.6));
    return{
        totalAPPoints:subAPPower
    }

};
function vc_heavyRound(person,terrain,round){//calculate value of a round against heavies
    let yardage = round.range;
    let subAVPower = 0;
    let pen = (round.warheadWeight*round.explType);
    yardage = vc_weaponOpticV2(person,2,yardage)[0];
    subAVPower=(yardage*cfg.multipliers.personnel.weapons.general.APPointsByYdRng);
    subAVPower=(pen*cfg.multipliers.personnel.weapons.general.AVPointsByMMPen);
    subAVPower+=(round.softLaunch*cfg.multipliers.personnel.weapons.general.softLaunchBuff);
    subAVPower+=(round.fireAndForget*cfg.multipliers.personnel.weapons.general.fireAndForgetBuff);
    subAVPower+=(round.guidance[1]*(cfg.multipliers.personnel.weapons.general.smartMunitionBuff*.5));
    subAVPower+=(round.guidance[2]*(cfg.multipliers.personnel.weapons.general.smartMunitionBuff*.6));
    subAVPower+=(round.guidance[3]*(cfg.multipliers.personnel.weapons.general.smartMunitionBuff));
    subAVPower+=(round.guidance[1]*(cfg.multipliers.personnel.weapons.general.smartMunitionBuff*1.1));
    subAVPower+=(round.guidance[1]*(cfg.multipliers.personnel.weapons.general.smartMunitionBuff*.6));
    return{
        totalAVPoints:subAVPower
    }

};
function vc_specialWeapon(person,terrain){
    let Weight = 0;
    let Power = 0;
    let Pen = 0;
    let HE=0;
    let CumeYards = 0;
    let AAPoints = 0;
    let AVPoints = 0;
    let APPoints = 0;
    let hasAmmo=false;
    let hasGPRound = 0;
    let hasAPRound= 0;
    let hasHeavyRound=0;
    let hasSmokeRound=0;
    let bestPen=0;
    let bestHE=0;
        if(person.special.GPRound[1]!=0){//add up all the ammunition for weight calcs, even if they don't have a RL
            Weight+=(person.special.GPRound[0].weight*person.special.GPRound[1]);
            hasGPRound=true;
            bestPen=person.special.GPRound[0];
            if(person.special.APRound[1]==0){
                bestHE=person.special.APRound[0];
            };
            hasAmmo=true;

        };
        if(person.special.APRound[1]!=0){
            Weight+=(person.special.APRound[0].weight*person.special.APRound[1]);
            hasAPRound=true;
            if(person.special.APRound[0].penRHA>bestPen.penRHA){
                bestPen=person.special.APRound[0];
            }
            bestHE=person.special.APRound[0];
            hasAmmo=true;
        };
        if(person.special.HeavyRound[1]!=0){
            Weight+=(person.special.HeavyRound[0].weight*person.special.HeavyRound[1]);
            hasHeavyRound=true;
            if(person.special.HeavyRound[0].penRHA>bestPen.penRHA){
                bestPen=person.special.HeavyRound[0];
            };
            hasAmmo=true;
        };
        if(person.special.SmokeRound[1]!=0){
            Weight+=(person.special.SmokeRound[0].weight*person.special.SmokeRound[1]);
            hasSmokeRound=true;
        }
    if((person.special.name!=0)&&(hasAmmo)){//make sure they have a rocket and that it has ammo before assigning value
        Weight+=person.special.name.weight;
        
    }
    return{
        totalWeight:Weight,
        totalAAPoints:AAPoints,
        totalAVPoints:AVPoints,
        totalAPPoints:APPoints
    }
}
function vc_uniform(person){//handles value calculation of a soldier's uniform based on weather, climate, wear, etc.
    let BugProtect=0;
    let Weight=0;
    let ImpactOnMorale=0;
    let Power = 0;
    if(person.kit.uniform!=0){//make sure they have a uniform before trying to calculate it's worth
        if(runtimeVariables.currentWeather.temp>cfg.environment.bugsNoFactorTemp){//bug treated handler
            BugProtect=person.kit.uniform.bugProtection;
            if(runtimeVariables.currentWeather.temp<cfg.environment.bugsLowFactorTemp){
                if(BugProtect==0){
                    ImpactOnMorale-=(cfg.multipliers.personnel.kit.uniform.mU_DBBHasNoBugProtect*.5);
                };
            }else{
                if(BugProtect==0){
                    ImpactOnMorale-=(cfg.multipliers.personnel.kit.uniform.mU_DBBHasNoBugProtect);
                };
            };
        };
        if(person.kit.uniform.camo!=Theatre.TheatreData.climate){//camo pattern vs clime handler
            if(person.kit.uniform.camo==1&&Theatre.TheatreData.climate==0){//having summer camo in winter isn't that bad
                ImpactOnMorale-=cfg.multipliers.personnel.kit.uniform.mU_DBBHavingWoodlandInWinter
                Power+=cfg.multipliers.personnel.kit.uniform.pU_PBBHavingAlmostRightCamo;
            }else{//having desert camo in woodland is
                ImpactOnMorale-=cfg.multipliers.personnel.kit.uniform.mU_DBBHavingDesertUInWoodland
            }
        }else{
            Power+=cfg.multipliers.personnel.kit.uniform.pU_PBBHavingRightCamo;//having proper camo increases lethality
        };
        if(runtimeVariables.currentWeather.temp<41){//uniform suitability for temperature handler
            if(person.kit.uniform.climate>0){
                if(person.kit.uniform.climate==1){
                    ImpactOnMorale-=cfg.multipliers.personnel.kit.uniform.mU_DBBHavingModGearInColdWeather;
                }else if(person.kit.uniform.climate==2){
                    ImpactOnMorale-=cfg.multipliers.personnel.kit.uniform.mu_DBBHavingHotGearInColdWeather;
                }
            }
        }else if(runtimeVariables.currentWeather.temp>40&&runtimeVariables.currentWeather.temp<81){
            if(person.kit.uniform.climate==0){
                ImpactOnMorale-=cfg.multipliers.personnel.kit.uniform.mU_DBBHavingColdGearInModWeather;
            }else if(person.kit.uniform.climate==2){
                ImpactOnMorale-=cfg.multipliers.personnel.kit.uniform.mU_DBBHavingHotGearInModWeather;
            }
        }else{
            if(person.kit.uniform.climate==0){
                ImpactOnMorale-=cfg.multipliers.personnel.kit.uniform.mU_DBBHavingColdGearInHotWeather;
            }
        }
        if(person.kit.uniform.thermalMasking==1){//presence of thermal protection
            ImpactOnMorale+=cfg.multipliers.personnel.kit.uniform.mU_BBHasFLIRCamo;
            Power+=cfg.multipliers.personnel.kit.uniform.pU_PBBHavingFLIRCamo;
        };
        ImpactOnMorale+=(person.kit.uniform.cleanLevel*cfg.multipliers.personnel.kit.uniform.mU_BBUIsClean);
        ImpactOnMorale-=(person.kit.uniform.wearLevel*cfg.multipliers.personnel.kit.uniform.mU_BBUIsLowWear);
        Weight=person.kit.uniform.weight;
        ImpactOnMorale+=(person.kit.uniform.flameResist*cfg.multipliers.personnel.kit.uniform.mU_BBFlameResist);
    }
    return{
        totalWeight:Weight,
        totalPower:Power,
        moraleImpact:ImpactOnMorale
    }
};

function vc_vest(person){//handles value calculation of a soldier's body armor
    let Weight=0;
    let ImpactOnMorale=0;
    let Power = 0;
    if(person.kit.bArmor!=0){
        Weight=person.kit.bArmor.mass;
        if(person.kit.bArmor.NIJ=="I"){//level I vest
            ImpactOnMorale+=(cfg.multipliers.personnel.kit.vest.mV_MoralePowerMultiplier*cfg.multipliers.personnel.kit.vest.pV_LevelI);
            Power+=cfg.multipliers.personnel.kit.vest.pV_LevelI;
        }else if(person.kit.bArmor.NIJ=="IIA"){//level IIA vest
            ImpactOnMorale+=(cfg.multipliers.personnel.kit.vest.mV_MoralePowerMultiplier*cfg.multipliers.personnel.kit.vest.pV_LevelIIA);
            Power+=cfg.multipliers.personnel.kit.vest.pV_LevelIIA;
        }else if(person.kit.bArmor.NIJ=="II"){//level II vest
            ImpactOnMorale+=(cfg.multipliers.personnel.kit.vest.mV_MoralePowerMultiplier*cfg.multipliers.personnel.kit.vest.pV_LevelII);
            Power+=cfg.multipliers.personnel.kit.vest.pV_LevelII;
        }else if(person.kit.bArmor.NIJ=="IIIA"){//level IIIA vest
            ImpactOnMorale+=(cfg.multipliers.personnel.kit.vest.mV_MoralePowerMultiplier*cfg.multipliers.personnel.kit.vest.pV_LevelIIIA);
            Power+=cfg.multipliers.personnel.kit.vest.pV_LevelIIIA;
        }else if(person.kit.bArmor.NIJ=="III"){//lvl III vest
            ImpactOnMorale+=(cfg.multipliers.personnel.kit.vest.mV_MoralePowerMultiplier*cfg.multipliers.personnel.kit.vest.pV_LevelIII);
            Power+=cfg.multipliers.personnel.kit.vest.pV_LevelIII;
        }else if(person.kit.bArmor.NIJ=="IV"){//level IV
            ImpactOnMorale+=(cfg.multipliers.personnel.kit.vest.mV_MoralePowerMultiplier*cfg.multipliers.personnel.kit.vest.pV_LevelIV);
            Power+=cfg.multipliers.personnel.kit.vest.pV_LevelIV;
        }else{//handles bogus NIJ ratings
            console.log(person.name+" has a vest that lacks a recognizable NIJ rating and VC vest cannot process it")
        };
        if(Theatre.TheatreData.climate==person.kit.bArmor.camo){
            ImpactOnMorale+=cfg.multipliers.personnel.kit.vest.mV_BBHavingRightCamo;
            Power+=cfg.multipliers.personnel.kit.vest.pV_BBHavingRightCamo;
        }else if((Theatre.TheatreData.climate==3&&person.kit.bArmor.camo==1)&&(Theatre.TheatreData.climate==1&&person.kit.bArmor.camo==3)){
            ImpactOnMorale+=cfg.multipliers.personnel.kit.vest.mV_BBHavingAlmostRightCamo;
            Power+=cfg.multipliers.personnel.kit.vest.pV_BBHavingAlmostRightCamo;
        };
        ImpactOnMorale+=(person.kit.bArmor.quality*cfg.multipliers.personnel.kit.vest.mV_QualityMultiplier);                               
    }
    return{
        totalWeight:Weight,
        totalPower:Power,
        moraleImpact:ImpactOnMorale,
    }
};

function vc_helmet(person){//handles value calculation of a soldier's helmet
    let Weight=0;
    let ImpactOnMorale=0;
    let Power=0;
    if(person.kit.helmet!=0){
        Weight=person.kit.helmet.mass;
        if(person.kit.helmet.NIJ=="I"){
            ImpactOnMorale+=(cfg.multipliers.personnel.kit.helmet.mH_MoralePowerMultiplier*cfg.multipliers.personnel.kit.helmet.pH_LevelI);
            Power+=cfg.multipliers.personnel.kit.helmet.pH_LevelI;
        }else if(person.kit.helmet.NIJ=="IIA"){
            ImpactOnMorale+=(cfg.multipliers.personnel.kit.helmet.mH_MoralePowerMultiplier*cfg.multipliers.personnel.kit.helmet.pH_LevelIIA);
            Power+=cfg.multipliers.personnel.kit.helmet.pH_LevelIIA;
        }else if(person.kit.helmet.NIJ=="II"){
            ImpactOnMorale+=(cfg.multipliers.personnel.kit.helmet.mH_MoralePowerMultiplier*cfg.multipliers.personnel.kit.helmet.pH_LevelII);
            Power+=cfg.multipliers.personnel.kit.helmet.pH_LevelII;
        }else if(person.kit.helmet.NIJ=="IIIA"){
            ImpactOnMorale+=(cfg.multipliers.personnel.kit.helmet.mH_MoralePowerMultiplier*cfg.multipliers.personnel.kit.helmet.pH_LevelIIIA);
            Power+=cfg.multipliers.personnel.kit.helmet.pH_LevelIIIA;
        }else if(person.kit.helmet.NIJ=="III"){
            ImpactOnMorale+=(cfg.multipliers.personnel.kit.helmet.mH_MoralePowerMultiplier*cfg.multipliers.personnel.kit.helmet.pH_LevelIII);
            Power+=cfg.multipliers.personnel.kit.helmet.pH_LevelIII;
        }else if(person.kit.helmet.NIJ=="IV"){
            ImpactOnMorale+=(cfg.multipliers.personnel.kit.helmet.mH_MoralePowerMultiplier*cfg.multipliers.personnel.kit.helmet.pH_LevelIV);
            Power+=cfg.multipliers.personnel.kit.helmet.pH_LevelIV;
        }else{
            console.log(person.name+" has a helmet with an NIJ rating of "+person.kit.helmet.NIJ+" that vc_helmet cannot work with");
        };
        if(Theatre.TheatreData.climate==person.kit.helmet.camo){
            ImpactOnMorale+=cfg.multipliers.personnel.kit.helmet.mV_BBHavingRightCamo;
            Power+=cfg.multipliers.personnel.kit.helmet.pH_BBHavingRightCamo;
        }else if((Theatre.TheatreData.climate==3&&person.kit.bArmor.camo==1)&&(Theatre.TheatreData.climate==1&&person.kit.bArmor.camo==3)){
            ImpactOnMorale+=cfg.multipliers.personnel.kit.helmet.mV_BBHavingAlmostRightCamo;
            Power+=cfg.multipliers.personnel.kit.helmet.pH_BBHavingAlmostRightCamo;
        };
        ImpactOnMorale+=(person.kit.helmet.quality*cfg.multipliers.personnel.kit.helmet.mH_QualityMultiplier);
    };
    return{
        totalWeight:Weight,
        totalPower:Power,
        moraleImpact:ImpactOnMorale,
    };

};

function vc_IFAK(person){//handles value calculation of a soldier's IFAK
    let Weight=0;
    let ImpactOnMorale=0;
    let Power=0;
    if(person.kit.IFAK!=0){
        Weight=person.kit.IFAK.weight;
        ImpactOnMorale+=(person.kit.IFAK.tieOffTQ*cfg.multipliers.personnel.kit.IFAK.iM_BBHTieOffTQ);
        ImpactOnMorale+=(person.kit.IFAK.CATorSWAT_TQ*cfg.multipliers.personnel.kit.IFAK.iM_BBHCATorSWATTQ);
        ImpactOnMorale+=(person.kit.IFAK.wPackGauze*cfg.multipliers.personnel.kit.IFAK.iM_BBHwPackGauze);
        ImpactOnMorale+=(person.kit.IFAK.sCWA*cfg.multipliers.personnel.kit.IFAK.iM_BBHsCWA);
        ImpactOnMorale+=(person.kit.IFAK.nAK*cfg.multipliers.personnel.kit.IFAK.iM_BBHnAK);
        ImpactOnMorale+=(person.kit.IFAK.PressDressAndBdg*cfg.multipliers.personnel.kit.IFAK.iM_BBHPressDressAndBdg);
        ImpactOnMorale+=(person.kit.IFAK.shears*cfg.multipliers.personnel.kit.IFAK.iM_BBHShears);
        ImpactOnMorale+=(person.kit.IFAK.gloves*cfg.multipliers.personnel.kit.IFAK.iM_BBHGloves);
        ImpactOnMorale+=(person.kit.IFAK.blanket*cfg.multipliers.personnel.kit.IFAK.iM_BBHBlanket);
        ImpactOnMorale+=(person.kit.IFAK.litter*cfg.multipliers.personnel.kit.IFAK.iM_BBHLitter);
        ImpactOnMorale+=(person.kit.IFAK.splint*cfg.multipliers.personnel.kit.IFAK.iM_BBHSplint);
        ImpactOnMorale+=(person.kit.IFAK.meds*cfg.multipliers.personnel.kit.IFAK.iM_BBHMeds);
        ImpactOnMorale+=(person.kit.IFAK.bbKit*cfg.multipliers.personnel.kit.IFAK.iM_BBHBBKit);
        ImpactOnMorale+=(person.kit.IFAK.mTape*cfg.multipliers.personnel.kit.IFAK.iM_BBHmTape);
    };
    return{
        totalWeight:Weight,
        totalPower:Power,
        moraleImpact:ImpactOnMorale
    }
};

function vc_backpack(person){//handles value calculation of a soldier's backpack
    let Weight=0;
    let ImpactOnMorale=0;
    let Power=0;
    if(person.kit.backpack!=0){
        Weight=person.kit.backpack.weight;
        if(person.kit.backpack.camo==Theatre.TheatreData.climate){
            Power+=cfg.multipliers.personnel.kit.backpack.pB_BBHavingRightCamo;
            ImpactOnMorale+=cfg.multipliers.personnel.kit.backpack.mB_BBHavingRightCamo;
        }else if((Theatre.TheatreData.climate==1&&person.kit.backpack.camo==3)||(Theatre.TheatreData.climate==3&&person.kit.backpack.camo==1)){
            Power+=cfg.multipliers.personnel.kit.backpack.pB_BBHavingAlmostRightCamo;
            ImpactOnMorale+=cfg.multipliers.personnel.kit.backpack.mB_BBHavingAlmostRightCamo;
        };
        ImpactOnMorale+=(person.kit.backpack.quality*cfg.multipliers.personnel.kit.backpack.mB_QualityMultiplier);
    }
    return{
        totalWeight:Weight,
        totalPower:Power,
        moraleImpact:ImpactOnMorale,
    }
};

function vc_radio(person){
    let weight = 0;
    if(person.kit.radio!=0){
        weight+=person.kit.radio.weight;
    }
    return{
        totalWeight:weight
    }
};

function vc_comms(person){
    let weight =0;
    if(person.kit.squadComms!=0){
        weight+=person.kit.squadComms.weight;
    }
    return{
        totalWeight:weight
    }
}
function vc_nods(person){
    let weight=0;
    if(person.kit.nods!=0){
        weight+=person.kit.nods.weight;
    }
    return {
        totalWeight:weight
    }
}
function vc_tent(person){
    let Weight=0;
    let ImpactOnMorale=0;
    let Power=0;    
    if(person.kit.tent!=0){
        Weight=person.kit.tent.weight;
        if(person.kit.tent.camo==Theatre.TheatreData.climate){
            ImpactOnMorale+=cfg.multipliers.personnel.kit.tent.mT_BBHavingRightCamo;
        }else if((Theatre.TheatreData.climate==1&&person.kit.tent.camo==3)||(Theatre.TheatreData.climate==3&&person.kit.backpack.camo==1)){
            ImpactOnMorale+=cfg.multipliers.personnel.kit.tent.mT_BBHavingAlmostRightCamo;
        };
    };
    return{
        totalWeight:Weight,
        totalPower:Power,
        moraleImpact:ImpactOnMorale,
    }
};

function vc_sleepingBag(person){
    let Weight=0;
    let ImpactOnMorale=0;
    let Power=0;    
    if(person.kit.sleepingBag!=0){
        Weight=person.kit.sleepingBag.weight;
        if(person.kit.sleepingBag.camo==Theatre.TheatreData.climate){
            ImpactOnMorale+=cfg.multipliers.personnel.kit.sleepingBag.mSB_BBHavingRightCamo;
        }else if((Theatre.TheatreData.climate==1&&person.kit.sleepingBagcamo==3)||(Theatre.TheatreData.climate==3&&person.kit.sleepingBag.camo==1)){
            ImpactOnMorale+=cfg.multipliers.personnel.kit.sleepingBag.mSB_BBHavingAlmostRightCamo;
        };
        ImpactOnMorale+=(person.kit.sleepingBag.quality*cfg.multipliers.personnel.kit.sleepingBag.mSB_QualityMultiplier);
        ImpactOnMorale-=(person.kit.sleepingBag.wearLevel*cfg.multipliers.personnel.kit.sleepingBag.mSB_DBBWearLevel);
        ImpactOnMorale+=(person.kit.sleepingBag.cleanLevel*cfg.multipliers.personnel.kit.sleepingBag.mSB_CleanLevelMultiplier);
        if((runtimeVariables.currentWeather.temp<person.kit.sleepingBag.tempMin)&&(runtimeVariables.time>2000||runtimeVariables.time<600)){
            ImpactOnMorale-=((person.kit.sleepingBag.tempMin-runtimeVariables.currentWeather.temp)*cfg.multipliers.personnel.kit.sleepingBag.mSB_DBBTempBelowMin);
        }
    };
    return{
        totalWeight:Weight,
        totalPower:Power,
        moraleImpact:ImpactOnMorale,
    }
}

function APPoints1Person(time,terrain,person){
    let APPoints=0;
    APPoints+=vc_primary(time,terrain,person).totalAPPoints;
    APPoints+=vc_secondary(time,terrain,person).totalAPPoints;
    APPoints+=vc_specialWeapon(person,terrain).totalAPPoints;
    APPoints+=vc_explosive(terrain,person.explosives.explosive1,0).totalPower;
    APPoints+=vc_explosive(terrain,person.explosives.explosive2,0).totalPower;
    APPoints+=vc_explosive(terrain,person.explosives.explosive3,0).totalPower;
    if(person.status.hoursCombatExperience>0){
        APPoints+=(APPoints*(person.status.hoursCombatExperience*cfg.multipliers.personnel.experience.APPMBHourCombatExperience));
    };
    return APPoints;
};
function AVPoints1Person(time,terrain,person){
    let AVPoints=0;
    AVPoints+=vc_primary(time,terrain,person).totalAVPoints;
    AVPoints+=vc_secondary(time,terrain,person).totalAVPoints;
    AVPoints+=vc_specialWeapon(person,terrain).totalAVPoints;
    AVPoints+=vc_explosive(terrain,person.explosives.explosive1,0).antiVehiclePoints;
    AVPoints+=vc_explosive(terrain,person.explosives.explosive2,0).antiVehiclePoints;
    AVPoints+=vc_explosive(terrain,person.explosives.explosive3,0).antiVehiclePoints;
    if(person.status.hoursCombatExperience>0){
        AVPoints+=(AVPoints*(person.status.hoursCombatExperience*cfg.multipliers.personnel.experience.AVPMBHourCombatExperience));
    };
    return AVPoints;
}
function AAPoints1Person(time,terrain,person){
    let AAPoints=0;
    AAPoints+=vc_primary(time,terrain,person).totalAAPoints;
    AAPoints+=vc_secondary(time,terrain,person).totalAAPoints;
    AAPoints+=vc_specialWeapon(person,terrain).totalAAPoints;
    if(person.status.hoursCombatExperience>0){
        AAPoints+=(AAPoints*(person.status.hoursCombatExperience*cfg.multipliers.personnel.experience.AAPMBHourCombatExperience));
    };
    return AAPoints;

}
function updatePoints1Person(time,terrain,person){
    person.status.points.AP=APPoints1Person(time,terrain,person);
    person.status.points.AV=AVPoints1Person(time,terrain,person);
    person.status.points.AA=AAPoints1Person(time,terrain,person);
};
function updateWeight1Person(time,terrain,person){
    person.status.totalKitWeight=weight1Person(time,terrain,person);
}
function weight1Person(time,terrain,person){
    let weight=0;
    //weapons
    weight+=vc_primary(time,terrain,person).totalWeight;
    weight+=vc_secondary(time,terrain,person).totalWeight;
    weight+=vc_specialWeapon(person,terrain).totalWeight;
    weight+=vc_explosive(terrain,person.explosives.explosive1,0).totalWeight;
    weight+=vc_explosive(terrain,person.explosives.explosive2,0).totalWeight;  
    weight+=vc_explosive(terrain,person.explosives.explosive3,0).totalWeight;

    //kit
    weight+=vc_IFAK(person).totalWeight;
    weight+=vc_backpack(person).totalWeight;
    weight+=vc_vest(person).totalWeight;
    weight+=vc_helmet(person).totalWeight;
    weight+=vc_uniform(person).totalWeight;
    weight+=vc_tent(person).totalWeight;
    weight+=vc_sleepingBag(person).totalWeight;
    weight+=vc_comms(person).totalWeight;
    weight+=vc_nods(person).totalWeight;
    weight+=vc_radio(person).totalWeight;
    
    weight+=5;//at least 5 pounds of kit not covered, that's being generous
    weight+=(((weight*cfg.multipliers.personnel.kit.kitWeightMultWhenWet)*cfg.multipliers.personnel.kit.kitWeightMultImpactByTerrain[terrain[5]])*runtimeVariables.recentRain);
    return weight
};
function update1Person(weather,time,terrain,person){
    nameGen(person);
    updatePoints1Person(time,terrain,person);
    updateWeight1Person(time,terrain,person);
    moraleUpdate1Person(person);
    ssph_updateCPH1Person(weather,time,terrain,person);
    ssph_updateGWPH1Person(weather,time,terrain,person);
    hf_combatExperienceUpdate(terrain,person);
    if(person.status.currentActivity!=4){
        person.status.hoursJobExperience+=(1/cfg.general.refreshRate);
    };
}

function moraleUpdate1Person(person){
    let calculatedMorale=0;
    if(person.buffs.rMealBuff>0){
        calculatedMorale+=(person.buffs.rMealBuff*cfg.multipliers.personnel.health.recentMealBuff);
        person.buffs.rMealBuff-=((1/cfg.multipliers.personnel.health.mealBuffDecay)*(1/cfg.general.refreshRate));
    };
    if(person.buffs.rWaterBuff>0){
        calculatedMorale+=(person.buffs.rWaterBuff*cfg.multipliers.personnel.health.recentWaterBuff);
        person.buffs.rWaterBuff-=((1/cfg.multipliers.personnel.health.waterBuffDecay)*(1/cfg.general.refreshRate));
    };
    if(person.buffs.rHotMealBuff>0){
        calculatedMorale+=(person.buffs.rHotMealBuff*cfg.multipliers.personnel.health.recentHotMealBuff);
        person.buffs.rHotMealBuff-=((1/cfg.multipliers.personnel.health.recentHotMealBuffDecay)*(1/cfg.general.refreshRate));
    };
    if(person.buffs.rHotShowerBuff>0){
        calculatedMorale+=(person.buffs.rHotShowerBuff*cfg.multipliers.personnel.health.recentShowerBuff);
        person.buffs.rHotShowerBuff-=((1/cfg.multipliers.personnel.health.recentShowerBuff)*(1/cfg.general.refreshRate));
    };
    if(person.buffs.rReserveTimeBuff>0){
        calculatedMorale+=(person.buffs.rReserveTimeBuff*cfg.multipliers.personnel.health.recentReserveBuff);
        person.buffs.rReserveTimeBuff-=((1/cfg.multipliers.personnel.health.reserveBuffDecay)*(1/cfg.general.refreshRate));
    };
    calculatedMorale+=vc_uniform(person).moraleImpact;
    calculatedMorale+=vc_backpack(person).moraleImpact;
    calculatedMorale+=vc_helmet(person).moraleImpact;
    calculatedMorale+=vc_sleepingBag(person).moraleImpact;
    calculatedMorale+=vc_tent(person).moraleImpact;
    calculatedMorale+=vc_vest(person).moraleImpact;
    person.status.morale=calculatedMorale;
}



// SUPPLIES PER HOUR CALCULATIONS //
function ssph_updateCPH1Person(weather,time,terrain,person){
    let calBurn=0;
    calBurn+=cfg.multipliers.personnel.expenditures.caloriesPerHour[person.status.activityLevel];
    calBurn*=cfg.multipliers.personnel.expenditures.caloriesStressModifier[person.status.stress];
    calBurn+=(((person.status.totalKitWeight*cfg.multipliers.personnel.expenditures.caloriesAddedPerLbKit)*cfg.multipliers.personnel.expenditures.kitImpactPerActivity[person.status.activityLevel])*cfg.multipliers.personnel.expenditures.kitImpactByTerrain[terrain[5]]);
    if(weather.temp>70){
        calBurn+=(weather.temp-70*cfg.multipliers.personnel.expenditures.cPHTempOver70)
    };
    person.status.calorieBalance-=(calBurn*(1/simConfig.general.refreshRate));
    if(person.status.currentActivity!=(3||4)){
        person.status.hActiveSinceLRest[person.status.activityLevel]+=(1/cfg.general.refreshRate);
    };
    return {
        currentCalExpenditure:calBurn
    };

};

function ssph_updateGWPH1Person(weather,time,terrain,person){
    let waterDrinkRate=0;
    waterDrinkRate+=cfg.multipliers.personnel.expenditures.galWaterPerHour[person.status.activityLevel];
    waterDrinkRate+=(((person.status.totalKitWeight*cfg.multipliers.personnel.expenditures.gWPHKit)*cfg.multipliers.personnel.expenditures.kitImpactPerActivity[person.status.activityLevel])*cfg.multipliers.personnel.expenditures.kitImpactByTerrain[terrain[5]]);
    if(weather.temp>65){
        waterDrinkRate+=(weather.temp-65*cfg.multipliers.personnel.expenditures.gWPHTempAbove65);
    };
    person.status.waterBalance-=waterDrinkRate;
    return{
        currentWaterExpenditure:waterDrinkRate
    }

}


// HUMAN FACTORS
function hf_combatExperienceUpdate(terrain,person){
    if(person.status.currentActivity==0){
        person.status.hoursJobExperience+=((cfg.multipliers.personnel.experience.hCEPHVariousCombatModes[person.status.inCombatType])*(1/cfg.general.refreshRate));
    };
}





// RESUPPLY HANDLERS //



// INJURY OR DEATH CHANCE CALCULATIONS


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
function nameGen(person){//generates complete ranks and names for individual soldiers depending on their country, branch and role. Handles gender with RNG based on percentage women stats in various branches
    let rankArray = 0;
    let firstNameArray = 0;
    let lastNameArray = 0;
    let firstName = 0;
    let lastName = 0;
    let rank = 0;
    let isWoman=0;
    let randomChance=Math.random();
    let finishedName = 0;
    if(randomChance<cfg.nationalities.percentageInfWomenByService[person.ID[0]][person.ID[1]]){
        isWoman=1;
    }
    if(person!=0){
        if(person.name==0){//don't want to regen names for soldiers that already have them
            //handle the ranks first. Find their country, branch and role and give them a random rank from the pool
            rankArray=DB.tComponents.names.ranks[person.ID[0]][person.ID[1]][person.ID[2]];
            rank = rankArray[Math.floor(Math.random()*rankArray.length)];
    
            //then first names
            firstNameArray=DB.tComponents.names.firstNames[person.ID[0]][isWoman];
            firstName = firstNameArray[Math.floor(Math.random()*firstNameArray.length)];
    
            //then last names. Middle names aren't handled
            lastNameArray=DB.tComponents.names.lastNames[person.ID[0]];
            lastName = lastNameArray[Math.floor(Math.random()*lastNameArray.length)];
    
            //add them together and assign it to the person's name
            finishedName=(rank+" "+firstName+" "+lastName)
            person.name=finishedName;
        };        
    }
}
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
function mu_isNight(time){
    if((time<runtimeVariables.date.sunRise)||(time>runtimeVariables.date.sunSet)){//is it night time?
        return true;
    }else{
        return false;
    }
}
function mu_ProfileProcessingSpamTest(weather,time,terrain,person,repeatNum){
    let runNo=0;
    let simplifiedRunNo = 0
    let startTime= new Date();
    while(runNo<=repeatNum){
        update1Person(weather,time,terrain,person);
        runNo++;
        //if(runNo==(simplifiedRunNo+100)){
        //    console.log(simplifiedRunNo)
        //    simplifiedRunNo=runNo;
        //}
    };
    let timeElapsed = (new Date()-startTime)/1000;
    console.log(repeatNum+" profile cycles run in "+timeElapsed+" seconds")
}
function mu_ProcessingSpamTest(repeatNum){
    let runNo=0;
    let simplifiedRunNo = 0
    let startTime= new Date();
    while(runNo<=repeatNum){
        runNo++;
        if(runNo==(simplifiedRunNo+25)){
            console.log(simplifiedRunNo)
            simplifiedRunNo=runNo;
        }
    };
    let timeElapsed = (new Date()-startTime)/1000;
    console.log(repeatNum+" profile cycles run in "+timeElapsed+" seconds")
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
//ak74 w bipod and suppressor is 9.21
//ak74 w/o bipod and suppressor is 10.254
//ak74 w/o bipod and suppressor is 54.529
//SVD w bipod suppressor is 64
//SVD w bipod, suppressor and thermal nods is 82
//11.95, 9.709
/*
vc_primary(runtimeVariables.time,Theatre.MapFeaturesTest[0],DB.testItems.components.personnel.T_Rifleman.AAF_Rifleman_Loaded)
vc_secondary(runtimeVariables.time,Theatre.MapFeaturesTest[0],DB.testItems.components.personnel.T_Rifleman.AAF_Rifleman_Loaded)
vc_primary(runtimeVariables.time,Theatre.MapFeaturesTest[0],DB.testItems.components.personnel.T_Rifleman.USMC_LMG)
vc_secondary(runtimeVariables.time,Theatre.MapFeaturesTest[0],DB.testItems.components.personnel.T_Rifleman.USMC_LMG)
*/
