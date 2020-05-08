import React from 'react'
import { StyleSheet, ImageBackground, FlatList } from 'react-native'
import MarketCard from '../components/MarketCard'
import POSTINGS from '../dummyData/postingData.js'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButton'

const MarketScreen = props => {

    const renderCards = itemData => {
        return <MarketCard user={itemData.item.userId} price={itemData.item.price} handlePress={() => props.navigation.navigate('PostingDetails', {user: itemData.item.userId, id: itemData.item.id})} />
    }

    return(
            <ImageBackground style={styles.screen} source={require('../assets/bgtest.png')}>
                <FlatList
                    data={POSTINGS}
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
    }
})

export default MarketScreen