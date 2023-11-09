import { Box, Heading } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";

const CategoryButton = (props) => {
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={props.onPress}>
      <Box
        bgColor={props.isActive ? "$yellow300" : "$white"}
        px={"$4"}
        py={"$1"}
        mr={"$4"}
        ml={props.isFirst ? "$4" : "0"}
        borderRadius={"$full"}
      >
        <Heading color="$black" fontSize={"$sm"}>
          {props.title}
        </Heading>
      </Box>
    </TouchableOpacity>
  );
};

export default CategoryButton;
