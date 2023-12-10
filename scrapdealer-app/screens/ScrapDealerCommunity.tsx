import React, {useEffect, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";
import { useOrder } from "../OrderContext";
import BackButton from "../components/BackButton";
import ContinueButton from "../components/ContinueButton";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import PageHeader from "../components/PageHeader";
import NavBar from "../components/NavBar";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../Firebase";
import { useScrapDealer } from "../ScrapDealerContext";
import axios from "axios";
import { Linking } from 'react-native';

type RootStackParamList = {
    SignUp: undefined;
    NextPage: undefined;  // Name of the next page/screen
    ScrapDealerAvailableOrders: undefined;
    ScrapDealerNumberVerification:undefined;
    ScrapDealerDashboard: undefined;
    ScrapDealerOngoingOrders: undefined;
    ScrapDealerProfile: undefined;
    ScrapDealerPastOrders: undefined;
    ScrapDealerGetSupport: undefined;
    ScrapDealerManageAccount: undefined;
    ScrapDealerPrivacy: undefined;
    ScrapDealerCommunity: undefined;
};
type NavigationProps = StackNavigationProp<RootStackParamList, 'ScrapDealerCommunity'>;

const NewsComponent = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            q: "earth",
            apiKey: '593a586c82954536840b926f57f1f25a',
            language: 'en',
            //totalResults: '1'
          }
        });
        setArticles(response.data.articles.slice(0,5));
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {loading ? <Text>Loading...</Text> : (
        <FlatList
          data={articles}
          keyExtractor={item => item.url}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {Linking.openURL(item.url).catch(err => console.log(err));}}>
              <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                <Image source={{ uri: item.urlToImage }} style={{ height: 200, borderRadius: 10 }} />
                <Text>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
    <NavBar/>
    </SafeAreaView>
  );
};

export default NewsComponent;
