import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import CatCard from './cat-card'
import { fetchImages } from './api'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../app'
import { Button } from 'react-native-paper'
import { useQuery } from 'react-query'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

interface Cat {
  id: string
  url: string
  favourite_id?: number
}

export default function HomeScreen({ navigation }: Props) {
  const { data: cats, refetch, isLoading } = useQuery<Cat[]>('cats', fetchImages)

  return (
    <View style={styles.container}>
      <Button style={styles.button} icon="camera" mode="contained" onPress={() => navigation.navigate('Upload')} >
        Upload Cat
      </Button>
      <FlatList
        data={cats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CatCard cat={item} />}
        numColumns={1}
        onRefresh={refetch}
        refreshing={isLoading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  button: { marginVertical: 8, }
})
