import {
    ICameraPermissions,
    useCameraPermissions
} from './useCameraPermissions';
import { ICameraType, useCameraType } from './useCameraType';

export type ICamera = ICameraPermissions & ICameraType;

export function useCamera(): ICamera {
    return { ...useCameraPermissions(), ...useCameraType() };
}
