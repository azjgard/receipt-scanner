import { useState, useEffect } from 'react';
import * as Permissions from 'expo-permissions';

type _PermissionStatus = Permissions.PermissionStatus;
type PermissionStatus = 'granted' | 'denied' | 'undetermined';

const { DENIED, GRANTED, UNDETERMINED } = Permissions.PermissionStatus;

export interface ICameraPermissions {
    permissionStatus: PermissionStatus;
    requestPermission: () => void;
}

export function useCameraPermissions(): ICameraPermissions {
    const [_permissionStatus, setPermissionStatus] = useState<
        _PermissionStatus
    >(UNDETERMINED);

    const requestPermission = () => {
        Permissions.askAsync(Permissions.CAMERA).then(({ status }) =>
            setPermissionStatus(status)
        );
    };

    useEffect(() => {
        Permissions.getAsync(Permissions.CAMERA).then(({ status }) => {
            setPermissionStatus(status);
        });
    }, []);

    let permissionStatus: PermissionStatus;

    switch (_permissionStatus) {
        case GRANTED:
            permissionStatus = 'granted';
            break;
        case DENIED:
            permissionStatus = 'denied';
            break;
        case UNDETERMINED:
            permissionStatus = 'undetermined';
            break;
    }

    return { permissionStatus, requestPermission };
}
