import { DCText } from "@/components/DCText";
import {
  horizontalScale,
  NunitoSans10ptBold,
  NunitoSansSemiBold,
  verticalScale,
} from "@/styles";
import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { supabase } from "../../lib/supabase";
import { AntDesign } from "@expo/vector-icons";

export default function DonationsScreen() {
  const [selectedTab, setSelectedTab] = useState(0);

  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);

  const onSubmit = async (inventoryId) => {
    const updateInventory = async () => {
      const { data, error } = await supabase
        .from("donations")
        .update({ request_status: "approve" })
        .eq("inventory_id", inventoryId);
      if (error) {
        console.log("Error");
      } else {
        console.log(data);
      }
    };
    await updateInventory();
    setFilteredHistory(
      history.filter((item) => item.request_status === "pending")
    );
  };

  useEffect(() => {
    const fetchHistory = async () => {
      let { data, error } = await supabase
        .from("donations")
        .select(
          "donor_name, donor_phone, request_status, quantity_ordered, inventory_id, inventory_name "
        );

      if (error) {
        Alert.alert("Error has occurred");
      }
      setHistory(data);
      if (data?.length > 0) {
        setFilteredHistory(
          data.filter((item) => item.request_status === "pending")
        );
      }
    };

    if (history.length === 0) {
      fetchHistory();
    }
  });

  useEffect(() => {
    if (selectedTab === 0) {
      setFilteredHistory(
        history.filter((item) => item.request_status === "pending")
      );
    } else {
      setFilteredHistory(
        history.filter((item) => item.request_status === "approve")
      );
    }
  }, [selectedTab]);

  return (
    <View style={styles.container}>
      <View style={styles.navBarView}>
        <Pressable
          style={
            selectedTab == 0 ? styles.selectedNavItemView : styles.navItemView
          }
          onPress={() => setSelectedTab(0)}
        >
          <DCText
            textStyle={{
              fontSize: 16,
              fontFamily: NunitoSansSemiBold,
            }}
          >
            Pending
          </DCText>
        </Pressable>
        <Pressable
          style={
            selectedTab == 1 ? styles.selectedNavItemView : styles.navItemView
          }
          onPress={() => setSelectedTab(1)}
        >
          <DCText
            textStyle={{
              fontSize: 16,
            }}
          >
            Completed
          </DCText>
        </Pressable>
      </View>
      <View
        style={{
          marginHorizontal: horizontalScale(20),
        }}
      >
        {filteredHistory &&
          filteredHistory.length > 0 &&
          filteredHistory.map((item, index) => (
            <View
              key={index}
              style={{
                justifyContent: "space-between",
                marginVertical: verticalScale(10),
                padding: horizontalScale(10),
                backgroundColor: "#F5F5F5",
                borderRadius: 10,
              }}
            >
              <DCText
                textStyle={{
                  fontSize: 18,
                  fontFamily: NunitoSans10ptBold,
                }}
              >
                {item.inventory_name}
              </DCText>
              <View>
                <DCText>
                  {
                    "You have been donated 100 bottles of water lots in 2 months period of time."
                  }
                </DCText>
                {/* <DCText>Donor Contact: {item.donor_phone}</DCText> */}
                <DCText>
                  Previous Order Quantity: {item.quantity_ordered}
                </DCText>
              </View>
            </View>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  navBarView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: verticalScale(10),
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
    paddingBottom: verticalScale(10),
  },
  selectedNavItemView: {
    flexDirection: "row",
    justifyContent: "center",
    minWidth: "42%",
  },
  navItemView: {
    flexDirection: "row",
    justifyContent: "center",
    minWidth: "42%",
    opacity: 0.5,
  },
  receivedButton: {
    backgroundColor: "#4CAF50",
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    width: "45%",
  },
  cancelOrderButton: {
    backgroundColor: "#F44336",
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    paddingVertical: verticalScale(5),
    width: "45%",
  },
});
