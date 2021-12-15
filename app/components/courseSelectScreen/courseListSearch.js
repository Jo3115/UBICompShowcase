/**
 * @fileoverview This file represents the component that is rendered when a spotsListItem is swipped to the right
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Seperator from '../general/seperator';



/**
 * SpotsListItemPin Component, render a pin icon indicating if the item is pinned or not and allow it to be presed to pin the spot
 * @param {boolean} pinned - is the current spot pinned
 * @param {Function} onPress - the function to execute when the pinned icon is pressed
 */
function CourseListSearch({ searchText, onChangeSearchText }) {
    return (
        <View>
            <Searchbar
                style={styles.searchBar}
                placeholder="Type to start filtering"
                value={searchText}
                onChangeText={onChangeSearchText}
            />
            <Seperator/>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        width: "100%",
        height: 60,
    }
});

export default CourseListSearch;
