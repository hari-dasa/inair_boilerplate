import React, { useEffect } from "react";
import { useSettingsButton } from "@airtable/blocks/ui";
import { useState } from "react";
import Settings, {capitalizePrototypeConfig} from "./Settings";
import { CupStraw, PersonWorkspace } from "react-bootstrap-icons";
import Header from "./Header";
import './App.scss';
import { globalConfig } from "@airtable/blocks";
import useCustomColors from "./useCustomColors";
import { SelectRecords } from "./Accessors";
import { Tab, Tabs } from "react-bootstrap";
import PokemonView from "./PokemonView";

const App = () => {

    // Show settings button
    const [isShowingSettings, setIsShowingSettings] = useState(false);
    useSettingsButton(function () {
        setIsShowingSettings(!isShowingSettings);
    });

    useEffect(() => {
        capitalizePrototypeConfig();
        // console.log(SelectRecords("Pokémon", "Name"));
        
    });

    // Example of Bootstrap icons
    const icons = <div className="icons"><PersonWorkspace color="#5577AA" /><CupStraw color="#55AA77" /></div>;

    // Example of Globalconfig and use of custom hook
    const backgroundColor = globalConfig.get('backgroundColor') as string;
    const headerColor = globalConfig.get('headerColor') as string;
    useCustomColors({backgroundColor, headerColor});

    return (
        <div className="container">
            {isShowingSettings ? 
                <Settings /> 
            : 
                <>
                    <Header title="📕Airtable Pokédex - InAir Academy" icon={icons} />
                    <p><></>Let's manage your pokedex database! </p>
                    <Tabs defaultActiveKey="pokemon" className="tables-tabs">
                        <Tab eventKey="pokemon" title="Pokemon Table">
                            <PokemonView />
                        </Tab>                        
                        <Tab eventKey="types" title="Types Table">

                        </Tab>                              
                        <Tab eventKey="abilities" title="Abilities Table">

                        </Tab>              
                    </Tabs>
                </>
            }
        </div>
    );
}

export default App;