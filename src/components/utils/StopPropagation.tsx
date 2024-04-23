import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'

type StopPropagationProps = PropsWithChildren<{}>

const StopPropagation = ({ children }: StopPropagationProps) => {
    return (
        <View
            onStartShouldSetResponder={() => true}
            onTouchEnd={(event) => event.stopPropagation()}
        >
            {children}
        </View>
    )
}

export default StopPropagation
