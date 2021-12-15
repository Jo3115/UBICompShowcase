/**
 * @fileoverview This file represents the component that is rendered when a spotsListItem is swipped to the right
 */

 import React from 'react';
 import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
 
 
 
 /**
  * SpotsListItemPin Component, render a pin icon indicating if the item is pinned or not and allow it to be presed to pin the spot
  * @param {boolean} pinned - is the current spot pinned
  * @param {Function} onPress - the function to execute when the pinned icon is pressed
  */
 function CourseListSearch({ searchText, onChangeSearchText }) {
     return (
         <TextInput 
            style={styles.textInput}
            placeholder="Search"
            value={searchText}
            onChangeText={() => onChangeSearchText}
         />
     );
 }
 
 const styles = StyleSheet.create({
     container: {
         width: "50%",
         height: '100%',
     },
     textInput:{

     }
 });
 
 export default CourseListSearch;
 