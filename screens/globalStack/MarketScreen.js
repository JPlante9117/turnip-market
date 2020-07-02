import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, ImageBackground, FlatList, ActivityIndicator, InteractionManager, View, RefreshControl } from 'react-native'
import MarketCard from '../../components/MarketCard'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/CustomHeaderButton'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPostings } from '../../store/actions/postingActions'
import { MainColors } from '../../constants/MainColors'
import { useFocusEffect } from '@react-navigation/native'
import { fetchUsers } from '../../store/actions/userActions'
import { Card } from 'stream-chat-expo'
import DefaultText from '../../components/DefaultText'
import { ScrollView } from 'react-native-gesture-handler'

const MarketScreen = props => {

    const posts = useSelector(state => state.postings.postings)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()
    const dispatch = useDispatch()
    let users = []

    const loadPosts = useCallback(async () => {
        setIsLoading(true)
        try {
            await dispatch(fetchPostings())
            await dispatch(fetchUsers())
            users = useSelector(state => state.userData.users)
        } catch(err){
            setError(err)
        }
        setIsLoading(false)
    }, [dispatch])

    useEffect(() => {
        setIsLoading(true)
        loadPosts().then(() => setIsLoading(false))
    }, [dispatch, setIsLoading, loadPosts])

    const renderCards = itemData => {
        return <MarketCard id={itemData.item.id} user={itemData.item.userId} price={itemData.item.price} handlePress={() => props.navigation.navigate('PostingDetails', {user: users.find(user => user.id === itemData.item.userId), id: itemData.item.id})} />
    }

    if (isLoading) {
        return <ImageBackground source={require('../../assets/bgtest.png')} style={styles.centered}>
            <ActivityIndicator size='large' color={MainColors.paleBackground} />
        </ImageBackground>
    }

    if(posts.length === 0){
        return <ImageBackground style={styles.screen} source={require('../../assets/bgtest.png')}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={loadPosts}
                        />
                    }
                >
                    <View style={{borderRadius: 10, backgroundColor: MainColors.cardBackground, marginTop: 40, paddingVertical: 10}}>
                        <DefaultText style={{fontSize: 35, textAlign: 'center', color: MainColors.paleBackground}}>There are no active postings</DefaultText>
                    </View>
                </ScrollView>
            </ImageBackground>
    }

    return(
            <ImageBackground style={styles.screen} source={require('../../assets/bgtest.png')}>
                <FlatList
                    data={posts}
                    renderItem={renderCards}
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={loadPosts}
                        />
                    }
                />
            </ImageBackground>
    )
}

export const marketScreenOptions = navData => {
    return {
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item iconName="navicon" iconSize={30} onPress={() => navData.navigation.openDrawer()}/>
            </HeaderButtons>
        ),
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item iconName="plus-circle" iconSize={30} onPress={() => navData.navigation.navigate('NewPosting', {price: ''})}/>
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: '5%'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MarketScreen