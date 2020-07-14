import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
// import * as RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import Video from 'react-native-video';

class VideoGallery extends React.Component{

    state = {
        index: null,
        videos: []
    }
    getVidoes = () => {
        const dirs = RNFetchBlob.fs.dirs
        const filePath = `${dirs.DownloadDir}/Voc Videos/`
        .then((data) => {
            
          })


    }

    setIndex = (index) => {
        if (index === this.state.index) {
            index = null
        }
        this.setState({ index })
    }

render() {
    
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle = {styles.scrollview}
                {
                    ...this.state.videos && this.state.videos.length > 0 && this.state.videos.map((p, i) => {
                        const isSelected = i === this.state.index;
                        const divide = isSelected && this.share === true ? 1 : 3;
                        return (
                            <TouchableHighlight
                            style={{opacity: i === this.state.index ? 0.5 : 1}}
                            key={i}
                            underlayColor='transparent'
                            onPress={() => this.setIndex(i)}
                          >
                            <Video
                              style={{
                                width: width/divide,
                                height: width/divide
                              }}
                              source={{uri: p.node.videos.uri}}
                              ref={ref => {
                                    this.player = ref;
                                  }} // Store reference
                                  onError={this.videoError} // Callback when video cannot be loaded
                            />
                          </TouchableHighlight>
                          
                        )
                      })
                }
            >
                
            </ScrollView>
        </View>
    );
}

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollview: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    }
})


export default VideoGallery;