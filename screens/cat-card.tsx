import React, { useState } from 'react'
import { View, Image, Button, Text, StyleSheet } from 'react-native'
import { favouriteCat, unfavouriteCat } from './api'

interface Cat {
  id: string
  url: string
  favourite_id?: number
}

interface Props {
  cat: Cat
  onVote: (image_id: string, value: number) => Promise<void>
}

export default function CatCard({ cat, onVote }: Props) {
  const [isFavourite, setIsFavourite] = useState(false)
  const [score, setScore] = useState(0)

  const handleFavourite = async () => {
    if (!isFavourite) {
      const res = await favouriteCat(cat.id)
      if (res.status === 200) setIsFavourite(true)
    }
    else {
      await unfavouriteCat(cat.favourite_id || '')
      setIsFavourite(false)
    }
  }

  const handleVoteUp = async () => {
    await onVote(cat.id, 1)
    setScore(score + 1)
  }

  const handleVoteDown = async () => {
    await onVote(cat.id, 0)
    setScore(score - 1)
  }

  return (
    <View style={styles.card}>
      <Image source={{ uri: cat.url }} style={styles.image} />
      <Text>Score: {score}</Text>
      <View style={styles.buttons}>
        <Button title="Vote Up" onPress={handleVoteUp} />
        <Button title="Vote Down" onPress={handleVoteDown} />
      </View>
      <Button title={isFavourite ? 'Unfavourite' : 'Favourite'} onPress={handleFavourite} />
    </View>
  )
}

const styles = StyleSheet.create({
  card: { flex: 1, margin: 5, borderWidth: 1, borderRadius: 8, padding: 10 },
  image: { width: '100%', height: 150, borderRadius: 8 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }
})
