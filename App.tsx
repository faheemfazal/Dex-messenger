import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  FlatList,
  ListRenderItem,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { styled } from "nativewind";
// import img from './assets/adaptive-icon.png'
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";

const StyledText = styled(Text);

export default function App() {

  const flatListRef = useRef<FlatList<SliderData>>(null)

  const [activeIndex,setActiveIndex] = useState(0)
  const screenWeidth = Dimensions.get("window").width;

  useEffect(()=>{
    const firstData:SliderData | any = sliderData.shift()
        
    sliderData.push(firstData)
    console.log(firstData,'llll',sliderData);
    let interval =  setInterval(()=>{
      // console.log(Math.ceil(activeIndex),sliderData.length-1);
      
      if(Math.ceil(activeIndex) === sliderData.length-1){
        flatListRef.current?.scrollToIndex({
          index:0,
          animated:true
        })
       
      }else{
        flatListRef.current?.scrollToIndex({
          index:activeIndex+1,
          animated:true
        })
        // const firstData:SliderData | any = sliderData.shift()
        // sliderData.push(firstData)

        // console.log(firstData,'llll');
      }

    },2000)
    return ()=> clearInterval(interval)
  })

  interface SliderData {
    heading: String;
    color: String;
    content: String;
    img: String;
    id: string ;
  }

  interface RenderItemProps {
    item: SliderData;
    index: number;
  }

  const sliderData: SliderData[] = [
    {
      id: '1',
      heading: "FUN",
      color: "green",
      content: "Texting Made",
      img: "./assets/animations/wow.json",
    },
    {
      id: '2',
      heading: "SECURE",
      color: "blue",
      content: "Dex Is More",
      img: "./assets/animations/wow.json",
    },
    {
      id: '3',
      heading: "CONNECTED",
      color: "red",
      content: "Keep Your Loved Ones",
      img: "./assets/animations/wow.json",
    },
  ];

  const renderItem: ListRenderItem<SliderData> = ({
    item,
    index,
  }: RenderItemProps) => {
    return (
      <View className="h-3/5  items-center">
        <View
          className="flex flex-col justify-start pl-5 "
          style={{ width: screenWeidth }}
        >
          <Text
            className="text-start align-baseline items-start text-3xl mb-2 "
            style={{ color: `${item.color}` }}
          >
            {item.content}
          </Text>
          <Text className="text-start align-baseline items-start font-bold text-white text-6xl">
            {item.heading}
          </Text>
        </View>
        <LottieView 
          source={require("./assets/animations/wow.json")}
          style={{ width: "90%", height: "90%" }}
          autoPlay
          loop
        />
        <Text></Text>
      </View>
    );
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

    
    
    const scrollPosition = event.nativeEvent.contentOffset.x
    // console.log(";;;;;",scrollPosition);
    const index = scrollPosition / screenWeidth
    // console.log(index);
    setActiveIndex(index)
    
  };

  const getItemLayout = (data:any , index:number)=>(
    {
      length:screenWeidth,
      offset:screenWeidth* index,
      index:index
    }
  )
  return (
    <View className="bg-[#081e30] flex-1">
      <StatusBar backgroundColor="#040f18" />

      <View className="h-1/5 flex justify-center   ">
        <View className="flex flex-row justify-center  items-center gap-2 mb-1">
          <Image
            source={require("./assets/adaptive-icon.png")}
            style={{ width: 50, height: 50 }}
          />
          <Text className="text-2xl text-white">Dex Messenger</Text>
        </View>
      </View>
      {/* <View className=''> */}
      <FlatList
        data={sliderData}
        renderItem={renderItem}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        ref={flatListRef}
        getItemLayout={getItemLayout}
        keyExtractor={(item:SliderData)=>item.id}
      />
      {/* <View className='h-3/5 justify-center items-center'>
        <View className='flex flex-col justify-start w-full pl-5'>
          <Text className='text-start align-baseline items-start'>jasgdjg</Text>
          <Text className='text-start align-baseline items-start'>jasgdjg</Text>

        </View>
        <LottieView source={require('./assets/animations/wow.json')} style={{width: '100%', height: '100%' }} autoPlay loop />


      </View>
      <View className='h-3/5 justify-center items-center'>
        <View className='flex flex-col justify-start w-full pl-5'>
          <Text className='text-start align-baseline items-start'>jasgdjg</Text>
          <Text className='text-start align-baseline items-start'>jasgdjg</Text>

        </View>
        <LottieView source={require('./assets/animations/wow.json')} style={{width: '100%', height: '100%' }} autoPlay loop />


      </View> */}

      {/* </View> */}
      <View className="flex-1/5"></View>
    </View>
  );
}
