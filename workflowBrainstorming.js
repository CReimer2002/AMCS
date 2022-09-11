/*How does the simulation work, at it's core?
    2 armies: Attacker and Defender along with adjacent friendly forces that can provide services and aren't directly involved in the fighting
        Each army (side, more accurately speaking) has forces at it's disposal
            These forces can be outfitted with any number of various pieces of equipment, personnel, supplies, etc. 
    1 region to fight in
        Each region has any number of smaller strategic zones that must be captured
            Each zone has a name, variable size, and terrain type (forest, urban, etc.)
    The attacker attempts to capture the defender's areas of the region
        This occurs by capturing zones
            The capture of zones is accomplished by having attacking units near or in them and changing the balance of power for that zone. 
                The balance of power is determined by a number of factors including but not limited to the weather, time of day, presence and capabilities of forces, civil population, civil attitudes, civil access to weapons, supporting units, etc. 
            If the zone is captured the forces may stay or move on to the next zone.
            If the zone is not captured the forces may retreat.
    The simulation ends when one side loses.
        This can be set as one side running out of supplies, men or equipment, one side failing to have a zone after a certain amount of time, or simply be cut short after a certain number of days. 
    
*/