import React, { useState } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { favouriteCat, unfavouriteCat } from './api'
import { Button } from 'react-native-paper'
import Card from '@components/ui/card'
import Toast from 'react-native-toast-message'

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
      try {
        //TODO decide on the api fetch client and notification handling
        const res = await favouriteCat(cat.id)
        setIsFavourite(true)
        Toast.show({
          type: 'success',
          text1: 'Favourite Success',
        })
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Please try again.',
        })
      }
    }
    else {
      await unfavouriteCat(cat.favourite_id || '')
      setIsFavourite(false)
    }
  }

  const handleVoteUp = async () => {
    await onVote(cat.id, 1)
    // TODO for now: optimistic update
    setScore(score + 1)
  }

  const handleVoteDown = async () => {
    await onVote(cat.id, 0)
    // TODO for now: optimistic update
    setScore(score - 1)
  }

  return (
    <Card>
      <Image source={{ uri: cat.url }} style={styles.image} />
      <Text style={styles.score}>Score: {score}</Text>
      <View style={styles.buttons}>
        <Button icon="thumb-up" mode="contained" onPress={handleVoteUp}>
          Vote Up
        </Button>
        <Button icon="thumb-down" mode="contained" onPress={handleVoteDown}>
          Vote Down
        </Button>
      </View>
      <Button icon={isFavourite ? 'heart-outline' : 'heart'} mode="contained" onPress={handleFavourite}>
        {isFavourite ? 'Unfavourite' : 'Favourite'}
      </Button>
    </Card>
  )
}

const styles = StyleSheet.create({
  score: {
    paddingTop: 8,
    textAlign: 'center',
    fontSize: 22,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingBottom: 8,
    paddingTop: 8,
  },
})
