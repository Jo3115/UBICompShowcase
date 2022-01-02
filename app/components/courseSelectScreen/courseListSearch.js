/**
 * @fileoverview this file represents a CourseListSearch compoenent used to render a search bar for filtering the course list
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Seperator from '../general/seperator';

/**
 * SpotsListItemPin Component, render a search bar for filtering the course list
 * @param {string} searchText - current search text
 * @param {Function} onChangeSearchText - function to execute when search text changes
 */
function CourseListSearch({ searchText, onChangeSearchText }) {
    return (
        <View>
            <Searchbar
                style={styles.searchBar}
                placeholder='Type to start filtering'
                value={searchText}
                onChangeText={onChangeSearchText}
            />
            <Seperator/>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBar: {
        width: '100%',
        height: 60,
    }
});

export default CourseListSearch;
