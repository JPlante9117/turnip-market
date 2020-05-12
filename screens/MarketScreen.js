import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, ImageBackground, FlatList, ActivityIndicator } from 'react-native'
import MarketCard from '../components/MarketCard'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPostings } from '../store/actions/postingActions'
import { MainColors } from '../constants/MainColors'

const MarketScreen = props => {

    const posts = useSelector(state => state.postings.postings)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const loadPosts = useCallback(async () => {
        try {
            await dispatch(fetchPostings())
        } catch(err){
            console.log(err)
        }
    }, [dispatch])

    useEffect(() => {
        setIsLoading(true)
        loadPosts().then(() => setIsLoading(false))
    }, [dispatch, setIsLoading, loadPosts])

    const renderCards = itemData => {
        return <MarketCard user={itemData.item.userId} price={itemData.item.price} handlePress={() => props.navigation.navigate('PostingDetails', {user: itemData.item.userId, id: itemData.item.id})} />
    }

    if (isLoading) {
        return <ImageBackground source={require('../assets/bgtest.png')} style={styles.centered}>
            <ActivityIndicator size='large' color={MainColors.paleBackground} />
        </ImageBackground>
    }

    return(
            <ImageBackground style={styles.screen} source={require('../assets/bgtest.png')}>
                <FlatList
                    data={posts}
                    renderItem={renderCards}
                />
            </ImageBackground>
    )
}

export const marketScreenOptions = navData => {
    return {
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item iconName="plus-circle" iconSize={30} onPress={() => navData.navigation.navigate('NewPosting', {userId: 'u1'})}/>
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        padding: '5%'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MarketScreen