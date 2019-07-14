import { useState } from 'react';
import { Camera } from 'expo-camera';

export type CameraType = 'front' | 'back';

export interface ICameraType {
    cameraType: CameraType;
    toggleCameraType: () => void;
}

export function useCameraType(): ICameraType {
    const [_cameraType, setCameraType] = useState(Camera.Constants.Type.back);

    const toggleCameraType = () => {
        if (_cameraType === Camera.Constants.Type.back) {
            return setCameraType(Camera.Constants.Type.front);
        }

        return setCameraType(Camera.Constants.Type.back);
    };

    let cameraType: CameraType;

    switch (_cameraType) {
        case Camera.Constants.Type.back:
            cameraType = 'back';
            break;
        case Camera.Constants.Type.front:
            cameraType = 'front';
            break;
    }

    return { cameraType, toggleCameraType };
}
