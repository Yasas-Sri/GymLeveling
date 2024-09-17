import React, { useState, useCallback } from 'react';
import { Searchbar } from 'react-native-paper';
import { View, Text, FlatList } from 'react-native';
import debounce from 'lodash.debounce';
import ItemList from './ItemList';


const data = require('../db.json');

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  
  const debouncedSearch = useCallback(
    debounce((query) => {
      if(query){ 
      const filtered = data.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
    else{
      setFilteredData([]);
      
    }
    }, 300),
    []
  );




  const handleSearch = (query) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const renderItem = useCallback(({ item }) => (
    <View>

      <ItemList 
         name={item.name} 
        //  target={item.target}

         gifPhoto={item.gifUrl}
      />
      
    </View>
  ), []);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchQuery}
        className="mx-7 mb-3.5 bg-lightB  border-lightB border-2"
      />
      <FlatList
        data={filteredData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={(data, index) => (
          { length: 50, offset: 50 * index, index }
        )}
      />
    </>
  );

   
};

export default Search;