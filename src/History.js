import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { DataTable, Button } from 'react-native-paper';
import { cos } from 'react-native-reanimated';

/**
 * Profile screen
 */

export default function History({ navigation, route }) {
    var historyRecieved = route.params
    const [history, setHistory] = useState(historyRecieved.history);
    const [removed, setRemoved] = useState(false);
    console.log('history' + JSON.stringify(history));

    removeDetail = (index) => {
        setRemoved(true);
        let array = history;
        array.splice(index, 1);
        console.log(array);
        setHistory(array);
        console.log('removed' + history)
        // window.location.reload();
        setRemoved(false);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Discount-Meter</Text>
            <Text style={styles.historyText}>History</Text>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title numeric>S.No</DataTable.Title>
                    <DataTable.Title numeric>Original Price</DataTable.Title>
                    <DataTable.Title numeric>Discount</DataTable.Title>
                    <DataTable.Title numeric>Final price</DataTable.Title>
                    <DataTable.Title >           Action</DataTable.Title>
                </DataTable.Header>
                {history.map(((values, index) =>
                    <DataTable.Row>
                        <DataTable.Cell numeric>0{index + 1}-</DataTable.Cell>
                        <DataTable.Cell numeric>{values.price}$</DataTable.Cell>
                        <DataTable.Cell numeric>{values.discount}$</DataTable.Cell>
                        <DataTable.Cell numeric>{values.priceResult}$</DataTable.Cell>
                        <DataTable.Cell ><Button
                            icon="delete-circle"
                            onPress={() => removeDetail(index)}></Button>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '5%',
    },
    historyText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '5%',
    },
});