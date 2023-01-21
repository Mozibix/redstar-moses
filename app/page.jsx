import supabase from "../utils/supabase";
import HomePage from "./HomePage";

async function getRooms() {
  return await supabase.from("rooms").select();
}

async function getServices() {
  return await supabase.from("services").select();
}

async function getBarAndRestaurant() {
  return await supabase.from("bar&restaurant").select();
}

export default async function Page() {
  const [rooms, services, barAndRestaurant] = await Promise.all([
    getRooms(),
    getServices(),
    getBarAndRestaurant(),
  ]);

  return (
    <HomePage
      rooms={rooms.data}
      services={services.data}
      barAndRestaurant={barAndRestaurant.data}
    />
  );
}
