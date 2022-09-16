
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


// VALUE CALCULATIONS //


function vc_individual(company,individual){
    let heffectiveness=0
    let hleadershipSkill=0;
    let hhmorale=0;
    let hhunger=0;
    let hthirst=0;
    let energy=0
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
    refreshNumber:cfg.general.refreshNumber,    
};
//ak74 w bipod and suppressor is 9.21
//ak74 w/o bipod and suppressor is 10.254
//ak74 w/o bipod and suppressor is 54.529
//SVD w bipod suppressor is 64
//SVD w bipod, suppressor and thermal nods is 82