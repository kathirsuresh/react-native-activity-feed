// @flow
import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

import BackButton from '../components/BackButton';

import { SinglePost, CommentBox } from 'react-native-activity-feed';

import Activity from '../components/Activity';
import LikesList from '../components/LikesList';
import RepostList from '../components/RepostList';
import CommentList from '../components/CommentList';

import type { NavigationProps, UserResponse } from '../types';

type Props = NavigationProps;

export default class SinglePostScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: Props) => ({
    title: 'POST DETAIL',
    headerLeft: (
      <View style={{ paddingLeft: 15 }}>
        <BackButton pressed={() => navigation.goBack()} color="blue" />
      </View>
    ),
    headerTitleStyle: {
      fontWeight: '500',
      fontSize: 13,
    },
  });

  render() {
    const { navigation } = this.props;
    const activity = navigation.getParam('activity');
    const feedGroup = navigation.getParam('feedGroup');
    const userId = navigation.getParam('userId');
    return (
      <SafeAreaView style={styles.container}>
        <SinglePost
          activity={activity}
          feedGroup={feedGroup}
          userId={userId}
          navigation={this.props.navigation}
          renderActivity={(props) => (
            <React.Fragment>
              <Activity {...props} />
              <CommentList reactions={props.activity.latest_reactions} />
              <RepostList reactions={props.activity.latest_reactions} />

              <View style={styles.sectionHeader} />
              <View style={styles.likesContainer}>
                <LikesList
                  reactions={props.activity.latest_reactions}
                  reactionKind="heart"
                />
              </View>
            </React.Fragment>
          )}
          BelowPostComponent={(props) => (
            <CommentBox
              onSubmit={(text) =>
                props.onAddReaction('comment', activity, {
                  data: { text: text },
                })
              }
              avatarProps={{
                source: (userData: UserResponse) => userData.data.profileImage,
              }}
            />
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
