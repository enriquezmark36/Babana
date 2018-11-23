import {StyleSheet} from 'react-native';

const styles = {
    header:{
        backgroundColor: 'yellow',
    },
    footer:{
        backgroundColor: 'yellow',
    },
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    map:{
        ...StyleSheet.absoluteFillObject
    }
}

export default styles;
