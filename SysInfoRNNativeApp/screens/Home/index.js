import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import Divider from '../../components/Divider';
import Typography from '../../components/Typography';

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/photos',
      );
      setData(res.data);
    } catch (error) { }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const renderItem = ({ item }) => {
    return (
      <View key={item.id} style={{ padding: 10, flexDirection: 'row' }}>
        <FastImage
          source={{
            uri: item.thumbnailUrl,
          }}
          style={{
            height: 72,
            width: 72,
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
        <Typography variant="body1" style={{ flex: 1, paddingHorizontal: 8 }}>
          {item.title}
        </Typography>
      </View>
    );
  };

  const keyExtractor = item => `${item.id}`;

  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => (
          <Divider style={{ marginHorizontal: 10, backgroundColor: '#d3d3d3' }} />
        )}
      />
      {/* <ScrollView>
        {data.map(item => (
          <View key={item.id}>
            <FastImage
              source={{
                uri: item.thumbnailUrl,
              }}
              style={{
                height: 48,
                width: 48,
                borderRadius: 8,
              }}
              resizeMode="cover"
            />
            <Typography variant="body1">{item.title}</Typography>
          </View>
        ))}
      </ScrollView> */}
    </>
  );
};

export default Home;
