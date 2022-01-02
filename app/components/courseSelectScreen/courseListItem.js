/**
 * @fileoverview this file represents a CourseListItem compoenent used to render course information as a list item
 */
import React, { useRef, useState } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import DownloadIcon from './downloadIcon';
import { RemoveCourse, SaveGetCourse } from '../../utilities/courses';
import { Swipeable } from 'react-native-gesture-handler';
import CourseListItemSwipe from './courseListItemSwipe';


/**
 * CourseListItem, renders course information as a list item
 * @param {string} name - the name of the course
 * @param {number} distance - the distance from current location to the course
 * @param {Function} onPress - the function to run when the ontouch is pressed
 * @param {boolean} downloaded - is the course downloaded
 */
const CourseListItem = ({ name, distance, onPress, downloaded }) => {
    const [downloadState, setDownloadState] = useState(downloaded)
    const swipeableRef = useRef(null);

    /**
     * downloadOnPress, Function, downloads the course when pressed
     * @param {string} name - name of course to download
     */
    const downloadOnPress = (name) => {
        setDownloadState('downloading')
        SaveGetCourse(name)
        setDownloadState('downloaded')
    }
    
    /**
     * removeOnPress, Function, removes the course from storage when pressed
     * @param {string} name - name of course to remove
     */
    const removeOnPress = (name) => {
        RemoveCourse(name)
        setDownloadState('download')
        swipeableRef.current.close()
    }

    return (
        <Swipeable
            ref={swipeableRef}
            renderRightActions={() => (
                <CourseListItemSwipe
                    downloadState={downloadState}
                    onPress={() => removeOnPress(name)}
                />
            )}>
            <TouchableHighlight
                style={styles.touchable}
                activeOpacity={0.6}
                underlayColor='#DDDDDD'
                onPress={() => onPress()}
            >
                <View style={styles.listCard}>
                    <View>
                        <Text style={styles.nameText}>{name}</Text>
                        <Text style={styles.distanceText}>{Math.round((distance / 1000) * 100) / 100} km</Text>
                    </View>
                    <View style={styles.rowCard}>
                        <DownloadIcon stage={downloadState} size={30} onPress={() => downloadOnPress(name)} />
                        <AntDesign name='right' size={30} color='black' />
                    </View>
                </View>
            </TouchableHighlight>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    touchable: {
        height: 75,
        width: '100%',
        backgroundColor: 'white'
    },
    listCard: {
        flex: 1,
        height: 75,
        flexBasis: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    rowCard: {
        width: 100,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    nameText: {
        fontSize: 30
    },
    distanceText: {
        fontSize: 20
    },
});

export default CourseListItem;