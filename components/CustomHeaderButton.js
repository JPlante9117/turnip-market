import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { FontAwesome } from '@expo/vector-icons'
import { MainColors } from '../constants/MainColors'

const CustomHeaderButton = props => {
    return <HeaderButton {...props} IconComponent={FontAwesome} color={MainColors.cardText} />
}

export default CustomHeaderButton