import React, { useState } from 'react';
import { View , ScrollView, Text, AsyncStorage} from 'react-native';
import { RectButton, BorderlessButton, TextInput } from 'react-native-gesture-handler';
import api from '../../services/api';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import{Feather} from '@expo/vector-icons';
import PageHeader from '../../components/PageHeader';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';


function TeacherList(){
    const [isfiltersVisible, setIsFiltersVisibel] = useState(false);
    const [teachers, setTeachers] =  useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime]= useState('');

    async function loadFavorites(){
        AsyncStorage.getItem('@proffy/favorites').then((response)=>{
            if (response){
                const favoritedTeacher = JSON.parse(response);
                const favoritedTeacherIds = favoritedTeacher.map(
                    (teacher: Teacher)=> teacher.id
                );
                setFavorites(favoritedTeacherIds);
            }
        });
    }
    
    
    // function handleToggleFiltersVisible(){
    //     setIsFiltersVisibel(!isfiltersVisible);
    // }

    async function handleFilterSubmit(){
        const response = await api.get('classes', {
            params:{
                subject,
                week_day,
                time,
            },
        });
        if (response.data && response.data.length > 0){
            loadFavorites();
            setIsFiltersVisibel(false);
        }
        setTeachers(response.data);
    }
    useFocusEffect(()=>{
        loadFavorites();
    });


    return (
    <View style={styles.container}>
        <PageHeader title="Proffys disponíveis" 
        headerRigth={(
            <BorderlessButton onPress={()=>setIsFiltersVisibel(!isfiltersVisible)}>
                <Feather name="filter" size={20} color="#FFF"/>
            </BorderlessButton>
        )}
        >
            { isfiltersVisible &&(<View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                        <TextInput style={styles.input}
                        value={subject}
                        onChangeText={(text) =>setSubject(text)}
                        placeholder="Qual a matéria?"
                        placeholderTextColor="#c1bccc"
                        /> 
                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da Semana</Text>
                                <TextInput style={styles.input}
                                value={week_day}
                                onChangeText={(text) =>setWeekDay(text)}
                                placeholder="Qual o dia?"
                                placeholderTextColor="#c1bccc"
                            /> 
                        </View>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                                <TextInput style={styles.input}
                                value={time}
                                onChangeText={(text) =>setTime(text)}
                                placeholder="Qual horário?"
                                placeholderTextColor="#c1bccc"
                            /> 
                        </View>
                    </View>
                    <RectButton onPress={handleFilterSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>)}
        </PageHeader>

        <ScrollView
            style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal:16,
                paddingBottom:16,
            }}
        >
        {teachers.length > 0 && teachers.map((teacher: Teacher) => {
            return (
                <TeacherItem 
                key={teacher.id} 
                teacher={teacher}
                favorited={favorites.includes(teacher.id)}/>);
        })}               
        </ScrollView>
    </View>
    );

}

export default TeacherList;