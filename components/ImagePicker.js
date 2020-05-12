import React, { useState } from 'react'
import {View, Button, StyleSheet, Image, Alert} from 'react-native'
import DefaultText from './DefaultText'
import { MainColors } from '../constants/MainColors'
import * as ImgPicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

const ImagePicker = props => {

    
    const [previewImg, setPreviewImg] = useState()

    const verifyPermissions = async () => {

        const result = await Permissions.askAsync(Permissions.CAMERA)
        if (result.status !== 'granted'){
            Alert.alert(
                'Insufficient Permissions',
                'You need to grant camera permissions to use this feature.',
                [{text: 'Okay'}]
            )
            return false
        }
        return true
    }

    const takeImageHandler =  async () => {
        const hasPermission = await verifyPermissions()
        if(!hasPermission){
            return
        }
        const image = await ImgPicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [16, 9],
            base64: true
        })

        setPreviewImg(image.base64)
        props.onImageTaken(image.base64)
    }

    return (
    <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
            {!previewImg ? <DefaultText>No image picked yet.</DefaultText> :
            <Image style={styles.image} source={{uri: `data:image/jpg;base64,${previewImg}`}} />}
        </View>
        <Button title="Take Image" color={MainColors.cardText} onPress={takeImageHandler} />
    </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center'
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: MainColors.cardText,
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default ImagePicker