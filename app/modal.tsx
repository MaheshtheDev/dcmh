import { DCText } from "@/components/DCText";
import {
  NunitoSans,
  NunitoSansMedium,
  NunitoSansSemiBold,
  horizontalScale,
  verticalScale,
} from "@/styles";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, TextInput } from "react-native";
import { Image } from "expo-image";

import { Text, View } from "react-native";
import { Images } from "@/assets/images";
import { Entypo, FontAwesome, MaterialIcons } from "@expo/vector-icons";

export type ProductDetails = {
  title: string;
  image: string;
  description: string;
};

export default function ModalScreen() {
  const { productId } = useLocalSearchParams<{
    productId: string;
  }>();

  const productDetails: ProductDetails = {
    title: "Food",
    image: "https://example.com/food.jpg",
    description: "This is a description of the product.",
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Product Details",
          headerTitleStyle: {
            fontFamily: NunitoSansSemiBold,
          },
          headerLeft: () => (
            <MaterialIcons
              name="cancel"
              size={26}
              color="black"
              onPress={() => {
                router.back();
              }}
            />
          ),
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Image
          source={Images.food}
          style={{
            width: 75,
            height: 75,
          }}
        ></Image>
        <View
          style={{
            marginLeft: 10,
          }}
        >
          <DCText
            textStyle={{
              fontFamily: NunitoSansSemiBold,
              fontSize: 20,
            }}
          >
            {productDetails.title}
          </DCText>
          <DCText
            textStyle={{
              fontFamily: NunitoSansMedium,
            }}
          >
            {productDetails.description}
          </DCText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Entypo
              name="back-in-time"
              size={12}
              color={"black"}
              style={{
                opacity: 0.5,
              }}
            />
            <DCText
              textStyle={{
                fontFamily: NunitoSans,
                fontSize: 12,
                opacity: 0.5,
                marginLeft: 5,
              }}
            >
              Updated on 26th Apr
            </DCText>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: horizontalScale(10),
        }}
      >
        <View
          style={{
            backgroundColor: "black",
            borderRadius: 5,
            paddingHorizontal: horizontalScale(10),
            paddingVertical: verticalScale(5),
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            minWidth: "48%",
          }}
        >
          <DCText
            textStyle={{
              fontSize: 16,
              fontFamily: NunitoSansSemiBold,
              color: "white",
            }}
          >
            Available Stock
          </DCText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome name="minus-square" size={32} color="red" />
            <TextInput
              value="5"
              style={{
                width: 25,
                textAlign: "center",
                fontFamily: NunitoSans,
                fontSize: 24,
                borderColor: "grey",
                //borderWidth: 1,
                borderRadius: 5,
                marginHorizontal: 5,
                color: "white",
              }}
            ></TextInput>
            <FontAwesome name="plus-square" size={32} color="white" />
          </View>
        </View>

        <View
          style={{
            minWidth: "45%",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "green",
            borderRadius: 5,
            paddingHorizontal: horizontalScale(10),
            paddingVertical: verticalScale(5),
          }}
        >
          <DCText
            textStyle={{
              fontFamily: NunitoSansSemiBold,
              fontSize: 16,
              color: "white",
            }}
          >
            Max Capacity
          </DCText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              value="5"
              style={{
                textAlign: "center",
                fontFamily: NunitoSans,
                fontSize: 24,
                borderRadius: 5,
                color: "white",
              }}
            ></TextInput>
          </View>
        </View>
      </View>
      <View
        style={{
          marginHorizontal: horizontalScale(10),
        }}
      >
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "black",
          }}
        >
          <DCText
            textStyle={{
              fontFamily: NunitoSansSemiBold,
              fontSize: 16,
              marginTop: verticalScale(10),
            }}
          >
            Donation History
          </DCText>
        </View>

        {/* TODO: Add flashlist of donations history */}
        <View
          style={{
            marginVertical: verticalScale(10),
            flexDirection: "row"
          }}
        >
          <DCText textStyle={{
            fontFamily: NunitoSans,
            fontSize: 14,
            opacity: 0.5
          }}>23rd Apr 2024 - </DCText>
          <DCText>5 units donated by John Doe</DCText>
        </View>
      </View>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
