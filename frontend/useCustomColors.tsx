/**
 * Example of a custom hook to set configuration in real-time
 */
import { colorUtils } from '@airtable/blocks/ui';
import { useEffect } from 'react';

type CustomColorsProps = {
    backgroundColor: string;
    headerColor: string;
}

const useCustomColors = ({ backgroundColor, headerColor }: CustomColorsProps) => {
    useEffect(() => {
        const root = window.document.documentElement;
        if (backgroundColor) {
            root.style.setProperty('--backgroundColor', colorUtils.getHexForColor(backgroundColor))
        }
    }, [backgroundColor])
    useEffect(() => {
        const root = window.document.documentElement;
        if (headerColor) {
            root.style.setProperty('--headerColor', colorUtils.getHexForColor(headerColor))
        }
    }, [headerColor]);
}

export default useCustomColors;