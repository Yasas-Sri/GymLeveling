import React, { useState, useCallback } from "react";
import { Searchbar } from "react-native-paper";
import { View, FlatList } from "react-native";
import debounce from "lodash.debounce";
import ItemList from "./ItemList";

const data = require("../db.json");

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query) {
        const filtered = data.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase()),
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    }, 300),
    [],
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    debouncedSearch(query);
  };

  const renderItem = useCallback(
    ({ item }) => (
      <View>
        <ItemList
          name={item.name}
          exerciseID={item.id}
          gifPhoto={item.gifUrl}
        />
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={handleSearch}
        value={searchQuery}
        className="mx-7 mb-3.5 bg-lightB  border-borderB border-2  "
        inputStyle={{ color: "white" }}
      />
      <FlatList
        data={filteredData}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        initialNumToRender={10} // How many items to render initially
        maxToRenderPerBatch={10} // Render this many items per scroll batch
        windowSize={5}

        // getItemLayout={(data, index) => (
        //   { length: 14, offset: 14 * index, index }
        // )}
      />
    </>
  );
};

export default Search;
