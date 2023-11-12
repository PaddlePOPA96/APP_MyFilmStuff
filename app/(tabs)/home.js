import {
  Heading,
  FlatList,
  Box,
  Divider,
  Spinner,
  Center,
  Image,
  ScrollView,
  Text,
  Pressable,
} from "@gluestack-ui/themed";
import { Categories, Header, moviesItem } from "../../components";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import CategoryButton from "../../components/category-button";

const datas = [
  {
    id: 1,
    title: "Maleficent",
    synopsis:
      "Maleficent is a kind fairy who was betrayed by her lover, Stefan. Soon, he will curse his daughter, Aurora, in order to avenge her thirst for justice.",
    image:
      "https://lumiere-a.akamaihd.net/v1/images/p_maleficent_19736_89c0d9e7.jpeg?region=0%2C0%2C540%2C810",

    genre: "Drama/Fantasy",
    year: "2014",
    duration: "1 h 38 m",
    producer: "Joe Roth",
    director: "Robert Stromberg",
    writer: "Linda Woolverton",
    cast: "Angelina Jolie, Brenton Thwaites,Sharlto Copley, Elle Fanning,  Sam Riley, Imelda Staunton, Juno Temple, Lesley Manville",
    link: "https://www.imdb.com/video/vi1449634329/?playlistId=tt1587310&ref_=tt_ov_vi",
    categories: "Coming Soon",
  },
  {
    id: 2,
    title: "Gods Of Egypt",
    image:
      "https://upload.wikimedia.org/wikipedia/en/2/2f/Gods_of_Egypt_poster.jpg",

    synopsis:
      "The Egyptian god of darkness, Set, takes over the throne of the Egyptian empire. A mortal hero, Bek, allies with the Egyptian god Horus in a mission to save the world and rescue his love",
    genre: "Action | Adventure | Drama",
    year: "2016",
    duration: "2h 7m",
    producer: "Basil Iwanyk | Alex Proyas",
    director: "Alex Proyas",
    writer: "Matt Sazama | Burk Sharpless",
    cast: "Nikolaj Coster-Waldau,Gerard Butler, Brenton Thwaites,  Chadwick Boseman, Élodie Yung, Courtney Eaton, Rufus Sewell, Geoffrey Rush ",
    link: "https://www.imdb.com/video/vi3493246233/?playlistId=tt2404233&ref_=tt_ov_vi",
    categories: "Now Playing",
  },
  {
    id: 3,
    title: "The Call of the Wild",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROiaAC30nVWmBNz6zCyd24WqR1Y8TxZkktWg&usqp=CAU",

    synopsis: "A sled dog struggles for survival in the wilds of the Yukon.",
    genre: "Adventure | Drama | Family",
    year: "2020",
    duration: "1h 40m",
    producer: " Erwin Stoff | James Mangold",
    director: "	Chris Sanders",
    writer: "Matt Sazama | Burk Sharpless",
    cast: "Harrison Ford, Omar Sy, Dan Stevens, Karen Gillan, Bradley Whitford",
    link: "https://youtu.be/tuVg_6UaQsU",
    categories: "Now Playing",
  },
  {
    id: 4,
    title: "Jaws",
    image:
      "https://vice-press.com/cdn/shop/files/Jaws-film-vault-poster-matt-ferguson-florey.jpg?v=1687347055&width=1100",

    synopsis:
      "When a killer shark unleashes chaos on a beach community off Cape Cod, it's up to a local sheriff, a marine biologist, and an old seafarer to hunt the beast down.",
    genre: "Adventure | Mystery | Thriller | ",
    year: "1975",
    duration: "2h 4m",
    producer: "Richard D. Zanuck | David Brown",
    director: "Steven Spielberg",
    writer: "Matt Sazama | Burk Sharpless",
    cast: "Roy Scheider, Robert Shaw,Richard Dreyfuss, Lorraine Gary, Murray Hamilton",
    link: "https://www.imdb.com/video/vi4242122009/?playlistId=tt0073195&ref_=tt_ov_vi",
    categories: "Coming Soon",
  },
  {
    id: 5,
    title: "Godzilla: King of\nthe Monsters",
    image:
      "https://c4.wallpaperflare.com/wallpaper/846/216/1006/godzilla-movies-movie-poster-godzilla-king-of-the-monsters-wallpaper-preview.jpg",

    synopsis:
      "The crypto-zoological agency Monarch faces off against a battery of god-sized monsters, including the mighty Godzilla, who collides with Mothra, Rodan, and his ultimate nemesis, the three-headed King Ghidorah.",
    genre: "Action | Adventure | Fantasy",
    year: "2019",
    duration: "2h 12m",
    producer:
      "Mary Parent | Alex Garcia | Thomas Tull | Jon Jashni | Brian Rogers",
    director: "Michael Dougherty",
    writer: "Matt Sazama | Burk Sharpless",
    cast: "Kyle Chandler, Vera Farmiga,Millie Bobby Brown, Bradley Whitford, Sally Hawkins, Charles Dance, Thomas Middleditch, Aisha Hinds, O'Shea Jackson Jr., David Strathairn, Ken Watanabe, Zhang Ziyi",
    link: "https://www.imdb.com/video/vi1619573785/?playlistId=tt3741700&ref_=tt_pr_ov_vi",
    categories: "Now Playing",
  },
  {
    id: 6,
    title: "Titanic",
    image:
      "https://studio.mrngroup.co/storage/app/media/Prambors/Editorial%202/Poster%20Titanic%202023-20230111120555.webp?tr=w-600",

    synopsis:
      "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    genre: "Drama | Romance",
    year: "3h 14m",
    duration: "3h 14m",
    producer: "James Cameron | Jon Landau",
    director: "James Cameron",
    writer: "James Cameron",
    cast: "Leonardo DiCaprio,  Kate Winslet,  Billy Zane, Kathy Bates, Frances Fisher, Bernard Hill, Jonathan Hyde, Danny Nucci, David Warner, Bill Paxton",
    link: "https://www.imdb.com/video/vi1740686617/?playlistId=tt0120338&ref_=tt_ov_vi",
    categories: "Now Playing",
  },

  {
    id: 7,
    title: "Plane",
    image:
      "https://m.media-amazon.com/images/I/711h7FafSeL._AC_UF1000,1000_QL80_.jpg",

    synopsis:
      "A pilot finds himself caught in a war zone after he's forced to land his commercial aircraft during a terrible storm.",
    genre: "Action | Adventure | Thriller",
    year: "2023",
    duration: "1h 47m",
    producer:
      "Lorenzo di Bonaventura | Mark Vahradian | Marc Butan | Gerard Butler | Alan Siegel",
    director: "Jean-François Richet",
    writer: "Charles Cumming | J.P. Davis",
    cast: "Gerard Butler, Mike Colter, Yoson An,Tony Goldwyn",
    link: "https://www.imdb.com/video/vi1490601241/?playlistId=tt5884796&ref_=tt_ov_vi",
    categories: "Now Playing",
  },
  {
    id: 8,
    title: "Joker",
    image:
      "https://c4.wallpaperflare.com/wallpaper/675/275/718/joker-2019-movie-joker-joaquin-phoenix-actor-men-hd-wallpaper-preview.jpg",

    synopsis:
      "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
    genre: "Crime | Drama | Thriller",
    year: "2019",
    duration: "2h 2m",
    producer: "Todd Philips | Bradley Cooper | Emma Tillinger Koskoff",
    director: "Todd Phillips",
    writer: "Todd Phillips | Scott Silver",
    cast: "Joaquin Phoenix, Robert De Niro, Zazie Beetz, Frances Conroy",
    link: "https://www.imdb.com/video/vi1723318041/?playlistId=tt7286456&ref_=tt_ov_vi",
    categories: "Now Playing",
  },
  {
    id: 9,
    title: "Spiderman",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsQOECsmBjEGlHjGIAzhOSf98iqopuWGRwDmsE62HEpTFmN9fuYW8j_rW70iQBebNUwt8&usqp=CAU",

    synopsis:
      "The Egyptian god of darkness, Set, takes over the throne of the Egyptian empire. A mortal hero, Bek, allies with the Egyptian god Horus in a mission to save the world and rescue his love",
    genre: "Action | Adventure | Drama",
    year: "2016",
    duration: "2h 7m",
    producer: "Basil Iwanyk | Alex Proyas",
    director: "Alex Proyas",
    writer: "Matt Sazama | Burk Sharpless",
    cast: "Nikolaj Coster-Waldau,Gerard Butler, Brenton Thwaites,  Chadwick Boseman, Élodie Yung, Courtney Eaton, Rufus Sewell, Geoffrey Rush ",
    link: "https://youtu.be/tuVg_6UaQsU",
    categories: "Coming Soon",
  },
  {
    id: 10,
    title: "Spiderman",
    image:
      "https://pbs.twimg.com/media/FIB_5QzWQAM6NGj?format=jpg&name=4096x4096",

    synopsis:
      "The Egyptian god of darkness, Set, takes over the throne of the Egyptian empire. A mortal hero, Bek, allies with the Egyptian god Horus in a mission to save the world and rescue his love",
    genre: "Action | Adventure | Drama",
    year: "2016",
    duration: "2h 7m",
    producer: "Basil Iwanyk | Alex Proyas",
    director: "Alex Proyas",
    writer: "Matt Sazama | Burk Sharpless",
    cast: "Nikolaj Coster-Waldau,Gerard Butler, Brenton Thwaites,  Chadwick Boseman, Élodie Yung, Courtney Eaton, Rufus Sewell, Geoffrey Rush ",
    link: "https://youtu.be/tuVg_6UaQsU",
    categories: "Coming Soon",
  },
];

