import React, { useState } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import {favouriteCat, unfavouriteCat, voteCat} from './api'
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
}

export default function CatCard({ cat }: Props) {
  const [isFavourite, setIsFavourite] = useState(false)
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState<null | 'favourite' | 'voteUp' | 'voteDown'>(null)

  const handleFavourite = async () => {
    setLoading('favourite')
    try {
      if (!isFavourite) {
        //TODO decide on the api fetch client and notification handling
        await favouriteCat(cat.id)
        setIsFavourite(true)
        Toast.show({
          type: 'success',
          text1: 'Favourite Success',
        })
      }
      else {
        await unfavouriteCat(cat.favourite_id || '')
        setIsFavourite(false)
        Toast.show({
          type: 'success',
          text1: 'Unfavourite Success',
        })
      }
    }
    catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Please try again.',
      })
    }
    setLoading(null)
  }

  const handleVoteUp = async () => {
    setLoading('voteUp')
    await voteCat(cat.id, 1)
    // TODO for now: optimistic update
    setScore(score + 1)
    setLoading(null)
  }

  const handleVoteDown = async () => {
    setLoading('voteDown')
    await voteCat(cat.id, 0)
    // TODO for now: optimistic update
    setScore(score - 1)
    setLoading(null)
  }

  return (
    <Card>
      <Image source={{ uri: cat.url }} style={styles.image} />
      <Text style={styles.score}>Score: {score}</Text>
      <View style={styles.buttons}>
        <Button icon="thumb-up" mode="contained" onPress={handleVoteUp} loading={loading === 'voteUp'}>
          Vote Up
        </Button>
        <Button icon="thumb-down" mode="contained" onPress={handleVoteDown} loading={loading === 'voteDown'}>
          Vote Down
        </Button>
      </View>
      <Button icon={isFavourite ? 'heart-outline' : 'heart'} mode="contained" onPress={handleFavourite} loading={loading === 'favourite'}>
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
