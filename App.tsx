import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
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
    return (
        <View>
            <Camera
                style={{ height: 300, width: 300 }}
                type={camera.cameraType}
            />
            <TouchableOpacity onPress={camera.toggleCameraType}>
                <Text>Switch Camera</Text>
            </TouchableOpacity>
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
