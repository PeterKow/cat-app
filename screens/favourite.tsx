import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import CatCard from '@modules/cats/cat-card'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Cat} from '@modules/cats/cat-types'

export default function FavouritesScreen() {
  const [favourites, setFavourites] = useState<Cat[]>([])
  const [refreshing, setRefreshing] = useState(false)

  const loadFavourites = async () => {
    const json = await AsyncStorage.getItem('favourites')
    if (json) setFavourites(JSON.parse(json))
  }

  useEffect(() => {
    loadFavourites()
  }, [])

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadFavourites()
    setRefreshing(false)
  }

  return (
    <FlatList
      data={favourites}
      // @ts-ignore
      keyExtractor={item => item.favourite_id}
      renderItem={({ item }) => <CatCard cat={item} />}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  )
}
