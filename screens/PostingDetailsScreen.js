import React from 'react'
import { View, StyleSheet, Linking, ScrollView, Button } from 'react-native'
import DefaultText from '../components/DefaultText'
import { MainColors } from '../constants/MainColors'

const PostingDetailScreen = props => {

    const temp = {
        user: 'Jacques',
        price: 123,
        ask: 'Tips / Donations',
        queueLink: ''
    }

    return(
        <ScrollView contentContainerStyle={styles.screen}>
            <View style={styles.postingWrapper}>
                <View style={styles.posting}>
                    <View style={styles.postingSection}>
                        <DefaultText style={styles.detailHeader}>User:</DefaultText>
                        <DefaultText style={styles.detailText}>{temp.user}</DefaultText>
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
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: MainColors.background,
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
    }
})

export default PostingDetailScreen