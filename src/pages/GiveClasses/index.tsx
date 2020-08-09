import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import giveClassesBgImage from '../../images/give-classes-background.png';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

function GiveClasses(){
    const {goBack} = useNavigation();

    function handleNavigateBack(){
        goBack();
    }

    return(
        <View style={styles.container}>
            <ImageBackground 
            resizeMode="contain" 
            source={giveClassesBgImage} 
            style={styles.content} >
                <Text style={styles.title}>
                    Quer ser um Proffy
                </Text>
                <Text style={styles.description}>
                    Para começãr, você precisa se cadatrar na nossa plataforma web
                </Text>
            </ImageBackground>
            <RectButton onPress={handleNavigateBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo bem</Text>
            </RectButton>

        </View>    
    );
        
}

export default GiveClasses;  