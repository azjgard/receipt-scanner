import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    ImageSourcePropType
} from 'react-native';
import { Camera } from 'expo-camera';
import { useCamera, ICamera } from './camera/useCamera';

export default function App() {
    const camera = useCamera();

    return (
        <View style={styles.container}>
            {camera.permissionStatus === 'granted' && (
                <CameraContainer camera={camera} />
            )}
        </View>
    );
}

function CameraContainer({ camera }: { camera: ICamera }) {
    let { current: cameraRef } = useRef<Camera | null>(null);
    const [
        imagePreview,
        setImagePreview
    ] = useState<ImageSourcePropType | null>(null);

    const setCameraRef = (c: Camera) => (cameraRef = c);

    const takePic = async () => {
        if (cameraRef) {
            cameraRef.takePictureAsync().then(setImagePreview);
        }
    };

    return (
        <View>
            <Camera
                style={{ height: 300, width: 300 }}
                type={camera.cameraType}
                ref={setCameraRef}
            />
            <TouchableOpacity onPress={camera.toggleCameraType}>
                <Text>Switch Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePic}>
                <Text>Oh SNAP</Text>
            </TouchableOpacity>
            {!!imagePreview && (
                <Image
                    source={imagePreview}
                    style={{ height: 50, width: 50 }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
