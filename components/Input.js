import React from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import DefaultText from './DefaultText'
import { MainColors } from '../constants/MainColors'

class Input extends React.Component {

    state = {
        value: this.props.initialValue !== "" ? this.props.initialValue : '',
        isValid: this.props.initialValid,
        touched: false
    }

    textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (this.props.required && text.trim().length === 0) {
        isValid = false;
        }
        if (this.props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
        }
        if (this.props.min != null && +text <= this.props.min) {
        isValid = false;
        }
        if (this.props.max != null && +text > this.props.max) {
        isValid = false;
        }
        if (this.props.minLength != null && text.length < this.props.minLength) {
        isValid = false;
        }
        if (this.props.isImage != null && text.match(/\.(jpeg|jpg|gif|png)$/) == null){
            isValid = false
        }

        this.setState(prevState => ({
            ...prevState,
            value: text,
            isValid: isValid,
        }))
    }

    lostFocusHandler = () => {
        this.setState(prevState => ({
            ...prevState,
            touched: true
        }))
        this.props.onInputChange(this.props.id, this.state.value, this.state.isValid)
    }

    render = () => {
        return(
            <View style={styles.formControl}>
                <DefaultText style={styles.label}>{this.props.label}:</DefaultText>
                <TextInput
                    {...this.props}
                    style={{...styles.input, ...this.props.style}}
                    value={this.state.value.toString()}
                    onBlur={this.lostFocusHandler}
                    onChangeText={this.textChangeHandler}
                    placeholderTextColor={MainColors.cardText}
                />
                {!this.state.isValid && this.state.touched && (
                    <View style={styles.errorContainer}><Text style={styles.errorText}>{this.props.errorText}</Text></View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        color: MainColors.cardHeaderText,
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 10
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: MainColors.paleBackground,
        borderRadius: 5,
        marginVertical: 5,
        color: MainColors.cardText
    },
    errorText: {
        opacity: 0.4,
        color: 'red',
        textAlign: 'center'
    },
    errorContainer: {
        marginVertical: 5,
        width: '100%'
    }
})

/*

*/

export default Input