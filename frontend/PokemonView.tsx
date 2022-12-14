import {Button, expandRecordPickerAsync, FormField, RecordCardList, Box, useBase, useRecords} from '@airtable/blocks/ui';
import React, { useEffect, useState } from 'react';
import { Card, Tab } from 'react-bootstrap';
import { Accessors } from './Accessors';
import "./PokemonView.scss";
// import { GetFields, GetRecords } from './Accessors';

import PokemonTableDataHandle from './PokemonDataHandle';

const PokeApi = "https://pokeapi.co/api/v2/";

class PokemonView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listRecords: false
        };
    }

    async createPokemon(record)
    { 
        this.setState({listRecords: false})
        const payload     = await this.fetchdata(record)
        const dataHandler = new PokemonTableDataHandle(this.props.abilitiesRecords, this.props.typesRecords);
        await this.props.table.createRecordAsync( await dataHandler.formatData(payload));
    }
    
    async fetchdata(record){
        let response = await fetch(`${PokeApi}pokemon/${record.name.toLowerCase()}`);
        return await response.json();
    }

    async pickRecordsAsync() {
        return await expandRecordPickerAsync(this.props.records);
    }

    render(): React.ReactNode {
        return <>
                        <Card className="pokemon">
                            <FormField  label=" Pokemons Duplicate " marginBottom={0}>
                                <Button
                                    icon="link"
                                    className="pokemon-list-button"
                                    onClick={() => this.setState({listRecords: !this.state.listRecords})}
                                >
                                    Click to list the records and pick one to duplicate
                                </Button>
                                {
                                this.state.listRecords?   
                                            <Box className='pokemon-list-box' height="350px" border="thick" backgroundColor="lightGray1">
                                                <RecordCardList 
                                                    records={this.props.records} 
                                                    fields={this.props.fields}
                                                    onRecordClick={(record) => this.createPokemon(record)}
                                                />
                                            </Box>
                                        : null
                                }
                            </FormField>
                        </Card>

                    {/* </Tab> */}
                </>;
    }
}

export default () => {
    const accessor = new Accessors("Pok??mon");
    const records = accessor.GetRecords();//tblEWHy8pqeEgZKUp
    const fields  = accessor.GetFields(["Name", "Sprites", "Generation"]);
    const abilitiesRecords    =   (new Accessors("Abilities")).GetRecords();
    const typesRecords        =   (new Accessors("Types")).GetRecords();

    return <PokemonView records={records} fields={fields} table={accessor.table} abilitiesRecords={abilitiesRecords} typesRecords={typesRecords}/>;  
} ;