const categories = [
  {
    id: 0,
    title: "All Movies",
    categories: "All Movies",
  },
  {
    id: 1,
    title: "Now Playing",
    categories: "Now Playing",
  },
  {
    id: 2,
    title: "Coming Soon",
    categories: "Coming Soon",
  },
];

const Home = () => {
  const [datasList, setDatas] = useState(datas);
  const [StatusActive, setStatusActive] = useState("Now");
  const setStatus = (StatusActive) => {
    if (StatusActive !== "All Movies") {
      setDatas([...datas.filter((e) => e.categories === StatusActive)]);
    } else {
      setDatas(datas);
    }
    setStatusActive(StatusActive);
  };

  const [activeCategory, setActiveCategory] = useState(0);

  const renderitem = ({ item }) => {
    const moviesItem = {
      title: item.title,
      image: item.image,
      synopsis: item.synopsis,
      genre: item.genre,
      year: item.year,
      duration: item.duration,
      producer: item.producer,
      director: item.director,
      writer: item.writer,
      cast: item.cast,
      link: item.link,
    };
    return (
      <ScrollView>
        <Box p={10}>
          <Link
            href={{
              pathname: "/movies-detail",
              params: moviesItem,
            }}
            asChild
          >
            <Pressable>
              <Box p={10}>
                <Image
                  alt={item.title}
                  source={{ uri: item.image }}
                  w={170}
                  h={200}
                />
                <Text textAlign="center" fontWeight="bold" mt={10}>
                  {item.title}
                </Text>
              </Box>
            </Pressable>
          </Link>
        </Box>
      </ScrollView>
    );
  };

  return (
    <>
      <Header title={"CinemSkuy"} />
      <Box>
        <ScrollView>
          <Box py={"$4"} bg={"$black"}>
            <Categories />
          </Box>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Box flexDirection="row" mt={20}>
              {categories.map((item, index) => {
                return (
                  <CategoryButton
                    title={item.categories}
                    isFirst={index == 0 ? true : false}
                    isActive={index == activeCategory ? true : false}
                    key={index}
                    onPress={() => [
                      setStatus(item.categories),
                      setActiveCategory(index),
                    ]}
                  />
                );
              })}
            </Box>
          </ScrollView>

          <FlatList
            scrollEnabled={false}
            paddingBottom={100}
            data={datasList}
            renderItem={renderitem}
            numColumns={2}
          />
        </ScrollView>
      </Box>
    </>
  );
};

export default Home;
