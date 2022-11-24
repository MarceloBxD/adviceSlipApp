import "./App.css";
import { useState } from "react";
import { Button, Flex, Text, Input } from "@chakra-ui/react";

function App() {
  const [query, setQuery] = useState("");
  const [quantSlips, setQuantSlips] = useState(0);
  // const [slips, setSlips] = useState([]);
  const [slip, setSlip] = useState("")

  const apiRequest = async () => {
    try {
      let request = await fetch(
        `https://api.adviceslip.com/advice/search/${query}`
      );
      let data = await request.json();
      setSlip(data.slips[0].advice);
      setQuantSlips(data.total_results);
      return data;
    } catch {
      console.log("Erro desconhecido!");
    }
  };

  return (
    <Flex w="100%" flexDir="column">
      <Input
        color="#fff"
        placeholder="palavra-chave"
        m="20px auto"
        w="200px"
        type="text"
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button w="200px" m="0 auto" onClick={apiRequest}>
        Buscar conselho!
      </Button>
      <Text color="#fff">Quantidade de conselhos: {quantSlips}</Text>
      <Text color="#fff">
        Conselho: {slip}
      </Text>
    </Flex>
  );
}

export default App;
