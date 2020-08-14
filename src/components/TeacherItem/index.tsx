import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import {View, Image, Text} from 'react-native';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import styles from './styles';

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
}

const TeacherItem: React.FC<TeacheritemProps> =({teacher})=>{
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
                  <RectButton style={[styles.favoriteButton,  styles.favorited]}>
                      {/* <Image source={heartOutlineIcon}/> */}
                      <Image source={unfavoriteIcon}/>
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