import React, { useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { uploadImage } from './api'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../app'
import Toast from 'react-native-toast-message'
import { Button } from 'react-native-paper'

type Props = NativeStackScreenProps<RootStackParamList, 'Upload'>

export default function UploadScreen({ navigation }: Props) {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handleUpload = async () => {
    if (!image) return

    setLoading(true)
    try {
      const res = await uploadImage(image)
      Toast.show({
        type: 'success',
        text1: 'Upload Successful',
        text2: 'Your image was uploaded successfully'
      })
      navigation.navigate('Home')
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Upload Error',
        text2: 'There was an error during upload'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Button style={styles.button} icon="camera" mode="contained" onPress={pickImage}>
        Pick an image from gallery
      </Button>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Toast />
      <Button icon="file-upload" mode="contained" loading={loading} disabled={loading} onPress={handleUpload}>
        {loading ? 'Uploading...' : 'Save'}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: 200, height: 200, marginVertical: 20 },
  button: { marginVertical: 8, }
})
