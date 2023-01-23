import "server-only";
import { createClient } from "../utils/supabase-server";
import HomePage from "./HomePage";

export const revalidate = 0;

export default async function Page() {
  const supabase = createClient();
  const { data } = await supabase.from("rweets").select("*");
  return <HomePage serverRweets={data || []} />;
}
