import React, { useState } from 'react'
import { View, Button, Image, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { uploadImage } from './api'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../app'
import Toast from 'react-native-toast-message'

type Props = NativeStackScreenProps<RootStackParamList, 'Upload'>

export default function UploadScreen({ navigation }: Props) {
  const [image, setImage] = useState<string | null>(null)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    console.log(result)
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handleUpload = async () => {
    if (image) {
      try {
        const res = await uploadImage(image)
        console.log('Upload response:', res)
        // if (res.status === 200 || res.status === 201) {
          Toast.show({
            type: 'success',
            text1: 'Upload Successful',
            text2: 'Your image was uploaded successfully'
          })
          navigation.navigate('Home')
        // } else {
        //   Toast.show({
        //     type: 'error',
        //     text1: 'Upload Failed',
        //     text2: 'There was an error uploading your image'
        //   })
        //   console.error('Upload failed:', res.status, res.data)
        // }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Upload Error',
          text2: 'There was an error during upload'
        })
        console.error('Upload error:', error)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Upload" onPress={handleUpload} />
      <Toast />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: 200, height: 200, marginVertical: 20 }
})
