import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import CatCard from './cat-card'
import { fetchImages } from './api'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../app'
import {Button} from 'react-native-paper'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

interface Cat {
  id: string
  url: string
  favourite_id?: number
}

export default function HomeScreen({ navigation }: Props) {
  const [cats, setCats] = useState<Cat[]>([])

  useEffect(() => {
    // TODO load only 4?
    loadCats()
  }, [])

  const loadCats = async () => {
    const data = await fetchImages()
    setCats(data)
  }

  return (
    <View style={styles.container}>
      <Button style={styles.button} icon="camera" mode="contained" onPress={() => navigation.navigate('Upload')} >
        Upload Cat
      </Button>
      <FlatList
        data={cats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CatCard cat={item}/>}
        numColumns={1}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  button: { marginVertical: 8, }
})
