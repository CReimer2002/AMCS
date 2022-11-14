import DB from "./DB.js";
let forces = {
    blueCo:{
        name:"1st company, 2nd battalion, 504th infantry regiment, 1st Infantry BCT, 82nd Airborne Divison, US Army",
        platoon1:{
            name:"1st Platoon",
            squad1:{
                name:"1st squad",
                ID:0,
                members:[
                    [structuredClone(DB.components.personnel.US.army.infantry.inf_11Z_SL),0,0,0],//leadership
                    [structuredClone(DB.components.personnel.US.army.infantry.inf_11B_FTL),structuredClone(DB.components.personnel.US.army.infantry.inf_11B_FTL),0,0],//senior rifleman/ftl/asl
                    [structuredClone(DB.components.personnel.US.army.infantry.inf_11B_Gren),structuredClone(DB.components.personnel.US.army.infantry.inf_11B_Gren),0,0],//grenadier/engineer/heavy weapons
                    [structuredClone(DB.components.personnel.US.army.infantry.inf_11BC_M249),structuredClone(DB.components.personnel.US.army.infantry.inf_11BC_M249),0,0],//machine gunner
                    [0,0,0,0],//assistant machine gunner/assistant grenadier/ammunition carrier
                    [structuredClone(DB.components.personnel.US.army.infantry.inf_11B_LAT),structuredClone(DB.components.personnel.US.army.infantry.inf_11B_LAT),0,0],//rifleman
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
                    supplyPool:[
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
                        0,
                        0,
                        0,
                        0
                    ],
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
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
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
                    [structuredClone(DB.components.personnel.Abkhazia.army.infantry.inf_11Z_Base),0,0,0],//leadership
                    [structuredClone(DB.components.personnel.Abkhazia.army.infantry.inf_11B_FTL),structuredClone(DB.components.personnel.Abkhazia.army.infantry.inf_11B_FTL),0,0],//senior rifleman/ftl/asl
                    [structuredClone(DB.components.personnel.Abkhazia.army.infantry.inf_11B_gren_RPG7),0,0,0],//grenadier/engineer/heavy weapons
                    [structuredClone(DB.components.personnel.Abkhazia.army.infantry.inf_11BC_RPK74M),structuredClone(DB.components.personnel.Abkhazia.army.infantry.inf_11BC_RPK74M),0,0],//machine gunner
                    [structuredClone(DB.components.personnel.Abkhazia.army.infantry.inf_11B_grenAsst),0,0,0],//assistant machine gunner/assistant grenadier/ammunition carrier
                    [structuredClone(DB.components.personnel.Abkhazia.army.infantry.inf_11B_base),structuredClone(DB.components.personnel.Abkhazia.army.infantry.inf_11B_base),0,0],//rifleman
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
                supply:{
                    supplyPool:[
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
                        0,
                        0,
                        0,
                        0
                    ],
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
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ],
                    
                }
            },
        },
    }, 
}
let forcesReference=structuredClone(forces);
export default {forces,forcesReference}