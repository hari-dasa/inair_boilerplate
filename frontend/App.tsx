import React from "react";
import { useSettingsButton } from "@airtable/blocks/ui";
import { useState } from "react";
import Settings from "./Settings";
import { CupStraw, PersonWorkspace } from "react-bootstrap-icons";
import Header from "./Header";
import './App.scss';
import { globalConfig } from "@airtable/blocks";
import useCustomColors from "./useCustomColors";

const App = () => {

    // Show settings button
    const [isShowingSettings, setIsShowingSettings] = useState(false);
    useSettingsButton(function () {
        setIsShowingSettings(!isShowingSettings);
    });

    // Example of Bootstrap icons
    const icons = <div className="icons"><PersonWorkspace color="#5577AA" /><CupStraw color="#55AA77" /></div>;

    // Example of Globalconfig and use of custom hook
    const backgroundColor = globalConfig.get('backgroundColor') as string;
    const headerColor = globalConfig.get('headerColor') as string;
    useCustomColors({backgroundColor, headerColor});

    return (
        <div className="container">
            {isShowingSettings ? <Settings /> : <>
                <Header title="Hello from InAir Studio!" icon={icons} />
                <p>Let's build an app using React-Bootstrap!</p>
            </>}
        </div>
    );
}

export default App;