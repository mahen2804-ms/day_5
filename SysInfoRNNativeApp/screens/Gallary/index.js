import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useWindowDimensions, View, FlatList, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import Divider from '../../components/Divider';
import Typography from '../../components/Typography';


const Gallary = () => {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const { width: screenWidth } = useWindowDimensions();

    useEffect(() => {
        loadData(page);
    }, [page]);
    const loadData = async page => {
        try {
            const res = await axios.get(
                `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`,
            );
            setData(val => {
                return [...val, ...res.data];
            });
        } catch (error) { }
    };

    const renderItem = ({ item }) => {
        console.warn(item.url);
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={{ maxWidth: 480, width: screenWidth }}>
                    <Image
                        source={{
                            uri: item.url,
                        }}
                        style={{
                            height: 200,
                            // width: 200,
                            flex: 1
                        }}
                        resizeMode="cover"
                    />
                    <Typography variant="h3" style={{ flex: 1, paddingHorizontal: 8 }}>
                        {item.title}
                    </Typography>
                </View>
            </View >
        );
    };

    const keyExtractor = item => `${item.id}`;

    const onEndReached = () => {
        setPage(val => val + 1);
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={() => (
                <View style={{ alignItems: 'center', marginVertical: 10 }}>
                    <Divider style={{ maxWidth: 500, width: screenWidth, marginHorizontal: 10, backgroundColor: '#d3d3d3' }} />
                </View>

            )}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.6}
        />
    );
};

export default Gallary;
