import React from 'react'
import { View, StyleSheet, ImageBackground, Button, ScrollView, TextInput } from 'react-native'
import DefaultText from '../components/DefaultText'
import { MainColors } from '../constants/MainColors'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButton'
import ImagePicker from '../components/ImagePicker'

const NewPostingScreen = props => {
    return(
<ImageBackground style={{flex: 1}}source={require('../assets/bgtest.png')}>
        <ScrollView contentContainerStyle={styles.screen}>
            <View style={styles.postingWrapper}>
                <View style={styles.posting}>
                    <DefaultText style={styles.detailHeader}>Turnip Price:</DefaultText>
                    <TextInput style={styles.inputs} keyboardType='number-pad'/>
                    <DefaultText style={styles.detailHeader}>Asking For:</DefaultText>
                    <TextInput style={styles.inputs} />
                    <DefaultText style={styles.detailHeader}>Queue Link:</DefaultText>
                    <TextInput style={styles.inputs} />
                    <DefaultText style={styles.detailHeader}>Take/Upload Proof Photo</DefaultText>
                    {/* <Button title="Upload Photo" /> */}
                    <ImagePicker />
                </View>
            </View>
        </ScrollView>
        </ImageBackground>
    )
}

export const newPostingOptions = navData => {
    return {
        title: 'Create New Posting',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item iconSize={30} iconName={'check-circle'} color={MainColors.cardText} onPress={() => navData.navigation.goBack()}/>
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '2%'
    },
    postingWrapper: {
        backgroundColor: MainColors.cardBackground,
        width: '100%',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10
    },
    posting: {
        flex: 1
    },
    detailHeader: {
        color: MainColors.cardHeaderText,
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10
    },
    img: {
        height: 200,
        width: '100%',
        backgroundColor: '#cfc1b0',
        borderRadius: 10,
        overflow: 'hidden'
    },
    inputs: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: MainColors.paleBackground,
        borderRadius: 5,
        marginVertical: 5,
        color: MainColors.cardText
    }
})

export default NewPostingScreen