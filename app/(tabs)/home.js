import {
    Heading,
    FlatList,
    Box,
    Divider,
    Spinner,
    Center,
  } from "@gluestack-ui/themed";
  import { Categories, Header, NewsItem } from "../../components";
  import { useEffect, useState } from "react";
  
  const Home = () => {
    const [isLoadingNews, setIsLoadingNews] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [news, setNews] = useState([]);
    const [activeCategoryNews, setActiveCategoryNews] = useState("terbaru");
  
    const getNews = (categoryName) => {
      fetch(`https://api-berita-indonesia.vercel.app/cnn/${categoryName}/`)
        .then((response) => response.json())
        .then((json) => setNews(json.data.posts))
        .catch((error) => console.error(error))
        .finally(() => {
          setIsLoadingNews(false);
          setIsFetching(false);
        });
    };
  
    const categoriesHandler = (categoryName) => {
      setIsLoadingNews(true);
      setActiveCategoryNews(categoryName);
      getNews(categoryName);
    };
  
    useEffect(() => {
      getNews(activeCategoryNews);
    }, []);
  
    const onRefresh = () => {
      setIsFetching(true);
      getNews(activeCategoryNews);
    };
  
    const renderitem = ({ item }) => {
      return <NewsItem item={item} />;
    };
  
    return (
      <>
        <Header title={"CineSkuy"} />
        <Box py={"$4"} bg={"$red700"}>
          <Heading ml={"$4"} lineHeight={"$lg"} mb={"$4"} color="$white">
            CNN Indonesia | Berita Terbaru, Terkini Indonesia dan Dunia
          </Heading>
          <Categories onChange={categoriesHandler} />
        </Box>
        <Divider />
        {isLoadingNews ? (
          <Center flex={1}>
            <Spinner size={"large"} color={"$black"} />
          </Center>
        ) : (
          <FlatList
            data={news}
            renderItem={renderitem}
            keyExtractor={(item) => item.link}
            showsVerticalScrollIndicator={false}
            refreshing={isFetching}
            onRefresh={onRefresh}
          />
        )}
      </>
    );
  };
  
  export default Home;