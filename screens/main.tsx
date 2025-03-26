import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import CatCard from '@modules/cats/cat-card'
import {ActivityIndicator, Button} from 'react-native-paper'
import { useRouter } from 'expo-router'
import {useCats} from '@modules/cats/cat-hooks'

export default function HomeScreen() {
  const router = useRouter()
  const {
    cats,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useCats({ limit: 10 })

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        icon="camera"
        mode="contained"
        onPress={() => router.push('/upload')}
      >
        Upload Cat
      </Button>
      <FlatList
        data={cats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CatCard cat={item} />}
        numColumns={1}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        }}
        onEndReachedThreshold={0.5}
        refreshing={isRefetching}
        onRefresh={refetch}
        ListFooterComponent={
          isFetchingNextPage ? <ActivityIndicator style={{ margin: 16 }} /> : null
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  button: { marginVertical: 8 },
})
