import React, { useState } from 'react'
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import CatCard from '@modules/cats/cat-card'
import { ActivityIndicator, Button, TextInput, Text } from 'react-native-paper'
import { useRouter } from 'expo-router'
import { useCats } from '@modules/cats/cat-hooks'

export default function HomeScreen() {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('') // eg. 'bengal'
  const {
    cats,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useCats({ limit: 10, search })

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Button
          style={styles.button}
          icon="camera"
          mode="contained"
          onPress={() => router.push('/upload')}
        >
          Upload Cat
        </Button>
        <TextInput
          label="Search Cats"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => setSearch(input)}
          style={{ marginBottom: 8 }}
        />
        <FlatList
          data={cats}
          keyExtractor={item => item.id.toString()}
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
          ListEmptyComponent={
            !isFetchingNextPage ? (
              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text>No cats found</Text>
              </View>
            ) : null
          }
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator style={{ margin: 16 }} /> : null
          }
        />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  button: { marginVertical: 8 },
})
