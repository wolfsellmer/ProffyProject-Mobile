import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import {View, Image, Text} from 'react-native';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import styles from './styles';


function TeacherItem(){
    return (
       <View style={styles.container}>
           <View style={styles.profile}>
                <Image 
                style={styles.avatar}
                source={{ uri:'https://github.com/wolfsellmer.png'}}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>Wolf Sellmer</Text>
                    <Text style={styles.subject}>Química</Text>
                </View>
           </View>
            <Text style={styles.bio}>
            Ejecutivo Comercial -  na ECOSISTEMAS.
            {'\n'}{'\n'}
            Ejecutivo Comercial - Outsourcing, QA, Infraestructura y Consultoría na ECOSISTEMAS.
            </Text>
            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'    '}
                    <Text style={styles.priceValue}>R$ 20,00s</Text>
                </Text>
                <View style={styles.buttonsConteiner}>
                  <RectButton style={styles.favoriteButton}>
                      <Image source={heartOutlineIcon}/>
                  </RectButton>
                  <RectButton style={styles.contectButton}>
                      <Image source={whatsappIcon}/>
                      <Text style={styles.contectButtonText}>Entrar em contato</Text>
                  </RectButton>
               </View>
            </View>
        </View>
    
    
        )
};

export default TeacherItem;