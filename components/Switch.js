import React, { useState } from 'react';
import { Switch } from 'react-native-elements';
import { secondaryColor } from '../constants/Colors';

type SwitchComponentProps = {};

const SwitchComponent: React.FunctionComponent<SwitchComponentProps> = () => {
    const [checked, setChecked] = useState(false);

    const toggleSwitch = () => {
        console.log('working');
        setChecked(!checked);
    };

    return (
        <Switch
            value={checked}
            color={secondaryColor}
            onValueChange={(value) => toggleSwitch() }
        />
    );
};

export default SwitchComponent;