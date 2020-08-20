import React, { useState } from 'react';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {View, Image, Text, Linking} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import styles from './styles';
import api from '../../services/api';


export interface Teacher {
    id: number;
    avatar: string;
    bio: string;
    cost: number;
    name: string;
    subject: string;
    whatsapp: string;
}

interface TeacheritemProps{
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacheritemProps> =({teacher, favorited})=>{
    const [isFavorited, setIsFavorited] = useState (favorited);

    function handleLinkToWhatsApp(){
        api.post('connections', { user_id: teacher.id});
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    }

    async function handleToggleFavorite(){
        const favorites = await AsyncStorage.getItem('@proffy/favorites');

        let favoritesList: any[] =[];
        if (favorites){
            favoritesList = JSON.parse(favorites);
        }
        if (isFavorited){
            const favoritesIndex = favoritesList.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id;
            });

            if (favoritesIndex > -1 ){
                favoritesList.splice(favoritesIndex, 1);
                setIsFavorited(false);
            }
        } else {
            favoritesList.push(teacher);
            setIsFavorited(true);
        }
        await AsyncStorage.setItem(
            '@proffy/favorites',
            JSON.stringify(favoritesList)
        );
    }


    return (
       <View style={styles.container}>
           <View style={styles.profile}>
                <Image 
                style={styles.avatar}
                source={{ uri:teacher.avatar}}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
           </View>
    <Text style={styles.bio}>{teacher.bio}</Text>
            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'    '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>
                <View style={styles.buttonsConteiner}>
                  <RectButton
                  onPress={handleToggleFavorite}
                  style={[styles.favoriteButton, isFavorited ?  styles.favorited: {}]}>
                      { isFavorited ? ( <Image source={heartOutlineIcon}/>) :
                      (<Image source={unfavoriteIcon}/>)}
                  </RectButton>
                  <RectButton style={styles.contectButton} onPress={handleLinkToWhatsApp}>
                      <Image source={whatsappIcon}/>
                      <Text style={styles.contectButtonText}>Entrar em contato</Text>
                  </RectButton>
               </View>
            </View>
        </View>
    
    
        )
};

export default TeacherItem;