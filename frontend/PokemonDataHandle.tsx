import {useBase, useRecords} from '@airtable/blocks/ui';
import React from 'react';
import { Accessors} from './Accessors';

class PokemonTableDataHandle 
{
    public typesRecords;
    public abilitieRecords;

    constructor(abilitieRecords, typesRecords) {
        this.typesRecords = typesRecords;
        this.abilitieRecords = abilitieRecords;
    }
    public async formatData({id, name, height, weight, order, base_experience, stats, game_indices, sprites, types, abilities}){
        return {
            "fldVVhJlPT0Pfmwos":   name,//Name
            "fld9kcvyi56sgcQFV":   height,
            "fldEod3K9mLgRCyCM":   base_experience,
            "fldn8uoefVgtl1Nnq":   weight,
            "fldXACbC5CUSOOQim":   stats[0].base_stat,//HP
            "fldWWpZHzWEiUeIUn":   stats[1].base_stat,//Attack
            "fld2ZG1THHThEwgNQ":   stats[2].base_stat,//Defense
            "fldXbJW0WCbjGjn4e":   order,

            "fldlfBCItws1jDe1n":   this.defineGeneration(id),

            "fldHpDnt5nlwKAUDX":   this.defineGames(game_indices),

            "fldGRP2zf5yCCbE35":    await this.getRecordsIdFromTable(types, 'type'),
            "fldZdLOn3yJHggxDV":    await this.getRecordsIdFromTable(abilities, 'ability'),

            "fldPXZI7TaZgHL2zr":     this.getAttachs(Object.values(sprites)),
        };
    }

    private getRecordsIdFromFilter(records, types, field)
    {
        let recordsIds = [];
        for(var x = 0; x < types.length; x++) {
            let right  = records.length - 1;
            let left = 0;
            let middle = 0;

            while(left <= right){
                middle = Math.floor((left+right) / 2);

                if (records[middle].name.toLowerCase() == types[x][field].name){
                    recordsIds.push({ id: records[middle].id});
                    types.slice(x, 1)//
                    break;
                }else if(records[middle].name.toLowerCase()  < types[x][field].name){
                    left = middle + 1;
                } else {
                    right = middle - 1;
                }
            }
        
        }
        return recordsIds;
    }

    async getRecordsIdFromTable(abilities, attributeName){
        if(attributeName == "ability")
            return this.getRecordsIdFromFilter( this.abilitieRecords, abilities, attributeName);

        if(attributeName == "type")
            return this.getRecordsIdFromFilter( this.typesRecords, abilities, attributeName);
    }

    private getAttachs(sprites){
        return sprites.reduce(function(result, sprite) {
                    if(typeof(sprite === 'string') && sprite) 
                        result.push({url: sprite});
                    return result;
                },
            []).slice(0,2);
    }

    private defineGeneration(id)
    {
        if (id <= 151)
            return {name: 'Generation I'};
        return {name: 'Generation II'};
    }

    private defineGames(games)
    {
        return games.slice(0,2).map(game => ({ name: game.version.name.capitalize()}));
    }

}

export default PokemonTableDataHandle;
