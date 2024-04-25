import { colors, fontSize } from '@/constants/tokens'
import { StyleSheet } from 'react-native'

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    text: {
        fontSize: fontSize.base,
        color: colors.text,
    },
})

export const utilsStyles = StyleSheet.create({
    slider: {
        height: 7,
        borderRadius: 16,
    },
    flex: {
        flex: 1,
    },
    itemsSeparator: {
        borderColor: colors.textMuted,
        borderWidth: StyleSheet.hairlineWidth,
        opacity: 0.3,
    },

    centeredRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export const trackListItemStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        columnGap: 14,
        alignItems: 'center',
        paddingRight: 20,
    },
    artworkImage: {
        borderRadius: 8,
        width: 50,
        height: 50,
    },
    titleText: {
        ...defaultStyles.text,
        fontSize: fontSize.sm,
        fontWeight: '600',
        maxWidth: '90%',
    },
    artistStyle: {
        ...defaultStyles.text,
        color: colors.textMuted,
        fontSize: 14,
        marginTop: 4,
    },
    playingIconIndicator: {
        position: 'absolute',
        top: 18,
        left: 16,
        width: 16,
        height: 16,
    },
    pauseIndicator: {
        position: 'absolute',
        top: 14,
        left: 14,
    },
})

export const trackEmptyStyles = StyleSheet.create({
    text: {
        color: colors.text,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
    },
    image: {
        width: 200,
        height: 200,
    },
})
