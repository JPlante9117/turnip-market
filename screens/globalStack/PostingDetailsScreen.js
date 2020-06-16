import React, { useEffect, useCallback } from 'react'
import { View, StyleSheet, Linking, ScrollView, Button, ImageBackground } from 'react-native'
import DefaultText from '../../components/DefaultText'
import { MainColors } from '../../constants/MainColors'
import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/CustomHeaderButton'
import { deletePosting } from '../../store/actions/postingActions'

const PostingDetailScreen = props => {

    const posting = useSelector(state => state.postings.postings.find(post => post.id === props.route.params.id))
    const currentUser = useSelector(state => state.authentication)
    const dispatch = useDispatch()

    const deletePostHandler = useCallback(postId => {
        dispatch(deletePosting(postId))
    }, [dispatch, deletePosting])

    useEffect(() => {
        props.navigation.setParams({deletePost: deletePostHandler, currentUser: currentUser.uid, username: posting.username})
    }, [deletePostHandler, currentUser, posting])

    return(
        <ImageBackground style={{flex: 1}}source={require('../../assets/bgtest.png')}>
        <ScrollView contentContainerStyle={styles.screen}>
            <View style={styles.postingWrapper}>
                <View style={styles.posting}>
                    {!posting ? 
                    <View style={styles.posting}>
                        <DefaultText>This Post No Longer Exists</DefaultText>
                    </View>
                    : 
                    <View style={styles.posting}>
                        <ImageBackground style={styles.img} source={{uri: `data:image/jpg;base64,${posting.proofImg}`}}>
                            <DefaultText style={styles.date}>{posting.readableDate}</DefaultText>
                        </ImageBackground>
                        <View style={styles.postingSection}>
                            <DefaultText style={styles.detailHeader}>User:</DefaultText>
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <DefaultText style={styles.detailText}>{posting.username}</DefaultText>
                                <TouchableOpacity onPress={() => {}} style={{marginLeft: 15}}>
                                    <FontAwesome name="envelope" size={23} color={MainColors.cardText}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.postingSection}>
                            <DefaultText style={styles.detailHeader}>Price to Sell:</DefaultText>
                            <DefaultText style={styles.detailText}>{posting.price} bells</DefaultText>
                        </View>
                        <View style={styles.postingSection}>
                            <DefaultText style={styles.detailHeader}>Asking For:</DefaultText>
                            <DefaultText style={styles.detailText}>{posting.ask}</DefaultText>
                        </View>
                        <View style={styles.postingSection}>
                            <View style={styles.queueButton}>
                                <Button color={'#3399ff'} title="Queue Signup" onPress={() => Linking.openURL(posting.queueLink)} disabled={posting.queueLink.length === 0}/>
                            </View>
                        </View>
                    </View>}
                </View>
            </View>
        </ScrollView>
        </ImageBackground>
    )
}

export const postingDetailsOptions = navData => {
    return {
        title: `${navData.route.params.username}'s Posting`,
        headerRight: () => {
            if(navData.route.params.currentUser === navData.route.params.user){
                return (
                    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item iconName="trash" iconSize={30} onPress={() => {
                            navData.route.params.deletePost(navData.route.params.id)
                            navData.navigation.goBack()
                        }}/>
                    </HeaderButtons>
                )
            }
        }
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
        width: '50%',
        marginTop: 10
    },
    img: {
        height: 200,
        width: '100%',
        backgroundColor: '#cfc1b0',
        borderRadius: 10,
        overflow: 'hidden'
    },
    date: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: MainColors.cardHeaderText,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 5,
        color: MainColors.cardBackground
    }
})

export default PostingDetailScreen