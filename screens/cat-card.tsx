import React, { useState } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { favouriteCat, unfavouriteCat, voteCat } from './api'
import { Button } from 'react-native-paper'
import Card from '@components/ui/card'
import Toast from 'react-native-toast-message'
import { useMutation } from 'react-query'

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

  const favouriteMutation = useMutation(() => favouriteCat(cat.id), {
    onSuccess: () => {
      setIsFavourite(true)
      Toast.show({
        type: 'success',
        text1: 'Favourite Success',
        text2: 'You love it',
      })
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Please try again.',
      })
    }
  })

  // TODO fix: use actually fav_id
  const unfavouriteMutation = useMutation(() => unfavouriteCat(cat.favourite_id || ''), {
    onSuccess: () => {
      setIsFavourite(false)
      Toast.show({
        type: 'success',
        text1: 'Unfavourite Success',
        text2: 'Maybe next time',
      })
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Please try again.',
      })
    }
  })

  const voteUpMutation = useMutation(() => voteCat(cat.id, 1), {
    onSuccess: () => {
      setScore(prev => prev + 1)
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Please try again.'
      })
    }
  })

  const voteDownMutation = useMutation(() => voteCat(cat.id, -1), {
    onSuccess: () => {
      setScore(prev => (prev > 0 ? prev - 1 : 0))
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'Please try again.'
      })
    }
  })

  const handleFavourite = () => {
    if (!isFavourite) {
      favouriteMutation.mutate()
    }
    else {
      unfavouriteMutation.mutate()
    }
  }

  const handleVoteUp = () => {
    voteUpMutation.mutate()
  }

  const handleVoteDown = () => {
    voteDownMutation.mutate()
  }

  const favouriteLoading = favouriteMutation.isLoading || unfavouriteMutation.isLoading

  return (
    <Card>
      <Image source={{ uri: cat.url }} style={styles.image} />
      <Text style={styles.score}>Score: {score}</Text>
      <View style={styles.buttons}>
        <Button
          icon="thumb-up"
          mode="contained"
          onPress={handleVoteUp}
          loading={voteUpMutation.isLoading}
        >
          Vote Up
        </Button>
        <Button
          icon="thumb-down"
          mode="contained"
          onPress={handleVoteDown}
          loading={voteDownMutation.isLoading}
        >
          Vote Down
        </Button>
      </View>
      <Button
        icon={isFavourite ? 'heart-outline' : 'heart'}
        mode="contained"
        onPress={handleFavourite}
        loading={favouriteLoading}
      >
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
