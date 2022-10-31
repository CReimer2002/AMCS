import AMil from "./AMil.js";
import DB from "./DB.js";
import Weather from "./Weather.js";
import Theatre from "./Caucasus.js";
import cfg from "./simConfig.js";
import simConfig from "./simConfig.js";
/*TO DO
    look into array.map for long chains of functions dealing with squad contents, specifically update1squad
    look into switch for functions related to or dependent on weaponType
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
        if((person.primary.railAccessory!=0)&&((person.primary.name.mounts[1]==1)||(person.primary.name.mounts[2]==1))){//rail mounted accessory handler 
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
        if((person.secondary.railAccessory!=0)&&((person.secondary.name.mounts[1]==1)||(person.secondary.name.mounts[2]==1))){//rail mounted accessory handler 
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
};
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
};
function vsc_NoSightHandler(time,person,subYardRange){
   let subSubYardage=subYardRange;
   if(mu_isNight(time)){
        if(person.kit.nods!=0){
            if(person.kit.nods.type<4){
                subSubYardage=cfg.multipliers.personnel.weapons.guns.gRangeByOpticNODAtNight[person.kit.nods.type];
            }else{
                subSubYardage*=(cfg.multipliers.personnel.weapons.guns.thermalSightRangeBuff)
            }
            subSubYardage*=cfg.multipliers.personnel.weapons.guns.eByEyepieceType[person.kit.nods.lType];
            subSubYardage=vssc_HelmetEvaluator(person,subSubYardage).newYardage;
        }else{
            subSubYardage=cfg.multipliers.personnel.weapons.general.visionNoNodsOrOpticAtNight;
        }
    }
    return{
        finalYardRange:subSubYardage
    }
};
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
                APPointsBonus+=(person.primary.name.caliber.bWeight*cfg.multipliers.personnel.weapons.guns.APBBRoundWeight);
                APPointsBonus+=(person.primary.mag.capacity*cfg.multipliers.personnel.weapons.guns.APBBMagSize);
            }
        }else if(wepIndex==1){
            if(person.secondary.ammunition[1]>90){//they need a lot of ammunition if they will be trying to suppress
                APPointsBonus+=(person.secondary.name.rateOfFire*cfg.multipliers.personnel.weapons.guns.APLMGBBFireRate);
                APPointsBonus+=(person.secondary.name.caliber.bWeight*cfg.multipliers.personnel.weapons.guns.APBBRoundWeight);
                APPointsBonus+=(person.secondary.mag.capacity*cfg.multipliers.personnel.weapons.guns.APBBMagSize);
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
        let railAccessoryStats = vc_railAccessory(person,terrain,0);
        let uBGLStats=vc_uBGL(person,terrain,0);
        let gripModStats = vc_gripMod(person,terrain,0);
        let suppressorStats = vc_suppressor(person,terrain,0,ShotVolume);
        let opticStats=vc_weaponOptic(time,person,0,Yardage)
        Weight+=(uBGLStats.uBGLWeight);//add up attachment weights first, regardless of whether or not they have ammo
        Weight+=(railAccessoryStats.totalWeight);
        Weight+=(gripModStats.totalWeight);
        Weight+=(suppressorStats.totalWeight);
        Weight+=(opticStats.addedWeight);
        if(person.primary.ammunition[0]==person.primary.name.caliber){//check for ammunition compatibility
            Weight+=(person.primary.mag.weight);//add ammunition weight if it matches
            Weight+=(person.primary.name.caliber.weight*person.primary.mag.capacity);
                if(person.primary.ammunition[1]>30){//make sure they have plenty of ammo, if they do, then finally start adding up bonuses
                    Pen+=person.primary.name.caliber.pen;
                    Yardage+=person.primary.name.eRange;
                    ShotVolume=person.primary.name.shotDB;
                    AAPoints+=(railAccessoryStats.totalPower);
                    Yardage+=(railAccessoryStats.totalYards);
                    APPoints+=(uBGLStats.totalAPPoints);
                    AVPoints+=(uBGLStats.totalAVPoints);
                    APPoints+=(gripModStats.totalPower);
                    Yardage+=(gripModStats.totalYards);
                    APPoints+=(suppressorStats.totalPower);
                    Yardage+=(suppressorStats.totalYards);
                    Length+=(suppressorStats.totalLength);
                    ShotVolume=(suppressorStats.totalShotVolume);
                    Yardage=(opticStats.finalYardRange);
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
        totalYardRange:Yardage,
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
                    let railAccessoryStats = vc_railAccessory(person,terrain,1);
                    AAPoints+=(railAccessoryStats.totalPower);
                    Yardage+=(railAccessoryStats.totalYards);
                    let uBGLStats=vc_uBGL(person,terrain,1)
                    APPoints+=(uBGLStats.totalAPPoints);
                    AVPoints+=(uBGLStats.totalAVPoints);
                    APPoints+=(vc_gripMod(person,terrain,1).totalPower);
                    Yardage+=(vc_gripMod(person,terrain,1).totalYards);
                    let suppressorStats=vc_suppressor(person,terrain,1,ShotVolume);
                    APPoints+=(suppressorStats.totalPower);
                    Yardage+=(suppressorStats.totalYards);
                    Length+=(suppressorStats.totalLength);
                    ShotVolume=(suppressorStats.totalShotVolume);
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
        totalYardRange:Yardage,
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
function vc_antiPersonnelRound(time,person,terrain,round){//calculate value of a an antipersonnel round against personnel
    let yardage = round.range;
    let subAPPower = 0;
    let explosive = (round.warheadWeight*round.explType);
    yardage = vc_weaponOptic(time,person,2,yardage)[0];
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
function vc_heavyRound(time,person,terrain,round){//calculate value of a round against heavies
    let yardage = round.range;
    let subAVPower = 0;
    let pen = (round.warheadWeight*round.explType);
    yardage = vc_weaponOptic(time,person,2,yardage)[0];
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
function svc_APRound(time,person,terrain,round,range){//calculates the value of a rocket round when used against personnel
    let APPoints=0;
    let lbsTNT=round.explType*round.warheadWeight;
    APPoints+=(range*cfg.multipliers.personnel.weapons.grenades.gr_APPBYardThrowable);
    APPoints+=(lbsTNT*cfg.multipliers.personnel.weapons.general.APPointsByLbTnT);
    if(round.softLaunch===1){
        APPoints+=(APPoints*cfg.multipliers.personnel.weapons.rLSpecific.softLaunchBBTerrain[terrain[5]]);
    };
    if(round.guidance[1]===1){
        APPoints*=1.2;
    };
    APPoints*=(cfg.multipliers.personnel.weapons.rLSpecific.warHeadTypePowerByTerrain[terrain[5]][round.warHeadType-1]);
    return{
        totalAPPoints:APPoints,
    };
};
function svc_AVRound(time,person,terrain,round,range){
    let AVPoints=0;
    let Pen=round.penRHA;
    AVPoints+=(range*cfg.multipliers.personnel.weapons.grenades.gr_AVPBYardThrowable);
    AVPoints+=(Pen*cfg.multipliers.personnel.weapons.grenades.gr_AVPBMMRHAPen[terrain[5]]);
    //AVPoints+=(Pen*cfg.multipliers.personnel.weapons.grenades.gr_AVPBMMRHAPen);
    if(round.softLaunch===1){
        AVPoints+=(AVPoints*cfg.multipliers.personnel.weapons.rLSpecific.softLaunchBBTerrain[terrain[5]]);
    };
    if(round.guidance[1]===1){
        AVPoints*=1.2;
    };
    if(round.guidance[3]===1){
        AVPoints*=1.25;
    };
    return {
        totalAVPoints:AVPoints
    };
};
function svc_AARound(time,person,terrain,round,range){
    let AAPoints=0;
    AAPoints+=(range*cfg.multipliers.personnel.weapons.rLSpecific.rLAAPBBYard);
    if(round.guidance[4]===1){
        AAPoints*=1.15;
    };
    return{
        totalAAPoints:AAPoints
    };
};
function vc_specialWeapon(time,person,terrain){//WIP THIS NEEDS TO BE FINISHED
    let Weight = 0;
    let AAPoints = 0;
    let AVPoints = 0;
    let APPoints = 0;
    let hasAmmo=false;
    let bestPen=0;
    let bestHESize=0;
    let bestHEMult=0;
    let bestAPRange=0;
    let bestAVRange=0;
    let AARange=0;
    let totalWeight=0;
    let APRoundWeight=0;
    let AVRoundWeight=0;
    let AARoundWeight=0;
    let bestAPRound=0;
    let bestAVRound=0;
    let bestAARound=0;    
    if(person.special.GPRound[1]!=0){//add up all the ammunition for weight calcs, even if they don't have a RL
        if((person.special.GPRound[0].range>bestAVRange)&&(person.special.HeavyRound[1]==0)&&(person.special.GPRound[0].useCase[7]==0)){//make sure they don't have a more appropriate alternative before using this and also that they aren't using a MANPAD
            bestAVRange=person.special.GPRound[0].range;
            bestPen=person.special.GPRound[0].penRHA; 
            bestAVRound=person.special.GPRound[0];  
        };
        if((person.special.APRound[1]==0)){//for the same reason as above, make sure that you aren't giving them buffed anti-personnel capabilities by using stats of a GP round when they have a dedicated AP round
            bestAPRange=person.special.GPRound[0].range;
            bestHESize=person.special.GPRound[0].warheadWeight;
            bestHEMult=person.special.GPRound[0].explType;
            bestAPRound=person.special.GPRound[0];  
        };
        if(person.special.GPRound[0].useCase[7]==1){
            AARange=person.special.GPRound[0].range;
            bestAARound=person.special.GPRound[0];  
        };
        totalWeight+=(person.special.GPRound[0].weight*person.special.GPRound[1]);
        hasAmmo=true;
    };
    
    if(person.special.APRound[1]!=0){
        if(person.special.APRound[0].range>bestAPRange){
            bestAPRange=person.special.APRound[0].range;
        };
        bestHEMult=person.special.APRound[0].explType;
        bestHESize=person.special.APRound[0].warheadWeight;
        totalWeight+=(person.special.APRound[0].weight*person.special.APRound[1]);
        bestAPRound=person.special.APRound[0];
        hasAmmo=true;
    };
    if(person.special.HeavyRound[1]!=0){
        bestAVRange=person.special.HeavyRound[0].range;
        bestPen=person.special.HeavyRound[0].penRHA;
        totalWeight+=(person.special.HeavyRound[0].weight*person.special.HeavyRound[1]);
        hasAmmo=true;
        bestAVRound=person.special.HeavyRound[0];
    };
    if(person.special.SmokeRound[1]!=0){
        totalWeight+=(person.special.SmokeRound[0].weight*person.special.SmokeRound[1]);
        hasAmmo=true;
    };
    if((person.special.name!=0)&&(hasAmmo)){//make sure they have a rocket and that it has ammo before assigning value
        Weight+=person.special.name.weight;
        if(bestAPRange>0){
            bestAPRange=vc_weaponOptic(time,person,2,bestAPRange).finalYardRange;
            APPoints=svc_APRound(time,person,terrain,bestAPRound,bestAPRange).totalAPPoints;

        }
        if(bestAVRange>0){
            bestAVRange=vc_weaponOptic(time,person,2,bestAVRange).finalYardRange;
            AVPoints=svc_AVRound(time,person,terrain,bestAVRound,bestAVRange).totalAVPoints;
        }
        if(AARange>0){
            AARange=vc_weaponOptic(time,person,2,AARange).finalYardRange;
            AAPoints=svc_AARound(time,person,terrain,bestAARound,AARange).totalAAPoints;
        }
    }
    
    return{
        totalWeight:Weight,
        totalAAPoints:AAPoints,
        totalAVPoints:AVPoints,
        totalAPPoints:APPoints,
        eAPRange:bestAPRange,
        eAARange:AARange,
        eAVRange:bestAVRange
    };
    
};


//KIT//
function kvc_uniform(person){//handles value calculation of a soldier's uniform based on weather, climate, wear, etc.
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
function kvc_vest(person){//handles value calculation of a soldier's body armor
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
function kvc_helmet(person){//handles value calculation of a soldier's helmet
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
            console.log(person.name+" has a helmet with an NIJ rating of "+person.kit.helmet.NIJ+" that kvc_helmet cannot work with");
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
function kvc_IFAK(person){//handles value calculation of a soldier's IFAK
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
function kvc_backpack(person){//handles value calculation of a soldier's backpack
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
function kvc_radio(person){
    let weight = 0;
    if(person.kit.radio!=0){
        weight+=person.kit.radio.weight;
    }
    return{
        totalWeight:weight
    }
};
function kvc_comms(person){
    let weight =0;
    if(person.kit.squadComms!=0){
        weight+=person.kit.squadComms.weight;
    }
    return{
        totalWeight:weight
    }
}
function kvc_nods(person){
    let weight=0;
    if(person.kit.nods!=0){
        weight+=person.kit.nods.weight;
    }
    return {
        totalWeight:weight
    }
}
function kvc_tent(person){
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
function kvc_sleepingbag(person){
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
};



function APPoints1Person(time,terrain,person){
    let APPoints=0;
    APPoints+=vc_primary(time,terrain,person).totalAPPoints;
    APPoints+=vc_secondary(time,terrain,person).totalAPPoints;
    APPoints+=vc_specialWeapon(time,person,terrain).totalAPPoints;
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
    AVPoints+=vc_specialWeapon(time,person,terrain).totalAVPoints;
    AVPoints+=vc_explosive(terrain,person.explosives.explosive1,0).antiVehiclePoints;
    AVPoints+=vc_explosive(terrain,person.explosives.explosive2,0).antiVehiclePoints;
    AVPoints+=vc_explosive(terrain,person.explosives.explosive3,0).antiVehiclePoints;
    if(person.status.hoursCombatExperience>0){
        AVPoints+=(AVPoints*(person.status.hoursCombatExperience*cfg.multipliers.personnel.experience.AVPMBHourCombatExperience));
    };
    return AVPoints;
};
function AAPoints1Person(time,terrain,person){
    let AAPoints=0;
    AAPoints+=vc_primary(time,terrain,person).totalAAPoints;
    AAPoints+=vc_secondary(time,terrain,person).totalAAPoints;
    AAPoints+=vc_specialWeapon(time,person,terrain).totalAAPoints;
    if(person.status.hoursCombatExperience>0){
        AAPoints+=(AAPoints*(person.status.hoursCombatExperience*cfg.multipliers.personnel.experience.AAPMBHourCombatExperience));
    };
    return AAPoints;

};
function updatePoints1Person(time,terrain,person){
    //recalculates the offensive capabilities of a person and updates that person's profile with the new values. Subordinate to update1person
    if(person!=0){
        let APPoints = APPoints1Person(time,terrain,person);
        let AVPoints = AVPoints1Person(time,terrain,person);
        let AAPoints = AAPoints1Person(time,terrain,person);
        let modifier = 0;
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.capabilities.competence[2],5,cfg.multipliers.personnel.willToFight.capabilities.competence.skills);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.capabilities.competence[3],5,cfg.multipliers.personnel.willToFight.capabilities.competence.relevance);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.capabilities.quality[0],5,cfg.multipliers.personnel.willToFight.capabilities.quality.adaptability);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.capabilities.quality[1],5,cfg.multipliers.personnel.willToFight.capabilities.quality.education);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.capabilities.quality[2],5,cfg.multipliers.personnel.willToFight.capabilities.quality.fitness);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.capabilities.quality[3],5,cfg.multipliers.personnel.willToFight.capabilities.quality.pyschTraits);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.capabilities.quality[4],5,cfg.multipliers.personnel.willToFight.capabilities.quality.resilience);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.capabilities.quality[5],5,cfg.multipliers.personnel.willToFight.capabilities.quality.socialSkills);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.motivations.desperation,5,cfg.multipliers.personnel.willToFight.motivations.desperation);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.motivations.revenge,5,cfg.multipliers.personnel.willToFight.motivations.revenge);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.motivations.ideology,5,cfg.multipliers.personnel.willToFight.motivations.ideology);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.motivations.identity[0],5,cfg.multipliers.personnel.willToFight.motivations.identity.organizational);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.motivations.identity[1],5,cfg.multipliers.personnel.willToFight.motivations.identity.personal);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.motivations.identity[2],5,cfg.multipliers.personnel.willToFight.motivations.identity.unit);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.motivations.identity[3],5,cfg.multipliers.personnel.willToFight.motivations.identity.state);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.motivations.identity[4],5,cfg.multipliers.personnel.willToFight.motivations.identity.social);
        modifier+=sssoPS_evalSL1Stat(person.status.willToFight.motivations.identity[5],5,cfg.multipliers.personnel.willToFight.motivations.identity.societal);
        APPoints*=(modifier+1);
        APPoints-=(APPoints*(person.status.fatigue*cfg.multipliers.personnel.health.weaponPointsDebuffByFatigue));
        AVPoints*=(modifier+1);
        AVPoints-=(AVPoints*(person.status.fatigue*cfg.multipliers.personnel.health.weaponPointsDebuffByFatigue));
        AAPoints*=(modifier+1);
        AAPoints-=(AAPoints*(person.status.fatigue*cfg.multipliers.personnel.health.weaponPointsDebuffByFatigue));
        person.status.points={
            AP:APPoints,
            AV:AVPoints,
            AA:AAPoints
        }
    }

};
function updateWeight1Person(time,terrain,person){
    if(person!=0){
        person.status.totalKitWeight=weight1Person(time,terrain,person);
    }
}
function weight1Person(time,terrain,person){
    let weight=0;
    //weapons
    weight+=vc_primary(time,terrain,person).totalWeight;
    weight+=vc_secondary(time,terrain,person).totalWeight;
    weight+=vc_specialWeapon(time,person,terrain).totalWeight;
    weight+=vc_explosive(terrain,person.explosives.explosive1,0).totalWeight;
    weight+=vc_explosive(terrain,person.explosives.explosive2,0).totalWeight;  
    weight+=vc_explosive(terrain,person.explosives.explosive3,0).totalWeight;

    //kit
    weight+=kvc_IFAK(person).totalWeight;
    weight+=kvc_backpack(person).totalWeight;
    weight+=kvc_vest(person).totalWeight;
    weight+=kvc_helmet(person).totalWeight;
    weight+=kvc_uniform(person).totalWeight;
    weight+=kvc_tent(person).totalWeight;
    weight+=kvc_sleepingbag(person).totalWeight;
    weight+=kvc_comms(person).totalWeight;
    weight+=kvc_nods(person).totalWeight;
    weight+=kvc_radio(person).totalWeight;
    
    weight+=5;//at least 5 pounds of kit not covered, that's being generous
    weight+=(((weight*cfg.multipliers.personnel.kit.kitWeightMultWhenWet)*cfg.multipliers.personnel.kit.kitWeightMultImpactByTerrain[terrain[5]])*runtimeVariables.recentRain);
    return weight
};

function update1Person(weather,time,terrain,person){
    if(person!=0){
        nameGen(person);
        hf_fatigue1Person(person);
        updatePoints1Person(time,terrain,person);
        updateWeight1Person(time,terrain,person);
        moraleUpdate1Person(person);
        ssph_updateCPH1Person(weather,time,terrain,person);
        ssph_updateGWPH1Person(weather,time,terrain,person);
        hf_combatExperienceUpdate(terrain,person);
        hf_individualWillToFight(person);
        if(person.status.currentActivity!=4){
            person.status.hoursJobExperience+=(1/cfg.general.refreshRate);
        };
    }
};
function update1Squad(weather,time,terrain,squad){
    
    update1Person(weather,time,terrain,squad.members[0][0]);
    update1Person(weather,time,terrain,squad.members[0][1]);
    update1Person(weather,time,terrain,squad.members[0][2]);
    update1Person(weather,time,terrain,squad.members[0][3]);

    update1Person(weather,time,terrain,squad.members[1][0]);
    update1Person(weather,time,terrain,squad.members[1][1]);
    update1Person(weather,time,terrain,squad.members[1][2]);
    update1Person(weather,time,terrain,squad.members[1][3]);

    update1Person(weather,time,terrain,squad.members[2][0]);
    update1Person(weather,time,terrain,squad.members[2][1]);
    update1Person(weather,time,terrain,squad.members[2][2]);
    update1Person(weather,time,terrain,squad.members[2][3]);

    update1Person(weather,time,terrain,squad.members[3][0]);
    update1Person(weather,time,terrain,squad.members[3][1]);
    update1Person(weather,time,terrain,squad.members[3][2]);
    update1Person(weather,time,terrain,squad.members[3][3]);

    update1Person(weather,time,terrain,squad.members[4][0]);
    update1Person(weather,time,terrain,squad.members[4][1]);
    update1Person(weather,time,terrain,squad.members[4][2]);
    update1Person(weather,time,terrain,squad.members[4][3]);

    update1Person(weather,time,terrain,squad.members[5][0]);
    update1Person(weather,time,terrain,squad.members[5][1]);
    update1Person(weather,time,terrain,squad.members[5][2]);
    update1Person(weather,time,terrain,squad.members[5][3]);

    update1Person(weather,time,terrain,squad.members[6][0]);
    update1Person(weather,time,terrain,squad.members[6][1]);
    update1Person(weather,time,terrain,squad.members[6][2]);
    update1Person(weather,time,terrain,squad.members[6][3]);

    update1Person(weather,time,terrain,squad.members[7][0]);
    update1Person(weather,time,terrain,squad.members[7][1]);
    update1Person(weather,time,terrain,squad.members[7][2]);
    update1Person(weather,time,terrain,squad.members[7][3]);

    update1Person(weather,time,terrain,squad.members[8][0]);
    update1Person(weather,time,terrain,squad.members[8][1]);
    update1Person(weather,time,terrain,squad.members[8][2]);
    update1Person(weather,time,terrain,squad.members[8][3]);

    update1Person(weather,time,terrain,squad.members[9][0]);
    update1Person(weather,time,terrain,squad.members[9][1]);
    update1Person(weather,time,terrain,squad.members[9][2]);
    update1Person(weather,time,terrain,squad.members[9][3]);
    
    oPS_UpdatePoints1Squad(weather,time,terrain,squad);

};
function update1SquadModded(weather,time,terrain,squad){
    update1Person(weather,time,terrain,squad.members.SL);
    update1Person(weather,time,terrain,squad.members.FTA.FTL);
    update1Person(weather,time,terrain,squad.members.FTA.M1);
    update1Person(weather,time,terrain,squad.members.FTA.M2);
    update1Person(weather,time,terrain,squad.members.FTA.M3);
    update1Person(weather,time,terrain,squad.members.FTA.M4);
    update1Person(weather,time,terrain,squad.members.FTB.FTL);
    update1Person(weather,time,terrain,squad.members.FTB.M1);
    update1Person(weather,time,terrain,squad.members.FTB.M2);
    update1Person(weather,time,terrain,squad.members.FTB.M3);
    update1Person(weather,time,terrain,squad.members.FTB.M4);
};
function moraleUpdate1Person(person){
    let calculatedMorale=0;
    if(person!=0){
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
        calculatedMorale+=kvc_uniform(person).moraleImpact;
        calculatedMorale+=kvc_backpack(person).moraleImpact;
        calculatedMorale+=kvc_helmet(person).moraleImpact;
        calculatedMorale+=kvc_sleepingbag(person).moraleImpact;
        calculatedMorale+=kvc_tent(person).moraleImpact;
        calculatedMorale+=kvc_vest(person).moraleImpact;
        person.status.morale=calculatedMorale;
    }
};
function ssoPS_reducer(result,row){
    const rowResult = row.reduce(
        function (personResult,person){
            if(person===0){
                return personResult;
            }
            return{
                totalAPPoints:personResult.totalAPPoints+person.status.points.AP,
                totalAVPoints:personResult.totalAVPoints+person.status.points.AV,
                totalAAPoints:personResult.totalAAPoints+person.status.points.AA
            };
        },
        {
            totalAPPoints:0,
            totalAVPoints:0,
            totalAAPoints:0
        }
    )
    return{
        totalAPPoints:result.totalAPPoints+rowResult.totalAPPoints,
        totalAVPoints:result.totalAVPoints+rowResult.totalAVPoints,
        totalAAPoints:result.totalAAPoints+rowResult.totalAAPoints
    };
};
function soPS_1Squad(squad){
    let allAPPoints=0;
    let allAVPoints=0;
    let allAAPoints=0;
    let personnelClass = 0;
    let person = 0;
    return squad.members.reduce(ssoPS_reducer,{
        totalAPPoints:0,
        totalAVPoints:0,
        totalAAPoints:0
    });
    
};
function sssoPS_evalSL1Stat(stat,threshold,multiplier){
    return((stat-threshold)*multiplier);
};
function ssoPS_evalSLPerf(SL){
    if(SL!=0){
        let SLStats=SL.status.leadership;
        let modifier = 0;
        modifier+=sssoPS_evalSL1Stat(SLStats.attributes.intellect[0],5,cfg.multipliers.personnel.sLeadership.intellect.mentalAgility);
        modifier+=sssoPS_evalSL1Stat(SLStats.attributes.intellect[1],5,cfg.multipliers.personnel.sLeadership.intellect.judgement);
        modifier+=sssoPS_evalSL1Stat(SLStats.attributes.intellect[2],5,cfg.multipliers.personnel.sLeadership.intellect.innovation);
        modifier+=sssoPS_evalSL1Stat(SLStats.attributes.intellect[3],5,cfg.multipliers.personnel.sLeadership.intellect.tact);
        modifier+=sssoPS_evalSL1Stat(SLStats.attributes.intellect[4],5,cfg.multipliers.personnel.sLeadership.intellect.expertise);
    
        modifier+=sssoPS_evalSL1Stat(SLStats.attributes.presence[0],5,cfg.multipliers.personnel.sLeadership.presence.milAndProfBearing);
        modifier+=sssoPS_evalSL1Stat(SLStats.attributes.presence[1],5,cfg.multipliers.personnel.sLeadership.presence.fitness);
        modifier+=sssoPS_evalSL1Stat(SLStats.attributes.presence[2],5,cfg.multipliers.personnel.sLeadership.presence.confidence);
        modifier+=sssoPS_evalSL1Stat(SLStats.attributes.presence[3],5,cfg.multipliers.personnel.sLeadership.presence.resilience);

        modifier+=sssoPS_evalSL1Stat(SLStats.competencies.leads[0],5,cfg.multipliers.personnel.sLeadership.leads.leadsOthers);
        modifier+=sssoPS_evalSL1Stat(SLStats.competencies.leads[1],5,cfg.multipliers.personnel.sLeadership.leads.buildsTrust);
        modifier+=sssoPS_evalSL1Stat(SLStats.competencies.leads[2],5,cfg.multipliers.personnel.sLeadership.leads.influence);
        modifier+=sssoPS_evalSL1Stat(SLStats.competencies.leads[3],5,cfg.multipliers.personnel.sLeadership.leads.leadsByExample);
        modifier+=sssoPS_evalSL1Stat(SLStats.competencies.leads[4],5,cfg.multipliers.personnel.sLeadership.leads.communicationSkills);

        modifier+=sssoPS_evalSL1Stat(SLStats.competencies.develops[0],5,cfg.multipliers.personnel.sLeadership.develops.createsPositiveEnvironment);
        modifier+=sssoPS_evalSL1Stat(SLStats.competencies.develops[1],5,cfg.multipliers.personnel.sLeadership.develops.preparesSelf);
        modifier+=sssoPS_evalSL1Stat(SLStats.competencies.develops[2],5,cfg.multipliers.personnel.sLeadership.develops.devsOthers);
        modifier+=sssoPS_evalSL1Stat(SLStats.competencies.develops[3],5,cfg.multipliers.personnel.sLeadership.develops.stewardsProfession);

        modifier+=(SL.status.hoursCombatExperience*cfg.multipliers.personnel.sLeadership.pointsBuffByHourInCombat);
        return modifier;
    }else{
        return cfg.multipliers.personnel.sLeadership.staticPointDebuffNoLeadership;
    }

};
function oPS_UpdatePoints1Squad(weather,time,terrain,squad){
    let rawData = soPS_1Squad(squad);
    let APPoints=rawData.totalAPPoints;
    let AVPoints=rawData.totalAVPoints;
    let AAPoints=rawData.totalAAPoints;
    let SLMultiplier=ssoPS_evalSLPerf(squad.members[0][0]);
    APPoints*=(SLMultiplier+1);
    AVPoints*=(SLMultiplier+1);
    AAPoints*=(SLMultiplier+1);
    squad.points={
        AP:APPoints,
        AV:AVPoints,
        AA:AAPoints
    }
};
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

};


// HUMAN FACTORS
function hf_combatExperienceUpdate(terrain,person){
    if(person.status.currentActivity==0){
        person.status.hoursJobExperience+=((cfg.multipliers.personnel.experience.hCEPHVariousCombatModes[person.status.inCombatType])*(1/cfg.general.refreshRate));
        if(person.ID[2]<=1){
            person.status.leadership.intellect[4]+=(cfg.multipliers.personnel.sLeadership.expertisePerHourInCombat/cfg.general.refreshRate);
        }
    };
};
function sHF_sIWTF_capabilities(person){
    let wTF=0;
    return wTF;
};
function sHF_sIWTF_motivations(person){
    let wTF=0;
    return wTF;
};
function hf_individualWillToFight(person){
    let wTF=0;
    wTF+=sHF_sIWTF_capabilities(person);
    wTF+=sHF_sIWTF_motivations(person);
    person.status.willToFight.totalWillToFight=wTF
};
function hf_fatigue1Person(person){
    let activeHours=person.status.hActiveSinceLRest;
    let newFatigue=0;
    newFatigue+=(activeHours[0]*cfg.multipliers.personnel.expenditures.fatigueByActivity[0]);
    newFatigue+=(activeHours[1]*cfg.multipliers.personnel.expenditures.fatigueByActivity[1]);
    newFatigue+=(activeHours[2]*cfg.multipliers.personnel.expenditures.fatigueByActivity[2]);
    newFatigue+=(activeHours[3]*cfg.multipliers.personnel.expenditures.fatigueByActivity[3]);
    newFatigue+=(activeHours[4]*cfg.multipliers.personnel.expenditures.fatigueByActivity[4]);
    newFatigue+=(activeHours[5]*cfg.multipliers.personnel.expenditures.fatigueByActivity[5]);
    newFatigue+=(activeHours[6]*cfg.multipliers.personnel.expenditures.fatigueByActivity[6]);
    if((person.status.currentActivity===3)||(person.status.currentActivity===4)){
        if(person.status.currentActivity===3){
            activeHours[0]*=((1-cfg.multipliers.personnel.health.sleepHoursCancelPercentRelaxing)/cfg.general.refreshRate);
            activeHours[1]*=((1-cfg.multipliers.personnel.health.sleepHoursCancelPercentRelaxing)/cfg.general.refreshRate);
            activeHours[2]*=((1-cfg.multipliers.personnel.health.sleepHoursCancelPercentRelaxing)/cfg.general.refreshRate);
            activeHours[3]*=((1-cfg.multipliers.personnel.health.sleepHoursCancelPercentRelaxing)/cfg.general.refreshRate);
            activeHours[4]*=((1-cfg.multipliers.personnel.health.sleepHoursCancelPercentRelaxing)/cfg.general.refreshRate);
            activeHours[5]*=((1-cfg.multipliers.personnel.health.sleepHoursCancelPercentRelaxing)/cfg.general.refreshRate);
            activeHours[6]*=((1-cfg.multipliers.personnel.health.sleepHoursCancelPercentRelaxing)/cfg.general.refreshRate);
        }else{
            activeHours[0]*=((1-cfg.multipliers.personnel.health.sleepHoursCancelPercentReserve)/cfg.general.refreshRate);
            activeHours[1]*=((1-cfg.multipliers.personnel.health.sleepHoursCancelPercentReserve)/cfg.general.refreshRate);
            activeHours[2]*=((1-cfg.multipliers.personnel.health.sleepHoursCancelPercentReserve)/cfg.general.refreshRate);
            activeHours[3]*=((1-cfg.multipliers.personnel.health.sleepHoursCancelPercentReserve)/cfg.general.refreshRate);
            activeHours[4]*=((1-cfg.multipliers.personnel.health.sleepHoursCancelPercentReserve)/cfg.general.refreshRate);
            activeHours[5]*=((1-cfg.multipliers.personnel.health.sleepHoursCancelPercentReserve)/cfg.general.refreshRate);
            activeHours[6]*=((1-cfg.multipliers.personnel.health.sleepHoursCancelPercentReserve)/cfg.general.refreshRate);
        }
        person.status.hActiveSinceLRest=activeHours;
    }
    person.status.fatigue=newFatigue;
}


// COMBAT //
function sc_personCombatRange(person){

};
function c_squadCombatRange(squad){

};

// RESUPPLY HANDLERS //



// INJURY OR DEATH CHANCE CALCULATIONS


// LOCATIONS AND PROXIMITY 





// TRAVEL

// MISCELLANIOUS UTILITY
function randomIntInclusive(min,max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min+1)+min);
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
    let time = new Date();
    if(person!=0){
        if(randomChance<cfg.nationalities.percentageInfWomenByService[person.ID[0]][person.ID[1]]){
            isWoman=1;
        }
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
};
function mu_isNight(time){
    if((time<runtimeVariables.date.sunRise)||(time>runtimeVariables.date.sunSet)){//is it night time?
        return true;
    }else{
        return false;
    }
};
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
};
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
};

// FUNCTIONS AFFECTING THE PLAYER //
