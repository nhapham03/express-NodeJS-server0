import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";

const getDogById = async (id) => {
  const response = await fetch(`https://dogapi.dog/api/v2/breeds/${id}`);
  return response.json();
};

const getDogs = async () => {
  const response = await fetch("https://dogapi.dog/api/v2/breeds");
  return response.json();
};

const getFacts = async (numFacts) => {
  const response = await fetch(
    `https://dogapi.dog/api/v2/facts?limit=${numFacts}`
  );
  return response.json();
};

const getGroups = async () => {
  const response = await fetch("https://dogapi.dog/api/v2/groups");
  return response.json();
};

export default function App() {
  const queryClient = new QueryClient();
  const [selectedId, setSelectedId] = useState(null);
  const handleDogClick = (id) => {
    setSelectedId(id);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Dog Information App</Text>
        <Dogs handleDogClick={handleDogClick} />
        <Facts numFacts={3} />
        <Groups />
        {selectedId && <Dog dogId={selectedId} />}
      </ScrollView>
    </QueryClientProvider>
  );
}

const Groups = () => {
  const {
    data: groups,
    isLoading: groupsLoading,
    isError: groupsError,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });

  if (groupsLoading)
    return <Text style={styles.loadingText}>Loading groups...</Text>;
  if (groupsError)
    return <Text style={styles.errorText}>Error loading dog groups...</Text>;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Dog groups</Text>
      {groups.data.map((group) => (
        <Text key={group.id} style={styles.text}>
          {group.attributes.name}
        </Text>
      ))}
    </View>
  );
};

const Facts = ({ numFacts }) => {
  const {
    data: facts,
    isLoading: factsLoading,
    isError: factsError,
  } = useQuery({
    queryKey: ["facts"],
    queryFn: () => getFacts(numFacts),
  });

  if (factsLoading)
    return <Text style={styles.loadingText}>Loading facts...</Text>;
  if (factsError)
    return <Text style={styles.errorText}>Error loading dog facts...</Text>;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Random dog facts</Text>
      {facts.data.map((fact) => (
        <Text key={fact.id} style={styles.text}>
          {fact.attributes.body}
        </Text>
      ))}
    </View>
  );
};

const Dog = ({ dogId }) => {
  const {
    data: dog,
    isLoading: dogLoading,
    isError: dogError,
  } = useQuery({
    queryKey: ["dog", dogId],
    queryFn: () => getDogById(dogId),
    enabled: !!dogId,
  });

  if (dogLoading)
    return <Text style={styles.loadingText}>Loading dog information...</Text>;
  if (dogError)
    return (
      <Text style={styles.errorText}>Error loading dog information...</Text>
    );

  return (
    <View style={styles.dog}>
      {dog.data && (
        <View>
          <Text style={styles.dogName}>{dog.data.attributes.name}</Text>
          <Text style={styles.text}>{dog.data.attributes.description}</Text>
        </View>
      )}
    </View>
  );
};

const Dogs = ({ handleDogClick }) => {
  const {
    data: dogs,
    isLoading: dogsLoading,
    isError: dogsError,
  } = useQuery({
    queryKey: ["dogs"],
    queryFn: getDogs,
  });

  if (dogsLoading)
    return <Text style={styles.loadingText}>Loading dog breeds...</Text>;
  if (dogsError)
    return <Text style={styles.errorText}>Error loading dog breeds...</Text>;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Dog breeds</Text>
      {dogs.data.map((dog) => (
        <TouchableOpacity
          onPress={() => handleDogClick(dog.id)}
          key={dog.id}
          style={styles.dogItem}
        >
          <Text style={styles.dogName}>{dog.attributes.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff0f6",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff69b4",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#ffccdd",
    borderRadius: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff69b4",
    marginBottom: 10,
  },
  dogName: {
    fontSize: 18,
    color: "#ff1493",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: "#ff69b4",
  },
  loadingText: {
    fontSize: 16,
    color: "#ff69b4",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  dog: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffe6f0",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dogItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#ffe6f0",
    borderRadius: 5,
    marginBottom: 5,
  },
});
