import React from 'react';

export default function ActionSheetModel() {
    return (
        <ActionSheet
            ref={o => this.ActionSheet = o}
            title={'Which one do you like ?'}
            options={['Camera', 'Photo Library', 'Cancel']}
            cancelButtonIndex={2}
            onPress={(buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        launchCameraFun()
                        break;
                    case 1:
                        launchImageLibraryFun()
                        break;
                    default:
                        break;
                }
            }}
        />
    )
}
