import React, { useState, useEffect } from 'react'
import { View, FlatList, Button, StyleSheet } from 'react-native'
import CatCard from './cat-card'
import { fetchImages, voteCat } from './api'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../app'

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

  const handleVote = async (image_id: string, value: number) => {
    await voteCat(image_id, value)
    loadCats()
  }

  return (
    <View style={styles.container}>
      <Button title="Upload Cat" onPress={() => navigation.navigate('Upload')} />
      <FlatList
        data={cats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CatCard cat={item} onVote={handleVote} />}
        numColumns={2}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 }
})
