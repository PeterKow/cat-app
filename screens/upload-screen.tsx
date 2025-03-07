import React, { useState } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import { Button } from 'react-native-paper'
import { uploadImage } from './api'

export default function UploadScreen() {
  const [image, setImage] = useState<string | null>(null)
  const router = useRouter()

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

  const { mutate: handleUpload, isPending } = useMutation({
    mutationFn: async () => {
      if (!image) throw new Error('No image selected')
      return uploadImage(image)
    },
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Upload Successful',
        text2: 'Your image was uploaded successfully'
      })
      router.push('/')
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Upload Error',
        text2: 'There was an error during upload'
      })
    }
  })

  return (
    <View style={styles.container}>
      <Button style={styles.button} icon="camera" mode="contained" onPress={pickImage}>
        Pick an image from gallery
      </Button>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Toast />
      <Button icon="file-upload" mode="contained" loading={isPending} disabled={isPending} onPress={() => handleUpload()}>
        {isPending ? 'Uploading...' : 'Save'}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: 200, height: 200, marginVertical: 20 },
  button: { marginVertical: 8 }
})
