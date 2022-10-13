import { base } from '@airtable/blocks';
import { FieldType } from '@airtable/blocks/models';
import { ColorPalette, colors, colorUtils, FieldPickerSynced, FormField, TablePickerSynced, useGlobalConfig, ViewPickerSynced } from '@airtable/blocks/ui';
import React, { useEffect } from 'react';
import { Card, Tab, Tabs } from 'react-bootstrap';
import { Sliders } from 'react-bootstrap-icons';
import Header from './Header';
import './Settings.scss';

const Settings = () => {
    const globalConfig = useGlobalConfig();

    const tableId = globalConfig.get('selectedTableId') as string;

    const table = base.getTableByIdIfExists(tableId);

    // Color config example
    const backgroundColor = globalConfig.get('backgroundColor') as string;
    useEffect(() => {
        const root = window.document.documentElement;
        if (backgroundColor) {
            root.style.setProperty('--backgroundColor', colorUtils.getHexForColor(backgroundColor))
        }
    }, [backgroundColor]);
    const headerColor = globalConfig.get('headerColor') as string;
    useEffect(() => {
        const root = window.document.documentElement;
        if (headerColor) {
            root.style.setProperty('--headerColor', colorUtils.getHexForColor(headerColor))
        }
    }, [headerColor]);
    // -- End color config example

    return (
        <>
            <Header title="App Settings" icon={<Sliders color="#5577AA" />} />
            <Tabs defaultActiveKey="configuration" className="configuration-tabs">
                <Tab eventKey="configuration" title="Configuration">
                    <Card className="configuration">
                        <FormField label="Table">
                            <TablePickerSynced globalConfigKey="selectedTableId" />
                        </FormField>
                        <FormField label="View">
                            <ViewPickerSynced table={table} globalConfigKey="selectedViewId" />
                        </FormField>
                        <FormField label="Field" marginBottom={0}>
                            <FieldPickerSynced
                                table={table}
                                globalConfigKey="selectedDoneFieldId"
                                placeholder="Pick a 'done' field..."
                                allowedTypes={[FieldType.CHECKBOX]}
                            />
                        </FormField>
                    </Card>
                </Tab>
                <Tab eventKey="colors" title="Colors">
                    {/* Color config example */}
                    <Card className="configuration colors">
                        <FormField label="Background Color">
                            <ColorPalette
                                onChange={newColor => globalConfig.setAsync('backgroundColor', newColor)}
                                allowedColors={Object.values(colors)}
                                width="150px"
                            />
                        </FormField>
                        <FormField label="Header Color">
                            <ColorPalette
                                onChange={newColor => globalConfig.setAsync('headerColor', newColor)}
                                allowedColors={Object.values(colors)}
                                width="150px"
                            />
                        </FormField>
                    </Card>
                    {/* End color config example */}
                </Tab>
                <Tab eventKey="about" title="About">
                    <Card className="configuration">
                        <p>A demo to-do list app that uses Bootstrap.</p>
                    </Card>
                </Tab>
                <Tab eventKey="license" title="License">
                    <Card className="configuration">
                        &copy; {new Date().getFullYear()} InAir Studio
                    </Card>
                </Tab>
            </Tabs>
        </>
    )
}

export default Settings;