import React from 'react';
import { View, 
    Text, 
    TouchableHighlight, 
    Modal, 
    StyleSheet, 
    Button,
    Image,
    Dimensions,
    ScrollView  
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import Video from 'react-native-video';


const { width } = Dimensions.get('window')

class VocPhotoGallery extends React.Component {
  constructor() {
    super();
    this.state = {
        modalVisible: false,
        photos: [],
        videos: [],
        index: null
    }
  }

    


    setIndex = (index) => {
        if (index === this.state.index) {
            index = null
        }
        this.setState({ index })
    }

    getPhotos = () => {
      CameraRoll.getAlbums({
          first: 20,
          groupTypes: 'Album',
          groupName: 'Voc Videos',
          assetType: 'Videos'
          
      })
      .then(r => console.log({ photos: r.edges}))
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible})
}


share = () => {
  const image = this.state.videos[this.state.index].node.video.uri
  RNFetchBlob.fs.readFile(image, 'base64')
  .then((data) => {
    let shareOptions = {
      title: "React Native Share Example",
      message: "Check out this photo!",
      url: `data:image/jpg;base64,${data}`,
      subject: "Check out this photo!"
    };

    Share.open(shareOptions)
      .then((res) => console.log('res:', res))
      .catch(err => console.log('err', err))
  })
}
    render() {
      console.log('state :', this.state)
      return (
        <View style={styles.container}>
          <Button
            title='View videos'
            onPress={() => { this.toggleModal(); this.getPhotos() }}
          />
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => console.log('closed')}
          >
            <View style={styles.modalContainer}>
              <Button
                title='Close'
                onPress={this.toggleModal}
              />
              <ScrollView
                contentContainerStyle={styles.scrollView}>
                {
                  this.state.photos.map((p, i) => {
                    const isSelected = i === this.state.index;
                    const divide = isSelected && this.share === true ? 1 : 3;
                    return (
                      <TouchableHighlight
                            style={{opacity: i === this.state.index ? 0.5 : 1}}
                            key={i}
                            underlayColor='transparent'
                            onPress={() => this.setIndex(i)}
                          >
                            <Image
                            style={{
                              width: width/divide,
                              height: width/divide
                            }}
                            source={{uri: this.state.videoUri}}
                          />
                          </TouchableHighlight>
                      
                    )
                  })
                }
              </ScrollView>
                {
                  this.state.index !== null  && (
                    <View style={styles.shareButton}>
                      <Button
                          title='Share'
                          onPress={this.share}
                        />
                    </View>
                  )
                }
              </View>
            </Modal>
          </View>
        )
      }
    }
    
   const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      modalContainer: {
        paddingTop: 20,
        flex: 1
      },
      scrollView: {
        flexWrap: 'wrap',
        flexDirection: 'row'
      },
      shareButton: {
        position: 'absolute',
        width,
        padding: 10,
        bottom: 0,
        left: 0
      }
    })

export default VocPhotoGallery;