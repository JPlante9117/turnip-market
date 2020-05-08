import React, { useEffect } from 'react'
import { View, StyleSheet, Linking, ScrollView, Button, ImageBackground } from 'react-native'
import DefaultText from '../components/DefaultText'
import { MainColors } from '../constants/MainColors'
import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const PostingDetailScreen = props => {

    const temp = {
        user: 'Jacques',
        price: 123,
        ask: 'Tips / Donations',
        queueLink: ''
    }

    return(
        <ImageBackground style={{flex: 1}}source={require('../assets/bgtest.png')}>
        <ScrollView contentContainerStyle={styles.screen}>
            <View style={styles.postingWrapper}>
                <View style={styles.posting}>
                    <View style={styles.img} />
                    <View style={styles.postingSection}>
                        <DefaultText style={styles.detailHeader}>User:</DefaultText>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <DefaultText style={styles.detailText}>{temp.user}</DefaultText>
                            <TouchableOpacity onPress={() => {}} style={{marginLeft: 15}}>
                                <FontAwesome name="envelope" size={23} color={'#3399ff'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.postingSection}>
                        <DefaultText style={styles.detailHeader}>Price to Sell:</DefaultText>
                        <DefaultText style={styles.detailText}>{temp.price} bells</DefaultText>
                    </View>
                    <View style={styles.postingSection}>
                        <DefaultText style={styles.detailHeader}>Asking For:</DefaultText>
                        <DefaultText style={styles.detailText}>{temp.ask}</DefaultText>
                    </View>
                    <View style={styles.postingSection}>
                        <View style={styles.queueButton}>
                            <Button color={'#3399ff'} title="Queue Signup" onPress={() => Linking.openURL(temp.queueLink)} disabled={temp.queueLink.length === 0}/>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
        </ImageBackground>
    )
}

export const postingDetailsOptions = navData => {
    return {
        title: `${navData.route.params.user}'s Posting`
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '2%'
    },
    postingWrapper: {
        backgroundColor: MainColors.cardBackground,
        height: '100%',
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10,
        flex: 1
    },
    posting: {
        flex: 1
    },
    postingSection: {
        marginVertical: 20,
        flex: 1,
        alignItems: 'center'
    },
    detailHeader: {
        color: MainColors.cardHeaderText,
        fontSize: 40,
        textAlign: 'center'
    },
    detailText: {
        fontSize: 30,
        textAlign: 'center',
        marginVertical: 10,
        color: '#5f4e3a'
    },
    queueButton: {
        width: '50%'
    },
    img: {
        height: 200,
        width: '100%',
        backgroundColor: '#cfc1b0',
        borderRadius: 10
    }
})

export default PostingDetailScreen