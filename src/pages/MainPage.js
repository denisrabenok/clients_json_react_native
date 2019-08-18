import React, { Component } from "react";
import { Alert, Image, StatusBar, Text, Dimensions, AsyncStorage, Content, View, TouchableOpacity } from "react-native";
import colors from "../resources/colors";
import { connect } from "react-redux";
import dimens from "../resources/dimens";
import strings from "../resources/strings";
import styles from "../resources/styles";
import * as readActions from "../actions/read-actions";
import { ScrollView, TextInput } from "react-native-gesture-handler";

export class MainPage extends Component {

    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            activeIndex: -1,
            list: undefined,
            searchText: ''
        }
    }

    componentDidMount() {
        this.props.dispatch(readActions.read());
    }

    componentDidUpdate() {

    }

    onPressItem = (index) => {
        if (index == this.state.activeIndex)
            this.setState({ activeIndex: -1 });
        else
            this.setState({ activeIndex: index });
    }

    getList() {
        let list = this.props.clients_list.get('data');
        if (list == undefined || list == null)
            return null;
        let filtered_list = [];
        for (let index = 0; index < list.length; index++) {
            if ((list[index].name + "").toLowerCase().includes(this.state.searchText.toLocaleLowerCase()))
                filtered_list.push(list[index]);
        }
        if (filtered_list == undefined || filtered_list == null)
            return null;

        return filtered_list.map((item, index) => {
            return (
                <TouchableOpacity key={index} activeOpacity={0.9} onPress={() => this.onPressItem(index)}
                    style={{ flexDirection: "column", width: "100%" }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                        <Text
                            style={[styles.itemStyle,
                            { width: "10%", backgroundColor: index % 2 ? "#5bda07" : "#40c000" }]}>{index + 1}</Text>
                        <Text
                            style={[styles.itemStyle,
                            { width: "30%", backgroundColor: index % 2 ? "#4bca07" : "#30b000" }]}>{item.name}</Text>
                        <Text
                            style={[styles.itemStyle,
                            { width: "60%", backgroundColor: index % 2 ? "#3b8a07" : "#20a000" }]}>{item.job_title}</Text>
                    </View>
                    {this.state.activeIndex == index ?
                        <View style={{ flexDirection: "column", width: "100%" }}>
                            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                <Text
                                    style={[styles.itemStyle,
                                    { width: "30%", backgroundColor: index % 2 ? "#dfec10" : "#989f26" }]}>{strings.PHONE_NUMBER}</Text>
                                <Text
                                    style={[styles.itemStyle,
                                    { width: "60%", backgroundColor: index % 2 ? "#cfdc00" : "#888f16" }]}>{item.client_detail.phone_number}</Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                <Text
                                    style={[styles.itemStyle,
                                    { width: "30%", backgroundColor: index % 2 ? "#dfec10" : "#989f26" }]}>{strings.ADDRESS}</Text>
                                <Text
                                    style={[styles.itemStyle,
                                    { width: "60%", backgroundColor: index % 2 ? "#cfdc00" : "#888f16" }]}>{item.client_detail.address}</Text>
                            </View>
                        </View>
                        : null}
                </TouchableOpacity>
            );
        }
        );
    }

    onChangeText = (text) => {
        if (!text)
            text = '';
        this.setState({ searchText: text, activeIndex: -1 });
    }

    render() {
        return (
            <View style={{ width: "100%", height: "100%" }}>
                <TextInput placeholder={strings.SEARCH} style={{ padding: 5 }} onChangeText={(text) => this.onChangeText(text)} />
                <ScrollView style={{ height: "100%", width: "100%" }}>
                    {this.getList()}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    clients_list: state.get("clients_list")
});

export default connect(mapStateToProps)(MainPage)